# Kontext kit (fal.ai): avatars, armor, items

Kontext is an **image editor**, not a chat. It edits the picture you give it and changes only what
the prompt names. There's no Project, no memory and no instructions box: each prompt below is
complete on its own. Paste it as-is.

## Setup (once)
1. **Credits:** fal.ai account with credit added (https://fal.ai/dashboard/billing).
2. **Files:** have the mannequins handy: `mannequin-charlie.png`, `mannequin-parker.png`,
   `fitting-charlie.png`, `fitting-parker.png` (from the zip I sent).
3. **Where to run:** open the model page linked on each step and use the **Playground**. Upload the
   image(s), paste the prompt, open **Additional settings** and set:

| setting | value |
| --- | --- |
| `aspect_ratio` | 2:3 |
| `guidance_scale` | 3.5 |
| `num_images` | 2 |
| `output_format` | png |
| `safety_tolerance` | 2 |
| `enhance_prompt` | false |

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
- **Blocked or black image** (can happen with Charlie's skimpier armor): raise `safety_tolerance`
  to 5 and re-run. If it still blocks, swap "shows some skin" for "open shoulders and midriff".
- **Download the PNG** with the download button, not a screenshot.

## 1. Avatars (do these first)
Use the **multi** model: image 1 is the mannequin, then 1–2 clear full-body photos (arms and legs
visible). Save as **charlie-avatar.png** / **parker-avatar.png**.

### Charlie
**Step 1: Paint the person** · [fal-ai/flux-pro/kontext/max/multi](https://fal.ai/models/fal-ai/flux-pro/kontext/max/multi) (~$0.08/image)  
Images, in this order: `mannequin-charlie.png`, `1–2 photos of Charlie`

```text
Turn the grey mannequin in the first image into the person in the other images. Copy only their face, hairstyle, hair colour, skin tone, eye colour, freckles, piercings and tattoos. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. The body shape comes from the mannequin, not the photos. Dress them in a plain fitted sports top and fitted shorts, barefoot. Tattoos: Black vine tattoo from the side of the waist down the outer hip and thigh, on the LEFT side of the image (viewer's left). Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

**Step 2: Fix tattoos (only if needed)** · [fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) (~$0.04/image)  
Images, in this order: `the result from step 1`

```text
Only change the tattoos: Black vine tattoo from the side of the waist down the outer hip and thigh, on the LEFT side of the image (viewer's left). Keep everything else in the image exactly the same, including the face, pose, size, position and background.
```

### Parker
**Step 1: Paint the person** · [fal-ai/flux-pro/kontext/max/multi](https://fal.ai/models/fal-ai/flux-pro/kontext/max/multi) (~$0.08/image)  
Images, in this order: `mannequin-parker.png`, `1–2 photos of Parker`

```text
Turn the grey mannequin in the first image into the person in the other images. Copy only their face, hairstyle, hair colour, skin tone, eye colour, facial hair, freckles, piercings and tattoos. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. The body shape comes from the mannequin, not the photos. Dress them in a plain fitted tank top and fitted shorts, barefoot. Tattoos: His tattooed arm (full sleeve) and his big thigh piece are BOTH on the RIGHT side of the image (viewer's right), his own left side. Only a few small tattoos on the other forearm and lower leg. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

**Step 2: Fix tattoos (only if needed)** · [fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) (~$0.04/image)  
Images, in this order: `the result from step 1`

```text
Only change the tattoos: His tattooed arm (full sleeve) and his big thigh piece are BOTH on the RIGHT side of the image (viewer's right), his own left side. Only a few small tattoos on the other forearm and lower leg. Keep everything else in the image exactly the same, including the face, pose, size, position and background.
```

**Stop here and send me the two avatars.** I fit-check them (85%+ = keep). Armor only makes sense once
the avatars hold the pose.

## 2. Style sheet (optional but helps)
[fal-ai/flux-pro/kontext/text-to-image](https://fal.ai/models/fal-ai/flux-pro/kontext/text-to-image) · no input image. Save as **style-sheet.png**.

```text
A game art style reference sheet on a flat magenta background: a row of 6 matching shoulder pauldrons, one each in stitched brown leather with small buckles; carved grey stone plates with moss in the cracks; polished riveted iron plate; ornate engraved gold plate; faceted glowing crystal plates; black volcanic glass with faint violet glow in the seams. Below them two more pauldrons, one with rose gold trim and one with metallic green trim. Each piece separate with space around it, no text, no labels. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

## 3. Armor (start with Leather + Iron for each of you)
Upload the **cyan fitting** image, not the grey one.

### Charlie (rose gold)
#### Charlie · Leather → save as **charlie-leather.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-charlie.png`

```text
Dress the cyan mannequin in a full leather armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: stitched brown leather with small buckles. Trims, rivets, edges and emblems in rose gold. Look: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Charlie · Stone → save as **charlie-stone.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-charlie.png`

```text
Dress the cyan mannequin in a full stone armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: carved grey stone plates with moss in the cracks. Trims, rivets, edges and emblems in rose gold. Look: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Charlie · Iron → save as **charlie-iron.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-charlie.png`

```text
Dress the cyan mannequin in a full iron armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: polished riveted iron plate. Trims, rivets, edges and emblems in rose gold. Look: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Charlie · Gold → save as **charlie-gold.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-charlie.png`

```text
Dress the cyan mannequin in a full gold armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: ornate engraved gold plate. Trims, rivets, edges and emblems in rose gold. Look: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Charlie · Crystal → save as **charlie-crystal.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-charlie.png`

```text
Dress the cyan mannequin in a full crystal armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: faceted glowing crystal plates. Trims, rivets, edges and emblems in rose gold. Look: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Charlie · Obsidian → save as **charlie-obsidian.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-charlie.png`

```text
Dress the cyan mannequin in a full obsidian armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: black volcanic glass with faint violet glow in the seams. Trims, rivets, edges and emblems in rose gold. Look: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

### Parker (metallic green)
#### Parker · Leather → save as **parker-leather.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-parker.png`

```text
Dress the cyan mannequin in a full leather armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: stitched brown leather with small buckles. Trims, rivets, edges and emblems in metallic green. Look: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Parker · Stone → save as **parker-stone.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-parker.png`

```text
Dress the cyan mannequin in a full stone armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: carved grey stone plates with moss in the cracks. Trims, rivets, edges and emblems in metallic green. Look: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Parker · Iron → save as **parker-iron.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-parker.png`

```text
Dress the cyan mannequin in a full iron armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: polished riveted iron plate. Trims, rivets, edges and emblems in metallic green. Look: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Parker · Gold → save as **parker-gold.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-parker.png`

```text
Dress the cyan mannequin in a full gold armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: ornate engraved gold plate. Trims, rivets, edges and emblems in metallic green. Look: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Parker · Crystal → save as **parker-crystal.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-parker.png`

```text
Dress the cyan mannequin in a full crystal armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: faceted glowing crystal plates. Trims, rivets, edges and emblems in metallic green. Look: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

#### Parker · Obsidian → save as **parker-obsidian.png**
[fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) · image: `fitting-parker.png`

```text
Dress the cyan mannequin in a full obsidian armor set: helmet, shoulder pauldrons, chest piece, bracers, belt, thigh plates, greaves and boots. Material: black volcanic glass with faint violet glow in the seams. Trims, rivets, edges and emblems in metallic green. Look: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek. Keep every part of the body that the armor does not cover flat bright cyan with no face, skin, hair or clothes. Keep the figure exactly as it is: same pose, same body shape and proportions, same size, same position in the frame, same flat magenta background. Do not zoom, crop, rotate, re-pose or re-centre anything. No weapons, shields or capes. Never use cyan or magenta in the armor. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

## 4. Item sheets
[fal-ai/flux-pro/kontext/text-to-image](https://fal.ai/models/fal-ai/flux-pro/kontext/text-to-image) · no input image. Save as **sheet-<name>.png**.

### Charlie's shields & weapons → sheet-gear-charlie.png
```text
A sprite sheet of game items on a flat magenta background, laid out in a neat grid of 4 columns and 3 rows with wide empty space between items and nothing touching. In order: row 1, column 1: round buckler; row 1, column 2: heart shield; row 1, column 3: kite shield; row 1, column 4: tower shield; row 2, column 1: short sword; row 2, column 2: magic wand; row 2, column 3: crossbow; row 2, column 4: war fan; row 3, column 1: heart staff; row 3, column 2: twin daggers; row 3, column 3: spear; row 3, column 4: legendary rose blade. Every item has rose gold accents. Weapons and staffs drawn upright with the handle at the bottom; shields facing the viewer. No text, no labels, no borders, no shadows. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

### Parker's shields & weapons → sheet-gear-parker.png
```text
A sprite sheet of game items on a flat magenta background, laid out in a neat grid of 4 columns and 3 rows with wide empty space between items and nothing touching. In order: row 1, column 1: round shield; row 1, column 2: kite shield; row 1, column 3: spiked shield; row 1, column 4: tower shield; row 2, column 1: broadsword; row 2, column 2: battle axe; row 2, column 3: warhammer; row 2, column 4: greatsword; row 3, column 1: mace; row 3, column 2: flail; row 3, column 3: halberd; row 3, column 4: legendary emerald greatsword. Every item has metallic green accents. Weapons and staffs drawn upright with the handle at the bottom; shields facing the viewer. No text, no labels, no borders, no shadows. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

### Loot & UI → sheet-loot.png
```text
A sprite sheet of game items on a flat magenta background, laid out in a neat grid of 4 columns and 3 rows with wide empty space between items and nothing touching. In order: row 1, column 1: gold coin; row 1, column 2: stack of coins; row 1, column 3: XP gem; row 1, column 4: health potion; row 2, column 1: stamina potion; row 2, column 2: protein shake potion; row 2, column 3: treasure chest (closed); row 2, column 4: treasure chest (open); row 3, column 1: trophy; row 3, column 2: PR star medal; row 3, column 3: map pin; row 3, column 4: heart. Weapons and staffs drawn upright with the handle at the bottom; shields facing the viewer. No text, no labels, no borders, no shadows. Art style: clean cel-shaded fantasy RPG game sprite art: bold dark outlines, flat colour areas with 2–3 shading tones, crisp highlights, no gradients, no painterly texture, no blur.
```

## Rough cost
- Avatars: ~4 tries each at $0.08 ≈ **$0.70**
- Armor: 12 sets × ~3 tries at $0.04 ≈ **$1.50**
- Sheets and style: ≈ **$0.50**

So about **$3** for everything, and your $10 leaves plenty of room for rerolls.
