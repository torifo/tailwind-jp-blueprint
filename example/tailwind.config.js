/** @type {import('tailwindcss').Config} */
export default {
  // 1. 検出範囲の最適化（プロジェクトに合わせて調整）
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  
  // ダークモードをクラス制御（'class'）に設定するのが現代の標準
  darkMode: 'class',

  theme: {
    // レスポンシブ設計：標準のままでも良いが、モバイルファーストを意識
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {
      // 2. セマンティック・カラー（標準化の核）
      // global.css 等で定義したCSS変数を呼び出す形式
      colors: {
        brand: {
          primary: 'var(--color-primary)',   // メインカラー
          secondary: 'var(--color-secondary)', // 補助色
          accent: 'var(--color-accent)',     // アクセント
        },
        surface: {
          base: 'var(--color-bg-base)',      // 背景色（Paper）
          sunken: 'var(--color-bg-sunken)',  // 少し沈んだ背景
          elevated: 'var(--color-bg-elevated)', // 浮き上がった背景（カード等）
        },
        content: {
          main: 'var(--color-text-main)',    // メイン文字色（Ink）
          muted: 'var(--color-text-muted)',  // 補助文字色（Mute）
          inverse: 'var(--color-text-inverse)', // 反転文字色
        },
      },

      // 3. タイポグラフィ（日本語環境への最適化）
      fontFamily: {
        sans: [
          '"Inter"', 
          '"Hiragino Sans"', 
          '"Noto Sans JP"', 
          'sans-serif'
        ],
        mono: ['"JetBrains Mono"', 'monospace'],
        // カスタム：ここにお好みのフォント（手書き風など）を追加
        display: ['"YourCustomFont"', 'cursive'], 
      },

      // 4. モダンデザインの微調整
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

      // 5. アニメーション（標準的な動きを登録）
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'blob': 'blob 7s infinite', // あなたのこだわり
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blob': {
           // ...前述のblob設定をここに
        },
      },
    },
  },

  plugins: [
    // 現代の開発でほぼ必須のプラグイン（要インストール）
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}