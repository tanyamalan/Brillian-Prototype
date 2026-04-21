import {
  BarChart3,
  CircleCheck,
  Compass,
  DollarSign,
  FileDown,
  FileText,
  LayoutGrid,
  Settings,
  Zap,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export interface NavItem {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  children?: { id: string; label: string }[];
}

export const navItems: NavItem[] = [
  { id: 'onboarding', label: 'Onboarding', Icon: Compass },
  {
    id: 'dashboard',
    label: 'Dashboard',
    Icon: LayoutGrid,
    children: [
      { id: 'dashboard-overview', label: 'Overview' },
      { id: 'dashboard-health', label: 'Health Score' },
    ],
  },
  {
    id: 'valuation',
    label: 'Valuation',
    Icon: DollarSign,
    children: [
      { id: 'valuation-current', label: 'Current Valuation' },
      { id: 'valuation-history', label: 'History' },
      { id: 'valuation-scenarios', label: 'Scenarios' },
    ],
  },
  { id: 'benchmarks', label: 'Benchmarks', Icon: BarChart3 },
  { id: 'opportunities', label: 'Opportunities', Icon: Zap },
  { id: 'actions', label: 'Action Items', Icon: CircleCheck },
  { id: 'documents', label: 'Documents', Icon: FileText },
  { id: 'reports', label: 'Reports', Icon: FileDown },
];

export const settingsItem: NavItem = { id: 'settings', label: 'Settings', Icon: Settings };
