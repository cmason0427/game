# ChatGPT kit: avatars, armor, items

Everything for ChatGPT, in order. Send me the images it makes (the actual
downloaded PNGs, **not screenshots**), named as listed, and I'll slice and line them up.

## 0. Prep (do this now)
1. In ChatGPT make a **Project** called **"Us game art"**.
2. Paste the box below into the Project's **Instructions**.
3. Add these to the Project's **Files** (they're in the repo under `public/mannequins/`, and I'll send them too):
   `mannequin-charlie.png`, `mannequin-parker.png`, `fitting-charlie.png`, `fitting-parker.png`.
4. In a chat in the Project, paste the **style sheet** prompt (after the box). Reroll until you love
   how the metals look, then add your favourite to the Project's Files as **style-sheet.png**.
   Every armor and item run attaches it, so everything matches.

```text
You make player avatars for a private RPG. Think high-quality modern pixel-art character sprites (polished 16/32-bit era, like a well-made indie RPG), not chunky retro arcade.

HOW TO WORK
- Always EDIT the attached mannequin or fitting image (image 1). Never generate a fresh composition. Keep its canvas, figure size and position exactly.

STYLE
- Real pixel art on an exact grid: every game pixel is a solid square block of the size given in the prompt. No anti-aliasing, no blur, no gradients, no painterly texture.
- Detailed and flattering: clean 1-px dark outline, soft cel shading with 3–4 tone ramps per colour, highlights on hair and skin, up to 64 colours total.
- Recognisable face: hair, facial hair, glasses, skin tone, eye colour, expression (a confident little smile).
- The BODY SHAPE AND POSE are locked to the mannequin template and never change between runs, whatever the photo shows. The photo only supplies face, hair, skin tone, eye colour, facial hair, glasses, tattoos, piercings and freckles.
- Plain fitted base outfit (fitted tank or t-shirt, fitted shorts or leggings, simple shoes) so armour can be layered on later. No accessories that stick out.
- Background: flat solid #ff00ff everywhere outside the figure. No floor, no shadow, no text, no border.

ACCURACY (this matters most)
- Paint the person directly over the gray mannequin you're given: same silhouette, same pose, same pixel position, same height. Never rescale or recentre it. The height difference between players must stay exact.
- Tattoos: reproduce every visible tattoo on the correct limb and side, with the right coverage (full sleeve, half sleeve, patch, thigh piece…) and main colours. Left/right always mean THE PERSON's side; they face the viewer, so their left arm is on the viewer's right.
- Keep piercings, freckles and other distinctive features if visible.

OUTPUT
1. The image, exactly the size given in the prompt.
2. Then this JSON in a ```json block, filled in honestly (null when unknown):
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
}

ARMOR FITTING RULES (when the prompt says "Armor fitting")
- Paint armor directly on the cyan fitting mannequin you're given. Same pixel grid, same position, same pose. Never move or rescale.
- Any body area not covered by armor stays EXACTLY flat cyan #00ffff with its #007a7a outline. No skin, face, hair or clothes.
- Background EXACTLY flat #ff00ff. No shadow, floor, text or border.
- Never use cyan or magenta in the armor itself.
- Pixel art on the exact grid, 1-px dark outline around each piece, 3-4 tone cel shading, crisp highlights. Match the attached style sheet.

