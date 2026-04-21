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

export default function DidYouKnow({ Icon, headline, summary, expandedContent }: DidYouKnowProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      as="aside"
      bg="bg"
      shadow="card"
      rounded="sm"
      overflow="hidden"
      position="sticky"
      top="6"
    >
      <HStack gap="2" pt="4" px="4" pb="2">
        <Circle size="28px" bg="brl.warningLight" color="brl.warning" flexShrink={0}>
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
  );
}
