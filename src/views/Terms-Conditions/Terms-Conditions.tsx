import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { ContentWrapper, TermConditionsWrapper } from './style';

export const TermsConditions = () => {
  return (
    <TermConditionsWrapper>
      <DashBoardHeader
        heading="Terms & Conditions"
        subHeading="Last Updated: 26 May 2026"
      />
      <ContentWrapper></ContentWrapper>
    </TermConditionsWrapper>
  );
};
