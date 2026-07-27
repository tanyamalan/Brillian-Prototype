import { forwardRef } from 'react';
import { Flex, Image, Menu, Portal } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';
import { ArrowLeftRight, BookOpen, Moon, Sun } from 'lucide-react';
import type { ViewMode } from './navConfig';

interface BrandFloatProps {
  /** accent (login/dark): lime circle, forest B · brand (in-app): forest circle, lime B. */
  scheme?: 'accent' | 'brand';
  /** When provided, the mark opens the demo-controls menu. */
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  navDark?: boolean;
  onToggleNavDark?: () => void;
}

// forwardRef + prop spread so Menu.Trigger asChild can wire the mark up.
const Mark = forwardRef<HTMLDivElement, { scheme: 'accent' | 'brand'; interactive: boolean } & FlexProps>(function Mark(
  { scheme, interactive, ...rest },
  ref
) {
  const brand = scheme === 'brand';
  return (
    <Flex
      ref={ref}
      as={interactive ? 'button' : 'div'}
      {...rest}
      position="fixed"
      bottom="6"
      right="6"
      boxSize="48px"
      rounded="full"
      bg={brand ? 'brand.solid' : 'accent.solid'}
      align="center"
      justify="center"
      zIndex={50}
      cursor={interactive ? 'pointer' : undefined}
      pointerEvents={interactive ? 'auto' : 'none'}
      display={{ base: 'none', md: 'flex' }}
      transition="transform 0.15s ease, box-shadow 0.15s ease"
      _hover={interactive ? { transform: 'scale(1.06)', shadow: 'raised' } : undefined}
    >
      <Image src={brand ? '/brillian-logo-lime.svg' : '/brillian-logo.svg'} alt="Brillian" h="20px" w="auto" />
    </Flex>
  );
});

/**
 * BrandFloat — the Brillian mark floating bottom-right across the whole app.
 * In the signed-in app it doubles as the demo-controls menu (view switch,
 * nav style toggle, style guide) so those stay out of the product UI.
 */
export function BrandFloat({ scheme = 'accent', viewMode, onViewModeChange, navDark, onToggleNavDark }: BrandFloatProps) {
  const interactive = !!onViewModeChange;

  if (!interactive) {
    return <Mark scheme={scheme} interactive={false} />;
  }

  return (
    <Menu.Root positioning={{ placement: 'top-end' }}>
      <Menu.Trigger asChild>
        <Mark scheme={scheme} interactive />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="220px">
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel fontSize="10.5px" fontWeight={600} letterSpacing="0.05em" textTransform="uppercase" color="fg.subtle">
                Demo controls
              </Menu.ItemGroupLabel>
              <Menu.Item
                value="switch-view"
                gap="2"
                fontSize="13px"
                onClick={() => onViewModeChange?.(viewMode === 'owner' ? 'advisor' : 'owner')}
              >
                <ArrowLeftRight size={14} />
                Switch to {viewMode === 'owner' ? 'Advisor' : 'Owner'} view
              </Menu.Item>
              <Menu.Item value="nav-style" gap="2" fontSize="13px" onClick={onToggleNavDark}>
                {navDark ? <Sun size={14} /> : <Moon size={14} />}
                {navDark ? 'Light nav' : 'Dark nav'}
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item
                value="style-guide"
                gap="2"
                fontSize="13px"
                onClick={() => {
                  window.location.href = '/style-guide.html';
                }}
              >
                <BookOpen size={14} />
                Open style guide
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
