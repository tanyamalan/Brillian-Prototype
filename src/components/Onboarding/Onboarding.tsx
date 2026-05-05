import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Portal,
  Text,
} from '@chakra-ui/react';
import { ArrowLeft, ArrowRight, Check, LogOut, Menu } from 'lucide-react';
import ExitDialog from './ExitDialog';
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
        borderColor="border"
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
          borderColor="border"
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
              rounded="sm"
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
              borderColor="border"
              display={{ base: 'none', md: 'inline' }}
            >
              Step {currentStep} of {STEPS.length}
            </Text>
          </HStack>
          <Button intent="secondary" onClick={() => setShowExitDialog(true)}>
            Save &amp; Exit
            <LogOut size={12} />
          </Button>
        </Flex>

        {/* Content */}
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
          </Box>
        </Box>

        {/* Footer */}
        <Flex
          align="center"
          justify="space-between"
          px={{ base: '4', md: '8' }}
          py={{ base: '2', md: '4' }}
          borderTopWidth="1px"
          borderColor="border"
          bg="bg"
          gap="2"
          flexShrink={0}
        >
          <Box flex={{ base: 1, md: 'initial' }}>
            <Button
              intent="ghost"
              borderWidth={{ base: '1px', md: 0 }}
              borderColor="border.emphasized"
              w={{ base: 'full', md: 'auto' }}
              justifyContent="center"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={14} />
              Back
            </Button>
          </Box>
          <HStack gap="2" flex={{ base: 1, md: 'initial' }}>
            <Button
              intent="primary"
              w={{ base: 'full', md: 'auto' }}
              justifyContent="center"
              onClick={handleNext}
              disabled={!isStepValid}
            >
              {isLastStep ? 'Finish setup' : 'Save and continue'}
              {isLastStep ? <Check size={14} /> : <ArrowRight size={14} />}
            </Button>
          </HStack>
        </Flex>
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
