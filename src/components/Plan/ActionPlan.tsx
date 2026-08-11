import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Check, Clock, Coins, FileText, Link as LinkIcon, Repeat, Users } from 'lucide-react';
import { Card, CardDivider, CardHeader } from '../ui/Card';
import { ListRow, RowActions, RowList } from '../ui/ListRow';
import { StatTile } from '../ui/StatTile';

/**
 * Action plan — the prioritized path to a higher valuation. Shared by the
 * owner view (rail item) and the advisor view (client lens). Composition
 * follows the guide: stat row → in-card row lists grouped by status.
 */

const IN_PROGRESS = [
  {
    Icon: Coins,
    title: 'Normalize owner add-backs',
    step: 'Next: tag personal vehicle expenses in QuickBooks',
    progress: 'Step 2 of 4',
    impact: '+$180K',
  },
  {
    Icon: Clock,
    title: 'Collect from customers faster',
    step: 'Next: switch top 5 accounts to net-25 terms',
    progress: 'Step 1 of 3',
    impact: '+$38K cash',
  },
];

const UP_NEXT = [
  {
    Icon: Repeat,
    title: 'Grow recurring revenue share',
    detail: 'Move maintenance clients onto annual contracts.',
    impact: '+$120K',
  },
  {
    Icon: Users,
    title: 'Reduce owner dependence',
    detail: 'Document processes so the business runs without you.',
    impact: null,
  },
];

const COMPLETED = [
  { Icon: LinkIcon, title: 'Connect your accounting software', when: 'May 12' },
  { Icon: FileText, title: 'Upload your 2023 tax return', when: 'May 8' },
  { Icon: Check, title: 'Complete your business profile', when: 'Apr 30' },
];

export function ActionPlan() {
  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6" maxW="container.detail" w="full" mx="auto">
      {/* Title block → first region: 24px */}
      <Heading as="h1" textStyle="pageTitle" color="fg" mb="1">
        Action plan
      </Heading>
      <Text fontSize="14px" color="fg.muted" mb="6">
        Your prioritized path to a higher valuation — five actions worth about $300K.
      </Text>

      {/* Stat row */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" mb="6">
        <StatTile label="Potential value" value="+$300K" sublabel="across open actions" />
        <StatTile label="In progress" value="2" sublabel="1 step due this week" />
        <StatTile label="Completed" value="3" sublabel="since April" />
      </SimpleGrid>

      {/* In progress */}
      <Card display="flex" flexDir="column" gap="4" mb="6">
        <CardHeader
          title="In progress"
          description="Keep the momentum — each has a clear next step."
        />
        <CardDivider />
        <RowList>
          {IN_PROGRESS.map(a => (
            <ListRow
              key={a.title}
              icon={<a.Icon size={18} />}
              title={a.title}
              subtitle={a.step}
              meta={a.progress}
              right={
                <Flex align="center" gap="2">
                  <Text fontSize="14px" fontWeight={600} color="fg.success">
                    {a.impact}
                  </Text>
                  <RowActions
                    items={[
                      { label: 'View steps' },
                      { label: 'Mark step complete' },
                      'separator',
                      { label: 'Remove from plan', danger: true },
                    ]}
                  />
                </Flex>
              }
              onClick={() => {}}
            />
          ))}
        </RowList>
      </Card>

      {/* Up next */}
      <Card display="flex" flexDir="column" gap="4">
        <CardHeader title="Up next" description="Queued by impact — start when you're ready." />
        <CardDivider />
        <RowList>
          {UP_NEXT.map(a => (
            <ListRow
              key={a.title}
              icon={<a.Icon size={18} />}
              title={a.title}
              subtitle={a.detail}
              right={
                <Flex align="center" gap="2">
                  {a.impact ? (
                    <Text fontSize="14px" fontWeight={600} color="fg.success">
                      {a.impact}
                    </Text>
                  ) : (
                    <Badge intent="moderate">Risk</Badge>
                  )}
                  <RowActions
                    items={[
                      { label: 'Start now' },
                      { label: 'View details' },
                      'separator',
                      { label: 'Dismiss', danger: true },
                    ]}
                  />
                </Flex>
              }
              onClick={() => {}}
            />
          ))}
        </RowList>
      </Card>

      {/* Completed — new region */}
      <Box mt="8">
        <Text textStyle="sectionHeader" color="fg" mb="3">
          Completed
        </Text>
        <Card display="flex" flexDir="column" gap="4">
          <RowList>
            {COMPLETED.map(a => (
              <ListRow
                key={a.title}
                icon={
                  <Flex boxSize="full" rounded="lg" bg="status.success.tint" color="status.success.text" align="center" justify="center">
                    <Check size={16} />
                  </Flex>
                }
                title={a.title}
                right={
                  <Text fontSize="12px" color="fg.subtle">
                    Done {a.when}
                  </Text>
                }
              />
            ))}
          </RowList>
        </Card>
      </Box>
    </Box>
  );
}
