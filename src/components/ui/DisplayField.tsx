import { Box, Text } from '@chakra-ui/react';

interface DisplayFieldProps {
  /** Field label shown above the value. */
  label: string;
  /** The value to display (falls back to an em-dash when empty). */
  value?: React.ReactNode;
}

/**
 * DisplayField — read-only counterpart to a form input. Renders a label above
 * a subtle, input-styled box holding the value. Use in detail / profile views
 * where the same data is editable elsewhere behind an Edit action.
 */
export function DisplayField({ label, value }: DisplayFieldProps) {
  const isEmpty = value === undefined || value === null || value === '';
  return (
    <Box>
      <Text fontSize="13px" fontWeight={600} color="fg.muted" mb="1.5">
        {label}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        minH="control"
        px="3"
        py="2"
        rounded="control"
        bg="input.bgReadonly"
        borderWidth="1px"
        borderColor="input.borderRest"
        fontSize="sm"
        color={isEmpty ? 'fg.subtle' : 'fg'}
      >
        {isEmpty ? '—' : value}
      </Box>
    </Box>
  );
}
