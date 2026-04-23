import Svg, { SvgProps } from '../svgs';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
      css={{ ...props?.css }}
    >
      <path d="M4.5 11c0-1.1.4-2.1 1.1-2.8L7 6.8V5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.5h4V5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.8l1.4 1.4c.7.7 1.1 1.7 1.1 2.8v2a3.5 3.5 0 0 1-3.5 3.5h-1v1.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V16h-1A3.5 3.5 0 0 1 4.5 13v-2zm1.5 0v2A2 2 0 0 0 8 15h1.5v2.5h1V15H12V13h2a2 2 0 0 0 2-2v-2c0-.8-.3-1.5-.9-2L14 5.8V6h-1V5h-1v1.5H9.5V5H9v1h-1v-.2L6.9 7c-.6.5-.9 1.2-.9 2v2z" />
      <circle cx="9.5" cy="10.5" r="1" />
      <circle cx="14.5" cy="10.5" r="1" />
      <path d="M11 13h2v1h-2z" />
    </Svg>
  );
};

export default Icon;
