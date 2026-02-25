#!/usr/bin/env python3
"""
Leonardo AI Blog Cover Generator for AdAwards
Generates 10 professional blog cover images via Leonardo API.
Model: Lucid Origin (Kino 2.1)
"""

import requests
import time
import os
import sys

API_KEY = os.getenv('LEONARDO_API_KEY', '26938fff-451e-4f76-9a74-ffa44108fd7f')
BASE_URL = 'https://cloud.leonardo.ai/api/rest/v1'
MODEL_ID = '7b592283-e8a7-4c5a-9ba6-d18c31f258b9'  # Lucid Origin

HEADERS = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'authorization': f'Bearer {API_KEY}'
}

BASE_STYLE = "Dark premium tech aesthetic, background gradient from near-black to deep navy with subtle blue undertone, abstract geometric and organic shapes, glowing neon accents, particle network connections, clean modern composition, professional blog header image, no people no faces no stock photo feel, no text on image, wide cinematic format, subtle depth of field, studio-quality rendering, minimalist with strategic negative space"

NEGATIVE_PROMPT = "text, words, letters, watermark, signature, blurry, low quality, pixelated, noisy, oversaturated, cartoon, anime, childish, clipart, stock photo, generic, busy composition, cluttered, humans, faces, hands, photographic, realistic photography"

ARTICLES = [
    {
        'filename': 'geo-ai.png',
        'prompt': f'{BASE_STYLE}. Central glowing purple and violet orb representing AI consciousness, surrounded by flowing conversation-like data streams curving from left to right, organic bioluminescent tendrils connecting floating data nodes, subtle chat bubble shapes formed by light particles, deep space feeling with scattered pink accent sparks, ethereal and futuristic'
    },
    {
        'filename': 'core-web-vitals.png',
        'prompt': f'{BASE_STYLE}. Three distinct sinusoidal wave forms flowing horizontally in green cyan and teal, representing performance metrics, subtle grid overlay like performance dashboard, pulse points where waves intersect glow brighter, minimal ECG heartbeat monitor aesthetic applied to web performance, data visualization feel, clean analytical composition'
    },
    {
        'filename': 'local-vs-national.png',
        'prompt': f'{BASE_STYLE}. Split composition: left side tight concentrated cluster of warm orange glowing nodes representing local focus, right side vast expansive network of cool blue scattered nodes representing wide reach, luminous bridge of white-gold particles connects both clusters through center, the contrast between dense and spread is the visual story'
    },
    {
        'filename': 'schema-markup.png',
        'prompt': f'{BASE_STYLE}. Elegant hierarchical tree structure made of glowing cyan lines and nodes branching downward like inverted data tree or JSON structure, subtle curly bracket shapes formed by light trails framing the composition, each node luminous sphere connected by clean geometric lines, organized grid-like precision suggesting structured data, code-meets-art aesthetic'
    },
    {
        'filename': 'koszt-seo.png',
        'prompt': f'{BASE_STYLE}. Ascending curve made of golden and amber glowing particles rising from bottom-left to upper-right suggesting growth and ROI, scattered data points along curve pulse with warm orange light, subtle concentric rings below like investment ripples, upward momentum and value accumulation, clean financial data visualization aesthetic, premium optimistic mood'
    },
    {
        'filename': 'eeat.png',
        'prompt': f'{BASE_STYLE}. Four concentric orbital rings in varying shades of deep blue and indigo slowly rotating like atomic model or trust layers, center core glows brightest representing Trust, each ring represents a layer of authority, small luminous particles orbit along each ring, cosmic and institutional, majestic deep blue palette'
    },
    {
        'filename': 'link-building.png',
        'prompt': f'{BASE_STYLE}. Complex network graph with several large glowing orange hub nodes connected to dozens of smaller satellite nodes, most connections healthy luminous orange lines but three connections broken fractured with red warning glow and scattered particles representing toxic links, web-like organic structure, contrast between healthy and damaged connections'
    },
    {
        'filename': 'ai-overview.png',
        'prompt': f'{BASE_STYLE}. Left-to-right transformation scene: left side rigid rectangular grid shapes representing traditional search results in muted blue, morphing through dynamic transition zone in center with swirling purple and orange energy, into organic flowing AI-generated shapes on right side, metamorphosis from structured to intelligent, dynamic energy'
    },
    {
        'filename': 'audyt-seo.png',
        'prompt': f'{BASE_STYLE}. Circular radar scanner visualization with concentric rings in orange, bright scanning beam sweeps clockwise frozen mid-rotation, checkpoints along rings glow green for passed or amber for warning, center bright focal point, diagnostic scan aesthetic, grid overlay suggests systematic analysis, technical precision meets visual elegance'
    },
    {
        'filename': 'google-moja-firma.png',
        'prompt': f'{BASE_STYLE}. Central location pin abstraction made of green and blue light radiating concentric ripple waves outward like sonar or signal broadcast, ripples fade as they expand suggesting local reach, subtle map-grid pattern in deep background, small glowing nodes at edges of ripples represent local customers being reached, warm inviting despite tech aesthetic'
    },
]


