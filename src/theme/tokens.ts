/**
 * Single source of truth for design-system token values.
 *
 * `system.ts` consumes these to build the Chakra system; the in-app style guide
 * (src/components/StyleGuide) reads the same exports to render swatches and
 * tables. Anywhere else in the app, prefer Chakra style props
 * (`bg="brand.500"`, `rounded="lg"`) so values flow through the theme system.
 */

// ===== Color ramps =====

export const colorRamps = {
  brand: {
    50: '#EEF3FE',
    100: '#DDE7FD',
    200: '#B7CBFB',
    300: '#8AA8F8',
    400: '#4D7DF5',
    500: '#265FF2',
    600: '#1A4DD3',
    700: '#1A3F9C',
    800: '#14306F',
    900: '#0F1F4A',
  },
  navy: {
    50: '#E8EAF1',
    100: '#C5CAD9',
    200: '#8E97B4',
    500: '#2C3D6B',
    700: '#1A2A56',
    900: '#0F1F4A',
  },
  lime: {
    50: '#F5FCDD',
    100: '#E0F491',
    500: '#87A902',
    700: '#4D7C2A',
    900: '#1F4D2A',
  },
  warm: {
    50: '#F9F8F7',
    100: '#F4F2EE',
    200: '#ECEAE6',
    300: '#DCD9D2',
    500: '#9AA0A6',
    600: '#6B7280',
    700: '#4B5563',
    900: '#0F1F4A',
  },
  red: { 100: '#FCD7D2', 500: '#DC2D24', 900: '#9B1F18' },
  orange: { 100: '#FBE0CC', 500: '#DB5614', 900: '#8C3508' },
  amber: { 100: '#FCEBB8', 500: '#E8B321', 900: '#7A5C0A' },
  purple: { 100: '#DDD3FA', 500: '#5938E4', 900: '#38228F' },
  cyan: { 500: '#0197FF' },
  pink: { 500: '#F66DBD' },
} as const;

// ===== Radii =====

export const radii = {
  none: '0',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  pill: '100px',
  full: '9999px',
} as const;

// ===== Shadows =====

export const shadows = {
  sm: '0 1px 2px rgba(15, 31, 74, 0.04)',
  card: '0 1px 3px rgba(15, 31, 74, 0.08), 0 1px 2px rgba(15, 31, 74, 0.04)',
  modal: '0 10px 30px rgba(15, 31, 74, 0.18)',
  focus: '0 0 0 3px rgba(38, 95, 242, 0.18)',
} as const;

// ===== Type scale =====

export const fontSizes = {
  xs: '11px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '20px',
  xl: '26px',
  '2xl': '32px',
  '3xl': '40px',
} as const;

// ===== Fonts =====

export const fonts = {
  heading: `'Manrope',-apple-system,sans-serif`,
  body: `'Manrope',-apple-system,sans-serif`,
  mono: `'JetBrains Mono', ui-monospace, monospace`,
} as const;

// ===== Spacing scale (Chakra default — listed for the doc) =====

export const spacing = {
  '0': '0',
  '0.5': '2px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
} as const;

// ===== Semantic tokens =====
// These map descriptive intent to a ramp value. Render the swatches by reading
// from `colorRamps` so changes there flow through automatically.

