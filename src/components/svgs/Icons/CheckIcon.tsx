import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 -0.5 25 25"
      {...props}
      css={{ ...props?.css }}
    >
      <path
        d="M5.5 12.5L10.167 17L19.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default Icon;
