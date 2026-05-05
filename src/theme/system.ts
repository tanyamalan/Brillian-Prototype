import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react';

/**
 * Brillian theme — primitives + semantic tokens, mapped to Chakra v3.
 * Source of truth: /reference/brillian-style-guide.html
 *
 * Two layers:
 *   1. Color ramps (brand blue, navy, jade, status palettes, neutrals)
 *   2. Semantic tokens (`fg`, `bg`, `border`, `brand.*`) that components consume
 */

const buttonRecipe = defineRecipe({
  base: {
    px: '4',
    rounded: 'sm',
    fontSize: '13px',
    fontWeight: 500,
  },
  variants: {
    size: {
      // Override Chakra's default `md` so it hits our 44px control size.
      md: { h: 'control', px: '4' },
    },
    intent: {
      primary: {
        bg: 'brand.solid',
        color: 'white',
        _hover: { bg: 'brand.emphasized' },
        _active: { bg: 'brand.active' },
        _disabled: { bg: 'brand.solid', opacity: 0.4, cursor: 'not-allowed' },
      },
      secondary: {
        bg: 'bg',
        color: 'fg.muted',
        borderWidth: '1px',
        borderColor: 'border.emphasized',
        _hover: { bg: 'bg.dim' },
      },
      ghost: {
        bg: 'transparent',
        color: 'fg.muted',
        _hover: { bg: 'bg.dim' },
      },
    },
  },
});

