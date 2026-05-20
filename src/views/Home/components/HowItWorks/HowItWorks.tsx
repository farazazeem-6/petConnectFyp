import {
  HowItWorksTitleRow,
  HowItWorksWrapper,
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
        <MainSubHeading
          css={{ mb: '10px !important', color: '$main !important' }}
        >
          EASY PROCESS
        </MainSubHeading>
        <HowItWorksTitleRow>
          <MainHeading css={{ mb: '10px !important' }}>
            How It Works
          </MainHeading>
        </HowItWorksTitleRow>

        {/* Subtitle */}

        {/* Steps row */}
        <StepsRow>
          {STEPS.map((step) => (
            <React.Fragment key={step.id}>
              <StepItem>
                <StepIconCircle>{step.icon}</StepIconCircle>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepItem>
            </React.Fragment>
          ))}
        </StepsRow>
      </HowItWorksWrapper>
    </Container>
  );
};
