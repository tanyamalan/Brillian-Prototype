import { useEffect, useState } from 'react';
import { Badge, Box, Button, Flex, Heading, Input, NativeSelect, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
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
  motion,
  radii,
  semanticColors,
  shadows,
  spacing,
} from '../../theme/tokens';
import type { ColorRampKey } from '../../theme/tokens';

// ============================================================================
// Section catalog — single source for the sidebar nav AND the section headers.
// ============================================================================

interface SectionDef {
  id: string;
  title: string;
  description: string;
}

const SECTIONS: SectionDef[] = [
  { id: 'colors', title: 'Color', description: 'Two layers: raw ramps for designers picking values, and semantic tokens for engineers writing components. Always reach for semantics first — they survive rebrands.' },
  { id: 'typography', title: 'Typography', description: 'Manrope across all surfaces. Two weights — 500 medium for emphasis, 400 regular for body. Headings stay in medium, never bold or semibold.' },
  { id: 'spacing', title: 'Spacing', description: "Built on a 4px grid. Use Chakra's numeric scale (e.g. p='4' for 16px). Anything outside the scale is a smell — push back or add a token." },
  { id: 'radii', title: 'Border radius', description: 'Eight primitive radii plus three semantic aliases: radii.control (4px) for buttons, inputs, selects, and chips; radii.card (8px) for cards, panels, and modals; radii.pill for tags, avatars, and toggles. Components reference the aliases, never the primitives.' },
  { id: 'shadows', title: 'Elevation', description: 'Four primitive shadows plus two semantic aliases: shadow.elevated (the card default) and shadow.raised (overlays, popovers, menus). The focus ring is a forest-tinted spread.' },
  { id: 'motion', title: 'Motion', description: 'Durations and easings are tokenized; named keyframes are reused across the app. Prefer the standard easing curve — fast linear motion belongs only to spinners.' },
  { id: 'components', title: 'Components', description: "These render the real prototype components. If something looks wrong here, it's wrong everywhere — fix it at the recipe and watch this page update." },
  { id: 'data', title: 'Data display', description: 'Stat tiles and avatars — the small atoms that surface identity and metrics across dashboards and list pages.' },
  { id: 'feedback', title: 'Feedback', description: 'Alerts and inline notices share the intent palette (health-scale statuses + brand + neutral) so every system message reads consistently.' },
  { id: 'forms', title: 'Form patterns', description: 'Question + help text, inline radios, form cards, and the DidYouKnow sidebar are the building blocks of every onboarding step.' },
];

// ============================================================================
// Layout primitives
// ============================================================================

function Sidebar({ activeId }: { activeId: string }) {
  return (
    <Box
      as="aside"
      w="220px"
      flexShrink={0}
      position="sticky"
      top="0"
      h="100vh"
      borderRightWidth="1px"
      borderColor="border"
      bg="bg"
      px="4"
      py="6"
      display={{ base: 'none', md: 'flex' }}
      flexDir="column"
      overflowY="auto"
    >
      <Stack gap="0.5" mb="6">
        <Text fontFamily="mono" fontSize="xs" color="brand.solid" fontWeight={600} letterSpacing="0.6px" textTransform="uppercase">
          Brillian
        </Text>
        <Heading as="h2" fontSize="md" fontWeight={500} color="fg" lineHeight="1.2">
          Style guide
        </Heading>
      </Stack>

      <Stack gap="0.5" flex="1">
        {SECTIONS.map((s, i) => {
          const active = s.id === activeId;
          return (
            <Box
              as="a"
              key={s.id}
              {...({ href: `#${s.id}` } as object)}
              px="3"
              py="2"
              rounded="md"
              fontSize="13px"
              fontWeight={active ? 600 : 500}
              color={active ? 'fg' : 'fg.muted'}
              bg={active ? 'bg.dim' : 'transparent'}
              _hover={{ bg: 'bg.dim', color: 'fg' }}
              display="flex"
              alignItems="baseline"
              gap="2"
              transition="all 0.15s"
            >
              <Text as="span" fontFamily="mono" fontSize="xs" color="fg.subtle" w="20px">
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Text as="span">{s.title}</Text>
            </Box>
          );
        })}
      </Stack>

      <Box mt="6" pt="4" borderTopWidth="1px" borderColor="border">
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
        >
          <ArrowLeft size={14} />
          Back to prototype
        </Box>
      </Box>
    </Box>
  );
}

