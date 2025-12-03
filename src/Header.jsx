import React from "react";

export default function Header({ stats = {} }) {
  const {
    substations = 1,
    ltHouses = 7,
    ltLines = 3,
    online = 5,
    warnings = 2,
    faults = 1,
  } = stats;

  const StatCard = ({ icon, label, value, color }) => (
    <div className="relative bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 hover:border-cyan-400 transition flex items-center gap-3 shadow-[0_0_12px_rgba(0,255,255,0.1)]">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} text-white shadow-inner`}>
        {icon}
      </div>
      <div className="leading-tight">
        <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
        <div className="text-lg font-bold text-white">{value}</div>
      </div>
    </div>
  );

  return (
    <header className="
      fixed top-0 left-0 z-[2000]
      w-full bg-slate-900/40 backdrop-blur-xl
      border-b border-slate-800
      px-6 py-3
      shadow-[0_0_25px_rgba(0,255,255,0.05)]
    ">
      <div className="max-w-full mx-auto flex items-center justify-between gap-6">

        {/* LEFT LOGO + TITLE */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl shadow-lg flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="white" />
            </svg>
          </div>

          <div>
            <div className="text-white font-bold text-xl tracking-wide">KSEB GridMonitor</div>

            <div className="text-[11px] text-white-400 flex items-center gap-2">
              SCADA System
              <span className="px-2 py-0.5 bg-slate-800 rounded-md text-cyan-300 border border-slate-700 text-[10px]">
                v2.1
              </span>
            </div>
          </div>
        </div>

        {/* CENTER STATS */}
        <div className="flex items-center gap-3 mx-auto">

          <StatCard
  icon={
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="white"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <line x1="9" y1="6" x2="9" y2="4" />
    <line x1="15" y1="6" x2="15" y2="4" />
  </svg>
}

  label="Substations"
  value={substations}
  color="bg-indigo-600"
/>

<StatCard
  icon={
    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2">
      <path d="M3 9l7-6 7 6v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  }
  label="LT Houses"
  value={ltHouses}
  color="bg-purple-600"
/>

<StatCard
  icon={
    <svg width="20" height="20" stroke="white" fill="none" strokeWidth="2">
      <path d="M12 2L6 22h2l4-10 4 10h2L12 2z"/>
      <path d="M5 10h14"/>
    </svg>
  }
  label="LT Lines"
  value={ltLines}
  color="bg-sky-600"
/>

{/*<StatCard
  icon={
    <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2">
      <polyline points="3 12 7 12 10 4 14 20 17 12 21 12"/>
    </svg>
  }
  label="Online"
  value={online}
  color="bg-emerald-600"
/>*/}

<StatCard
 icon={
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="white"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="1" />
  </svg>
}

  label="Warnings"
  value={warnings}
  color="bg-amber-600"
/>

<StatCard
  icon={
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="white"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
}
  label="Faults"
  value={faults}
  color="bg-rose-600"
/>

        </div>

        {/* RIGHT LIVE INDICATOR */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.6)]"></span>
            <span className="text-slate-300 text-sm">Live</span>
          </div>
        </div>

      </div>
    </header>
  );
}
