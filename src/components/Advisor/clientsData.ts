export type ClientStatus = 'active' | 'at-risk' | 'onboarding' | 'exiting';

export interface Client {
  id: string;
  name: string;
  initials: string;
  logoColor: string;
  industry: string;
  valuation: string;
  valuationGoal: string;
  goalProgress: number; // 0–100
  status: ClientStatus;
  lastActivity: string;
  actionItems: number;
  owner: string;
}

export const statusMeta: Record<
  ClientStatus,
  { label: string; palette: 'green' | 'yellow' | 'red' | 'blue' | 'gray' }
> = {
  active: { label: 'Active', palette: 'green' },
  'at-risk': { label: 'At risk', palette: 'red' },
  onboarding: { label: 'Onboarding', palette: 'blue' },
  exiting: { label: 'Exiting', palette: 'yellow' },
};

export const clients: Client[] = [
  {
    id: 'acme',
    name: 'Acme Services LLC',
    initials: 'A',
    logoColor: '#4285F4',
    industry: 'Professional Services',
    valuation: '$2.4M',
    valuationGoal: '$3M',
    goalProgress: 80,
    status: 'active',
    lastActivity: '2d ago',
    actionItems: 3,
    owner: 'John Richardson',
  },
  {
    id: 'beta-corp',
    name: 'Beta Corp',
    initials: 'B',
    logoColor: '#1E8E3E',
    industry: 'Construction & Trades',
    valuation: '$1.1M',
    valuationGoal: '$2M',
    goalProgress: 55,
    status: 'onboarding',
    lastActivity: '4h ago',
    actionItems: 7,
    owner: 'Maya Park',
  },
  {
    id: 'gamma-inc',
    name: 'Gamma Inc.',
    initials: 'G',
    logoColor: '#F9AB00',
    industry: 'Manufacturing',
    valuation: '$5.2M',
    valuationGoal: '$8M',
    goalProgress: 65,
    status: 'active',
    lastActivity: '1d ago',
    actionItems: 1,
    owner: 'Daniel Voss',
  },
  {
    id: 'delta-co',
    name: 'Delta Co.',
    initials: 'D',
    logoColor: '#D93025',
    industry: 'Retail & E-commerce',
    valuation: '$780K',
    valuationGoal: '$1.5M',
    goalProgress: 40,
    status: 'at-risk',
    lastActivity: '11d ago',
    actionItems: 9,
    owner: 'Priya Shah',
  },
  {
    id: 'epsilon-grp',
    name: 'Epsilon Group',
    initials: 'E',
    logoColor: '#9334E6',
    industry: 'Healthcare',
    valuation: '$3.6M',
    valuationGoal: '$5M',
    goalProgress: 72,
    status: 'active',
    lastActivity: '6h ago',
    actionItems: 2,
    owner: 'Aaron Brooks',
  },
  {
    id: 'zeta-ind',
    name: 'Zeta Industries',
    initials: 'Z',
    logoColor: '#1565C0',
    industry: 'Technology & Software',
    valuation: '$11.4M',
    valuationGoal: '$15M',
    goalProgress: 76,
    status: 'exiting',
    lastActivity: '1d ago',
    actionItems: 4,
    owner: 'Linh Tran',
  },
  {
    id: 'theta-llc',
    name: 'Theta LLC',
    initials: 'T',
    logoColor: '#1E8E3E',
    industry: 'Restaurants & Hospitality',
    valuation: '$420K',
    valuationGoal: '$1M',
    goalProgress: 25,
    status: 'onboarding',
    lastActivity: '3h ago',
    actionItems: 12,
    owner: 'Carmen Diaz',
  },
  {
    id: 'iota-co',
    name: 'Iota Co.',
    initials: 'I',
    logoColor: '#F9AB00',
    industry: 'Professional Services',
    valuation: '$1.9M',
    valuationGoal: '$2.5M',
    goalProgress: 68,
    status: 'active',
    lastActivity: '5d ago',
    actionItems: 0,
    owner: 'Marcus Lee',
  },
];

export const getClient = (id: string): Client | undefined =>
  clients.find(c => c.id === id);
