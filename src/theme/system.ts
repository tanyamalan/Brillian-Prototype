import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react';
import { colorRamps, fonts, radii, shadows } from './tokens';

/**
 * Brillian theme — primitives + semantic tokens, mapped to Chakra v3.
 *
 * Token *values* live in ./tokens.ts (single source of truth, also consumed by
 * the in-app style guide). This file wraps those raw values into Chakra's
 * `{ value }` shape and adds semantic tokens, recipes, and global CSS.
 */

// Recursively wrap raw token values in Chakra's `{ value }` shape.
type Wrapped<T> = T extends string
  ? { value: string }
  : { [K in keyof T]: Wrapped<T[K]> };

function wrap<T extends Record<string, unknown>>(input: T): Wrapped<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input)) {
    out[k] = typeof v === 'string' ? { value: v } : wrap(v as Record<string, unknown>);
  }
  return out as Wrapped<T>;
}

// ===== Recipes =====

const buttonRecipe = defineRecipe({
  base: {
    px: '4',
    rounded: 'xs',
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

const inputRecipe = defineRecipe({
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
});

const badgeRecipe = defineRecipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1.5',
    px: '3',
    py: '1',
    rounded: 'pill',
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: '1',
    borderWidth: 0,
    whiteSpace: 'nowrap',
  },
  variants: {
    intent: {
      danger: { bg: 'status.danger.tint', color: 'status.danger.dark' },
      critical: { bg: 'status.critical.tint', color: 'status.critical.dark' },
      warning: { bg: 'status.warning.tint', color: 'status.warning.dark' },
      info: { bg: 'status.info.tint', color: 'status.info.dark' },
      success: { bg: 'status.success.tint', color: 'status.success.dark' },
      brand: { bg: 'brand.subtle', color: 'brand.fg' },
      neutral: { bg: 'bg.subtle', color: 'fg.muted' },
    },
  },
});

const nativeSelectRecipe = defineRecipe({
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
});

// ===== Config =====

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
      fonts: wrap(fonts),
      colors: {
        ...wrap(colorRamps),
        // Legacy `brl.*` aliases — kept so existing direct refs keep working.
        // Prefer semantic tokens (`fg`, `bg`, `border`, `brand.*`) for new code.
        brl: {
          primary: { value: colorRamps.brand[500] },
          primaryLight: { value: colorRamps.brand[50] },
          primaryMuted: { value: colorRamps.brand[200] },
          primaryDark: { value: colorRamps.brand[700] },
          success: { value: colorRamps.lime[500] },
          successLight: { value: colorRamps.lime[100] },
          warning: { value: colorRamps.amber[500] },
          warningLight: { value: colorRamps.amber[100] },
          danger: { value: colorRamps.red[500] },
          dangerLight: { value: colorRamps.red[100] },
          textPrimary: { value: colorRamps.navy[900] },
          textSecondary: { value: colorRamps.warm[700] },
          textTertiary: { value: colorRamps.warm[600] },
          surface: { value: '#FFFFFF' },
          surfaceDim: { value: colorRamps.warm[50] },
          surfaceContainer: { value: colorRamps.warm[100] },
          borderSubtle: { value: colorRamps.warm[200] },
          borderStrong: { value: colorRamps.warm[300] },
        },
      },
      radii: wrap(radii),
      sizes: {
        control: { value: '44px' },
      },
      shadows: wrap(shadows),
    },
    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
      input: inputRecipe,
      nativeSelect: nativeSelectRecipe,
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
          accent: { value: '{colors.lime.500}' },
          'accent.tint': { value: '{colors.lime.100}' },
          'accent.dark': { value: '{colors.lime.700}' },
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
          success: { value: '{colors.lime.500}' },
          'success.tint': { value: '{colors.lime.100}' },
          'success.dark': { value: '{colors.lime.700}' },
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
  interface BadgeProps {
    intent?: 'danger' | 'critical' | 'warning' | 'info' | 'success' | 'brand' | 'neutral';
  }
}
