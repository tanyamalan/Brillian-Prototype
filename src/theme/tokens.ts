/**
 * Single source of truth for design-system token values.
 * Source: Brillian Token Build Reference (July 13) — companion to the
 * guidelines site in the Brillian-Design repo (Netlify).
 *
 * Build order: primitives → semantic → component. Primitives hold raw values;
 * semantic tokens alias primitives; components consume semantic tokens.
 * Nothing here references a raw hex twice.
 *
 * `system.ts` consumes these to build the Chakra system; the in-app style
 * guide (src/components/StyleGuide) reads the same exports for its swatches.
 */

// ===== Color ramps · 71 tokens =====

export const colorRamps = {
  forest: {
    50: '#F3F8F7',
    100: '#E4EFEC',
    200: '#C9DFD9',
    300: '#A3C5BB',
    400: '#6FA191',
    500: '#3F7568',
    600: '#1B463D', // brand
    700: '#153831',
    800: '#0E2A25',
    900: '#061714',
  },
  sand: {
    50: '#F6F5F3',
    100: '#EBE7E0',
    200: '#D6D0C5',
    300: '#BFB8AD',
    400: '#A5A097',
    500: '#8E887E',
    600: '#757067',
    700: '#5C5851',
    800: '#423F3A',
    900: '#292724',
  },
  brick: {
    50: '#FDF0F0',
    100: '#F8D5D5',
    200: '#F2BABA',
    300: '#E69494',
    400: '#D67070',
    500: '#C35050',
    600: '#A83B3B',
    700: '#832F2F',
    800: '#5F2323',
    900: '#3B1616',
  },
  coral: {
    50: '#FDF2EF',
    100: '#F9D5C9',
    200: '#F4B7A4',
    300: '#F0A188',
    400: '#EB8B6C',
    500: '#E67551',
    600: '#D95126',
    700: '#A44223',
    800: '#72311D',
    900: '#431F14',
  },
  citron: {
    50: '#FDFDF2',
    100: '#F7F6CE',
    200: '#F0EFAA',
    300: '#E9E787',
    400: '#E0DE6C',
    500: '#D6D451',
    600: '#C5C231',
    700: '#9C9929',
    800: '#737120',
    900: '#4B4A16',
  },
  lime: {
    50: '#F7FCF0',
    100: '#E6F7CD',
    200: '#D4F3A8',
    300: '#C3F083',
    400: '#AFE75F',
    500: '#9ADD3C',
    600: '#83C524',
    700: '#689C1E',
    800: '#4E7417',
    900: '#334C10',
  },
  // Ink — green-grey neutrals for text, borders, and input chrome.
  ink: {
    50: '#F5F6F5',
    100: '#E8E9E9',
    200: '#D1D4D2',
    300: '#A4A8A6',
    400: '#828985',
    500: '#5E6B64',
    600: '#47574F',
    700: '#33463F',
    800: '#1F3D36',
    900: '#0B211C',
  },
} as const;

export const white = '#FFFFFF';

// ===== Radii · theme.radii (8) =====
// Semantic aliases: radii.control → base (4px), radii.card → lg (8px),
// radii.pill → full.

export const radii = {
  none: '0',
  sm: '2px',
  base: '4px', // → control
  md: '6px',
  lg: '8px', // → card
  xl: '12px',
  '2xl': '16px',
  full: '9999px', // → pill
} as const;

export const radiiAliases = {
  control: { alias: 'base', value: radii.base, use: 'Buttons, inputs, selects, chips' },
  card: { alias: 'lg', value: radii.lg, use: 'Cards, panels, modals' },
  pill: { alias: 'full', value: radii.full, use: 'Tags, avatars, toggles' },
} as const;

// ===== Shadows · theme.shadows (4) =====
// Semantic aliases: shadow.elevated → sm (card default), shadow.raised → lg
// (overlays, popovers, menus).

