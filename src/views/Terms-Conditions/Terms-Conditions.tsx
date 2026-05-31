'use client';

import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { Text } from '@/components/elements';
import {
  ContactNote,
  ContentWrapper,
  IntroText,
  Section,
  SectionList,
  SectionListItem,
  SectionText,
  SectionTitle,
  TableOfContents,
  TermConditionsWrapper,
  TocItem,
  TocLink,
  TocList,
  TocTitle,
} from './style';
import { TERMS_AND_CONDITIONS } from './messages';

export const TermsConditions = () => {
  const { heading, subHeading, intro, sections } = TERMS_AND_CONDITIONS;

  return (
    <TermConditionsWrapper>
      <DashBoardHeader heading={heading} subHeading={subHeading} />

      <ContentWrapper>
        <IntroText>{intro}</IntroText>

        <TableOfContents aria-label="Table of contents">
          <TocTitle>Contents</TocTitle>
          <TocList>
            {sections.map((section) => (
              <TocItem key={section.id}>
                <TocLink href={`#${section.id}`}>{section.title}</TocLink>
              </TocItem>
            ))}
          </TocList>
        </TableOfContents>

        {sections.map((section) => (
          <Section key={section.id} id={section.id}>
            <SectionTitle>{section.title}</SectionTitle>

            {section.paragraphs?.map((paragraph) => (
              <SectionText key={`${section.id}-${paragraph.slice(0, 20)}`}>{paragraph}</SectionText>
            ))}

            {section.listItems && section.listItems.length > 0 && (
              <SectionList>
                {section.listItems.map((item) => (
                  <SectionListItem key={`${section.id}-${item.slice(0, 20)}`}>{item}</SectionListItem>
                ))}
              </SectionList>
            )}
          </Section>
        ))}

        <ContactNote>
          <Text heading="paragraph" color="secondry">
            Questions about these terms? Reach us at{' '}
            <Text as="span" color="main" heading="paragraph">
              contactpetconnectpk@gmail.com
            </Text>
          </Text>
        </ContactNote>
      </ContentWrapper>
    </TermConditionsWrapper>
  );
};
