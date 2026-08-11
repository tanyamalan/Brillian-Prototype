import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ArrowLeft, Check, ChevronDown, ChevronRight, Copy, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import {
  renderCta,
  renderProse,
  renderQuote,
  renderStatRow,
  type CtaInput,
  type ProseInput,
  type QuoteInput,
  type StatItem,
} from './templates';

// ============================================================================
// Section catalog
// ============================================================================

interface SectionDef {
  id: string;
  title: string;
  description: string;
}

const SECTIONS: SectionDef[] = [
  {
    id: 'globals',
    title: 'Global settings',
    description: 'One URL that every CTA in this builder points at. Update it once here and every snippet you copy uses it.',
  },
  {
    id: 'ctas',
    title: 'CTAs & footers',
    description: 'End-of-post conversion blocks. The button URL is wired to a single global variable — set it once, applies everywhere.',
  },
  {
    id: 'stats',
    title: 'Stat callouts',
    description: 'A row of 3 or 4 oversized stats with a navy top rule. The row collapses to a single column on mobile — hairline dividers adapt automatically.',
  },
  {
    id: 'quotes',
    title: 'Pull quotes',
    description: 'Customer testimonials, expert sources, or anything worth setting apart from the body copy.',
  },
  {
    id: 'prose',
    title: 'Prose blocks',
    description: 'Paste markdown-lite copy and we render it. Supports ## / ### headings, **bold**, *italic*, 1. numbered lists, and - bullets. Blank line = new paragraph.',
  },
];

// ============================================================================
// Layout primitives
// ============================================================================

function Sidebar({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <Box
      as="aside"
      w="240px"
      flexShrink={0}
      position="sticky"
      top="0"
      h="100vh"
      borderRightWidth="1px"
      borderColor="border.subtle"
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
        <Heading as="h2" textStyle="sectionHeader" color="fg" lineHeight="1.2">
          Blog builder
        </Heading>
        <Text fontSize="12px" color="fg.muted" mt="1">
          For Webflow embeds
        </Text>
      </Stack>

      <Stack gap="0.5" flex="1">
        {SECTIONS.map((s, i) => {
          const active = s.id === activeId;
          return (
            <Box
              as="a"
              key={s.id}
              {...({
                href: `#${s.id}`,
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  onSelect(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                },
              } as object)}
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
              cursor="pointer"
            >
              <Text as="span" fontFamily="mono" fontSize="xs" color="fg.subtle" w="20px">
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Text as="span">{s.title}</Text>
            </Box>
          );
        })}
      </Stack>

      <Box mt="6" pt="4" borderTopWidth="1px" borderColor="border.subtle">
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

function PageHeader({ demoUrl }: { demoUrl: string }) {
  return (
    <Box bg="bg" borderBottomWidth="1px" borderColor="border.subtle" px={{ base: '6', md: '12' }} py="10">
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
            Brillian Blog Builder
          </Text>
          <Heading as="h1" fontSize="3xl" fontWeight={500} color="fg" lineHeight="1" letterSpacing="-1px">
            Build a styled post
          </Heading>
          <Text mt="3" maxW="640px" fontSize="md" color="fg.muted" lineHeight="1.6">
            For the sales team. Fill in each block, hit{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">Copy HTML</Text>, then paste into a
            Webflow{' '}
            <Text as="span" fontFamily="mono" fontSize="xs" color="fg">HTML Embed</Text> inside your blog
            post. The snippets are fully styled — no Webflow classes required.
          </Text>
        </Box>
        <Stack gap="1" textAlign="right" fontFamily="mono" fontSize="xs" color="fg.subtle">
          <Text>v1 · self-contained HTML</Text>
          <Text>Demo URL: {demoUrl || '— not set —'}</Text>
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
      py={{ base: '8', md: '12' }}
      borderBottomWidth="1px"
      borderColor="border.subtle"
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
      <Text fontSize="sm" color="fg.muted" lineHeight="1.6" maxW="720px" mb="8">
        {description}
      </Text>
      <Stack gap="8">{children}</Stack>
    </Box>
  );
}

// ============================================================================
// Shared editor primitives
// ============================================================================

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontSize="11px"
      fontWeight={600}
      letterSpacing="0.6px"
      textTransform="uppercase"
      color="fg.subtle"
      mb="1.5"
    >
      {children}
    </Text>
  );
}

function CopyButton({ html }: { html: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setState('copied');
      setTimeout(() => setState('idle'), 1800);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 1800);
    }
  };
  return (
    <Button intent="primary" size="sm" onClick={onClick} minW="120px">
      {state === 'copied' ? <Check size={14} /> : <Copy size={14} />}
      <Text as="span" ml="1.5">
        {state === 'copied' ? 'Copied' : state === 'error' ? 'Press ⌘C' : 'Copy HTML'}
      </Text>
    </Button>
  );
}

function ViewButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <Button intent="secondary" size="sm" onClick={onToggle} minW="120px">
      {open ? <ChevronDown size={14} /> : <Eye size={14} />}
      <Text as="span" ml="1.5">{open ? 'Hide HTML' : 'View HTML'}</Text>
    </Button>
  );
}

function HtmlSource({ html }: { html: string }) {
  return (
    <Box
      bg="bg.inverse"
      color="sand.100"
      rounded="md"
      p="4"
      fontFamily="mono"
      fontSize="12px"
      lineHeight="1.6"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      maxH="320px"
      overflowY="auto"
    >
      {html}
    </Box>
  );
}

function BlockCard({
  title,
  subtitle,
  html,
  preview,
  editor,
  previewBg = 'transparent',
}: {
  title: string;
  subtitle: string;
  html: string;
  preview: React.ReactNode;
  editor: React.ReactNode;
  previewBg?: string;
}) {
  const [showSource, setShowSource] = useState(false);
  return (
    <Card p="0" overflow="hidden">
      <Flex
        align="center"
        justify="space-between"
        gap="3"
        px="6"
        py="4"
        borderBottomWidth="1px"
        borderColor="border.subtle"
        bg="bg.dim"
        flexWrap="wrap"
      >
        <Flex align="baseline" gap="3" flexWrap="wrap" minW="0">
          <Text fontSize="14px" fontWeight={600} color="fg">{title}</Text>
          <Text fontSize="12px" color="fg.muted">{subtitle}</Text>
        </Flex>
        <Flex gap="2">
          <ViewButton open={showSource} onToggle={() => setShowSource(v => !v)} />
          <CopyButton html={html} />
        </Flex>
      </Flex>
      <Box px="6" py="6" bg="bg.dim">
        <Stack gap="3">{editor}</Stack>
      </Box>
      <Box px="6" py="8" bg={previewBg} borderTopWidth="1px" borderColor="border.subtle">
        <Text
          fontSize="10px"
          fontWeight={600}
          letterSpacing="0.6px"
          textTransform="uppercase"
          color="fg.subtle"
          mb="3"
        >
          Preview
        </Text>
        {preview}
      </Box>
      {showSource && (
        <Box px="6" py="4" borderTopWidth="1px" borderColor="border.subtle">
          <HtmlSource html={html} />
        </Box>
      )}
    </Card>
  );
}

// Render the generated HTML literally so the preview always matches the
// clipboard output — single source of truth for what the sales team will see.
function RawPreview({ html }: { html: string }) {
  return <Box dangerouslySetInnerHTML={{ __html: html }} />;
}

// ============================================================================
// Globals · the shared demo URL
// ============================================================================

function GlobalsSection({
  demoUrl,
  onDemoUrlChange,
}: {
  demoUrl: string;
  onDemoUrlChange: (v: string) => void;
}) {
  const def = SECTIONS.find(s => s.id === 'globals')!;
  return (
    <Section id={def.id} num={1} title={def.title} description={def.description}>
      <Card maxW="720px">
        <FieldLabel>Default demo / booking URL</FieldLabel>
        <Input
          value={demoUrl}
          onChange={e => onDemoUrlChange(e.target.value)}
          placeholder="https://brillian.com/book-a-demo"
        />
        <Text fontSize="12px" color="fg.muted" mt="2">
          Used by every CTA below unless you set an override on a specific card.
        </Text>
      </Card>
    </Section>
  );
}

// ============================================================================
// CTA section
// ============================================================================

const CTA_DEFAULTS: CtaInput[] = [
  {
    eyebrow: 'For advisors',
    title: 'Bring the business into the advisory conversation',
    body: 'See how Brillian gives you a continuous view of client business value, cash flow, and readiness — built for the meetings that matter most.',
    buttonLabel: 'Book a demo',
    buttonUrl: '',
  },
  {
    eyebrow: 'For owners',
    title: 'Know what your business is worth — and what moves the number',
    body: 'Connect your books, answer a few questions, and get a defensible valuation in under 10 minutes.',
    buttonLabel: 'Try Brillian free',
    buttonUrl: '',
  },
];

