import { motion } from "framer-motion";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { BottomNav } from "./F09_Home";

const bubbles = [
  { t: "Exploring shared interests", x: 50, y: 10, w: 200, g: "from-brand-lavender/30 to-brand-pink/30" },
  { t: "Interest Space", x: 130, y: 55, w: 130, g: "from-brand-purple to-brand-pink", active: true },
  { t: "Community Plaza", x: 5, y: 75, w: 130, g: "from-brand-sky/30 to-brand-mint/30" },
  { t: "Friend Cluster", x: 175, y: 130, w: 120, g: "from-brand-pink/30 to-brand-peach/30" },
  { t: "Private Chat", x: 30, y: 145, w: 110, g: "from-brand-mint/30 to-brand-sky/30" },
  { t: "Responding to conversation flow", x: 95, y: 185, w: 200, g: "from-brand-purple/20 to-brand-lavender/20" },
  { t: "Event Space", x: 30, y: 235, w: 110, g: "from-brand-peach/30 to-brand-pink/30" },
  { t: "Shared Archive", x: 145, y: 235, w: 130, g: "from-brand-lavender/30 to-brand-pink/30" },
  { t: "Discovery Path", x: 175, y: 280, w: 120, g: "from-brand-sky/30 to-brand-purple/30" },
  { t: "Revisiting inactive friendship", x: 50, y: 320, w: 200, g: "from-brand-mint/30 to-brand-sky/30" },
];

export function F31_LiveSocialWorld() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 pt-2 flex items-center gap-3">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div>
          <div className="text-[14px] font-bold tracking-[0.4px]">LIVE SOCIAL WORLD</div>
          <div className="text-[9px] font-mono text-brand-mute">SYSTEM_VISIBILITY_V1.0</div>
        </div>
      </div>
      <div className="px-5 mt-2 text-[11px] text-brand-mute">AI avatar is currently active within shared social spaces</div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="relative h-[380px]">
          {bubbles.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              className={`absolute rounded-full px-3 py-1.5 bg-gradient-to-br ${s.g} ${s.active ? "shadow-glow border border-brand-purple/40" : "border border-brand-bg"}`}
              style={{ left: s.x, top: s.y, width: s.w }}
            >
              <div className={`text-[10px] font-bold text-center ${s.active ? "text-white" : "text-brand-ink"}`}>{s.t}</div>
              {s.active && (
                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-brand-pink"/>
              )}
            </motion.div>
          ))}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="50" y1="60" x2="200" y2="80" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
            <line x1="200" y1="80" x2="220" y2="160" stroke="#f6b4db" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
            <line x1="100" y1="170" x2="180" y2="220" stroke="#8ee3c4" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
          </svg>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-full px-4 py-2.5 shadow-soft border border-brand-bg flex items-center gap-3">
        <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center"><Play size={12} className="text-white" fill="white"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Replay Presence</div>
          <div className="text-[10px] text-brand-mute font-mono">12:05 鈥?now</div>
        </div>
        <div className="flex-1 max-w-[100px] h-1 rounded-full bg-brand-bg relative">
          <div className="absolute left-0 top-0 h-1 w-3/4 rounded-full gradient-brand"/>
          <div className="absolute right-1/4 -top-1 w-3 h-3 rounded-full bg-brand-purple shadow"/>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[13px] font-bold">Social Activity Details</div>
        <div className="mt-2 space-y-1.5 text-[11px]">
          {[
            ["Current Location", "Interest Space"],
            ["Current Action", "Reviewing shared music interests"],
            ["Recent Interaction", "Suggested reconnecting with Jim"],
            ["Visibility Level", "Shared Presence Enabled"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <span className="text-brand-mute">{k}:</span>
              <span className="font-bold text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 mb-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-1.5"><Sparkles size={12} className="text-brand-purple"/> <div className="text-[13px] font-bold">AI Self Activity</div></div>
        <div className="mt-3 flex justify-center relative h-[150px]">
          {[1, 0.7, 0.45].map((s, i) => (
            <motion.div key={i} animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }} className="absolute top-1/2 left-1/2 rounded-full border-2 border-brand-lavender/50" style={{ width: 130 * s, height: 130 * s, marginLeft: -65 * s, marginTop: -65 * s }}/>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full gradient-brand shadow-glow"/>
        </div>
        <div className="mt-2 text-[10px] text-brand-mute text-center">AI Self Activity Explanation</div>
      </div>

      <BottomNav active="PRESENCE"/>
    </div>
  );
}
