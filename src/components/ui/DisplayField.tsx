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
      <Text fontSize="13px" fontWeight={500} color="fg" mb="1.5">
        {label}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        minH="control"
        px="3"
        py="2"
        rounded="control"
        bg="bg"
        borderWidth="0.5px"
        borderColor="border"
        fontSize="14px"
        color={isEmpty ? 'fg.subtle' : 'fg.muted'}
      >
        {isEmpty ? '—' : value}
      </Box>
    </Box>
  );
}
