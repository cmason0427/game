"""Import a mannequin designed in ChatGPT as a person's official template.

    python3 tools/import_mannequin.py <image> <charlie|parker>

What it does:
  1. Keys out the flat background (whatever colour the corners are).
  2. Scales the figure so it's exactly the person's real height on the grid
     (4 px per inch: 5'1" = 244 px, 5'10" = 280 px), pixelates it onto the
     256×384 grid, centres it on the head, and stands the feet on the floor row.
  3. Measures the landmarks (HEAD_TOP, CHIN, SHOULDER_L/R, ELBOW_L/R, WRIST_L/R,
     WAIST_L/R/C, HIP_L/R/C, KNEE_L/R, ANKLE_L/R, FLOOR_L/R) from the silhouette.
     _L/_R = the person's own side (their left is on the viewer's right).
  4. Writes public/mannequins/mannequin-<who>.png (grey, for avatars),
     public/mannequins/fitting-<who>.png (cyan, for armor), a landmark check
     image docs/landmarks-<who>.png, and the landmarks into tools/spec.json.

If a landmark lands wrong, put the fix in tools/landmark-fixes.json, e.g.
{"charlie": {"ELBOW_R": [80, 210]}}, and re-run. Fixes always win.
"""

import json, os, sys
from collections import Counter, deque
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
GW, GH, BLOCK, FLOOR_Y, PPI = 256, 384, 4, 372, 4
HEIGHTS = {"charlie": 61, "parker": 70}
KEY = (255, 0, 255)
GREY, GREY_LINE = (180, 180, 180), (58, 58, 58)
CYAN, CYAN_LINE = (0, 255, 255), (0, 122, 122)


def background_mask(im):
    """True where the pixel is figure. Background = the commonest border colour (± tolerance)."""
    W, H = im.size
    px = im.load()
    border = Counter()
    for x in range(0, W, 4):
        border[px[x, 0]] += 1
        border[px[x, H - 1]] += 1
    for y in range(0, H, 4):
        border[px[0, y]] += 1
        border[px[W - 1, y]] += 1
    bg = border.most_common(1)[0][0]
    tol = 60
    m = Image.new("L", im.size)
    mp = m.load()
    for y in range(H):
        for x in range(W):
            r, g, b = px[x, y]
            if abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) > tol:
                mp[x, y] = 255
    return m, bg


def keep_big_blobs(mask):
    """Drop specks: keep blobs at least 2% the size of the biggest."""
    W, H = mask.size
    mp = mask.load()
    seen = bytearray(W * H)
    blobs = []
    for y in range(H):
        for x in range(W):
            if mp[x, y] and not seen[y * W + x]:
                q = deque([(x, y)])
                seen[y * W + x] = 1
                pts = []
                while q:
                    cx, cy = q.popleft()
                    pts.append((cx, cy))
                    for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                        if 0 <= nx < W and 0 <= ny < H and mp[nx, ny] and not seen[ny * W + nx]:
                            seen[ny * W + nx] = 1
                            q.append((nx, ny))
                blobs.append(pts)
    big = max(len(b) for b in blobs)
    for b in blobs:
        if len(b) < 0.02 * big:
            for x, y in b:
                mp[x, y] = 0
    return mask


