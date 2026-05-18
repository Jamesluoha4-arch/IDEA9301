import { Bell, User, ChevronRight, Zap } from "lucide-react";
import { BottomNav } from "./F09_Home";

const FILTERS = ["All", "Needs response", "Cooling down", "Active"];
const PEOPLE = [
  {
    name: "Sarah Jenkins",
    status: "Needs response",
    time: "Last message 5h ago",
    level: "Suggest",
    priority: "High",
  },
  {
    name: "Alex Chen",
    status: "Cooling down",
    time: "Reply gap increased",
    level: "Draft",
    priority: "Medium",
  },
  {
    name: "Marcus Lee",
    status: "Active",
    time: "1 new shared moment",
    level: "Suggest",
    priority: "Low",
  },
  {
    name: "Design Team",
    status: "Stable",
    time: "No action needed",
    level: "Off",
    priority: "Low",
  },
];

export function F80_RelationshipsList() {
  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="text-[22px] font-bold">Relationships</div>
        <Bell size={18} className="text-brand-ink" />
      </div>

      <div className="px-5 mt-2 flex gap-1.5 overflow-x-auto">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${i === 0 ? "bg-brand-bg text-brand-ink" : "bg-white border border-brand-bg text-brand-ink"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white border border-brand-bg rounded-2xl p-3.5 shadow-soft">
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-brand-ink" />
          <div className="text-[12px] font-bold flex-1">Relationship Signals Today</div>
          <button className="px-2.5 py-1 rounded-lg bg-white border border-brand-bg text-[10px] font-bold">
            Review signals
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { n: 3, t: "DRAFTS" },
            { n: 2, t: "SUGGESTIONS" },
            { n: 1, t: "BLOCKED ACTION" },
          ].map((s) => (
            <div key={s.t}>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-brand-bg" />
                <div className="text-[14px] font-bold">{s.n}</div>
              </div>
              <div className="text-[8px] tracking-wider text-brand-mute mt-0.5">{s.t}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[10px] text-brand-mute">
          AI noticed 3 relationships may need attention today.
        </div>
      </div>

      <div className="mx-4 mt-3 space-y-2">
        {PEOPLE.map((p) => (
          <div
            key={p.name}
            className="bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center">
              <User size={16} className="text-brand-mute" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold">{p.name}</div>
              <div className="text-[10px] text-brand-mute">{p.status}</div>
              <div className="text-[9px] text-brand-mute">{p.time}</div>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-bg text-[9px] font-bold">
                ✦ AI Level: {p.level}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="px-2 py-0.5 rounded-full bg-white border border-brand-bg text-[9px] font-bold">
                {p.priority}
              </div>
              <ChevronRight size={13} className="text-brand-mute" />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white border border-brand-bg rounded-2xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-bold">
            Relationship Health <span className="text-brand-mute font-normal">(This week)</span>
          </div>
        </div>
        <svg viewBox="0 0 280 60" className="w-full h-14">
          <polyline
            points="0,38 40,28 80,42 120,32 160,48 200,30 240,38 280,28"
            fill="none"
            stroke="hsl(258 30% 25%)"
            strokeWidth="1.6"
          />
          {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={[38, 28, 42, 32, 48, 30, 38, 28][i]}
              r="2"
              fill="hsl(258 30% 25%)"
            />
          ))}
        </svg>
        <div className="grid grid-cols-7 text-[9px] text-brand-mute mt-1 text-center">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="mt-2 text-[9px] text-brand-mute">
          Based on relationship depth, AI involvement and your responses.
        </div>
      </div>

      <BottomNav active="HOME" />
    </div>
  );
}
