import { SVGProps } from 'react';

export function SvgCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M56 2L18.8 42.9L8 34.7H2L18.8 62L62 2z"></path>
    </svg>
  );
}
