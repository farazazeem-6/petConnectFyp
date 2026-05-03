'use client';
import { PawIcon } from '@/components/svgs';
import {
  DashBoardHeaderWrapper,
  HeadingText,
  IconWrapper,
  SubHeadingText,
  TextWrapper,
} from './style';

type DashBoardHeaderProps = {
  heading: string;
  subHeading?: string;
  icon?: React.ReactNode;
};

const DashBoardHeader = ({
  heading,
  subHeading,
  icon,
}: DashBoardHeaderProps) => {
  return (
    <DashBoardHeaderWrapper>
      <IconWrapper>
        {icon ? (
          icon
        ) : (
          <PawIcon width={25} height={25} css={{ fill: '$white' }} />
        )}
      </IconWrapper>
      <TextWrapper>
        <HeadingText>{heading}</HeadingText>
        <SubHeadingText>{subHeading}</SubHeadingText>
      </TextWrapper>
    </DashBoardHeaderWrapper>
  );
};

export default DashBoardHeader;
