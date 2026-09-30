"""Turn ChatGPT's images into aligned game assets.

    python3 tools/assets.py avatar  <image> <person>
    python3 tools/assets.py fitting <image> <person> <tier>
    python3 tools/assets.py sheet   <image> <sheet-key>

Every image is first snapped to the game grid (each BLOCK×BLOCK block becomes
its most common colour), so near-miss pixel art comes out crisp. Then:
  avatar  → keys out magenta, anchors the feet on the floor line, saves
            public/avatars/<person>.png at grid size.
  fitting → keys out magenta and the cyan mannequin, then cuts what's left
            (the armor) into pieces by nearest body bone. Saves
            public/armor/<person>/<tier>/<piece>.png (cropped) and
            records each piece's x/y in public/armor/manifest.json.
  sheet   → keys out magenta, finds each item blob, names it by the grid
            cell it sits in, trims it, and saves
            public/items/<sheet>/<item>.png plus grip points in
            public/items/manifest.json.
Needs Pillow. Reads tools/spec.json (made by mannequins.mts).
"""

import json, math, os, re, sys
from collections import Counter, deque
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SPEC = json.load(open(os.path.join(os.path.dirname(__file__), "spec.json")))
GW, GH = SPEC["grid"]
BLOCK = SPEC["block"]
FLOOR_Y = SPEC["floorY"]


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def snap(path):
    """Resize to the full grid image, then collapse each block to its commonest colour."""
    im = Image.open(path).convert("RGB")
    if im.size != (GW * BLOCK, GH * BLOCK):
        if abs(im.size[0] / im.size[1] - GW / GH) > 0.02:
            print(f"warning: {path} is {im.size}, not {GW * BLOCK}x{GH * BLOCK}; stretching to fit")
        im = im.resize((GW * BLOCK, GH * BLOCK), Image.NEAREST)
    px = im.load()
    out = Image.new("RGBA", (GW, GH))
    op = out.load()
    for gy in range(GH):
        for gx in range(GW):
            c = Counter()
            for y in range(gy * BLOCK, gy * BLOCK + BLOCK):
                for x in range(gx * BLOCK, gx * BLOCK + BLOCK):
                    r, g, b = px[x, y]
                    c[(r >> 3 << 3, g >> 3 << 3, b >> 3 << 3)] += 1
            r, g, b = c.most_common(1)[0][0]
            op[gx, gy] = (r, g, b, 255)
    return out


def is_magenta(c):
    r, g, b = c[:3]
    return r > 190 and b > 190 and g < 90


def is_fit_body(c):
    r, g, b = c[:3]
    cyan = r < 90 and g > 190 and b > 190
    line = r < 50 and 90 <= g <= 160 and 90 <= b <= 160 and abs(g - b) < 30
    return cyan or line


def key(im, test):
    px = im.load()
    for y in range(GH):
        for x in range(GW):
            if test(px[x, y]):
                px[x, y] = (0, 0, 0, 0)


def drop_specks(im, min_px=4):
    """Remove tiny stray islands (JPEG-ish noise, stray AI pixels)."""
    px = im.load()
    W, H = im.size
    seen = set()
    for y in range(H):
        for x in range(W):
            if px[x, y][3] and (x, y) not in seen:
                q = deque([(x, y)])
                seen.add((x, y))
                blob = []
                while q:
                    cx, cy = q.popleft()
                    blob.append((cx, cy))
                    for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                        if 0 <= nx < W and 0 <= ny < H and (nx, ny) not in seen and px[nx, ny][3]:
                            seen.add((nx, ny))
                            q.append((nx, ny))
                if len(blob) < min_px:
                    for bx, by in blob:
                        px[bx, by] = (0, 0, 0, 0)


def save_manifest(path, update):
    data = json.load(open(path)) if os.path.exists(path) else {}
    for k, v in update.items():
        data.setdefault(k, {}).update(v)
    json.dump(data, open(path, "w"), indent=1, sort_keys=True)


def avatar(path, person):
    im = snap(path)
    key(im, is_magenta)
    drop_specks(im)
    bbox = im.getbbox()
    if bbox:
        # Anchor: the lowest pixel sits on the floor row.
        shift = (FLOOR_Y - 1) - (bbox[3] - 1)
        if shift:
            moved = Image.new("RGBA", im.size)
            moved.alpha_composite(im, (0, shift))
            im = moved
            print(f"moved feet by {shift} px to the floor line")
    out = os.path.join(ROOT, "public/avatars")
    os.makedirs(out, exist_ok=True)
    im.save(os.path.join(out, f"{person}.png"), optimize=True)
    print("saved", f"public/avatars/{person}.png")


def seg_dist(p, a, b):
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    L = dx * dx + dy * dy
    t = 0 if L == 0 else max(0, min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / L))
    return math.hypot(p[0] - (ax + t * dx), p[1] - (ay + t * dy))


