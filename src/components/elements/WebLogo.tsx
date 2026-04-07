import { styled } from '@/theme';
import { Box } from './Box';
import { Flex } from './Flex';
import { Text } from './Text';
import { PawIcon } from '../svgs';

export const LogoLink = styled(Flex, {
  defaultVariants: {
    align: 'center',
    gap: '4',
  },
  textDecoration: 'none',
  cursor: 'pointer',
});

export const LogoPaw = styled(Box, {
  '& svg': {
    width: '$px$30',
    height: '$px$30',
  },
  '@sm_max': {
    '& svg': {
      width: '$px$20',
      height: '$px$20',
    },
  },
});

export const LogoText = styled(Text, {
  fontSize: '$fontSize$xxl',
  fontWeight: '$fontWeight$bold !important',
  color: '$white !important',
  letterSpacing: '-0.3px',
  '& span': {
    color: '$white !important',
    fontWeight: '$fontWeight$bold',
  },
  '@sm_max': {
    fontSize: '$fontSize$md',
  },
});
type WebLogoProps = {
  color?: string;
};

export const WebLogo: React.FC<WebLogoProps> = ({ color = '#ffffff' }) => {
  return (
    <LogoLink>
      <LogoPaw>
        <PawIcon css={{ fill: color, stroke: color }} />
      </LogoPaw>

      <LogoText>
        Pet
        <span>Connect</span>
      </LogoText>
    </LogoLink>
  );
};
