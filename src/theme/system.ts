import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react';

/**
 * Button recipe: enforces our 44px height, 4px radius, and three intents.
 * Call sites should use `<Button intent="primary|secondary|ghost">`.
 */
const buttonRecipe = defineRecipe({
  base: {
    px: '4',
    rounded: 'sm',
    fontSize: '13px',
    fontWeight: 600,
  },
  variants: {
    // Override Chakra's default size variants so `size="md"` hits our 44px token.
    size: {
      md: { h: 'control', px: '4' },
    },
    intent: {
      primary: {
        bg: 'brand.solid',
        color: 'white',
        _hover: { bg: 'brand.emphasized' },
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
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Google Sans','Google Sans Text',-apple-system,sans-serif` },
        body: { value: `'Google Sans','Google Sans Text',-apple-system,sans-serif` },
      },
      colors: {
        brl: {
          primary: { value: '#1A73E8' },
          primaryLight: { value: '#E8F0FE' },
          primaryMuted: { value: '#A8C7FA' },
          primaryDark: { value: '#1565C0' },
          success: { value: '#1E8E3E' },
          successLight: { value: '#E6F4EA' },
          warning: { value: '#F9AB00' },
          warningLight: { value: '#FEF7E0' },
          danger: { value: '#D93025' },
          dangerLight: { value: '#FCE8E6' },
          textPrimary: { value: '#1F1F1F' },
          textSecondary: { value: '#5F6368' },
          textTertiary: { value: '#9AA0A6' },
          surface: { value: '#FFFFFF' },
          surfaceDim: { value: '#F5F5F5' },
          surfaceContainer: { value: '#F1F3F4' },
          borderSubtle: { value: '#E8EAED' },
          borderStrong: { value: '#DADCE0' },
        },
        brand: {
          50: { value: '#E8F0FE' },
          100: { value: '#D2E3FC' },
          200: { value: '#A8C7FA' },
          300: { value: '#7BAAF7' },
          400: { value: '#4285F4' },
          500: { value: '#1A73E8' },
          600: { value: '#1765CC' },
          700: { value: '#1565C0' },
          800: { value: '#0D47A1' },
          900: { value: '#0A2F66' },
        },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '4px' },
        md: { value: '4px' },
        lg: { value: '16px' },
        full: { value: '9999px' },
      },
      sizes: {
        control: { value: '44px' },
      },
      shadows: {
        card: { value: '0 1px 0 0 #0000000f' },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: defineRecipe({
        base: { h: 'control', rounded: 'sm' },
      }),
      nativeSelect: defineRecipe({
        className: 'native-select',
        base: { h: 'control' },
      }),
    },
    semanticTokens: {
      colors: {
        fg: {
          DEFAULT: { value: '{colors.brl.textPrimary}' },
          muted: { value: '{colors.brl.textSecondary}' },
          subtle: { value: '{colors.brl.textTertiary}' },
        },
        bg: {
          DEFAULT: { value: '{colors.brl.surface}' },
          dim: { value: '{colors.brl.surfaceDim}' },
          subtle: { value: '{colors.brl.surfaceContainer}' },
        },
        border: {
          DEFAULT: { value: '{colors.brl.borderSubtle}' },
          emphasized: { value: '{colors.brl.borderStrong}' },
        },
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: '#FFFFFF' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.50}' },
          emphasized: { value: '{colors.brand.600}' },
          focusRing: { value: '{colors.brand.500}' },
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
