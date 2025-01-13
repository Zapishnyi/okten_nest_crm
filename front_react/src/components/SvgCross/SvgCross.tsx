import * as React from 'react';
import { SVGProps } from 'react';

const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="18px"
    height="18px"
    fill="currentColor"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" />
  </svg>
);
export { SvgCross };
