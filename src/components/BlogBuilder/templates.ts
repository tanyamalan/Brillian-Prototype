/**
 * HTML snippet generators for the Blog Builder.
 *
 * Each function returns a self-contained HTML string with inlined styles —
 * safe to drop into a Webflow HTML Embed block without any external CSS
 * dependencies. Colors and radii are sourced from src/theme/tokens.ts so the
 * marketing surface stays visually consistent with the product.
 */

import { colorRamps, radii } from '../../theme/tokens';

const FONT_STACK = `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;

// Key names predate the v2 rebrand; values now point at the v2 palette
// (navy→forest darks, brand→forest solids, warm→sand neutrals, lime→accent).
const C = {
  navy900: colorRamps.forest[900],
  navy700: colorRamps.forest[800],
  brand500: colorRamps.forest[700],
  brand600: colorRamps.forest[800],
  brand700: colorRamps.forest[900],
  brand50: colorRamps.forest[50],
  warm50: colorRamps.sand[50],
  warm100: colorRamps.sand[100],
  warm200: colorRamps.sand[200],
  warm600: colorRamps.sand[600],
  warm700: colorRamps.sand[700],
  lime500: colorRamps.lime[300],
  lime100: colorRamps.lime[100],
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeAttr = (s: string): string => escapeHtml(s);

// Inline markdown: **bold** then *italic*. Run AFTER HTML-escaping so user
// input can't inject tags; order matters so `**` markers are consumed first.
const applyInline = (escaped: string): string =>
  escaped
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong style="font-weight:700;">$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em style="font-style:italic;">$1</em>');

const PROSE_STYLES = {
  h2: `font-family:${FONT_STACK};font-size:26px;font-weight:600;letter-spacing:-0.4px;line-height:1.25;margin:48px 0 18px 0;color:${C.navy900};`,
  h3: `font-family:${FONT_STACK};font-size:20px;font-weight:600;letter-spacing:-0.2px;line-height:1.3;margin:36px 0 14px 0;color:${C.navy900};`,
  p: `font-family:${FONT_STACK};font-size:17px;line-height:1.65;color:${C.warm700};margin:0 0 18px 0;`,
  list: `font-family:${FONT_STACK};font-size:17px;line-height:1.65;color:${C.warm700};margin:0 0 18px 0;padding-left:24px;`,
  li: `margin:0 0 8px 0;`,
};

function renderProseBlock(block: string): string {
  const escaped = escapeHtml(block);

  if (/^###\s+/.test(escaped)) {
    return `<h3 style="${PROSE_STYLES.h3}">${applyInline(escaped.replace(/^###\s+/, ''))}</h3>`;
  }
  if (/^##\s+/.test(escaped)) {
    return `<h2 style="${PROSE_STYLES.h2}">${applyInline(escaped.replace(/^##\s+/, ''))}</h2>`;
  }

  const lines = escaped.split(/\n/).map(l => l.trim()).filter(Boolean);

  if (lines.length > 0 && lines.every(l => /^\d+[.)]\s+/.test(l))) {
    const items = lines
      .map(l => `<li style="${PROSE_STYLES.li}">${applyInline(l.replace(/^\d+[.)]\s+/, ''))}</li>`)
      .join('');
    return `<ol style="${PROSE_STYLES.list}">${items}</ol>`;
  }

  if (lines.length > 0 && lines.every(l => /^-\s+/.test(l))) {
    const items = lines
      .map(l => `<li style="${PROSE_STYLES.li}">${applyInline(l.replace(/^-\s+/, ''))}</li>`)
      .join('');
    return `<ul style="${PROSE_STYLES.list}">${items}</ul>`;
  }

  return `<p style="${PROSE_STYLES.p}">${applyInline(escaped).replace(/\n/g, '<br/>')}</p>`;
}

function renderMarkdownBody(body: string): string {
  return body
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(Boolean)
    .map(renderProseBlock)
    .join('\n  ');
}

// =========================================================================
// CTA card · navy → blue gradient with a white pill button.
// =========================================================================

export interface CtaInput {
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
}

