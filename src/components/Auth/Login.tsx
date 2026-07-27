import { Box, Button, Checkbox, Flex, Heading, Image, Input, Link as ChakraLink, Text } from '@chakra-ui/react';
import { navDarkGradient } from '../../theme/tokens';

interface LoginProps {
  onSignIn: () => void;
}

/**
 * Demo login screen — the dark forest glow surface with lime accents.
 * No real auth: the button (or Enter in the email field) signs straight in.
 */
export function Login({ onSignIn }: LoginProps) {
  return (
    <Flex
      minH="100vh"
      w="full"
      flex="1"
      direction="column"
      align="center"
      justify="center"
      px="6"
      bg="navDark.bg"
      backgroundImage={navDarkGradient}
      position="relative"
    >
      <Box w="full" maxW="400px" mx="auto" pb="24">
        {/* Brand mark above the heading */}
        <Flex justify="center" mb="8">
          <Flex boxSize="56px" rounded="xl" bg="accent.solid" align="center" justify="center">
            <Image src="/brillian-logo.svg" alt="Brillian" h="26px" w="auto" />
          </Flex>
        </Flex>
        <Heading as="h1" fontSize="4xl" fontWeight={500} color="accent.solid" textAlign="center" mb="12" letterSpacing="-0.02em">
          Login
        </Heading>

        <Text fontSize="sm" fontWeight={600} color="ink.100" mb="1.5">
          Email Address
        </Text>
        {/* No autofocus — the focus ring on load read as a heavy border */}
        <Input
          placeholder="Email address"
          type="email"
          mb="5"
          onKeyDown={e => {
            if (e.key === 'Enter') onSignIn();
          }}
        />

        <Checkbox.Root defaultChecked mb="8" display="flex" alignItems="center" gap="2.5" cursor="pointer">
          <Checkbox.HiddenInput />
          <Checkbox.Control
            boxSize="24px"
            rounded="control"
            _checked={{ bg: 'accent.solid', borderColor: 'accent.solid', color: 'fg' }}
          />
          <Checkbox.Label fontSize="15px" fontWeight={400} color="ink.50">
            Keep me logged in.
          </Checkbox.Label>
        </Checkbox.Root>

        <Button intent="accent" w="full" fontSize="15px" onClick={onSignIn}>
          Sign into Brillian
        </Button>

        <Text mt="6" fontSize="14px" color="ink.200" lineHeight="1.6">
          Are you a business owner who needs to create an account?{' '}
          <ChakraLink
            variant="standalone"
            color="accent.solid"
            _hover={{ color: 'accent.emphasized', textDecoration: 'underline', textDecorationColor: 'accent.emphasized' }}
            _focusVisible={{ color: 'accent.emphasized', textDecoration: 'underline' }}
            onClick={onSignIn}
          >
            Sign up here
          </ChakraLink>
        </Text>
      </Box>

      {/* Floating Brillian mark comes from BrandFloat, rendered app-wide */}
    </Flex>
  );
}
