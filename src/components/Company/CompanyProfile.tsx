import { useState } from 'react';
import { Box, Flex, Heading, NativeSelect, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Card } from '../ui/Card';
import { EditableField, EditableSection } from '../ui/EditableSection';
import { TabNav } from '../ui/TabNav';
import type { TabItem } from '../ui/TabNav';

const TABS: TabItem[] = [
  { id: 'ownership', label: 'Ownership' },
  { id: 'motivation', label: 'Owner Motivation' },
  { id: 'business', label: 'Business Overview' },
  { id: 'financial', label: 'Financial Performance' },
  { id: 'operations', label: 'Operations and Market Position' },
  { id: 'future', label: 'Future Plans and Key Risks' },
];

// ===== Option lists =====
const YESNO = ['Yes', 'No'];
const OWNER_TYPES = ['Natural person', 'Trust', 'Entity / Corporation', 'Other'];
const BUSINESS_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company',
  'S Corporation',
  'C Corporation',
];
const OPERATING = ['Regular operation', 'Rapid growth', 'Declining', 'Distressed / turnaround', 'Seasonal'];
const CPA_LEVELS = ['Audited', 'Reviewed', 'Compiled', 'Self-prepared'];
const CASH_ACCRUAL = ['Cash', 'Accrual', 'Hybrid'];
const GOALS = ['Sell', 'Grow cash flow', 'Transfer to family', 'Not sure yet'];

// ===== Scaffolding =====

/** A labeled sub-group (e.g. "Business Address") sitting inside a section. */
function SubGroup({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Box>
      <Text fontSize="16px" fontWeight={500} color="fg" mb={description ? "1" : "3"}>
        {title}
      </Text>
      {description && (
        <Text fontSize="13px" color="fg.muted" mb="3" lineHeight="1.5">
          {description}
        </Text>
      )}
      {children}
    </Box>
  );
}

// ============================================================================
// Ownership
// ============================================================================

const OWNERS_META = [
  { i: 0, name: 'Jane Doe', tag: 'Natural Owner' },
  { i: 1, name: 'John Doe', tag: 'Natural Owner' },
];

const ownershipValues: Record<string, string> = {
  o0_ownerType: 'Natural person', o0_name: 'Jane Doe', o0_ownershipPct: '10.0%', o0_roleTitle: 'CEO',
  o0_yearStarted: '1999', o0_activeRole: 'Yes', o0_majorityVoting: 'No', o0_economicDiffers: 'No', o0_specialRights: 'No',
  o1_ownerType: 'Natural person', o1_name: 'John Doe', o1_ownershipPct: '5.0%', o1_roleTitle: 'CFO',
  o1_yearStarted: '1990', o1_activeRole: 'No', o1_majorityVoting: 'Yes', o1_economicDiffers: 'No', o1_specialRights: 'No',
  goals: 'Sell',
  annualProfit: '$100,000',
  pctValuing: '100%',
};

/** One owner as an inset panel: name + type tag header, divider, fields. */
function OwnerPanel({ i, name, tag }: { i: number; name: string; tag: string }) {
  return (
    // Nested inside the section card → muted per the guide's nesting rule.
    <Card variant="filled">
      <Flex align="baseline" justify="space-between" gap="4" mb="1">
        <Text fontSize="15px" fontWeight={500} color="fg">
          {name}
        </Text>
        <Text fontSize="12px" color="fg.subtle" flexShrink={0}>
          {tag}
        </Text>
      </Flex>
      <Text fontSize="13px" color="fg.muted" pb="4" mb="5" borderBottomWidth="1px" borderColor="border.subtle">
        Your role and ownership shape how we calculate owner earnings.
      </Text>
      <Stack gap="4">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <EditableField name={`o${i}_ownerType`} label="Owner Type" type="select" options={OWNER_TYPES} />
          <EditableField name={`o${i}_name`} label="Name" />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 5 }} gap="4">
          <EditableField name={`o${i}_ownershipPct`} label="Ownership %" />
          <EditableField name={`o${i}_roleTitle`} label="Role / Title" />
          <EditableField name={`o${i}_yearStarted`} label="Year Started" />
          <EditableField name={`o${i}_activeRole`} label="Active Role?" type="select" options={YESNO} />
          <EditableField name={`o${i}_majorityVoting`} label="Majority voting control?" type="select" options={YESNO} />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <EditableField name={`o${i}_economicDiffers`} label="Economic ownership differs from voting/control rights?" type="select" options={YESNO} />
          <EditableField name={`o${i}_specialRights`} label="Special rights beyond standard ownership?" type="select" options={YESNO} />
        </SimpleGrid>
      </Stack>
    </Card>
  );
}

