#!/usr/bin/env bash
# auto-cover.sh — Generate blog cover images via Leonardo AI
# Usage: ./scripts/auto-cover.sh [--all | <slug>]
# Example: ./scripts/auto-cover.sh geo-ai
#
# Available slugs (defined in generate-leonardo-covers.py):
#   geo-ai, core-web-vitals, local-vs-national, schema-markup,
#   koszt-seo, eeat, link-building, ai-overview, audyt-seo, google-moja-firma
#
# To add a new cover:
#   1. Add entry to ARTICLES list in scripts/generate-leonardo-covers.py
#   2. Add mapping in src/data/articles.ts COVER_MAP
#   3. Run: ./scripts/auto-cover.sh <slug>
#
# Requirements: python3, requests, Pillow
# API key: LEONARDO_API_KEY in .env

set -euo pipefail
cd "$(dirname "$0")/.."

# Load .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

SLUG="${1:-}"

if [ -z "$SLUG" ]; then
  echo "Usage: $0 [--all | <slug>]"
  echo ""
  echo "Generate all covers:"
  echo "  $0 --all"
  echo ""
  echo "Generate single cover:"
  echo "  $0 geo-ai"
  exit 1
fi

if [ "$SLUG" = "--all" ]; then
  echo "Generating all blog covers via Leonardo AI..."
  python3 scripts/generate-leonardo-covers.py
else
  echo "Generating cover for: $SLUG"
  python3 scripts/generate-leonardo-covers.py --single "$SLUG"
fi

echo ""
echo "Done! Covers in public/blog/covers/:"
ls -la public/blog/covers/*.png
