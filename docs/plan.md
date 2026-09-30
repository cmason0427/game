# Parker's workout game (planned, not built yet)

Charlie's notes for later. **Parker doesn't know about this part yet.** Keep
it a surprise: nothing in the app should hint at it until it's built.

## The idea

A fully built, *fancy* game that grows out of Parker's real workouts and eating.

- **It sets his plan.** From his goals (target weight, and the date he wants
  to hit it) it sets each day's workout and eating targets (calories,
  protein, reps), and the workouts naturally get harder over time.
- **Workout → "Continue your adventure?"** He does the day's workout, taps a
  button marking what he did, and it asks whether he wants to continue his
  adventure.
- **Armor, earned.** How well the day met its goals earns armor, tiered like
  Minecraft: leather → iron → … and up, with room for our own tiers (a
  "stone" system, etc.). A big display shows the new armor being added to
  his character.
- **Boss fights.** After the armor, it asks if he wants a new boss fight
  with it. He can't win without the gear, so he's working up to it.
- **A map.** He moves along a map, and it should feel like a real game.

## How it connects to Us

- It's linked from inside our shared app but **runs as its own thing**, so
  it never slows the rest of the app down.
- **All tracking already happening in Us feeds it automatically.** That's the
  whole reason tracking exists now:
  - Food Charlie logs *for* Parker (e.g. the lunch she made him) counts toward
    his protein and calories.
  - His own food logs, workout logs (sets × reps), and weigh-ins.

## Where the data already lives (built now)

These tables are the game's inputs; the game should only *read* them (plus
its own tables for armor, bosses, map progress):

| Table | What it is |
| --- | --- |
| `fit_profiles` | Per person: tracking style, calorie/protein goals, weight goal + goal date, rep goals |
| `food_logs` | What someone ate: whose intake (`user_id`), who logged it (`logged_by`), day, meal, kcal, protein, optional saved meal |
| `workout_logs` | Workouts and hikes: whose, day, kind, exercise name, sets, reps, weight, minutes, distance |
| `weigh_ins` | Weight over time |
| `home_meals.kcal` / `.protein` | Per-serving numbers on saved meals, so logging a meal fills them in |

Everything is dated and per person, so "how well did today meet its goals"
is a query over one day's rows.

---

# Build plan (research, Sept 30 2026)

## Decisions so far
- **Both of us play.** Each person has their own character, armor, plan and map.
  We only team up on **co-op missions** that we deliberately set up as co-op.
  Otherwise the adventures are separate.
- **It lives at `/game` inside Us.**
- **The secret notes stay in the repo** (Charlie: he won't look).
- **Claude API: waiting on Charlie** after she sees the cost breakdown.

## Look and feel
- 70s/80s cutesy arcade/RPG: chunky pixels, limited palette (PICO-8 style
  16 colours as a base), CRT-ish glow, bouncy tweens, chiptune sound effects.
  "Established" means polished menus, a real map, save-state, and juicy
  feedback (screen shake, sparkles), not "a web page with a pixel font".
- Pixel fonts only inside the game (e.g. Pixelify Sans / Silkscreen). Us
  keeps Inter + Fraunces.
- Sound: ZzFX (a tiny synth, under 1 KB) for coins, hits and level-ups; muted by default.

## Where it lives
Recommended: a **its own site (Cloudflare Pages)**, not a separate site.
- Next already loads each route's code separately, so a heavy game route adds
  nothing to the rest of Us. The engine only downloads when you open the game.
- It shares login, Supabase and data with no token handoff. A second Netlify site
  would mean a second login (Supabase keeps the session per domain) and a
  second paid build on pushes that touch it.
- Engine: **Phaser 3** for the map and battle scenes (sprites, tweens,
  particles, input). Menus and forms stay React, laid over the canvas.

## Avatars ("put me in the game")
The honest limit: Claude reads photos very well but does **not** generate
images, and "Claude Design" can't be called from an app. So:
- **Paper-doll sprites.** Pre-made pixel layers: body shapes, skin tones,
  hair, beards, glasses, and tattoo overlays per body region (left arm
  sleeve, right leg, chest…), then armor layers per tier on top. Armor goes
  on "live" because it's just another layer.
- **Claude as the character designer.** You upload a photo, and a server job sends it
  to Claude (vision). Claude returns JSON: skin/hair/eye colours, hairstyle,
  facial hair, build, and per-region tattoos (coverage + 2-3 dominant colours
  + a small pixel pattern it draws for that region). The app composes the
  sprite. A new full-leg tattoo shows up as that leg's region filling in.
- Takes ~30-60 s; the UI says "your avatar is being forged, check back
  soon" and pings when done. Old avatars are kept (you can switch back).
- Optional later: a fancier illustrated portrait from an image model (a
  different company, costs per image). Not needed for v1.

## Plans ("here's how I'm doing, make me a plan")
- A long text box: goals, weight, hikes a week, steps, how you feel, what
  you liked or hated about the current plan.
- A server job sends Claude that text, the **current plan**, fit_profiles and
  the last few weeks of food/workout/weight logs. Claude returns a new plan as
  structured JSON: daily kcal/protein, a progressive workout schedule to the
  goal date, and a written "what changed and why" note. The old plan is kept and
  shown next to the new one; nothing applies until you accept it.
- **PR challenges**: always-visible optional stretch goals, each with a
  shown reward (e.g. "new deadlift PR → shield"). Hit it → reward drops in →
  Claude (or a simple rule) sets the next one, a bit harder.

## Talking to Claude from the app
- **Anthropic API** from a Netlify function / Supabase Edge Function, with the
  key stored server-side only. Pay-per-use: a plan review or avatar read is
  roughly cents each; a realistic month is a few dollars at most.
- Jobs go in a `game_jobs` table (queued → running → done/failed), so
  "come back in 15 minutes" is just polling that row, and it survives
  closing the app.
- Photos go to Anthropic's API for the read (not used for training on
  API by default). They're stored in our private bucket, same as spicy.