export const shadows = {
  xs: '0 1px 4px rgba(12, 12, 13, 0.05)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.15)', // → elevated
  md: '0 4px 12px rgba(11, 33, 28, 0.10)',
  lg: '0 8px 24px rgba(11, 33, 28, 0.16)', // → raised
  focus: '0 0 0 3px rgba(27, 70, 61, 0.22)',
} as const;

// ===== Type scale =====
// Step names follow Chakra's own scale so the tokens mean the same thing in
// both systems — xs through xl are identical to Chakra's defaults; only the
// display sizes (2xl/3xl/4xl) are overridden upward. Anchored to the guide's
// real usage: 18 = card title, 16 = section header, 14 = body.
// Component-level sizes that are NOT scale steps: 13px field/button labels,
// 11px eyebrows — pin those explicitly in the recipe/component.
// Wired into Chakra via system.ts so fontSize="lg" etc. resolve to these.

export const fontSizes = {
  '2xs': '10px', // fine print (Chakra default)
  xs: '12px', // captions, mono annotations (Chakra default)
  sm: '14px', // body, inputs, card descriptions (Chakra default)
  md: '16px', // section headers, body lead (Chakra default)
  lg: '18px', // card titles (Chakra default)
  xl: '20px', // page-section headings (Chakra default)
  '2xl': '26px', // Chakra: 24
  '3xl': '32px', // Chakra: 30
  '4xl': '40px', // display · Chakra: 36
  // Marketing / hero tier — identical to Chakra's defaults, pinned so the
  // guide documents the full scale. Not for product surfaces.
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px',
} as const;

// ===== Text styles =====
// The role layer on top of the size scale: each pairs size + weight +
// line-height (+ family / tracking) so call sites write
// `textStyle="cardTitle"` instead of re-typing fontSize/fontWeight by hand.
// fontSizes stays pure (sizes only); pairings live here, once.

export const textStyles = {
  marketingHero: {
    description: 'Marketing hero — PP Telegraf carries the weight',
    value: { fontFamily: 'display', fontSize: '6xl', fontWeight: '400', lineHeight: '1.1', letterSpacing: '-0.02em' },
  },
  marketingDisplay: {
    description: 'Marketing display',
    value: { fontFamily: 'display', fontSize: '5xl', fontWeight: '400', lineHeight: '1.1', letterSpacing: '-0.02em' },
  },
  display: {
    description: 'Product display — hero stats',
    value: { fontSize: '4xl', fontWeight: '500', lineHeight: '1.15', letterSpacing: '-0.02em' },
  },
  pageTitle: {
    description: 'The h1 on every page — 2xl mobile, 3xl desktop',
    value: { fontSize: { base: '2xl', md: '3xl' }, fontWeight: '500', lineHeight: '1.2' },
  },
  heading2: {
    description: 'Section-level heading',
    value: { fontSize: '2xl', fontWeight: '500', lineHeight: '1.25' },
  },
  heading3: {
    description: 'Sub-heading',
    value: { fontSize: 'xl', fontWeight: '500', lineHeight: '1.3' },
  },
  cardTitle: {
    description: 'Card header title',
    value: { fontSize: 'lg', fontWeight: '500', lineHeight: '1.3' },
  },
  sectionHeader: {
    description: 'In-page section header above content',
    value: { fontSize: 'md', fontWeight: '500', lineHeight: '1.35' },
  },
  body: {
    description: 'Default body copy',
    value: { fontSize: 'sm', fontWeight: '400', lineHeight: '1.5' },
  },
  bodyEmphasis: {
    description: 'Emphasized body — medium, never bold',
    value: { fontSize: 'sm', fontWeight: '500', lineHeight: '1.5' },
  },
  label: {
    description: 'Field & button labels (component-level 13px)',
    value: { fontSize: '13px', fontWeight: '600', lineHeight: '1.35' },
  },
  caption: {
    description: 'Captions, metadata, helper text',
    value: { fontSize: 'xs', fontWeight: '500', lineHeight: '1.4' },
  },
  eyebrow: {
    description: 'Small-caps eyebrow over titles',
    value: { fontSize: '11px', fontWeight: '600', lineHeight: '1.3', letterSpacing: '0.5px', textTransform: 'uppercase' },
  },
  finePrint: {
    description: 'Smallest legible text',
    value: { fontSize: '2xs', fontWeight: '500', lineHeight: '1.4' },
  },
} as const;

