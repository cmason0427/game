# Us: the game

The adventure game for Charlie and Parker. It's private and a secret from Parker for now.

- **It lives outside Us on purpose.** It's hosted on **Cloudflare Pages** (free), so building and serving it never costs Netlify credits.
- **It shares the Us Supabase database.** Food, workouts and weigh-ins logged in Us feed the game automatically (see `docs/plan.md`).
- **No game app yet.** The plan is Vite + Phaser 3 as a static site, with AI jobs later on Cloudflare Workers or Supabase Edge Functions.

## What's here now
| Path | What |
| --- | --- |
| `docs/plan.md` | The whole game idea, decisions, costs, avatar/armor design |
| `docs/mannequin-prompts.md` | **Start here:** designing the body templates in ChatGPT |
| `docs/chatgpt-kit.md` | (made after the mannequins) Everything else to paste into ChatGPT: style sheet, avatars, armor fittings, sticker sheets |
| `src/spec/avatarSpec.ts` | Height-true pixel grid, people, avatar prompt |
| `src/spec/armorSpec.ts` | Tiers, accent metals, armor pieces, sticker sheets, their prompts |
| `public/mannequins/` | Imported mannequins (grey for avatars, cyan for armor fittings) |
| `tools/import_mannequin.py` | Imports a ChatGPT mannequin: scales to real height, pixelates, measures landmarks |
| `tools/kit.mts` | Regenerates `docs/chatgpt-kit.md` and `tools/spec.json` |
| `tools/assets.py` | Slices ChatGPT output into aligned assets (`avatar`, `fitting`, `sheet`); needs Pillow |

```sh
npm install
python3 tools/import_mannequin.py mannequin-charlie.png charlie
npx tsx tools/kit.mts          # after changing any prompt
python3 tools/assets.py fitting parker-iron.png parker iron
```

## Hosting (when there's something to host)
Cloudflare dashboard → Workers & Pages → Create → Pages → connect this repo.
Build command `npm run build`, output directory `dist`. It's free: unlimited bandwidth, 500 builds a month.
