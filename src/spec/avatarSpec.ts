// The avatar spec: the pixel grid everything lives on. Each person's mannequin
// (designed in ChatGPT, then imported by tools/import_mannequin.py) is scaled to
// their real height on this grid, and its measured landmarks are what the prompts,
// the armor slicer and the game all share. That shared set is what makes
// ChatGPT-painted avatars and armor layers line up.
//
// Scale: 4 game pixels = 1 inch of real height. Everyone stands on the same
// floor line, so a 5'1" and a 5'10" avatar side by side show the real gap.
// Left/right always mean THE PERSON's side. They face the viewer, so their
// left is the viewer's right (+x).

export const PX_PER_INCH = 4;
export const GRID_W = 256; // game pixels
export const GRID_H = 384;
export const FLOOR_Y = 372; // soles rest on this row
export const BLOCK = 4; // screen pixels per game pixel in the exported image
export const IMAGE_W = GRID_W * BLOCK; // 1024
export const IMAGE_H = GRID_H * BLOCK; // 1536, a size ChatGPT outputs natively
export const KEY_BG = "#ff00ff"; // flat background the game keys out

export type Build = "curvy" | "muscular";
export interface Person {
  name: string;
  heightIn: number;
  build: Build;
}
export const PEOPLE: Record<"charlie" | "parker", Person> = {
  charlie: { name: "Charlie", heightIn: 61, build: "curvy" },
  parker: { name: "Parker", heightIn: 70, build: "muscular" },
};

export type P = { x: number; y: number };
/** Named body points on the grid, measured from the person's mannequin by tools/import_mannequin.py. */
export type Landmarks = Record<string, P>;

export const heightPx = (p: Person) => Math.round(p.heightIn * PX_PER_INCH);
export const feetInches = (inches: number) => `${Math.floor(inches / 12)}'${inches % 12}"`;


/**
 * The per-person prompt for ChatGPT, sent with the person's photo(s) and their
 * mannequin template. Standing rules (style, JSON) live in the ChatGPT Project.
 */
export function avatarPrompt(person: Person, landmarks: Landmarks, notes = "") {
  const lm = Object.entries(landmarks)
    .map(([k, p]) => `${k} (${p.x}, ${p.y})`)
    .join(", ");
  return `Make ${person.name}'s game avatar. Follow the project's avatar rules exactly.

Person: ${person.name}, ${feetInches(person.heightIn)} tall.
Attached: photo(s) of ${person.name}, and ${person.name}'s mannequin template.

Body and pose: LOCKED. They come only from the mannequin. Never change body shape, size, proportions, muscle, curves or pose, even if the photo shows a different build or pose.
From the photo take ONLY: face, hair, skin tone, eye colour, facial hair, glasses, tattoos, piercings, freckles.
Paint ${person.name} directly over the gray mannequin: same silhouette, same pose, same position, same size. Don't move, rescale, or re-pose it.

Grid: ${GRID_W}×${GRID_H} game pixels, each an exact ${BLOCK}×${BLOCK} block → ${IMAGE_W}×${IMAGE_H} image.
Top of head at y ${landmarks.HEAD_TOP.y}; soles on y ${FLOOR_Y - 1}. Height ${heightPx(person)} px (${PX_PER_INCH} px per inch).
Landmarks (game pixels, x left→right, y top→bottom; _L/_R = ${person.name}'s own left/right, and their left is on the viewer's right):
${lm}
Hair, clothes and shoes may go up to 4 px past the mannequin's edge. Nothing else goes outside it.
${notes.trim() ? `\nExtra notes: ${notes.trim()}\n` : ""}
Then give the JSON block.`;
}

/** Paste once into a ChatGPT Project's instructions so every run follows the same rules. */
export const PROJECT_INSTRUCTIONS = `You make player avatars for a private RPG. Think high-quality modern pixel-art character sprites (polished 16/32-bit era, like a well-made indie RPG), not chunky retro arcade.

STYLE
- Real pixel art on an exact grid: every game pixel is a solid square block of the size given in the prompt. No anti-aliasing, no blur, no gradients, no painterly texture.
- Detailed and flattering: clean 1-px dark outline, soft cel shading with 3–4 tone ramps per colour, highlights on hair and skin, up to 64 colours total.
- Recognisable face: hair, facial hair, glasses, skin tone, eye colour, expression (a confident little smile).
- The BODY SHAPE AND POSE are locked to the mannequin template and never change between runs, whatever the photo shows. The photo only supplies face, hair, skin tone, eye colour, facial hair, glasses, tattoos, piercings and freckles.
- Plain fitted base outfit (fitted tank or t-shirt, fitted shorts or leggings, simple shoes) so armour can be layered on later. No accessories that stick out.
- Background: flat solid ${KEY_BG} everywhere outside the figure. No floor, no shadow, no text, no border.

ACCURACY (this matters most)
- Paint the person directly over the gray mannequin you're given: same silhouette, same pose, same pixel position, same height. Never rescale or recentre it. The height difference between players must stay exact.
- Tattoos: reproduce every visible tattoo on the correct limb and side, with the right coverage (full sleeve, half sleeve, patch, thigh piece…) and main colours. Left/right always mean THE PERSON's side; they face the viewer, so their left arm is on the viewer's right.
- Keep piercings, freckles and other distinctive features if visible.

OUTPUT
1. The image, exactly the size given in the prompt.
2. Then this JSON in a \`\`\`json block, filled in honestly (null when unknown):
{
  "version": 2,
  "name": "",
  "height_in": 0,
  "skin": "#hex",
  "hair": { "color": "#hex", "style": "", "length": "short|medium|long" },
  "facial_hair": null,
  "eyes": "#hex",
  "glasses": false,
  "tattoos": [
    { "region": "left_arm|right_arm|left_leg|right_leg|chest|back|neck|left_hand|right_hand|other",
      "coverage": "full_sleeve|half_sleeve|patch|full|partial",
      "colors": ["#hex"], "description": "" }
  ],
  "outfit": { "top": "#hex", "bottom": "#hex", "shoes": "#hex" },
  "notes": ""
}`;
