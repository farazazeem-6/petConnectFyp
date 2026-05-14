import { styled } from '@/theme';
import { Box, Flex, Text } from '@/components/elements';

export const ContactUsWrapper = styled(Box, {
  boxSizing: 'border-box',
  padding: '$px$40 $px$100',
  width: '$percent$100',
  '@lg_max': {
    padding: '$px$20 $px$70',
  },
  '@md_max': {
    padding: '$px$20 $px$50',
  },
  '@sm_max': {
    padding: '$px$10 $px$10',
  },
});

export const ContentRow = styled(Flex, {
  gap: '$px$40 !important',
  marginTop: '$px$40',
  '@lg_max': {
    flexDirection: 'column !important',
    alignItems: 'flex-start !important',
  },

});

export const FormColumn = styled(Box, {
  backgroundColor: '$white',
  padding: '$px$32',
  borderRadius: '$radius$xl',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
  border: '1px solid $lightGrayLine',
  width: '60% !important',
  '@lg_max': {
    width: '100% !important',
    boxSizing: 'border-box',
  },

});

export const InfoColumn = styled(Box, {
  width: '40% !important',
  display: 'flex',
  flexDirection: 'column',
  gap: '$px$24',
  '@lg_max': {
    width: '100% !important',
    boxSizing: 'border-box',
  },
});

export const FormGroup = styled(Box, {
  marginBottom: '$px$20',
});

export const FormLabel = styled(Text, {
  display: 'block',
  fontSize: '$rem$0_87',
  fontWeight: '$fontWeight$semibold',
  color: '$textPrimary',
  marginBottom: '$px$8',
});

export const ErrorText = styled(Text, {
  color: '$colors$errorColor !important',
  fontSize: '$rem$0_75',
  marginTop: '$px$4',
});

export const FormTextarea = styled('textarea', {
  width: '$percent$100',
  height: '$px$120',
  padding: '$rem$1',
  borderRadius: '$px$8',
  border: '1px solid $main',
  backgroundColor: '$background',
  color: '$foreground',
  fontSize: '$rem$0_87',
  fontFamily: 'inherit',
  resize: 'vertical',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
  '&:focus': {
    borderColor: '$main',
  },

  variants: {
    invalid: {
      true: {
        borderColor: '$colors$errorColor',
      },
    },
  },
});

export const InfoCard = styled(Box, {
  backgroundColor: '$white',
  padding: '$px$32',
  borderRadius: '$radius$xl',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
  border: '1px solid $lightGrayLine',
});

export const InfoCardTitle = styled(Text, {
  fontSize: '$rem$1_25',
  fontWeight: '$fontWeight$bold',
  color: '$main',
  marginBottom: '$px$24',
});

export const InfoItem = styled(Flex, {
  alignItems: 'flex-start',
  gap: '$px$16',
  marginBottom: '$px$20',
  '&:last-child': {
    marginBottom: 0,
  },
});

export const InfoIconWrapper = styled(Flex, {
  width: '40px',
  height: '40px',
  borderRadius: '$radius$full',
  backgroundColor: '$contactIconBg',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: '$main',
});

export const InfoTextContent = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const InfoLabel = styled(Text, {
  fontSize: '$rem$0_87',
  fontWeight: '$fontWeight$bold',
  color: '$textPrimary',
  marginBottom: '$px$4',
});

export const InfoValue = styled(Text, {
  fontSize: '$rem$0_87',
  color: '$slateGray',
  lineHeight: 1.5,
});

export const MapCard = styled(Box, {
  backgroundColor: '$white',
  padding: '$px$24',
  borderRadius: '$radius$xl',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
  border: '1px solid $lightGrayLine',
  overflow: 'hidden',
});

export const MapTitle = styled(Text, {
  fontSize: '$rem$1_25',
  fontWeight: '$fontWeight$bold',
  color: '$main',
  marginBottom: '$px$16',
});

export const MapIframeWrapper = styled(Box, {
  width: '$percent$100',
  height: '$px$250',
  borderRadius: '$radius$md',
  overflow: 'hidden',

  '& iframe': {
    width: '$percent$100',
    height: '$percent$100',
    border: 0,
  },
});
