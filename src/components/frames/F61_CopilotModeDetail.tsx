import { motion } from "framer-motion";
import { ChevronLeft, Lightbulb, Edit3, Search, Hand, Info } from "lucide-react";

export function F61_CopilotModeDetail() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ChevronLeft size={20} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Co-pilot</div>
        <div className="w-5"/>
      </div>

      <div className="mt-6 mx-auto relative w-[200px] h-[200px] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed border-brand-lavender/60"/>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-24 h-24 rounded-3xl gradient-brand flex items-center justify-center shadow-glow">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">
            <div className="text-3xl">🤖</div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center mt-3">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="px-3.5 py-1.5 rounded-full bg-brand-ink text-white text-[11px] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white"/> Active
        </motion.div>
      </div>

      <div className="mx-4 mt-6 bg-white rounded-2xl p-4 border border-brand-bg shadow-soft">
        <div className="text-[13px] font-bold">In this mode, AI can:</div>
        <div className="mt-3 space-y-2.5">
          {[
            { Icon: Lightbulb, t: "Suggest topics and ideas" },
            { Icon: Edit3, t: "Draft replies for you" },
            { Icon: Search, t: "You review before sending" },
            { Icon: Hand, t: "It won't act automatically" },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-3">
              <r.Icon size={14} className="text-brand-purple"/>
              <div className="text-[12px]">{r.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-3 flex items-center gap-2 text-[11px] text-brand-mute">
        <Info size={12}/> Balanced support with your control.
      </div>

      <button className="mx-4 mt-8 w-[calc(100%-2rem)] py-4 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">Switch to Co-pilot</button>
    </div>
  );
}