export function renderCta({ eyebrow, title, body, buttonLabel, buttonUrl }: CtaInput): string {
  const safeUrl = buttonUrl.trim() || '#';
  return `<!-- Brillian · CTA card -->
<div style="font-family:${FONT_STACK};background:linear-gradient(120deg,${C.navy900} 0%,${C.brand500} 100%);border-radius:${radii.lg};padding:48px 56px;color:#FFFFFF;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:32px;">
  <div style="flex:1 1 320px;min-width:0;">
    ${eyebrow.trim()
      ? `<div style="font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:#FFFFFF;opacity:0.7;margin-bottom:12px;">${escapeHtml(eyebrow)}</div>`
      : ''}
    <div style="font-size:28px;font-weight:600;line-height:1.2;letter-spacing:-0.4px;margin-bottom:12px;color:#FFFFFF;">${escapeHtml(title)}</div>
    ${body.trim()
      ? `<div style="font-size:16px;line-height:1.55;color:#FFFFFF;opacity:0.82;max-width:520px;">${escapeHtml(body)}</div>`
      : ''}
  </div>
  <a href="${escapeAttr(safeUrl)}" style="display:inline-flex;align-items:center;gap:8px;background:#FFFFFF;color:${C.navy900};font-family:${FONT_STACK};font-size:15px;font-weight:600;padding:14px 26px;border-radius:999px;text-decoration:none;white-space:nowrap;">
    ${escapeHtml(buttonLabel)}
    <span aria-hidden="true" style="display:inline-block;transform:translateY(-1px);">→</span>
  </a>
</div>`;
}

// =========================================================================
// Stat row · 3-4 editorial stats with a navy top rule + hairline dividers.
// Mobile-friendly: `auto-fit` collapses the row to a single column under
// ~220px, and the 1px gap shows as a divider in both directions.
// =========================================================================

export interface StatItem {
  value: string;
  suffix: string;
  label: string;
  description: string;
}

export interface StatRowInput {
  items: StatItem[];
}

function renderStatItem({ value, suffix, label, description }: StatItem): string {
  return `<div style="background:#FFFFFF;padding:32px 28px;display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;align-items:flex-start;gap:4px;line-height:1;color:${C.navy900};white-space:nowrap;">
        <span style="font-size:clamp(48px,5.6vw,76px);font-weight:600;letter-spacing:-2.4px;line-height:0.95;">${escapeHtml(value)}</span>
        ${suffix.trim()
          ? `<span style="font-size:clamp(18px,1.8vw,22px);font-weight:600;letter-spacing:-0.4px;margin-top:6px;line-height:1;">${escapeHtml(suffix)}</span>`
          : ''}
      </div>
      <div style="font-size:17px;font-weight:600;color:${C.navy900};line-height:1.35;">${escapeHtml(label)}</div>
      ${description.trim()
        ? `<div style="font-size:14px;color:${C.warm700};line-height:1.55;">${escapeHtml(description)}</div>`
        : ''}
    </div>`;
}

export function renderStatRow({ items }: StatRowInput): string {
  return `<!-- Brillian · Stat row -->
<div style="font-family:${FONT_STACK};border-top:2px solid ${C.navy900};">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:${C.warm200};">
    ${items.map(renderStatItem).join('\n    ')}
  </div>
</div>`;
}

// =========================================================================
// Pull quote · large quoted text with attribution.
// =========================================================================

export interface QuoteInput {
  quote: string;
  name: string;
  role: string;
}

export function renderQuote({ quote, name, role }: QuoteInput): string {
  const attribution = [name.trim(), role.trim()].filter(Boolean).join(' · ');
  return `<!-- Brillian · Pull quote -->
<figure style="font-family:${FONT_STACK};margin:0;padding:40px 48px;background:#FFFFFF;border-radius:${radii.lg};border:1px solid ${C.warm200};position:relative;">
  <div aria-hidden="true" style="position:absolute;top:24px;left:48px;font-family:Georgia,serif;font-size:64px;line-height:1;color:${C.brand500};opacity:0.18;">“</div>
  <blockquote style="margin:0 0 20px 0;padding:0;font-size:22px;line-height:1.4;font-weight:500;color:${C.navy900};letter-spacing:-0.2px;">${escapeHtml(quote)}</blockquote>
  ${attribution
    ? `<figcaption style="font-size:13px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;color:${C.warm700};">${escapeHtml(attribution)}</figcaption>`
    : ''}
</figure>`;
}

// =========================================================================
// Plain text · markdown-lite body. Supports `##`/`###` headings, `**bold**`,
// `*italic*`, `1.` numbered lists, `- ` bullets. Blank line = new paragraph.
// =========================================================================

export interface ProseInput {
  body: string;
}

export function renderProse({ body }: ProseInput): string {
  return `<!-- Brillian · Prose block -->
<div style="font-family:${FONT_STACK};color:${C.navy900};max-width:720px;">
  ${renderMarkdownBody(body)}
</div>`;
}
