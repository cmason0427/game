// Armor + item assets made in ChatGPT, then sliced by tools/assets.py.
//
// Worn armor comes from a FITTING image: ChatGPT paints one full set onto the
// person's cyan fitting mannequin (same grid as the avatar), so every piece is
// already in place. The script snaps it to the grid, keys out magenta + cyan,
// and cuts the armor into pieces by nearest body "bone" (see PIECES), saving
// each piece with its x/y on the grid. Pieces from different tiers share the
// grid, so they mix and match.
//
// Loose items (shields, weapons, rewards, UI bits) come from STICKER SHEETS:
// a labelled grid of items on magenta, sliced by connected blobs and named by
// the cell they sit in.

import { avatarPrompt, BLOCK, feetInches, GRID_H, GRID_W, IMAGE_H, IMAGE_W, KEY_BG, type Landmarks, type Person } from "./avatarSpec";

export const FIT_BODY = "#00ffff"; // fitting mannequin fill; armor never uses it
export const FIT_LINE = "#007a7a"; // its outline

type Ramp = [string, string, string, string]; // light → dark

/** Personal accent metals: every tier gets trims in these. */
export const ACCENTS: Record<"charlie" | "parker", { name: string; ramp: Ramp }> = {
  charlie: { name: "rose gold", ramp: ["#fbe3d8", "#e8b4a0", "#c4877a", "#8e5550"] },
  parker: { name: "metallic green", ramp: ["#c6f5d4", "#5fcf8a", "#2a9457", "#17543a"] },
};

export interface Tier {
  key: string;
  name: string;
  material: string;
  ramp: Ramp;
}
/** Leather to endgame. Custom tiers slot in anywhere; order is the unlock order. */
export const TIERS: Tier[] = [
  { key: "leather", name: "Leather", material: "stitched brown leather with small buckles", ramp: ["#e3b27a", "#b07440", "#744a28", "#402815"] },
  { key: "stone", name: "Stone", material: "carved grey stone plates with moss in the cracks", ramp: ["#d2cec6", "#a09a90", "#6d6860", "#3d3a36"] },
  { key: "iron", name: "Iron", material: "polished riveted iron plate", ramp: ["#eef2f5", "#b8c1c9", "#7d8893", "#474f58"] },
  { key: "gold", name: "Gold", material: "ornate engraved gold plate", ramp: ["#fff3b0", "#f2c94c", "#c7952a", "#7a5610"] },
  { key: "crystal", name: "Crystal", material: "faceted glowing crystal plates", ramp: ["#e6fcff", "#92e8f4", "#3db5cf", "#1e6d85"] },
  { key: "obsidian", name: "Obsidian", material: "black volcanic glass with faint violet glow in the seams", ramp: ["#8a74ad", "#4d3a6b", "#2a1d3d", "#130c1e"] },
];

/**
 * Worn pieces, each a "bone" between two landmarks (or one point). Every armor
 * pixel goes to the nearest bone. `side` pieces exist once per side.
 */
export const PIECES: { key: string; from: string; to: string; side?: boolean }[] = [
  { key: "helm", from: "HEAD_TOP", to: "CHIN" },
  { key: "chest", from: "CHIN", to: "WAIST_C" },
  { key: "pauldron", from: "SHOULDER", to: "ELBOW", side: true },
  { key: "bracer", from: "ELBOW", to: "WRIST", side: true },
  { key: "belt", from: "WAIST_C", to: "HIP_C" },
  { key: "cuisse", from: "HIP", to: "KNEE", side: true },
  { key: "greave", from: "KNEE", to: "ANKLE", side: true },
  { key: "boot", from: "ANKLE", to: "FLOOR", side: true },
];

const LOOK: Record<string, string> = {
  curvy:
    "Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.",
  muscular:
    "Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.",
};

/** One fitting run: a whole tier set painted onto the cyan fitting mannequin. */
export function fittingPrompt(person: Person, landmarks: Landmarks, accent: keyof typeof ACCENTS, tier: Tier) {
  const a = ACCENTS[accent];
  const lm = Object.entries(landmarks)
    .map(([k, p]) => `${k} (${p.x}, ${p.y})`)
    .join(", ");
  return `Armor fitting: ${person.name}'s ${tier.name} set. Follow the project's armor rules exactly.

Attached: ${person.name}'s CYAN fitting mannequin (and the style sheet).
Paint a full ${tier.name} armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan ${FIT_BODY} with its ${FIT_LINE} outline. Don't draw skin, face, hair or clothes. Background stays flat ${KEY_BG}.
Don't move, rescale, or re-pose anything. Grid: ${GRID_W}×${GRID_H} game pixels, each an exact ${BLOCK}×${BLOCK} block → ${IMAGE_W}×${IMAGE_H}.
Landmarks (game pixels; _L/_R = ${person.name}'s own left/right, their left is on the viewer's right): ${lm}

Material: ${tier.material}. Main colour ramp (light→dark): ${tier.ramp.join(" ")}.
Accent trims, rivets, edges and emblems in ${a.name}: ${a.ramp.join(" ")}.
Style: ${LOOK[person.build]}
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.`;
}

