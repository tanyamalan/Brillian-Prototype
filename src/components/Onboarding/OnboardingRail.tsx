import { Box, Button, Circle, HStack, Progress, Stack, Text } from '@chakra-ui/react';
import { Check } from 'lucide-react';

export interface OnboardingStep {
  num: number;
  label: string;
}

interface OnboardingRailProps {
  steps: OnboardingStep[];
  currentStep: number;
  completedSteps: Set<number>;
  goToStep: (n: number) => void;
}

export function OnboardingRail({ steps, currentStep, completedSteps, goToStep }: OnboardingRailProps) {
  return (
    <Box w="full" h="full" bg="bg" p="6" px="4" overflowY="auto">
      <Box pb="1" px="2">
        <Text
          fontSize="11px"
          fontWeight={600}
          letterSpacing="0.6px"
          textTransform="uppercase"
          color="fg.subtle"
          mb="2"
        >
          Your progress
        </Text>
        <HStack gap="2" fontSize="12px" color="fg.muted">
          <Progress.Root flex="1" value={(currentStep / steps.length) * 100} size="xs">
            <Progress.Track h="1" bg="border" rounded="full">
              <Progress.Range bg="brand.solid" rounded="full" />
            </Progress.Track>
          </Progress.Root>
          <Text fontWeight={600} color="fg" fontVariantNumeric="tabular-nums">
            {currentStep}/{steps.length}
          </Text>
        </HStack>
      </Box>
      <Stack gap="0.5" mt="4">
        {steps.map(s => {
          const isActive = s.num === currentStep;
          const isComplete = completedSteps.has(s.num);
          const canClick = isComplete || s.num <= currentStep;
          return (
            <Button
              key={s.num}
              variant="ghost"
              h="11"
              px="2"
              w="full"
              justifyContent="flex-start"
              gap="2"
              rounded="sm"
              bg={isActive ? 'bg.dim' : 'transparent'}
              _hover={{ bg: 'bg.dim' }}
              onClick={() => canClick && goToStep(s.num)}
            >
              <Circle
                size="6"
                bg={isActive || isComplete ? 'brand.solid' : 'bg'}
                borderWidth={isActive || isComplete ? 0 : '1px'}
                borderColor="border.emphasized"
                boxShadow={isActive ? '0 0 0 3px var(--chakra-colors-brand-subtle)' : 'none'}
                color="fg.onBrand"
                flexShrink={0}
              >
                {isComplete && !isActive && <Check size={12} strokeWidth={3} />}
              </Circle>
              <Text
                fontSize="14px"
                fontWeight={isActive ? 600 : 500}
                color={isActive || isComplete ? 'fg' : 'fg.muted'}
                lineHeight="1.3"
                truncate
              >
                {s.label}
              </Text>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