def to_grid(im, mask, who):
    """Scale to real height, pixelate, place on the grid. Returns grid mask + line map."""
    bbox = mask.getbbox()
    crop = mask.crop(bbox)
    art = im.crop(bbox).convert("L")
    Hpx = HEIGHTS[who] * PPI
    s = Hpx / crop.size[1]
    w = max(1, round(crop.size[0] * s))
    m = crop.resize((w, Hpx), Image.BOX).point(lambda v: 255 if v >= 128 else 0)
    lum = art.resize((w, Hpx), Image.BOX)
    if w > GW - 8:
        print(f"warning: figure is {w} px wide at this height; the grid is {GW}. Arms/stance too wide?")
    # Centre on the head (top 6% of rows), feet on the floor.
    mp = m.load()
    xs = [x for y in range(max(1, round(Hpx * 0.06))) for x in range(w) if mp[x, y]]
    head_cx = sum(xs) / len(xs)
    ox = round(GW / 2 - head_cx)
    oy = FLOOR_Y - Hpx
    grid = [[False] * GW for _ in range(GH)]
    dark = [[False] * GW for _ in range(GH)]
    lp = lum.load()
    inside = [lp[x, y] for y in range(Hpx) for x in range(w) if mp[x, y]]
    med = sorted(inside)[len(inside) // 2]
    for y in range(Hpx):
        for x in range(w):
            gx, gy = x + ox, y + oy
            if mp[x, y] and 0 <= gx < GW and 0 <= gy < GH:
                grid[gy][gx] = True
                dark[gy][gx] = lp[x, y] < med * 0.55  # keep ChatGPT's interior contour lines
    return grid, dark


def runs(row):
    out, x = [], 0
    while x < len(row):
        if row[x]:
            s = x
            while x < len(row) and row[x]:
                x += 1
            out.append((s, x - 1))
        x += 1
    return out


def measure(grid):
    rows = [y for y in range(GH) if any(grid[y])]
    top, bot = rows[0], rows[-1]
    H = bot - top + 1
    at = lambda f: top + round(f * H)
    R = lambda y: runs(grid[y])
    head = [x for y in range(top, at(0.06)) for x in range(GW) if grid[y][x]]
    cx = round(sum(head) / len(head))

    def run_at(y, x):
        rs = R(y)
        if not rs:
            return None
        return min(rs, key=lambda r: 0 if r[0] <= x <= r[1] else min(abs(r[0] - x), abs(r[1] - x)))

    width = lambda r: r[1] - r[0] + 1
    lm = {"HEAD_TOP": (cx, top)}
    neck = min(range(at(0.08), at(0.25)), key=lambda y: width(run_at(y, cx)))
    lm["CHIN"] = (cx, neck)
    band = [(y, width(run_at(y, cx))) for y in range(neck, at(0.32))]
    widest = max(w for _, w in band)
    sy = next(y for y, w in band if w >= 0.8 * widest)
    r = run_at(sy, cx)
    inset = round(0.02 * H)
    lm["SHOULDER_R"], lm["SHOULDER_L"] = (r[0] + inset, sy), (r[1] - inset, sy)

    # Crotch: the gap between the legs at knee height, followed up until it closes.
    ky = at(0.72)
    rs = sorted(R(ky), key=lambda r: abs((r[0] + r[1]) / 2 - cx))[:2]
    rs.sort()
    gx = (rs[0][1] + rs[1][0]) // 2 if len(rs) == 2 else cx
    cy = ky
    while cy > at(0.35) and not grid[cy][gx]:
        cy -= 1
    crotch = cy

    # Torso centre drifts from the neck (cx) to the crotch gap (gx): hip-pop aware.
    tc = lambda y: round(cx + (gx - cx) * max(0, min(1, (y - sy) / max(1, crotch - sy))))
    ty = range(sy + round(0.12 * H), crotch - round(0.04 * H))
    wy = min(ty, key=lambda y: width(run_at(y, tc(y))))
    w = run_at(wy, tc(wy))
    lm["WAIST_R"], lm["WAIST_L"], lm["WAIST_C"] = (w[0], wy), (w[1], wy), ((w[0] + w[1]) // 2, wy)
    hy = max(range(wy, crotch), key=lambda y: width(run_at(y, tc(y))))
    h = run_at(hy, tc(hy))
    lm["HIP_R"], lm["HIP_L"], lm["HIP_C"] = (h[0], hy), (h[1], hy), ((h[0] + h[1]) // 2, hy)

    # Legs: the two runs either side of the crotch gap.
    def legs(y):
        rs = R(y)
        left = [r for r in rs if r[1] < gx + 2]
        right = [r for r in rs if r[0] > gx - 2]
        L = max(left, key=lambda r: r[1]) if left else None
        Rr = min(right, key=lambda r: r[0]) if right else None
        return L, Rr

    mid = lambda r: (r[0] + r[1]) // 2
    kn = crotch + round(0.42 * (bot - crotch))
    lr, rr = legs(kn)
    lm["KNEE_R"], lm["KNEE_L"] = (mid(lr), kn), (mid(rr), kn)
    an = bot - round(0.045 * H)
    lr, rr = legs(an)
    lm["ANKLE_R"], lm["ANKLE_L"] = (mid(lr), an), (mid(rr), an)
    lm["FLOOR_R"], lm["FLOOR_L"] = (mid(lr), bot), (mid(rr), bot)

    # Arms: the run beside the torso on each side, from under the shoulder down.
    for side in ("R", "L"):
        pts = []
        for y in range(sy + round(0.03 * H), min(crotch + round(0.15 * H), bot)):
            t = run_at(y, tc(y))
            others = [r for r in R(y) if (r[1] < t[0] if side == "R" else r[0] > t[1])]
            if not others:
                if pts and y - pts[-1][1] > 2:
                    break
                continue
            a = max(others, key=lambda r: r[1]) if side == "R" else min(others, key=lambda r: r[0])
            if pts and abs(mid(a) - pts[-1][0]) > 0.04 * H:
                break  # jumped to something else (a leg), so the arm has ended
            pts.append((mid(a), y))
        if not pts:  # arm glued to the body the whole way: fall back to the torso edge
            ex = lm["SHOULDER_" + side][0]
            lm["ELBOW_" + side] = (ex, at(0.37))
            lm["WRIST_" + side] = (ex, at(0.5))
            continue
        out = min(pts, key=lambda p: p[0]) if side == "R" else max(pts, key=lambda p: p[0])
        low = pts[-1]
        bent = abs(out[0] - low[0]) > 0.03 * H and out[1] < low[1] - 0.05 * H
        ey = out[1] if bent else (sy + low[1]) // 2
        lm["ELBOW_" + side] = min(pts, key=lambda p: abs(p[1] - ey))
        wy_ = low[1] - round(0.03 * H)
        lm["WRIST_" + side] = min(pts, key=lambda p: abs(p[1] - wy_))
    return {k: {"x": int(v[0]), "y": int(v[1])} for k, v in lm.items()}


def paint(grid, dark, fill, line, bg):
    im = Image.new("RGB", (GW * BLOCK, GH * BLOCK), bg)
    d = ImageDraw.Draw(im)
    on = lambda x, y: 0 <= x < GW and 0 <= y < GH and grid[y][x]
    for y in range(GH):
        for x in range(GW):
            if on(x, y):
                edge = not (on(x - 1, y) and on(x + 1, y) and on(x, y - 1) and on(x, y + 1))
                c = line if edge or dark[y][x] else fill
                d.rectangle([x * BLOCK, y * BLOCK, x * BLOCK + BLOCK - 1, y * BLOCK + BLOCK - 1], fill=c)
    return im


def main(path, who):
    im = Image.open(path).convert("RGB")
    if max(im.size) > 1600:
        im.thumbnail((1600, 1600))
    mask, bg = background_mask(im)
    mask = keep_big_blobs(mask)
    grid, dark = to_grid(im, mask, who)
    lm = measure(grid)
    fixes_path = os.path.join(HERE, "landmark-fixes.json")
    if os.path.exists(fixes_path):
        for k, v in json.load(open(fixes_path)).get(who, {}).items():
            lm[k] = {"x": v[0], "y": v[1]}
    out = os.path.join(ROOT, "public/mannequins")
    os.makedirs(out, exist_ok=True)
    paint(grid, dark, GREY, GREY_LINE, KEY).save(f"{out}/mannequin-{who}.png", optimize=True)
    paint(grid, dark, CYAN, CYAN_LINE, KEY).save(f"{out}/fitting-{who}.png", optimize=True)
    check = paint(grid, dark, GREY, GREY_LINE, (244, 239, 230))
    d = ImageDraw.Draw(check)
    for k, p in lm.items():
        x, y = p["x"] * BLOCK, p["y"] * BLOCK
        d.rectangle([x - 6, y - 6, x + 6, y + 6], fill=(224, 69, 123))
        d.text((x + 9, y - 6), k, fill=(40, 20, 30))
    os.makedirs(os.path.join(ROOT, "docs"), exist_ok=True)
    check.save(os.path.join(ROOT, f"docs/landmarks-{who}.png"), optimize=True)
    spec_path = os.path.join(HERE, "spec.json")
    spec = json.load(open(spec_path)) if os.path.exists(spec_path) else {}
    spec.setdefault("landmarks", {})[who] = lm
    json.dump(spec, open(spec_path, "w"), indent=1)
    print(f"{who}: background {bg}, height {HEIGHTS[who] * PPI} px; wrote mannequin, fitting and docs/landmarks-{who}.png")
    for k, p in lm.items():
        print(f"  {k:11} ({p['x']}, {p['y']})")


if __name__ == "__main__":
    main(*sys.argv[1:3])
