#!/usr/bin/env python3
"""
Digital Synapse — Blog Cover Generator for AdAwards
Generates 1200x630 algorithmic cover images with particle networks
and unique per-article motifs.
"""

import argparse
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ═══════════════════════════════════════════════════════════════
# BRAND CONSTANTS
# ═══════════════════════════════════════════════════════════════

W, H = 1200, 630
BG_TOP = (10, 12, 16)
BG_BOT = (15, 19, 24)
WATERMARK_OPACITY = 0.20
FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_PATH_REGULAR = "/System/Library/Fonts/Supplemental/Arial Narrow.ttf"

THEMES = {
    "geo-ai": {
        "color": (167, 139, 250),
        "density": 80,
        "motif": "conversation_flow",
    },
    "core-web-vitals": {
        "color": (34, 197, 94),
        "density": 50,
        "motif": "sinusoidal_waves",
    },
    "local-vs-national": {
        "color": (249, 115, 22),
        "color2": (59, 130, 246),
        "density": 60,
        "motif": "dual_clusters",
    },
    "schema-markup": {
        "color": (6, 182, 212),
        "density": 70,
        "motif": "tree_structure",
    },
    "koszt-seo": {
        "color": (245, 158, 11),
        "density": 55,
        "motif": "growth_curve",
    },
    "eeat": {
        "color": (30, 64, 175),
        "color2": (96, 130, 230),
        "density": 60,
        "motif": "concentric_orbits",
    },
    "link-building": {
        "color": (249, 115, 22),
        "color2": (239, 68, 68),
        "density": 85,
        "motif": "hub_network",
    },
    "ai-overview": {
        "color": (124, 58, 237),
        "color2": (249, 115, 22),
        "density": 65,
        "motif": "morph_transition",
    },
    "audyt-seo": {
        "color": (249, 115, 22),
        "density": 55,
        "motif": "radar_scan",
    },
    "google-moja-firma": {
        "color": (34, 197, 94),
        "color2": (59, 130, 246),
        "density": 55,
        "motif": "location_ripple",
    },
}


# ═══════════════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ═══════════════════════════════════════════════════════════════


def lerp(a, b, t):
    return int(a + (b - a) * t)


def lerp_color(c1, c2, t):
    return tuple(lerp(c1[i], c2[i], t) for i in range(3))


def clamp(v, lo, hi):
    return max(lo, min(hi, v))


def bezier_point(p0, p1, p2, p3, t):
    """Cubic Bezier at parameter t."""
    u = 1 - t
    return (
        u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0],
        u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1],
    )


# ═══════════════════════════════════════════════════════════════
# LAYER: GRADIENT BACKGROUND
# ═══════════════════════════════════════════════════════════════


def make_gradient_bg():
    img = Image.new("RGBA", (W, H))
    pixels = img.load()
    for y in range(H):
        t = y / H
        r, g, b = lerp_color(BG_TOP, BG_BOT, t)
        for x in range(W):
            pixels[x, y] = (r, g, b, 255)
    return img


# ═══════════════════════════════════════════════════════════════
# LAYER: CENTRAL GLOW
# ═══════════════════════════════════════════════════════════════


def add_glow(img, color, cx=None, cy=None, radius=280, intensity=35):
    if cx is None:
        cx = W // 2
    if cy is None:
        cy = H // 2
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for r in range(radius, 0, -3):
        t = r / radius
        alpha = int(intensity * (1 - t) ** 1.5)
        if alpha < 1:
            continue
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r], fill=(*color, clamp(alpha, 0, 255))
        )
    return Image.alpha_composite(img, layer)


# ═══════════════════════════════════════════════════════════════
# LAYER: PARTICLE NETWORK
# ═══════════════════════════════════════════════════════════════


def generate_particles(n, seed, margin=30):
    random.seed(seed)
    return [
        (random.randint(margin, W - margin), random.randint(margin, H - margin))
        for _ in range(n)
    ]


