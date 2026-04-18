import {
  AlertIcon,
  CircleCloseIcon,
  CircleTickIcon,
  EditIcon,
  InfoIcon,
} from '@/components/svgs';
import { TAlertType } from '@/utils/types';

// Export helper function for getting alert styles (for icon)
export const getAlertStyles = (type: TAlertType) => {
  switch (type) {
    case 'error':
      return {
        icon: (
          <CircleCloseIcon
            width={60}
            height={60}
            css={{ stroke: '$alertErrorButton' }}
          />
        ),
      };
    case 'warning':
      return {
        icon: (
          <AlertIcon
            width={60}
            height={60}
            css={{ stroke: '$alertWarningButton' }}
          />
        ),
      };
    case 'success':
      return {
        icon: (
          <CircleTickIcon
            width={60}
            height={60}
            css={{ stroke: '$alertSuccessButton' }}
          />
        ),
      };
    case 'edit':
      return {
        icon: (
          <EditIcon
            width={60}
            height={60}
            css={{ stroke: '$alertEditButton' }}
          />
        ),
      };
    case 'info':
    default:
      return {
        icon: (
          <InfoIcon
            width={60}
            height={60}
            css={{ stroke: '$alertInfoButton' }}
          />
        ),
      };
  }
};
