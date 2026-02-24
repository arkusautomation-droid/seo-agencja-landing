const llmLogos: { name: string; icon: React.ReactNode }[] = [
  {
    name: "ChatGPT",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Google Gemini",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 24C12 21.5 11 19.3 9.4 17.7 7.7 16 5.5 15 3 15c2.5 0 4.7-1 6.4-2.7C11 10.7 12 8.5 12 6c0 2.5 1 4.7 2.6 6.3C16.3 14 18.5 15 21 15c-2.5 0-4.7 1-6.4 2.7C13 19.3 12 21.5 12 24z" fill="url(#gemini-g)" />
        <defs>
          <linearGradient id="gemini-g" x1="3" y1="6" x2="21" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285F4" />
            <stop offset="0.5" stopColor="#9B72CB" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Claude",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#D97757]">
        <path d="M16.01 11.47c-.07-.24-.12-.49-.17-.73L14.4 4.87c-.08-.34-.42-.52-.76-.42l-.06.02c-.33.11-.52.44-.42.78l1 4.08c.04.15-.05.3-.2.34-.14.03-.29-.05-.33-.2l-1.6-5.78c-.1-.33-.44-.53-.78-.43-.34.1-.53.44-.43.78l1.27 4.6c.04.15-.05.3-.2.34-.14.03-.29-.05-.33-.2L10.44 3.4c-.1-.33-.44-.53-.78-.43-.34.1-.53.44-.43.78l1.67 6.03c.04.15-.05.3-.2.34-.14.03-.29-.05-.33-.2l-1-3.6c-.1-.34-.44-.54-.78-.44-.34.1-.54.44-.44.78l2.07 7.5c-1.72-.75-3.04-1.98-3.79-2.73a.52.52 0 0 0-.74.02c-.2.21-.18.55.03.75.14.13 2.93 2.77 5.63 3.22.7.12 1.4.17 2.07.17 3.34 0 5.96-1.7 6.04-1.75a.49.49 0 0 0 .13-.68.49.49 0 0 0-.67-.15c-.02.01-2.41 1.54-5.5 1.56-.24 0-.5-.01-.75-.04l-.1-.03a.31.31 0 0 1-.12-.04c-.66-.14-1.2-.44-1.52-.77 1.92.41 4.42.1 5.69-.37 1.63-.6 3.53-2.13 4.08-4.04.06-.2-.02-.41-.2-.5a.41.41 0 0 0-.5.09c-.76.83-1.88 1.56-2.88 1.87-.42.13-.84.2-1.22.17-.08-.01-.15-.03-.22-.05z" />
      </svg>
    ),
  },
  {
    name: "Perplexity",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#20B8CD]">
        <path d="M12 1L4 5.5v6l2.5 1.4V7.3L12 4l5.5 3.3v5.6L12 16.2 8.5 14v3l3.5 2 7-4.5V8.5L12 1zm0 5.5L8.5 9v4L12 15.5 15.5 13V9L12 6.5z" />
      </svg>
    ),
  },
  {
    name: "Google AI Overview",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.52 3.16-1.76 4.4-1.52 1.52-3.48 2.4-6.08 2.4-4.84 0-8.88-3.92-8.88-8.76s4.04-8.76 8.88-8.76c2.68 0 4.64.96 6.08 2.4l2.32-2.32C18.84 1.64 16.2.24 12.48.24 5.76.24.48 5.36.48 12s5.28 11.76 12 11.76c3.52 0 6.16-1.16 8.24-3.32 2.12-2.12 2.8-5.12 2.8-7.52 0-.76-.04-1.44-.16-2H12.48z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    name: "Microsoft Copilot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M11.5 3C7.36 3 4 6.36 4 10.5V14h2v-3.5C6 7.47 8.47 5 11.5 5S17 7.47 17 10.5V14h2v-3.5C19 6.36 15.64 3 11.5 3z" fill="#0078D4"/>
        <path d="M7 12a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2a3 3 0 0 0-3-3z" fill="#50E6FF"/>
        <path d="M17 12a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2a3 3 0 0 0-3-3z" fill="#50E6FF"/>
      </svg>
    ),
  },
  {
    name: "Meta AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#0668E1]">
        <path d="M6.916 4.603C8.293 2.856 9.83 2 11.326 2c1.14 0 2.152.47 3.015 1.367.984 1.024 1.972 2.737 2.898 5.065.69 1.738 1.244 3.542 1.6 4.85.36-1.38.86-2.79 1.533-4.2.69-1.44 1.38-2.52 2.042-3.21a.6.6 0 0 1 .867.83c-.588.614-1.227 1.614-1.872 2.96-.862 1.8-1.49 3.72-1.824 5.4a.6.6 0 0 1-1.18-.01c-.05-.3-.77-3.04-1.8-5.73-.87-2.27-1.8-3.86-2.67-4.77-.69-.72-1.44-1.08-2.27-1.08-1.14 0-2.37.69-3.55 2.19-1.2 1.52-2.19 3.72-2.89 6.41A.6.6 0 0 1 4 12.26c.73-2.85 1.8-5.14 3.13-6.77z"/>
      </svg>
    ),
  },
  {
    name: "Mistral AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#F7D046]">
        <rect x="2" y="4" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="10" y="4" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="18" y="4" width="4" height="4" rx="0.5" fill="#000"/>
        <rect x="2" y="10" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="6" y="10" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="10" y="10" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="14" y="10" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="18" y="10" width="4" height="4" rx="0.5" fill="#000"/>
        <rect x="2" y="16" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="10" y="16" width="4" height="4" rx="0.5" fill="#F7D046"/>
        <rect x="18" y="16" width="4" height="4" rx="0.5" fill="#000"/>
      </svg>
    ),
  },
  {
    name: "Grok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path d="M3 3l7.5 10.5L3 21h1.7l6.5-6.5L16 21h5l-8-11L20 3h-1.7l-6 6L8 3H3zm2.3 1.2h2.1L18.7 19.8h-2.1L5.3 4.2z"/>
      </svg>
    ),
  },
  {
    name: "SearchGPT",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="11" cy="11" r="7" stroke="#10a37f" strokeWidth="2.5"/>
        <path d="M16 16l5 5" stroke="#10a37f" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Bing AI",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M5 3v15.5l4.5 2.5 8-4.5v-4L10 9l-1.5 7-3.5-2V3z" fill="url(#bing-g)"/>
        <defs>
          <linearGradient id="bing-g" x1="5" y1="3" x2="17.5" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0C8484"/>
            <stop offset="1" stopColor="#36D5AC"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "You.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#6C5CE7]">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.5 8 12 11.7 5.5 8 12 4.3zM5 9.3l6 3.4v6.6l-6-3.4V9.3zm8 10v-6.6l6-3.4v6.6l-6 3.4z"/>
      </svg>
    ),
  },
  {
    name: "Phind",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#EC6A35]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    ),
  },
  {
    name: "DeepSeek",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#4D6BFE]">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.5 14.5a.75.75 0 0 1-1.06 0l-3.44-3.44-3.44 3.44a.75.75 0 0 1-1.06-1.06L10.94 12 7.5 8.56A.75.75 0 0 1 8.56 7.5L12 10.94l3.44-3.44a.75.75 0 0 1 1.06 1.06L13.06 12l3.44 3.44a.75.75 0 0 1 0 1.06z"/>
      </svg>
    ),
  },
  {
    name: "Cohere",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="8" cy="12" r="4" fill="#39594D"/>
        <circle cx="16" cy="8" r="3" fill="#D18EE2"/>
        <circle cx="16" cy="16" r="2.5" fill="#FF7759"/>
      </svg>
    ),
  },
];

