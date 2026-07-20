import { useState } from 'react';
import { Box, Drawer, Heading, Portal, Text } from '@chakra-ui/react';
import AppShell from './components/shared/AppShell';
import Dashboard from './components/Dashboard/Dashboard';
import OnboardingPage from './components/OnboardingPage/OnboardingPage';
import Onboarding from './components/Onboarding/Onboarding';
import { AdvisorClientsList } from './components/Advisor/AdvisorClientsList';
import { AdvisorClientDetail } from './components/Advisor/AdvisorClientDetail';
import { CompanyProfile } from './components/Company/CompanyProfile';
import { Card } from './components/ui/Card';
import type { ViewMode } from './components/shared/navConfig';

export type { ViewMode } from './components/shared/navConfig';

// Default selected inner-panel item per outer section, per view mode.
const DEFAULT_INNER: Record<ViewMode, Record<string, string>> = {
  owner: {
    home: 'dashboard',
    documents: 'all',
    reports: 'all',
    settings: 'profile',
  },
  advisor: {
    home: 'overview',
    clients: 'all',
    activity: 'all',
    reports: 'all',
    settings: 'profile',
  },
};

function PlaceholderPage({ title, body }: { title: string; body: string }) {
  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6">
      <Card p={{ base: '6', md: '10' }} textAlign="center">
        <Heading as="h2" fontSize="20px" fontWeight={500} color="fg" mb="2">
          {title}
        </Heading>
        <Text fontSize="14px" color="fg.muted" maxW="480px" mx="auto">
          {body}
        </Text>
      </Card>
    </Box>
  );
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('owner');
  const [outerSection, setOuterSection] = useState<string>('home');
  const [innerActiveId, setInnerActiveId] = useState<string>('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setSelectedClientId(null);
    setOuterSection('home');
    setInnerActiveId(DEFAULT_INNER[mode].home);
  };

  const handleOuterSectionChange = (id: string) => {
    setOuterSection(id);
    setSelectedClientId(null);
    setInnerActiveId(DEFAULT_INNER[viewMode][id] ?? 'overview');
  };

  const handleSelectClient = (id: string | null) => {
    if (id) {
      setOuterSection('clients');
      // First-time selection (coming from the clients list) lands on Dashboard.
      // Switching from one client to another preserves whatever lens the
      // advisor was already on (e.g. Documents → Documents).
      if (!selectedClientId) {
        setInnerActiveId('dashboard');
      }
    } else {
      setInnerActiveId('all');
    }
    setSelectedClientId(id);
  };

  // Owner view has no inner panel — the rail selection maps straight to a page.
  const renderOwnerContent = () => {
    switch (outerSection) {
      case 'home':
        return <Dashboard onStartOnboarding={() => setShowOnboardingForm(true)} />;
      case 'profile':
        return <CompanyProfile />;
      case 'onboarding':
        return <OnboardingPage onStartForm={() => setShowOnboardingForm(true)} />;
      default:
        return <PlaceholderPage title={titleFor(outerSection)} body="Section placeholder. Build this out next." />;
    }
  };

  const renderAdvisorContent = () => {
    if (outerSection === 'home') {
      if (innerActiveId === 'tasks') {
        return <PlaceholderPage title="My tasks" body="Action items assigned to you across the portfolio." />;
      }
      return (
        <PlaceholderPage
          title="Welcome back, Sarah"
          body="Your personal advisor home — recent activity, upcoming deadlines, and quick access to clients needing attention will live here."
        />
      );
    }
    if (outerSection === 'clients') {
      if (selectedClientId) {
        return (
          <AdvisorClientDetail
            clientId={selectedClientId}
            lens={innerActiveId}
            onStartOnboarding={() => setShowOnboardingForm(true)}
          />
        );
      }
      // No client selected — show the appropriate sub-section
      if (innerActiveId === 'pipeline') {
        return <PlaceholderPage title="Pipeline" body="Clients grouped by stage: onboarding, active, at risk, exiting." />;
      }
      if (innerActiveId === 'team') {
        return <PlaceholderPage title="Team" body="Manage advisors and assignments to clients." />;
      }
      return <AdvisorClientsList onSelectClient={(id) => handleSelectClient(id)} />;
    }
    if (outerSection === 'activity') {
      const subTitle =
        innerActiveId === 'documents' ? 'Document uploads'
        : innerActiveId === 'clients' ? 'Client changes'
        : innerActiveId === 'reports' ? 'Reports & exports'
        : 'All activity';
      return (
        <PlaceholderPage
          title={subTitle}
          body="A timeline of every change, login, document upload, and conversation across your portfolio."
        />
      );
    }
    return <PlaceholderPage title={titleFor(outerSection)} body="Section placeholder. Build this out next." />;
  };

  return (
    <>
      <AppShell
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        outerSection={outerSection}
        onOuterSectionChange={handleOuterSectionChange}
        innerActiveId={innerActiveId}
        onInnerSelect={setInnerActiveId}
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

function titleFor(id: string): string {
  return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
}

export default App;
