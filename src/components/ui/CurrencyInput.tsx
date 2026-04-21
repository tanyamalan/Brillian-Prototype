import { Input, InputGroup, Text } from '@chakra-ui/react';

export function CurrencyInput({
  placeholder,
  required,
}: {
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <InputGroup
      startElement={
        <Text color="fg.subtle" fontSize="14px" fontWeight={500}>$</Text>
      }
    >
      <Input placeholder={placeholder} required={required} />
    </InputGroup>
  );
}
