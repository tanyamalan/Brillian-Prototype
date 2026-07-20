import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import ExitDialog from './ExitDialog';
import { CoBrand } from '../ui/CoBrand';
import { checkValidity } from './checkValidity';
import { OnboardingRail } from './OnboardingRail';
import type { OnboardingStep } from './OnboardingRail';
import OwnerMotivations from './steps/OwnerMotivations';
import BusinessProfile from './steps/BusinessProfile';
import Finances from './steps/Finances';
import FinancialPerformance from './steps/FinancialPerformance';
import Adjustments from './steps/Adjustments';
import Ownership from './steps/Ownership';
import Risk from './steps/Risk';
import Personnel from './steps/Personnel';
import MarketContext from './steps/MarketContext';

const STEPS: OnboardingStep[] = [
  { num: 1, label: 'Owner & Motivations' },
  { num: 2, label: 'Business profile' },
  { num: 3, label: 'Finances' },
  { num: 4, label: 'Financial performance' },
  { num: 5, label: 'Adjustments' },
  { num: 6, label: 'Ownership' },
  { num: 7, label: 'Risk' },
  { num: 8, label: 'Personnel' },
  { num: 9, label: 'Market Context' },
];

const STEP_COMPONENTS = [
  OwnerMotivations,
  BusinessProfile,
  Finances,
  FinancialPerformance,
  Adjustments,
  Ownership,
  Risk,
  Personnel,
  MarketContext,
];

interface OnboardingProps {
  onExit: () => void;
}

export default function Onboarding({ onExit }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);
  // Direction the user is moving through the flow — drives the slide animation.
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const contentRef = useRef<HTMLDivElement | null>(null);

  const recomputeValidity = useCallback(() => {
    setIsStepValid(checkValidity(contentRef.current));
  }, []);

  // Recompute when step changes (ref populates after render).
  useEffect(() => {
    const id = window.setTimeout(recomputeValidity, 0);
    return () => clearTimeout(id);
  }, [currentStep, recomputeValidity]);

  const goToStep = useCallback(
    (n: number) => {
      if (n < 1 || n > STEPS.length) return;
      setDirection(n >= currentStep ? 'forward' : 'back');
      setCompletedSteps(prev => new Set(prev).add(currentStep));
      setCurrentStep(n);
      setRailOpen(false);
    },
    [currentStep]
  );

  const handleNext = () => {
    if (!isStepValid) return;
    if (currentStep < STEPS.length) {
      goToStep(currentStep + 1);
    } else {
      setCompletedSteps(prev => new Set(prev).add(currentStep));
      setTimeout(() => onExit(), 400);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  };

  const StepComponent = STEP_COMPONENTS[currentStep - 1]!;
  const isLastStep = currentStep === STEPS.length;

  return (
    <Flex bg="bg.dim" h="full" w="full" onInput={recomputeValidity} onChange={recomputeValidity}>
      {/* Desktop rail */}
      <Box
        as="nav"
        w="240px"
        flexShrink={0}
        borderRightWidth="1px"
        borderColor="border.subtle"
        display={{ base: 'none', md: 'block' }}
      >
        <OnboardingRail
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
          goToStep={goToStep}
        />
      </Box>

      {/* Mobile rail drawer */}
      <Drawer.Root
        open={railOpen}
        onOpenChange={e => setRailOpen(e.open)}
        placement="start"
        size="xs"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content w="280px" h="100dvh">
              <OnboardingRail
                steps={STEPS}
                currentStep={currentStep}
                completedSteps={completedSteps}
                goToStep={goToStep}
              />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      {/* Main column */}
      <Flex flex="1" flexDir="column" minW="0" h="full">
        {/* Topbar */}
        <Flex
          align="center"
          justify="space-between"
          px={{ base: '4', md: '8' }}
          py="4"
          borderBottomWidth="1px"
          borderColor="border.subtle"
          bg="bg"
          gap="4"
          flexWrap="wrap"
          flexShrink={0}
        >
          <HStack gap="2">
            <IconButton
              variant="outline"
              size="sm"
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={() => setRailOpen(true)}
              aria-label="Open progress menu"
              h="control"
              px="2"
              fontSize="12px"
              fontWeight={500}
              color="fg.muted"
              rounded="md"
            >
              <Menu size={16} />
              <Text as="span">
                {currentStep}/{STEPS.length}
              </Text>
            </IconButton>
            <Text
              fontSize="11px"
              fontWeight={600}
              letterSpacing="0.8px"
              textTransform="uppercase"
              color="brand.solid"
            >
              Brillian Setup
            </Text>
            <Text
              fontSize="12px"
              color="fg.subtle"
              pl="2"
              borderLeftWidth="1px"
              borderColor="border.subtle"
              display={{ base: 'none', md: 'inline' }}
            >
              Step {currentStep} of {STEPS.length}
            </Text>
          </HStack>
          <HStack gap="4">
            {/* Co-brand at the trust-critical moment — the owner is about to
                share financials; their advisor's firm vouches for the ask. */}
            <Box display={{ base: 'none', md: 'block' }}>
              <CoBrand variant="inline" />
            </Box>
            <Button intent="secondary" onClick={() => setShowExitDialog(true)}>
              Finish later
              <X size={14} />
            </Button>
          </HStack>
        </Flex>

        {/* Content (form + inline nav buttons below it) */}
        <Box
          ref={contentRef}
          flex="1"
          overflowY="auto"
          px={{ base: '4', md: '8' }}
          py={{ base: '6', md: '11' }}
        >
          <Box
            key={currentStep}
            animation={`${direction === 'forward' ? 'brl-step-in-fwd' : 'brl-step-in-back'} 0.7s cubic-bezier(0.22, 1, 0.36, 1) both`}
          >
            <StepComponent />

            {/* Inline footer — same grid columns as StepLayout so the buttons
                align with the form column, not the sidebar. */}
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gridTemplateColumns={{ base: '1fr', md: '1fr 280px', '2xl': '1fr 400px' }}
              gap="6"
              mt={{ base: '8', md: '10' }}
            >
              <Flex gap="3" align="stretch">
                <Button
                  intent="primary"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  h="13"
                  w="13"
                  px="0"
                  rounded="lg"
                  flexShrink={0}
                  justifyContent="center"
                  aria-label="Go back"
                >
                  <ArrowLeft size={18} />
                </Button>
                <Button
                  intent="primary"
                  onClick={handleNext}
                  disabled={!isStepValid}
                  h="13"
                  flex="1"
                  rounded="lg"
                  fontSize="15px"
                  justifyContent="center"
                >
                  {isLastStep ? 'Finish setup' : 'Save and Continue'}
                </Button>
              </Flex>
              <Box display={{ base: 'none', md: 'block' }} />
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>

      <ExitDialog
        open={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={() => {
          setShowExitDialog(false);
          onExit();
        }}
      />
    </Flex>
  );
}