def bones(person):
    lm = SPEC["landmarks"][person]
    out = []
    for piece in SPEC["pieces"]:
        for side in ("_L", "_R") if piece.get("side") else ("",):
            a = lm[piece["from"] + side] if piece["from"] + side in lm else lm[piece["from"]]
            b = lm[piece["to"] + side] if piece["to"] + side in lm else lm[piece["to"]]
            name = piece["key"] + ("_" + side[1:].lower() if side else "")
            out.append((name, (a["x"], a["y"]), (b["x"], b["y"])))
    return out


def fitting(path, person, tier):
    im = snap(path)
    key(im, is_magenta)
    key(im, is_fit_body)
    drop_specks(im, 6)
    px = im.load()
    bs = bones(person)
    layers = {name: Image.new("RGBA", (GW, GH)) for name, _, _ in bs}
    for y in range(GH):
        for x in range(GW):
            c = px[x, y]
            if not c[3]:
                continue
            name = min(bs, key=lambda b: seg_dist((x, y), b[1], b[2]))[0]
            layers[name].putpixel((x, y), c)
    out = os.path.join(ROOT, "public/armor", person, tier)
    os.makedirs(out, exist_ok=True)
    entries = {}
    for name, layer in layers.items():
        bbox = layer.getbbox()
        if not bbox:
            continue
        layer.crop(bbox).save(os.path.join(out, f"{name}.png"), optimize=True)
        entries[f"{tier}/{name}"] = {"x": bbox[0], "y": bbox[1], "w": bbox[2] - bbox[0], "h": bbox[3] - bbox[1]}
    save_manifest(os.path.join(ROOT, "public/armor/manifest.json"), {person: entries})
    print(f"saved {len(entries)} pieces to public/armor/{person}/{tier}/:", ", ".join(sorted(e.split('/')[1] for e in entries)))


def sheet(path, sheet_key):
    spec = next(s for s in SPEC["sheets"] if s["key"] == sheet_key)
    cols = spec["cols"]
    rows = math.ceil(len(spec["items"]) / cols)
    im = snap(path)
    key(im, is_magenta)
    drop_specks(im, 6)
    px = im.load()
    # Blobs (8-connected), each assigned to the cell holding its centre.
    seen = set()
    cells = {}
    for y in range(GH):
        for x in range(GW):
            if px[x, y][3] and (x, y) not in seen:
                q = deque([(x, y)])
                seen.add((x, y))
                blob = []
                while q:
                    cx, cy = q.popleft()
                    blob.append((cx, cy))
                    for nx in (cx - 1, cx, cx + 1):
                        for ny in (cy - 1, cy, cy + 1):
                            if 0 <= nx < GW and 0 <= ny < GH and (nx, ny) not in seen and px[nx, ny][3]:
                                seen.add((nx, ny))
                                q.append((nx, ny))
                mx = sum(p[0] for p in blob) / len(blob)
                my = sum(p[1] for p in blob) / len(blob)
                cell = (min(rows - 1, int(my / GH * rows)), min(cols - 1, int(mx / GW * cols)))
                cells.setdefault(cell, []).extend(blob)
    out = os.path.join(ROOT, "public/items", sheet_key)
    os.makedirs(out, exist_ok=True)
    entries = {}
    for k, item in enumerate(spec["items"]):
        blob = cells.get((k // cols, k % cols))
        if not blob:
            print(f"missing: {item} (cell {k // cols + 1}.{k % cols + 1})")
            continue
        xs = [p[0] for p in blob]
        ys = [p[1] for p in blob]
        x0, y0, x1, y1 = min(xs), min(ys), max(xs) + 1, max(ys) + 1
        piece = Image.new("RGBA", (x1 - x0, y1 - y0))
        for x, y in blob:
            piece.putpixel((x - x0, y - y0), px[x, y])
        name = slug(item)
        piece.save(os.path.join(out, f"{name}.png"), optimize=True)
        # Held items are drawn grip-down: grip = bottom centre. Shields: centre.
        grip = [(x1 - x0) // 2, (y1 - y0) // 2 if "shield" in item or "buckler" in item else (y1 - y0) - 1]
        entries[name] = {"w": x1 - x0, "h": y1 - y0, "grip": grip}
    extra = set(cells) - {(k // cols, k % cols) for k in range(len(spec["items"]))}
    if extra:
        print("ignored blobs in unused cells:", sorted(extra))
    save_manifest(os.path.join(ROOT, "public/items/manifest.json"), {sheet_key: entries})
    print(f"saved {len(entries)}/{len(spec['items'])} items to public/items/{sheet_key}/")


if __name__ == "__main__":
    cmd, *args = sys.argv[1:]
    {"avatar": avatar, "fitting": fitting, "sheet": sheet}[cmd](*args)
