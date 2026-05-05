import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { BenchmarksGrid } from './BenchmarksGrid';
import { GoalBanner } from './GoalBanner';
import { OpportunitiesCard } from './OpportunitiesCard';
import { ValuationCard } from './ValuationCard';

interface DashboardProps {
  onStartOnboarding: () => void;
}

export default function Dashboard({ onStartOnboarding }: DashboardProps) {
  return (
    <Box flex="1" px={{ base: '4', md: '8' }} py="6">
      <Heading as="h1" fontSize={{ base: '20px', md: '24px' }} fontWeight={500} color="fg" mb="4">
        Welcome Back, John
      </Heading>

      <GoalBanner onStartOnboarding={onStartOnboarding} />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mb="6">
        <ValuationCard />
        <OpportunitiesCard />
      </SimpleGrid>

      <BenchmarksGrid />
    </Box>
  );
}
