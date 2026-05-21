import { motion } from "framer-motion";
import { ArrowLeft, Bot, Edit3, Wand2, CheckSquare, Heart, Info } from "lucide-react";
import { BottomNav } from "./F09_Home";

export function F62_AssistantMode() {
  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">Assistant</div>
        <div className="w-5" />
      </div>

      <div className="mt-3 flex flex-col items-center">
        <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-sm bg-brand-lavender/60"
                style={{ transform: `rotate(${deg}deg) translateY(-86px)` }}
              />
            ))}
          </motion.div>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center shadow-glow"
          >
            <Bot size={36} className="text-white" />
          </motion.div>
        </div>
        <div className="mt-4 px-3 py-1.5 rounded-full bg-white border border-brand-bg text-[11px] font-bold text-brand-purple shadow-soft flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full gradient-brand" /> Ready
        </div>
      </div>

      <div className="mx-4 mt-5 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[14px] font-bold mb-3">In this mode, AI can:</div>
        {[
          { Icon: Edit3, t: "Draft replies and messages" },
          { Icon: Wand2, t: "Prepare actions for you" },
          { Icon: CheckSquare, t: "You review and approve" },
          { Icon: Heart, t: "It won't act without approval" },
        ].map(({ Icon, t }) => (
          <div key={t} className="py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl gradient-brand-soft flex items-center justify-center">
              <Icon size={14} className="text-brand-purple" />
            </div>
            <div className="text-[12px]">{t}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
          <Info size={13} className="text-brand-purple" />
        </div>
        <div className="text-[11px] text-brand-mute">High autonomy, still in your control.</div>
      </div>

      <button className="mx-4 mt-3 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">
        Switch to Assistant
      </button>

      <BottomNav active="AI" />
    </div>
  );
}
