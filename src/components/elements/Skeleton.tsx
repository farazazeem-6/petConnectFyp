import { CSS, styled } from '@/theme/stitches.config';
import Skeleton from 'react-loading-skeleton';

type TDynamicSkeletonProps = {
  circle?: boolean;
  height?: number | string;
  width?: number | string;
  count?: number;
  duration?: number;
  borderRadius?: string | number;
  css?: CSS;
};

const StyledSkeleton = styled(Skeleton, {
  borderRadius: '$radius$lg',
  margin: 0,
  display: 'block',
  width: '$percent$100',
  height: '$percent$100',
  boxSizing: 'border-box',
});

// Wrapper component to pass props dynamically
export const SkeletonLoader: React.FC<TDynamicSkeletonProps> = ({
  width,
  height,
  count = 1,
  circle,
  duration = 1.5,
  borderRadius,
  css,
}) => {
  return (
    <StyledSkeleton
      width={width}
      height={height}
      count={count}
      circle={circle}
      baseColor="#e0e0e0" // Base color
      highlightColor="#f5f5f5" // Highlight color with more contrast
      duration={duration} // Animation duration
      borderRadius={borderRadius}
      css={css}
    />
  );
};
