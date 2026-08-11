import { Box, Field, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Card } from './Card';

export function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box mb="6">
      <Heading
        as="h1"
        fontSize={{ base: '22px', md: '28px' }}
        fontWeight={500}
        color="fg"
        letterSpacing="-0.4px"
        lineHeight="1.15"
        mb="1.5"
      >
        {title}
      </Heading>
      <Text fontSize="14px" color="fg.muted">
        {subtitle}
      </Text>
    </Box>
  );
}

export function StepLayout({
  forms,
  sidebar,
}: {
  forms: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gridTemplateColumns={{ base: '1fr', md: '1fr 280px', '2xl': '1fr 400px' }}
      gap="6"
      alignItems="start"
    >
      <Stack gap="4">{forms}</Stack>
      {sidebar}
    </SimpleGrid>
  );
}

export function FormCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Card>
      {title && (
        <Text fontSize="16px" fontWeight={600} color="fg" mb="2">
          {title}
        </Text>
      )}
      <Stack gap="4">{children}</Stack>
    </Card>
  );
}

/**
 * A "section question" — blue bold heading with help text, then children.
 * Used for the primary questions in each onboarding step.
 */
export function Question({
  title,
  help,
  children,
}: {
  title: string;
  help?: string;
  children?: React.ReactNode;
}) {
  return (
    <Box>
      <Text fontSize={{ base: '14px', md: '15px' }} fontWeight={600} color="fg" lineHeight="1.3" mb={help ? '1' : '2'}>
        {title}
      </Text>
      {help && (
        <Text fontSize="13px" color="fg.muted" mb="3" lineHeight="1.5">
          {help}
        </Text>
      )}
      {children}
    </Box>
  );
}

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <Field.Root
      // Guide: focused field shifts its label to Forest along with the border.
      css={{ '&:focus-within label': { color: 'var(--chakra-colors-forest-700)' } }}
    >
      <Field.Label textStyle="label" color="fg.muted" mb="1.5">
        {label}
        {hint && (
          <Text as="span" fontWeight={400} color="fg.subtle" fontSize="12px" ml="1.5">
            {hint}
          </Text>
        )}
      </Field.Label>
      {children}
    </Field.Root>
  );
}
