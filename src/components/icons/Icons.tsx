import { SVGProps } from "react";

export const SvgGoogleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <radialGradient
          id="prefix__b"
          cx="1.479"
          cy="12.788"
          fx="1.479"
          fy="12.788"
          r="9.655"
          gradientTransform="matrix(.8032 0 0 1.0842 2.459 -.293)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".368" stopColor="#ffcf09" />
          <stop offset=".718" stopColor="#ffcf09" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffcf09" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="prefix__c"
          cx="14.295"
          cy="23.291"
          fx="14.295"
          fy="23.291"
          r="11.878"
          gradientTransform="matrix(1.3272 0 0 1.0073 -3.434 -.672)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".383" stopColor="#34a853" />
          <stop offset=".706" stopColor="#34a853" stopOpacity=".7" />
          <stop offset="1" stopColor="#34a853" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="prefix__d"
          x1="23.558"
          y1="6.286"
          x2="12.148"
          y2="20.299"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".671" stopColor="#4285f4" />
          <stop offset=".885" stopColor="#4285f4" stopOpacity="0" />
        </linearGradient>
        <clipPath id="prefix__a">
          <path
            d="M22.36 10H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53h-.013l.013-.01c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93v.01C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66 2.08-1.92 3.28-4.74 3.28-8.09 0-.78-.07-1.53-.2-2.25z"
            fill="none"
          />
        </clipPath>
      </defs>
      <path
        d="M22.36 10H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53h-.013l.013-.01c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09c.87-2.6 3.3-4.53 6.16-4.53 1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93v.01C3.99 20.53 7.7 23 12 23c2.97 0 5.46-.98 7.28-2.66 2.08-1.92 3.28-4.74 3.28-8.09 0-.78-.07-1.53-.2-2.25z"
        fill="#fc4c53"
      />
      <g clipPath="url(#prefix__a)">
        <ellipse
          cx="3.646"
          cy="13.572"
          rx="7.755"
          ry="10.469"
          fill="url(#prefix__b)"
        />
        <ellipse
          cx="15.538"
          cy="22.789"
          rx="15.765"
          ry="11.965"
          transform="rotate(-7.12 15.539 22.789)"
          fill="url(#prefix__c)"
        />
        <path
          fill="url(#prefix__d)"
          d="M11.105 8.28l.491 5.596.623 3.747 7.362 6.848 8.607-15.897-17.083-.294z"
        />
      </g>
    </svg>
  );
};

export const SvgBlackGoogleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      width="24"
      height="24"
      {...props}
    >
      <path d="M32.582 370.734C15.127 336.291 5.12 297.425 5.12 256c0-41.426 10.007-80.291 27.462-114.735C74.705 57.484 161.047 0 261.12 0c69.12 0 126.836 25.367 171.287 66.793l-73.31 73.309c-26.763-25.135-60.276-38.168-97.977-38.168-66.56 0-123.113 44.917-143.36 105.426-5.12 15.36-8.146 31.65-8.146 48.64 0 16.989 3.026 33.28 8.146 48.64l-.303.232h.303c20.247 60.51 76.8 105.426 143.36 105.426 34.443 0 63.534-9.31 86.341-24.67 27.23-18.152 45.382-45.148 51.433-77.032H261.12v-99.142h241.105c3.025 16.757 4.654 34.211 4.654 52.364 0 77.963-27.927 143.592-76.334 188.276-42.356 39.098-100.305 61.905-169.425 61.905-100.073 0-186.415-57.483-228.538-141.032v-.233z" />
    </svg>
  );
};
