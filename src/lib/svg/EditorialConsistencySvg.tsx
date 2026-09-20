export function EditorialConsistencySvg({ className = "w-full max-w-sm h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background warm abstract circles */}
      <circle cx="200" cy="160" r="110" fill="#b8860b" fillOpacity="0.06" />
      <circle cx="200" cy="160" r="75" fill="#a0522d" fillOpacity="0.08" />
      
      {/* Editorial trajectory path */}
      <path
        d="M60 240C110 240 130 140 190 140C250 140 280 80 340 80"
        stroke="#a0522d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 6"
        opacity="0.5"
      />
      <path
        d="M60 240C110 240 130 140 190 140C250 140 280 80 340 80"
        stroke="#b8860b"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Milestone Nodes */}
      <g transform="translate(60, 240)">
        <circle r="14" fill="#f5ebe3" stroke="#a0522d" strokeWidth="2.5" />
        <circle r="5" fill="#a0522d" />
      </g>
      <g transform="translate(190, 140)">
        <circle r="14" fill="#f5ebe3" stroke="#b8860b" strokeWidth="2.5" />
        <circle r="5" fill="#b8860b" />
      </g>
      <g transform="translate(340, 80)">
        <circle r="18" fill="#b8860b" fillOpacity="0.15" />
        <circle r="10" fill="#b8860b" />
        <circle r="4" fill="#fff" />
      </g>

      {/* Floating micro editorial card overlay */}
      <rect
        x="135"
        y="185"
        width="130"
        height="48"
        rx="12"
        fill="#faf6f0"
        stroke="#e5d5c5"
        strokeWidth="1.5"
      />
      <circle cx="160" cy="209" r="6" fill="#2e7d32" />
      <rect x="175" y="202" width="70" height="6" rx="3" fill="#3d352e" opacity="0.8" />
      <rect x="175" y="214" width="45" height="5" rx="2.5" fill="#8c7a6b" opacity="0.6" />
    </svg>
  );
}

