import { styled } from '@/theme';
import { Box } from '@/components/elements';

export const CardGrid = styled(Box, {
  // ── Auto-fill grid ─────────────────────────────────────
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fill, minmax(min($percent$100, 16rem), 1fr))',
  gap: '$px$14',
  width: '$percent$100',

  // ── Responsive overrides ────────────────────────────────
  '@md_max': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '$px$12',
  },
  '@sm_max': {
    gap: '$px$10',
  },
  '@xs_max': {
    gap: '$px$8',
  },
  '@xxs_max': {
    gap: '$px$8',
  },

  // ── Variants ────────────────────────────────────────────
  variants: {
    columns: {
      auto: {},
      '2': {
        '@md_min': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
      },
      '3': {
        '@lg_min': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@md_max': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@sm_max': {
          gridTemplateColumns: '1fr',
        },
      },
      '4': {
        '@xl_min': {
          gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@lg_max': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@md_max': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@sm_max': {
          gridTemplateColumns: '1fr',
        },
      },
      list: {
        gridTemplateColumns: '1fr',
      },
    },
  },

  defaultVariants: {
    columns: 'auto',
  },
});
