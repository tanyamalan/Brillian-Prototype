import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

export type CardVariant = 'elevated' | 'raised' | 'outline' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

interface CardProps extends BoxProps {
  /**
   * elevated (default) — shadow.elevated, no border.
   * raised — shadow.raised, for overlays / popovers / menus.
   * outline — 1px border.subtle, no shadow.
   * filled — canvas background only; no border, no shadow.
   */
  variant?: CardVariant;
  /** Padding preset: sm 16px · md 20px · lg 32px. */
  size?: CardSize;
}

const VARIANT_STYLES: Record<CardVariant, BoxProps> = {
  elevated: { bg: 'bg', shadow: 'elevated' },
  raised: { bg: 'bg', shadow: 'raised' },
  outline: { bg: 'bg', borderWidth: '1px', borderColor: 'border.subtle' },
  filled: { bg: 'bg.dim' },
};

const SIZE_PAD: Record<CardSize, string> = { sm: '4', md: '5', lg: '8' };

/**
 * Card — default content surface (July 13 reference). Radius = radii.card
 * (8px) across all variants; defaults are variant=elevated, size=md (20px).
 *
 * Anatomy (all optional): CardHeader (title + description + action area),
 * CardDivider (1px border.subtle, full inner width), then body content.
 * Compose with 16px gaps (`display="flex" flexDir="column" gap="4"`).
 */
export function Card({ variant = 'elevated', size = 'md', ...props }: CardProps) {
  return (
    <Box
      rounded="card"
      p={SIZE_PAD[size]}
      {...VARIANT_STYLES[variant]}
      {...props}
    />
  );
}

/**
 * CardHeader — title (Manrope Medium 18, text/primary) + description
 * (Medium 14, text/secondary) 4px apart, with a right-aligned action area.
 */
export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap="4">
      <Box minW="0">
        <Box as="h2" fontSize="lg" fontWeight={500} color="fg" lineHeight="1.3">
          {title}
        </Box>
        {description && (
          <Box fontSize="14px" fontWeight={500} color="fg.muted" mt="1" lineHeight="1.5">
            {description}
          </Box>
        )}
      </Box>
      {action && <Box flexShrink={0}>{action}</Box>}
    </Box>
  );
}

/** CardDivider — 1px border.subtle across the card's inner width. */
export function CardDivider() {
  return <Box borderTopWidth="1px" borderColor="border.subtle" />;
}
