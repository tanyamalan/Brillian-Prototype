import { Flex, Image } from '@chakra-ui/react';

/**
 * BrandFloat — the small Brillian mark floating in the bottom-right corner,
 * present across the whole app (login included). 48px circle; hidden on
 * mobile where the bottom nav bar owns that edge.
 *
 * scheme "accent" (login, dark surfaces): lime circle, forest B.
 * scheme "brand" (in-app, light surfaces): forest circle, lime B.
 */
export function BrandFloat({ scheme = 'accent' }: { scheme?: 'accent' | 'brand' }) {
  const brand = scheme === 'brand';
  return (
    <Flex
      position="fixed"
      bottom="6"
      right="6"
      boxSize="48px"
      rounded="full"
      bg={brand ? 'brand.solid' : 'accent.solid'}
      align="center"
      justify="center"
      zIndex={50}
      pointerEvents="none"
      display={{ base: 'none', md: 'flex' }}
    >
      <Image src={brand ? '/brillian-logo-lime.svg' : '/brillian-logo.svg'} alt="Brillian" h="20px" w="auto" />
    </Flex>
  );
}
