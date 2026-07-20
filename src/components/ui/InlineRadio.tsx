import { Box, HStack, RadioCard } from '@chakra-ui/react';

interface InlineRadioOption {
  value: string;
  label: string;
}

interface InlineRadioProps {
  name: string;
  options: InlineRadioOption[];
  defaultValue?: string;
}

/**
 * Inline radio chips: a softly bordered pill with a circle indicator + label.
 * Lighter border, generous padding, brand-tinted when selected.
 */
export function InlineRadio({ name, options, defaultValue }: InlineRadioProps) {
  return (
    <RadioCard.Root name={name} defaultValue={defaultValue}>
      <HStack gap="3" flexWrap="wrap">
        {options.map(opt => (
          <RadioCard.Item key={opt.value} value={opt.value} cursor="pointer">
            <RadioCard.ItemHiddenInput name={name} />
            <RadioCard.ItemControl
              gap="2.5"
              px="4"
              py="2.5"
              borderWidth="0"
              rounded="control"
              bg="bg"
              transition="all 0.15s"
              _hover={{ bg: 'bg.dim' }}
              _checked={{ bg: 'brand.subtle' }}
            >
              {/* Circle indicator — fills brand when checked */}
              <Box
                boxSize="16px"
                rounded="full"
                borderWidth="1px"
                borderColor="border"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.15s"
                flexShrink={0}
                css={{
                  '[data-state=checked] &': {
                    borderColor: 'var(--chakra-colors-brand-solid)',
                  },
                }}
              >
                <Box
                  boxSize="7px"
                  rounded="full"
                  bg="brand.solid"
                  opacity={0}
                  transition="opacity 0.15s"
                  css={{
                    '[data-state=checked] &': { opacity: 1 },
                  }}
                />
              </Box>
              <RadioCard.ItemText fontSize="13px" fontWeight={500} color="fg">
                {opt.label}
              </RadioCard.ItemText>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  );
}

export const yesNoOptions: InlineRadioOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];