/* Duplicate for seamless marquee — 2 rows */
const row1 = llmLogos.slice(0, 8);
const row2 = [...llmLogos.slice(7), ...llmLogos.slice(0, 1)];

function LogoCard({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="shrink-0 w-[90px] h-[90px] rounded-3xl bg-bg flex flex-col items-center justify-center gap-1.5 group">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[rgba(255,255,255,0.03)] shadow-[rgba(16,24,40,0.06)_0px_2px_4px_-2px,rgba(16,24,40,0.1)_0px_4px_8px_-2px] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
    </div>
  );
}

function MarqueeRow({ logos, dir, speed }: { logos: typeof llmLogos; dir: "left" | "right"; speed: number }) {
  const tripled = [...logos, ...logos, ...logos];
  return (
    <div className="flex gap-2.5 llm-marquee" style={{
      animationDirection: dir === "right" ? "reverse" : "normal",
      animationDuration: `${speed}s`,
    }}>
      {tripled.map((l, i) => (
        <LogoCard key={`${l.name}-${i}`} name={l.name} icon={l.icon} />
      ))}
    </div>
  );
}

export default function LlmLogosSection() {
  return (
    <section className="relative py-20 overflow-hidden" data-glow="purple">
      <div className="container mb-10">
        <div className="section-badge mx-auto flex justify-center reveal">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {"Widoczno\u015B\u0107 w AI"}
        </div>
        <h2 className="section-title text-gradient-white-yellow reveal">
          {"Optymalizujemy pod platformy,"}
          <br />
          {"kt\u00F3re zmieniaj\u0105 wyszukiwanie"}
        </h2>
        <p className="section-sub reveal">
          {"Twoja firma b\u0119dzie widoczna nie tylko w Google \u2014 ale te\u017C w ChatGPT, Gemini, Perplexity i ka\u017Cdym asystencie AI, kt\u00F3ry rekomenduje us\u0142ugi."}
        </p>
      </div>

      {/* Logo marquee area */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-2.5 reveal">
          <MarqueeRow logos={row1} dir="left" speed={35} />
          <MarqueeRow logos={row2} dir="right" speed={30} />
        </div>
      </div>

      {/* Labels under the marquee */}
      <div className="container mt-8">
        <div className="flex flex-wrap justify-center gap-3 reveal">
          {llmLogos.map((l) => (
            <span key={l.name} className="text-[11px] text-text-muted px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              {l.name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes llm-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .llm-marquee {
          animation: llm-scroll 35s linear infinite;
          width: max-content;
        }
        .llm-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