STICKER SHEET RULES (when the prompt says "Sticker sheet")
- Flat #ff00ff background, no sticker borders, no drop shadows, no labels or text.
- Items in a clear grid, one per cell, in the exact order given, with a wide empty gap between items (nothing touches).
- Same pixel scale and shading as the avatars and armor; match the attached style sheet. Never use magenta in an item.
```

**Style sheet prompt:**
```text
Make a style reference sheet for our game's armor and items (a pixel-art "style bible").
Flat #ff00ff background, 1024×1536, each game pixel an exact 4×4 block.
Show:
1. A labelled colour-ramp swatch row for each material: Leather #e3b27a #b07440 #744a28 #402815; Stone #d2cec6 #a09a90 #6d6860 #3d3a36; Iron #eef2f5 #b8c1c9 #7d8893 #474f58; Gold #fff3b0 #f2c94c #c7952a #7a5610; Crystal #e6fcff #92e8f4 #3db5cf #1e6d85; Obsidian #8a74ad #4d3a6b #2a1d3d #130c1e.
2. Accent ramps: rose gold #fbe3d8 #e8b4a0 #c4877a #8e5550; metallic green #c6f5d4 #5fcf8a #2a9457 #17543a.
3. One small sample pauldron in each material, showing how we shade metal: 1-px dark outline, 3-4 tone cel shading, a crisp highlight edge, rivets.
Polished modern pixel art (good indie RPG), not chunky retro arcade.
```

## 1. Avatars
New chat each time. Attach the person's **mannequin first** (so it's image 1), then 1–3 clear full-body
photos (arms and legs visible so the tattoos show). Every result goes through my fit check: about 85%+ is kept,
anything lower gets rerolled. Save as **charlie-avatar.png** / **parker-avatar.png**, and copy the
JSON block it gives you into a note for me.

### Charlie
```text
EDIT image 1 (Charlie's grey mannequin). Do NOT draw a new picture: keep image 1's exact canvas, figure size, position, pose and body outline, and only paint over it. Follow the project's avatar rules exactly.

Person: Charlie, 5'1" tall.
Image 1: the mannequin (the canvas to edit). Images 2+: photos of Charlie, used ONLY for face, hair, skin tone, eye colour, facial hair, tattoos, piercings, freckles.

Body and pose: LOCKED to image 1. Never change body shape, size, proportions, muscle, curves or pose, even if the photos show a different build or pose. Where the mannequin has a hand on the hip, keep the hand on the hip. Where it's turned 3/4, keep it turned.
The finished figure must sit exactly on top of the mannequin: same silhouette, same position, same size. Hair may add volume; nothing else may move.

Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536 image.
Top of head at y 128; soles on y 371. Height 244 px (4 px per inch).
Landmarks (game pixels, x left→right, y top→bottom; _L/_R = Charlie's own left/right, and their left is on the viewer's right):
HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)
Hair, clothes and shoes may go up to 4 px past the mannequin's edge. Nothing else goes outside it.

Tattoos: Black vine tattoo from the side of the waist down the outer hip and thigh, on the LEFT side of the image (viewer's left).

Then give the JSON block.
```

### Parker
```text
EDIT image 1 (Parker's grey mannequin). Do NOT draw a new picture: keep image 1's exact canvas, figure size, position, pose and body outline, and only paint over it. Follow the project's avatar rules exactly.

Person: Parker, 5'10" tall.
Image 1: the mannequin (the canvas to edit). Images 2+: photos of Parker, used ONLY for face, hair, skin tone, eye colour, facial hair, tattoos, piercings, freckles.

Body and pose: LOCKED to image 1. Never change body shape, size, proportions, muscle, curves or pose, even if the photos show a different build or pose. Where the mannequin has a hand on the hip, keep the hand on the hip. Where it's turned 3/4, keep it turned.
The finished figure must sit exactly on top of the mannequin: same silhouette, same position, same size. Hair may add volume; nothing else may move.

Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536 image.
Top of head at y 92; soles on y 371. Height 280 px (4 px per inch).
Landmarks (game pixels, x left→right, y top→bottom; _L/_R = Parker's own left/right, and their left is on the viewer's right):
HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)
Hair, clothes and shoes may go up to 4 px past the mannequin's edge. Nothing else goes outside it.

Tattoos: His tattooed arm (full sleeve) and his big thigh piece are BOTH on the RIGHT side of the image (viewer's right), his own left side. Only a few small tattoos on the other forearm and lower leg.

Then give the JSON block.
```

## 2. Armor fittings
One new chat per set. **Start with Leather and Iron for each of you** and send those first, so we
can check the fit before you do the rest.

### Charlie (rose gold)
#### Charlie · Leather
Attach `fitting-charlie.png` **first**, then the style sheet. Save as **charlie-leather.png**.

```text
Armor fitting: Charlie's Leather set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Charlie's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Leather armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Charlie's own left/right, their left is on the viewer's right): HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)

