import { styled } from '@/theme';
import { Box } from './Box';
import { Flex } from './Flex';
import { Text } from './Text';
import { PawHomeIcon } from '../svgs';

export const LogoLink = styled(Flex, {
  defaultVariants: {
    align: 'center',
    gap: '10',
  },
  textDecoration: 'none',
  cursor: 'pointer',
});

export const LogoPaw = styled(Box, {});

export const LogoText = styled(Text, {
  fontSize: '$fontSize$xl',
  fontWeight: '$fontWeight$bold !important',
  color: '$primary !important',
  letterSpacing: '-0.3px',
  '& span': {
    color: '$white',
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
        <PawHomeIcon css={{ fill: color }} width={30} height={30} />
      </LogoPaw>

      <LogoText>
        Pet<span>Connect</span>
      </LogoText>
    </LogoLink>
  );
};