def draw_particle_network(
    img, particles, color, max_dist=160, line_alpha=0.25, node_alpha=0.7, node_r=(2, 5)
):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    # Lines
    for i, p1 in enumerate(particles):
        for j, p2 in enumerate(particles):
            if j <= i:
                continue
            d = math.hypot(p1[0] - p2[0], p1[1] - p2[1])
            if d < max_dist:
                a = int(255 * line_alpha * (1 - d / max_dist))
                draw.line([p1, p2], fill=(*color, clamp(a, 0, 255)), width=1)
    # Nodes
    random.seed(42)
    for p in particles:
        r = random.randint(node_r[0], node_r[1])
        a = int(255 * node_alpha)
        draw.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=(*color, a))
    return Image.alpha_composite(img, layer)


# ═══════════════════════════════════════════════════════════════
# LAYER: BOTTOM GRADIENT (for text overlay on blog)
# ═══════════════════════════════════════════════════════════════


def add_bottom_gradient(img, height=140, max_alpha=180):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for y in range(H - height, H):
        t = (y - (H - height)) / height
        a = int(max_alpha * t**1.5)
        draw.line([(0, y), (W, y)], fill=(10, 12, 16, clamp(a, 0, 255)))
    return Image.alpha_composite(img, layer)


# ═══════════════════════════════════════════════════════════════
# LAYER: WATERMARK
# ═══════════════════════════════════════════════════════════════


def add_watermark(img):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    try:
        font = ImageFont.truetype(FONT_PATH_REGULAR, 13)
    except Exception:
        font = ImageFont.load_default()
    a = int(255 * WATERMARK_OPACITY)
    draw.text((W - 105, H - 25), "AdAwards", fill=(255, 255, 255, a), font=font)
    return Image.alpha_composite(img, layer)


# ═══════════════════════════════════════════════════════════════
# UNIQUE MOTIFS
# ═══════════════════════════════════════════════════════════════


