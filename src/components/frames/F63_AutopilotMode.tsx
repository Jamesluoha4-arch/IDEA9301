import { motion } from "framer-motion";
import { ArrowLeft, Bot, Zap, Send, Clock, Bell, Info } from "lucide-react";

export function F63_AutopilotMode() {
  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">Auto-pilot</div>
        <div className="w-5" />
      </div>

      <div className="mt-3 flex flex-col items-center">
        <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-brand-peach/60 flex items-center justify-center">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
            {[0, 90, 180, 270].map((deg, i) => (
              <div key={i} className="absolute left-1/2 top-1/2 w-2 h-2 rounded bg-brand-peach/70" style={{ transform: `rotate(${deg}deg) translateY(-86px)` }} />
            ))}
          </motion.div>
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-20 h-20 rounded-3xl gradient-pink-peach flex items-center justify-center shadow-glow">
            <Bot size={36} className="text-white" />
          </motion.div>
        </div>
        <div className="mt-4 px-3 py-1.5 rounded-full gradient-pink-peach text-white text-[11px] font-bold shadow-glow flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Acting
        </div>
      </div>

      <div className="mx-4 mt-5 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[14px] font-bold mb-3">In this mode, AI can:</div>
        {[
          { Icon: Zap, t: "Act on your behalf" },
          { Icon: Send, t: "Send messages automatically" },
          { Icon: Clock, t: "Handle most interactions" },
          { Icon: Bell, t: "You'll be notified of actions" },
        ].map(({ Icon, t }) => (
          <div key={t} className="py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-peach/20 flex items-center justify-center"><Icon size={14} className="text-brand-peach" /></div>
            <div className="text-[12px]">{t}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-8 h-8 rounded-full bg-brand-peach/15 flex items-center justify-center"><Info size={13} className="text-brand-peach" /></div>
        <div className="text-[11px] text-brand-mute">Maximum autonomy. Use with caution.</div>
      </div>

      <button className="mx-4 mt-3 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">Switch to Auto-pilot</button>
    </div>
  );
}
