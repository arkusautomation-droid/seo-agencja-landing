export default function AdAwardsLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Main gradient for the AD mark */}
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6037FF" />
          <stop offset="40%" stopColor="#9B62FF" />
          <stop offset="70%" stopColor="#B27AFF" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        {/* Glow gradient */}
        <linearGradient id="logo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B62FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
        </linearGradient>
        {/* Text gradient */}
        <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EBE9FE" />
        </linearGradient>
        <filter id="logo-blur">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* AD mark — geometric interlocking shapes */}
      <g filter="url(#logo-blur)">
        {/* "A" letter — stylized triangle */}
        <path
          d="M8 38L20 8L32 38H26L24 32H16L14 38H8ZM17.5 27H22.5L20 18.5L17.5 27Z"
          fill="url(#logo-grad)"
        />
        {/* "D" letter — stylized */}
        <path
          d="M36 8H46C53.5 8 58 14.5 58 23C58 31.5 53.5 38 46 38H36V8ZM42 14V32H46C50 32 52 28 52 23C52 18 50 14 46 14H42Z"
          fill="url(#logo-grad)"
        />
      </g>

      {/* Accent diamond between A and D */}
      <rect
        x="31"
        y="19"
        width="6"
        height="6"
        rx="1"
        transform="rotate(45 34 22)"
        fill="url(#logo-glow)"
        opacity="0.8"
      />

      {/* "AWARDS" text */}
      <text
        x="68"
        y="30"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="3"
        fill="url(#text-grad)"
      >
        AWARDS
      </text>

      {/* Subtle underline accent */}
      <rect
        x="68"
        y="36"
        width="55"
        height="1.5"
        rx="0.75"
        fill="url(#logo-grad)"
        opacity="0.4"
      />
    </svg>
  );
}
