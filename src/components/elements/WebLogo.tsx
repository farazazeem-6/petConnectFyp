import { styled } from '@/theme';
import { Box } from './Box';
import { Flex } from './Flex';
import { Text } from './Text';
import { HorseIcon } from '../svgs';

export const LogoLink = styled(Flex, {
  defaultVariants: {
    align: 'center',
    gap: '4',
  },
  textDecoration: 'none',
  cursor: 'pointer',
});

export const LogoPaw = styled(Box, {});

export const LogoText = styled(Text, {
  fontSize: '$fontSize$xxl',
  fontWeight: '$fontWeight$bold !important',
  color: '$blue19 !important',
  letterSpacing: '-0.3px',
  '& span': {
    color: '$black',
    fontWeight: '$fontWeight$bold',
  },
});
type WebLogoProps = {
  color?: string;
};

export const WebLogo: React.FC<WebLogoProps> = ({ color = '#ffffff' }) => {
  return (
    <LogoLink>
      <LogoPaw>
        <HorseIcon
          css={{ fill: color, stroke: color }}
          width={30}
          height={30}
        />
      </LogoPaw>

      <LogoText>
        Pet<span>Connect</span>
      </LogoText>
    </LogoLink>
  );
};
