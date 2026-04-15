import { CSS, styled } from '@/theme';
import { Box } from '@/components/elements/Box';

const SvgWrap = styled(Box, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

type Props = { css?: CSS; className?: string };

const BackArrowIcon = ({ css, className }: Props) => (
  <SvgWrap css={css} className={className}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 5l-7 7 7 7" />
    </svg>
  </SvgWrap>
);

export default BackArrowIcon;
