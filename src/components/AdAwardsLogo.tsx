export default function AdAwardsLogo({ className = "h-8", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} style={style}>
      {/* Original geometric sign — two interlocking chevrons */}
      <svg
        viewBox="0 0 90 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <path d="M58.8436 9.47253L78.7472 9.36264C77.0348 14.2418 74.1438 18.3736 70.1186 21.7363C66.0489 25.1429 61.3788 27.2747 56.1305 28.1099V0H46.6123V38H52.9281V37.978C57.9985 37.7802 62.8466 36.6593 67.4277 34.5934C71.8755 32.5714 75.7895 29.8462 79.192 26.3736C82.6168 22.9011 85.2632 18.9231 87.1312 14.4615C89.0437 9.84615 90 5.03297 90 0L58.8436 9.47253Z" fill="white"/>
        <path d="M31.1554 28.5275L11.2518 28.6374C12.9642 23.7582 15.8552 19.6264 19.8804 16.2637C23.9501 12.8571 28.6202 10.7253 33.8686 9.89011V38.022H43.3867V0H37.0709V0.0219777C32.0005 0.21978 27.1525 1.34066 22.5713 3.40659C18.1236 5.42857 14.2095 8.15385 10.807 11.6264C7.38227 15.0989 4.73586 19.0769 2.86781 23.5385C0.955283 28.1538 -0.0232177 32.967 -0.0232179 38L31.1332 28.5275H31.1554Z" fill="white"/>
      </svg>
      {/* AD AWARDS text — bold white */}
      <span className="text-white font-extrabold tracking-[0.08em] text-[clamp(14px,1.8vw,18px)] whitespace-nowrap leading-none" style={{ transform: "translateY(-1px)" }}>
        AD AWARDS
      </span>
    </div>
  );
}
