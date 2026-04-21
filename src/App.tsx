import { useState } from 'react';
import { Drawer, Portal } from '@chakra-ui/react';
import AppShell from './components/shared/AppShell';
import Dashboard from './components/Dashboard/Dashboard';
import OnboardingPage from './components/OnboardingPage/OnboardingPage';
import Onboarding from './components/Onboarding/Onboarding';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  const renderContent = () => {
    switch (activeNav) {
      case 'onboarding':
        return <OnboardingPage onStartForm={() => setShowOnboardingForm(true)} />;
      default:
        return <Dashboard onStartOnboarding={() => setShowOnboardingForm(true)} />;
    }
  };

  return (
    <>
      <AppShell activeNav={activeNav} onNavChange={setActiveNav}>
        {renderContent()}
      </AppShell>
      <Drawer.Root
        open={showOnboardingForm}
        onOpenChange={(e) => setShowOnboardingForm(e.open)}
        placement="bottom"
        size="full"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content height="100dvh" maxH="100dvh">
              <Onboarding onExit={() => setShowOnboardingForm(false)} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}

export default App;
