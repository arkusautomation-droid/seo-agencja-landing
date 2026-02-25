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

BASE_STYLE = "Dark premium background gradient from deep navy #070B14 to near-black, cinematic wide format, professional blog header image, 3D rendered glossy objects and icons floating in space, volumetric lighting with soft colored glow, shallow depth of field with bokeh, studio-quality rendering, no text no words no letters no watermark, ultra clean composition with strategic negative space"

NEGATIVE_PROMPT = "text, words, letters, numbers, watermark, signature, blurry, low quality, pixelated, noisy, oversaturated, cartoon, anime, childish, clipart, stock photo, generic, busy composition, cluttered, humans, faces, hands, fingers, ugly, deformed, disfigured"

ARTICLES = [
    {
        'filename': 'geo-ai.png',
        'prompt': f'{BASE_STYLE}. Glossy 3D chat bubble icon in translucent purple glass hovering center-left, beside a glowing AI brain hologram with neural network connections in violet and magenta, small floating pictogram icons around them: magnifying glass, globe, sparkle star, all in frosted glass material, purple and pink neon ambient light, futuristic AI conversation theme'
    },
    {
        'filename': 'core-web-vitals.png',
        'prompt': f'{BASE_STYLE}. Three 3D speedometer gauges floating at different angles, each glowing in different color: green for fast, yellow for medium, red for slow, surrounded by floating performance pictogram icons: stopwatch, loading spinner, bar chart, lightning bolt, all in glossy frosted glass material, teal and cyan ambient glow, web performance dashboard feel'
    },
    {
        'filename': 'local-vs-national.png',
        'prompt': f'{BASE_STYLE}. Left side: glossy 3D map pin icon in warm orange with a small building/shop pictogram on it, surrounded by close circular ripples. Right side: glossy 3D globe icon in cool blue with scattered small pin markers across surface. Center: glowing versus symbol or bridge connecting both sides, orange to blue gradient ambient light, geographic contrast theme'
    },
    {
        'filename': 'schema-markup.png',
        'prompt': f'{BASE_STYLE}. Floating 3D code bracket icons in glossy cyan glass, curly braces and angle brackets arranged in a structured tree-like formation, small 3D pictogram icons scattered between: star rating, price tag, calendar, checkmark badge, all connected by thin glowing cyan lines forming a schema graph, cyan and white ambient light, structured data visualization'
    },
    {
        'filename': 'koszt-seo.png',
        'prompt': f'{BASE_STYLE}. Glossy 3D golden coin stack growing upward left to right like ascending steps, beside a rising arrow chart in amber glass, floating pictogram icons around: calculator, percentage badge, rocket, trophy cup, all in warm gold frosted glass material, golden and amber ambient volumetric light, investment growth and ROI theme, premium optimistic mood'
    },
    {
        'filename': 'eeat.png',
        'prompt': f'{BASE_STYLE}. Four glossy 3D shield icons arranged in a diamond formation, each in different shade of deep blue and indigo glass, center shield largest and brightest representing trust, surrounding pictogram icons: graduation cap for expertise, medal for authority, handshake for trust, eye for experience, all in frosted glass, deep blue and indigo ambient glow, authority and credibility theme'
    },
    {
        'filename': 'link-building.png',
        'prompt': f'{BASE_STYLE}. Glossy 3D chain links in orange and gold floating and interconnected forming a web-like network, some links intact and glowing healthy orange, two links cracked and glowing warning red, floating pictogram icons around: anchor, external link arrow, broken chain, checkmark, all in frosted glass material, warm orange ambient light with red danger accents, link network theme'
    },
    {
        'filename': 'ai-overview.png',
        'prompt': f'{BASE_STYLE}. Left side: classic 3D search bar with magnifying glass icon in muted blue glass. Right side: futuristic AI holographic display with sparkle effects in purple and orange glass. Between them: flowing transformation particles morphing from structured to organic, floating icons: robot head, search icon, sparkle wand, document, purple and orange gradient ambient light, search evolution theme'
    },
    {
        'filename': 'audyt-seo.png',
        'prompt': f'{BASE_STYLE}. Large 3D magnifying glass icon in glossy orange glass scanning over a floating website wireframe layout, revealing checkmarks and warning triangles where it focuses, surrounding floating pictogram icons: clipboard checklist, gear settings, bar chart analytics, shield security, all in frosted orange glass, warm orange scanning beam light effect, SEO audit diagnostic theme'
    },
    {
        'filename': 'google-moja-firma.png',
        'prompt': f'{BASE_STYLE}. Central glossy 3D map location pin icon in green and teal glass, hovering above a subtle 3D city/storefront miniature scene, concentric ripple rings emanating outward from pin in green light, floating pictogram icons around: star rating, phone, clock hours, camera photo, all in frosted green glass material, green and teal ambient glow, local business visibility theme'
    },
    {
        'filename': 'content-marketing.png',
        'prompt': f'{BASE_STYLE}. Glossy 3D open notebook or document icon in pink and magenta glass with glowing lines of content visible on pages, floating around it: pencil writing icon, megaphone, target bullseye, upward trending graph, lightbulb idea, all in frosted pink and rose glass material, pink and magenta ambient volumetric glow, content creation and marketing strategy theme'
    },
    {
        'filename': 'mobile-first.png',
        'prompt': f'{BASE_STYLE}. Central glossy 3D smartphone icon in blue glass showing a miniature responsive website layout on screen, floating around it: speed gauge, touch finger tap icon, responsive arrows icon, checkmark shield, magnifying glass, all in frosted blue and indigo glass material, blue and electric indigo ambient glow, mobile optimization and responsiveness theme'
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