function PageHeader() {
  return (
    <Box bg="bg" borderBottomWidth="1px" borderColor="border" px={{ base: '6', md: '12' }} py="10">
      <Flex align="baseline" justify="space-between" gap="6" flexWrap="wrap">
        <Box>
          <Text
            fontSize="xs"
            fontWeight={600}
            letterSpacing="0.6px"
            textTransform="uppercase"
            color="brand.solid"
            mb="2"
          >
            Brillian Design System
          </Text>
          <Heading as="h1" fontSize="3xl" fontWeight={500} color="fg" lineHeight="1" letterSpacing="-1px">
            Style guide
          </Heading>
          <Text mt="3" maxW="640px" fontSize="md" color="fg.muted" lineHeight="1.6">
            The living source of truth for foundations, tokens, and components. Every swatch and
            spec on this page reads directly from{' '}
            <Text as="span" fontFamily="mono" fontSize="sm" color="fg">
              src/theme/tokens.ts
            </Text>
            , and components render via the same Chakra system the prototype ships.
          </Text>
        </Box>
        <Stack gap="1" textAlign="right" fontFamily="mono" fontSize="xs" color="fg.subtle">
          <Text>July 13 tokens · Manrope · 4px grid</Text>
          <Text>{new Date().toISOString().slice(0, 10)}</Text>
        </Stack>
      </Flex>
    </Box>
  );
}

function Section({
  id,
  num,
  title,
  description,
  children,
}: {
  id: string;
  num: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      id={id}
      as="section"
      px={{ base: '6', md: '12' }}
      py={{ base: '10', md: '16' }}
      borderBottomWidth="1px"
      borderColor="border"
      scrollMarginTop="0"
    >
      <Flex align="baseline" gap="4" mb="2">
        <Text fontFamily="mono" fontSize="xs" color="fg.subtle">
          {String(num).padStart(2, '0')}
        </Text>
        <Heading as="h2" fontSize="xl" fontWeight={500} color="fg" letterSpacing="-0.4px">
          {title}
        </Heading>
      </Flex>
      <Text fontSize="base" color="fg.muted" lineHeight="1.6" maxW="720px" mb="8">
        {description}
      </Text>
      {children}
    </Box>
  );
}

// ============================================================================
// Colors
// ============================================================================

