import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChevronRight, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { clients, statusMeta } from './clientsData';
import type { Client } from './clientsData';

interface AdvisorClientsListProps {
  onSelectClient: (clientId: string) => void;
}

function ClientRow({ client, onClick }: { client: Client; onClick: () => void }) {
  const status = statusMeta[client.status];
  return (
    <Card
      p="0"
      cursor="pointer"
      transition="box-shadow 0.15s, transform 0.05s"
      _hover={{ shadow: 'card' }}
      _active={{ transform: 'translateY(1px)' }}
      onClick={onClick}
    >
      {/* Desktop / tablet layout — single row with all columns */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        gap="4"
        p="5"
      >
        <Circle size="44px" bg={client.logoColor} color="fg.onBrand" fontWeight={700} fontSize="16px" rounded="md" flexShrink={0}>
          {client.initials}
        </Circle>

        <Box flex="1" minW="180px">
          <HStack gap="2" mb="0.5">
            <Text fontSize="15px" fontWeight={600} color="fg">
              {client.name}
            </Text>
            <Badge colorPalette={status.palette} rounded="sm" px="2" py="0.5" fontSize="10px" fontWeight={600}>
              {status.label}
            </Badge>
          </HStack>
          <Text fontSize="12px" color="fg.muted">
            {client.industry} · {client.owner}
          </Text>
        </Box>

        {/* Valuation + goal progress */}
        <Box minW="200px" flex="0 0 200px">
          <HStack gap="2" align="baseline" mb="1">
            <Text fontSize="16px" fontWeight={700} color="fg">
              {client.valuation}
            </Text>
            <Text fontSize="11px" color="fg.subtle">
              of {client.valuationGoal}
            </Text>
          </HStack>
          <Progress.Root value={client.goalProgress} size="xs" colorPalette="brand">
            <Progress.Track h="1" bg="bg.subtle" rounded="full">
              <Progress.Range bg="brand.solid" rounded="full" />
            </Progress.Track>
          </Progress.Root>
        </Box>

        {/* Action items */}
        <Box textAlign="center" minW="80px" flexShrink={0}>
          <Text fontSize="18px" fontWeight={700} color={client.actionItems > 5 ? 'brl.danger' : 'fg'}>
            {client.actionItems}
          </Text>
          <Text fontSize="11px" color="fg.subtle" lineHeight="1.2">
            action items
          </Text>
        </Box>

        <Box textAlign="right" minW="72px" flexShrink={0}>
          <Text fontSize="11px" color="fg.subtle">Last activity</Text>
          <Text fontSize="13px" fontWeight={500} color="fg.muted">
            {client.lastActivity}
          </Text>
        </Box>

        <Box color="fg.subtle" flexShrink={0}>
          <ChevronRight size={20} />
        </Box>
      </Flex>

      {/* Mobile layout — stacked */}
      <Box display={{ base: 'block', md: 'none' }} p="4">
        <Flex align="center" gap="3" mb="3">
          <Circle size="40px" bg={client.logoColor} color="fg.onBrand" fontWeight={700} fontSize="15px" rounded="md" flexShrink={0}>
            {client.initials}
          </Circle>
          <Box flex="1" minW="0">
            <HStack gap="2" mb="0.5" flexWrap="wrap">
              <Text fontSize="14px" fontWeight={600} color="fg" truncate>
                {client.name}
              </Text>
              <Badge colorPalette={status.palette} rounded="sm" px="2" py="0.5" fontSize="10px" fontWeight={600}>
                {status.label}
              </Badge>
            </HStack>
            <Text fontSize="11px" color="fg.muted" truncate>
              {client.industry} · {client.owner}
            </Text>
          </Box>
          <Box color="fg.subtle" flexShrink={0}>
            <ChevronRight size={18} />
          </Box>
        </Flex>

        {/* Valuation row */}
        <HStack gap="2" align="baseline" mb="1">
          <Text fontSize="15px" fontWeight={700} color="fg">
            {client.valuation}
          </Text>
          <Text fontSize="11px" color="fg.subtle">
            of {client.valuationGoal}
          </Text>
        </HStack>
        <Progress.Root value={client.goalProgress} size="xs" colorPalette="brand" mb="3">
          <Progress.Track h="1" bg="bg.subtle" rounded="full">
            <Progress.Range bg="brand.solid" rounded="full" />
          </Progress.Track>
        </Progress.Root>

        {/* Mini meta row */}
        <Flex justify="space-between" fontSize="11px" color="fg.subtle">
          <Text>
            <Text as="span" fontWeight={700} color={client.actionItems > 5 ? 'brl.danger' : 'fg'}>
              {client.actionItems}
            </Text>
            {' '}action {client.actionItems === 1 ? 'item' : 'items'}
          </Text>
          <Text>Active {client.lastActivity}</Text>
        </Flex>
      </Box>
    </Card>
  );
}

function StatTile({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <Card>
      <Text fontSize="12px" fontWeight={600} color="fg.muted" textTransform="uppercase" letterSpacing="0.5px" mb="1">
        {label}
      </Text>
      <Text fontSize="28px" fontWeight={700} color="fg" lineHeight="1.1">
        {value}
      </Text>
      {sublabel && (
        <Text fontSize="12px" color="fg.subtle" mt="1">
          {sublabel}
        </Text>
      )}
    </Card>
  );
}

export function AdvisorClientsList({ onSelectClient }: AdvisorClientsListProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q)
    );
  }, [query]);

  const totalActionItems = clients.reduce((sum, c) => sum + c.actionItems, 0);
  const atRiskCount = clients.filter(c => c.status === 'at-risk').length;

  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6">
      <Flex
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        flexDir={{ base: 'column', md: 'row' }}
        gap="4"
        mb="6"
      >
        <Box>
          <Heading as="h1" fontSize={{ base: '20px', md: '24px' }} fontWeight={500} color="fg" mb="1">
            Clients
          </Heading>
          <Text fontSize="14px" color="fg.muted">
            {clients.length} businesses across your portfolio
          </Text>
        </Box>
      </Flex>

      {/* Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mb="6">
        <StatTile label="Total clients" value={String(clients.length)} sublabel="2 added this month" />
        <StatTile label="Portfolio value" value="$26.8M" sublabel="across active clients" />
        <StatTile label="Open action items" value={String(totalActionItems)} sublabel="across all clients" />
        <StatTile
          label="At risk"
          value={String(atRiskCount)}
          sublabel={atRiskCount === 1 ? 'client needs attention' : 'clients need attention'}
        />
      </SimpleGrid>

      {/* Search */}
      <Flex mb="4">
        <InputGroup
          maxW={{ base: 'full', md: '360px' }}
          flex="1"
          startElement={<Search size={16} color="var(--chakra-colors-fg-subtle)" />}
        >
          <Input
            placeholder="Search by name, industry, or owner"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>

      {/* Client rows */}
      {filtered.length === 0 ? (
        <Card>
          <Text fontSize="14px" color="fg.muted" textAlign="center" py="8">
            No clients match "{query}".
          </Text>
        </Card>
      ) : (
        <Stack gap="2">
          {filtered.map(client => (
            <ClientRow key={client.id} client={client} onClick={() => onSelectClient(client.id)} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
