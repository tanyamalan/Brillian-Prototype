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
  | 'warning'
  | 'moderate'
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
    fg: 'status.danger.text',
    iconColor: 'status.danger',
    icon: XCircle,
  },
  warning: {
    bg: 'status.warning.tint',
    border: 'status.warning',
    fg: 'status.warning.text',
    iconColor: 'status.warning',
    icon: AlertTriangle,
  },
  moderate: {
    bg: 'status.moderate.tint',
    border: 'status.moderate',
    fg: 'status.moderate.text',
    iconColor: 'status.moderate.text',
    icon: AlertCircle,
  },
  success: {
    bg: 'status.success.tint',
    border: 'status.success',
    fg: 'status.success.text',
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
export function Alert({ intent = 'brand', title, body, icon, action, ...rest }: AlertProps) {
  const s = INTENT_STYLES[intent];
  const Icon = icon ?? s.icon;
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap="3"
      px="4"
      py="3"
      rounded="lg"
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
