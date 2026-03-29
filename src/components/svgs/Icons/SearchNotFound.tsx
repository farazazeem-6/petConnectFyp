import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      css={{ ...props?.css }}
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" fill="#e8f9f1" stroke="#22c55e" />
        <line x1="18" y1="18" x2="22" y2="22" stroke="#22c55e" />
        <path d="M9 9l4 4m0-4l-4 4" stroke="#22c55e" />
      </g>
    </Svg>
  );
};

export default Icon;
