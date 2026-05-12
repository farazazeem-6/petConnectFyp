import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = props => {
  return (
    <Svg
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      css={{ ...props?.css }}
    >
      <path
        d="M0 16l12 4 4 12 16-32zM14.016 18.016l12-12-10.016 17.984z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default Icon;