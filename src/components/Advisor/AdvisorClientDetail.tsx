import { Badge, Box, Button, Circle, Flex, Heading, HStack, Tabs, Text } from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import Dashboard from '../Dashboard/Dashboard';
import { Card } from '../ui/Card';
import { statusMeta } from './clientsData';
import type { Client } from './clientsData';

interface AdvisorClientDetailProps {
  client: Client;
  onBack: () => void;
  onStartOnboarding: () => void;
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'financials', label: 'Financials' },
  { id: 'notes', label: 'Notes' },
  { id: 'activity', label: 'Activity' },
  { id: 'documents', label: 'Documents' },
];

function PlaceholderTab({ title, body }: { title: string; body: string }) {
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

export function AdvisorClientDetail({ client, onBack, onStartOnboarding }: AdvisorClientDetailProps) {
  const status = statusMeta[client.status];

  return (
    <Box flex="1">
      {/* Client header */}
      <Box bg="bg" borderBottomWidth="1px" borderColor="border" px={{ base: '4', md: '8' }} pt="4">
        <Button intent="ghost" px="0" mb="3" onClick={onBack}>
          <ArrowLeft size={14} />
          Back to clients
        </Button>
        <Flex align="center" gap="4" mb="4" flexWrap="wrap">
          <Circle size="48px" bg={client.logoColor} color="white" fontWeight={700} fontSize="18px" rounded="md" flexShrink={0}>
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

        {/* Tabs */}
        <Tabs.Root defaultValue="overview" variant="line">
          <Tabs.List borderBottomWidth="0">
            {TABS.map(tab => (
              <Tabs.Trigger key={tab.id} value={tab.id} px="4" py="3" fontSize="14px" fontWeight={500}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="overview" p="0">
            <Dashboard onStartOnboarding={onStartOnboarding} />
          </Tabs.Content>
          <Tabs.Content value="financials" p="0">
            <PlaceholderTab
              title="Financials"
              body="Detailed P&L, balance sheet, and cash-flow drilldowns will appear here once the data feed is wired in."
            />
          </Tabs.Content>
          <Tabs.Content value="notes" p="0">
            <PlaceholderTab
              title="Notes"
              body="Private advisor notes, meeting summaries, and internal client context. Not visible to the business owner."
            />
          </Tabs.Content>
          <Tabs.Content value="activity" p="0">
            <PlaceholderTab
              title="Activity"
              body="Timeline of every change, login, document upload, and conversation across this client."
            />
          </Tabs.Content>
          <Tabs.Content value="documents" p="0">
            <PlaceholderTab
              title="Documents"
              body="Tax returns, financial statements, legal docs, and any files the client has uploaded."
            />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
}
