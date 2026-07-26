import { useEffect, useState } from 'react';
import { Badge, Box, Button, Flex, Heading, Input, Link as ChakraLink, NativeSelect, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowLeft, BookOpen, FileCode, Lightbulb } from 'lucide-react';
import { Alert } from '../ui/Alert';
import { Avatar } from '../ui/Avatar';
import { Card, CardDivider, CardHeader } from '../ui/Card';
import { DisplayField } from '../ui/DisplayField';
import { InlineRadio, yesNoOptions } from '../ui/InlineRadio';
import { StatTile } from '../ui/StatTile';
import { TabNav } from '../ui/TabNav';
import { FormCard, FormField, Question } from '../ui/StepLayout';
import DidYouKnow, { Source } from '../Onboarding/DidYouKnow';
import {
  colorRamps,
  fontSizes,
  fonts,
  layoutSizes,
  motion,
  radii,
  semanticColors,
  shadows,
  spacing,
} from '../../theme/tokens';

const ink = colorRamps.ink;
const forest = colorRamps.forest;
const sand = colorRamps.sand;
const brick = colorRamps.brick;
const lime = colorRamps.lime;

// ============================================================================
// Section catalog — sidebar nav AND section headers, grouped like the
// canonical Design Guidelines doc (Foundations / Components / Modes / Reference).
// ============================================================================

interface SectionDef {
  id: string;
  title: string;
  group: string;
  wip?: boolean;
}

const GROUPS = ['Foundations', 'Components', 'Modes', 'Reference'] as const;

const SECTIONS: SectionDef[] = [
  { id: 'palette', title: 'Color Palette', group: 'Foundations' },
  { id: 'text', title: 'Text Colors', group: 'Foundations' },
  { id: 'borders', title: 'Borders', group: 'Foundations' },
  { id: 'radius', title: 'Radius', group: 'Foundations' },
  { id: 'typography', title: 'Typography', group: 'Foundations' },
  { id: 'spacing', title: 'Spacing', group: 'Foundations' },
  { id: 'layout', title: 'Layout', group: 'Foundations' },
  { id: 'elevation', title: 'Elevation', group: 'Foundations' },
  { id: 'motion', title: 'Motion', group: 'Foundations' },
  { id: 'inputs', title: 'Inputs & States', group: 'Components' },
  { id: 'buttons', title: 'Buttons', group: 'Components' },
  { id: 'cards', title: 'Cards', group: 'Components' },
  { id: 'library', title: 'Component Library', group: 'Components' },
  { id: 'feedback', title: 'Feedback', group: 'Components' },
  { id: 'forms', title: 'Form Patterns', group: 'Components' },
  { id: 'dark', title: 'Dark Mode', group: 'Modes' },
  { id: 'tokens', title: 'Tokens', group: 'Reference' },
];

function sectionNum(id: string): string {
  return String(SECTIONS.findIndex(s => s.id === id) + 1).padStart(2, '0');
}

const NAV_IDS = ['overview', ...SECTIONS.map(s => s.id)];

// ============================================================================
// Guideline-layout primitives — kicker, lede, subhead, tables, notes
// ============================================================================

function Section({ def, lede, children }: { def: SectionDef; lede: React.ReactNode; children: React.ReactNode }) {
  return (
    <Box id={def.id} as="section" mb="76px" scrollMarginTop="24px">
      <Text fontSize="12px" fontWeight={600} letterSpacing="0.1em" textTransform="uppercase" color="fg.placeholder" mb="14px">
        {sectionNum(def.id)} · {def.group}
      </Text>
      <Heading as="h2" fontSize="30px" fontWeight={500} letterSpacing="-0.01em" color="fg" mb="2">
        {def.title}
        {def.wip && (
          <Box
            as="span"
            display="inline-block"
            fontSize="11px"
            fontWeight={700}
            letterSpacing="0.06em"
            verticalAlign="7px"
            px="2"
            py="0.5"
            ml="2.5"
            rounded="sm"
            bg="citron.200"
            color="citron.800"
          >
            WIP
          </Box>
        )}
      </Heading>
      <Text color="fg.subtle" fontSize="15.5px" maxW="760px" mb="26px" lineHeight="1.55">
        {lede}
      </Text>
      {children}
    </Box>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="h3"
      fontSize="12px"
      fontWeight={600}
      letterSpacing="0.07em"
      textTransform="uppercase"
      color="fg.muted"
      mt="8"
      mb="4"
      pb="9px"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      {children}
    </Text>
  );
}

function Mono({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <Text as="span" fontFamily="mono" fontSize="12px" color={strong ? 'fg' : 'fg.muted'} fontWeight={strong ? 600 : 400} whiteSpace="nowrap">
      {children}
    </Text>
  );
}

function Sw({ hex }: { hex: string }) {
  return (
    <Box
      as="span"
      display="inline-block"
      w="15px"
      h="15px"
      rounded="base"
      bg={hex}
      borderWidth="1px"
      borderColor="blackAlpha.200"
      verticalAlign="-3px"
      mr="2"
    />
  );
}

