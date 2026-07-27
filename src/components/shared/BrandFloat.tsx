import { Flex, Image } from '@chakra-ui/react';

/**
 * BrandFloat — the small Brillian mark floating in the bottom-right corner,
 * present across the whole app (login included). 48px lime circle; hidden on
 * mobile where the bottom nav bar owns that edge.
 */
export function BrandFloat() {
  return (
    <Flex
      position="fixed"
      bottom="6"
      right="6"
      boxSize="48px"
      rounded="full"
      bg="accent.solid"
      align="center"
      justify="center"
      zIndex={50}
      pointerEvents="none"
      display={{ base: 'none', md: 'flex' }}
    >
      <Image src="/brillian-logo.svg" alt="Brillian" h="20px" w="auto" />
    </Flex>
  );
}
