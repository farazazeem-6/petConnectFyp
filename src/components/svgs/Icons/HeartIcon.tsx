import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      css={{ ...props?.css }}
    >
      <path
        d="M12 20.842L10.55 19.537C5.4 14.926 2 11.888 2 8.27C2 5.362 4.42 3 7.5 3C9.24 3 10.91 3.882 12 5.092C13.09 3.882 14.76 3 16.5 3C19.58 3 22 5.362 22 8.27C22 11.888 18.6 14.926 13.45 19.547L12 20.842Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Icon;
