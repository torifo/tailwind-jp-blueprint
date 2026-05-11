#!/usr/bin/env node
import { existsSync, copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES  = join(__dirname, '..', 'example');
const CWD        = process.cwd();

// ANSI
const R = '\x1b[0m';
const B = '\x1b[1m';
const G = '\x1b[32m';
const Y = '\x1b[33m';
const C = '\x1b[36m';
const D = '\x1b[2m';

const rl  = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// CSS出力先を自動検出（フレームワーク規約に合わせる）
function detectCss() {
  if (existsSync(join(CWD, 'src/styles'))) return { dir: 'src/styles', file: 'global.css' };
  if (existsSync(join(CWD, 'src/app')))    return { dir: 'src/app',    file: 'globals.css' }; // Next.js app router
  if (existsSync(join(CWD, 'app')))        return { dir: 'app',        file: 'globals.css' }; // Next.js app router (root)
  if (existsSync(join(CWD, 'src')))        return { dir: 'src',        file: 'global.css' };
  return                                          { dir: '.',           file: 'global.css' };
}

console.log(`\n${B}tailwind-jp-blueprint${R}  ${D}v1.0.0${R}\n`);

// ── tailwind.config.js ──────────────────────────────────────────
const configSrc  = join(TEMPLATES, 'tailwind.config.js');
const configDest = join(CWD, 'tailwind.config.js');

if (existsSync(configDest)) {
  console.log(`${Y}⚠${R}  tailwind.config.js が既に存在します`);
  const ans = (await ask(`   ${D}[o] 上書き  [m] 追加内容を表示  [s] スキップ${R}  → `)).trim();
  if (ans === 'o') {
    copyFileSync(configSrc, configDest);
    console.log(`${G}✓${R}  tailwind.config.js を上書きしました\n`);
  } else if (ans === 'm') {
    console.log(`\n${D}── 追加・マージすべき内容（tailwind.config.js）────────${R}`);
    console.log(readFileSync(configSrc, 'utf8'));
    console.log(`${D}──────────────────────────────────────────────────────${R}\n`);
  } else {
    console.log(`${D}   スキップしました${R}\n`);
  }
} else {
  copyFileSync(configSrc, configDest);
  console.log(`${G}✓${R}  tailwind.config.js を作成しました`);
}

// ── global.css ──────────────────────────────────────────────────
const cssSrc    = join(TEMPLATES, 'global.css');
const { dir: cssDir, file: cssFile } = detectCss();
const cssDest   = join(CWD, cssDir, cssFile);
const cssLabel  = cssDir === '.' ? cssFile : `${cssDir}/${cssFile}`;

if (existsSync(cssDest)) {
  console.log(`${Y}⚠${R}  ${cssLabel} が既に存在します`);
  const ans = (await ask(`   ${D}[o] 上書き  [a] 末尾に追記  [s] スキップ${R}  → `)).trim();
  if (ans === 'o') {
    copyFileSync(cssSrc, cssDest);
    console.log(`${G}✓${R}  ${cssLabel} を上書きしました\n`);
  } else if (ans === 'a') {
    const existing  = readFileSync(cssDest, 'utf8');
    const addition  = readFileSync(cssSrc,  'utf8');
    writeFileSync(cssDest, `${existing.trimEnd()}\n\n${addition}`);
    console.log(`${G}✓${R}  ${cssLabel} に追記しました\n`);
  } else {
    console.log(`${D}   スキップしました${R}\n`);
  }
} else {
  const destDir = join(CWD, cssDir);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
  copyFileSync(cssSrc, cssDest);
  console.log(`${G}✓${R}  ${cssLabel} を作成しました`);
}

console.log(`\n${D}リファレンス → ${C}https://torifo.github.io/tailwind-jp-blueprint/${R}\n`);
rl.close();
