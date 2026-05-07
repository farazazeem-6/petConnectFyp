import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
      css={{ ...props?.css }}
    >
      <path
        d="M16 24.21L8.571 28.375L9.989 19.971L3.594 13.442L12.245 12.317L16 4.313L19.722 12.317L28.344 13.54L22.011 20.002L23.335 28.406L16 24.21ZM32 12.244L20.962 10.56L16 0L11.038 10.56L0 12.244L7.985 20.42L6.095 32L16 26.53L25.905 32L24.015 20.42L32 12.244Z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default Icon;