/** Sticker sheets: loose items. `cols` × rows grid, items listed row by row. */
export const SHEETS: { key: string; title: string; cols: number; items: string[]; forWho?: keyof typeof ACCENTS }[] = [
  {
    key: "gear-charlie",
    title: "Charlie's shields & weapons",
    cols: 4,
    forWho: "charlie",
    items: ["round buckler", "heart shield", "kite shield", "tower shield", "short sword", "magic wand", "crossbow", "war fan", "heart staff", "twin daggers", "spear", "legendary rose blade"],
  },
  {
    key: "gear-parker",
    title: "Parker's shields & weapons",
    cols: 4,
    forWho: "parker",
    items: ["round shield", "kite shield", "spiked shield", "tower shield", "broadsword", "battle axe", "warhammer", "greatsword", "mace", "flail", "halberd", "legendary emerald greatsword"],
  },
  {
    key: "loot",
    title: "Loot & UI",
    cols: 4,
    items: ["gold coin", "stack of coins", "XP gem", "health potion", "stamina potion", "protein shake potion", "treasure chest (closed)", "treasure chest (open)", "trophy", "PR star medal", "map pin", "heart"],
  },
];

/** A sticker-sheet run. Items come back in cell order so the slicer can name them. */
export function sheetPrompt(sheet: (typeof SHEETS)[number]) {
  const rows = Math.ceil(sheet.items.length / sheet.cols);
  const a = sheet.forWho ? ACCENTS[sheet.forWho] : null;
  const list = sheet.items.map((it, k) => `${Math.floor(k / sheet.cols) + 1}.${(k % sheet.cols) + 1} ${it}`).join("\n");
  return `Sticker sheet: ${sheet.title}. Follow the project's sticker-sheet rules exactly.

A ${sheet.cols}×${rows} grid (columns × rows), one item per cell, in this exact order (row.column):
${list}
${a ? `\nEvery item has ${a.name} accents (${a.ramp.join(" ")}), matching the armor.\n` : ""}
Held items are drawn upright, handle or grip at the bottom centre of their cell. Shields face the viewer.
Same pixel scale as the avatars: each game pixel an exact ${BLOCK}×${BLOCK} block. A sword should be about as long as the avatar's arm.`;
}

/** Style sheet: made once, then attached to every armor/sheet run for consistency. */
export const STYLE_SHEET_PROMPT = `Make a style reference sheet for our game's armor and items (a pixel-art "style bible").
Flat ${KEY_BG} background, ${IMAGE_W}×${IMAGE_H}, each game pixel an exact ${BLOCK}×${BLOCK} block.
Show:
1. A labelled colour-ramp swatch row for each material: ${TIERS.map((t) => `${t.name} ${t.ramp.join(" ")}`).join("; ")}.
2. Accent ramps: rose gold ${ACCENTS.charlie.ramp.join(" ")}; metallic green ${ACCENTS.parker.ramp.join(" ")}.
3. One small sample pauldron in each material, showing how we shade metal: 1-px dark outline, 3-4 tone cel shading, a crisp highlight edge, rivets.
Polished modern pixel art (good indie RPG), not chunky retro arcade.`;

/** The ChatGPT Project instructions for armor and sticker runs (added after the avatar rules). */
export const ARMOR_RULES = `ARMOR FITTING RULES (when the prompt says "Armor fitting")
- Paint armor directly on the cyan fitting mannequin you're given. Same pixel grid, same position, same pose. Never move or rescale.
- Any body area not covered by armor stays EXACTLY flat cyan ${FIT_BODY} with its ${FIT_LINE} outline. No skin, face, hair or clothes.
- Background EXACTLY flat ${KEY_BG}. No shadow, floor, text or border.
- Never use cyan or magenta in the armor itself.
- Pixel art on the exact grid, 1-px dark outline around each piece, 3-4 tone cel shading, crisp highlights. Match the attached style sheet.

STICKER SHEET RULES (when the prompt says "Sticker sheet")
- Flat ${KEY_BG} background, no sticker borders, no drop shadows, no labels or text.
- Items in a clear grid, one per cell, in the exact order given, with a wide empty gap between items (nothing touches).
- Same pixel scale and shading as the avatars and armor; match the attached style sheet. Never use magenta in an item.`;

export { avatarPrompt, feetInches };
