// Writes docs/chatgpt-kit.md: everything to paste into ChatGPT, in order.
// Run: npx tsx tools/kit.mts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { avatarPrompt, PROJECT_INSTRUCTIONS, PEOPLE } from "../src/spec/avatarSpec.ts";
import { type Landmarks } from "../src/spec/avatarSpec.ts";
import { BLOCK, FLOOR_Y, GRID_H, GRID_W } from "../src/spec/avatarSpec.ts";
import { PIECES } from "../src/spec/armorSpec.ts";
import { ARMOR_RULES, fittingPrompt, sheetPrompt, SHEETS, STYLE_SHEET_PROMPT, TIERS } from "../src/spec/armorSpec.ts";

// Keep tools/spec.json (read by the Python tools) in step with the TS specs.
const spec = existsSync("tools/spec.json") ? JSON.parse(readFileSync("tools/spec.json", "utf8")) : {};
Object.assign(spec, { mirror: Object.fromEntries(Object.entries(PEOPLE).map(([k, p]) => [k, p.mirror])), grid: [GRID_W, GRID_H], block: BLOCK, floorY: FLOOR_Y, pieces: PIECES, tiers: TIERS.map((t) => t.key), sheets: SHEETS });
writeFileSync("tools/spec.json", JSON.stringify(spec, null, 1));
const LM = spec.landmarks as Record<"charlie" | "parker", Landmarks>;
for (const who of ["charlie", "parker"] as const)
  if (!LM?.[who] || !existsSync(`public/mannequins/mannequin-${who}.png`)) {
    console.error(`No mannequin for ${who} yet: run tools/import_mannequin.py first.`);
    process.exit(1);
  }
// The game's own landmark file: mirrored people get their landmarks flipped and _L/_R swapped.
const flip = (lm: Landmarks) =>
  Object.fromEntries(Object.entries(lm).map(([k, p]) => [k.replace(/_L$/, "_X").replace(/_R$/, "_L").replace(/_X$/, "_R"), { x: GRID_W - 1 - p.x, y: p.y }]));
writeFileSync(
  "public/mannequins/landmarks.json",
  JSON.stringify({ charlie: PEOPLE.charlie.mirror ? flip(LM.charlie) : LM.charlie, parker: PEOPLE.parker.mirror ? flip(LM.parker) : LM.parker }, null, 1),
);
const box = (s: string) => "```text\n" + s + "\n```";
const fit = (who: "charlie" | "parker") =>
  TIERS.map((t) => `#### ${PEOPLE[who].name} · ${t.name}\nAttach \`fitting-${who}.png\` **first**, then the style sheet. Save as **${who}-${t.key}.png**.\n\n${box(fittingPrompt(PEOPLE[who], LM[who], who, t))}`).join("\n\n");

const md = `# ChatGPT kit: avatars, armor, items

Everything for ChatGPT, in order. Send me the images it makes (the actual
downloaded PNGs, **not screenshots**), named as listed, and I'll slice and line them up.

## 0. Prep (do this now)
1. In ChatGPT make a **Project** called **"Us game art"**.
2. Paste the box below into the Project's **Instructions**.
3. Add these to the Project's **Files** (they're in the repo under \`public/mannequins/\`, and I'll send them too):
   \`mannequin-charlie.png\`, \`mannequin-parker.png\`, \`fitting-charlie.png\`, \`fitting-parker.png\`.
4. In a chat in the Project, paste the **style sheet** prompt (after the box). Reroll until you love
   how the metals look, then add your favourite to the Project's Files as **style-sheet.png**.
   Every armor and item run attaches it, so everything matches.

${box(PROJECT_INSTRUCTIONS + "\n\n" + ARMOR_RULES)}

**Style sheet prompt:**
${box(STYLE_SHEET_PROMPT)}

## 1. Avatars
New chat each time. Attach the person's **mannequin first** (so it's image 1), then 1–3 clear full-body
photos (arms and legs visible so the tattoos show). Every result goes through my fit check: about 85%+ is kept,
anything lower gets rerolled. Save as **charlie-avatar.png** / **parker-avatar.png**, and copy the
JSON block it gives you into a note for me.

### Charlie
${box(avatarPrompt(PEOPLE.charlie, LM.charlie))}

### Parker
${box(avatarPrompt(PEOPLE.parker, LM.parker))}

## 2. Armor fittings
One new chat per set. **Start with Leather and Iron for each of you** and send those first, so we
can check the fit before you do the rest.

### Charlie (rose gold)
${fit("charlie")}

### Parker (metallic green)
${fit("parker")}

## 3. Sticker sheets
Attach the style sheet. Save as **sheet-<name>.png**.

${SHEETS.map((s) => `### ${s.title} → sheet-${s.key}.png\n${box(sheetPrompt(s))}`).join("\n\n")}

## What to check before sending
- **Size:** is it 1024×1536 on a flat magenta background?
- **Avatars:** same pose and shape as the mannequin, feet on the floor line, tattoos on the right side
  (their left is on the viewer's right)?
- **Armor:** is the uncovered body still flat cyan? No skin or face drawn?
- **Sheets:** does every item sit in its own cell, in the listed order, with nothing touching?
- **If one part is off,** just ask ChatGPT to fix that part ("keep everything, only move the helm down 4 px").
  It's often faster than a reroll.
`;
writeFileSync("docs/chatgpt-kit.md", md);
