// Writes docs/kontext-kit.md: the fal.ai FLUX Kontext kit. Run: npx tsx tools/kontext-kit.mts
import { writeFileSync } from "node:fs";
import { ENDPOINTS, SETTINGS, avatarSteps, armorPrompt, STYLE_SHEET, sheetPrompt, PEOPLE, TIERS, SHEETS } from "../src/spec/kontext.ts";

const box = (s: string) => "```text\n" + s + "\n```";
const settings = Object.entries(SETTINGS)
  .map(([k, v]) => `| \`${k}\` | ${v} |`)
  .join("\n");

const avatar = (who: "charlie" | "parker") =>
  avatarSteps(PEOPLE[who])
    .map(
      (s, k) =>
        `**Step ${k + 1}: ${s.title}** · [${s.endpoint.id}](${s.endpoint.url}) (${s.endpoint.cost}/image)  \nImages, in this order: ${s.images.map((i) => `\`${i}\``).join(", ")}\n\n${box(s.prompt)}`,
    )
    .join("\n\n");

const armor = (who: "charlie" | "parker") =>
  TIERS.map(
    (t) => `#### ${PEOPLE[who].name} · ${t.name} → save as **${who}-${t.key}.png**\n[${ENDPOINTS.pro.id}](${ENDPOINTS.pro.url}) · image: \`fitting-${who}.png\`\n\n${box(armorPrompt(PEOPLE[who], who, t))}`,
  ).join("\n\n");

const md = `# Kontext kit (fal.ai): avatars, armor, items

Kontext is an **image editor**, not a chat. It edits the picture you give it and changes only what
the prompt names. There's no Project, no memory and no instructions box: each prompt below is
complete on its own. Paste it as-is.

## Setup (once)
1. **Credits:** fal.ai account with credit added (https://fal.ai/dashboard/billing).
2. **Files:** have the mannequins handy: \`mannequin-charlie.png\`, \`mannequin-parker.png\`,
   \`fitting-charlie.png\`, \`fitting-parker.png\` (from the zip I sent).
3. **Where to run:** open the model page linked on each step and use the **Playground**. Upload the
   image(s), paste the prompt, open **Additional settings** and set:

| setting | value |
| --- | --- |
${settings}

## How to talk to Kontext (what works)
- **Say what changes AND what stays.** Every prompt ends with "keep the pose, size, position, background".
  That's what stops the drift ChatGPT had. Don't trim it.
- **Small steps beat one big ask.** If something's off, run the result again with *one* fix
  ("Only make the tattoo on the left thigh bigger. Keep everything else exactly the same.").
  Don't re-run the whole prompt.
- **Name things plainly.** "the grey mannequin", "the left side of the image". Avoid "her", "it" and
  "make it better".
- **Colour names, not hex codes.** Kontext doesn't read hex.
- **Lucky seed?** When a result is great, copy its **seed** from the output and reuse it for the
  next tier. It keeps the style consistent.
- **It ignores the pixel numbers, and that's fine.** Kontext makes clean sprite art; my slicer snaps
  it onto the game's 4-px grid. That's what makes everything pixel art on the same grid.
- **Blocked or black image** (can happen with Charlie's skimpier armor): raise \`safety_tolerance\`
  to 5 and re-run. If it still blocks, swap "shows some skin" for "open shoulders and midriff".
- **Download the PNG** with the download button, not a screenshot.

## 1. Avatars (do these first)
Use the **multi** model: image 1 is the mannequin, then 1–2 clear full-body photos (arms and legs
visible). Save as **charlie-avatar.png** / **parker-avatar.png**.

### Charlie
${avatar("charlie")}

### Parker
${avatar("parker")}

**Stop here and send me the two avatars.** I fit-check them (85%+ = keep). Armor only makes sense once
the avatars hold the pose.

## 2. Style sheet (optional but helps)
[${ENDPOINTS.text.id}](${ENDPOINTS.text.url}) · no input image. Save as **style-sheet.png**.

${box(STYLE_SHEET)}

## 3. Armor (start with Leather + Iron for each of you)
Upload the **cyan fitting** image, not the grey one.

### Charlie (rose gold)
${armor("charlie")}

### Parker (metallic green)
${armor("parker")}

## 4. Item sheets
[${ENDPOINTS.text.id}](${ENDPOINTS.text.url}) · no input image. Save as **sheet-<name>.png**.

${SHEETS.map((s) => `### ${s.title} → sheet-${s.key}.png\n${box(sheetPrompt(s))}`).join("\n\n")}

## Rough cost
- Avatars: ~4 tries each at $0.08 ≈ **$0.70**
- Armor: 12 sets × ~3 tries at $0.04 ≈ **$1.50**
- Sheets and style: ≈ **$0.50**

So about **$3** for everything, and your $10 leaves plenty of room for rerolls.
`;
writeFileSync("docs/kontext-kit.md", md);