Material: stitched brown leather with small buckles. Main colour ramp (light→dark): #e3b27a #b07440 #744a28 #402815.
Accent trims, rivets, edges and emblems in rose gold: #fbe3d8 #e8b4a0 #c4877a #8e5550.
Style: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Charlie · Stone
Attach `fitting-charlie.png` **first**, then the style sheet. Save as **charlie-stone.png**.

```text
Armor fitting: Charlie's Stone set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Charlie's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Stone armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Charlie's own left/right, their left is on the viewer's right): HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)

Material: carved grey stone plates with moss in the cracks. Main colour ramp (light→dark): #d2cec6 #a09a90 #6d6860 #3d3a36.
Accent trims, rivets, edges and emblems in rose gold: #fbe3d8 #e8b4a0 #c4877a #8e5550.
Style: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Charlie · Iron
Attach `fitting-charlie.png` **first**, then the style sheet. Save as **charlie-iron.png**.

```text
Armor fitting: Charlie's Iron set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Charlie's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Iron armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Charlie's own left/right, their left is on the viewer's right): HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)

Material: polished riveted iron plate. Main colour ramp (light→dark): #eef2f5 #b8c1c9 #7d8893 #474f58.
Accent trims, rivets, edges and emblems in rose gold: #fbe3d8 #e8b4a0 #c4877a #8e5550.
Style: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Charlie · Gold
Attach `fitting-charlie.png` **first**, then the style sheet. Save as **charlie-gold.png**.

```text
Armor fitting: Charlie's Gold set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Charlie's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Gold armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Charlie's own left/right, their left is on the viewer's right): HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)

Material: ornate engraved gold plate. Main colour ramp (light→dark): #fff3b0 #f2c94c #c7952a #7a5610.
Accent trims, rivets, edges and emblems in rose gold: #fbe3d8 #e8b4a0 #c4877a #8e5550.
Style: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Charlie · Crystal
Attach `fitting-charlie.png` **first**, then the style sheet. Save as **charlie-crystal.png**.

```text
Armor fitting: Charlie's Crystal set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Charlie's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Crystal armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Charlie's own left/right, their left is on the viewer's right): HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)

Material: faceted glowing crystal plates. Main colour ramp (light→dark): #e6fcff #92e8f4 #3db5cf #1e6d85.
Accent trims, rivets, edges and emblems in rose gold: #fbe3d8 #e8b4a0 #c4877a #8e5550.
Style: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Charlie · Obsidian
Attach `fitting-charlie.png` **first**, then the style sheet. Save as **charlie-obsidian.png**.

```text
Armor fitting: Charlie's Obsidian set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Charlie's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Obsidian armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Charlie's own left/right, their left is on the viewer's right): HEAD_TOP (128, 128), CHIN (128, 160), SHOULDER_R (106, 176), SHOULDER_L (147, 176), WAIST_R (115, 212), WAIST_L (143, 212), WAIST_C (129, 212), HIP_R (97, 243), HIP_L (149, 243), HIP_C (123, 243), KNEE_R (113, 297), KNEE_L (153, 297), ANKLE_R (119, 347), ANKLE_L (170, 347), FLOOR_R (120, 371), FLOOR_L (171, 371), ELBOW_R (84, 199), WRIST_R (100, 215), ELBOW_L (153, 221), WRIST_L (162, 250)

Material: black volcanic glass with faint violet glow in the seams. Main colour ramp (light→dark): #8a74ad #4d3a6b #2a1d3d #130c1e.
Accent trims, rivets, edges and emblems in rose gold: #fbe3d8 #e8b4a0 #c4877a #8e5550.
Style: Cute, feminine and flattering: form-fitting and shaped to her curves, fantasy-RPG style that shows some skin (bare midriff, open shoulders and upper thighs between plates), sculpted bust plate, cinched waist, hip plates that follow her hips, heart and rose details. Cute and confident, not bulky.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

### Parker (metallic green)
#### Parker · Leather
Attach `fitting-parker.png` **first**, then the style sheet. Save as **parker-leather.png**.

```text
Armor fitting: Parker's Leather set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Parker's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Leather armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Parker's own left/right, their left is on the viewer's right): HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)