export const semanticColors = {
  fg: {
    DEFAULT: { ramp: 'navy', step: 900, name: 'fg' },
    muted: { ramp: 'warm', step: 700, name: 'fg.muted' },
    subtle: { ramp: 'warm', step: 600, name: 'fg.subtle' },
    onBrand: { ramp: null, value: '#FFFFFF', name: 'fg.onBrand' },
    eyebrow: { ramp: 'brand', step: 500, name: 'fg.eyebrow' },
  },
  bg: {
    DEFAULT: { ramp: null, value: '#FFFFFF', name: 'bg' },
    dim: { ramp: 'warm', step: 50, name: 'bg.dim' },
    subtle: { ramp: 'warm', step: 100, name: 'bg.subtle' },
    inverse: { ramp: 'navy', step: 900, name: 'bg.inverse' },
  },
  border: {
    DEFAULT: { ramp: 'warm', step: 200, name: 'border' },
    emphasized: { ramp: 'warm', step: 300, name: 'border.emphasized' },
  },
  brand: {
    solid: { ramp: 'brand', step: 500, name: 'brand.solid' },
    emphasized: { ramp: 'brand', step: 600, name: 'brand.emphasized' },
    active: { ramp: 'brand', step: 700, name: 'brand.active' },
    fg: { ramp: 'brand', step: 700, name: 'brand.fg' },
    subtle: { ramp: 'brand', step: 50, name: 'brand.subtle' },
    muted: { ramp: 'brand', step: 100, name: 'brand.muted' },
    contrast: { ramp: null, value: '#FFFFFF', name: 'brand.contrast' },
    dark: { ramp: 'navy', step: 900, name: 'brand.dark' },
    accent: { ramp: 'lime', step: 500, name: 'brand.accent' },
    'accent.tint': { ramp: 'lime', step: 100, name: 'brand.accent.tint' },
    'accent.dark': { ramp: 'lime', step: 700, name: 'brand.accent.dark' },
  },
  status: {
    danger: {
      label: 'High risk',
      ramp: 'red',
      tint: { step: 100, name: 'status.danger.tint' },
      base: { step: 500, name: 'status.danger' },
      dark: { step: 900, name: 'status.danger.dark' },
    },
    critical: {
      label: 'Critical',
      ramp: 'orange',
      tint: { step: 100, name: 'status.critical.tint' },
      base: { step: 500, name: 'status.critical' },
      dark: { step: 900, name: 'status.critical.dark' },
    },
    warning: {
      label: 'Moderate',
      ramp: 'amber',
      tint: { step: 100, name: 'status.warning.tint' },
      base: { step: 500, name: 'status.warning' },
      dark: { step: 900, name: 'status.warning.dark' },
    },
    info: {
      label: 'At target',
      ramp: 'purple',
      tint: { step: 100, name: 'status.info.tint' },
      base: { step: 500, name: 'status.info' },
      dark: { step: 900, name: 'status.info.dark' },
    },
    success: {
      label: 'Above target',
      ramp: 'lime',
      tint: { step: 100, name: 'status.success.tint' },
      base: { step: 500, name: 'status.success' },
      dark: { step: 700, name: 'status.success.dark' },
    },
  },
} as const;

// ===== Reserved colors =====
// Marketing & data-viz only — never appear in product UI primitives.

export const reservedColors = [
  { name: 'cyan.base', hex: colorRamps.cyan[500], note: 'Marketing accent · data viz' },
  { name: 'pink.base', hex: colorRamps.pink[500], note: 'Marketing accent · data viz' },
] as const;

export type ColorRampKey = keyof typeof colorRamps;

// ===== Motion =====
// Durations + easings shared across product and marketing surfaces.

export const motion = {
  durations: {
    fast: '150ms',
    base: '250ms',
    slow: '450ms',
    stepTransition: '700ms',
  },
  easings: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
    linear: 'linear',
  },
  keyframes: [
    {
      name: 'brl-spin',
      summary: 'Continuous 360° rotation. Used by the DidYouKnow halo.',
      duration: '14s',
      easing: 'linear',
    },
    {
      name: 'brl-pulse',
      summary: 'Gentle 1× → 1.08× breathing. Used on icon attention loops.',
      duration: '2.4s',
      easing: 'standard',
    },
    {
      name: 'brl-card-in',
      summary: 'Card mount: opacity 0→1 + translateY(8px→0) + scale(0.97→1).',
      duration: '0.8s',
      easing: 'standard',
    },
    {
      name: 'brl-step-in-fwd',
      summary: 'Onboarding step forward: slide in from the right (28px).',
      duration: '0.7s',
      easing: 'standard',
    },
    {
      name: 'brl-step-in-back',
      summary: 'Onboarding step back: slide in from the left (28px).',
      duration: '0.7s',
      easing: 'standard',
    },
  ],
} as const;
