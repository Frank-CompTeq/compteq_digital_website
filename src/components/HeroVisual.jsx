const BARS = [34, 52, 44, 66, 58, 82, 96]

export function HeroVisual() {
  return (
    <div className="hv" role="img" aria-label="Illustration of a SaaS product interface: a three-step automated workflow feeding a live dashboard">
      <svg viewBox="0 0 540 460" aria-hidden="true" focusable="false">
        <rect className="hv-back" x="6" y="22" width="508" height="420" rx="4" />
        <g className="hv-window">
          <rect x="26" y="2" width="508" height="420" rx="4" className="hv-win" />
          <line x1="26" y1="44" x2="534" y2="44" className="hv-rule" />
          <circle cx="46" cy="23" r="4.5" className="hv-dot" />
          <circle cx="62" cy="23" r="4.5" className="hv-dot" />
          <circle cx="78" cy="23" r="4.5" className="hv-dot" />
          <rect x="196" y="15" width="170" height="16" rx="8" className="hv-pill" />
          <text x="281" y="27" textAnchor="middle" className="hv-url">app.yourproduct.com</text>

          <line x1="92" y1="44" x2="92" y2="422" className="hv-rule" />
          <g className="hv-nav">
            <rect x="44" y="64" width="30" height="30" rx="3" className="hv-nav-on" />
            <rect x="52" y="73" width="14" height="3" rx="1.5" className="hv-nav-ico on" />
            <rect x="52" y="79" width="9" height="3" rx="1.5" className="hv-nav-ico on" />
            <rect x="52" y="85" width="14" height="3" rx="1.5" className="hv-nav-ico on" />
            <rect x="52" y="116" width="14" height="14" rx="2" className="hv-nav-ico" />
            <circle cx="59" cy="162" r="8" className="hv-nav-ico" />
            <rect x="52" y="196" width="14" height="3" rx="1.5" className="hv-nav-ico" />
            <rect x="52" y="202" width="14" height="3" rx="1.5" className="hv-nav-ico" />
          </g>

          <text x="118" y="82" className="hv-h">Onboarding workflow</text>
          <rect x="118" y="92" width="120" height="6" rx="3" className="hv-skel" />
          <g transform="translate(436 66)">
            <rect width="78" height="24" rx="12" className="hv-chip" />
            <circle cx="16" cy="12" r="4" className="hv-live" />
            <text x="28" y="16.5" className="hv-chip-t">Live</text>
          </g>

          <g className="hv-flow">
            <path className="hv-link" d="M236 168 H266" />
            <path className="hv-link" d="M388 168 H418" />
            <path className="hv-pulse" d="M236 168 H266" />
            <path className="hv-pulse hv-pulse--b" d="M388 168 H418" />

            <g className="hv-node hv-node--1">
              <rect x="118" y="130" width="118" height="76" rx="3" />
              <text x="132" y="154" className="hv-k">Trigger</text>
              <text x="132" y="174" className="hv-v">New request</text>
              <rect x="132" y="186" width="64" height="5" rx="2.5" className="hv-skel" />
            </g>
            <g className="hv-node hv-node--2 hv-node--accent">
              <rect x="266" y="130" width="122" height="76" rx="3" />
              <text x="280" y="154" className="hv-k hv-k--on">Automate</text>
              <text x="280" y="174" className="hv-v">Validate &amp; route</text>
              <rect x="280" y="186" width="80" height="5" rx="2.5" className="hv-skel hv-skel--on" />
            </g>
            <g className="hv-node hv-node--3">
              <rect x="418" y="130" width="96" height="76" rx="3" />
              <text x="432" y="154" className="hv-k">Publish</text>
              <text x="432" y="174" className="hv-v">Dashboard</text>
              <path d="M432 192 l6 6 l12 -13" className="hv-check" />
            </g>
          </g>

          <g className="hv-chart">
            <text x="118" y="248" className="hv-h hv-h--s">Activity</text>
            <line x1="118" y1="264" x2="514" y2="264" className="hv-rule" />
            {BARS.map((value, index) => (
              <rect
                key={value}
                className="hv-bar"
                style={{ '--d': `${0.5 + index * 0.1}s` }}
                x={130 + index * 36}
                y={390 - value * 1.1}
                width="20"
                height={value * 1.1}
                rx="1.5"
              />
            ))}
            <path className="hv-trend" d="M140 360 C 190 350, 210 336, 250 338 S 320 310, 356 314 S 420 280, 470 276" />
            <line x1="118" y1="390" x2="514" y2="390" className="hv-rule" />
          </g>
        </g>

        <g className="hv-seal" transform="translate(468 372) rotate(-10)">
          <circle r="42" className="hv-seal-bg" />
          <circle r="35" className="hv-seal-ring" />
          <path d="M-14 1 l9 9 l19 -20" className="hv-seal-check" />
          <text y="30" textAnchor="middle" className="hv-seal-t">SHIPPED</text>
        </g>
      </svg>
    </div>
  )
}
