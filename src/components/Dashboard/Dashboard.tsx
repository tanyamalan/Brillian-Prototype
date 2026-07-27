import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Card } from '../ui/Card';

interface DashboardProps {
  onStartOnboarding: () => void;
}

export default function Dashboard({ onStartOnboarding }: DashboardProps) {
  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6">
      <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={500} color="fg" mb="6">
        Welcome Back, John
      </Heading>

      {/* Dashboard content cleared — rebuild widgets here. */}
      <Card size="lg" textAlign="center">
        <Text fontSize="14px" color="fg.muted" mb="4" maxW="440px" mx="auto">
          Your dashboard is empty. Complete setup to unlock your valuation, benchmarks, and
          opportunities.
        </Text>
        <Button intent="primary" onClick={onStartOnboarding}>
          Complete Setup
        </Button>
      </Card>
    </Box>
  );
}
