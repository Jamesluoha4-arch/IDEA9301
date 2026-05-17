import { motion } from "framer-motion";
import { X, Check, Smile, Clock, Bell, Sparkles, Calendar, ChevronRight } from "lucide-react";

export function F76_CheckinSaved() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <X size={18} className="text-brand-ink"/>
        <div className="flex-1 text-center text-[15px] font-bold">Check-in saved</div>
        <div className="w-5"/>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-16 h-16 rounded-full bg-brand-bg/60 flex items-center justify-center">
          <Check size={28} className="text-brand-ink"/>
        </motion.div>
        <div className="mt-3 text-[16px] font-bold text-center px-6">Your check-in has been saved.</div>
        <div className="text-[11px] text-brand-mute text-center px-8 mt-1.5">Thanks for taking a moment to care for this relationship.</div>
      </div>

      <div className="mx-4 mt-5 bg-white border border-brand-bg rounded-2xl p-3.5">
        <div className="text-[12px] font-bold mb-2">Your choice</div>
        <div className="space-y-2">
          {[
            { Icon: Smile, k: "Feeling", v: "Becoming distant" },
            { Icon: Clock, k: "Next step", v: "Maybe later" },
          ].map(({ Icon, k, v }) => (
            <div key={k} className="flex items-center gap-3 py-1.5 border-t border-brand-bg first:border-0 pt-2 first:pt-0">
              <div className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center"><Icon size={14} className="text-brand-ink"/></div>
              <div>
                <div className="text-[10px] text-brand-mute">{k}</div>
                <div className="text-[12px] font-bold">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5 text-[13px] font-bold">What happens next?</div>
      <div className="mx-4 mt-2 space-y-2">
        {[
          { Icon: Bell, t: "Reminders paused for 3 days" },
          { Icon: Sparkles, t: "AI will give only light support" },
          { Icon: Calendar, t: "Next check-in around May 9" },
        ].map(({ Icon, t }) => (
          <div key={t} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white border border-brand-bg">
            <Icon size={14} className="text-brand-ink"/>
            <div className="text-[12px] flex-1">{t}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 p-3 rounded-2xl bg-brand-bg/50 flex items-center gap-3">
        <Clock size={13} className="text-brand-mute"/>
        <div className="text-[11px] text-brand-mute">This relationship stays in your active list.</div>
      </div>

      <button className="mx-5 mt-6 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">Back to Alex Chen</button>
      <button className="mx-5 mt-2 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold flex items-center justify-center gap-1">View AI Trail <ChevronRight size={13}/></button>
    </div>
  );
}
