import { useState } from 'react';
import { Box, Circle, Collapsible, HStack, Stack, Text } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DidYouKnowProps {
  Icon: LucideIcon;
  headline: string;
  summary: string;
  expandedContent: React.ReactNode;
}

/** Italic source citation line for use inside DidYouKnow's expandedContent. */
export function Source({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="10px" color="fg.subtle" fontStyle="italic" mt="1">
      Source: {children}
    </Text>
  );
}

export default function DidYouKnow({ Icon, headline, summary, expandedContent }: DidYouKnowProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      as="aside"
      position="sticky"
      top="6"
      opacity={0}
      animation="brl-card-in 0.8s ease-out 1.2s forwards"
      // Soft glow halo — two large blurred radial blobs that drift around the
      // card. No hard edges, no conic seam — feels like ambient light.
      _before={{
        content: '""',
        position: 'absolute',
        inset: { base: '-4px', md: '-12px' },
        zIndex: 0,
        background:
          'radial-gradient(circle at 30% 30%, var(--chakra-colors-brand-500) 0%, transparent 55%), radial-gradient(circle at 70% 70%, var(--chakra-colors-purple-500) 0%, transparent 55%)',
        filter: { base: 'blur(14px)', md: 'blur(20px)' },
        opacity: { base: 0.3, md: 0.4 },
        animation: 'brl-spin 14s linear infinite',
        pointerEvents: 'none',
      }}
    >
      <Box
        position="relative"
        zIndex={1}
        bg="bg"
        rounded="sm"
        shadow="card"
        overflow="hidden"
      >
      <HStack gap="2" pt="4" px="4" pb="2">
        <Circle
          size="28px"
          bg="status.warning.tint"
          color="status.warning"
          flexShrink={0}
          animation="brl-pulse 2.4s ease-in-out infinite"
        >
          <Icon size={14} />
        </Circle>
        <Text
          fontSize="10px"
          fontWeight={600}
          letterSpacing="0.6px"
          textTransform="uppercase"
          color="fg.subtle"
        >
          Did you know
        </Text>
      </HStack>
      <Box px="4" pb="4">
        <Text fontSize="13px" fontWeight={600} color="fg" lineHeight="1.4" mb="1.5">
          {headline}
        </Text>
        <Text fontSize="12px" color="fg.muted" lineHeight="1.5">
          {summary}
        </Text>
      </Box>
      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Collapsible.Content>
          <Stack
            px="4"
            py="2"
            borderTopWidth="1px"
            borderColor="border"
            fontSize="12px"
            color="fg.muted"
            lineHeight="1.55"
            gap="2"
          >
            {expandedContent}
          </Stack>
        </Collapsible.Content>
        <Collapsible.Trigger asChild>
          <HStack
            as="button"
            w="full"
            justify="space-between"
            px="4"
            py="2"
            bg="bg"
            borderTopWidth="1px"
            borderColor="border"
            fontSize="12px"
            fontWeight={600}
            color="brand.solid"
            cursor="pointer"
            _hover={{ bg: 'brand.subtle' }}
          >
            <Text as="span">{open ? 'Show less' : 'Read more'}</Text>
            <Box
              as={ChevronDown}
              w="14px"
              h="14px"
              transition="transform 0.25s"
              transform={open ? 'rotate(180deg)' : 'rotate(0deg)'}
            />
          </HStack>
        </Collapsible.Trigger>
      </Collapsible.Root>
      </Box>
    </Box>
  );
}
