import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      css={{ fill: props.fill, ...props?.css }}
    >
      <circle cx="12" cy="6" r="4" fill={props.fill || 'currentColor'} />

      <path
        d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
        fill={props.fill || 'currentColor'}
      />
    </Svg>
  );
};

export default Icon;
