interface RouteVisualizerProps {
  origin: string;
  state: string;
  corridor: string;
  baseRate: number;
}

export default function RouteVisualizer({ origin, state, corridor, baseRate }: RouteVisualizerProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-slate-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/30">
            Live Corridor Tracking
          </span>
          <h2 className="text-2xl font-bold mt-2 text-white">
            {origin} &rarr; Miami Hub
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Primary Transport Artery: <span className="text-slate-200 font-medium">{corridor}</span> ({state})
          </p>
        </div>
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-3 text-right">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Baseline</div>
          <div className="text-2xl font-black text-emerald-400">${baseRate}</div>
        </div>
      </div>

      <div className="relative w-full h-48 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
        
        <div className="relative z-10 w-full flex items-center justify-between max-w-2xl">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
            <span className="text-xs font-bold text-slate-200 mt-2 text-center max-w-[120px]">{origin}</span>
            <span className="text-[10px] text-slate-500">{state}</span>
          </div>

          <div className="flex-1 px-4 flex flex-col items-center">
            <span className="text-[11px] font-mono text-blue-400 mb-1 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/50">
              {corridor} Direct
            </span>
            <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500 relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1">Secured Transit Lane</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
            <span className="text-xs font-bold text-slate-200 mt-2 text-center">Miami Hub</span>
            <span className="text-[10px] text-slate-500">Florida</span>
          </div>
        </div>
      </div>
    </div>
  );
}