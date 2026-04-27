'use client';
import React, { RefObject } from 'react';
import { Text } from '@/components/elements';
import {
  FieldGroup,
  FieldError,
  StepContent,
  ReportTypeGrid,
  ReportTypeCard,
  ReportCardIcon,
  ReportCardTitle,
  ReportCardSubtitle,
} from './ReportAnimal.style';
import { SearchIcon, LocationIcon } from '@/components/svgs';
import { Step0Fields, Step0Errors, Step0Refs } from './types';

interface Props {
  fields: Step0Fields;
  errors: Step0Errors;
  onChange: (patch: Partial<Step0Fields>) => void;
  fieldRefs: Step0Refs;
}

const REPORT_TYPES: {
  value: 'lost' | 'found';
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  title: string;
  subtitle: string;
}[] = [
  {
    value: 'lost',
    icon: <SearchIcon width={26} height={26} css={{ color: '$slateGray' }} />,
    activeIcon: <SearchIcon width={26} height={26} css={{ color: '$main' }} />,
    title: 'I lost an animal',
    subtitle: 'You owned this animal and it went missing',
  },
  {
    value: 'found',
    icon: <LocationIcon width={26} height={26} css={{ color: '$slateGray' }} />,
    activeIcon: <LocationIcon width={26} height={26} css={{ color: '$main' }} />,
    title: 'I found an animal',
    subtitle: 'You spotted or rescued a stray that may have an owner',
  },
];

export function Step0_ReportType({ fields, errors, onChange, fieldRefs }: Props) {
  return (
    <StepContent>
      <FieldGroup ref={fieldRefs.reportType as RefObject<HTMLDivElement>}>
        <Text
          heading="h8"
          css={{ color: '$slateGray', lineHeight: 1.6, marginBottom: '-$px$4' }}
        >
          What are you reporting?
        </Text>

        <ReportTypeGrid>
          {REPORT_TYPES.map(({ value, icon, activeIcon, title, subtitle }) => {
            const isSelected = fields.reportType === value;
            return (
              <ReportTypeCard
                key={value}
                type="button"
                selected={isSelected}
                invalid={!!errors.reportType && !fields.reportType}
                onClick={() => onChange({ reportType: value })}
                aria-pressed={isSelected}
                id={`report-type-${value}`}
              >
                <ReportCardIcon
                  css={{
                    backgroundColor: isSelected
                      ? 'rgba(160,48,72,0.1)'
                      : '$colorGray',
                  }}
                >
                  {isSelected ? activeIcon : icon}
                </ReportCardIcon>
                <ReportCardTitle css={{ color: isSelected ? '$main' : '$darkSlate' }}>
                  {title}
                </ReportCardTitle>
                <ReportCardSubtitle>{subtitle}</ReportCardSubtitle>
              </ReportTypeCard>
            );
          })}
        </ReportTypeGrid>

        {errors.reportType ? (
          <FieldError>{errors.reportType}</FieldError>
        ) : (
          <FieldError />
        )}
      </FieldGroup>
    </StepContent>
  );
}
