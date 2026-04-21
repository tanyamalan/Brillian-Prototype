import { ChakraProvider } from '@chakra-ui/react';
import { system } from './system';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
