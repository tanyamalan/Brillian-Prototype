import { Badge, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import Dashboard from '../Dashboard/Dashboard';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { CompanyProfile } from '../Company/CompanyProfile';
import { AdvisorDocuments } from './AdvisorDocuments';
import { getClient, statusMeta } from './clientsData';

interface AdvisorClientDetailProps {
  clientId: string;
  lens: string; // 'dashboard' | 'valuation' | 'benchmarks' | 'opportunities' | 'actions'
  onStartOnboarding: () => void;
}

const lensTitles: Record<string, { title: string; body: string }> = {
  valuation: {
    title: 'Valuation',
    body: "Detailed valuation models, multiples, and scenario projections will appear here.",
  },
  benchmarks: {
    title: 'Benchmarks',
    body: "Side-by-side benchmarks against industry peers across every key metric.",
  },
  opportunities: {
    title: 'Opportunities',
    body: "Full list of opportunities with detailed action plans and expected enterprise value lift.",
  },
  actions: {
    title: 'Action Items',
    body: "Tasks for this client — assigned owner, due date, and status.",
  },
};

function ClientHeader({ clientId }: { clientId: string }) {
  const client = getClient(clientId);
  if (!client) return null;
  const status = statusMeta[client.status];
  return (
    <Box bg="bg" borderBottomWidth="1px" borderColor="border.subtle" px={{ base: '4', md: '8' }} py="4">
      <Flex align="center" gap="4" flexWrap="wrap">
        <Avatar size="xl" color={client.logoColor} label={client.initials} />
        <Box flex="1" minW="0">
          <HStack gap="2" mb="0.5" flexWrap="wrap">
            <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500} color="fg">
              {client.name}
            </Heading>
            <Badge intent={status.intent} fontSize="11px">
              {status.label}
            </Badge>
          </HStack>
          <Text fontSize="13px" color="fg.muted">
            {client.industry} · Owner: {client.owner} · Last activity {client.lastActivity}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

function PlaceholderLens({ title, body }: { title: string; body: string }) {
  return (
    <Box px={{ base: '4', md: '8' }} py="6">
      <Card size="lg" textAlign="center">
        <Heading as="h2" fontSize="lg" fontWeight={500} color="fg" mb="2">
          {title}
        </Heading>
        <Text fontSize="14px" color="fg.muted" maxW="480px" mx="auto">
          {body}
        </Text>
      </Card>
    </Box>
  );
}

export function AdvisorClientDetail({ clientId, lens, onStartOnboarding }: AdvisorClientDetailProps) {
  const lensConfig = lensTitles[lens];
  const client = getClient(clientId);

  return (
    <Box flex="1">
      <ClientHeader clientId={clientId} />
      {lens === 'dashboard' ? (
        <Dashboard onStartOnboarding={onStartOnboarding} />
      ) : lens === 'documents' ? (
        <AdvisorDocuments clientId={clientId} />
      ) : lens === 'profile' ? (
        <CompanyProfile companyName={client?.name} />
      ) : lensConfig ? (
        <PlaceholderLens title={lensConfig.title} body={lensConfig.body} />
      ) : (
        <PlaceholderLens title="Coming soon" body="This lens isn't built out yet." />
      )}
    </Box>
  );
}
