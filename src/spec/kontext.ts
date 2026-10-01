// Prompts and settings for FLUX.1 Kontext on fal.ai.
//
// Kontext is an *editor*: it takes an image and changes only what the prompt
// names. It has no "project instructions" or memory, so every prompt here is
// self-contained. It follows short, concrete edit instructions that say what to
// change AND what to keep; it ignores pixel coordinates and hex codes are weak
// (colour names work better). So:
//   - each prompt names the subject plainly ("the grey mannequin") and lists
//     what must stay the same (pose, size, position, background)
//   - art is asked for as clean cel-shaded sprite art; tools/assets.py snaps it
//     onto the 4-px game grid, which is what makes it pixel art and keeps every
//     asset on the same grid
//   - big changes are split into small steps (paint the person, then tattoos)

import { ACCENTS, ARMOR_LOOK, SHEETS, TIERS, type Tier } from "./armorSpec";
import { PEOPLE, type Person } from "./avatarSpec";

export const ENDPOINTS = {
  /** One image in, one edit out. Armor, tweaks, fixes. */
  pro: { id: "fal-ai/flux-pro/kontext", url: "https://fal.ai/models/fal-ai/flux-pro/kontext", cost: "~$0.04" },
  /** Several images in (mannequin + photos). Avatars. */
  multi: { id: "fal-ai/flux-pro/kontext/max/multi", url: "https://fal.ai/models/fal-ai/flux-pro/kontext/max/multi", cost: "~$0.08" },
  /** Text only, no input image. Style sheet and sticker sheets. */
  text: { id: "fal-ai/flux-pro/kontext/text-to-image", url: "https://fal.ai/models/fal-ai/flux-pro/kontext/text-to-image", cost: "~$0.04" },
} as const;

/** Settings for every run (fal's "Additional settings"). */
export const SETTINGS = {
  aspect_ratio: "2:3",
  guidance_scale: 3.5, // 4–5 if it ignores the prompt; 2.5–3 if it over-cooks
  num_images: 2, // pick the better one; costs per image
  output_format: "png",
  safety_tolerance: "2", // raise to "5" only if a run comes back blocked/black
  enhance_prompt: false, // keep off: it rewrites our careful wording
};

const STYLE =
  "clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur";

const KEEP_FIGURE =
  "Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything.";

function sides(p: Person) {
  return p.tattoos;
}

/** Avatars: mannequin (image 1) + 1–2 photos (images 2–3). Step 1 makes the person, step 2 checks tattoos. */
export function avatarSteps(p: Person) {
  return [
    {
      title: "Paint the person",
      endpoint: ENDPOINTS.multi,
      images: [`mannequin-${p.name.toLowerCase()}.png`, "1–2 photos of " + p.name],
      prompt: `Turn the grey mannequin in the first image into the person in the other images. Copy only their face, hairstyle, hair colour, skin tone, eye colour${p.build === "muscular" ? ", facial hair" : ""}, freckles, piercings and tattoos. ${KEEP_FIGURE} The body shape comes from the mannequin, not the photos. Dress them in a plain fitted ${p.build === "curvy" ? "sports top and fitted shorts" : "tank top and fitted shorts"}, barefoot. Tattoos: ${sides(p)} Art style: ${STYLE}.`,
    },
    {
      title: "Fix tattoos (only if needed)",
      endpoint: ENDPOINTS.pro,
      images: ["the result from step 1"],
      prompt: `Only change the tattoos: ${sides(p)} Keep everything else in the image exactly the same, including the face, pose, size, position and background.`,
    },
  ];
}

/** Armor: one tier per run, painted on the cyan fitting mannequin. */
export function armorPrompt(p: Person, who: keyof typeof ACCENTS, t: Tier) {
  const a = ACCENTS[who];
  return `Dress the cyan mannequin in a full ${t.name.toLowerCase()} armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: ${t.material}. Trims, rivets, edges and emblems in ${a.name}. Look: ${ARMOR_LOOK[p.build]} Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. ${KEEP_FIGURE} No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: ${STYLE}.`;
}

export const STYLE_SHEET = `A game art style reference sheet on a flat magenta background: a row of ${TIERS.length} matching shoulder pauldrons, one each in ${TIERS.map((t) => t.material).join("; ")}. Below them two more pauldrons, one with rose gold trim and one with metallic green trim. Each piece separate with space around it, no text, no labels. Art style: ${STYLE}.`;

export function sheetPrompt(s: (typeof SHEETS)[number]) {
  const rows = Math.ceil(s.items.length / s.cols);
  const a = s.forWho ? ACCENTS[s.forWho] : null;
  const list = s.items.map((it, k) => `row ${Math.floor(k / s.cols) + 1}, column ${(k % s.cols) + 1}: ${it}`).join("; ");
  return `A sprite sheet of game items on a flat magenta background, laid out in a neat grid of ${s.cols} columns and ${rows} rows with wide empty space between items and nothing touching. In order: ${list}.${a ? ` Every item has ${a.name} accents.` : ""} Weapons and staffs drawn upright with the handle at the bottom; shields facing the viewer. No text, no labels, no borders, no shadows. Art style: ${STYLE}.`;
}

export { PEOPLE, TIERS, SHEETS };
