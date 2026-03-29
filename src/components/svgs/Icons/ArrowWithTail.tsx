import Svg, { SvgProps, SvgPath } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      css={{ ...props?.css }}
    >
      <SvgPath d="M18 8L22 12L18 16" />
      <SvgPath d="M2 12H22" />
    </Svg>
  );
};
export default Icon;