function CtaEditorCard({
  initial,
  fallbackUrl,
}: {
  initial: CtaInput;
  fallbackUrl: string;
}) {
  const [state, setState] = useState<CtaInput>(initial);
  const effective: CtaInput = useMemo(
    () => ({ ...state, buttonUrl: state.buttonUrl.trim() || fallbackUrl }),
    [state, fallbackUrl]
  );
  const html = useMemo(() => renderCta(effective), [effective]);

  const set = <K extends keyof CtaInput>(key: K, value: CtaInput[K]) =>
    setState(s => ({ ...s, [key]: value }));

  return (
    <BlockCard
      title={`CTA card · ${state.buttonLabel || 'Untitled'}`}
      subtitle="navy → blue gradient"
      html={html}
      preview={<RawPreview html={html} />}
      editor={
        <>
          <Box>
            <FieldLabel>Eyebrow</FieldLabel>
            <Input value={state.eyebrow} onChange={e => set('eyebrow', e.target.value)} />
          </Box>
          <Box>
            <FieldLabel>Button label</FieldLabel>
            <Input value={state.buttonLabel} onChange={e => set('buttonLabel', e.target.value)} />
          </Box>
          <Box>
            <FieldLabel>Title</FieldLabel>
            <Input value={state.title} onChange={e => set('title', e.target.value)} />
          </Box>
          <Box>
            <FieldLabel>Body</FieldLabel>
            <Textarea
              value={state.body}
              onChange={e => set('body', e.target.value)}
              rows={3}
              rounded="md"
              borderColor="border.emphasized"
              _focus={{ borderColor: 'brand.solid', boxShadow: 'focus', outline: 'none' }}
            />
          </Box>
          <Box>
            <FieldLabel>Button URL · defaults to the global demo URL</FieldLabel>
            <Input
              value={state.buttonUrl}
              onChange={e => set('buttonUrl', e.target.value)}
              placeholder={fallbackUrl || 'Leave blank to use the default demo URL'}
            />
            <Text fontSize="12px" color="fg.muted" mt="2">
              Only override for one-off campaigns or specific landing pages. Otherwise leave
              blank — every CTA uses the same global URL set in the file.
            </Text>
          </Box>
        </>
      }
    />
  );
}

function CtaSection({ demoUrl }: { demoUrl: string }) {
  const def = SECTIONS.find(s => s.id === 'ctas')!;
  return (
    <Section id={def.id} num={2} title={def.title} description={def.description}>
      {CTA_DEFAULTS.map((cta, i) => (
        <CtaEditorCard key={i} initial={cta} fallbackUrl={demoUrl} />
      ))}
    </Section>
  );
}

// ============================================================================
// Stat row · 3 or 4 stats, navy top rule, mobile-friendly
// ============================================================================

const STAT_DEFAULTS: StatItem[] = [
  {
    value: '70',
    suffix: '%+',
    label: 'Most listings never sell',
    description: 'Of small businesses listed for sale, the majority never close a deal.',
  },
  {
    value: '20–30',
    suffix: '%',
    label: 'Revenue lost to drag',
    description: 'Inefficiency drains a fifth to a third of revenue at most companies, every year.',
  },
  {
    value: 'Late',
    suffix: '',
    label: 'Owners start too late',
    description: 'Real exit preparation rarely begins early enough to shape the outcome.',
  },
  {
    value: '5×',
    suffix: '',
    label: 'Value-driver gap',
    description: 'Businesses scoring high on readiness drivers sell for several multiples more than peers.',
  },
];