// ===== Fonts =====

export const fonts = {
  // Vanity display face — marketing headers at 5xl (48px) and up ONLY.
  // Falls back to Manrope when the licensed files aren't present.
  display: `'PP Telegraf','Manrope',-apple-system,sans-serif`,
  heading: `'Manrope',-apple-system,sans-serif`,
  body: `'Manrope',-apple-system,sans-serif`,
  mono: `'JetBrains Mono', ui-monospace, monospace`,
} as const;

// ===== Spacing scale (Chakra default 4px grid — listed for the doc) =====

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

// ===== Layout sizes =====
// Fixed chrome dimensions and page max-widths. Wired into Chakra `sizes` so
// components reference tokens (w="shell.rail", maxW="container.detail")
// instead of magic numbers.

export const layoutSizes = {
  shell: {
    header: '60px', // topbar / rail logo band / panel header — one shared band
    rail: '72px', // outer icon rail
    panel: '220px', // advisor inner panel
  },
  container: {
    detail: '1200px', // detail pages (tabs + cards)
    flow: '800px', // focused flows (onboarding page)
    dialog: '420px', // modal dialogs
    prose: '820px', // long-form text
  },
} as const;

// ===== Dark-nav gradient =====
// A soft light-from-above glow (Forest 400/500) over a deep vertical ramp
// (Forest 700 → 900). Painted with `background-attachment: fixed` so the rail
// and panel — two separate elements — read as one continuous lit surface.

export const navDarkGradient = [
  // glow anchored at the viewport's top-left corner
  `radial-gradient(760px 560px at -4% -10%, rgba(111, 161, 145, 0.55) 0%, rgba(63, 117, 104, 0.26) 38%, rgba(63, 117, 104, 0) 68%)`,
  // vertical base ramp
  `linear-gradient(180deg, ${colorRamps.forest[700]} 0%, ${colorRamps.forest[800]} 45%, ${colorRamps.forest[900]} 100%)`,
].join(', ');

// ===== Semantic tokens =====
// These map descriptive intent to a ramp value. Render swatches by reading
// from `colorRamps` so changes there flow through automatically.

