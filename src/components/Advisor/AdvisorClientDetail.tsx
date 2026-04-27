import { Badge, Box, Circle, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import Dashboard from '../Dashboard/Dashboard';
import { Card } from '../ui/Card';
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
    <Box bg="bg" borderBottomWidth="1px" borderColor="border" px={{ base: '4', md: '8' }} py="4">
      <Flex align="center" gap="4" flexWrap="wrap">
        <Circle
          size="48px"
          bg={client.logoColor}
          color="white"
          fontWeight={700}
          fontSize="18px"
          rounded="md"
          flexShrink={0}
        >
          {client.initials}
        </Circle>
        <Box flex="1" minW="0">
          <HStack gap="2" mb="0.5" flexWrap="wrap">
            <Heading as="h1" fontSize={{ base: '20px', md: '24px' }} fontWeight={600} color="fg">
              {client.name}
            </Heading>
            <Badge colorPalette={status.palette} rounded="sm" px="2" py="0.5" fontSize="11px" fontWeight={600}>
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
      <Card p={{ base: '6', md: '10' }} textAlign="center">
        <Heading as="h2" fontSize="18px" fontWeight={600} color="fg" mb="2">
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

  return (
    <Box flex="1">
      <ClientHeader clientId={clientId} />
      {lens === 'dashboard' ? (
        <Dashboard onStartOnboarding={onStartOnboarding} />
      ) : lensConfig ? (
        <PlaceholderLens title={lensConfig.title} body={lensConfig.body} />
      ) : (
        <PlaceholderLens title="Coming soon" body="This lens isn't built out yet." />
      )}
    </Box>
  );
}
