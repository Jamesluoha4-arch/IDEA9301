import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight, Eye, Sparkles, ShieldCheck, Zap, Check } from "lucide-react";

const modes = [
  { Icon: Eye, t: "Observer", d: "AI only observes and shows insights. It won't suggest or interact.", tag: "MINIMAL AI", g: "from-slate-700 to-slate-900" },
  { Icon: Sparkles, t: "Co-pilot", d: "AI can suggest and draft, but won't act without your approval.", tag: "BALANCED", g: "from-brand-purple to-brand-pink" },
  { Icon: ShieldCheck, t: "Assistant", d: "AI can draft and prepare actions for you to review and approve.", tag: "HIGH AUTONOMY", g: "from-brand-sky to-brand-mint" },
  { Icon: Zap, t: "Auto-pilot", d: "AI can act on your behalf in most situations.", tag: "MAXIMUM AUTONOMY", g: "from-brand-peach to-brand-pink" },
];

export function F59_ChangeAIMode() {
  const [selected, setSelected] = useState("Co-pilot");

  return (
    <div className="relative w-full h-full pt-12 overflow-hidden font-sans text-brand-ink gradient-brand-soft">
      <div className="absolute inset-0 bg-brand-ink/20"/>
      <motion.div initial={{ y: 600 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 25 }} className="absolute bottom-0 inset-x-0 bg-white rounded-t-[28px] p-5 pb-8 max-h-[88%] overflow-y-auto shadow-[0_-10px_40px_rgba(31,31,46,0.25)]">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-brand-bg mb-3"/>

        <div className="flex items-start justify-between">
          <div className="flex-1 text-center pl-5">
            <div className="text-[18px] font-bold">Change AI Mode</div>
            <div className="text-[12px] text-brand-mute mt-1">Choose how much autonomy you want to give your AI.</div>
          </div>
          <button className="w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center"><X size={14}/></button>
        </div>

        <div className="mt-4 space-y-2.5">
          {modes.map((m, i) => (
            <motion.button
              key={m.t}
              onClick={() => setSelected(m.t)}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-2xl p-3 flex items-center gap-3 border text-left transition-all ${selected === m.t ? "border-brand-ink bg-white shadow-soft scale-[1.01]" : "border-brand-bg bg-white/80"}`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${m.g} flex items-center justify-center shrink-0 shadow-glow`}>
                <m.Icon size={22} className="text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold">{m.t}</div>
                <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{m.d}</div>
                <div className="text-[9px] font-bold tracking-[0.5px] text-brand-mute mt-1.5">{m.tag}</div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${selected === m.t ? "bg-brand-ink" : "border border-brand-bg"}`}>
                {selected === m.t && <Check size={12} className="text-white"/>}
              </div>
            </motion.button>
          ))}
        </div>

        <button className="w-full mt-5 py-3.5 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">Confirm Mode</button>
        <button className="w-full mt-2 py-2 text-[12px] font-bold flex items-center justify-center gap-1 text-brand-ink">
          Learn about each mode <ChevronRight size={12}/>
        </button>
      </motion.div>
    </div>
  );
}
