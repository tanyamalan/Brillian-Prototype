import { clients } from './clientsData';
import type { BadgeIntent } from './clientsData';

export type DocType = 'tax' | 'financials' | 'legal' | 'template';
export type DocStatus = 'reviewed' | 'pending' | 'shared';

export interface DocumentRecord {
  id: string;
  name: string;
  type: DocType;
  clientId: string | null; // null = template / internal
  uploadedAt: string; // human-friendly relative time for the prototype
  uploadedDays: number; // numeric for sorting / filtering
  uploadedBy: string;
  size: string;
  status: DocStatus;
}

export const docTypeMeta: Record<DocType, { label: string; intent: BadgeIntent }> = {
  tax: { label: 'Tax', intent: 'accent' },
  financials: { label: 'Financials', intent: 'brand' },
  legal: { label: 'Legal', intent: 'warning' },
  template: { label: 'Template', intent: 'neutral' },
};

export const docStatusMeta: Record<
  DocStatus,
  { label: string; intent: BadgeIntent }
> = {
  reviewed: { label: 'Reviewed', intent: 'success' },
  pending: { label: 'Pending review', intent: 'moderate' },
  shared: { label: 'Shared', intent: 'brand' },
};

const findClientName = (id: string | null) =>
  id ? clients.find(c => c.id === id)?.name ?? '—' : '—';

const findClientColor = (id: string | null) =>
  id ? clients.find(c => c.id === id)?.logoColor ?? 'sand.500' : 'sand.500';

export const findClient = (id: string | null) => ({
  name: findClientName(id),
  color: findClientColor(id),
});

export const documents: DocumentRecord[] = [
  {
    id: 'd1',
    name: '2024 Federal Tax Return.pdf',
    type: 'tax',
    clientId: 'acme',
    uploadedAt: '2 days ago',
    uploadedDays: 2,
    uploadedBy: 'John Richardson',
    size: '2.4 MB',
    status: 'pending',
  },
  {
    id: 'd2',
    name: 'Q4 Financial Statements.xlsx',
    type: 'financials',
    clientId: 'acme',
    uploadedAt: '5 days ago',
    uploadedDays: 5,
    uploadedBy: 'John Richardson',
    size: '1.1 MB',
    status: 'reviewed',
  },
  {
    id: 'd3',
    name: 'Operating Agreement (signed).pdf',
    type: 'legal',
    clientId: 'beta-corp',
    uploadedAt: '4 hours ago',
    uploadedDays: 0,
    uploadedBy: 'Maya Park',
    size: '892 KB',
    status: 'shared',
  },
  {
    id: 'd4',
    name: 'P&L Statement Jan-Mar.xlsx',
    type: 'financials',
    clientId: 'beta-corp',
    uploadedAt: '1 day ago',
    uploadedDays: 1,
    uploadedBy: 'Maya Park',
    size: '348 KB',
    status: 'pending',
  },
  {
    id: 'd5',
    name: 'Lease Renewal.pdf',
    type: 'legal',
    clientId: 'gamma-inc',
    uploadedAt: '1 week ago',
    uploadedDays: 7,
    uploadedBy: 'Daniel Voss',
    size: '1.8 MB',
    status: 'reviewed',
  },
  {
    id: 'd6',
    name: '2023 Schedule K-1.pdf',
    type: 'tax',
    clientId: 'gamma-inc',
    uploadedAt: '3 weeks ago',
    uploadedDays: 21,
    uploadedBy: 'Daniel Voss',
    size: '410 KB',
    status: 'reviewed',
  },
  {
    id: 'd7',
    name: 'Balance Sheet 2024.xlsx',
    type: 'financials',
    clientId: 'delta-co',
    uploadedAt: '11 days ago',
    uploadedDays: 11,
    uploadedBy: 'Priya Shah',
    size: '624 KB',
    status: 'pending',
  },
  {
    id: 'd8',
    name: 'Vendor Contracts (bundle).zip',
    type: 'legal',
    clientId: 'delta-co',
    uploadedAt: '12 days ago',
    uploadedDays: 12,
    uploadedBy: 'Priya Shah',
    size: '5.2 MB',
    status: 'pending',
  },
  {
    id: 'd9',
    name: 'Cash Flow Statement.xlsx',
    type: 'financials',
    clientId: 'epsilon-grp',
    uploadedAt: '6 hours ago',
    uploadedDays: 0,
    uploadedBy: 'Aaron Brooks',
    size: '512 KB',
    status: 'shared',
  },
  {
    id: 'd10',
    name: 'NDA template (master).docx',
    type: 'template',
    clientId: null,
    uploadedAt: '2 months ago',
    uploadedDays: 60,
    uploadedBy: 'Brillian Team',
    size: '78 KB',
    status: 'reviewed',
  },
  {
    id: 'd11',
    name: 'Valuation Engagement Letter.docx',
    type: 'template',
    clientId: null,
    uploadedAt: '3 months ago',
    uploadedDays: 90,
    uploadedBy: 'Brillian Team',
    size: '124 KB',
    status: 'reviewed',
  },
  {
    id: 'd12',
    name: 'Quarterly Advisor Brief Template.pdf',
    type: 'template',
    clientId: null,
    uploadedAt: '1 month ago',
    uploadedDays: 30,
    uploadedBy: 'Brillian Team',
    size: '256 KB',
    status: 'reviewed',
  },
  {
    id: 'd13',
    name: 'Acquisition Term Sheet (draft).pdf',
    type: 'legal',
    clientId: 'zeta-ind',
    uploadedAt: '1 day ago',
    uploadedDays: 1,
    uploadedBy: 'Linh Tran',
    size: '780 KB',
    status: 'pending',
  },
  {
    id: 'd14',
    name: 'YE 2024 Tax Strategy Memo.docx',
    type: 'tax',
    clientId: 'zeta-ind',
    uploadedAt: '2 weeks ago',
    uploadedDays: 14,
    uploadedBy: 'Linh Tran',
    size: '342 KB',
    status: 'reviewed',
  },
  {
    id: 'd15',
    name: 'Profit & Loss YTD.xlsx',
    type: 'financials',
    clientId: 'theta-llc',
    uploadedAt: '3 hours ago',
    uploadedDays: 0,
    uploadedBy: 'Carmen Diaz',
    size: '198 KB',
    status: 'shared',
  },
  {
    id: 'd16',
    name: 'Founder Equity Agreement.pdf',
    type: 'legal',
    clientId: 'iota-co',
    uploadedAt: '5 days ago',
    uploadedDays: 5,
    uploadedBy: 'Marcus Lee',
    size: '1.2 MB',
    status: 'reviewed',
  },
];
