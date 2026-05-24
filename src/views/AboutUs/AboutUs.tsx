'use client';

import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import {
  AboutWrapper,
  Section,
  SectionTitle,
  SectionText,
  ValuesGrid,
  ValueCard,
  ValueTitle,
  ValueDescription,
  StepsGrid,
  StepCard,
  StepNumber,
  StepContent,
  StepTitle,
  StepDescription,
  TeamGrid,
  TeamCard,
  AvatarImg,
  CardTitle,
  CardRole,
} from './style';
import { ABOUT_US } from './messages';

export const AboutUs = () => {
  return (
    <AboutWrapper>
      <DashBoardHeader
        heading={ABOUT_US.heading}
        subHeading={ABOUT_US.subHeading}
      />

      {/* Mission Section */}
      <Section>
        <SectionTitle>{ABOUT_US.missionTitle}</SectionTitle>
        <SectionText>{ABOUT_US.missionText}</SectionText>
      </Section>

      {/* Story Section */}
      <Section>
        <SectionTitle>{ABOUT_US.storyTitle}</SectionTitle>
        <SectionText>{ABOUT_US.storyText}</SectionText>
      </Section>

      {/* Values Section */}
      <Section>
        <SectionTitle>{ABOUT_US.valuesTitle}</SectionTitle>
        <ValuesGrid>
          {ABOUT_US.values.map((val) => (
            <ValueCard key={val.title}>
              <ValueTitle>{val.title}</ValueTitle>
              <ValueDescription>{val.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Section>

      {/* How it works Section */}
      <Section>
        <SectionTitle>{ABOUT_US.howItWorksTitle}</SectionTitle>
        <StepsGrid>
          {ABOUT_US.howItWorksSteps.map((step) => (
            <StepCard key={step.step}>
              <StepNumber>{step.step}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </StepCard>
          ))}
        </StepsGrid>
      </Section>

      {/* Team Section */}
      <Section>
        <SectionTitle>{ABOUT_US.teamTitle}</SectionTitle>
        <TeamGrid>
          {ABOUT_US.teamMembers.map((member) => (
            <TeamCard key={member.name}>
              <AvatarImg src={member.avatar} alt={member.name} />
              <CardTitle>{member.name}</CardTitle>
              <CardRole>{member.role}</CardRole>
            </TeamCard>
          ))}
        </TeamGrid>
      </Section>
    </AboutWrapper>
  );
};
