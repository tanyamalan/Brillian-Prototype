import {
  Activity,
  Briefcase,
  CircleCheck,
  ClipboardList,
  FileDown,
  FileText,
  Home,
  LayoutGrid,
  Settings,
  Users,
  Workflow,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export interface NavItem {
  id: string;
  label: string;
  Icon: IconType;
}

export type ViewMode = 'owner' | 'advisor';

/**
 * Shared height for the top band of every column (outer rail logo, inner panel
 * header, topbar). Keeps the header row aligned across the whole shell.
 */
export const HEADER_HEIGHT = '60px';

// ===== Outer rail (app-wide sections) =====

// Owner view has no inner panel — the rail carries the full business menu.
export const ownerOuterItems: NavItem[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'profile', label: 'Company', Icon: ClipboardList },
  { id: 'documents', label: 'Documents', Icon: FileText },
  { id: 'reports', label: 'Reports', Icon: FileDown },
];

export const advisorOuterItems: NavItem[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'clients', label: 'Clients', Icon: Briefcase },
  { id: 'activity', label: 'Activity', Icon: Activity },
  { id: 'reports', label: 'Reports', Icon: FileDown },
];

export const settingsItem: NavItem = { id: 'settings', label: 'Settings', Icon: Settings };

export function getOuterItems(mode: ViewMode): NavItem[] {
  return mode === 'advisor' ? advisorOuterItems : ownerOuterItems;
}

// ===== Inner panel: per-company lenses (Dashboard, Valuation, etc.) =====

export const companyLenses: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: Home },
  { id: 'profile', label: 'Company Details', Icon: ClipboardList },
  { id: 'documents', label: 'Documents', Icon: FileText },
  { id: 'reports', label: 'Reports', Icon: FileDown },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

// ===== Inner panel: advisor "Clients" section sub-nav (no client selected) =====

export const advisorClientsSubNav: NavItem[] = [
  { id: 'all', label: 'All clients', Icon: Briefcase },
  { id: 'pipeline', label: 'Pipeline', Icon: Workflow },
  { id: 'team', label: 'Team', Icon: Users },
];

// ===== Inner panel: advisor "Home" section sub-nav =====

export const advisorHomeSubNav: NavItem[] = [
  { id: 'overview', label: 'Overview', Icon: LayoutGrid },
  { id: 'tasks', label: 'My tasks', Icon: CircleCheck },
];

// ===== Inner panel: advisor "Activity" section sub-nav =====

export const advisorActivitySubNav: NavItem[] = [
  { id: 'all', label: 'All activity', Icon: Activity },
  { id: 'documents', label: 'Document uploads', Icon: FileText },
  { id: 'clients', label: 'Client changes', Icon: Briefcase },
  { id: 'reports', label: 'Reports & exports', Icon: FileDown },
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
