import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
          muted: 'var(--color-ink-muted)',
        },
        seal: {
          DEFAULT: 'var(--color-seal)',
          dim: 'var(--color-seal-dim)',
          soft: 'var(--color-seal-soft)',
        },
        stone: {
          DEFAULT: 'var(--color-stone)',
          cool: 'var(--color-stone-cool)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
          sunken: 'var(--color-surface-sunken)',
        },
        brand: 'var(--color-brand)',
        amber: 'var(--color-amber)',
        tamper: 'var(--color-tamper)',
      },
      fontFamily: {
        sans: [
          'var(--font-plex-sans)',
          'IBM Plex Sans',
          'system-ui',
          'sans-serif',
        ],
        display: ['var(--font-literata)', 'Literata', 'Georgia', 'serif'],
        mono: [
          'var(--font-plex-mono)',
          'IBM Plex Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sealPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.35s ease-out both',
        sealPulse: 'sealPulse 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
