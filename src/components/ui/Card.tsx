import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

export function Card(props: BoxProps) {
  return (
    <Box
      bg="bg"
      shadow="card"
      rounded="md"
      p="6"
      {...props}
    />
  );
}
