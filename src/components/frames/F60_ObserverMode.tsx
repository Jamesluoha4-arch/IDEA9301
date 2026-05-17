import { motion } from "framer-motion";
import { ArrowLeft, Eye, Users, Clock, Sparkles, Info } from "lucide-react";

export function F60_ObserverMode() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Observer</div>
        <div className="w-5"/>
      </div>

      <div className="mt-6 mx-auto relative w-[200px] h-[200px] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed border-brand-bg">
          {[0, 90, 180, 270].map((deg) => (
            <div key={deg} className="absolute w-2 h-2 rounded-full bg-brand-lavender" style={{ top: "50%", left: "50%", transform: `rotate(${deg}deg) translate(0, -100px)` }}/>
          ))}
        </motion.div>
        <div className="w-20 h-20 rounded-3xl bg-white border-2 border-brand-ink flex items-center justify-center shadow-soft">
          <Eye size={30} className="text-brand-ink"/>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <div className="px-3 py-1 rounded-full bg-brand-bg text-[11px] font-bold flex items-center gap-1.5 text-brand-mute">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-mute"/> Idle
        </div>
      </div>

      <div className="mx-4 mt-6 bg-white rounded-2xl p-4 border border-brand-bg shadow-soft">
        <div className="text-[13px] font-bold">In this mode, AI can:</div>
        <div className="mt-3 space-y-2.5">
          {[
            { Icon: Sparkles, t: "Observe your conversations" },
            { Icon: Users, t: "Show insights and patterns" },
            { Icon: Clock, t: "Record activity history" },
            { Icon: Sparkles, t: "It won't suggest or interact" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-3">
              <r.Icon size={14} className="text-brand-purple"/>
              <div className="text-[12px]">{r.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-3 flex items-center gap-2 text-[11px] text-brand-mute">
        <Info size={12}/> Best for privacy and focus.
      </div>

      <button className="mx-4 mt-8 w-[calc(100%-2rem)] py-4 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">Switch to Observer</button>
    </div>
  );
}
