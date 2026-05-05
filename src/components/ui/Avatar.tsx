import { Box, Text } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'square' | 'circle';

interface AvatarProps extends Omit<BoxProps, 'children'> {
  /** Initials or short label rendered inside (1–3 chars). */
  label: string;
  /** Background color — accepts any Chakra color token (e.g. `brand.500`, `lime.700`). */
  color?: string;
  /** One of five preset sizes. */
  size?: AvatarSize;
  /** Square (rounded-md) for company logos, circle for people. */
  shape?: AvatarShape;
  /** Override the default contrast text color (defaults to fg.onBrand). */
  textColor?: string;
}

const SIZE_MAP: Record<AvatarSize, { box: string; font: string }> = {
  xs: { box: '20px', font: '9px' },
  sm: { box: '28px', font: '11px' },
  md: { box: '36px', font: '14px' },
  lg: { box: '44px', font: '16px' },
  xl: { box: '56px', font: '20px' },
};

/**
 * Avatar — initials chip used for company logos, user avatars, and client
 * markers throughout the app. Supports square (default, for companies) and
 * circle shapes.
 */
export function Avatar({
  label,
  color = 'brand.solid',
  size = 'md',
  shape = 'square',
  textColor = 'fg.onBrand',
  ...rest
}: AvatarProps) {
  const dims = SIZE_MAP[size];
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      boxSize={dims.box}
      rounded={shape === 'circle' ? 'full' : 'md'}
      bg={color}
      color={textColor}
      {...rest}
    >
      <Text as="span" fontSize={dims.font} fontWeight={700} lineHeight="1">
        {label}
      </Text>
    </Box>
  );
}
