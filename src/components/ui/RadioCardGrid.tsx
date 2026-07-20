import { RadioCard, SimpleGrid } from '@chakra-ui/react';

interface RadioOption {
  value: string;
  title: string;
  desc: string;
}

interface RadioCardGridProps {
  name: string;
  options: RadioOption[];
  columns?: { base?: number; md?: number };
}

export function RadioCardGrid({ name, options, columns = { base: 2, md: 4 } }: RadioCardGridProps) {
  return (
    <RadioCard.Root name={name} defaultValue="">
      <SimpleGrid columns={columns} gap="2">
        {options.map(opt => (
          <RadioCard.Item key={opt.value} value={opt.value} cursor="pointer">
            <RadioCard.ItemHiddenInput name={name} />
            <RadioCard.ItemControl
              p="4"
              borderWidth="1px"
              borderColor="border.emphasized"
              rounded="md"
              bg="bg"
              transition="all 0.15s"
              _hover={{ borderColor: 'brand.muted' }}
              _checked={{
                borderColor: 'brand.solid',
                bg: 'brand.subtle',
                boxShadow: '0 0 0 1px var(--chakra-colors-brand-solid)',
              }}
            >
              <RadioCard.ItemContent>
                <RadioCard.ItemText fontSize="13px" fontWeight={600} color="fg" mb="0.5">
                  {opt.title}
                </RadioCard.ItemText>
                <RadioCard.ItemDescription fontSize="11px" color="fg.subtle" lineHeight="1.4">
                  {opt.desc}
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </SimpleGrid>
    </RadioCard.Root>
  );
}