export const semanticColors = {
  // Text (11)
  fg: {
    DEFAULT: { ramp: 'ink', step: 900, name: 'text.primary' },
    body: { ramp: 'ink', step: 800, name: 'text.body' },
    muted: { ramp: 'ink', step: 600, name: 'text.secondary' },
    subtle: { ramp: 'ink', step: 500, name: 'text.subtle' },
    placeholder: { ramp: 'ink', step: 400, name: 'text.placeholder' },
    disabled: { ramp: 'ink', step: 400, name: 'text.disabled' },
    error: { ramp: 'brick', step: 700, name: 'text.error' },
    // Lime 800 (not lighter): success text must clear 4.5:1 on white.
    success: { ramp: 'lime', step: 800, name: 'text.success' },
    inverse: { ramp: 'ink', step: 50, name: 'text.inverse-primary' },
    inverseSecondary: { ramp: 'ink', step: 200, name: 'text.inverse-secondary' },
    inverseSubtle: { ramp: 'ink', step: 300, name: 'text.inverse-subtle' },
  },
  // Brand & surface
  bg: {
    DEFAULT: { ramp: null, value: white, name: 'surface.bg-surface' },
    dim: { ramp: 'sand', step: 50, name: 'surface.bg-canvas' },
    subtle: { ramp: 'sand', step: 100, name: 'bg.subtle' },
    inverse: { ramp: 'forest', step: 800, name: 'bg.inverse' },
  },
  // Border (4)
  border: {
    subtle: { ramp: 'ink', step: 100, name: 'border.subtle' },
    DEFAULT: { ramp: 'ink', step: 200, name: 'border.default' },
    strong: { ramp: 'ink', step: 400, name: 'border.strong' },
    onDark: { ramp: 'ink', step: 700, name: 'border.on-dark' },
  },
  brand: {
    solid: { ramp: 'forest', step: 600, name: 'brand' },
    emphasized: { ramp: 'forest', step: 700, name: 'brand.emphasized' },
    active: { ramp: 'forest', step: 800, name: 'brand.active' },
    fg: { ramp: 'forest', step: 600, name: 'brand.fg' },
    subtle: { ramp: 'forest', step: 50, name: 'brand.subtle' },
    muted: { ramp: 'forest', step: 100, name: 'brand.muted' },
    contrast: { ramp: 'ink', step: 50, name: 'brand.contrast' },
    dark: { ramp: 'forest', step: 800, name: 'brand.dark' },
  },
  // Input (8)
  input: {
    bg: { ramp: null, value: white, name: 'input.bg' },
    bgDisabled: { ramp: 'ink', step: 50, name: 'input.bg-disabled' },
    borderRest: { ramp: 'ink', step: 200, name: 'input.border-rest' },
    borderHover: { ramp: 'ink', step: 400, name: 'input.border-hover' },
    borderFocus: { ramp: 'forest', step: 600, name: 'input.border-focus' },
    borderError: { ramp: 'brick', step: 500, name: 'input.border-error' },
    // Lime 700 (not lighter): state-bearing borders must clear 3:1 on white.
    borderSuccess: { ramp: 'lime', step: 700, name: 'input.border-success' },
    // 200 (not 100): disabled fields keep a visible edge on tinted cards.
    borderDisabled: { ramp: 'ink', step: 200, name: 'input.border-disabled' },
    // Read-only per the guide: value without an editable frame — ink fill, no border.
    bgReadonly: { ramp: 'ink', step: 50, name: 'input.bg-readonly' },
  },
  accent: {
    solid: { ramp: 'lime', step: 300, name: 'accent.solid' },
    emphasized: { ramp: 'lime', step: 400, name: 'accent.emphasized' },
    tint: { ramp: 'lime', step: 50, name: 'accent.tint' },
    text: { ramp: 'lime', step: 800, name: 'accent.text' },
    required: { ramp: 'brick', step: 500, name: 'accent.required' },
  },
  // Health-scale order, healthiest first: success → moderate → warning → danger.
  // Each status pairs a `.tint` for backgrounds with a `.text` for text on tints.
  status: {
    success: {
      label: 'Success',
      use: 'Healthy metrics, above target',
      ramp: 'lime',
      tint: { step: 100, name: 'status.success.tint' },
      base: { step: 600, name: 'status.success' },
      text: { step: 800, name: 'status.success.text' },
    },
    moderate: {
      label: 'Moderate',
      use: 'Middle-band metrics, watch items. Dark text only.',
      ramp: 'citron',
      tint: { step: 100, name: 'status.moderate.tint' },
      base: { step: 400, name: 'status.moderate' },
      text: { step: 800, name: 'status.moderate.text' },
    },
    warning: {
      label: 'Warning',
      use: 'Below target, needs attention',
      ramp: 'coral',
      tint: { step: 100, name: 'status.warning.tint' },
      base: { step: 500, name: 'status.warning' },
      text: { step: 800, name: 'status.warning.text' },
    },
    danger: {
      label: 'Danger',
      use: 'Critical risk, destructive actions',
      ramp: 'brick',
      tint: { step: 100, name: 'status.danger.tint' },
      base: { step: 500, name: 'status.danger' },
      text: { step: 800, name: 'status.danger.text' },
    },
  },
} as const;

export type ColorRampKey = keyof typeof colorRamps;

// ===== Motion =====
// Durations + easings shared across product and marketing surfaces.

export const motion = {
  durations: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    stepTransition: '700ms',
  },
  easings: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
