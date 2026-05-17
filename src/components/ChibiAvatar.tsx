type ChibiAvatarProps = {
  hair?: number;
  eyes?: number;
  mouth?: number;
  size?: number;
  className?: string;
};

const hairFills = [
  "#241d20",
  "#3a2a22",
  "#5b4231",
  "#111827",
  "#6b4f3f",
  "#7c3aed",
  "#a16207",
  "#475569",
  "#0f172a",
];
const skin = "#f4b193";

export function ChibiAvatar({
  hair = 0,
  eyes = 0,
  mouth = 0,
  size = 190,
  className = "",
}: ChibiAvatarProps) {
  const hairColor = hairFills[hair] ?? hairFills[0];

  return (
    <svg
      width={size}
      height={size * 1.34}
      viewBox="0 0 220 295"
      className={className}
      role="img"
      aria-label="Q style anime avatar"
    >
      <defs>
        <linearGradient id={`skinGrad-${hair}-${eyes}-${mouth}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd0b8" />
          <stop offset="100%" stopColor="#f0a184" />
        </linearGradient>
        <linearGradient id={`shirtGrad-${hair}-${eyes}-${mouth}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1d4ae" />
          <stop offset="100%" stopColor="#c99d6e" />
        </linearGradient>
        <filter
          id={`softShadow-${hair}-${eyes}-${mouth}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="150%"
        >
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#7c6df2" floodOpacity="0.18" />
        </filter>
      </defs>

      <ellipse cx="110" cy="278" rx="58" ry="10" fill="#d9d7ea" opacity="0.45" />
      <g filter={`url(#softShadow-${hair}-${eyes}-${mouth})`}>
        <path d="M72 162 C61 186 55 213 61 252 L85 252 C84 222 88 201 101 180 Z" fill="#cba06f" />
        <path
          d="M148 162 C159 186 165 213 159 252 L135 252 C136 222 132 201 119 180 Z"
          fill="#cba06f"
        />
        <path
          d="M78 158 C92 146 129 146 144 158 C153 176 151 211 139 229 L81 229 C69 209 67 176 78 158 Z"
          fill={`url(#shirtGrad-${hair}-${eyes}-${mouth})`}
        />
        <path d="M88 184 L132 184 L127 229 L93 229 Z" fill="#fbfaf7" />
        <path d="M88 230 H107 V274 H82 C82 255 84 240 88 230 Z" fill="#1f2937" />
        <path d="M132 230 H113 V274 H138 C138 255 136 240 132 230 Z" fill="#1f2937" />
        <path d="M78 274 H108 C108 282 100 286 87 286 H72 C70 281 72 277 78 274 Z" fill="#f8fafc" />
        <path
          d="M142 274 H112 C112 282 120 286 133 286 H148 C150 281 148 277 142 274 Z"
          fill="#f8fafc"
        />

        <ellipse
          cx="110"
          cy="104"
          rx="61"
          ry="66"
          fill={`url(#skinGrad-${hair}-${eyes}-${mouth})`}
        />
        <path
          d="M54 98 C50 49 82 22 116 24 C153 26 174 53 169 101 C158 75 137 69 119 62 C100 81 78 71 54 98 Z"
          fill={hairColor}
        />
        {hair % 3 === 0 && (
          <path
            d="M54 98 C67 47 95 36 130 36 C118 47 111 67 86 78 C76 82 65 89 54 98 Z"
            fill="#ffffff"
            opacity="0.09"
          />
        )}
        {hair % 3 === 1 && (
          <path
            d="M73 42 C52 61 43 87 49 115 C62 92 87 80 112 59 C103 52 91 45 73 42 Z"
            fill={hairColor}
          />
        )}
        {hair % 3 === 2 && (
          <path
            d="M138 44 C164 58 178 86 170 119 C157 95 133 79 110 58 C120 51 129 46 138 44 Z"
            fill={hairColor}
          />
        )}
        <path d="M51 101 C47 120 54 142 69 153 C63 133 65 118 74 101 Z" fill={hairColor} />
        <path d="M169 101 C173 120 166 142 151 153 C157 133 155 118 146 101 Z" fill={hairColor} />

        <EyeSet variant={eyes} />
        <MouthSet variant={mouth} />

        <path
          d="M78 91 C89 84 101 81 110 82"
          stroke="#14101a"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M141 88 C131 84 122 83 115 85"
          stroke="#14101a"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M77 130 C90 140 130 140 143 130"
          stroke="#e38d83"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

function EyeSet({ variant }: { variant: number }) {
  const v = variant % 9;
  if (v === 1)
    return (
      <>
        <path
          d="M76 111 Q85 103 94 111"
          stroke="#1f1f2e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M126 111 Q135 103 144 111"
          stroke="#1f1f2e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  if (v === 2)
    return (
      <>
        <circle cx="85" cy="111" r="8" fill="#1f1f2e" />
        <circle cx="135" cy="111" r="8" fill="#1f1f2e" />
        <circle cx="88" cy="108" r="2.5" fill="#fff" />
        <circle cx="138" cy="108" r="2.5" fill="#fff" />
      </>
    );
  if (v === 3)
    return (
      <>
        <path d="M78 107 L93 113" stroke="#1f1f2e" strokeWidth="4" strokeLinecap="round" />
        <path d="M127 113 L142 107" stroke="#1f1f2e" strokeWidth="4" strokeLinecap="round" />
      </>
    );
  if (v === 4)
    return (
      <>
        <ellipse cx="85" cy="111" rx="5" ry="9" fill="#1f1f2e" />
        <path
          d="M126 111 Q135 119 144 111"
          stroke="#1f1f2e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  if (v === 5)
    return (
      <>
        <rect
          x="68"
          y="102"
          width="34"
          height="18"
          rx="6"
          fill="none"
          stroke="#1f1f2e"
          strokeWidth="4"
        />
        <rect
          x="118"
          y="102"
          width="34"
          height="18"
          rx="6"
          fill="none"
          stroke="#1f1f2e"
          strokeWidth="4"
        />
        <path d="M102 111 H118" stroke="#1f1f2e" strokeWidth="3" />
      </>
    );
  if (v === 6)
    return (
      <>
        <path
          d="M77 113 Q86 118 95 113"
          stroke="#1f1f2e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M125 113 Q135 118 145 113"
          stroke="#1f1f2e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  if (v === 7)
    return (
      <>
        <circle cx="85" cy="111" r="5" fill="#1f1f2e" />
        <circle cx="135" cy="111" r="5" fill="#1f1f2e" />
        <path d="M77 101 Q85 96 93 101" stroke="#1f1f2e" strokeWidth="3" fill="none" />
        <path d="M127 101 Q135 96 143 101" stroke="#1f1f2e" strokeWidth="3" fill="none" />
      </>
    );
  if (v === 8)
    return (
      <>
        <path
          d="M78 109 C84 103 90 103 96 109"
          stroke="#1f1f2e"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="135" cy="111" rx="5" ry="8" fill="#1f1f2e" />
      </>
    );
  return (
    <>
      <ellipse cx="85" cy="111" rx="5" ry="7" fill="#1f1f2e" />
      <ellipse cx="135" cy="111" rx="5" ry="7" fill="#1f1f2e" />
      <circle cx="87" cy="108" r="1.8" fill="#fff" />
      <circle cx="137" cy="108" r="1.8" fill="#fff" />
    </>
  );
}

function MouthSet({ variant }: { variant: number }) {
  const v = variant % 9;
  if (v === 1)
    return (
      <path
        d="M96 139 Q110 149 124 139"
        stroke="#1f1f2e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  if (v === 2)
    return <path d="M99 143 H121" stroke="#1f1f2e" strokeWidth="3" strokeLinecap="round" />;
  if (v === 3) return <ellipse cx="110" cy="142" rx="8" ry="10" fill="#8b2e3b" />;
  if (v === 4)
    return (
      <path
        d="M98 138 Q110 132 122 138"
        stroke="#1f1f2e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  if (v === 5)
    return (
      <path
        d="M101 137 Q110 143 119 137"
        stroke="#1f1f2e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  if (v === 6)
    return (
      <path
        d="M100 145 Q110 137 120 145"
        stroke="#1f1f2e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  if (v === 7)
    return (
      <>
        <path
          d="M98 139 Q110 151 122 139"
          stroke="#1f1f2e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="125" cy="139" r="2" fill="#f6b4db" />
      </>
    );
  if (v === 8)
    return (
      <path
        d="M104 139 Q110 144 116 139"
        stroke="#1f1f2e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  return (
    <path
      d="M99 140 Q110 146 121 140"
      stroke="#1f1f2e"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  );
}
