import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { Avatar } from './Avatar';
import { firmBrand } from '../../config/firmBrand';

interface CoBrandProps {
  /**
   * partnership — "In partnership with [firm]" (quiet footer line).
   * lockup — [Brillian mark] × [firm mark] side-by-side tiles.
   * inline — firm identity on one line (topbars, headers).
   */
  variant?: 'partnership' | 'lockup' | 'inline';
  /** On dark nav surfaces: wordmark inverts to white, text lightens to Ink. */
  onDark?: boolean;
}

/** The firm's identity: horizontal wordmark when provided, else mark + name. */
function FirmIdentity({ h = '13px', onDark = false }: { h?: string; onDark?: boolean }) {
  if (firmBrand.wordmarkSrc) {
    return (
      <Image
        src={firmBrand.wordmarkSrc}
        alt={firmBrand.name}
        h={h}
        w="auto"
        // Light surfaces: soften so the mark doesn't paint pure black.
        // Dark surfaces: invert the mark to white.
        opacity={onDark ? 0.9 : 0.85}
        filter={onDark ? 'brightness(0) invert(1)' : undefined}
      />
    );
  }
  return (
    <HStack gap="1.5">
      <Avatar
        size="xs"
        color={firmBrand.color}
        textColor={firmBrand.textColor}
        label={firmBrand.initials}
        src={firmBrand.logoSrc}
        alt={firmBrand.name}
      />
      <Text fontSize="12px" fontWeight={600} color={onDark ? 'navDark.fg' : 'fg.muted'} whiteSpace="nowrap">
        {firmBrand.name}
      </Text>
    </HStack>
  );
}

/**
 * CoBrand — renders the advisory firm's identity alongside Brillian.
 * All values come from src/config/firmBrand.ts; drop logo files in public/
 * and set `logoSrc` / `wordmarkSrc` there to swap initials for real marks.
 */
export function CoBrand({ variant = 'partnership', onDark = false }: CoBrandProps) {
  if (variant === 'lockup') {
    return (
      <HStack gap="2.5">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSize="28px"
          rounded="md"
          bg="brand.solid"
        >
          <Box as="img" {...({ src: '/brillian-logo-white.svg', alt: 'Brillian' } as object)} h="14px" />
        </Box>
        <Text fontSize="11px" color="fg.subtle">
          ×
        </Text>
        <FirmIdentity h="14px" />
      </HStack>
    );
  }

  if (variant === 'inline') {
    return <FirmIdentity h="14px" onDark={onDark} />;
  }

  // partnership (default)
  return (
    <HStack gap="2" justify="center">
      <Text fontSize="11px" color={onDark ? 'navDark.muted' : 'fg.subtle'} whiteSpace="nowrap">
        In partnership with
      </Text>
      <FirmIdentity h="12px" onDark={onDark} />
    </HStack>
  );
}
