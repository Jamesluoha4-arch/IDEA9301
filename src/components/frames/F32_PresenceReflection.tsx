import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, MessageSquare, TrendingUp, Pause } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "./F09_Home";

const reflections = [
  { t: "11:48", b: "Long pauses appeared more frequently during late-night conversations." },
  { t: "10:16", b: "AI adapted response tone toward reassurance patterns." },
  { t: "Yesterday", b: "Emotionally familiar topics triggered longer interaction durations." },
  { t: "This week", b: "AI-generated suggestions reduced response latency between users." },
];

const relationships = [
  { t: "Jim", d: "Frequent revisits", v: 78, g: "from-brand-purple to-brand-pink" },
  { t: "Shared interests", d: "Topic cluster", v: 62, g: "from-brand-sky to-brand-mint" },
  { t: "Close relationship", d: "Emotionally active", v: 34, g: "from-brand-pink to-brand-peach" },
];

export function F32_PresenceReflection() {
  const [toggles, setToggles] = useState([false, true, true, false]);
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 pt-2 flex items-center gap-3">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div>
          <div className="text-[14px] font-bold tracking-[0.4px]">AI PRESENCE REFLECTION</div>
          <div className="text-[9px] font-mono text-brand-mute">SYSTEM_VISIBILITY_V1.0</div>
        </div>
      </div>
      <div className="px-5 mt-2 text-[11px] text-brand-mute">Reviewing recent patterns of AI-assisted social interaction.</div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[9px] font-bold tracking-[0.6px] text-brand-mute">PRESENCE PATTERN OVERVIEW</div>
        <div className="mt-2 flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-[10px] text-brand-mute">Main Observation</div>
            <div className="mt-1 text-[16px] font-bold leading-[20px]">AI spent longer adapting to <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">emotional tone</span> patterns this week.</div>
          </div>
          <div className="bg-brand-bg rounded-xl p-2 w-[80px]">
            <div className="text-[8px] text-brand-mute">Tone adaption</div>
            <svg viewBox="0 0 60 30" className="w-full mt-1">
              <polyline points="0,20 12,18 24,15 36,10 48,8 60,4" fill="none" stroke="#6c5ce7" strokeWidth="1.5"/>
              <circle cx="60" cy="4" r="2" fill="#f6b4db"/>
            </svg>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[["Context", "Private chats"], ["Trend", "Increasing"], ["Duration", "2h 14m"]].map(([k, v]) => (
            <div key={k} className="bg-brand-bg/50 rounded-xl px-2 py-2">
              <div className="text-[9px] text-brand-mute">{k}</div>
              <div className="text-[11px] font-bold mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Conversation Tone Reflection</div>
      <div className="px-5 text-[10px] text-brand-mute">Quiet observations from recent conversations.</div>
      <div className="mx-4 mt-2 grid grid-cols-2 gap-2">
        {reflections.map((r, i) => (
          <motion.div key={r.t} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.04 * i }} className="bg-white rounded-2xl p-2.5 shadow-soft border border-brand-bg">
            <div className="flex items-center gap-1 text-[10px] font-mono text-brand-purple"><MessageSquare size={10}/> {r.t}</div>
            <div className="text-[10px] mt-1 leading-[13px] text-brand-ink/80">{r.b}</div>
          </motion.div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-bold">Relationship Impact Layer</div>
          <button className="px-3 py-1 rounded-full bg-brand-ink text-white text-[10px] font-bold">View Details</button>
        </div>
        <div className="text-[10px] text-brand-mute mt-1">Where AI support is concentrated across relationships.</div>
        <div className="mt-3 text-[9px] font-bold tracking-[0.5px] text-brand-mute">AI-ASSISTED DENSITY</div>
        <div className="mt-2 space-y-2">
          {relationships.map((r) => (
            <div key={r.t} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${r.g}`}/>
              <div className="flex-1">
                <div className="text-[11px] font-bold">{r.t}</div>
                <div className="text-[9px] text-brand-mute">{r.d}</div>
              </div>
              <div className="w-[80px] h-2 rounded-full bg-brand-bg overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${r.v}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full bg-gradient-to-r ${r.g}`}/>
              </div>
              <div className="text-[10px] font-bold w-[28px] text-right">{r.v}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[14px] font-bold">Visibility Adjustment</div>
        <div className="mt-3 space-y-2.5">
          {["Reduce Emotional Adaptation", "Limit Passive Observation", "Pause Reconnect Suggestions", "Restrict Relationship Analysis"].map((t, i) => (
            <div key={t} className="flex items-center justify-between">
              <div className="text-[11px]">{t}</div>
              <button onClick={() => setToggles((a) => a.map((x, j) => j === i ? !x : x))} className={`relative w-9 h-5 rounded-full transition-colors ${toggles[i] ? "gradient-brand" : "bg-brand-bg"}`}>
                <motion.div layout className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${toggles[i] ? "right-0.5" : "left-0.5"}`}/>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-[10px] text-brand-mute">AI Participation Level</div>
        <div className="mt-1 relative h-1.5 rounded-full bg-brand-bg">
          <div className="absolute left-0 top-0 h-1.5 w-1/2 rounded-full gradient-brand"/>
          <div className="absolute left-1/2 -top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-brand-purple -translate-x-1/2 shadow"/>
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-brand-mute"><span>Minimal</span><span>Balanced</span><span>Active</span></div>
        <button className="mt-4 w-full py-2.5 rounded-full bg-brand-bg text-[11px] font-bold flex items-center justify-center gap-1.5"><Pause size={11}/> Pause AI Social Presence</button>
      </div>

      <div className="mx-4 mt-3 mb-4 px-4 py-3 rounded-2xl bg-white/50 border border-brand-bg text-[10px] text-brand-mute text-center leading-[14px]">
        Most AI participation occurred during moments of reduced human interaction.
      </div>

      <BottomNav active="AI"/>
    </div>
  );
}
