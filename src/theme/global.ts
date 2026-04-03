import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body': {
    color: '$text',
    minHeight: '$dvh$100',
    fontSize: 'clamp($px$12, 1vw, $px$16)',
  },

  input: { fontSize: '$px$16 !important' },
  textarea: { fontSize: '$px$16 !important' },
  select: { fontSize: '$px$16 !important' },
});
