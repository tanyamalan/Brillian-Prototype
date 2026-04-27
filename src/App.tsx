import { useState } from 'react';
import { Drawer, Portal } from '@chakra-ui/react';
import AppShell from './components/shared/AppShell';
import Dashboard from './components/Dashboard/Dashboard';
import OnboardingPage from './components/OnboardingPage/OnboardingPage';
import Onboarding from './components/Onboarding/Onboarding';
import { AdvisorClientsList } from './components/Advisor/AdvisorClientsList';
import { AdvisorClientDetail } from './components/Advisor/AdvisorClientDetail';
import { getClient } from './components/Advisor/clientsData';

export type ViewMode = 'owner' | 'advisor';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('owner');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [advisorActiveNav, setAdvisorActiveNav] = useState('clients');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setSelectedClientId(null);
    if (mode === 'advisor') {
      setAdvisorActiveNav('clients');
    } else {
      setActiveNav('dashboard');
    }
  };

  const handleSelectClient = (id: string) => {
    setSelectedClientId(id);
  };

  const renderOwnerContent = () => {
    switch (activeNav) {
      case 'onboarding':
        return <OnboardingPage onStartForm={() => setShowOnboardingForm(true)} />;
      default:
        return <Dashboard onStartOnboarding={() => setShowOnboardingForm(true)} />;
    }
  };

  const renderAdvisorContent = () => {
    if (selectedClientId) {
      const client = getClient(selectedClientId);
      if (client) {
        return (
          <AdvisorClientDetail
            client={client}
            onBack={() => setSelectedClientId(null)}
            onStartOnboarding={() => setShowOnboardingForm(true)}
          />
        );
      }
    }
    return <AdvisorClientsList onSelectClient={handleSelectClient} />;
  };

  return (
    <>
      <AppShell
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        activeNav={viewMode === 'owner' ? activeNav : advisorActiveNav}
        onNavChange={viewMode === 'owner' ? setActiveNav : setAdvisorActiveNav}
        selectedClientId={selectedClientId}
        onSelectClient={handleSelectClient}
      >
        {viewMode === 'owner' ? renderOwnerContent() : renderAdvisorContent()}
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
