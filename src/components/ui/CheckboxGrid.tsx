import { Checkbox, SimpleGrid } from '@chakra-ui/react';

interface CheckboxGridProps {
  options: string[];
  columns?: { base?: number; md?: number };
}

export function CheckboxGrid({ options, columns = { base: 1, md: 2 } }: CheckboxGridProps) {
  return (
    <SimpleGrid columns={columns} gap="2">
      {options.map(opt => (
        <Checkbox.Root key={opt} cursor="pointer">
          <Checkbox.HiddenInput />
          <Checkbox.Label
            display="flex"
            alignItems="center"
            gap="2"
            px="2"
            py="2"
            borderWidth="1px"
            borderColor="border"
            rounded="control"
            bg="bg"
            fontSize="13px"
            fontWeight={500}
            color="fg"
            cursor="pointer"
            transition="all 0.15s"
            _hover={{ borderColor: 'brand.muted' }}
            w="full"
          >
            <Checkbox.Control
              w="4"
              h="4"
              flexShrink={0}
              borderColor="border"
              rounded="control"
              _checked={{ bg: 'brand.solid', borderColor: 'brand.solid' }}
            >
              <Checkbox.Indicator />
            </Checkbox.Control>
            {opt}
          </Checkbox.Label>
        </Checkbox.Root>
      ))}
    </SimpleGrid>
  );
}
