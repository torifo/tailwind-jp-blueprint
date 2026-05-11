#!/usr/bin/env sh
set -e

BASE="https://raw.githubusercontent.com/torifo/tailwind-jp-blueprint/main/example"

echo ""
echo "tailwind-jp-blueprint — デザインシステム初期化"
echo ""

# ── tailwind.config.js ──────────────────────────────────────────
if [ -f "tailwind.config.js" ]; then
  echo "⚠  tailwind.config.js が既に存在するためスキップします"
else
  curl -fsSL "$BASE/tailwind.config.js" -o tailwind.config.js
  echo "✓  tailwind.config.js を作成しました"
fi

# ── CSS出力先を自動検出 ─────────────────────────────────────────
if   [ -d "src/styles" ]; then CSS_DEST="src/styles/global.css"
elif [ -d "src/app"    ]; then CSS_DEST="src/app/globals.css"    # Next.js app router
elif [ -d "app"        ]; then CSS_DEST="app/globals.css"        # Next.js app router (root)
elif [ -d "src"        ]; then CSS_DEST="src/global.css"
else                          CSS_DEST="global.css"
fi

if [ -f "$CSS_DEST" ]; then
  echo "⚠  $CSS_DEST が既に存在するためスキップします"
  echo "   追記する場合は以下を実行してください:"
  echo "   curl -fsSL $BASE/global.css >> $CSS_DEST"
else
  curl -fsSL "$BASE/global.css" -o "$CSS_DEST"
  echo "✓  $CSS_DEST を作成しました"
fi

echo ""
echo "リファレンス → https://torifo.github.io/tailwind-jp-blueprint/"
echo ""
