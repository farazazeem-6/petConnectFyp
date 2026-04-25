import { CSS, styled } from '@/theme';
import { Box } from '@/components/elements/Box';

const SvgWrap = styled(Box, {
  display: 'inline-flex !important',
  alignItems: 'center !important',
  justifyContent: 'center !important',
});

type Props = { css?: CSS; className?: string; width?: number; height?: number; color?: string };

const ArrowLeftIcon = ({ css, className, width = 20, height = 20, color = 'currentColor' }: Props) => (
  <SvgWrap css={css} className={className}>
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </SvgWrap>
);

export default ArrowLeftIcon;
