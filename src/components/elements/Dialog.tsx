import React from 'react';
import { styled, CSS } from '@/theme/stitches.config';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { contentShow } from '@/theme';
import { CloseIcon } from '../svgs';
import { Box } from './Box';
import { overlayStyles } from './Overlay';

const scrollStyle = {
    '&::-webkit-scrollbar': {
        paddingRight: '$space$15',
        width: '5px',
        height: '5px',
    },
    '&::-webkit-scrollbar-track': {
        my: '$space$5',
        background: 'transparent',
        boxShadow: 'inset 0 0 5px $colors$scrollbarShadow',
        borderRadius: '$radius$20',
        borderLeft: '1.5px solid transparent',
        borderRight: '1.5px solid transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '$colors$scrollbarBackground',
        borderRadius: '$radius$20',
    },
}

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  display: 'grid',
  placeItems: 'center',
  overflowY: 'auto',
  overflowX: 'hidden', // Prevent horizontal scrolling
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // Mobile keyboard handling
  '@xs_max': {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100dvh', // Use dynamic viewport height to account for mobile keyboard
    overflowY: 'auto',
    overflowX: 'hidden',
  },
});
const ScrollContainer = styled(Box, {
  ...scrollStyle,
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  boxSizing: 'border-box',
});
const StyledContent = styled(DialogPrimitive.Content, {
  display: 'flex',
  flexDirection: 'column',
  width: 'inherit',
  maxWidth: '90%',
  borderRadius: '$radius$xl',
  padding: '10px',
  outline: 'transparent solid 2px',
  outlineOffset: 2,
  backgroundColor: '$modalBg',
  marginBlockEnd: '$px$16',
  willChange: 'transform',
  overflow: 'visible', // ✅ Fixed: was 'hidden' — this was the root cause breaking sticky footer
  overflowX: 'hidden',
  marginTop: '2rem',
  boxSizing: 'border-box',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  zIndex: 2100,

  animation: `${contentShow} 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
  boxShadow: '$lg',
  '.icon': {
    fontSize: '10rem',
    '@sm': {
      fontSize: '12rem',
    },
  },
  '@sm': {
    maxWidth: '35rem',
  },
  '@md': {
    padding: '10px 15px',
    maxWidth: '40rem',
  },
  '@xs_max': {
    width: '100vw',
    maxWidth: '100vw',
    margin: '0',
    borderRadius: '0',
    padding: '$px$20',
    marginTop: '0',
    maxHeight: '100dvh',
    overflowY: 'auto',
    marginBlockEnd: '0',
  },
  '@xxs_max': {
    padding: '$px$16',
  },
  '&.verification': {
    padding: '2rem 4rem',
    maxWidth: '35rem',
    '@xs_max': {
      padding: '$px$16',
      maxWidth: '100vw',
      margin: '0',
    },
  },
  '&.confirmation': {
    maxWidth: '30rem',
    button: {
      padding: '0.5rem $8',
    },
  },
  '&.warning': {
    maxWidth: 'fit-content',
  },
  '&.face': {
    maxWidth: 'min-content',
  },
  '&.start': {
    padding: '2rem 3rem',
  },
  '&.address-modal': {
    padding: '2rem 3rem',
    maxWidth: '41rem',
  },
  '.law-request': {
    '.lottie-container': {
      width: '34%',
    },
  },
  '.register-merchant': {
    '.lottie-container': {
      width: '60%',
    },
  },
  '.kyc': {
    '.lottie-container': {
      width: '65%',
    },
  },
  '.kyc-register': {
    '.lottie-container': {
      width: '45%',
    },
  },
  '.auth': {
    '.lottie-container': {
      width: '14rem',
    },
  },
  '&:focus': {
    outline: 'none',
  },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  background: 'transparent',
  border: 'none',
  borderRadius: '$md',
  width: '$px$32',
  height: '$px$32',
  position: 'absolute',
  top: '$px$10',
  right: '$px$22',
  cursor: 'pointer',
  outline: 'none',

  svg: {
    width: '1em',
    height: '1em',
  },

  '&:hover': {
    backgroundColor: '$transparent',
    borderRadius: '$px$12',
  },

  variants: {
    alignHorizontal: {
      true: {
        top: '$px$36',
        right: '$px$18',
        '@md_max': {
          top: '$px$28',
          right: '$px$10',
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    alignHorizontal: false,
  },
});

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DialogContentProps = DialogContentPrimitiveProps & {
  css?: CSS;
  showCloseIcon?: boolean;
  alignCloseButtonHorizontal?: boolean;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(
  (
    {
      children,
      showCloseIcon = true,
      alignCloseButtonHorizontal = false,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <DialogPrimitive.Portal>
        <StyledOverlay>
          <StyledContent {...props} ref={forwardedRef}>
            <ScrollContainer>
              {/* <StickyHeader> */}
              {showCloseIcon && (
                <StyledCloseButton alignHorizontal={alignCloseButtonHorizontal}>
                  <CloseIcon aria-hidden="true" css={{ fill: '$main' }} />
                </StyledCloseButton>
              )}
              {/* </StickyHeader> */}

              <DialogDescription />
              {children}
            </ScrollContainer>
          </StyledContent>
        </StyledOverlay>
      </DialogPrimitive.Portal>
    );
  },
);

DialogContent.displayName = 'DialogContent';

const DialogTitle = styled(DialogPrimitive.Title, {
  flex: '0 1 0%',
  fontSize: '$fontSizes$xl',
  fontWeight: '$semibold',
  color: '$textBlue',
  paddingInline: '$6',
  paddingBlock: '$4',
  textAlign: 'center',
  // "@sm": {
  //   fontSize: "1.5625rem",
  // },
  // "@md": {
  //   fontSize: "1.875rem",
  // },
});

const DialogDescription = styled(DialogPrimitive.Description, {
  flex: '1 1 0%',
  m: '0px',
});
const DialogBody = styled(Box, {
  flex: '1 1 0%',
});

const DialogFooter = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '$px$5',
  paddingInline: '$px$6',
  paddingBlock: '$px$4',
  width: '100%',
  margin: 0,
  boxSizing: 'border-box',
  position: 'sticky',
  bottom: 0,
  zIndex: 10,
  backgroundColor: 'transparent',
  py: '$px$8',
});

const DialogClose = DialogPrimitive.Close;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
};
