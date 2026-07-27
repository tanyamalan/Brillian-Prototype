import {
  Badge,
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ArrowRight, Lock } from 'lucide-react';
import { Card } from '../ui/Card';

interface OnboardingPageProps {
  onStartForm: () => void;
}

interface Step {
  num: number;
  title: string;
  description: string;
  status: 'action' | 'locked';
  actionLabel?: string;
}

const steps: Step[] = [
  {
    num: 1,
    title: 'Complete your business profile',
    description:
      "Tell us about your business, revenue, team, and goals so we can generate your valuation and benchmarks.",
    status: 'action',
    actionLabel: 'Start Setup',
  },
  {
    num: 2,
    title: 'Connect your accounting software',
    description:
      'Link QuickBooks, Xero, or upload financial statements to keep your data up to date automatically.',
    status: 'locked',
  },
  {
    num: 3,
    title: 'Review your initial valuation',
    description:
      'See your estimated business value, SDE breakdown, and how you compare to industry peers.',
    status: 'locked',
  },
  {
    num: 4,
    title: 'Explore your opportunities',
    description:
      'Discover actionable recommendations to close the gap between your current and target valuation.',
    status: 'locked',
  },
  {
    num: 5,
    title: 'Set your goals & timeline',
    description:
      'Define your exit or growth targets and let Brillian build a personalized action plan.',
    status: 'locked',
  },
];

export default function OnboardingPage({ onStartForm }: OnboardingPageProps) {
  return (
    <Box px={{ base: '4', md: '8' }} py="6" maxW="container.flow" w="full" mx="auto">
      <Flex
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        flexDir={{ base: 'column', md: 'row' }}
        gap="4"
        mb="8"
      >
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={500}
            color="fg"
            mb="1"
          >
            Get started with Brillian
          </Heading>
          <Text fontSize="15px" color="fg.muted">
            Complete these steps to unlock your full dashboard and insights.
          </Text>
        </Box>
        <Card p="2" px="4" flexShrink={0}>
          <Text fontSize="13px" fontWeight={600} color="fg.muted">
            0 of {steps.length} complete
          </Text>
        </Card>
      </Flex>

      <Stack gap="2">
        {steps.map(step => {
          const isAction = step.status === 'action';
          const isLocked = step.status === 'locked';
          return (
            <Card
              key={step.num}
              opacity={isLocked ? 0.55 : 1}
              borderLeftWidth={isAction ? '3px' : 0}
              borderLeftColor={isAction ? 'brand.solid' : 'transparent'}
            >
              <Flex
                align={{ base: 'flex-start', md: 'center' }}
                gap="4"
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
              >
                <Circle
                  size="40px"
                  bg={isAction ? 'brand.solid' : 'bg.dim'}
                  color={isAction ? 'white' : 'fg.subtle'}
                  fontWeight={700}
                  fontSize="16px"
                  flexShrink={0}
                >
                  {isLocked ? <Lock size={18} /> : step.num}
                </Circle>
                <Box flex="1" minW="0">
                  <Text fontSize="15px" fontWeight={600} color="fg" mb="1">
                    {step.title}
                  </Text>
                  <Text fontSize="13px" color="fg.muted" lineHeight="1.5">
                    {step.description}
                  </Text>
                </Box>
                {isAction && (
                  <Button
                    intent="primary"
                    flexShrink={0}
                    w={{ base: 'full', md: 'auto' }}
                    onClick={onStartForm}
                  >
                    {step.actionLabel}
                    <ArrowRight size={14} />
                  </Button>
                )}
                {isLocked && (
                  <Badge variant="plain" color="fg.subtle" fontSize="12px" fontWeight={600} flexShrink={0}>
                    Locked
                  </Badge>
                )}
              </Flex>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