/** Motivation viewer + questions — shared by the Ownership and Owner Motivation tabs. */
function MotivationFields() {
  const [motivationOwner, setMotivationOwner] = useState(OWNERS_META[0]!.name);
  return (
    <>
      <Box mb="5">
        <Text fontSize="13px" fontWeight={500} color="fg" mb="1.5">
          Viewing motivation for
        </Text>
        {/* Viewer selector — always active, independent of edit mode */}
        <NativeSelect.Root>
          <NativeSelect.Field value={motivationOwner} onChange={e => setMotivationOwner(e.target.value)}>
            {OWNERS_META.map(o => (
              <option key={o.name} value={o.name}>{o.name}</option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>

      <Stack gap="5">
        <EditableField name="goals" label="What are your personal financial goals for the business?" type="select" options={GOALS} />
        <EditableField name="annualProfit" label="What is your annual profit goal for the business?" />
        <EditableField name="pctValuing" label="What percentage of the business are we valuing?" />
      </Stack>
    </>
  );
}

function OwnershipTab() {
  return (
    <EditableSection
      title="Your stake in the business"
      subtitle="Your role and ownership shape how we calculate owner earnings."
      initialValues={ownershipValues}
    >
      <Text fontSize="16px" fontWeight={500} color="fg" mb="3">
        Owners
      </Text>
      <Stack gap="4">
        {OWNERS_META.map(o => (
          <OwnerPanel key={o.i} i={o.i} name={o.name} tag={o.tag} />
        ))}
      </Stack>

      <Box mt="8">
        <Text fontSize="16px" fontWeight={500} color="fg" mb="4">
          Owner Motivation
        </Text>
        <MotivationFields />
      </Box>
    </EditableSection>
  );
}

// ============================================================================
// Owner Motivation
// ============================================================================

const motivationValues: Record<string, string> = {
  goals: 'Sell',
  annualProfit: '$100,000',
  pctValuing: '100%',
};

function MotivationTab() {
  return (
    <EditableSection
      title="Owner Motivation"
      subtitle="Tell us why you want a valuation and your target timeline."
      initialValues={motivationValues}
    >
      <MotivationFields />
    </EditableSection>
  );
}

// ============================================================================
// Business Overview
// ============================================================================

const businessValues: Record<string, string> = {
  products: '',
  differentiates: 'bijefkhqg',
  top5: 'No entries added',
  recurring: '0%',
  terms: '',
  businessType: 'Limited Liability Company',
  operatingCondition: 'Regular operation',
  addr1: '175 Willoughby St.',
  addr2: 'Apt 4K',
  city: 'Brooklyn',
  state: 'New York',
  zip: '11201',
  website: '',
  localOnly: 'Yes',
  objectives: '',
  relatedEntities: '',
  legalIssues: '',
  priorValuation: 'No',
};

function BusinessTab() {
  return (
    <EditableSection title="Business Overview" subtitle="Summarize core details about this business." initialValues={businessValues}>
      <Stack gap="5">
        <EditableField name="products" type="textarea" label="What products or services does your business provide? If certain categories account for large percentages of your business please include that as well." />
        <EditableField name="differentiates" label="What differentiates your company from competitors?" />
        <EditableField name="top5" label="What percentage of revenue do your top 5 customers each account for?" />
        <EditableField name="recurring" label="Do you have any long-term contracts, recurring revenue, or subscription models? What percentage of revenue do they collectively make up?" />
        <EditableField name="terms" type="textarea" label="Description of terms for the above (if applicable)" />
        <EditableField name="businessType" label="What is the business type for the company?" type="select" options={BUSINESS_TYPES} />
        <EditableField name="operatingCondition" label="What best describes the assumed operating condition of the business?" type="select" options={OPERATING} />

        <SubGroup
          title="Business Address"
          description="Enter the main business address where operations are primarily conducted. This location helps us apply the correct local and regional economic context in the valuation."
        >
          <SimpleGrid columns={{ base: 1, md: 2, xl: 5 }} gap="4">
            <EditableField name="addr1" label="Address one" />
            <EditableField name="addr2" label="Address two" />
            <EditableField name="city" label="City" />
            <EditableField name="state" label="State" />
            <EditableField name="zip" label="Zip code" />
          </SimpleGrid>
        </SubGroup>

        <EditableField name="website" label="Website (optional)" />
        <EditableField name="localOnly" label="Is this business local operation only?" type="select" options={YESNO} />
        <EditableField name="objectives" type="textarea" label="What are the business objectives for the company?" />
        <EditableField name="relatedEntities" label="Are there any related entities, affiliates, or subsidiaries?" />
        <EditableField name="legalIssues" label="Are there any pending or potential legal, tax, or compliance issues?" />
        <EditableField name="priorValuation" label="Has the business been valued previously (formal or informal)?" type="select" options={YESNO} />
      </Stack>
    </EditableSection>
  );
}

// ============================================================================
// Financial Performance
// ============================================================================

const SALARY_INDEXES = [0, 1];
const financialValues: Record<string, string> = {
  cpa: 'Reviewed',
  cashAccrual: 'Accrual',
  majorChanges: 'No',
  agreements: 'No',
  comp: 'No entries added',
  nonRecurring: 'No entries added',
  s0_owner: 'Jane Doe', s0_resp: 'grs', s0_comp: '$100,000.00',
  s1_owner: 'John Doe', s1_resp: 'rehgr', s1_comp: '$900.00',
  loans: 'No entries added',
};

function FinancialTab() {
  return (
    <EditableSection
      title="Financial Performance"
      subtitle="Capture financial metrics, recurring items, and debt structures."
      initialValues={financialValues}
    >
      <Stack gap="5">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <EditableField name="cpa" label="Have your financials been audited, reviewed, or compiled by a CPA?" type="select" options={CPA_LEVELS} />
          <EditableField name="cashAccrual" label="How do you and/or your bookkeeper recognize income and expenses, on a cash or accrual basis?" type="select" options={CASH_ACCRUAL} />
        </SimpleGrid>
        <EditableField name="majorChanges" label="Were there any major changes or one-time events that have impacted your business or strategy?" type="select" options={YESNO} />
        <EditableField name="agreements" label="Are there any buy-sell agreements, operating agreements, or shareholder agreements that affect ownership transfer or pricing?" type="select" options={YESNO} />
        <EditableField name="comp" label="What owner or family compensation, perks, or discretionary expenses are included in the financials?" />
        <EditableField name="nonRecurring" label="Are there any non-recurring or extraordinary expenses or income?" />

        <SubGroup title="Are any owners paid a salary for their responsibilities in the business?">
          <Stack gap="4">
            {SALARY_INDEXES.map(i => (
              <SimpleGrid key={i} columns={{ base: 1, md: 3 }} gap="4">
                <EditableField name={`s${i}_owner`} label="Owner" />
                <EditableField name={`s${i}_resp`} label="Describe their daily responsibilities" />
                <EditableField name={`s${i}_comp`} label="Annual Compensation" />
              </SimpleGrid>
            ))}
          </Stack>
        </SubGroup>

        <EditableField name="loans" label="Does the business have any loans or lines of credit?" />
      </Stack>
    </EditableSection>
  );
}

// ============================================================================
// Operations & Market Position
// ============================================================================

const operationsValues: Record<string, string> = {
  targetCustomer: 'dbdgrahdahrdn',
  ftEmployees: '1',
  ptEmployees: '1',
  turnover: '10%',
  retirement: 'Yes',
  keyMan: 'Yes',
  funcResp: '',
  headcount: '',
  managers: 'No',
  salesPct: '10%',
  hardToReplace: 'No',
  physicalAssets: 'No entries added',
  unrelated: 'No entries added',
  facilities: 'No entries added',
};

function OperationsTab() {
  return (
    <EditableSection
      title="Operations & Market Position"
      subtitle="Capture operating profile, owner dependency, and key balance-sheet / facility details."
      initialValues={operationsValues}
    >
      <Stack gap="5">
        <EditableField name="targetCustomer" type="textarea" label="Who is your target customer, and what's the typical sales cycle?" />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          <EditableField name="ftEmployees" label="Full-time employees" />
          <EditableField name="ptEmployees" label="Part-time employees" />
          <EditableField name="turnover" label="Annual voluntary employee turnover percent" />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <EditableField name="retirement" label="Do you offer a retirement plan to any employees?" type="select" options={YESNO} />
          <EditableField name="keyMan" label="Do you have key man insurance in place?" type="select" options={YESNO} />
        </SimpleGrid>

        <SubGroup title="How is current headcount distributed across key functional responsibilities?">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <EditableField name="funcResp" label="Functional Responsibility" />
            <EditableField name="headcount" label="Headcount" />
          </SimpleGrid>
        </SubGroup>

        <EditableField name="managers" label="Do you have managers who could keep the business running if you step away?" type="select" options={YESNO} />
        <EditableField name="salesPct" label="What percent of sales are the owners responsible for bringing in?" />
        <EditableField name="hardToReplace" label="Is there anyone on your team who would be very hard to replace if they left?" type="select" options={YESNO} />
        <EditableField name="physicalAssets" label="What physical assets, real estate, or intellectual property does the company own or lease?" />
        <EditableField name="unrelated" label="Does the business own anything or owe anything unrelated to running it?" />
        <EditableField name="facilities" label="Do you own or lease your facilities, and what are the terms?" />
      </Stack>
    </EditableSection>
  );
}

// ============================================================================
// Future Plans & Key Risks
// ============================================================================

const futureValues: Record<string, string> = {
  risks: 'eg3geg',
  dependencies: '',
};

function FutureTab() {
  return (
    <EditableSection
      title="Future Plans & Key Risks"
      subtitle="Capture growth goals, key risks, and critical dependencies that could impact valuation and execution."
      initialValues={futureValues}
    >
      <Stack gap="5">
        <EditableField name="risks" type="textarea" label="What are the biggest operational, financial, or market risks you face?" />
        <EditableField name="dependencies" type="textarea" label="What critical dependencies could affect business continuity?" />
      </Stack>
    </EditableSection>
  );
}

const TAB_CONTENT: Record<string, () => React.ReactElement> = {
  ownership: OwnershipTab,
  motivation: MotivationTab,
  business: BusinessTab,
  financial: FinancialTab,
  operations: OperationsTab,
  future: FutureTab,
};

// ============================================================================
// Page
// ============================================================================

interface CompanyProfileProps {
  companyName?: string;
  naics?: string;
}

export function CompanyProfile({
  companyName = 'Acme Services LLC',
  naics = '541430, Graphic Design Services',
}: CompanyProfileProps) {
  const [tab, setTab] = useState('ownership');
  const Content = TAB_CONTENT[tab]!;

  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6" maxW="container.detail">
      <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500} color="fg" mb="4">
        {companyName}
      </Heading>

      <Box mb="5">
        <TabNav tabs={TABS} activeId={tab} onSelect={setTab} />
      </Box>

      <Text fontSize="14px" color="fg" mb="6">
        NAICS: {naics}
      </Text>

      <Content />
    </Box>
  );
}