def generate_image(prompt):
    payload = {
        'height': 640,
        'width': 1216,
        'modelId': MODEL_ID,
        'num_images': 1,
        'prompt': prompt,
        'negative_prompt': NEGATIVE_PROMPT,
    }

    response = requests.post(f'{BASE_URL}/generations', headers=HEADERS, json=payload)

    if response.status_code != 200:
        print(f'  ERROR: {response.status_code} - {response.text}')
        return None

    data = response.json()
    gen_id = data['sdGenerationJob']['generationId']
    cost = data['sdGenerationJob'].get('cost', {}).get('amount', '?')
    print(f'  Generation ID: {gen_id} (cost: ${cost})')
    return gen_id


def wait_and_download(gen_id, output_path):
    for attempt in range(30):
        time.sleep(5)

        response = requests.get(f'{BASE_URL}/generations/{gen_id}', headers=HEADERS)
        data = response.json()
        status = data.get('generations_by_pk', {}).get('status')

        if status == 'COMPLETE':
            images = data['generations_by_pk']['generated_images']
            if images:
                image_url = images[0]['url']
                img_response = requests.get(image_url)

                # Save as PNG (convert from JPG if needed)
                if output_path.endswith('.png'):
                    from PIL import Image
                    from io import BytesIO
                    img = Image.open(BytesIO(img_response.content))
                    img = img.resize((1200, 630), Image.LANCZOS)
                    img.save(output_path, 'PNG', optimize=True)
                else:
                    with open(output_path, 'wb') as f:
                        f.write(img_response.content)

                print(f'  Saved: {output_path} ({os.path.getsize(output_path) // 1024} KB)')
                return True
        elif status == 'FAILED':
            print(f'  FAILED!')
            return False
        else:
            print(f'  Waiting... ({attempt+1}/30) status: {status}')

    print('  TIMEOUT!')
    return False


def main():
    output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'blog', 'covers')
    os.makedirs(output_dir, exist_ok=True)

    # Parse args for single generation
    single = None
    if '--single' in sys.argv:
        idx = sys.argv.index('--single')
        if idx + 1 < len(sys.argv):
            single = sys.argv[idx + 1]

    articles = ARTICLES
    if single:
        articles = [a for a in ARTICLES if a['filename'].replace('.png', '') == single]
        if not articles:
            print(f'Unknown article: {single}')
            print(f'Available: {", ".join(a["filename"].replace(".png", "") for a in ARTICLES)}')
            sys.exit(1)

    results = []
    for i, article in enumerate(articles):
        print(f'\n{"="*60}')
        print(f'[{i+1}/{len(articles)}] Generating: {article["filename"]}')
        print(f'{"="*60}')

        output = os.path.join(output_dir, article['filename'])
        gen_id = generate_image(article['prompt'])

        if gen_id:
            success = wait_and_download(gen_id, output)
            results.append({'filename': article['filename'], 'success': success})
            time.sleep(2)  # Rate limiting
        else:
            results.append({'filename': article['filename'], 'success': False})

    # Summary
    print(f'\n{"="*60}')
    print('RESULTS:')
    for r in results:
        icon = 'OK' if r['success'] else 'FAIL'
        print(f'  [{icon}] {r["filename"]}')

    ok = sum(1 for r in results if r['success'])
    print(f'\n{ok}/{len(results)} images generated successfully.')


if __name__ == '__main__':
    main()
