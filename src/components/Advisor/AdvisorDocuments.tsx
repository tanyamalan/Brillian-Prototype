import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Search,
  Upload,
} from 'lucide-react';
import { Card } from '../ui/Card';
import {
  docStatusMeta,
  docTypeMeta,
  documents,
  findClient,
} from './documentsData';
import type { DocumentRecord, DocType } from './documentsData';
import { getClient } from './clientsData';

interface AdvisorDocumentsProps {
  /** Inner-panel filter: 'all' | 'tax' | 'financials' | 'legal' */
  typeFilter?: string;
  /** When provided, scope the page to this client's documents only */
  clientId?: string;
}

function getFileIcon(name: string) {
  if (name.endsWith('.xlsx') || name.endsWith('.csv')) return FileSpreadsheet;
  return FileText;
}

function StatTile({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <Card p="4">
      <Text fontSize="11px" fontWeight={600} color="fg.muted" textTransform="uppercase" letterSpacing="0.5px" mb="1">
        {label}
      </Text>
      <Text fontSize="22px" fontWeight={700} color="fg" lineHeight="1.1">
        {value}
      </Text>
      {sublabel && (
        <Text fontSize="11px" color="fg.subtle" mt="1">
          {sublabel}
        </Text>
      )}
    </Card>
  );
}

function DocumentRow({
  doc,
  showClient = true,
  actionLabel,
}: {
  doc: DocumentRecord;
  showClient?: boolean;
  actionLabel?: string;
}) {
  const Icon = getFileIcon(doc.name);
  const typeBadge = docTypeMeta[doc.type];
  const statusBadge = docStatusMeta[doc.status];
  const client = findClient(doc.clientId);

  return (
    <Flex
      align="center"
      gap="3"
      px="4"
      py="3"
      borderBottomWidth="1px"
      borderColor="border"
      _hover={{ bg: 'bg.dim' }}
      _last={{ borderBottomWidth: 0 }}
    >
      <Box flexShrink={0} color="fg.muted">
        <Icon size={18} />
      </Box>

      <Box flex="2" minW="200px">
        <Text fontSize="13px" fontWeight={600} color="fg" truncate>
          {doc.name}
        </Text>
        <Text fontSize="11px" color="fg.subtle">
          Uploaded by {doc.uploadedBy} · {doc.size}
        </Text>
      </Box>

      {showClient && (
        <HStack flex="1" minW="140px" gap="2">
          {doc.clientId ? (
            <>
              <Circle size="22px" bg={client.color} color="white" fontSize="10px" fontWeight={700} rounded="sm">
                {client.name.charAt(0)}
              </Circle>
              <Text fontSize="12px" color="fg" truncate>
                {client.name}
              </Text>
            </>
          ) : (
            <Text fontSize="12px" color="fg.subtle">
              Internal
            </Text>
          )}
        </HStack>
      )}

      <Box flexShrink={0} minW="90px">
        <Badge colorPalette={typeBadge.color as 'purple' | 'blue' | 'orange' | 'gray'} rounded="sm" px="2" py="0.5" fontSize="10px" fontWeight={600}>
          {typeBadge.label}
        </Badge>
      </Box>

      <Box flexShrink={0} minW="120px">
        <Badge colorPalette={statusBadge.palette} rounded="sm" px="2" py="0.5" fontSize="10px" fontWeight={600}>
          {statusBadge.label}
        </Badge>
      </Box>

      <Box flexShrink={0} w="100px" textAlign="right">
        <Text fontSize="12px" color="fg.muted">
          {doc.uploadedAt}
        </Text>
      </Box>

      {actionLabel ? (
        <Button intent="primary" size="sm" h="9" flexShrink={0}>
          {actionLabel}
        </Button>
      ) : (
        <Button intent="ghost" size="sm" h="9" px="2" flexShrink={0} aria-label="Download">
          <Download size={14} />
        </Button>
      )}
    </Flex>
  );
}

function DocumentsTable({
  rows,
  showClient,
  actionLabel,
  emptyText,
}: {
  rows: DocumentRecord[];
  showClient?: boolean;
  actionLabel?: string;
  emptyText: string;
}) {
  if (rows.length === 0) {
    return (
      <Card p={{ base: '6', md: '10' }} textAlign="center">
        <Text fontSize="14px" color="fg.muted">
          {emptyText}
        </Text>
      </Card>
    );
  }
  return (
    <Card p="0" overflow="hidden">
      {rows.map(d => (
        <DocumentRow key={d.id} doc={d} showClient={showClient} actionLabel={actionLabel} />
      ))}
    </Card>
  );
}