const config = defineConfig({
  globalCss: {
    'html, body, #root': {
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      fontFamily: 'body',
      color: 'fg',
      bg: 'bg.dim',
      lineHeight: 1.5,
    },
    '*': { boxSizing: 'border-box' },
    '#root': { display: 'flex' },
    ...({
      '@keyframes brl-spin': {
        to: { transform: 'rotate(360deg)' },
      },
      '@keyframes brl-pulse': {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.08)' },
      },
      '@keyframes brl-card-in': {
        '0%': { opacity: 0, transform: 'translateY(8px) scale(0.97)' },
        '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
      },
      '@keyframes brl-step-in-fwd': {
        '0%': { opacity: 0, transform: 'translateX(28px)' },
        '100%': { opacity: 1, transform: 'translateX(0)' },
      },
      '@keyframes brl-step-in-back': {
        '0%': { opacity: 0, transform: 'translateX(-28px)' },
        '100%': { opacity: 1, transform: 'translateX(0)' },
      },
    } as Record<string, unknown>),
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Lora', Georgia, serif` },
        body: { value: `'Manrope',-apple-system,sans-serif` },
        mono: { value: `'JetBrains Mono', ui-monospace, monospace` },
      },
      colors: {
        // ===== Color ramps from the style guide =====
        brand: {
          50: { value: '#EEF3FE' },
          100: { value: '#DDE7FD' },
          200: { value: '#B7CBFB' },
          300: { value: '#8AA8F8' },
          400: { value: '#4D7DF5' },
          500: { value: '#265FF2' },
          600: { value: '#1A4DD3' },
          700: { value: '#1A3F9C' },
          800: { value: '#14306F' },
          900: { value: '#0F1F4A' },
        },
        navy: {
          50: { value: '#E8EAF1' },
          100: { value: '#C5CAD9' },
          200: { value: '#8E97B4' },
          500: { value: '#2C3D6B' },
          700: { value: '#1A2A56' },
          900: { value: '#0F1F4A' },
        },
        jade: {
          50: { value: '#EAFAF7' },
          100: { value: '#C2EBE5' },
          200: { value: '#8FD9CF' },
          500: { value: '#22B2A4' },
          700: { value: '#138578' },
          900: { value: '#0E6B61' },
        },
        warm: {
          50: { value: '#F9F8F7' },
          100: { value: '#F4F2EE' },
          200: { value: '#ECEAE6' },
          300: { value: '#DCD9D2' },
          500: { value: '#9AA0A6' },
          600: { value: '#6B7280' },
          700: { value: '#4B5563' },
          900: { value: '#0F1F4A' },
        },
        red: {
          100: { value: '#FCD7D2' },
          500: { value: '#DC2D24' },
          900: { value: '#9B1F18' },
        },
        orange: {
          100: { value: '#FBE0CC' },
          500: { value: '#DB5614' },
          900: { value: '#8C3508' },
        },
        amber: {
          100: { value: '#FCEBB8' },
          500: { value: '#E8B321' },
          900: { value: '#7A5C0A' },
        },
        purple: {
          100: { value: '#DDD3FA' },
          500: { value: '#5938E4' },
          900: { value: '#38228F' },
        },
        // ===== Legacy `brl.*` aliases — kept so existing direct refs keep working
        brl: {
          primary: { value: '#265FF2' },
          primaryLight: { value: '#EEF3FE' },
          primaryMuted: { value: '#B7CBFB' },
          primaryDark: { value: '#1A3F9C' },
          success: { value: '#22B2A4' },
          successLight: { value: '#C2EBE5' },
          warning: { value: '#E8B321' },
          warningLight: { value: '#FCEBB8' },
          danger: { value: '#DC2D24' },
          dangerLight: { value: '#FCD7D2' },
          textPrimary: { value: '#0F1F4A' },
          textSecondary: { value: '#4B5563' },
          textTertiary: { value: '#6B7280' },
          surface: { value: '#FFFFFF' },
          surfaceDim: { value: '#F9F8F7' },
          surfaceContainer: { value: '#F4F2EE' },
          borderSubtle: { value: '#ECEAE6' },
          borderStrong: { value: '#DCD9D2' },
        },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '4px' }, // button + input radius
        md: { value: '8px' },
        lg: { value: '12px' }, // card radius
        xl: { value: '16px' },
        full: { value: '9999px' },
      },
      sizes: {
        control: { value: '44px' },
      },
      shadows: {
        // Navy-tinted shadows for warmer, more cohesive depth.
        card: { value: '0 1px 3px rgba(15, 31, 74, 0.08), 0 1px 2px rgba(15, 31, 74, 0.04)' },
        modal: { value: '0 10px 30px rgba(15, 31, 74, 0.18)' },
        focus: { value: '0 0 0 3px rgba(38, 95, 242, 0.18)' },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: defineRecipe({
        base: {
          h: 'control',
          rounded: 'sm',
          px: '3',
          fontSize: '14px',
          bg: 'bg',
          borderWidth: '1px',
          borderColor: 'border.emphasized',
          color: 'fg',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          _placeholder: { color: 'fg.subtle' },
          _hover: { borderColor: 'fg.subtle' },
          _focus: {
            borderColor: 'brand.solid',
            boxShadow: 'focus',
            outline: 'none',
          },
          _disabled: { opacity: 0.6, cursor: 'not-allowed' },
        },
      }),
      nativeSelect: defineRecipe({
        className: 'native-select',
        base: {
          h: 'control',
          '& select': {
            h: 'control',
            rounded: 'sm',
            px: '3',
            fontSize: '14px',
            bg: 'bg',
            borderWidth: '1px',
            borderColor: 'border.emphasized',
            color: 'fg',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            _hover: { borderColor: 'fg.subtle' },
            _focus: {
              borderColor: 'brand.solid',
              boxShadow: 'focus',
              outline: 'none',
            },
          },
        },
      }),
    },
    semanticTokens: {
      colors: {
        fg: {
          DEFAULT: { value: '{colors.brl.textPrimary}' },
          muted: { value: '{colors.brl.textSecondary}' },
          subtle: { value: '{colors.brl.textTertiary}' },
          eyebrow: { value: '{colors.brand.500}' },
          onBrand: { value: '#FFFFFF' },
        },
        bg: {
          DEFAULT: { value: '{colors.brl.surface}' },
          dim: { value: '{colors.brl.surfaceDim}' },
          subtle: { value: '{colors.brl.surfaceContainer}' },
          inverse: { value: '{colors.navy.900}' },
          scrim: { value: 'rgba(15, 31, 74, 0.5)' },
        },
        border: {
          DEFAULT: { value: '{colors.brl.borderSubtle}' },
          emphasized: { value: '{colors.brl.borderStrong}' },
          divider: { value: '#F2F0EC' },
        },
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: '#FFFFFF' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.50}' },
          emphasized: { value: '{colors.brand.600}' },
          active: { value: '{colors.brand.700}' },
          dark: { value: '{colors.navy.900}' },
          accent: { value: '{colors.jade.500}' },
          focusRing: { value: '{colors.brand.500}' },
        },
        // ===== Status — paired tint + dark for legibility =====
        status: {
          danger: { value: '{colors.red.500}' },
          'danger.tint': { value: '{colors.red.100}' },
          'danger.dark': { value: '{colors.red.900}' },
          critical: { value: '{colors.orange.500}' },
          'critical.tint': { value: '{colors.orange.100}' },
          'critical.dark': { value: '{colors.orange.900}' },
          warning: { value: '{colors.amber.500}' },
          'warning.tint': { value: '{colors.amber.100}' },
          'warning.dark': { value: '{colors.amber.900}' },
          info: { value: '{colors.purple.500}' },
          'info.tint': { value: '{colors.purple.100}' },
          'info.dark': { value: '{colors.purple.900}' },
          success: { value: '{colors.jade.500}' },
          'success.tint': { value: '{colors.jade.100}' },
          'success.dark': { value: '{colors.jade.900}' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

// Augment Chakra's Button props with our custom `intent` recipe variant so
// call sites can write `<Button intent="primary">` with full type safety.
declare module '@chakra-ui/react' {
  interface ButtonProps {
    intent?: 'primary' | 'secondary' | 'ghost';
  }
}
