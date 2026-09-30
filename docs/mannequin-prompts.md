# Designing the body templates (mannequins) in ChatGPT

The mannequin is the body everything else is built on. Your avatars get painted over it, and
every armor set is fitted to it. So **get these right before making any armor**: armor made
for one mannequin won't fit a different one.

You design the look. It doesn't need to be pixel art or any exact size. I handle that when you
send it:

1. **Scale to real heights:** each body gets scaled to exactly 5'1" and 5'10" on the game grid.
2. **Pixelate:** they get pixelated and set on the same floor line, so the height difference is exact.
3. **Measure the landmarks:** head, chin, shoulders, elbows, wrists, waist, hips, knees and ankles are
   found automatically, and I send you a check image with them marked.
4. **Make the armor version:** a cyan "fitting" copy gets made for the armor runs.

Do both in the **same chat**, so they match in style.

---

## Step 1: design (go wild, iterate as much as you want)

Edit the **Body** and **Pose** lines to be exactly how you want to look.

**Charlie**
```text
I'm designing the body template for my character in an RPG. Draw a blank, featureless
mannequin, like an artist's figure-drawing mannequin: smooth body, no face, no hair, no
clothes, no details. Full body, head to toe, facing the viewer.

Body: a petite woman, 5'1", curvy and cute: full bust, small waist, wide hips, thick
thighs, soft feminine shape.
Pose: playful and confident, a little hip pop with one hand resting on her hip, the other
arm relaxed.

Show me 4 options side by side.
```

**Parker**
```text
Now the same kind of blank mannequin, same style, for my boyfriend's character.

Body: a man, 5'10", big and beefy, a little exaggerated: broad shoulders, big chest,
thick arms and legs, strong V-taper.
Pose: a cool, confident hero stance, feet planted apart, arms slightly away from his
body, fists relaxed.

Show me 4 options side by side.
```

Then just talk to it: "more hip", "less bulky arms", "a sassier stance", "option 2 but with
option 3's legs", and so on.

---

## Step 2: lock it in as a clean template

Once you love one, send this. Do it once for each of you, and fill in the option.

```text
Perfect. Now redraw option ___ as a clean template, following these rules exactly:
- One figure only. Full body, front view, facing straight at the viewer. No perspective,
  no foreshortening, no turned head or body.
- The whole body visible with empty space around it; feet flat on the ground.
- Flat light grey fill (#b4b4b4) with a thin dark outline (#3a3a3a). Subtle darker lines
  inside for curves and muscle are fine. No shading gradients, no face, no hair, no clothes.
- Background: flat solid magenta (#ff00ff) everywhere else. No floor, no shadow, no text.
- Arms NOT touching the body: leave a clear gap of background between each arm and the
  torso. A hand resting on the hip is the only allowed contact. Legs separated below the
  crotch with a visible gap.
- Simple hands (like mittens) and simple feet. No crossed arms or legs.
- Portrait 2:3 image (1024×1536).
It doesn't need to be pixel art.
```

**Why the gaps matter:** armor is cut into pieces by body part, and the arms are found by the
background gap beside them. A glued-on arm makes the pauldrons and bracers land wrong.

---

## Step 3: send them to me

Download the final images (the actual files, **not screenshots**) and send them named
**mannequin-charlie.png** and **mannequin-parker.png**. I'll import them and send back the check
images with the landmarks marked. After you OK them, I'll regenerate the full ChatGPT kit
(avatars, armor fittings, sticker sheets) around your mannequins.
