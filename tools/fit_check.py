"""Does a ChatGPT avatar/armor image still match the person's mannequin?

    python3 tools/fit_check.py <image> <charlie|parker>

Normalises both to real height on the grid (so ChatGPT drawing it bigger or
off-centre doesn't count against it), then compares silhouettes. Hair and
armor stick out a bit, so ~85%+ overlap is usable; lower means the pose or
build drifted: reroll. Saves docs/fit-<who>.png (red = mannequin only,
green = image only, yellow = both).
"""
import os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import import_mannequin as T

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")


def grid(path, who):
    im = Image.open(path).convert("RGB")
    m, _ = T.background_mask(im)
    return T.to_grid(im, T.keep_big_blobs(m), who)[0]


def main(path, who):
    a = grid(path, who)
    b = grid(os.path.join(ROOT, f"public/mannequins/mannequin-{who}.png"), who)
    both = sum(a[y][x] and b[y][x] for y in range(T.GH) for x in range(T.GW))
    either = sum(a[y][x] or b[y][x] for y in range(T.GH) for x in range(T.GW))
    # Only count the mannequin's body being covered (hair/armor sticking out is fine).
    body = sum(b[y][x] for y in range(T.GH) for x in range(T.GW))
    covered = both / body
    im = Image.new("RGB", (T.GW, T.GH))
    for y in range(T.GH):
        for x in range(T.GW):
            im.putpixel((x, y), (255 * b[y][x], 255 * a[y][x], 0))
    im.resize((T.GW * 2, T.GH * 2), Image.NEAREST).save(os.path.join(ROOT, f"docs/fit-{who}.png"))
    verdict = "usable" if covered >= 0.85 and both / either >= 0.7 else "reroll (pose/build drifted)"
    print(f"{who}: covers {covered:.0%} of the mannequin, overlap {both / either:.0%} → {verdict}")


if __name__ == "__main__":
    main(*sys.argv[1:3])
