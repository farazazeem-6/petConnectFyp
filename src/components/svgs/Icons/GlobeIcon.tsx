import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="-0.5 0 25 25"
      {...props}
      css={{ ...props?.css }}
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M12 22.3201C17.5228 22.3201 22 17.8429 22 12.3201C22 6.79722 17.5228 2.32007 12 2.32007C6.47715 2.32007 2 6.79722 2 12.3201C2 17.8429 6.47715 22.3201 12 22.3201Z" />
        <path d="M2 12.3201H22" />
        <path d="M12 22.3201C13.933 22.3201 15.5 17.8429 15.5 12.3201C15.5 6.79722 13.933 2.32007 12 2.32007C10.067 2.32007 8.5 6.79722 8.5 12.3201C8.5 17.8429 10.067 22.3201 12 22.3201Z" />
      </g>
    </Svg>
  );
};

export default Icon;
