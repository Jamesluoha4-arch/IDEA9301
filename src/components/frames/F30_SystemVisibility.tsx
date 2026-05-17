import { motion } from "framer-motion";
import { Maximize2, Eye, Sparkles, ChevronRight } from "lucide-react";
import { BottomNav } from "./F09_Home";

const spaces = [
  { t: "Exploring shared interests", x: 110, y: 30, w: 180, g: "from-brand-purple/20 to-brand-lavender/20" },
  { t: "Interest Space", x: 175, y: 80, w: 110, g: "from-brand-purple to-brand-pink", active: true },
  { t: "Community Plaza", x: 30, y: 95, w: 130, g: "from-brand-sky/30 to-brand-mint/30" },
  { t: "Friend Cluster", x: 200, y: 165, w: 120, g: "from-brand-pink/30 to-brand-peach/30" },
  { t: "Private Chat", x: 60, y: 175, w: 110, g: "from-brand-mint/30 to-brand-sky/30" },
  { t: "Shared Archive", x: 130, y: 235, w: 110, g: "from-brand-lavender/30 to-brand-pink/30" },
];

export function F30_SystemVisibility() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-2">
        <div className="text-[10px] font-mono tracking-[0.6px] text-brand-mute">SYSTEM_VISIBILITY_V1.0</div>
        <div className="mt-2 h-px bg-brand-bg"/>
      </div>

      {/* Tabs */}
      <div className="mx-5 mt-4 bg-brand-ink rounded-full p-1 flex">
        <button className="flex-1 py-2 rounded-full bg-white text-brand-ink text-[12px] font-bold">AI Activity</button>
        <button className="flex-1 py-2 rounded-full text-white text-[12px] font-bold">Device Access</button>
      </div>

      {/* Mini social world */}
      <div className="mx-5 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[14px] font-bold">Mini Social World</div>
            <div className="text-[10px] text-brand-mute mt-0.5 leading-[14px]">AI avatar is actively participating in shared social spaces</div>
          </div>
          <Maximize2 size={14} className="text-brand-purple"/>
        </div>

        <div className="relative mt-3 h-[290px]">
          {spaces.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
              className={`absolute rounded-full px-3 py-1.5 bg-gradient-to-br ${s.g} ${s.active ? "shadow-glow border border-brand-purple/40" : "border border-brand-bg"}`}
              style={{ left: s.x, top: s.y, width: s.w }}
            >
              <div className={`text-[10px] font-bold text-center ${s.active ? "text-white" : "text-brand-ink"}`}>{s.t}</div>
              {s.active && (
                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-brand-pink"/>
              )}
            </motion.div>
          ))}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 290">
            <path d="M 100 110 Q 170 130 230 100" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5"/>
            <path d="M 230 100 Q 240 180 260 200" stroke="#f6b4db" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5"/>
            <path d="M 130 200 Q 180 250 200 260" stroke="#8ee3c4" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5"/>
          </svg>
          <div className="absolute bottom-1 right-2 text-[9px] font-mono text-brand-mute">now</div>
        </div>
      </div>

      <div className="mx-5 mt-3 bg-white rounded-2xl px-4 py-3 shadow-soft border border-brand-bg flex items-center gap-3">
        <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center"><Eye size={14} className="text-white"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Current Activity</div>
          <div className="text-[10px] text-brand-mute">Reviewing shared interests</div>
        </div>
        <div className="text-[10px] text-brand-mute">today</div>
      </div>

      <div className="mx-5 mt-3 bg-white rounded-2xl shadow-soft border border-brand-bg overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-3 border-b border-brand-bg">
          <div className="w-8 h-8 rounded-full gradient-mint-sky flex items-center justify-center"><Sparkles size={14} className="text-white"/></div>
          <div className="flex-1">
            <div className="text-[12px] font-bold">Recent Presence</div>
            <div className="text-[10px] text-brand-mute">Visited 3 social spaces today</div>
          </div>
          <ChevronRight size={14} className="text-brand-mute"/>
        </div>
        {[
          { t: "12:42", b: "AI explored a shared music interest" },
          { t: "12:35", b: "AI revisited an inactive connection" },
          { t: "12:21", b: "AI suggested reconnecting with Alex" },
        ].map((r) => (
          <div key={r.t} className="px-4 py-2.5 flex items-center gap-3 border-b border-brand-bg last:border-0">
            <div className="text-[10px] font-mono text-brand-purple font-bold">{r.t}</div>
            <div className="flex-1 text-[11px]">{r.b}</div>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-3 mb-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-2"><Sparkles size={12} className="text-brand-purple"/> <div className="text-[12px] font-bold">AI Presence Insight</div></div>
        <div className="text-[11px] text-brand-mute mt-1.5 leading-[15px]">The AI avatar spent more time than usual observing conversation tone patterns today.</div>
        <div className="mt-3 flex gap-2">
          <button className="px-4 py-2 rounded-full bg-brand-ink text-white text-[11px] font-bold">View Details</button>
          <button className="px-4 py-2 rounded-full bg-white border border-brand-bg text-[11px] font-bold">Adjust Visibility</button>
        </div>
      </div>

      <BottomNav active="PRESENCE"/>
    </div>
  );
}
