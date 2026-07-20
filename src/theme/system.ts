import { createSystem, defaultConfig, defineConfig, defineRecipe, defineSlotRecipe } from '@chakra-ui/react';
import { colorRamps, fonts, radii, shadows, white } from './tokens';

/**
 * Brillian theme — primitives + semantic tokens, mapped to Chakra v3.
 * Source of truth: Brillian Token Build Reference (July 13).
 *
 * Token *values* live in ./tokens.ts (single source of truth, also consumed by
 * the in-app style guide). This file wraps those raw values into Chakra's
 * `{ value }` shape and adds semantic tokens, recipes, and global CSS.
 *
 * Layering: primitives → semantic → component. Components reference semantic
 * tokens (`fg`, `border`, `input.*`, `brand.*`), never raw ramp steps.
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

// NOTE (July 13 reference): production button tokens are WIP — variants and
// state colors are still being refined in the guidelines. These intents keep
// the current look wired through semantic tokens; don't harden further.
const buttonRecipe = defineRecipe({
  base: {
    px: '4',
    rounded: 'control',
    fontSize: '13px',
    fontWeight: 500,
  },
  variants: {
    size: {
      // Override Chakra's default `md` so it hits our 40px control size.
      md: { h: 'control', px: '4' },
    },
    intent: {
      primary: {
        bg: 'brand.solid',
        color: 'fg.inverse',
        _hover: { bg: 'brand.emphasized' },
        _active: { bg: 'brand.active' },
        _disabled: { bg: 'brand.solid', opacity: 0.4, cursor: 'not-allowed' },
      },
      accent: {
        bg: 'accent.solid',
        color: 'fg',
        _hover: { bg: 'accent.emphasized' },
        _disabled: { bg: 'accent.solid', opacity: 0.4, cursor: 'not-allowed' },
      },
      secondary: {
        bg: 'bg',
        color: 'fg.muted',
        borderWidth: '1px',
        borderColor: 'border',
        _hover: { bg: 'bg.subtle' },
      },
      ghost: {
        bg: 'transparent',
        color: 'forest.600',
        _hover: { bg: 'brand.subtle' },
      },
    },
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
    fontWeight: 500,
    lineHeight: '1',
    borderWidth: 0,
    whiteSpace: 'nowrap',
  },
  variants: {
    intent: {
      danger: { bg: 'status.danger.tint', color: 'status.danger.text' },
      warning: { bg: 'status.warning.tint', color: 'status.warning.text' },
      moderate: { bg: 'status.moderate.tint', color: 'status.moderate.text' },
      success: { bg: 'status.success.tint', color: 'status.success.text' },
      brand: { bg: 'brand.subtle', color: 'brand.fg' },
      accent: { bg: 'accent.tint', color: 'accent.text' },
      neutral: { bg: 'bg.subtle', color: 'fg.muted' },
    },
  },
});

// Shared field styling — every text input, select, and textarea resolves to
// the `input.*` semantic tokens: white surface, ink borders, 4px control radius.
const fieldBase = {
  rounded: 'control',
  px: '4',
  fontSize: '14px',
  bg: 'input.bg',
  borderWidth: '1.5px',
  borderColor: 'input.borderRest',
  color: 'fg',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  _placeholder: { color: 'fg.placeholder' },
  _hover: { borderColor: 'input.borderHover' },
  _focus: {
    borderColor: 'input.borderFocus',
    boxShadow: 'focus',
    outline: 'none',
  },
  _disabled: {
    bg: 'input.bgDisabled',
    borderColor: 'input.borderDisabled',
    color: 'fg.disabled',
    cursor: 'not-allowed',
  },
} as const;

const inputRecipe = defineRecipe({
  base: { h: 'control', ...fieldBase },
});

const textareaRecipe = defineRecipe({
  base: { py: '2', minH: '20', ...fieldBase },
});

const nativeSelectRecipe = defineRecipe({
  className: 'native-select',
  base: {
    h: 'control',
    '& select': { h: 'control', ...fieldBase },
  },
});

// Checkbox control — default border (ink.200), control radius, brand when checked.
const checkboxRecipe = defineSlotRecipe({
  slots: ['control'],
  base: {
    control: {
      borderWidth: '1px',
      borderColor: 'border',
      rounded: 'control',
      _checked: {
        bg: 'brand.solid',
        borderColor: 'brand.solid',
        color: 'fg.inverse',
      },
      _focusVisible: { boxShadow: 'focus' },
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
      color: 'fg.body',
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
        white: { value: white },
        // Legacy `brl.*` aliases — kept so existing direct refs keep working.
        // Prefer semantic tokens (`fg`, `bg`, `border`, `brand.*`) for new code.
        brl: {
          primary: { value: colorRamps.forest[600] },
          primaryLight: { value: colorRamps.forest[50] },
          primaryMuted: { value: colorRamps.forest[200] },
          primaryDark: { value: colorRamps.forest[800] },
          success: { value: colorRamps.forest[600] },
          successLight: { value: colorRamps.forest[100] },
          warning: { value: colorRamps.coral[500] },
          warningLight: { value: colorRamps.coral[100] },
          danger: { value: colorRamps.brick[500] },
          dangerLight: { value: colorRamps.brick[100] },
          textPrimary: { value: colorRamps.ink[900] },
          textSecondary: { value: colorRamps.ink[600] },
          textTertiary: { value: colorRamps.ink[500] },
          surface: { value: white },
          surfaceDim: { value: colorRamps.sand[50] },
          surfaceContainer: { value: colorRamps.sand[100] },
          borderSubtle: { value: colorRamps.ink[100] },
          borderStrong: { value: colorRamps.ink[200] },
        },
      },
      radii: wrap(radii),
      sizes: {
        control: { value: '40px' },
      },
      shadows: wrap(shadows),
    },
    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
      input: inputRecipe,
      textarea: textareaRecipe,
      nativeSelect: nativeSelectRecipe,
    },
    slotRecipes: {
      checkbox: checkboxRecipe,
    },
    semanticTokens: {
      radii: {
        control: { value: '{radii.base}' }, // buttons, inputs, selects, chips
        card: { value: '{radii.lg}' }, // cards, panels, modals
        pill: { value: '{radii.full}' }, // tags, avatars, toggles
      },
      shadows: {
        // Chakra's defaults live at the semantic layer (color-mix based), so
        // the July 13 values must be re-declared here to win over them.
        xs: { value: shadows.xs },
        sm: { value: shadows.sm },
        md: { value: shadows.md },
        lg: { value: shadows.lg },
        focus: { value: shadows.focus },
        elevated: { value: shadows.sm }, // card default
        raised: { value: shadows.lg }, // overlays, popovers, menus
      },
      colors: {
        // ===== Text (11) =====
        fg: {
          DEFAULT: { value: '{colors.ink.900}' },
          body: { value: '{colors.ink.800}' },
          muted: { value: '{colors.ink.600}' },
          subtle: { value: '{colors.ink.500}' },
          placeholder: { value: '{colors.ink.400}' },
          disabled: { value: '{colors.ink.400}' },
          error: { value: '{colors.brick.700}' },
          success: { value: '{colors.forest.700}' },
          inverse: { value: '{colors.ink.50}' },
          inverseSecondary: { value: '{colors.ink.200}' },
          inverseSubtle: { value: '{colors.ink.300}' },
          // Legacy aliases
          eyebrow: { value: '{colors.forest.600}' },
          onBrand: { value: '{colors.ink.50}' },
          onAccent: { value: '{colors.ink.900}' },
        },
        // ===== Surface =====
        bg: {
          DEFAULT: { value: '{colors.white}' },
          dim: { value: '{colors.sand.50}' }, // page canvas, muted fills
          subtle: { value: '{colors.sand.100}' },
          inverse: { value: '{colors.forest.800}' },
          scrim: { value: 'rgba(11, 33, 28, 0.5)' },
        },
        // ===== Border (4) =====
        border: {
          subtle: { value: '{colors.ink.100}' }, // hairlines, dividers, card edges
          DEFAULT: { value: '{colors.ink.200}' }, // input rest, standard borders
          strong: { value: '{colors.ink.400}' }, // state-bearing / hover edges
          onDark: { value: '{colors.ink.700}' },
          // Legacy aliases
          emphasized: { value: '{colors.ink.200}' },
          divider: { value: '{colors.ink.100}' },
        },
        // ===== Brand =====
        brand: {
          solid: { value: '{colors.forest.600}' },
          contrast: { value: '{colors.ink.50}' },
          fg: { value: '{colors.forest.600}' },
          muted: { value: '{colors.forest.100}' },
          subtle: { value: '{colors.forest.50}' },
          emphasized: { value: '{colors.forest.700}' },
          active: { value: '{colors.forest.800}' },
          dark: { value: '{colors.forest.800}' },
          focusRing: { value: '{colors.forest.600}' },
        },
        // ===== Input (8) =====
        input: {
          bg: { value: '{colors.white}' },
          bgDisabled: { value: '{colors.ink.50}' },
          borderRest: { value: '{colors.ink.200}' },
          borderHover: { value: '{colors.ink.400}' },
          borderFocus: { value: '{colors.forest.600}' },
          borderError: { value: '{colors.brick.500}' },
          borderSuccess: { value: '{colors.forest.500}' },
          borderDisabled: { value: '{colors.ink.100}' },
        },
        // ===== Navigation — one scheme for the outer rail AND inner panel =====
        nav: {
          hoverBg: { value: '{colors.forest.50}' },
          activeBg: { value: '{colors.forest.100}' },
          activeFg: { value: '{colors.forest.600}' },
        },
        // ===== Accent =====
        accent: {
          solid: { value: '{colors.lime.300}' },
          emphasized: { value: '{colors.lime.400}' },
          tint: { value: '{colors.lime.50}' },
          text: { value: '{colors.lime.800}' },
          required: { value: '{colors.brick.500}' }, // required-field asterisk
        },
        // ===== Status — paired tint + text for legibility =====
        // Health scale, healthiest first: success → moderate → warning → danger
        status: {
          success: { value: '{colors.forest.600}' },
          'success.tint': { value: '{colors.forest.100}' },
          'success.text': { value: '{colors.forest.700}' },
          moderate: { value: '{colors.citron.400}' },
          'moderate.tint': { value: '{colors.citron.100}' },
          'moderate.text': { value: '{colors.citron.800}' },
          warning: { value: '{colors.coral.500}' },
          'warning.tint': { value: '{colors.coral.100}' },
          'warning.text': { value: '{colors.coral.800}' },
          danger: { value: '{colors.brick.500}' },
          'danger.tint': { value: '{colors.brick.100}' },
          'danger.text': { value: '{colors.brick.800}' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

// Augment Chakra's props with our custom `intent` recipe variants so call
// sites can write `<Button intent="primary">` with full type safety.
declare module '@chakra-ui/react' {
  interface ButtonProps {
    intent?: 'primary' | 'accent' | 'secondary' | 'ghost';
  }
  interface BadgeProps {
    intent?: 'danger' | 'warning' | 'moderate' | 'success' | 'brand' | 'accent' | 'neutral';
  }
}
