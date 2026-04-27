import {
  BarChart3,
  Briefcase,
  CircleCheck,
  Compass,
  DollarSign,
  FileDown,
  FileText,
  Home,
  LayoutGrid,
  Settings,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export interface NavItem {
  id: string;
  label: string;
  Icon: IconType;
}

export type ViewMode = 'owner' | 'advisor';

// ===== Outer rail (app-wide sections) =====

export const ownerOuterItems: NavItem[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'documents', label: 'Documents', Icon: FileText },
  { id: 'reports', label: 'Reports', Icon: FileDown },
];

export const advisorOuterItems: NavItem[] = [
  { id: 'clients', label: 'Clients', Icon: Briefcase },
  { id: 'documents', label: 'Documents', Icon: FileText },
  { id: 'reports', label: 'Reports', Icon: FileDown },
];

export const settingsItem: NavItem = { id: 'settings', label: 'Settings', Icon: Settings };

export function getOuterItems(mode: ViewMode): NavItem[] {
  return mode === 'advisor' ? advisorOuterItems : ownerOuterItems;
}

// ===== Inner panel: per-company lenses (Dashboard, Valuation, etc.) =====

export const companyLenses: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutGrid },
  { id: 'valuation', label: 'Valuation', Icon: DollarSign },
  { id: 'benchmarks', label: 'Benchmarks', Icon: BarChart3 },
  { id: 'opportunities', label: 'Opportunities', Icon: Zap },
  { id: 'actions', label: 'Action Items', Icon: CircleCheck },
  { id: 'documents', label: 'Documents', Icon: FileText },
  { id: 'onboarding', label: 'Onboarding', Icon: Compass },
];

// ===== Inner panel: advisor "Clients" section sub-nav (no client selected) =====

export const advisorClientsSubNav: NavItem[] = [
  { id: 'all', label: 'All clients', Icon: Briefcase },
  { id: 'pipeline', label: 'Pipeline', Icon: Workflow },
  { id: 'team', label: 'Team', Icon: Users },
];

// ===== Inner panel: section sub-nav for placeholder pages =====

export const documentsSubNav: NavItem[] = [
  { id: 'all', label: 'All documents', Icon: FileText },
  { id: 'tax', label: 'Tax returns', Icon: FileText },
  { id: 'financials', label: 'Financial statements', Icon: FileText },
  { id: 'legal', label: 'Legal', Icon: FileText },
];

export const reportsSubNav: NavItem[] = [
  { id: 'all', label: 'All reports', Icon: FileDown },
  { id: 'valuation', label: 'Valuation reports', Icon: FileDown },
  { id: 'benchmarks', label: 'Benchmark reports', Icon: FileDown },
];

export const settingsSubNav: NavItem[] = [
  { id: 'profile', label: 'Profile', Icon: Settings },
  { id: 'team', label: 'Team', Icon: Users },
  { id: 'billing', label: 'Billing', Icon: Settings },
];