function GTable({ head, rows, maxW = '860px' }: { head: React.ReactNode[]; rows: React.ReactNode[][]; maxW?: string }) {
  return (
    <Box overflowX="auto">
      <Box as="table" w="full" maxW={maxW} fontSize="13.5px" css={{ borderCollapse: 'collapse' }}>
        <Box as="thead">
          <Box as="tr">
            {head.map((h, i) => (
              <Box
                key={i}
                as="th"
                textAlign="left"
                fontWeight={600}
                color="fg.subtle"
                fontSize="10.5px"
                letterSpacing="0.05em"
                textTransform="uppercase"
                px="13px"
                pb="10px"
                borderBottomWidth="1px"
                borderColor="border.subtle"
              >
                {h}
              </Box>
            ))}
          </Box>
        </Box>
        <Box as="tbody">
          {rows.map((row, ri) => (
            <Box as="tr" key={ri}>
              {row.map((cell, ci) => (
                <Box key={ci} as="td" px="13px" py="3" borderBottomWidth="1px" borderColor="border.subtle" verticalAlign="middle" color="fg.body">
                  {cell}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="#F9FAF9" borderWidth="1px" borderColor="border.subtle" rounded="card" px="6" py="5" fontSize="13.8px" color="fg.body" maxW="820px" mt="22px" lineHeight="1.6">
      {children}
    </Box>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="forest.50" borderLeftWidth="3px" borderLeftColor="forest.500" roundedRight="lg" px="5" py="4" fontSize="14px" color="forest.700" maxW="820px" my="18px" lineHeight="1.6">
      {children}
    </Box>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return (
    <Text as="span" fontWeight={600} color="fg">
      {children}
    </Text>
  );
}

// ============================================================================
// Sidebar
// ============================================================================

function Sidebar({ activeId }: { activeId: string }) {
  const linkStyles = (active: boolean) => ({
    px: '10px',
    py: '2',
    rounded: 'lg',
    fontSize: '13.5px',
    fontWeight: active ? 600 : 500,
    color: active ? 'fg' : 'fg.muted',
    bg: active ? 'nav.hoverBg' : 'transparent',
    _hover: { bg: 'nav.hoverBg', color: 'fg' },
    display: 'flex',
    alignItems: 'center',
    gap: '1.5',
  });

  return (
    <Box
      as="aside"
      w="236px"
      flexShrink={0}
      position="sticky"
      top="0"
      h="100vh"
      borderRightWidth="1px"
      borderColor="border.subtle"
      bg="bg"
      px="22px"
      py="8"
      display={{ base: 'none', md: 'flex' }}
      flexDir="column"
      overflowY="auto"
    >
      <Box>
        <Text fontSize="19px" fontWeight={600} letterSpacing="-0.01em" color="fg" lineHeight="1.2">
          Brillian
        </Text>
        <Text fontSize="12px" fontWeight={500} color="fg.placeholder" letterSpacing="0.02em" mt="3px">
          Design Guidelines
        </Text>
      </Box>

      <Stack gap="0.5" mt="7" flex="1">
        <Box as="a" {...({ href: '#overview' } as object)} {...linkStyles(activeId === 'overview')}>
          Overview
        </Box>
        {GROUPS.map(group => (
          <Box key={group}>
            <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.07em" textTransform="uppercase" color="fg.placeholder" mt="4" mb="1" px="10px">
              {group}
            </Text>
            <Stack gap="0.5">
              {SECTIONS.filter(s => s.group === group).map(s => (
                <Box as="a" key={s.id} {...({ href: `#${s.id}` } as object)} {...linkStyles(activeId === s.id)}>
                  {s.title}
                  {s.wip && (
                    <Box as="span" fontSize="9px" fontWeight={700} letterSpacing="0.04em" bg="citron.200" color="citron.800" px="1" rounded="sm">
                      WIP
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box mt="6" pt="4" borderTopWidth="1px" borderColor="border.subtle">
        <Stack gap="2">
          <Text fontSize="11px" fontWeight={600} letterSpacing="0.06em" textTransform="uppercase" color="fg.subtle">
            Reference docs
          </Text>
          <Box
            as="a"
            {...({ href: '/design-guidelines.html', target: '_blank' } as object)}
            display="flex"
            alignItems="center"
            gap="2"
            fontSize="13px"
            fontWeight={500}
            color="fg.muted"
            _hover={{ color: 'fg' }}
          >
            <BookOpen size={14} />
            Guidelines (static)
          </Box>
          <Box
            as="a"
            {...({ href: '/token-reference.html', target: '_blank' } as object)}
            display="flex"
            alignItems="center"
            gap="2"
            fontSize="13px"
            fontWeight={500}
            color="fg.muted"
            _hover={{ color: 'fg' }}
          >
            <FileCode size={14} />
            Token reference
          </Box>
        </Stack>
        <Box
          as="a"
          {...({ href: '/' } as object)}
          display="flex"
          alignItems="center"
          gap="2"
          fontSize="13px"
          fontWeight={500}
          color="fg.muted"
          _hover={{ color: 'fg' }}
          mt="4"
          pt="4"
          borderTopWidth="1px"
          borderColor="border.subtle"
        >
          <ArrowLeft size={14} />
          Back to prototype
        </Box>
      </Box>
    </Box>
  );
}

// ============================================================================
// Overview (hero)
// ============================================================================

function Overview() {
  return (
    <Box id="overview" as="section" mb="76px" scrollMarginTop="24px">
      <Text fontSize="12px" fontWeight={600} letterSpacing="0.1em" textTransform="uppercase" color="fg.placeholder" mb="14px">
        Brillian Design System
      </Text>
      <Heading as="h1" fontSize={{ base: '34px', md: '44px' }} fontWeight={500} letterSpacing="-0.02em" color="fg">
        Design Guidelines
      </Heading>
      <Text color="fg.subtle" fontSize="15.5px" maxW="760px" mt="14px" lineHeight="1.55">
        One system for color across text, surfaces, and components — light and dark. The core idea:
        a neutral Ink ramp carries all text and borders, while the six brand families stay reserved
        for fills, surfaces, accents, and status. This keeps the cool Forest and warm Sand from
        clashing when they meet as type. This page is live — every swatch and spec reads from{' '}
        <Mono strong>src/theme/tokens.ts</Mono>, and every demo renders the real prototype components.
      </Text>
      <Rule>
        <B>The one rule.</B> Pull text and borders only from Ink. Use Forest / Sand / Brick / Coral /
        Citron / Lime for fills, surfaces, and accents — never for body text. Status uses Forest
        (success), Brick (error), and lightened steps in dark mode.
      </Rule>
    </Box>
  );
}

// ============================================================================
// 01 · Color Palette
// ============================================================================

function isDarkHex(hex: string): boolean {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.55;
}

const INK_ROLES: Record<string, string> = {
  '50': 'inverse',
  '100': 'border-subtle',
  '200': 'inv-secondary · border-default',
  '300': 'inv-subtle · border-dark',
  '400': 'placeholder · border-strong',
  '500': 'subtle · helper',
  '600': 'secondary · label',
  '700': 'border-on-dark',
  '800': 'body',
  '900': 'primary · value',
};

function RampGridRow({ name, ramp, roles }: { name: string; ramp: Record<string, string>; roles?: Record<string, string> }) {
  return (
    <Flex mb="2px" flexDir={{ base: 'column', lg: 'row' }}>
      <Flex w={{ base: 'auto', lg: '74px' }} flexShrink={0} align="center" fontSize="15px" color="fg" pb={{ base: '1', lg: '0' }} textTransform="capitalize">
        {name}
      </Flex>
      <SimpleGrid columns={{ base: 5, lg: 10 }} flex="1">
        {Object.entries(ramp).map(([step, hex]) => {
          const light = !isDarkHex(hex);
          return (
            <Flex key={step} bg={hex} px="3" pt="3" pb="14px" minH="92px" flexDir="column" color={light ? ink[900] : ink[50]}>
              <Text fontSize="12px" mb="auto">
                {step}
              </Text>
              <Text fontSize="11px" fontFamily="mono">
                {hex}
              </Text>
              {roles?.[step] && (
                <Text fontSize="9px" fontWeight={600} mt="1" opacity={0.8} lineHeight="1.25">
                  {roles[step]}
                </Text>
              )}
            </Flex>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
}

function PaletteSection() {
  const def = SECTIONS.find(s => s.id === 'palette')!;
  const brandRamps = (['forest', 'sand', 'brick', 'coral', 'citron', 'lime'] as const).map(k => [k, colorRamps[k]] as const);
  return (
    <Section def={def} lede="Seven families, 50–900. Ink is the neutral text ramp — a desaturated Forest — added as the seventh row. Semantic role is noted in each Ink cell.">
      <Box>
        {brandRamps.map(([name, ramp]) => (
          <RampGridRow key={name} name={name} ramp={ramp as Record<string, string>} />
        ))}
        <Box mt="22px" pt="22px" borderTopWidth="2px" borderColor="border.subtle">
          <RampGridRow name="ink" ramp={ink as unknown as Record<string, string>} roles={INK_ROLES} />
        </Box>
      </Box>

      <SubHead>Status usage</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" maxW="760px" mb="4" lineHeight="1.6">
        The four status primitives, health-scale ordered (healthiest first). Each gets a{' '}
        <Mono strong>tint / base / text</Mono> triplet — the tint (family 100) for backgrounds, the
        text (family 800) for text on those tints. Always used together, never mixed across status
        types. Inverse metrics (e.g. Inventory Days) reverse the scale direction.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="3">
        {Object.values(semanticColors.status).map(s => {
          const ramp = colorRamps[s.ramp] as Record<number, string>;
          return (
            <Card key={s.label} variant="outline" p="4">
              <Text fontSize="14px" fontWeight={600} color="fg" mb="1">
                {s.label}
              </Text>
              <Text fontSize="11px" color="fg.muted" mb="3" lineHeight="1.4">
                {s.use}
              </Text>
              <Box mb="4">
                <Badge rounded="pill" px="3" py="1" fontSize="11px" fontWeight={500} bg={ramp[s.tint.step]} color={ramp[s.text.step]} borderWidth="0">
                  {s.label}
                </Badge>
              </Box>
              <Stack gap="1.5">
                {[s.tint, s.base, s.text].map(t => (
                  <Flex key={t.name} align="center" gap="2">
                    <Box boxSize="14px" rounded="base" bg={ramp[t.step]} borderWidth="1px" borderColor="border.subtle" flexShrink={0} />
                    <Text fontFamily="mono" fontSize="11px" color="fg.muted">
                      {t.name}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
      <Note>
        <B>Accent.</B> Lime is the accent family — highlights and CTAs on dark surfaces.{' '}
        <Mono strong>accent.solid</Mono> ({lime[300]}) takes dark text only, never white.
      </Note>
    </Section>
  );
}

// ============================================================================
// 02 · Text Colors
// ============================================================================

function PreviewPanel({ bg, title }: { bg: string; title: string }) {
  return (
    <Box px="7" py="6" rounded="card" borderWidth="1px" borderColor="border.subtle" bg={bg}>
      <Text fontSize="21px" fontWeight={600} color={ink[900]} mb="1.5">
        {title}
      </Text>
      <Text fontSize="15px" color={ink[800]} mb="1.5">
        Body sits a hair lighter than the heading, softening long-form reading while keeping the same hue.
      </Text>
      <Text fontSize="13px" color={ink[500]}>
        Subtle caption — metadata.
      </Text>
    </Box>
  );
}

function TextSection() {
  const def = SECTIONS.find(s => s.id === 'text')!;
  return (
    <Section def={def} lede="All text is drawn from Ink, one hue temperature across every step so headers, body, and supporting text always harmonize on both cool and warm surfaces.">
      <SubHead>On light surfaces</SubHead>
      <GTable
        head={['Token', 'Use for', 'Hex', 'Contrast']}
        rows={[
          [<Mono strong>text/primary</Mono>, <Text as="span" color="fg.subtle">Headings, high-emphasis</Text>, <><Sw hex={ink[900]} /><Mono>Ink 900 · {ink[900]}</Mono></>, <Badge intent="success" rounded="sm">16.8 · AAA</Badge>],
          [<Mono strong>text/body</Mono>, <Text as="span" color="fg.subtle">Body copy, default</Text>, <><Sw hex={ink[800]} /><Mono>Ink 800 · {ink[800]}</Mono></>, <Badge intent="success" rounded="sm">11.8 · AAA</Badge>],
          [<Mono strong>text/secondary</Mono>, <Text as="span" color="fg.subtle">Subheads, labels</Text>, <><Sw hex={ink[600]} /><Mono>Ink 600 · {ink[600]}</Mono></>, <Badge intent="success" rounded="sm">7.6 · AAA</Badge>],
          [<Mono strong>text/subtle</Mono>, <Text as="span" color="fg.subtle">Captions, metadata, helper</Text>, <><Sw hex={ink[500]} /><Mono>Ink 500 · {ink[500]}</Mono></>, <Badge intent="neutral" rounded="sm">5.6 · AA</Badge>],
          [<Mono strong>text/disabled</Mono>, <Text as="span" color="fg.subtle">Disabled, placeholder</Text>, <><Sw hex={ink[400]} /><Mono>Ink 400 · {ink[400]}</Mono></>, <Text as="span" color="fg.subtle" fontSize="12px">non-text</Text>],
        ]}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" mt="6">
        <PreviewPanel bg="white" title="Primary on white" />
        <PreviewPanel bg={sand[50]} title="Primary on Sand 50" />
      </SimpleGrid>

      <SubHead>Links</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" maxW="760px" mb="4" lineHeight="1.6">
        The one deliberate exception to the one rule: color signals interactivity, so links carry
        Forest. Three variants on the <Mono strong>Link</Mono> recipe — pick by context, never
        restyle inline.
      </Text>
      <Stack gap="4" maxW="760px" mb="5">
        <Box>
          <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.placeholder" mb="1.5">
            Inline — inside body copy
          </Text>
          <Text fontSize="sm" color="fg.body" lineHeight="1.6">
            Your valuation range updated after we imported the latest financials.{' '}
            <ChakraLink variant="inline" {...({ href: '#text' } as object)}>
              See what changed
            </ChakraLink>{' '}
            or review the assumptions behind it.
          </Text>
        </Box>
        <Box>
          <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.placeholder" mb="1.5">
            Standalone — card actions, view-all, breadcrumbs
          </Text>
          <Flex gap="5">
            <ChakraLink variant="standalone" fontSize="sm" {...({ href: '#text' } as object)}>
              View all documents
            </ChakraLink>
            <ChakraLink variant="standalone" fontSize="sm" {...({ href: '#text' } as object)}>
              Edit assumptions
            </ChakraLink>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.placeholder" mb="1.5">
            Subtle — footers, metadata, tertiary nav
          </Text>
          <Flex gap="5">
            <ChakraLink variant="subtle" fontSize="xs" {...({ href: '#text' } as object)}>
              Privacy policy
            </ChakraLink>
            <ChakraLink variant="subtle" fontSize="xs" {...({ href: '#text' } as object)}>
              Terms of service
            </ChakraLink>
          </Flex>
        </Box>
      </Stack>
      <Box overflowX="auto" mb="5">
        <Box display="grid" gridTemplateColumns="112px repeat(3, 1fr)" gap="16px 18px" alignItems="center" minW="560px" maxW="760px">
          <Box />
          {['Rest', 'Hover', 'Focus'].map(c => (
            <Text key={c} fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.placeholder" textAlign="center">
              {c}
            </Text>
          ))}
          {((
            [
            {
              label: 'Inline',
              states: [
                { color: forest[600], deco: 'underline', decoColor: forest[600] },
                { color: forest[700], deco: 'underline', decoColor: forest[700] },
                { color: forest[800], deco: 'underline', decoColor: forest[800] },
              ],
            },
            {
              label: 'Standalone',
              states: [
                { color: forest[600], deco: 'none', decoColor: forest[600] },
                { color: forest[700], deco: 'underline', decoColor: forest[700] },
                { color: forest[800], deco: 'underline', decoColor: forest[800] },
              ],
            },
            {
              label: 'Subtle',
              states: [
                { color: ink[600], deco: 'none', decoColor: ink[600] },
                { color: forest[700], deco: 'underline', decoColor: forest[700] },
                { color: forest[800], deco: 'underline', decoColor: forest[800] },
              ],
            },
            ] as Array<{ label: string; states: Array<{ color: string; deco: string; decoColor: string }> }>
          )).flatMap(row => [
            <Text key={row.label} fontSize="14px" fontWeight={600} color="fg">
              {row.label}
            </Text>,
            ...row.states.map((s, i) => (
              <Flex key={`${row.label}-${i}`} justify="center">
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight={500}
                  color={s.color}
                  css={{ textDecorationLine: s.deco, textDecorationColor: s.decoColor, textUnderlineOffset: '2px' }}
                >
                  See what changed
                </Text>
              </Flex>
            )),
          ])}
        </Box>
      </Box>
      <GTable
        head={['Variant', 'Rest', 'Underline at rest', 'Hover', 'Use for']}
        rows={[
          [<Mono strong>inline</Mono>, <><Sw hex={forest[600]} /><Mono>Forest 600 · 500</Mono></>, <Mono>Forest 600</Mono>, <Mono>Forest 700</Mono>, <Text as="span" color="fg.subtle">Links inside sentences — underline so color isn't the only cue</Text>],
          [<Mono strong>standalone</Mono>, <><Sw hex={forest[600]} /><Mono>Forest 600 · 500</Mono></>, <Mono>none</Mono>, <Mono>Forest 700 + underline</Mono>, <Text as="span" color="fg.subtle">Self-evident links: view-all, card actions, breadcrumbs</Text>],
          [<Mono strong>subtle</Mono>, <><Sw hex={ink[600]} /><Mono>Ink 600 · 500</Mono></>, <Mono>none</Mono>, <Mono>Forest 700 + underline</Mono>, <Text as="span" color="fg.subtle">Footers, metadata, tertiary nav — quiet until touched</Text>],
        ]}
      />
      <Note>
        <B>Rules.</B> Links are Manrope 500 at the size of their surrounding text — never bold, never
        a different size. Inline links must keep their resting underline (color alone fails the
        non-color-cue bar); standalone and subtle links earn theirs on hover. Focus is ring-free,
        matching buttons: keyboard focus deepens one step past hover (Forest 800) with a full
        underline. On dark surfaces links lighten to Forest 300, same rules otherwise. Never use
        Lime for text links, and never underline non-interactive text.
      </Note>

      <SubHead>Inverse (on dark)</SubHead>
      <GTable
        head={['Token', 'Hex', 'Contrast on Forest 800–900']}
        rows={[
          [<Mono strong>inverse-primary</Mono>, <><Sw hex={ink[50]} /><Mono>Ink 50 · {ink[50]}</Mono></>, <Badge intent="success" rounded="sm">14–17 · AAA</Badge>],
          [<Mono strong>inverse-secondary</Mono>, <><Sw hex={ink[200]} /><Mono>Ink 200 · {ink[200]}</Mono></>, <Badge intent="success" rounded="sm">10–12 · AAA</Badge>],
          [<Mono strong>inverse-subtle</Mono>, <><Sw hex={ink[300]} /><Mono>Ink 300 · {ink[300]}</Mono></>, <Badge intent="neutral" rounded="sm">6–8 · AA</Badge>],
        ]}
      />
    </Section>
  );
}

// ============================================================================
// 03 · Borders
// ============================================================================

function BordersSection() {
  const def = SECTIONS.find(s => s.id === 'borders')!;
  return (
    <Section def={def} lede="Borders are neutrals too — from the light end of Ink. Decorative edges can be featherweight; borders that signal state must clear 3:1.">
      <GTable
        head={['Token', 'Use for', 'Hex', 'On white']}
        rows={[
          [<Mono strong>border/subtle</Mono>, <Text as="span" color="fg.subtle">Hairlines, dividers, row separators</Text>, <><Sw hex={ink[100]} /><Mono>Ink 100 · {ink[100]}</Mono></>, <Text as="span" fontSize="12px" color="fg.subtle">1.1 · decorative</Text>],
          [<Mono strong>border/default</Mono>, <Text as="span" color="fg.subtle">Card edges, containers, inputs at rest</Text>, <><Sw hex={ink[200]} /><Mono>Ink 200 · {ink[200]}</Mono></>, <Text as="span" fontSize="12px" color="fg.subtle">1.5 · decorative</Text>],
          [<Mono strong>border/strong</Mono>, <Text as="span" color="fg.subtle">State-bearing edges, hover, dividers on tint</Text>, <><Sw hex={ink[400]} /><Mono>Ink 400 · {ink[400]}</Mono></>, <Badge intent="success" rounded="sm">3.6 · UI ✓</Badge>],
          [<Mono strong>border/on-dark</Mono>, <Text as="span" color="fg.subtle">Borders on Forest surfaces</Text>, <><Sw hex={ink[700]} /><Mono>Ink 700 · {ink[700]}</Mono></>, <Text as="span" fontSize="12px" color="fg.subtle">dark only</Text>],
        ]}
      />
      <Note>
        <B>Rule of thumb.</B> Decorative borders can be featherweight (Ink 100–200); any border that
        conveys state — an input outline, a selected edge — must be Ink 400+ to clear the 3:1
        non-text bar. Focus rings are the exception: they use Forest, not gray.
      </Note>
    </Section>
  );
}

// ============================================================================
// 04 · Radius
// ============================================================================

function RadiusSection() {
  const def = SECTIONS.find(s => s.id === 'radius')!;
  const chips: Array<{ label: string; r: string }> = [
    { label: `control · ${radii.base}`, r: 'control' },
    { label: `card · ${radii.lg}`, r: 'card' },
    { label: 'pill · full', r: 'pill' },
  ];
  return (
    <Section def={def} lede="Radii ride the same 4px base grid as spacing. Two tokens do almost all the work — controls at 4px, cards at 8px — and both map directly onto Chakra's built-in base and lg steps.">
      <Flex gap="4" flexWrap="wrap" mb="6">
        {chips.map(c => (
          <Flex key={c.r} align="center" justify="center" w="180px" h="72px" bg="forest.50" borderWidth="1px" borderColor="forest.300" rounded={c.r} fontSize="13px" fontWeight={600} color="forest.700">
            {c.label}
          </Flex>
        ))}
      </Flex>
      <GTable
        head={['Token', 'Chakra step', 'Value', 'Use for']}
        rows={[
          [<Mono strong>radius/control</Mono>, <Mono>base</Mono>, <Mono>{radii.base}</Mono>, <Text as="span" color="fg.subtle">Buttons, inputs, selects, checkboxes, chips</Text>],
          [<Mono strong>radius/card</Mono>, <Mono>lg</Mono>, <Mono>{radii.lg}</Mono>, <Text as="span" color="fg.subtle">Cards, panels, modals, popovers, menus</Text>],
          [<Mono strong>radius/pill</Mono>, <Mono>full</Mono>, <Mono>9999px</Mono>, <Text as="span" color="fg.subtle">Tags, badges, avatars, toggles</Text>],
        ]}
      />
      <SubHead>Full primitive scale</SubHead>
      <Flex gap="3" flexWrap="wrap">
        {(Object.entries(radii) as Array<[string, string]>).map(([key, value]) => (
          <Stack key={key} gap="1.5" align="center" w="88px">
            <Box bg="forest.100" borderWidth="1px" borderColor="forest.300" boxSize="56px" rounded={key} />
            <Mono>{key}</Mono>
            <Text fontFamily="mono" fontSize="11px" color="fg.subtle">
              {value}
            </Text>
          </Stack>
        ))}
      </Flex>
      <Note>
        <B>Chakra setup.</B> Chakra's default radii already includes 4px (<Mono strong>base</Mono>) and
        8px (<Mono strong>lg</Mono>) — the theme just overrides component defaults to point at the
        right step, plus semantic aliases <Mono strong>control / card / pill</Mono> in{' '}
        <Mono strong>src/theme/system.ts</Mono>.
      </Note>
    </Section>
  );
}

// ============================================================================
// 05 · Typography
// ============================================================================

function TypographySection() {
  const def = SECTIONS.find(s => s.id === 'typography')!;
  const samples: Array<{ token: keyof typeof fontSizes; label: string; weight: number }> = [
    { token: '4xl', label: 'Display', weight: 500 },
    { token: '3xl', label: 'Heading 1', weight: 500 },
    { token: '2xl', label: 'Heading 2', weight: 500 },
    { token: 'xl', label: 'Heading 3', weight: 500 },
    { token: 'lg', label: 'Card title', weight: 500 },
    { token: 'md', label: 'Section header', weight: 500 },
    { token: 'sm', label: 'Body', weight: 400 },
    { token: 'xs', label: 'Caption', weight: 500 },
    { token: '2xs', label: 'Fine print', weight: 500 },
  ];

  return (
    <Section def={def} lede="Manrope across all surfaces. Body text uses two weights — 500 medium for emphasis, 400 regular for copy — and headings stay in medium, never bold. 600 semibold is reserved for small functional text only: button labels, field labels, and eyebrows.">
      <Stack gap="3" maxW="860px">
        {samples.map(s => (
          <Flex key={s.token} align="baseline" gap="6" pb="3" borderBottomWidth="1px" borderColor="border.subtle" _last={{ borderBottomWidth: 0 }}>
            <Box w={{ base: '80px', md: '120px' }} flexShrink={0}>
              <Text fontFamily="mono" fontSize="xs" color="fg.subtle">
                {s.token}
              </Text>
              <Text fontFamily="mono" fontSize="xs" color="fg.subtle">
                {fontSizes[s.token]} · {s.weight}
              </Text>
            </Box>
            <Text
              fontSize={fontSizes[s.token]}
              fontWeight={s.weight}
              color="fg"
              lineHeight="1.2"
              letterSpacing={s.weight === 600 && s.token === 'xs' ? '0.6px' : undefined}
              textTransform={s.weight === 600 && s.token === 'xs' ? 'uppercase' : undefined}
            >
              {s.label}
            </Text>
          </Flex>
        ))}
      </Stack>
      <Note>
        <B>Naming follows Chakra.</B> Step names are identical to Chakra's own scale — xs 12 through
        xl 20 match Chakra's defaults exactly; only the display steps are raised (2xl 26, 3xl 32,
        4xl 40 vs Chakra's 24/30/36). Never re-map a Chakra step name to a different pixel value —
        Chakra components reference these names internally. Two component-level sizes are
        deliberately NOT steps: <B>13px</B> field & button labels and <B>11px</B> eyebrows — pin
        those explicitly in the recipe or component.
      </Note>
      <SubHead>Mono</SubHead>
      <Text fontFamily="mono" fontSize="xs" color="fg.muted">
        {fonts.mono}
      </Text>
    </Section>
  );
}

// ============================================================================
// 06 · Spacing
// ============================================================================

function SpacingSection() {
  const def = SECTIONS.find(s => s.id === 'spacing')!;
  return (
    <Section def={def} lede="Built on a 4px grid. Use Chakra's numeric scale (e.g. p='4' for 16px). Anything outside the scale is a smell — push back or add a token.">
      <Stack gap="2">
        {Object.entries(spacing).map(([key, value]) => (
          <Flex key={key} align="center" gap="4">
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle" w="36px">
              {key}
            </Text>
            <Text fontFamily="mono" fontSize="xs" color="fg" w="48px">
              {value}
            </Text>
            <Box bg="brand.solid" h="12px" w={value} rounded="base" />
          </Flex>
        ))}
      </Stack>
    </Section>
  );
}

// ============================================================================
// 07 · Layout
// ============================================================================

function ShellBlock({ label, w, bg, children }: { label?: string; w?: string; bg?: string; children?: React.ReactNode }) {
  return (
    <Flex
      w={w}
      flexShrink={0}
      align="center"
      justify="center"
      bg={bg ?? 'forest.50'}
      borderWidth="1px"
      borderColor="forest.200"
      fontSize="11px"
      fontWeight={600}
      color="forest.700"
      textAlign="center"
      lineHeight="1.3"
      p="1"
    >
      {label ?? children}
    </Flex>
  );
}

function LayoutSection() {
  const def = SECTIONS.find(s => s.id === 'layout')!;
  return (
    <Section def={def} lede="Layout is built entirely from Chakra's primitives on their default breakpoints — no custom grid system. Structure comes from flex and grid with gap; spacing between siblings is never margin. Fixed chrome (rail, panel, topbar) has exact widths; content is fluid inside a max-width container.">
      <SubHead>App shell anatomy</SubHead>
      <Flex h="180px" mb="4" maxW="860px" borderWidth="1px" borderColor="border.subtle" rounded="card" overflow="hidden">
        <ShellBlock label="Rail 72" w="40px" bg="forest.100" />
        <ShellBlock w="90px">
          Panel 220
          <br />
          (advisor)
        </ShellBlock>
        <Flex flex="1" flexDir="column">
          <ShellBlock label="Topbar 60" w="full" bg="forest.100" />
          <Flex flex="1" align="center" justify="center" bg="bg.dim" fontSize="11px" fontWeight={600} color="fg.subtle">
            Content — fluid, px 16→32
          </Flex>
        </Flex>
      </Flex>
      <GTable
        head={['Region', 'Token', 'Value', 'Behavior']}
        rows={[
          [<B>Outer rail</B>, <Mono strong>shell.rail</Mono>, <Mono>{layoutSizes.shell.rail}</Mono>, <Text as="span" color="fg.subtle">Sticky full-height; owner view's only nav. Mobile: becomes a fixed bottom bar.</Text>],
          [<B>Inner panel</B>, <Mono strong>shell.panel</Mono>, <Mono>{layoutSizes.shell.panel}</Mono>, <Text as="span" color="fg.subtle">Advisor view only. Sticky full-height; mobile: a drawer from the topbar hamburger.</Text>],
          [<B>Topbar</B>, <Mono strong>shell.header</Mono>, <Mono>{layoutSizes.shell.header}</Mono>, <Text as="span" color="fg.subtle">One shared band height — the rail logo band and panel header align to it.</Text>],
          [<B>Content</B>, <Mono>—</Mono>, <Mono>fluid</Mono>, <Text as="span" color="fg.subtle">Scrolls as the page; chrome stays put. One scroll container — never nested page scrolls.</Text>],
        ]}
      />

      <SubHead>Breakpoints</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" maxW="760px" mb="4" lineHeight="1.6">
        Chakra's default breakpoints, unchanged. Write mobile-first (<Mono strong>base</Mono>) and
        step up. In practice two matter: <Mono strong>md</Mono> is THE mobile / desktop switch
        (chrome collapses, columns stack below it), and <Mono strong>xl</Mono> widens dense grids.
        Avoid sm and lg unless a layout genuinely breaks between the standard steps.
      </Text>
      <GTable
        head={['Token', 'Min width', 'Role here']}
        rows={[
          [<Mono strong>base</Mono>, <Mono>0</Mono>, <Text as="span" color="fg.subtle">Mobile defaults — single column, bottom-bar nav</Text>],
          [<Mono strong>sm</Mono>, <Mono>480px</Mono>, <Text as="span" color="fg.subtle">Rarely used — only for tightening small-phone edge cases</Text>],
          [<Mono strong>md</Mono>, <Mono>768px</Mono>, <Text as="span" color="fg.subtle">The switch: side nav appears, grids go 2-col, px 16 → 32</Text>],
          [<Mono strong>lg</Mono>, <Mono>992px</Mono>, <Text as="span" color="fg.subtle">Rarely used</Text>],
          [<Mono strong>xl</Mono>, <Mono>1280px</Mono>, <Text as="span" color="fg.subtle">Dense grids widen (2 → 4/5 col), side-by-side form + aside</Text>],
        ]}
      />

      <SubHead>Page container</SubHead>
      <GTable
        head={['Page type', 'Padding', 'Max-width token', 'Value']}
        rows={[
          [<B>Standard page</B>, <Mono>px 4 → md:8 · py 6</Mono>, <Mono>—</Mono>, <Mono>fluid</Mono>],
          [<B>Detail page (tabs + cards)</B>, <Mono>px 4 → md:8 · py 6</Mono>, <Mono strong>container.detail</Mono>, <Mono>{layoutSizes.container.detail}</Mono>],
          [<B>Focused flow (onboarding page)</B>, <Mono>px 4 → md:8 · py 6</Mono>, <Mono strong>container.flow</Mono>, <Mono>{layoutSizes.container.flow}</Mono>],
          [<B>Dialog</B>, <Mono>p 6</Mono>, <Mono strong>container.dialog</Mono>, <Mono>{layoutSizes.container.dialog}</Mono>],
          [<B>Prose / notes</B>, <Mono>—</Mono>, <Mono strong>container.prose</Mono>, <Mono>{layoutSizes.container.prose}</Mono>],
        ]}
      />

      <SubHead>Primitives — reach in this order</SubHead>
      <GTable
        head={['Component', 'Use for', 'Not for']}
        rows={[
          [<Mono strong>Stack</Mono>, <Text as="span" color="fg.subtle">Vertical rhythm — any list of siblings with one gap</Text>, <Text as="span" color="fg.subtle">Anything needing alignment control</Text>],
          [<Mono strong>Flex / HStack</Mono>, <Text as="span" color="fg.subtle">Rows: toolbars, header + action, label + value</Text>, <Text as="span" color="fg.subtle">Equal-width column layouts</Text>],
          [<Mono strong>SimpleGrid</Mono>, <Text as="span" color="fg.subtle">Equal columns that respond: field grids, card grids, stat tiles</Text>, <Text as="span" color="fg.subtle">Irregular spans</Text>],
          [<Mono strong>Grid</Mono>, <Text as="span" color="fg.subtle">Irregular tracks (the buttons state matrix, 2fr/1fr splits)</Text>, <Text as="span" color="fg.subtle">Anything SimpleGrid can express</Text>],
          [<Mono strong>Box</Mono>, <Text as="span" color="fg.subtle">A single element that needs styling — the fallback, not the default</Text>, <Text as="span" color="fg.subtle">Faking rows/columns with margins</Text>],
        ]}
      />

      <SubHead>Gap rhythm</SubHead>
      <GTable
        head={['Gap', 'Value', 'Between']}
        rows={[
          [<Mono strong>gap 2</Mono>, <Mono>8px</Mono>, <Text as="span" color="fg.subtle">Icon + label, chips in a row, label → field</Text>],
          [<Mono strong>gap 3</Mono>, <Mono>12px</Mono>, <Text as="span" color="fg.subtle">Content inside a card body; dense tile grids</Text>],
          [<Mono strong>gap 4</Mono>, <Mono>16px</Mono>, <Text as="span" color="fg.subtle">The workhorse: field grids, card grids, header / divider / body</Text>],
          [<Mono strong>gap 6</Mono>, <Mono>24px</Mono>, <Text as="span" color="fg.subtle">Major page regions; form column ↔ aside</Text>],
        ]}
      />

      <Note>
        <B>Rules.</B> Spacing between siblings comes from the parent's <Mono strong>gap</Mono> —
        never from margins on children, so components stay drop-in reusable. Multi-column layouts
        collapse to one column below <Mono strong>md</Mono> (form + aside pairs may hold until{' '}
        <Mono strong>xl</Mono>). The page is the only scroll container; chrome is sticky, and
        pinned-bottom items (Settings, co-brand) use <Mono strong>mt="auto"</Mono> inside the sticky
        column. Don't invent widths — chrome and container dimensions are size tokens (
        <Mono strong>w="shell.rail"</Mono>, <Mono strong>maxW="container.detail"</Mono>), everything
        else is fluid on the 4px grid.
      </Note>
    </Section>
  );
}

function ElevationSection() {
  const def = SECTIONS.find(s => s.id === 'elevation')!;
  return (
    <Section def={def} lede="Four primitive shadows plus two semantic aliases: shadow/elevated (= sm, the card default) and shadow/raised (= lg, for overlays, popovers, menus). The focus ring is a forest-tinted spread.">
      <SimpleGrid columns={{ base: 1, md: 4 }} gap="6">
        {Object.entries(shadows).map(([name, value]) => (
          <Box key={name}>
            <Box bg="bg" h="120px" rounded="card" shadow={name as keyof typeof shadows} mb="3" borderWidth={name === 'xs' ? '1px' : 0} borderColor="border.subtle" />
            <Mono strong>shadow.{name}</Mono>
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle" lineHeight="1.4" wordBreak="break-all" mt="1">
              {value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}

// ============================================================================
// 08 · Motion
// ============================================================================

function MotionSection() {
  const def = SECTIONS.find(s => s.id === 'motion')!;
  return (
    <Section def={def} lede="Durations and easings are tokenized; named keyframes are reused across the app. Prefer the standard easing curve — fast linear motion belongs only to spinners.">
      <SubHead>Durations & easings</SubHead>
      <GTable
        head={['Token', 'Value']}
        rows={[
          ...Object.entries(motion.durations).map(([k, v]) => [<Mono strong>duration.{k}</Mono>, <Mono>{v}</Mono>]),
          ...Object.entries(motion.easings).map(([k, v]) => [<Mono strong>easing.{k}</Mono>, <Text as="span" fontFamily="mono" fontSize="12px" color="fg.muted" wordBreak="break-all">{v}</Text>]),
        ]}
      />
      <SubHead>Keyframes</SubHead>
      <GTable
        head={['Name', 'Purpose', 'Duration', 'Easing']}
        rows={motion.keyframes.map(k => [
          <Mono strong>@keyframes {k.name}</Mono>,
          <Text as="span" color="fg.subtle">{k.summary}</Text>,
          <Mono>{k.duration}</Mono>,
          <Mono>{k.easing}</Mono>,
        ])}
      />
    </Section>
  );
}

// ============================================================================
// 09 · Inputs & States
// ============================================================================

interface FieldState {
  tag: string;
  label: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  help: string;
  helpColor: string;
  labelColor: string;
  borderColor: string;
  borderW?: string;
  bg: string;
  ring?: string;
  valueColor?: string;
}

function FieldDemo({ s }: { s: FieldState }) {
  return (
    <Stack gap="7px">
      <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.placeholder">
        {s.tag}
      </Text>
      <Text fontSize="13px" fontWeight={600} color={s.labelColor}>
        {s.label}
        {s.required && (
          <Text as="span" color={brick[500]}>
            {' '}
            *
          </Text>
        )}
      </Text>
      <Flex
        align="center"
        h="40px"
        px="13px"
        rounded="control"
        borderWidth={s.borderW ?? '1px'}
        borderColor={s.borderColor}
        bg={s.bg}
        fontSize="15px"
        color={s.value ? (s.valueColor ?? ink[900]) : ink[400]}
        boxShadow={s.ring}
      >
        {s.value ?? s.placeholder}
      </Flex>
      <Text fontSize="12.5px" color={s.helpColor}>
        {s.help}
      </Text>
    </Stack>
  );
}

function InputsSection() {
  const def = SECTIONS.find(s => s.id === 'inputs')!;
  const focusRing = shadows.focus;
  const states: FieldState[] = [
    { tag: 'Rest / empty', label: 'Email address', placeholder: 'you@company.com', help: "We'll never share it.", helpColor: ink[500], labelColor: ink[600], borderColor: ink[200], bg: 'white' },
    { tag: 'Hover', label: 'Email address', placeholder: 'you@company.com', help: 'Border darkens to signal interactivity.', helpColor: ink[500], labelColor: ink[600], borderColor: ink[400], bg: 'white' },
    { tag: 'Focus', label: 'Email address', value: 'tanya@brillian.co', help: 'Forest border + ring; label shifts to Forest.', helpColor: ink[500], labelColor: forest[700], borderColor: forest[600], bg: 'white', ring: focusRing },
    { tag: 'Filled', label: 'Email address', value: 'tanya@brillian.co', help: 'Value in Ink 900; resting border returns.', helpColor: ink[500], labelColor: ink[600], borderColor: ink[200], bg: 'white' },
    { tag: 'Error', label: 'Email address', required: true, value: 'tanya@brillian', help: 'Enter a valid email address.', helpColor: brick[700], labelColor: ink[600], borderColor: brick[500], bg: 'white' },
    { tag: 'Success', label: 'Email address', value: 'tanya@brillian.co', help: 'Looks good.', helpColor: forest[700], labelColor: ink[600], borderColor: forest[500], bg: 'white' },
    { tag: 'Disabled', label: 'Email address', placeholder: 'you@company.com', help: 'Not editable right now.', helpColor: ink[300], labelColor: ink[300], borderColor: ink[200], bg: ink[50], valueColor: ink[300] },
    { tag: 'Read-only', label: 'Email address', value: 'tanya@brillian.co', help: 'Quiet fill + hairline — the ink fill marks it as not editable.', helpColor: ink[500], labelColor: ink[600], borderColor: ink[200], bg: ink[50] },
  ];
  return (
    <Section def={def} lede="Two independent tracks: text (label, value, placeholder, helper, message) from Ink, and the container (border, fill) that carries state — Forest for focus, Brick for error, Forest for success.">
      <SubHead>Anatomy & states</SubHead>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="26px 36px" maxW="860px">
        {states.map(s => (
          <FieldDemo key={s.tag} s={s} />
        ))}
      </SimpleGrid>

      <SubHead>Live component</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" maxW="760px" mb="4" lineHeight="1.6">
        The real Chakra input, select, and textarea recipes — 40px tall, <Mono strong>radii.control</Mono>{' '}
        corners, 1px <Mono strong>input.borderRest</Mono> border. Tab into a field to see the live
        focus treatment.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" maxW="860px">
        <Input placeholder="Default state" />
        <Input placeholder="Disabled" disabled />
        <NativeSelect.Root>
          <NativeSelect.Field defaultValue="">
            <option value="" disabled>
              Select option
            </option>
            <option>One</option>
            <option>Two</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </SimpleGrid>

      <SubHead>Text roles & container by state</SubHead>
      <GTable
        head={['State', 'Border', 'Background', 'Label', 'Message']}
        rows={[
          [<B>Rest</B>, <><Sw hex={ink[200]} /><Mono>Ink 200</Mono></>, <Mono>#FFFFFF</Mono>, <Mono>Ink 600</Mono>, <Mono>Ink 500</Mono>],
          [<B>Hover</B>, <><Sw hex={ink[400]} /><Mono>Ink 400</Mono></>, <Mono>#FFFFFF</Mono>, <Mono>Ink 600</Mono>, <Mono>Ink 500</Mono>],
          [<B>Focus</B>, <><Sw hex={forest[600]} /><Mono>Forest 600 + ring</Mono></>, <Mono>#FFFFFF</Mono>, <Mono>Forest 700</Mono>, <Mono>Ink 500</Mono>],
          [<B>Error</B>, <><Sw hex={brick[500]} /><Mono>Brick 500</Mono></>, <Mono>#FFFFFF / Brick 50</Mono>, <Mono>Ink 600</Mono>, <Mono>Brick 700</Mono>],
          [<B>Success</B>, <><Sw hex={forest[500]} /><Mono>Forest 500</Mono></>, <Mono>#FFFFFF</Mono>, <Mono>Ink 600</Mono>, <Mono>Forest 700</Mono>],
          [<B>Disabled</B>, <><Sw hex={ink[200]} /><Mono>Ink 200</Mono></>, <Mono>Ink 50</Mono>, <Mono>Ink 300</Mono>, <Mono>Ink 300</Mono>],
        ]}
      />
      <Note>
        <B>Accessibility call.</B> The resting border (Ink 200, 1.5:1) is a soft edge that leans on
        the label and fill to define the field — fine for labeled forms. If an input must be
        perceivable by border alone (placeholder-only), bump the resting border to Ink 400 (3.6:1).
        Hover (Ink 400), focus, error, and success all clear 3:1.
      </Note>
    </Section>
  );
}

// ============================================================================
// 10 · Buttons (WIP)
// ============================================================================

interface BtnStyle {
  bg: string;
  color: string;
  border?: string;
  borderW?: string;
  opacity?: number;
}

function DemoBtn({ s, children }: { s: BtnStyle; children: React.ReactNode }) {
  return (
    <Flex
      as="span"
      display="inline-flex"
      align="center"
      justify="center"
      fontSize="13px"
      fontWeight={600}
      px="4"
      h="control"
      rounded="control"
      borderWidth={s.borderW ?? '1px'}
      borderColor={s.border ?? 'transparent'}
      bg={s.bg}
      color={s.color}
      opacity={s.opacity}
      lineHeight="1"
      whiteSpace="nowrap"
    >
      {children}
    </Flex>
  );
}

function ButtonsSection() {
  const def = SECTIONS.find(s => s.id === 'buttons')!;
  // State values read straight off the button recipe in src/theme/system.ts.
  const tiers: Array<{ label: string; text: string; states: [BtnStyle, BtnStyle, BtnStyle, BtnStyle] }> = [
    {
      label: 'Primary',
      text: 'Save changes',
      states: [
        { bg: forest[600], color: ink[50] },
        { bg: forest[700], color: ink[50] },
        { bg: forest[800], color: ink[50] },
        { bg: forest[600], color: ink[50], opacity: 0.4 },
      ],
    },
    {
      label: 'Accent',
      text: 'Get started',
      states: [
        { bg: lime[300], color: ink[900] },
        { bg: lime[400], color: ink[900] },
        { bg: lime[500], color: ink[900] },
        { bg: lime[300], color: ink[900], opacity: 0.4 },
      ],
    },
    {
      label: 'Secondary',
      text: 'Save changes',
      states: [
        { bg: 'white', color: ink[600], border: ink[200], borderW: '1px' },
        { bg: sand[100], color: ink[600], border: ink[200], borderW: '1px' },
        { bg: sand[200], color: ink[600], border: ink[200], borderW: '1px' },
        { bg: 'white', color: ink[400], border: ink[100], borderW: '1px' },
      ],
    },
    {
      label: 'Ghost',
      text: 'Save changes',
      states: [
        { bg: 'transparent', color: forest[600] },
        { bg: forest[50], color: forest[600] },
        { bg: forest[100], color: forest[600] },
        { bg: 'transparent', color: ink[400] },
      ],
    },
    {
      label: 'Destructive',
      text: 'Delete',
      states: [
        { bg: brick[600], color: ink[50] },
        { bg: brick[700], color: ink[50] },
        { bg: brick[800], color: ink[50] },
        { bg: brick[600], color: ink[50], opacity: 0.4 },
      ],
    },
  ];

  return (
    <Section def={def} lede="Five intents on one recipe. Fills carry the brand; states move by darkening the fill one step at a time, never by changing hue. Focus is ring-free and shares the pressed (deepest) step, matching links. Accent is the lime CTA — dark text only. Disabled fades the resting state rather than going gray.">
      <SubHead>Live recipe</SubHead>
      <Flex gap="3" flexWrap="wrap" align="center" mb="2">
        <Button intent="primary">Primary action</Button>
        <Button intent="accent">Accent CTA</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="ghost">Ghost</Button>
        <Button intent="destructive">Destructive</Button>
        <Button intent="primary" disabled>
          Disabled
        </Button>
      </Flex>
      <Text fontSize="12px" color="fg.subtle" mb="4">
        Rendered from the real Chakra recipe — hover, press, and tab through these to see the live states.
      </Text>

      <SubHead>State matrix</SubHead>
      <Box overflowX="auto">
        <Box display="grid" gridTemplateColumns="112px repeat(4, 1fr)" gap="16px 18px" alignItems="center" minW="640px" maxW="860px">
          <Box />
          {['Rest', 'Hover', 'Pressed / Focus', 'Disabled'].map(c => (
            <Text key={c} fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.placeholder" textAlign="center">
              {c}
            </Text>
          ))}
          {tiers.flatMap(tier => [
            <Text key={tier.label} fontSize="14px" fontWeight={600} color="fg">
              {tier.label}
            </Text>,
            ...tier.states.map((s, i) => (
              <Flex key={`${tier.label}-${i}`} justify="center">
                <DemoBtn s={s}>{tier.text}</DemoBtn>
              </Flex>
            )),
          ])}
        </Box>
      </Box>

      <SubHead>Spec</SubHead>
      <GTable
        head={['Intent', 'Rest', 'Label', 'Hover → Pressed', 'Use for']}
        rows={[
          [<Mono strong>primary</Mono>, <><Sw hex={forest[600]} /><Mono>Forest 600</Mono></>, <Mono>Ink 50</Mono>, <Mono>Forest 700 → 800</Mono>, <Text as="span" color="fg.subtle">The page's main action — one per view</Text>],
          [<Mono strong>accent</Mono>, <><Sw hex={lime[300]} /><Mono>Lime 300</Mono></>, <Mono>Ink 900</Mono>, <Mono>Lime 400 → 500</Mono>, <Text as="span" color="fg.subtle">High-energy CTAs — onboarding, marketing moments</Text>],
          [<Mono strong>secondary</Mono>, <><Sw hex="#FFFFFF" /><Mono>white + Ink 200 border</Mono></>, <Mono>Ink 600</Mono>, <Mono>Sand 100 → 200</Mono>, <Text as="span" color="fg.subtle">Supporting actions, card-header buttons</Text>],
          [<Mono strong>ghost</Mono>, <Mono>transparent</Mono>, <Mono>Forest 600</Mono>, <Mono>Forest 50 → 100</Mono>, <Text as="span" color="fg.subtle">Low-emphasis and icon actions, nav</Text>],
          [<Mono strong>destructive</Mono>, <><Sw hex={brick[600]} /><Mono>Brick 600</Mono></>, <Mono>Ink 50</Mono>, <Mono>Brick 700 → 800</Mono>, <Text as="span" color="fg.subtle">Irreversible actions — delete, remove, revoke</Text>],
        ]}
      />
      <Note>
        <B>Focus — no ring.</B> Keyboard focus shares the pressed (deepest) fill — an accepted
        tradeoff for a ring-free look; the shift is well over 3:1 from rest, so focus stays clearly
        visible. Use the <Mono strong>intent</Mono> prop, never inline colors. This recipe supersedes
        the five-tier exploration in the static reference doc. On dark, primary inverts to a light
        fill (Forest 400 + Ink 900) — see Dark Mode.
      </Note>
    </Section>
  );
}

// ============================================================================
// 11 · Cards
// ============================================================================

function CardDemo({ variant }: { variant?: 'elevated' | 'raised' | 'outline' | 'filled' }) {
  return (
    <Card variant={variant} display="flex" flexDir="column" gap="4">
      <CardHeader
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        action={
          <Button intent="secondary" size="sm" h="9">
            Button
          </Button>
        }
      />
      <CardDivider />
      <Box>
        <Text fontSize="md" fontWeight={500} color="fg" mb="3">
          Optional section header
        </Text>
        <Text fontSize="13px" fontWeight={500} color="fg" mb="1.5">
          Email Address
        </Text>
        <Input placeholder="Email address" />
      </Box>
    </Card>
  );
}

function CardsSection() {
  const def = SECTIONS.find(s => s.id === 'cards')!;
  return (
    <Section def={def} lede="The primary container in the app. A card is a padded, rounded surface that can hold a header (title, description, and an action area), a divider, and a body of content. Every element is optional except the container itself — compose only the parts you need. Radius is always 8px; controls inside keep their own 4px.">
      <SubHead>Anatomy</SubHead>
      <Box maxW="480px">
        <CardDemo />
      </Box>
      <Note>
        <B>Header</B> — CardHeader: title (Manrope Medium 18, text/primary) + description (Manrope
        Medium 14, text/secondary), 4px apart, with an optional right-aligned action area (buttons,
        links, badges, timestamps). <B>Divider</B> — 1px border/subtle, full width; omit for
        header-only cards. <B>Body</B> — optional section header (Medium 16) plus content, stacked
        12px apart. <B>Container</B> — white surface, 8px radius, padding by size, 16px gap between
        header / divider / body.
      </Note>

      <SubHead>Variants</SubHead>
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" bg="bg.dim" p="6" rounded="card" mb="5">
        {(['elevated', 'raised', 'outline', 'filled'] as const).map(v => (
          <Box key={v}>
            <CardDemo variant={v} />
            <Text mt="2" fontFamily="mono" fontSize="12px" color="fg.subtle" textAlign="center">
              {v}
              {v === 'elevated' && ' · default'}
              {v === 'filled' && ' · “muted”'}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <GTable
        head={['Variant', 'Surface', 'Border', 'Shadow', 'Use for']}
        rows={[
          [<Mono strong>elevated</Mono>, <Mono>white</Mono>, <Mono>none</Mono>, <Mono>shadow/sm</Mono>, <Text as="span" color="fg.subtle">The everyday card. Standalone cards on a tinted canvas.</Text>],
          [<Mono strong>raised</Mono>, <Mono>white</Mono>, <Mono>none</Mono>, <Mono>shadow/lg</Mono>, <Text as="span" color="fg.subtle">Genuinely lifted — overlays, popovers, menus, emphasized or dragged cards.</Text>],
          [<Mono strong>outline</Mono>, <Mono>white</Mono>, <Mono>1px border/subtle</Mono>, <Mono>none</Mono>, <Text as="span" color="fg.subtle">Cards on white pages, dense layouts.</Text>],
          [<Mono strong>filled</Mono>, <Mono>bg-canvas</Mono>, <Mono>none</Mono>, <Mono>none</Mono>, <Text as="span" color="fg.subtle">Secondary / supporting cards, quiet grouping, cards nested in cards.</Text>],
        ]}
      />

      <SubHead>Padding sizes</SubHead>
      <GTable
        head={['Size', 'Chakra prop', 'Padding', 'Spacing token']}
        rows={[
          [<B>small</B>, <Mono strong>size="sm"</Mono>, <Mono>16px</Mono>, <Mono>Spacing/4</Mono>],
          [<B>medium</B>, <Mono strong>size="md" (default)</Mono>, <Mono>20px</Mono>, <Mono>Spacing/5</Mono>],
          [<B>large</B>, <Mono strong>size="lg"</Mono>, <Mono>32px</Mono>, <Mono>Spacing/8</Mono>],
        ]}
      />

      <SubHead>Internal spacing</SubHead>
      <GTable
        head={['Gap', 'Value', 'Token']}
        rows={[
          [<Text as="span" color="fg.subtle">Header / divider / body</Text>, <Mono>16px</Mono>, <Mono>Spacing/4 · container gap</Mono>],
          [<Text as="span" color="fg.subtle">Title → description</Text>, <Mono>4px</Mono>, <Mono>Spacing/1</Mono>],
          [<Text as="span" color="fg.subtle">Body content stack</Text>, <Mono>12px</Mono>, <Mono>Spacing/3</Mono>],
          [<Text as="span" color="fg.subtle">Input label → field</Text>, <Mono>8px</Mono>, <Mono>Spacing/2</Mono>],
        ]}
      />

      <Note>
        <B>Handoff rules.</B> Only the container is required — compose what the use case needs. Keep
        the header-action area to a single logical group, top-right aligned; buttons there default to
        the subtle variant so they don't compete with the page's primary action. Use{' '}
        <Mono strong>size</Mono> for padding — never hardcode it. Card radius stays at 8px, inner
        controls at 4px; don't unify them. <Mono strong>elevated</Mono> is the default; reach for{' '}
        <Mono strong>raised</Mono> only when a card genuinely floats. Never nest an elevated card
        inside another elevated card (shadow soup) — a card inside a card is always{' '}
        <Mono strong>filled</Mono> (muted), e.g. the owner panels on Company Details. All card text
        is left-aligned. The recipe lives in{' '}
        <Mono strong>src/components/ui/Card.tsx</Mono>.
      </Note>
    </Section>
  );
}

// ============================================================================
// 12 · Component Library — the living app components
// ============================================================================

function TabNavDemo() {
  const [active, setActive] = useState('ownership');
  return (
    <TabNav
      tabs={[
        { id: 'ownership', label: 'Ownership' },
        { id: 'business', label: 'Business Overview' },
        { id: 'financial', label: 'Financial Performance' },
      ]}
      activeId={active}
      onSelect={setActive}
    />
  );
}

function LibrarySection() {
  const def = SECTIONS.find(s => s.id === 'library')!;
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  return (
    <Section def={def} lede="The real prototype components, rendered live from the Chakra recipes. If something looks wrong here, it's wrong everywhere — fix it at the recipe and watch this page update.">
      <SubHead>Badges</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" mb="3" maxW="760px" lineHeight="1.6">
        All badges share the pill silhouette and tint + dark text pattern. Use the{' '}
        <Mono strong>intent</Mono> prop to pick a semantic variant — never style badge colors inline.
      </Text>
      <Flex gap="2" flexWrap="wrap">
        {(['danger', 'warning', 'moderate', 'success', 'brand', 'accent', 'neutral'] as const).map(i => (
          <Badge key={i} intent={i}>
            {i}
          </Badge>
        ))}
      </Flex>

      <SubHead>Tabs</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" mb="3" maxW="760px" lineHeight="1.6">
        In-page section switcher (see Company Details). Active tab is a filled brand pill; the row
        scrolls horizontally when it overflows on small screens.
      </Text>
      <TabNavDemo />

      <SubHead>Display field</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" mb="3" maxW="760px" lineHeight="1.6">
        Read-only counterpart to an input for detail views — pairs with EditableSection, which swaps
        these for live inputs behind an Edit / Save / Cancel header.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" maxW="800px">
        <DisplayField label="Owner Type" value="Natural person" />
        <DisplayField label="Ownership %" value="10.0%" />
        <DisplayField label="Website (optional)" value="" />
      </SimpleGrid>

      <SubHead>Avatar</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" mb="4" maxW="760px" lineHeight="1.6">
        Initials chip used for company logos, user avatars, and client markers. Square by default;
        pass <Mono strong>shape="circle"</Mono> for people. Five sizes from xs (20px) to xl (56px).
      </Text>
      <Flex gap="4" align="end" flexWrap="wrap" mb="5">
        {sizes.map(s => (
          <Stack key={s} gap="2" align="center">
            <Avatar size={s} label="A" color="forest.500" />
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle">
              {s}
            </Text>
          </Stack>
        ))}
      </Flex>
      <Flex gap="3" flexWrap="wrap">
        <Avatar label="A" color="forest.500" />
        <Avatar label="B" color="forest.400" />
        <Avatar label="C" color="citron.600" />
        <Avatar label="D" color="brick.500" />
        <Avatar label="E" color="coral.500" />
        <Avatar label="JR" color="forest.800" shape="circle" />
      </Flex>

      <SubHead>Stat tile</SubHead>
      <Text fontSize="13.5px" color="fg.subtle" mb="4" maxW="760px" lineHeight="1.6">
        Labeled KPI card. Two sizes — default (28px value) for headline metrics and{' '}
        <Mono strong>size="sm"</Mono> (22px) for dense dashboards.
      </Text>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="3" mb="4">
        <StatTile label="Portfolio value" value="$26.8M" sublabel="across active clients" />
        <StatTile label="Total clients" value="8" sublabel="2 added this month" />
        <StatTile label="Open actions" value="34" sublabel="across all clients" />
        <StatTile label="At risk" value="1" sublabel="needs attention" />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
        <StatTile size="sm" label="Total" value="142" sublabel="all docs" />
        <StatTile size="sm" label="Pending" value="6" sublabel="awaiting review" />
        <StatTile size="sm" label="Shared" value="18" sublabel="last 7 days" />
        <StatTile size="sm" label="Templates" value="9" sublabel="internal" />
      </SimpleGrid>
    </Section>
  );
}

// ============================================================================
// 13 · Feedback
// ============================================================================

function FeedbackSection() {
  const def = SECTIONS.find(s => s.id === 'feedback')!;
  const intents: Array<'danger' | 'warning' | 'moderate' | 'success' | 'brand' | 'neutral'> = [
    'danger',
    'warning',
    'moderate',
    'success',
    'brand',
    'neutral',
  ];
  return (
    <Section def={def} lede="Alerts and inline notices share the intent palette (health-scale statuses + brand + neutral) so every system message reads consistently. Each alert pairs a 3px left-border with the matching tint background and dark text.">
      <Stack gap="3" maxW="860px">
        {intents.map(i => (
          <Alert
            key={i}
            intent={i}
            title={`${i.charAt(0).toUpperCase()}${i.slice(1)} alert`}
            body="Short supporting detail explaining what just happened or what to do next."
          />
        ))}
        <Alert
          intent="brand"
          title="Connect QuickBooks to unlock benchmarks"
          body="We'll import your last 3 years of P&L and tighten the valuation range automatically."
          action={
            <Button intent="primary" size="sm">
              Connect
            </Button>
          }
        />
      </Stack>
    </Section>
  );
}

// ============================================================================
// 14 · Form Patterns
// ============================================================================

function FormsSection() {
  const def = SECTIONS.find(s => s.id === 'forms')!;
  return (
    <Section def={def} lede="Question + help text, inline radios, form cards, and the DidYouKnow sidebar are the building blocks of every onboarding step.">
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" alignItems="start">
        <FormCard>
          <Question
            title="What share of your revenue is recurring?"
            help="Recurring revenue is more valuable because it is predictable."
          >
            <Input placeholder="0 %" type="number" min={0} max={100} />
          </Question>
          <Question
            title="Are there any related entities, affiliates, or subsidiaries?"
            help="If you have multiple companies that do business with each other, we surface those relationships separately."
          >
            <InlineRadio name="related" options={yesNoOptions} />
          </Question>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <FormField label="First Name">
              <Input placeholder="First" />
            </FormField>
            <FormField label="Last Name">
              <Input placeholder="Last" />
            </FormField>
          </SimpleGrid>
        </FormCard>

        <DidYouKnow
          Icon={Lightbulb}
          headline="Add-backs are where reported profit becomes real profit."
          summary="Normalizing owner perks and one-off expenses can lift reported earnings 10–30% for owner-operated businesses — which directly moves valuation."
          expandedContent={
            <>
              <Text>
                This sidebar pattern uses the DidYouKnow component. It supports an icon, headline,
                summary, and optional expanded content.
              </Text>
              <Source>Mercer Capital — Normalization Adjustments Guide</Source>
            </>
          }
        />
      </SimpleGrid>
    </Section>
  );
}

// ============================================================================
// 15 · Dark Mode
// ============================================================================

function DarkFieldDemo({ tag, label, value, placeholder, help, helpColor, borderColor, ring, required, valueColor }: {
  tag: string;
  label: string;
  value?: string;
  placeholder?: string;
  help: string;
  helpColor: string;
  borderColor: string;
  ring?: string;
  required?: boolean;
  valueColor?: string;
}) {
  return (
    <Stack gap="7px">
      <Text fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color={ink[300]}>
        {tag}
      </Text>
      <Text fontSize="13px" fontWeight={600} color={ink[200]}>
        {label}
        {required && (
          <Text as="span" color={brick[300]}>
            {' '}
            *
          </Text>
        )}
      </Text>
      <Flex
        align="center"
        h="40px"
        px="13px"
        rounded="control"
        borderWidth="1px"
        borderColor={borderColor}
        bg={forest[800]}
        fontSize="15px"
        color={value ? (valueColor ?? ink[50]) : ink[300]}
        boxShadow={ring}
      >
        {value ?? placeholder}
      </Flex>
      <Text fontSize="12.5px" color={helpColor}>
        {help}
      </Text>
    </Stack>
  );
}

function DarkSection() {
  const def = SECTIONS.find(s => s.id === 'dark')!;
  const hairline = 'rgba(255,255,255,.1)';
  const darkTh = { textAlign: 'left' as const, fontWeight: 600, color: ink[300], fontSize: '10.5px', letterSpacing: '0.05em', textTransform: 'uppercase' as const, px: '13px', pb: '10px', borderBottomWidth: '1px', borderColor: hairline };
  const darkTd = { px: '13px', py: '3', borderBottomWidth: '1px', borderColor: hairline, color: ink[200], fontSize: '13.5px' };
  const shiftRows: Array<[string, string, string, string]> = [
    ['Focus border', 'Forest 600', 'Forest 400', 'dark forest vanishes on a dark field'],
    ['Error', 'Brick 500 / 700', 'Brick 400 / 300', 'lighten to read on dark'],
    ['Success', 'Forest 500 / 700', 'Forest 400 / Lime 300', 'lighten; Lime pops for the message'],
    ['Primary button', 'Forest 600 + Ink 50', 'Forest 400 + Ink 900', 'inverts: light fill, dark label'],
    ['Input border', 'Ink 200', 'Ink 700', 'field reads by fill, not border'],
  ];

  return (
    <Section def={def} lede="Dark surfaces come from the deep end of Forest, not black. The governing rule: brand and status colors lighten — every 500–700 accent shifts to a 300–400 step, or it vanishes into the background.">
      <Box bg={forest[900]} rounded="18px" px={{ base: '6', md: '11' }} py={{ base: '8', md: '11' }} color={ink[50]}>
        <Text as="h3" fontSize="12px" fontWeight={600} letterSpacing="0.07em" textTransform="uppercase" color={ink[200]} mb="4" pb="9px" borderBottomWidth="1px" borderColor={hairline}>
          Surface stack
        </Text>
        <Flex gap="3.5" flexWrap="wrap">
          {[
            { n: 'Base', hex: forest[900] },
            { n: 'Raised — cards, inputs', hex: forest[800] },
            { n: 'Overlay — menus, hovers', hex: forest[700] },
          ].map(s => (
            <Box key={s.n} rounded="card" px="5" py="5" minW="180px" bg={s.hex} borderWidth="1px" borderColor={hairline}>
              <Text fontSize="13.5px" fontWeight={600}>
                {s.n}
              </Text>
              <Text fontFamily="mono" fontSize="11.5px" color={ink[300]} mt="3px">
                {s.hex}
              </Text>
            </Box>
          ))}
        </Flex>

        <Text as="h3" fontSize="12px" fontWeight={600} letterSpacing="0.07em" textTransform="uppercase" color={ink[200]} mt="8" mb="4" pb="9px" borderBottomWidth="1px" borderColor={hairline}>
          Text on dark
        </Text>
        <Box bg={forest[800]} borderWidth="1px" borderColor={hairline} rounded="card" px="6" py="5" maxW="620px">
          <Text fontSize="19px" fontWeight={600} color={ink[50]}>
            Primary text — Ink 50 (17:1)
          </Text>
          <Text fontSize="14.5px" color={ink[200]} mt="7px">
            Secondary uses Ink 200 for labels and supporting copy (12:1).
          </Text>
          <Text fontSize="12.5px" color={ink[300]} mt="7px">
            Subtle — Ink 300 — for captions (7.7:1).
          </Text>
        </Box>

        <Text as="h3" fontSize="12px" fontWeight={600} letterSpacing="0.07em" textTransform="uppercase" color={ink[200]} mt="8" mb="4" pb="9px" borderBottomWidth="1px" borderColor={hairline}>
          Inputs on dark
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="26px 36px" maxW="820px">
          <DarkFieldDemo tag="Rest" label="Email address" placeholder="you@company.com" help="Identified by its raised fill." helpColor={ink[300]} borderColor={ink[700]} />
          <DarkFieldDemo tag="Focus" label="Email address" value="tanya@brillian.co" help="Forest 400 border + ring." helpColor={ink[300]} borderColor={forest[400]} ring="0 0 0 3px rgba(111,161,145,.4)" />
          <DarkFieldDemo tag="Error" label="Email address" required value="tanya@brillian" help="Enter a valid email address." helpColor={brick[300]} borderColor={brick[400]} />
          <DarkFieldDemo tag="Success" label="Email address" value="tanya@brillian.co" help="Looks good." helpColor={lime[300]} borderColor={forest[400]} />
        </SimpleGrid>

        <Text as="h3" fontSize="12px" fontWeight={600} letterSpacing="0.07em" textTransform="uppercase" color={ink[200]} mt="8" mb="4" pb="9px" borderBottomWidth="1px" borderColor={hairline}>
          Buttons on dark
        </Text>
        <Flex gap="3.5" flexWrap="wrap" align="center">
          <DemoBtn s={{ bg: forest[400], color: ink[900] }}>Save changes</DemoBtn>
          <DemoBtn s={{ bg: 'transparent', color: ink[50], border: forest[400] }}>Secondary</DemoBtn>
          <DemoBtn s={{ bg: 'transparent', color: forest[300] }}>Tertiary</DemoBtn>
        </Flex>

        <Text as="h3" fontSize="12px" fontWeight={600} letterSpacing="0.07em" textTransform="uppercase" color={ink[200]} mt="8" mb="4" pb="9px" borderBottomWidth="1px" borderColor={hairline}>
          What shifts, light → dark
        </Text>
        <Box overflowX="auto">
          <Box as="table" w="full" maxW="820px" css={{ borderCollapse: 'collapse' }}>
            <Box as="thead">
              <Box as="tr">
                {['Role', 'Light', 'Dark', 'Why'].map(h => (
                  <Box key={h} as="th" {...darkTh}>
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {shiftRows.map(([role, light, dark, why]) => (
                <Box as="tr" key={role}>
                  <Box as="td" {...darkTd} fontWeight={600} color={ink[50]}>
                    {role}
                  </Box>
                  <Box as="td" {...darkTd} fontFamily="mono" fontSize="12px">
                    {light}
                  </Box>
                  <Box as="td" {...darkTd} fontFamily="mono" fontSize="12px">
                    {dark}
                  </Box>
                  <Box as="td" {...darkTd} color={ink[300]}>
                    {why}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Section>
  );
}

// ============================================================================
// 16 · Tokens
// ============================================================================

function TokensSection() {
  const def = SECTIONS.find(s => s.id === 'tokens')!;
  return (
    <Section def={def} lede="The whole system is 71 primitives (7 ramps × 10 steps + white) with semantic tokens on top. Components reference semantic tokens, semantic tokens reference primitives — so retuning any step updates everything downstream without touching component code.">
      <GTable
        head={['Group', 'Examples']}
        rows={[
          [<Mono strong>primitives</Mono>, <Mono>forest.500 … ink.900 (7 families × 10) + white</Mono>],
          [<Mono strong>surface / brand</Mono>, <Mono>bg (white), bg.dim (sand-50), brand.solid (forest-600)</Mono>],
          [<Mono strong>text</Mono>, <Mono>fg, fg.body, fg.muted, fg.subtle, fg.placeholder, fg.error…</Mono>],
          [<Mono strong>border</Mono>, <Mono>border.subtle, border, border.strong, border.onDark</Mono>],
          [<Mono strong>input</Mono>, <Mono>input.borderRest / -Hover / -Focus / -Error / -Success…</Mono>],
          [<Mono strong>status</Mono>, <Mono>status.success / moderate / warning / danger · tint / base / text</Mono>],
          [<Mono strong>nav</Mono>, <Mono>nav.hoverBg (forest-50), nav.activeBg (forest-100), nav.activeFg</Mono>],
          [<Mono strong>radius</Mono>, <Mono>radii.control (4px), radii.card (8px), radii.pill (full)</Mono>],
          [<Mono strong>shadow</Mono>, <Mono>xs, sm (elevated), md, lg (raised), focus</Mono>],
        ]}
      />
      <Note>
        <B>Implementation.</B> Primitive and semantic values live in{' '}
        <Mono strong>src/theme/tokens.ts</Mono>; the Chakra wiring (recipes, semantic tokens, component
        defaults) lives in <Mono strong>src/theme/system.ts</Mono>. Edit tokens.ts and this page —
        plus the whole app — updates together.
      </Note>
    </Section>
  );
}

// ============================================================================
// Page
// ============================================================================

function useActiveSection() {
  const [active, setActive] = useState<string>('overview');
  useEffect(() => {
    const handle = () => {
      // Pick the section whose top is closest to (but past) the viewport top.
      const offsets = NAV_IDS.map(id => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Number.POSITIVE_INFINITY };
        return { id, top: el.getBoundingClientRect().top };
      });
      const past = offsets.filter(o => o.top <= 80);
      const next = past.length ? past[past.length - 1]! : offsets[0]!;
      setActive(next.id);
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  return active;
}

export default function StyleGuide() {
  const active = useActiveSection();
  return (
    <Flex flex="1" w="full" minH="100vh" bg="bg">
      <Sidebar activeId={active} />
      <Box flex="1" minW="0" px={{ base: '5', md: '16' }} pt={{ base: '10', md: '14' }} pb="120px" maxW="1120px">
        <Overview />
        <PaletteSection />
        <TextSection />
        <BordersSection />
        <RadiusSection />
        <TypographySection />
        <SpacingSection />
        <LayoutSection />
        <ElevationSection />
        <MotionSection />
        <InputsSection />
        <ButtonsSection />
        <CardsSection />
        <LibrarySection />
        <FeedbackSection />
        <FormsSection />
        <DarkSection />
        <TokensSection />
        <Text fontSize="xs" color="fg.subtle" fontFamily="mono" textAlign="center" pt="4">
          End of guide · edit src/theme/tokens.ts to extend
        </Text>
      </Box>
    </Flex>
  );
}
