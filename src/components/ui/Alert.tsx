import { Box, Text } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AlertIntent =
  | 'danger'
  | 'critical'
  | 'warning'
  | 'info'
  | 'success'
  | 'brand'
  | 'neutral';

interface AlertProps extends Omit<BoxProps, 'title'> {
  intent?: AlertIntent;
  title: string;
  body?: React.ReactNode;
  /** Override the default intent icon. */
  icon?: LucideIcon;
  /** Optional trailing content (button, link). */
  action?: React.ReactNode;
}

const INTENT_STYLES: Record<
  AlertIntent,
  { bg: string; border: string; fg: string; iconColor: string; icon: LucideIcon }
> = {
  danger: {
    bg: 'status.danger.tint',
    border: 'status.danger',
    fg: 'status.danger.dark',
    iconColor: 'status.danger',
    icon: XCircle,
  },
  critical: {
    bg: 'status.critical.tint',
    border: 'status.critical',
    fg: 'status.critical.dark',
    iconColor: 'status.critical',
    icon: AlertCircle,
  },
  warning: {
    bg: 'status.warning.tint',
    border: 'status.warning',
    fg: 'status.warning.dark',
    iconColor: 'status.warning',
    icon: AlertTriangle,
  },
  info: {
    bg: 'status.info.tint',
    border: 'status.info',
    fg: 'status.info.dark',
    iconColor: 'status.info',
    icon: Info,
  },
  success: {
    bg: 'status.success.tint',
    border: 'status.success',
    fg: 'status.success.dark',
    iconColor: 'status.success',
    icon: CheckCircle2,
  },
  brand: {
    bg: 'brand.subtle',
    border: 'brand.solid',
    fg: 'brand.fg',
    iconColor: 'brand.solid',
    icon: Sparkles,
  },
  neutral: {
    bg: 'bg.dim',
    border: 'border.emphasized',
    fg: 'fg',
    iconColor: 'fg.muted',
    icon: Info,
  },
};

/**
 * Alert — a section-level callout banner. Use for system messages, page-level
 * tips, or feature gates. For ephemeral confirmations use Toast (coming soon).
 */
export function Alert({ intent = 'info', title, body, icon, action, ...rest }: AlertProps) {
  const s = INTENT_STYLES[intent];
  const Icon = icon ?? s.icon;
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap="3"
      px="4"
      py="3"
      rounded="md"
      bg={s.bg}
      borderLeftWidth="3px"
      borderLeftColor={s.border}
      color={s.fg}
      role="status"
      {...rest}
    >
      <Box pt="0.5" color={s.iconColor} flexShrink={0}>
        <Icon size={18} />
      </Box>
      <Box flex="1" minW="0">
        <Text fontSize="14px" fontWeight={600} lineHeight="1.4">
          {title}
        </Text>
        {body && (
          <Text fontSize="13px" color={s.fg} opacity={0.85} mt="0.5" lineHeight="1.5">
            {body}
          </Text>
        )}
      </Box>
      {action && <Box flexShrink={0}>{action}</Box>}
    </Box>
  );
}
