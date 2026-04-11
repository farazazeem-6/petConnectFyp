import {
  HowItWorksTitleRow,
  HowItWorksWrapper,
  StepConnector,
  StepDescription,
  StepIconCircle,
  StepItem,
  StepsRow,
  StepTitle,
} from './HowItWorks.style';
import { STEPS } from '@/constants';
import React from 'react';
import { Container } from '@/components/elements';
import { MainHeading, MainSubHeading } from '@/components/styles';

export const HowItWorks = () => {
  return (
    <Container>
      <HowItWorksWrapper>
        {/* Title row: "How  Works" with logo in the middle */}
        <HowItWorksTitleRow>
          <MainHeading>How</MainHeading>
          <MainHeading css={{ color: '$main !important' }}>
            Pet Connect
          </MainHeading>
          <MainHeading>Works</MainHeading>
        </HowItWorksTitleRow>

        {/* Subtitle */}
        <MainSubHeading>
          Your journey to pet parenthood in four simple steps.
        </MainSubHeading>

        {/* Steps row */}
        <StepsRow>
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <StepItem>
                <StepIconCircle>{step.icon}</StepIconCircle>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepItem>

              {index < STEPS.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </StepsRow>
      </HowItWorksWrapper>
    </Container>
  );
};
