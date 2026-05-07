import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      css={{ stroke: props.stroke, ...props?.css }}
    >
      <path d="M12.248 21.969a1 1 0 0 1-.849-.17C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0c0 .42-.039.841-.112 1.262" />

      <path d="m22 22-1.88-1.88" />

      <circle cx="12" cy="10" r="3" />

      <circle cx="18" cy="18" r="3" />
    </Svg>
  );
};

export default Icon;