function StatEditorCard() {
  const [count, setCount] = useState<3 | 4>(3);
  const [items, setItems] = useState<StatItem[]>(STAT_DEFAULTS);
  const activeItems = useMemo(() => items.slice(0, count), [items, count]);
  const html = useMemo(() => renderStatRow({ items: activeItems }), [activeItems]);

  const setItem = (idx: number, patch: Partial<StatItem>) =>
    setItems(prev => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  return (
    <BlockCard
      title={`Stat row · ${count} stats`}
      subtitle="navy top rule · stacks on mobile"
      html={html}
      preview={<RawPreview html={html} />}
      editor={
        <>
          <Box>
            <FieldLabel>How many stats</FieldLabel>
            <NativeSelect.Root maxW="240px">
              <NativeSelect.Field
                value={String(count)}
                onChange={e => setCount(Number(e.target.value) as 3 | 4)}
                rounded="md"
              >
                <option value="3">3 stats</option>
                <option value="4">4 stats</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          <Stack gap="3" mt="2">
            {activeItems.map((item, idx) => (
              <Box
                key={idx}
                borderWidth="1px"
                borderColor="border.subtle"
                rounded="md"
                bg="bg"
                p="4"
              >
                <Text
                  fontSize="11px"
                  fontWeight={600}
                  letterSpacing="0.6px"
                  textTransform="uppercase"
                  color="brand.solid"
                  mb="3"
                >
                  Stat {idx + 1}
                </Text>
                <Stack gap="3">
                  <Flex gap="3" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <Box flex="2" minW="200px">
                      <FieldLabel>Value</FieldLabel>
                      <Input
                        value={item.value}
                        onChange={e => setItem(idx, { value: e.target.value })}
                        placeholder="70"
                      />
                    </Box>
                    <Box flex="1" minW="120px">
                      <FieldLabel>Suffix · optional</FieldLabel>
                      <Input
                        value={item.suffix}
                        onChange={e => setItem(idx, { suffix: e.target.value })}
                        placeholder="%+"
                      />
                    </Box>
                  </Flex>
                  <Box>
                    <FieldLabel>Label</FieldLabel>
                    <Input
                      value={item.label}
                      onChange={e => setItem(idx, { label: e.target.value })}
                    />
                  </Box>
                  <Box>
                    <FieldLabel>Description · optional</FieldLabel>
                    <Textarea
                      value={item.description}
                      onChange={e => setItem(idx, { description: e.target.value })}
                      rows={2}
                      rounded="md"
                      borderColor="border.emphasized"
                      _focus={{ borderColor: 'brand.solid', boxShadow: 'focus', outline: 'none' }}
                    />
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </>
      }
    />
  );
}

function StatsSection() {
  const def = SECTIONS.find(s => s.id === 'stats')!;
  return (
    <Section id={def.id} num={3} title={def.title} description={def.description}>
      <StatEditorCard />
    </Section>
  );
}

// ============================================================================
// Pull quote
// ============================================================================

const QUOTE_DEFAULT: QuoteInput = {
  quote: 'Brillian turned a once-a-year valuation conversation into something we can have every quarter — and our clients show up much more prepared.',
  name: 'Jamie Reyes',
  role: 'Managing Partner, Northwind Advisors',
};

function QuoteEditorCard() {
  const [state, setState] = useState<QuoteInput>(QUOTE_DEFAULT);
  const html = useMemo(() => renderQuote(state), [state]);
  const set = <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) =>
    setState(s => ({ ...s, [key]: value }));
  return (
    <BlockCard
      title="Pull quote"
      subtitle="customer or expert source"
      html={html}
      preview={<RawPreview html={html} />}
      editor={
        <>
          <Box>
            <FieldLabel>Quote</FieldLabel>
            <Textarea
              value={state.quote}
              onChange={e => set('quote', e.target.value)}
              rows={3}
              rounded="md"
              borderColor="border.emphasized"
              _focus={{ borderColor: 'brand.solid', boxShadow: 'focus', outline: 'none' }}
            />
          </Box>
          <Flex gap="3" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
            <Box flex="1" minW="240px">
              <FieldLabel>Name</FieldLabel>
              <Input value={state.name} onChange={e => set('name', e.target.value)} />
            </Box>
            <Box flex="1" minW="240px">
              <FieldLabel>Role / company</FieldLabel>
              <Input value={state.role} onChange={e => set('role', e.target.value)} />
            </Box>
          </Flex>
        </>
      }
    />
  );
}

function QuotesSection() {
  const def = SECTIONS.find(s => s.id === 'quotes')!;
  return (
    <Section id={def.id} num={4} title={def.title} description={def.description}>
      <QuoteEditorCard />
    </Section>
  );
}

// ============================================================================
// Prose block
// ============================================================================

const PROSE_DEFAULT: ProseInput = {
  body: `## The business is your client's biggest asset

For many clients, the operating company is not just "part of their net worth." It *is* their net worth. It shapes their lifestyle today, their ability to take risk elsewhere, their retirement timeline, and whether succession is a choice or a necessity.

### Why the blind spot persists

This isn't a competency problem — it's a tooling and visibility problem. Most advisors simply aren't set up to continuously track how the business is trending against peers.

Business owners typically get two parallel plans:

1. The *personal* plan, managed in the advisor's world
2. The *business* plan, managed in the owner's world

The problem is that exits do not respect that boundary. When owners approach a sale without real visibility into **value, readiness, and cash flow drivers**, outcomes deteriorate.`,
};

const MARKDOWN_HINT = '## Heading   ### Subheading   **bold**   *italic*   1. list   - bullet';

function ProseEditorCard() {
  const [state, setState] = useState<ProseInput>(PROSE_DEFAULT);
  const html = useMemo(() => renderProse(state), [state]);
  const set = <K extends keyof ProseInput>(key: K, value: ProseInput[K]) =>
    setState(s => ({ ...s, [key]: value }));
  return (
    <BlockCard
      title="Prose block"
      subtitle="markdown-lite · paste in directly"
      html={html}
      preview={<RawPreview html={html} />}
      editor={
        <>
          <Box>
            <FieldLabel>Body · paste markdown-style copy</FieldLabel>
            <Textarea
              value={state.body}
              onChange={e => set('body', e.target.value)}
              rows={16}
              rounded="md"
              borderColor="border.emphasized"
              fontFamily="mono"
              fontSize="13px"
              lineHeight="1.55"
              _focus={{ borderColor: 'brand.solid', boxShadow: 'focus', outline: 'none' }}
            />
            <Text fontFamily="mono" fontSize="11px" color="fg.subtle" mt="2" letterSpacing="0.3px">
              {MARKDOWN_HINT}
            </Text>
          </Box>
        </>
      }
    />
  );
}

function ProseSection() {
  const def = SECTIONS.find(s => s.id === 'prose')!;
  return (
    <Section id={def.id} num={5} title={def.title} description={def.description}>
      <ProseEditorCard />
    </Section>
  );
}

// ============================================================================
// How-to footer
// ============================================================================

function HowToFooter() {
  const steps: Array<{ n: string; title: string; body: string }> = [
    {
      n: '01',
      title: 'Set the demo URL once',
      body: 'Paste your booking link into Global settings at the top. Every CTA picks it up automatically.',
    },
    {
      n: '02',
      title: 'Fill in each block',
      body: 'Edit the form fields on a card and watch the preview update live. Hit View HTML to see what will be copied.',
    },
    {
      n: '03',
      title: 'Paste into Webflow',
      body: 'In your Webflow blog post, add an HTML Embed component and paste. Styles are inlined — no design system required on the Webflow side.',
    },
  ];
  return (
    <Box px={{ base: '6', md: '12' }} py="12" bg="bg">
      <Flex align="baseline" gap="4" mb="6">
        <Text fontFamily="mono" fontSize="xs" color="fg.subtle">
          06
        </Text>
        <Heading as="h2" fontSize="xl" fontWeight={500} color="fg" letterSpacing="-0.4px">
          How to use
        </Heading>
      </Flex>
      <Flex gap="4" flexWrap="wrap">
        {steps.map(s => (
          <Card key={s.n} flex="1 1 240px" minW="240px">
            <Flex align="baseline" gap="3" mb="2">
              <Text fontFamily="mono" fontSize="xs" color="brand.solid" fontWeight={600}>
                {s.n}
              </Text>
              <Text fontSize="14px" fontWeight={600} color="fg">{s.title}</Text>
            </Flex>
            <Text fontSize="13px" color="fg.muted" lineHeight="1.6">{s.body}</Text>
            <Flex mt="3" align="center" gap="1" color="brand.solid">
              <ChevronRight size={14} />
              <Text fontSize="12px" fontWeight={500}>Tip</Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function BlogBuilder() {
  const [demoUrl, setDemoUrl] = useState('https://brillian.com/book-a-demo');
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]!.id);

  return (
    <Flex flex="1" w="full" minH="100vh" bg="bg.dim">
      <Sidebar activeId={activeSection} onSelect={setActiveSection} />
      <Box flex="1" minW="0">
        <PageHeader demoUrl={demoUrl} />
        <GlobalsSection demoUrl={demoUrl} onDemoUrlChange={setDemoUrl} />
        <CtaSection demoUrl={demoUrl} />
        <StatsSection />
        <QuotesSection />
        <ProseSection />
        <HowToFooter />
        <Box px={{ base: '6', md: '12' }} py="10" textAlign="center">
          <Text fontSize="xs" color="fg.subtle" fontFamily="mono">
            Brillian Blog Builder · paste into Webflow HTML Embed blocks
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
