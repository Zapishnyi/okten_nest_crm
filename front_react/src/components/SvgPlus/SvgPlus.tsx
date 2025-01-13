import * as React from 'react';
import { SVGProps } from 'react';

const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="18px"
    height="18px"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M13 11h9v2h-9v9h-2v-9H2v-2h9V2h2v9z" />
  </svg>
);
export { SvgPlus };
