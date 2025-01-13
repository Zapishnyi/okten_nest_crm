import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowDownDropDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="22px"
    height="22px"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m12 15-4.243-4.242 1.415-1.414L12 12.172l2.828-2.828 1.415 1.414L12 15.001z" />
  </svg>
);
export { SvgArrowDownDropDown };