import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowUpDropDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="22px"
    height="22px"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m12 11.828-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z" />
  </svg>
);
export { SvgArrowUpDropDown };