function RampRow({ name, ramp }: { name: string; ramp: Record<string, string> }) {
  const steps = Object.entries(ramp);
  return (
    <Box>
      <Text fontFamily="mono" fontSize="sm" color="fg" mb="2">
        {name}
      </Text>
      <SimpleGrid columns={{ base: 5, md: 10 }} gap="2">
        {steps.map(([step, hex]) => (
          <Stack key={step} gap="1.5">
            <Box bg={hex} h="56px" rounded="lg" borderWidth="1px" borderColor="border" />
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle" lineHeight="1.2">
              {step}
            </Text>
            <Text fontFamily="mono" fontSize="xs" color="fg" lineHeight="1.2">
              {hex}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function SemanticSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <Card p="0" overflow="hidden">
      <Box bg={hex} h="80px" />
      <Stack gap="0.5" p="3" borderTopWidth="1px" borderColor="border">
        <Text fontFamily="mono" fontSize="sm" color="fg">
          {name}
        </Text>
        <Text fontFamily="mono" fontSize="xs" color="fg.subtle">
          {hex}
        </Text>
      </Stack>
    </Card>
  );
}

function resolveSemantic(token: { ramp: ColorRampKey | null; step?: number; value?: string; name: string }) {
  if (token.value) return token.value;
  if (token.ramp && token.step != null) {
    const ramp = colorRamps[token.ramp] as Record<number, string>;
    return ramp[token.step];
  }
  return '#000';
}

function ColorsSection() {
  const def = SECTIONS.find(s => s.id === 'colors')!;
  return (
    <Section id={def.id} num={1} title={def.title} description={def.description}>
      <Stack gap="12">
        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Brand</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              semantic
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            Primary brand identity. Use{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">brand.solid</Text> for actions and{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">brand.fg</Text> for text on tinted
            backgrounds.
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4, xl: 7 }} gap="3">
            {Object.values(semanticColors.brand).map(t => (
              <SemanticSwatch key={t.name} name={t.name} hex={resolveSemantic(t)} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Background &amp; borders</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              semantic
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            Surface tones for cards, dim regions, and the inverse navy used in marketing.
            Border tokens layer subtle → emphasized for the same surface.
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4, xl: 6 }} gap="3">
            {[...Object.values(semanticColors.bg), ...Object.values(semanticColors.border)].map(t => (
              <SemanticSwatch key={t.name} name={t.name} hex={resolveSemantic(t)} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Text</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              semantic
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            Eleven text tokens on the Ink ramp — primary (900), body (800), secondary (600),
            subtle (500), placeholder/disabled (400) — plus error, success, and the inverse trio
            for dark surfaces. Always reach for the semantic token, never the underlying ramp.
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4, xl: 5 }} gap="3">
            {Object.values(semanticColors.fg).map(t => (
              <SemanticSwatch key={t.name} name={t.name} hex={resolveSemantic(t)} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Input</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              semantic
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            Eight state tokens covering every field: white surface, ink borders at rest/hover,
            forest focus, brick error, forest success, and the disabled pair. All inputs are 40px
            tall with radii.control corners.
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
            {Object.values(semanticColors.input).map(t => (
              <SemanticSwatch key={t.name} name={t.name} hex={resolveSemantic(t)} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Status states</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              primitive
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            The four status primitives, health-scale ordered (healthiest first):{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">status.success</Text> →{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">status.moderate</Text> →{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">status.warning</Text> →{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">status.danger</Text>. Each gets a{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">tint / base / text</Text> triplet —
            the tint (family 100) for backgrounds, the text (family 800) for text on those tints. Always
            used together, never mixed across status types. Inverse metrics (e.g. Inventory Days) reverse
            the scale direction.
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="3">
            {Object.values(semanticColors.status).map(s => {
              const ramp = colorRamps[s.ramp] as Record<number, string>;
              return (
                <Card key={s.label} p="4">
                  <Text fontSize="14px" fontWeight={600} color="fg" mb="1">
                    {s.label}
                  </Text>
                  <Text fontSize="11px" color="fg.muted" mb="3" lineHeight="1.4">
                    {s.use}
                  </Text>
                  <Box mb="4">
                    <Badge
                      rounded="pill"
                      px="3"
                      py="1"
                      fontSize="11px"
                      fontWeight={500}
                      bg={ramp[s.tint.step]}
                      color={ramp[s.text.step]}
                      borderWidth="0"
                    >
                      {s.label}
                    </Badge>
                  </Box>
                  <Stack gap="1.5">
                    {[s.tint, s.base, s.text].map(t => (
                      <Flex key={t.name} align="center" gap="2">
                        <Box
                          boxSize="14px"
                          rounded="base"
                          bg={ramp[t.step]}
                          borderWidth="1px"
                          borderColor="border"
                          flexShrink={0}
                        />
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
        </Box>

        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Accent</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              semantic
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            Lime accent for highlights and CTAs on dark surfaces.{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">accent.solid</Text> takes dark
            text only — never white.
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
            {Object.values(semanticColors.accent).map(t => (
              <SemanticSwatch key={t.name} name={t.name} hex={resolveSemantic(t)} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex align="baseline" gap="2" mb="2" flexWrap="wrap">
            <Text fontSize="md" fontWeight={600} color="fg">Color ramps</Text>
            <Badge intent="neutral" fontSize="10px" letterSpacing="0.4px" textTransform="uppercase">
              primitive
            </Badge>
          </Flex>
          <Text fontSize="13px" color="fg.muted" lineHeight="1.6" maxW="720px" mb="4">
            The raw building blocks. Reach for these only when no semantic token fits — and if
            that happens often, add a token instead.
          </Text>
          <Stack gap="6">
            {Object.entries(colorRamps).map(([name, ramp]) => (
              <RampRow key={name} name={name} ramp={ramp as Record<string, string>} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}

// ============================================================================
// Typography
// ============================================================================

function TypographySection() {
  const def = SECTIONS.find(s => s.id === 'typography')!;
  const samples: Array<{ token: keyof typeof fontSizes; label: string; weight: number }> = [
    { token: '3xl', label: 'Display', weight: 500 },
    { token: '2xl', label: 'Heading 1', weight: 500 },
    { token: 'xl', label: 'Heading 2', weight: 500 },
    { token: 'lg', label: 'Heading 3', weight: 500 },
    { token: 'md', label: 'Body lead', weight: 400 },
    { token: 'base', label: 'Body', weight: 400 },
    { token: 'sm', label: 'Caption', weight: 500 },
    { token: 'xs', label: 'Eyebrow', weight: 600 },
  ];

  return (
    <Section id={def.id} num={2} title={def.title} description={def.description}>
      <Stack gap="3">
        {samples.map(s => (
          <Flex key={s.token} align="baseline" gap="6" pb="3" borderBottomWidth="1px" borderColor="border" _last={{ borderBottomWidth: 0 }}>
            <Box w={{ base: '80px', md: '120px' }} flexShrink={0}>
              <Text fontFamily="mono" fontSize="xs" color="fg.subtle">{s.token}</Text>
              <Text fontFamily="mono" fontSize="xs" color="fg.subtle">{fontSizes[s.token]} · {s.weight}</Text>
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
      <Box mt="8">
        <Text fontSize="sm" fontWeight={600} color="fg" mb="2">Mono</Text>
        <Text fontFamily="mono" fontSize="sm" color="fg.muted">{fonts.mono}</Text>
      </Box>
    </Section>
  );
}

// ============================================================================
// Spacing
// ============================================================================

function SpacingSection() {
  const def = SECTIONS.find(s => s.id === 'spacing')!;
  return (
    <Section id={def.id} num={3} title={def.title} description={def.description}>
      <Stack gap="2">
        {Object.entries(spacing).map(([key, value]) => (
          <Flex key={key} align="center" gap="4">
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle" w="36px">{key}</Text>
            <Text fontFamily="mono" fontSize="xs" color="fg" w="48px">{value}</Text>
            <Box bg="brand.solid" h="12px" w={value} rounded="base" />
          </Flex>
        ))}
      </Stack>
    </Section>
  );
}

// ============================================================================
// Border radius
// ============================================================================

function RadiiSection() {
  const def = SECTIONS.find(s => s.id === 'radii')!;
  const items: Array<{ key: keyof typeof radii; useCase: string }> = [
    { key: 'sm', useCase: 'Micro elements' },
    { key: 'base', useCase: 'Controls — buttons · inputs (radii.control)' },
    { key: 'md', useCase: 'Nav items · chips' },
    { key: 'lg', useCase: 'Cards · panels · modals (radii.card)' },
    { key: 'xl', useCase: 'Large surfaces' },
    { key: '2xl', useCase: 'Marketing surfaces' },
    { key: 'full', useCase: 'Tags · avatars · toggles (radii.pill)' },
  ];
  return (
    <Section id={def.id} num={4} title={def.title} description={def.description}>
      <SimpleGrid columns={{ base: 2, md: 3, xl: 6 }} gap="3">
        {items.map(({ key, useCase }) => (
          <Card key={key} p="4">
            <Box bg="brand.solid" h="80px" rounded={key} mb="3" />
            <Text fontFamily="mono" fontSize="sm" color="fg" mb="0.5">radius.{key}</Text>
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle" mb="1.5">{radii[key]}</Text>
            <Text fontSize="xs" color="fg.muted">{useCase}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Section>
  );
}

// ============================================================================
// Shadows
// ============================================================================

function ShadowsSection() {
  const def = SECTIONS.find(s => s.id === 'shadows')!;
  return (
    <Section id={def.id} num={5} title={def.title} description={def.description}>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap="6">
        {Object.entries(shadows).map(([name, value]) => (
          <Box key={name}>
            <Box bg="bg" h="120px" rounded="lg" shadow={name as keyof typeof shadows} mb="3" />
            <Text fontFamily="mono" fontSize="sm" color="fg" mb="1">shadow.{name}</Text>
            <Text fontFamily="mono" fontSize="xs" color="fg.subtle" lineHeight="1.4" wordBreak="break-all">
              {value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}

// ============================================================================
// Motion
// ============================================================================

function MotionSection() {
  const def = SECTIONS.find(s => s.id === 'motion')!;
  return (
    <Section id={def.id} num={6} title={def.title} description={def.description}>
      <Stack gap="10">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
          {Object.entries(motion.durations).map(([k, v]) => (
            <Card key={k} p="4">
              <Text fontFamily="mono" fontSize="sm" color="fg" mb="1">duration.{k}</Text>
              <Text fontFamily="mono" fontSize="lg" color="brand.solid" fontWeight={500}>{v}</Text>
            </Card>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          {Object.entries(motion.easings).map(([k, v]) => (
            <Card key={k} p="4">
              <Text fontFamily="mono" fontSize="sm" color="fg" mb="1">easing.{k}</Text>
              <Text fontFamily="mono" fontSize="xs" color="fg.subtle" wordBreak="break-all">{v}</Text>
            </Card>
          ))}
        </SimpleGrid>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Keyframes</Text>
          <Stack gap="3">
            {motion.keyframes.map(k => (
              <Card key={k.name} p="4">
                <Flex align="center" justify="space-between" gap="4" flexWrap="wrap">
                  <Box>
                    <Text fontFamily="mono" fontSize="sm" color="fg" mb="1">@keyframes {k.name}</Text>
                    <Text fontSize="13px" color="fg.muted" maxW="560px">{k.summary}</Text>
                  </Box>
                  <Stack gap="0.5" textAlign="right" fontFamily="mono" fontSize="xs" color="fg.subtle">
                    <Text>duration {k.duration}</Text>
                    <Text>easing {k.easing}</Text>
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}

// ============================================================================
// Components
// ============================================================================

function ComponentsSection() {
  const def = SECTIONS.find(s => s.id === 'components')!;
  return (
    <Section id={def.id} num={7} title={def.title} description={def.description}>
      <Stack gap="10">
        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Buttons</Text>
          <Flex gap="3" flexWrap="wrap" align="center">
            <Button intent="primary">Primary action</Button>
            <Button intent="accent">Accent CTA</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="ghost">Ghost</Button>
            <Button intent="primary" disabled>Disabled</Button>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Inputs</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" maxW="800px">
            <Input placeholder="Default state" />
            <Input placeholder="Disabled" disabled />
            <NativeSelect.Root>
              <NativeSelect.Field defaultValue="">
                <option value="" disabled>Select option</option>
                <option>One</option>
                <option>Two</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </SimpleGrid>
        </Box>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Badges</Text>
          <Text fontSize="13px" color="fg.muted" mb="3" maxW="640px">
            All badges share the pill silhouette and tint + dark text pattern. Use the{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">intent</Text> prop to pick a
            semantic variant — never style badge colors inline.
          </Text>
          <Flex gap="2" flexWrap="wrap">
            {(['danger', 'warning', 'moderate', 'success', 'brand', 'accent', 'neutral'] as const).map(i => (
              <Badge key={i} intent={i}>
                {i}
              </Badge>
            ))}
          </Flex>
        </Box>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Card</Text>
          <Text fontSize="13px" color="fg.muted" mb="3" maxW="640px">
            The primary container. Anatomy: header (title + description + action area), a
            border.subtle divider, then body content — every element optional except the
            container. Radius is always radii.card (8px); controls inside keep radii.control (4px).
            Default variant is elevated with shadow.elevated.
          </Text>
          <Card maxW="480px" display="flex" flexDir="column" gap="4">
            <CardHeader
              title="Title"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              action={<Button intent="secondary" size="sm" h="9">Button</Button>}
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
        </Box>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Tabs</Text>
          <Text fontSize="13px" color="fg.muted" mb="3" maxW="640px">
            In-page section switcher (see Company Details). Active tab is a filled brand pill;
            the row scrolls horizontally when it overflows on small screens.
          </Text>
          <TabNavDemo />
        </Box>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="4">Display field</Text>
          <Text fontSize="13px" color="fg.muted" mb="3" maxW="640px">
            Read-only counterpart to an input for detail views — pairs with EditableSection,
            which swaps these for live inputs behind an Edit / Save / Cancel header.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" maxW="800px">
            <DisplayField label="Owner Type" value="Natural person" />
            <DisplayField label="Ownership %" value="10.0%" />
            <DisplayField label="Website (optional)" value="" />
          </SimpleGrid>
        </Box>
      </Stack>
    </Section>
  );
}

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

// ============================================================================
// Data display — Avatar + StatTile
// ============================================================================

function DataDisplaySection() {
  const def = SECTIONS.find(s => s.id === 'data')!;
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
  return (
    <Section id={def.id} num={8} title={def.title} description={def.description}>
      <Stack gap="10">
        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="3">Avatar</Text>
          <Text fontSize="13px" color="fg.muted" mb="4" maxW="640px">
            Initials chip used for company logos, user avatars, and client markers. Square by
            default; pass <Text as="span" fontFamily="mono" fontSize="xs" color="fg">shape="circle"</Text>{' '}
            for people. Five sizes from xs (20px) to xl (56px).
          </Text>
          <Flex gap="4" align="end" flexWrap="wrap" mb="6">
            {sizes.map(s => (
              <Stack key={s} gap="2" align="center">
                <Avatar size={s} label="A" color="forest.500" />
                <Text fontFamily="mono" fontSize="xs" color="fg.subtle">{s}</Text>
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
        </Box>

        <Box>
          <Text fontSize="md" fontWeight={600} color="fg" mb="3">Stat tile</Text>
          <Text fontSize="13px" color="fg.muted" mb="4" maxW="640px">
            Labeled KPI card. Two sizes — default (28px value) for headline metrics and{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">size="sm"</Text>{' '}
            (22px) for dense dashboards.
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="3" mb="6">
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
        </Box>
      </Stack>
    </Section>
  );
}

// ============================================================================
// Feedback — Alert
// ============================================================================

function FeedbackSection() {
  const def = SECTIONS.find(s => s.id === 'feedback')!;
  const intents: Array<'danger' | 'warning' | 'moderate' | 'success' | 'brand' | 'neutral'> = [
    'danger', 'warning', 'moderate', 'success', 'brand', 'neutral',
  ];
  return (
    <Section id={def.id} num={9} title={def.title} description={def.description}>
      <Text fontSize="13px" color="fg.muted" mb="4" maxW="640px">
        Each alert pairs a 3px left-border with the matching tint background and dark text.
        The default icon comes from the intent — pass{' '}
        <Text as="span" fontFamily="mono" fontSize="xs" color="fg">icon</Text>{' '}
        to override, or{' '}
        <Text as="span" fontFamily="mono" fontSize="xs" color="fg">action</Text>{' '}
        to add a trailing button.
      </Text>
      <Stack gap="3">
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
          action={<Button intent="primary" size="sm">Connect</Button>}
        />
      </Stack>
    </Section>
  );
}

// ============================================================================
// Form patterns
// ============================================================================

function FormsSection() {
  const def = SECTIONS.find(s => s.id === 'forms')!;
  return (
    <Section id={def.id} num={10} title={def.title} description={def.description}>
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
              <Text>This sidebar pattern uses the DidYouKnow component. It supports an icon, headline, summary, and optional expanded content.</Text>
              <Source>Mercer Capital — Normalization Adjustments Guide</Source>
            </>
          }
        />
      </SimpleGrid>
    </Section>
  );
}

// ============================================================================
// Page
// ============================================================================

function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0]!.id);
  useEffect(() => {
    const handle = () => {
      // Pick the section whose top is closest to (but past) the viewport top.
      const offsets = SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Number.POSITIVE_INFINITY };
        return { id: s.id, top: el.getBoundingClientRect().top };
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
    <Flex flex="1" w="full" minH="100vh" bg="bg.dim">
      <Sidebar activeId={active} />
      <Box flex="1" minW="0">
        <PageHeader />
        <ColorsSection />
        <TypographySection />
        <SpacingSection />
        <RadiiSection />
        <ShadowsSection />
        <MotionSection />
        <ComponentsSection />
        <DataDisplaySection />
        <FeedbackSection />
        <FormsSection />
        <Box px={{ base: '6', md: '12' }} py="10" textAlign="center">
          <Text fontSize="xs" color="fg.subtle" fontFamily="mono">
            End of guide · edit src/theme/tokens.ts to extend
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
