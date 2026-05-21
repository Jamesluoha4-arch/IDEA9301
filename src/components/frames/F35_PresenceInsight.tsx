import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Mic, HardDrive, MapPin, Bluetooth } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "./F09_Home";

const reflections = [
  { t: "12:42", b: "AI-assisted tone adaptation appeared more frequently during slower-paced conversations." },
  { t: "12:18", b: "Shared memory retrieval increased during reconnection-related interactions." },
  { t: "Yesterday", b: "Private conversations triggered longer periods of environmental awareness." },
  { t: "This week", b: "AI participation was highest in emotionally familiar interaction spaces." },
];

const layers = [
  { Icon: Mic, t: "microphone layer", x: 30, y: 30, g: "from-brand-purple to-brand-lavender" },
  { Icon: HardDrive, t: "storage layer", x: 180, y: 30, g: "from-brand-sky to-brand-mint" },
  { Icon: MapPin, t: "location layer", x: 30, y: 110, g: "from-brand-pink to-brand-peach" },
  { Icon: Bluetooth, t: "connectivity layer", x: 180, y: 110, g: "from-brand-mint to-brand-sky" },
];

export function F35_PresenceInsight() {
  const [toggles, setToggles] = useState([false, true, false, true]);
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 pt-2 flex items-center gap-3">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div>
          <div className="text-[14px] font-bold tracking-[0.4px]">AI PRESENCE INSIGHT</div>
          <div className="text-[9px] font-mono text-brand-mute">SYSTEM_VISIBILITY_V1.0</div>
        </div>
        <div className="ml-auto w-7 h-7 rounded-full gradient-brand flex items-center justify-center"><Sparkles size={12} className="text-white"/></div>
      </div>
      <div className="px-5 mt-2 text-[11px] text-brand-mute">Reviewing patterns of socially adaptive device interaction.</div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[9px] font-bold tracking-[0.6px] text-brand-mute">PRESENCE OVERVIEW</div>
        <div className="mt-2 text-[10px] text-brand-mute">Primary Observation</div>
        <div className="mt-1 text-[16px] font-bold leading-[20px]">Most device interaction occurred during <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">emotionally familiar</span> social exchanges.</div>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[10px]">
          {[
            ["Most Active Device Layer", "Microphone + Shared Memory"],
            ["AI Presence Trend", "Gradually Increasing"],
            ["Most Active Context", "Private conversations"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-brand-mute">{k}</div>
              <div className="font-bold">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Social Interaction Reflections</div>
      <div className="px-5 text-[10px] text-brand-mute">Device activity read through social meaning.</div>
      <div className="mx-4 mt-2 grid grid-cols-2 gap-2">
        {reflections.map((r, i) => (
          <motion.div key={r.t} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.04 * i }} className="bg-white rounded-2xl p-2.5 shadow-soft border border-brand-bg">
            <div className="text-[10px] font-mono text-brand-purple font-bold">{r.t}</div>
            <div className="text-[10px] mt-1 leading-[13px] text-brand-ink/80">{r.b}</div>
          </motion.div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[14px] font-bold">Device Participation Map</div>
        <div className="text-[10px] text-brand-mute">Hardware layers woven into social adaptation.</div>
        <div className="relative mt-3 h-[180px]">
          {layers.map((l, i) => (
            <motion.div key={l.t} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.08 * i, type: "spring" }} className="absolute flex flex-col items-center" style={{ left: l.x, top: l.y }}>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${l.g} flex items-center justify-center shadow-soft`}>
                <l.Icon size={18} className="text-white"/>
              </div>
              <div className="text-[9px] mt-1 text-brand-mute">{l.t}</div>
            </motion.div>
          ))}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="55" y1="55" x2="200" y2="55" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
            <line x1="55" y1="55" x2="55" y2="135" stroke="#f6b4db" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
            <line x1="200" y1="55" x2="200" y2="135" stroke="#8ee3c4" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
            <line x1="55" y1="135" x2="200" y2="135" stroke="#a7d8ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
          </svg>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[14px] font-bold">Visibility Adjustment</div>
        <div className="mt-3 space-y-2.5">
          {["Reduce emotional tone adaptation", "Limit passive environmental awareness", "Restrict shared memory retrieval", "Pause social recommendation assistance"].map((t, i) => (
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
        <button className="mt-4 w-full py-2.5 rounded-full bg-brand-bg text-[11px] font-bold">Pause All Device Presence</button>
      </div>

      <div className="mx-4 mt-3 mb-4 px-4 py-3 rounded-2xl bg-white/50 border border-brand-bg text-[10px] text-brand-mute text-center leading-[14px]">
        AI device awareness became more active during emotionally familiar interactions.
      </div>

      <BottomNav active="PRESENCE"/>
    </div>
  );
}