Material: stitched brown leather with small buckles. Main colour ramp (light→dark): #e3b27a #b07440 #744a28 #402815.
Accent trims, rivets, edges and emblems in metallic green: #c6f5d4 #5fcf8a #2a9457 #17543a.
Style: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Parker · Stone
Attach `fitting-parker.png` **first**, then the style sheet. Save as **parker-stone.png**.

```text
Armor fitting: Parker's Stone set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Parker's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Stone armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Parker's own left/right, their left is on the viewer's right): HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)

Material: carved grey stone plates with moss in the cracks. Main colour ramp (light→dark): #d2cec6 #a09a90 #6d6860 #3d3a36.
Accent trims, rivets, edges and emblems in metallic green: #c6f5d4 #5fcf8a #2a9457 #17543a.
Style: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Parker · Iron
Attach `fitting-parker.png` **first**, then the style sheet. Save as **parker-iron.png**.

```text
Armor fitting: Parker's Iron set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Parker's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Iron armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Parker's own left/right, their left is on the viewer's right): HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)

Material: polished riveted iron plate. Main colour ramp (light→dark): #eef2f5 #b8c1c9 #7d8893 #474f58.
Accent trims, rivets, edges and emblems in metallic green: #c6f5d4 #5fcf8a #2a9457 #17543a.
Style: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Parker · Gold
Attach `fitting-parker.png` **first**, then the style sheet. Save as **parker-gold.png**.

```text
Armor fitting: Parker's Gold set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Parker's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Gold armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Parker's own left/right, their left is on the viewer's right): HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)

Material: ornate engraved gold plate. Main colour ramp (light→dark): #fff3b0 #f2c94c #c7952a #7a5610.
Accent trims, rivets, edges and emblems in metallic green: #c6f5d4 #5fcf8a #2a9457 #17543a.
Style: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Parker · Crystal
Attach `fitting-parker.png` **first**, then the style sheet. Save as **parker-crystal.png**.

```text
Armor fitting: Parker's Crystal set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Parker's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Crystal armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Parker's own left/right, their left is on the viewer's right): HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)

Material: faceted glowing crystal plates. Main colour ramp (light→dark): #e6fcff #92e8f4 #3db5cf #1e6d85.
Accent trims, rivets, edges and emblems in metallic green: #c6f5d4 #5fcf8a #2a9457 #17543a.
Style: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

#### Parker · Obsidian
Attach `fitting-parker.png` **first**, then the style sheet. Save as **parker-obsidian.png**.

```text
Armor fitting: Parker's Obsidian set. EDIT image 1 (the cyan fitting mannequin). Do NOT draw a new picture: keep its exact canvas, figure size, position and pose. Follow the project's armor rules exactly.

Image 1: Parker's CYAN fitting mannequin. Image 2: the style sheet (reference only).
Paint a full Obsidian armor set directly onto the cyan mannequin: helm, pauldrons, chest, bracers/gauntlets, belt, thigh plates, greaves, boots.
Leave every bit of body NOT covered by armor exactly flat cyan #00ffff with its #007a7a outline. Don't draw skin, face, hair or clothes. Background stays flat #ff00ff.
Don't move, rescale, or re-pose anything. Grid: 256×384 game pixels, each an exact 4×4 block → 1024×1536.
Landmarks (game pixels; _L/_R = Parker's own left/right, their left is on the viewer's right): HEAD_TOP (128, 92), CHIN (128, 125), SHOULDER_R (106, 142), SHOULDER_L (154, 142), WAIST_R (100, 197), WAIST_L (137, 197), WAIST_C (118, 197), HIP_R (90, 234), HIP_L (147, 234), HIP_C (118, 234), KNEE_R (112, 293), KNEE_L (157, 293), ANKLE_R (117, 342), ANKLE_L (172, 345), FLOOR_R (110, 356), FLOOR_L (172, 370), ELBOW_R (87, 198), WRIST_R (76, 220), ELBOW_L (165, 197), WRIST_L (164, 225)

Material: black volcanic glass with faint violet glow in the seams. Main colour ramp (light→dark): #8a74ad #4d3a6b #2a1d3d #130c1e.
Accent trims, rivets, edges and emblems in metallic green: #c6f5d4 #5fcf8a #2a9457 #17543a.
Style: Big, beefy and very manly: oversized layered pauldrons, a massive sculpted chest plate, thick bracers and greaves, heavy boots, an imposing warrior silhouette. Bulky, not sleek.
Armor may stand up to 6 px off the body (pauldrons, helm crest), but no capes, weapons or shields, and nothing that crosses between pieces.
```