## Steps
- A web app can't read Apple Health directly. An **iOS Shortcut automation**
  can: once a day it reads steps (and workouts) and POSTs them to a small
  authenticated endpoint on Us. It's zero-tap after setup.

## Game loop (v1)
Log workout → "Continue your adventure?" → armor/XP from how well the day hit
its targets → map step → boss when you're geared enough (bosses have gear
checks, so you can't cheese them) → PR challenges as side quests.

## Claude API cost estimate (list prices, Sept 2026)
Opus 5.5 is $4 in / $20 out per million tokens. Sonnet 5.5 is $2 / $10. The Batch API is half
price and returns within the hour, which fits "come back later".
| Job | Model | Roughly |
| --- | --- | --- |
| Avatar from a photo | Opus 5.5 | ~$0.10-0.15 |
| Plan rewrite (text + old plan + weeks of logs) | Opus 5.5 | ~$0.25-0.35 |
| New PR challenge / boss flavour text | Sonnet 5.5 | ~$0.01 (or $0 with rules) |
A normal month for two players is about $3-4. A heavy tinkering month is about $10-12.
With batch, halve those. Set a hard monthly spend limit in the Claude Console.

## Avatars v2, armor and items (Charlie, Sept 30)
- **Look:** polished modern pixel art (a good indie RPG), not chunky 70s arcade. 4 px per inch on a
  256×384 grid, exported at 1024×1536.
- **The body is the look we want, not the photo:**
  - Charlie: curvy and cute, hip popped, her right hand on her hip.
  - Parker: beefy and exaggerated (broad delts, big chest, V-taper), wide hero stance.
  - Shape and pose come from the mannequins designed in ChatGPT (see the update below).
- **Named landmarks with exact pixel coords** (`HEAD_TOP`, `SHOULDER_L/R`, `WAIST_C`, `KNEE_L/R`…) go in
  every prompt. They're the standard any model is held to. `_L` is always the person's own left.
- **Armor:** ChatGPT paints a whole tier set onto the person's *cyan fitting mannequin*.
  `tools/assets.py fitting` snaps it to the grid, keys out magenta and cyan, and cuts the armor into
  pieces by nearest bone, each saved with its x/y. So every piece is aligned and pieces mix across tiers.
  - Charlie's sets: cute, curvy, a bit skimpy, **rose-gold** accents.
  - Parker's sets: beefy, chesty, very manly, **metallic-green** accents.
  - Tiers are in `armorSpec.ts`: leather → stone → iron → gold → crystal → obsidian. Edit freely.
- **Items** (shields, weapons, loot, UI): sticker sheets in a labelled grid. `assets.py sheet` slices,
  trims and names them by cell. Grip points go in a manifest.
- **The kit to paste into ChatGPT** is `docs/chatgpt-kit.md`, regenerated by `npx tsx tools/kit.mts`.
  Mannequins and landmarks come from `tools/import_mannequin.py`.
- **Still to do in the game:** measure each uploaded avatar's real silhouette and nudge armor pieces a few px
  to fit, so a slimmer or fuller painted body still wears the same set.

## Update: mannequins are designed in ChatGPT (Sept 30)
Charlie didn't like the code-drawn mannequins. Now the body templates are designed in ChatGPT
(`docs/mannequin-prompts.md`) and imported with `tools/import_mannequin.py`. The importer scales them
to real height, pixelates them, measures the landmarks, and makes the cyan fitting copy. The
landmarks in `tools/spec.json` come from those imports; the old `figure()` code is gone.