function TemplatesGrid({ rows }: { rows: DocumentRecord[] }) {
  if (rows.length === 0) {
    return (
      <Card p={{ base: '6', md: '10' }} textAlign="center">
        <Text fontSize="14px" color="fg.muted">No templates yet.</Text>
      </Card>
    );
  }
  return (
    <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="3">
      {rows.map(d => (
        <Card key={d.id} p="4">
          <Box color="fg.muted" mb="2">
            <FileText size={20} />
          </Box>
          <Text fontSize="14px" fontWeight={600} color="fg" mb="1" truncate>
            {d.name}
          </Text>
          <Text fontSize="11px" color="fg.subtle" mb="3">
            {d.uploadedBy} · {d.size}
          </Text>
          <HStack gap="2">
            <Button intent="secondary" size="sm" h="9" flex="1">
              <Download size={12} />
              Use
            </Button>
            <Button intent="ghost" size="sm" h="9" px="2" aria-label="More">
              ⋯
            </Button>
          </HStack>
        </Card>
      ))}
    </Box>
  );
}

export function AdvisorDocuments({ typeFilter = 'all', clientId }: AdvisorDocumentsProps) {
  const [query, setQuery] = useState('');
  const scopedClient = clientId ? getClient(clientId) : null;
  const isClientScoped = !!scopedClient;

  // Scope first to the selected client (if any), then apply type + search filters.
  const baseDocs = useMemo(() => {
    let list = documents;
    if (clientId) {
      list = list.filter(d => d.clientId === clientId);
    }
    if (typeFilter !== 'all') {
      list = list.filter(d => d.type === (typeFilter as DocType));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.uploadedBy.toLowerCase().includes(q) ||
          findClient(d.clientId).name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [typeFilter, query, clientId]);

  const sortedAll = [...baseDocs].sort((a, b) => a.uploadedDays - b.uploadedDays);
  const recentlyShared = sortedAll.filter(d => d.status === 'shared' || d.uploadedDays <= 7);
  const awaitingReview = sortedAll.filter(d => d.status === 'pending');
  const templates = sortedAll.filter(d => d.type === 'template');

  const totalCount = baseDocs.length;
  const pendingCount = baseDocs.filter(d => d.status === 'pending').length;
  const sharedCount = baseDocs.filter(d => d.status === 'shared').length;
  const templateCount = baseDocs.filter(d => d.type === 'template').length;

  return (
    <Tabs.Root defaultValue="all" variant="line">
      <Box flex="1">
        {/* ===== White header band: title row + tabs ===== */}
        <Box bg="bg" borderBottomWidth="1px" borderColor="border" px={{ base: '4', md: '8' }} pt="6">
          {/* Page header — hidden in client scope; the client header from
              AdvisorClientDetail provides the title above */}
          {!isClientScoped && (
            <Flex align="center" justify="space-between" mb="4" flexWrap="wrap" gap="3">
              <Box>
                <Heading as="h1" fontSize={{ base: '20px', md: '24px' }} fontWeight={600} color="fg" mb="1">
                  Documents
                </Heading>
                <Text fontSize="14px" color="fg.muted">
                  All client and internal files. Tabs cut across status; the left panel filters by type.
                </Text>
              </Box>
              <HStack gap="2">
                <Button intent="secondary">
                  <Filter size={14} />
                  Filter
                </Button>
                <Button intent="primary">
                  <Upload size={14} />
                  Upload
                </Button>
              </HStack>
            </Flex>
          )}

          {/* Compact action row in client scope */}
          {isClientScoped && (
            <Flex align="center" justify="space-between" mb="4" gap="3">
              <Text fontSize="14px" color="fg.muted">
                {totalCount} {totalCount === 1 ? 'document' : 'documents'} for {scopedClient!.name}
              </Text>
              <HStack gap="2">
                <Button intent="secondary">
                  <Filter size={14} />
                  Filter
                </Button>
                <Button intent="primary">
                  <Upload size={14} />
                  Upload
                </Button>
              </HStack>
            </Flex>
          )}

          {/* Tabs — flush with the bottom border of the white band so the active
              indicator visually connects to the content below. */}
          <Tabs.List borderBottomWidth="0" mb="0" mt="2">
            <Tabs.Trigger value="all" px="3" py="3" fontSize="14px" fontWeight={500} gap="2">
              <FileText size={14} />
              All documents
              <Badge variant="subtle" rounded="sm" fontSize="10px">{totalCount}</Badge>
            </Tabs.Trigger>
            <Tabs.Trigger value="recent" px="3" py="3" fontSize="14px" fontWeight={500} gap="2">
              Recently shared
              <Badge variant="subtle" rounded="sm" fontSize="10px">{recentlyShared.length}</Badge>
            </Tabs.Trigger>
            <Tabs.Trigger value="pending" px="3" py="3" fontSize="14px" fontWeight={500} gap="2">
              <CheckCircle2 size={14} />
              Awaiting review
              <Badge colorPalette="yellow" rounded="sm" fontSize="10px">{awaitingReview.length}</Badge>
            </Tabs.Trigger>
            {!isClientScoped && (
              <Tabs.Trigger value="templates" px="3" py="3" fontSize="14px" fontWeight={500} gap="2">
                Templates
                <Badge variant="subtle" rounded="sm" fontSize="10px">{templates.length}</Badge>
              </Tabs.Trigger>
            )}
          </Tabs.List>
        </Box>

        {/* ===== Gray content area below the header ===== */}
        <Box px={{ base: '4', md: '8' }} py="6">
          {/* Stats — 4 columns globally, 3 columns in client scope (no Templates tile) */}
          <Box
            display="grid"
            gridTemplateColumns={{
              base: 'repeat(2, 1fr)',
              md: isClientScoped ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
            }}
            gap="3"
            mb="5"
          >
            <StatTile
              label="Total"
              value={String(totalCount)}
              sublabel={isClientScoped ? 'for this client' : 'across all clients'}
            />
            <StatTile label="Awaiting review" value={String(pendingCount)} sublabel="needs your action" />
            <StatTile label="Recently shared" value={String(sharedCount)} sublabel="in last 7 days" />
            {!isClientScoped && (
              <StatTile label="Templates" value={String(templateCount)} sublabel="internal" />
            )}
          </Box>

          {/* Search */}
          <Flex mb="4">
            <InputGroup
              maxW={{ base: 'full', md: '360px' }}
              flex="1"
              startElement={<Search size={16} color="var(--chakra-colors-fg-subtle)" />}
            >
              <Input
                placeholder={isClientScoped ? 'Search documents' : 'Search documents by name, client, or owner'}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </InputGroup>
          </Flex>

        <Tabs.Content value="all" p="0">
          {/* Column headers */}
          <Flex
            px="4"
            py="2"
            fontSize="11px"
            fontWeight={600}
            color="fg.subtle"
            textTransform="uppercase"
            letterSpacing="0.5px"
            gap="3"
            display={{ base: 'none', md: 'flex' }}
          >
            <Box w="18px" />
            <Box flex="2">Name</Box>
            {!isClientScoped && <Box flex="1">Client</Box>}
            <Box minW="90px">Type</Box>
            <Box minW="120px">Status</Box>
            <Box w="100px" textAlign="right">Uploaded</Box>
            <Box w="36px" />
          </Flex>
          <DocumentsTable rows={sortedAll} showClient={!isClientScoped} emptyText="No documents match your filters." />
        </Tabs.Content>

        <Tabs.Content value="recent" p="0">
          <DocumentsTable rows={recentlyShared} showClient={!isClientScoped} emptyText="Nothing shared recently." />
        </Tabs.Content>

        <Tabs.Content value="pending" p="0">
          <Stack gap="3">
            <Card p="4" bg="brl.warningLight" borderLeftWidth="3px" borderLeftColor="brl.warning">
              <HStack gap="3">
                <Box color="brl.warning">
                  <CheckCircle2 size={20} />
                </Box>
                <Box flex="1">
                  <Text fontSize="13px" fontWeight={600} color="fg">
                    {awaitingReview.length} {awaitingReview.length === 1 ? 'document' : 'documents'} awaiting your review
                  </Text>
                  <Text fontSize="12px" color="fg.muted">
                    Review and acknowledge so the client knows you've seen it.
                  </Text>
                </Box>
              </HStack>
            </Card>
            <DocumentsTable rows={awaitingReview} showClient={!isClientScoped} actionLabel="Review" emptyText="Nothing pending — you're all caught up." />
          </Stack>
        </Tabs.Content>

          {!isClientScoped && (
            <Tabs.Content value="templates" p="0">
              <TemplatesGrid rows={templates} />
            </Tabs.Content>
          )}
        </Box>
      </Box>
    </Tabs.Root>
  );
}
