import { Badge, Button, Flex, Progress, Text } from '@chakra-ui/react';
import { Card } from '../ui/Card';

interface GoalBannerProps {
  onStartOnboarding: () => void;
}

export function GoalBanner({ onStartOnboarding }: GoalBannerProps) {
  return (
    <Card mb="6" size="sm">
      <Flex align="center" gap="4" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <Text fontSize="13px" fontWeight={600} color="fg.muted" whiteSpace="nowrap">
          Your Goal
        </Text>
        <Text fontSize="15px" color="fg">
          Sell my business by{' '}
          <Text as="span" color="brand.solid" textDecoration="underline">
            2030
          </Text>
          {' '}for{' '}
          <Text as="span" color="brand.solid" textDecoration="underline">
            $3M
          </Text>
        </Text>
        <Progress.Root
          value={80}
          flex="1"
          minW={{ base: '100%', md: '120px' }}
          size="md"
          colorPalette="brand"
        >
          <Progress.Track h="10px" bg="bg.subtle" rounded="full">
            <Progress.Range bg="brand.solid" rounded="full" />
          </Progress.Track>
        </Progress.Root>
        <Badge
          bg="status.moderate.tint"
          color="status.moderate.text"
          rounded="md"
          px="4"
          py="1.5"
          fontSize="12px"
          fontWeight={600}
          whiteSpace="nowrap"
        >
          $600K gap to close
        </Badge>
        <Button
          intent="primary"
          w={{ base: 'full', md: 'auto' }}
          onClick={onStartOnboarding}
        >
          Complete Setup
        </Button>
      </Flex>
    </Card>
  );
}
