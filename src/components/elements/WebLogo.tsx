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
});

export const LogoText = styled(Text, {
  fontSize: '$fontSize$xxl',
  fontWeight: '$fontWeight$bold !important',
  letterSpacing: '-0.3px',
  '& span': {
    fontWeight: '$fontWeight$bold',
  },
  '@sm_max': {
    fontSize: '$fontSize$lg',
  },
});
type WebLogoProps = {
  color?: string;
  iconSize?: number;
  fontSize?: number;
  fontWeight?: string;
  onClick?: () => void;
};

export const WebLogo: React.FC<WebLogoProps> = ({
  color = '#ffffff',
  iconSize = 30,
  fontSize = 22,
  fontWeight,
}) => {
  return (
    <LogoLink>
      <LogoPaw css={{ '& svg': { width: iconSize, height: iconSize } }}>
        <PawIcon css={{ fill: color, stroke: color }} />
      </LogoPaw>

      <LogoText css={{ color, fontSize, ...(fontWeight && { fontWeight }) }}>
        Pet
        <span>Connect</span>
      </LogoText>
    </LogoLink>
  );
};