## 3. Sticker sheets
Attach the style sheet. Save as **sheet-<name>.png**.

### Charlie's shields & weapons → sheet-gear-charlie.png
```text
Sticker sheet: Charlie's shields & weapons. Follow the project's sticker-sheet rules exactly.

A 4×3 grid (columns × rows), one item per cell, in this exact order (row.column):
1.1 round buckler
1.2 heart shield
1.3 kite shield
1.4 tower shield
2.1 short sword
2.2 magic wand
2.3 crossbow
2.4 war fan
3.1 heart staff
3.2 twin daggers
3.3 spear
3.4 legendary rose blade

Every item has rose gold accents (#fbe3d8 #e8b4a0 #c4877a #8e5550), matching the armor.

Held items are drawn upright, handle or grip at the bottom centre of their cell. Shields face the viewer.
Same pixel scale as the avatars: each game pixel an exact 4×4 block. A sword should be about as long as the avatar's arm.
```

### Parker's shields & weapons → sheet-gear-parker.png
```text
Sticker sheet: Parker's shields & weapons. Follow the project's sticker-sheet rules exactly.

A 4×3 grid (columns × rows), one item per cell, in this exact order (row.column):
1.1 round shield
1.2 kite shield
1.3 spiked shield
1.4 tower shield
2.1 broadsword
2.2 battle axe
2.3 warhammer
2.4 greatsword
3.1 mace
3.2 flail
3.3 halberd
3.4 legendary emerald greatsword

Every item has metallic green accents (#c6f5d4 #5fcf8a #2a9457 #17543a), matching the armor.

Held items are drawn upright, handle or grip at the bottom centre of their cell. Shields face the viewer.
Same pixel scale as the avatars: each game pixel an exact 4×4 block. A sword should be about as long as the avatar's arm.
```

### Loot & UI → sheet-loot.png
```text
Sticker sheet: Loot & UI. Follow the project's sticker-sheet rules exactly.

A 4×3 grid (columns × rows), one item per cell, in this exact order (row.column):
1.1 gold coin
1.2 stack of coins
1.3 XP gem
1.4 health potion
2.1 stamina potion
2.2 protein shake potion
2.3 treasure chest (closed)
2.4 treasure chest (open)
3.1 trophy
3.2 PR star medal
3.3 map pin
3.4 heart

Held items are drawn upright, handle or grip at the bottom centre of their cell. Shields face the viewer.
Same pixel scale as the avatars: each game pixel an exact 4×4 block. A sword should be about as long as the avatar's arm.
```

## What to check before sending
- **Size:** is it 1024×1536 on a flat magenta background?
- **Avatars:** same pose and shape as the mannequin, feet on the floor line, tattoos on the right side
  (their left is on the viewer's right)?
- **Armor:** is the uncovered body still flat cyan? No skin or face drawn?
- **Sheets:** does every item sit in its own cell, in the listed order, with nothing touching?
- **If one part is off,** just ask ChatGPT to fix that part ("keep everything, only move the helm down 4 px").
  It's often faster than a reroll.
