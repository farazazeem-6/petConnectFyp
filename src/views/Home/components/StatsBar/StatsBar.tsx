import { STATS } from '@/constants';
import {
  StatItem,
  StatLabel,
  StatValue,
  StatsBarWrapper,
  StatsInner,
  StatsBarContent,
} from './StatsBar.style';
import { MainHeading, MainSubHeading } from '@/components/styles';
import { Box, Flex } from '@/components/elements';

export const StatsBar = () => {
  return (
    <StatsBarWrapper>
      <StatsBarContent>
        <Flex gap={'6'}>
          <MainHeading>Every Life</MainHeading>
          <MainHeading css={{ color: '$main !important' }}>Counts</MainHeading>
        </Flex>
        <MainSubHeading css={{ mt: '0 !important', mb: '0 !important' }}>
          Every figure represents compassion, connection, and lives transformed
          together.
        </MainSubHeading>

        <Box
          css={{
            backgroundColor: '$main !important',
            width: '$percent$100',
            py: '$px$60',
          }}
        >
          <StatsInner>
            {STATS.map((stat) => (
              <StatItem key={stat.id}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsInner>
        </Box>
      </StatsBarContent>
    </StatsBarWrapper>
  );
};