def motif_conversation_flow(img, color, seed):
    """GEO-AI: Conversation flow — Bezier curves from left to right."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 100)

    # Draw flowing bezier paths from left → right
    for i in range(12):
        y_start = 80 + i * 42
        p0 = (60, y_start)
        p1 = (300 + random.randint(-60, 60), y_start + random.randint(-80, 80))
        p2 = (700 + random.randint(-60, 60), y_start + random.randint(-80, 80))
        p3 = (W - 80, 100 + i * 38 + random.randint(-20, 20))
        pts = [bezier_point(p0, p1, p2, p3, t / 80.0) for t in range(81)]
        alpha = 60 + random.randint(0, 40)
        for k in range(len(pts) - 1):
            draw.line(
                [pts[k], pts[k + 1]],
                fill=(*color, clamp(alpha, 0, 255)),
                width=2 if i % 3 == 0 else 1,
            )

    # "Question" cluster on left
    for _ in range(15):
        x = random.randint(30, 180)
        y = random.randint(100, H - 100)
        r = random.randint(4, 12)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color, 50))

    # "Answer" cluster on right
    for _ in range(15):
        x = random.randint(W - 200, W - 40)
        y = random.randint(100, H - 100)
        r = random.randint(4, 12)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color, 70))

    # Big circles for "bubbles"
    draw.ellipse([50, 180, 200, 330], outline=(*color, 40), width=2)
    draw.ellipse([W - 250, 200, W - 60, 390], outline=(*color, 50), width=2)

    return Image.alpha_composite(img, layer)


def motif_sinusoidal_waves(img, color, seed):
    """Core Web Vitals: 3 sinusoidal waves like EKG/dashboard."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    # Grid in background
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=(*color, 12), width=1)
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=(*color, 12), width=1)

    # Three waves — LCP, CLS, INP
    waves = [
        {"amp": 80, "freq": 0.008, "phase": 0, "y_off": H // 2 - 80, "alpha": 120, "width": 3},
        {"amp": 50, "freq": 0.012, "phase": 2.0, "y_off": H // 2, "alpha": 90, "width": 2},
        {"amp": 60, "freq": 0.010, "phase": 4.5, "y_off": H // 2 + 70, "alpha": 100, "width": 2},
    ]
    shades = [color, lerp_color(color, (255, 255, 255), 0.3), lerp_color(color, (100, 200, 100), 0.4)]

    for wi, w in enumerate(waves):
        pts = []
        for x in range(0, W, 2):
            y = w["y_off"] + int(w["amp"] * math.sin(w["freq"] * x + w["phase"]))
            pts.append((x, y))
        c = shades[wi]
        for k in range(len(pts) - 1):
            draw.line([pts[k], pts[k + 1]], fill=(*c, w["alpha"]), width=w["width"])
        # Dots at peaks
        for x in range(0, W, 120):
            y = w["y_off"] + int(w["amp"] * math.sin(w["freq"] * x + w["phase"]))
            draw.ellipse([x - 4, y - 4, x + 4, y + 4], fill=(*c, 200))

    return Image.alpha_composite(img, layer)


def motif_dual_clusters(img, color, seed):
    """Local vs National: Two clusters connected by a bridge."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 200)

    color2 = (59, 130, 246)

    # Local cluster (left, dense, small)
    local_pts = []
    cx_l, cy_l = 250, H // 2
    for _ in range(35):
        a = random.uniform(0, 2 * math.pi)
        r = random.gauss(0, 70)
        x = cx_l + int(r * math.cos(a))
        y = cy_l + int(r * math.sin(a))
        local_pts.append((clamp(x, 20, W - 20), clamp(y, 20, H - 20)))

    # National cluster (right, spread)
    nat_pts = []
    cx_r, cy_r = 900, H // 2
    for _ in range(40):
        a = random.uniform(0, 2 * math.pi)
        r = random.gauss(0, 140)
        x = cx_r + int(r * math.cos(a))
        y = cy_r + int(r * math.sin(a))
        nat_pts.append((clamp(x, 20, W - 20), clamp(y, 20, H - 20)))

    # Draw local network
    for i, p1 in enumerate(local_pts):
        for j, p2 in enumerate(local_pts):
            if j <= i:
                continue
            d = math.hypot(p1[0] - p2[0], p1[1] - p2[1])
            if d < 100:
                a = int(80 * (1 - d / 100))
                draw.line([p1, p2], fill=(*color, clamp(a, 0, 255)), width=1)
    for p in local_pts:
        r = random.randint(3, 6)
        draw.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=(*color, 160))

    # Draw national network
    for i, p1 in enumerate(nat_pts):
        for j, p2 in enumerate(nat_pts):
            if j <= i:
                continue
            d = math.hypot(p1[0] - p2[0], p1[1] - p2[1])
            if d < 140:
                a = int(60 * (1 - d / 140))
                draw.line([p1, p2], fill=(*color2, clamp(a, 0, 255)), width=1)
    for p in nat_pts:
        r = random.randint(2, 5)
        draw.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=(*color2, 140))

    # Division line
    mid_x = W // 2
    draw.line([(mid_x, 40), (mid_x, H - 40)], fill=(255, 255, 255, 20), width=1)

    # Bridge particles between clusters
    for _ in range(8):
        lp = random.choice(local_pts)
        rp = random.choice(nat_pts)
        draw.line([lp, rp], fill=(255, 255, 255, 15), width=1)

    return Image.alpha_composite(img, layer)


def motif_tree_structure(img, color, seed):
    """Schema Markup: Hierarchical tree like JSON/DOM."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 300)

    # Draw { } brackets
    try:
        font_big = ImageFont.truetype(FONT_PATH, 120)
    except Exception:
        font_big = ImageFont.load_default()
    draw.text((100, H // 2 - 80), "{", fill=(*color, 35), font=font_big)
    draw.text((W - 200, H // 2 - 80), "}", fill=(*color, 35), font=font_big)

    # Tree structure
    levels = [
        [(W // 2, 60)],
        [(W // 2 - 200, 180), (W // 2 + 200, 180)],
        [(W // 2 - 340, 310), (W // 2 - 120, 310), (W // 2 + 120, 310), (W // 2 + 340, 310)],
        [],
    ]
    # Generate level 3
    for px, py in levels[2]:
        for dx in [-60, 0, 60]:
            levels[3].append((px + dx, 440))

    # Draw edges
    for li in range(len(levels) - 1):
        parent = levels[li]
        child = levels[li + 1]
        child_per = max(1, len(child) // max(1, len(parent)))
        for pi, pp in enumerate(parent):
            for ci in range(child_per):
                idx = pi * child_per + ci
                if idx < len(child):
                    cp = child[idx]
                    draw.line([pp, cp], fill=(*color, 60), width=2)

    # Draw nodes
    for li, level in enumerate(levels):
        r = 10 - li * 2
        if r < 3:
            r = 3
        alpha = 200 - li * 30
        for p in level:
            draw.ellipse(
                [p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=(*color, alpha)
            )
            # Glow around node
            draw.ellipse(
                [p[0] - r - 6, p[1] - r - 6, p[0] + r + 6, p[1] + r + 6],
                outline=(*color, 30),
                width=1,
            )

    return Image.alpha_composite(img, layer)


def motif_growth_curve(img, color, seed):
    """Koszt SEO: Rising equity curve with pulsing dots."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 400)

    # Grid
    for x in range(100, W - 60, 80):
        draw.line([(x, 60), (x, H - 80)], fill=(*color, 10), width=1)
    for y in range(60, H - 60, 60):
        draw.line([(100, y), (W - 60, y)], fill=(*color, 10), width=1)

    # Rising curve
    pts = []
    for x in range(100, W - 60, 4):
        t = (x - 100) / (W - 160)
        # Exponential growth + noise
        base_y = H - 100 - int(350 * (1 - math.exp(-3 * t)))
        noise = int(random.gauss(0, 5 * (1 - t * 0.5)))
        y = clamp(base_y + noise, 60, H - 80)
        pts.append((x, y))

    # Draw fill under curve
    for i in range(len(pts) - 1):
        x1 = pts[i][0]
        y1 = pts[i][1]
        draw.line([(x1, y1), (x1, H - 80)], fill=(*color, 8), width=4)

    # Draw curve line
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i + 1]], fill=(*color, 180), width=3)

    # Dots at regular intervals
    for i in range(0, len(pts), 30):
        p = pts[i]
        draw.ellipse([p[0] - 5, p[1] - 5, p[0] + 5, p[1] + 5], fill=(*color, 220))
        draw.ellipse(
            [p[0] - 10, p[1] - 10, p[0] + 10, p[1] + 10],
            outline=(*color, 60),
            width=1,
        )

    # Subtle ring charts in background
    for _ in range(4):
        cx = random.randint(200, W - 200)
        cy = random.randint(100, H - 150)
        r = random.randint(40, 80)
        arc_end = random.randint(90, 300)
        draw.arc(
            [cx - r, cy - r, cx + r, cy + r], 0, arc_end, fill=(*color, 20), width=2
        )

    return Image.alpha_composite(img, layer)


def motif_concentric_orbits(img, color, seed):
    """E-E-A-T: 4 concentric orbits like atomic model."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 500)

    cx, cy = W // 2, H // 2
    color2 = (96, 130, 230)

    orbit_radii = [80, 140, 200, 260]
    orbit_colors = [
        lerp_color(color, color2, 0),
        lerp_color(color, color2, 0.3),
        lerp_color(color, color2, 0.6),
        lerp_color(color, color2, 1.0),
    ]

    # Draw orbits (ellipses)
    for i, r in enumerate(orbit_radii):
        c = orbit_colors[i]
        draw.ellipse(
            [cx - r, cy - int(r * 0.6), cx + r, cy + int(r * 0.6)],
            outline=(*c, 50 + i * 10),
            width=1,
        )
        # Particles on orbit
        num = 4 + i * 2
        for j in range(num):
            angle = (2 * math.pi / num) * j + random.uniform(-0.3, 0.3)
            px = cx + int(r * math.cos(angle))
            py = cy + int(r * 0.6 * math.sin(angle))
            pr = 3 + i
            draw.ellipse(
                [px - pr, py - pr, px + pr, py + pr], fill=(*c, 150 + i * 20)
            )

    # Central core (Trust)
    draw.ellipse([cx - 18, cy - 18, cx + 18, cy + 18], fill=(*color2, 200))
    draw.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], outline=(*color2, 80), width=2)

    # Labels hint (very subtle)
    letters = ["E", "E", "A", "T"]
    try:
        font_sm = ImageFont.truetype(FONT_PATH, 14)
    except Exception:
        font_sm = ImageFont.load_default()
    for i, r in enumerate(orbit_radii):
        lx = cx + r + 8
        ly = cy - 8
        draw.text((lx, ly), letters[i], fill=(*orbit_colors[i], 60), font=font_sm)

    return Image.alpha_composite(img, layer)


def motif_hub_network(img, color, seed):
    """Link Building: Hub-and-spoke network with broken links."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 600)

    color2 = (239, 68, 68)  # red for broken links

    # Generate hubs (large nodes)
    hubs = [(200, 200), (600, 300), (1000, 200), (400, 480), (800, 450)]
    # Satellites around each hub
    all_sats = []
    for hx, hy in hubs:
        sats = []
        for _ in range(random.randint(6, 12)):
            angle = random.uniform(0, 2 * math.pi)
            dist = random.randint(50, 140)
            sx = hx + int(dist * math.cos(angle))
            sy = hy + int(dist * math.sin(angle))
            sats.append((clamp(sx, 20, W - 20), clamp(sy, 20, H - 20)))
        all_sats.append(sats)

    # Draw connections
    for hi, (hx, hy) in enumerate(hubs):
        for sx, sy in all_sats[hi]:
            broken = random.random() < 0.15
            if broken:
                # Dashed red line
                mid_x = (hx + sx) // 2
                mid_y = (hy + sy) // 2
                draw.line([(hx, hy), (mid_x, mid_y)], fill=(*color2, 60), width=1)
                # Gap, then continue
                draw.line(
                    [(mid_x + 10, mid_y + 5), (sx, sy)], fill=(*color2, 30), width=1
                )
                # X mark at break
                draw.line(
                    [(mid_x - 4, mid_y - 4), (mid_x + 4, mid_y + 4)],
                    fill=(*color2, 100),
                    width=2,
                )
                draw.line(
                    [(mid_x + 4, mid_y - 4), (mid_x - 4, mid_y + 4)],
                    fill=(*color2, 100),
                    width=2,
                )
            else:
                draw.line([(hx, hy), (sx, sy)], fill=(*color, 50), width=1)

        # Satellites nodes
        for sx, sy in all_sats[hi]:
            r = random.randint(2, 4)
            draw.ellipse([sx - r, sy - r, sx + r, sy + r], fill=(*color, 120))

    # Hub-to-hub connections
    for i in range(len(hubs)):
        for j in range(i + 1, len(hubs)):
            d = math.hypot(hubs[i][0] - hubs[j][0], hubs[i][1] - hubs[j][1])
            if d < 500:
                draw.line([hubs[i], hubs[j]], fill=(*color, 30), width=2)

    # Draw hubs (large)
    for hx, hy in hubs:
        draw.ellipse([hx - 12, hy - 12, hx + 12, hy + 12], fill=(*color, 200))
        draw.ellipse([hx - 20, hy - 20, hx + 20, hy + 20], outline=(*color, 50), width=1)

    return Image.alpha_composite(img, layer)


def motif_morph_transition(img, color, seed):
    """AI Overview: Rectangles (left) morphing into organic shapes (right)."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    random.seed(seed + 700)

    color2 = (249, 115, 22)

    # Left side: structured rectangles (SERP-like)
    for i in range(7):
        y = 60 + i * 78
        w = random.randint(200, 380)
        h = 50
        alpha = 40 + i * 5
        c = lerp_color(color, (200, 200, 200), 0.3)
        draw.rectangle([80, y, 80 + w, y + h], outline=(*c, alpha), width=1)
        # Inner bar
        draw.rectangle(
            [90, y + 10, 90 + w * 0.6, y + 18], fill=(*c, int(alpha * 0.5))
        )
        draw.rectangle(
            [90, y + 26, 90 + w * 0.4, y + 32], fill=(*c, int(alpha * 0.3))
        )

    # Transition arrows/flow in the middle
    for y in range(80, H - 80, 50):
        pts = [(W // 2 - 40, y), (W // 2, y + random.randint(-10, 10)), (W // 2 + 40, y)]
        for k in range(len(pts) - 1):
            draw.line([pts[k], pts[k + 1]], fill=(*color, 30), width=2)

    # Right side: organic blobs (AI-generated results)
    for i in range(5):
        cx = random.randint(W // 2 + 200, W - 120)
        cy = 80 + i * 110
        # Organic blob using multiple overlapping ellipses
        for _ in range(4):
            rx = random.randint(30, 80)
            ry = random.randint(20, 50)
            ox = random.randint(-20, 20)
            oy = random.randint(-15, 15)
            alpha = random.randint(15, 35)
            c = lerp_color(color, color2, random.uniform(0, 1))
            draw.ellipse(
                [cx + ox - rx, cy + oy - ry, cx + ox + rx, cy + oy + ry],
                fill=(*c, alpha),
            )

    return Image.alpha_composite(img, layer)


def motif_radar_scan(img, color, seed):
    """Audyt SEO: Radar/scan grid with frozen scan beam."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    cx, cy = W // 2, H // 2
    max_r = 250

    # Circular grid
    for r in range(50, max_r + 1, 50):
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r], outline=(*color, 30), width=1
        )

    # Cross-hair lines
    draw.line([(cx - max_r, cy), (cx + max_r, cy)], fill=(*color, 25), width=1)
    draw.line([(cx, cy - max_r), (cx, cy + max_r)], fill=(*color, 25), width=1)
    # Diagonal lines
    d = int(max_r * 0.707)
    draw.line([(cx - d, cy - d), (cx + d, cy + d)], fill=(*color, 15), width=1)
    draw.line([(cx + d, cy - d), (cx - d, cy + d)], fill=(*color, 15), width=1)

    # Scan beam (frozen at ~45 degrees)
    beam_angle = math.radians(40)
    beam_pts = [(cx, cy)]
    for r in range(0, max_r, 2):
        x = cx + int(r * math.cos(beam_angle))
        y = cy - int(r * math.sin(beam_angle))
        beam_pts.append((x, y))

    # Beam sweep (triangular fill)
    sweep_angle = math.radians(35)
    for r in range(max_r, 0, -3):
        a = int(30 * (r / max_r))
        x1 = cx + int(r * math.cos(beam_angle))
        y1 = cy - int(r * math.sin(beam_angle))
        x2 = cx + int(r * math.cos(sweep_angle))
        y2 = cy - int(r * math.sin(sweep_angle))
        draw.line([(cx, cy), (x1, y1)], fill=(*color, clamp(a + 20, 0, 255)), width=1)
        draw.line([(cx, cy), (x2, y2)], fill=(*color, clamp(a, 0, 255)), width=1)

    # "Detected" dots on radar
    random.seed(seed + 800)
    for _ in range(12):
        angle = random.uniform(0, 2 * math.pi)
        dist = random.randint(30, max_r - 20)
        px = cx + int(dist * math.cos(angle))
        py = cy - int(dist * math.sin(angle))
        r = random.randint(3, 6)
        draw.ellipse([px - r, py - r, px + r, py + r], fill=(*color, 100))
        draw.ellipse(
            [px - r - 4, py - r - 4, px + r + 4, py + r + 4],
            outline=(*color, 40),
            width=1,
        )

    # Center dot
    draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(*color, 220))

    return Image.alpha_composite(img, layer)


def motif_location_ripple(img, color, seed):
    """Google Moja Firma: Central pin with expanding ripple waves."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    cx, cy = W // 2, H // 2 - 20
    color2 = (59, 130, 246)

    # Subtle map grid
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(*color, 6), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(*color, 6), width=1)

    # Ripple circles expanding from center
    for r in range(30, 350, 35):
        alpha = int(60 * (1 - r / 350))
        c = lerp_color(color, color2, r / 350)
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            outline=(*c, clamp(alpha, 0, 255)),
            width=2,
        )

    # Pin shape (abstract)
    # Pin body
    pin_r = 20
    draw.ellipse(
        [cx - pin_r, cy - pin_r - 10, cx + pin_r, cy + pin_r - 10],
        fill=(*color, 220),
    )
    # Pin point
    draw.polygon(
        [(cx - 12, cy + 8), (cx + 12, cy + 8), (cx, cy + 35)],
        fill=(*color, 200),
    )
    # Inner circle
    draw.ellipse([cx - 8, cy - 8 - 10, cx + 8, cy + 8 - 10], fill=(10, 12, 16, 255))
    draw.ellipse([cx - 5, cy - 5 - 10, cx + 5, cy + 5 - 10], fill=(*color2, 180))

    # Scattered small dots (POIs) getting sparser outward
    random.seed(seed + 900)
    for _ in range(40):
        angle = random.uniform(0, 2 * math.pi)
        dist = random.gauss(0, 120)
        px = cx + int(dist * math.cos(angle))
        py = cy + int(dist * math.sin(angle))
        if 0 < px < W and 0 < py < H:
            r = random.randint(1, 3)
            alpha = int(100 * math.exp(-abs(dist) / 200))
            draw.ellipse(
                [px - r, py - r, px + r, py + r],
                fill=(*color2, clamp(alpha, 5, 150)),
            )

    return Image.alpha_composite(img, layer)


# ═══════════════════════════════════════════════════════════════
# MOTIF DISPATCHER
# ═══════════════════════════════════════════════════════════════

MOTIF_FUNCTIONS = {
    "conversation_flow": motif_conversation_flow,
    "sinusoidal_waves": motif_sinusoidal_waves,
    "dual_clusters": motif_dual_clusters,
    "tree_structure": motif_tree_structure,
    "growth_curve": motif_growth_curve,
    "concentric_orbits": motif_concentric_orbits,
    "hub_network": motif_hub_network,
    "morph_transition": motif_morph_transition,
    "radar_scan": motif_radar_scan,
    "location_ripple": motif_location_ripple,
}


# ═══════════════════════════════════════════════════════════════
# MAIN GENERATOR
# ═══════════════════════════════════════════════════════════════


def generate_cover(theme_key, title, output_path, seed=None):
    theme = THEMES.get(theme_key)
    if not theme:
        print(f"Unknown theme: {theme_key}")
        return

    if seed is None:
        seed = abs(hash(theme_key)) % 10000

    color = theme["color"]

    # 1. Background gradient
    img = make_gradient_bg()

    # 2. Central glow
    img = add_glow(img, color, radius=300, intensity=30)

    # Secondary glow if color2
    if "color2" in theme:
        img = add_glow(
            img, theme["color2"], cx=W // 3, cy=H // 2, radius=200, intensity=18
        )

    # 3. Particle network (base layer)
    particles = generate_particles(theme["density"], seed)
    img = draw_particle_network(img, particles, color, line_alpha=0.15, node_alpha=0.5)

    # 4. Unique motif
    motif_fn = MOTIF_FUNCTIONS.get(theme["motif"])
    if motif_fn:
        img = motif_fn(img, color, seed)

    # 5. Bottom gradient
    img = add_bottom_gradient(img)

    # 6. Watermark
    img = add_watermark(img)

    # 7. Slight noise overlay for texture
    noise_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    random.seed(seed + 9999)
    noise_pixels = noise_layer.load()
    for _ in range(8000):
        nx = random.randint(0, W - 1)
        ny = random.randint(0, H - 1)
        nv = random.randint(200, 255)
        noise_pixels[nx, ny] = (nv, nv, nv, random.randint(3, 8))
    img = Image.alpha_composite(img, noise_layer)

    # Save as RGB PNG
    img = img.convert("RGB")
    img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Digital Synapse Cover Generator")
    parser.add_argument("--theme", required=True, help="Theme key from THEMES dict")
    parser.add_argument("--title", default="", help="Article title (optional)")
    parser.add_argument("--output", required=True, help="Output PNG path")
    parser.add_argument("--seed", type=int, default=None, help="Random seed")
    args = parser.parse_args()
    generate_cover(args.theme, args.title, args.output, args.seed)
