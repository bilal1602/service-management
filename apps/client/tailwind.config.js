// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors - use CSS variables for dark mode support
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
        },
        // Background colors
        bg: {
          container: 'var(--color-bg-container)',
          elevated: 'var(--color-bg-elevated)',
          layout: 'var(--color-bg-layout)',
          spotlight: 'var(--color-bg-spotlight)',
          mask: 'var(--color-bg-mask)',
        },
        // Text colors
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          quaternary: 'var(--color-text-quaternary)',
        },
        // Border colors
        border: {
          DEFAULT: 'var(--color-border)',
          secondary: 'var(--color-border-secondary)',
        },
        // Fill colors
        fill: {
          DEFAULT: 'var(--color-fill)',
          secondary: 'var(--color-fill-secondary)',
          tertiary: 'var(--color-fill-tertiary)',
          quaternary: 'var(--color-fill-quaternary)',
        },
        // Link colors
        link: {
          DEFAULT: 'var(--color-link)',
          hover: 'var(--color-link-hover)',
          active: 'var(--color-link-active)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          "'Helvetica Neue'",
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: ['38px', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '1.35', fontWeight: '600' }],
        h4: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['16px', { lineHeight: '1.5', fontWeight: '600' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        lg: '8px',
      },
      boxShadow: {
        DEFAULT:
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        elevated:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        'dark-DEFAULT':
          '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'dark-elevated':
          '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        fast: '100ms',
        mid: '200ms',
        slow: '300ms',
      },
      spacing: {
        'control-sm': '24px',
        control: '32px',
        'control-lg': '40px',
      },
    },
  },
  plugins: [],
};
