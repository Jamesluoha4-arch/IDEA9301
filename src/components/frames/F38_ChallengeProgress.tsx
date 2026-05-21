import { motion } from "framer-motion";
import { ArrowLeft, Calendar, TrendingUp, Check, Star, Bot } from "lucide-react";

export function F38_ChallengeProgress() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Daily Challenge</div>
        <Calendar size={16} className="text-brand-purple"/>
      </div>

      <div className="mt-2 flex justify-center">
        <div className="px-3 py-1.5 rounded-full bg-white border border-brand-bg text-[11px] font-bold text-brand-purple shadow-soft">
          馃晲 1 task left today
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full gradient-mint-sky flex items-center justify-center">
            <TrendingUp size={14} className="text-white"/>
          </div>
          <div className="text-[14px] font-bold">Today's Progress</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-brand-bg overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "67%" }} transition={{ duration: 1.2 }} className="h-full gradient-brand rounded-full"/>
              </div>
              <div className="text-[13px] font-bold">67%</div>
            </div>
            <div className="mt-3 flex gap-3 text-[11px]">
              <div className="flex items-center gap-1.5"><Check size={13} className="text-brand-purple"/> 2 / 3 completed</div>
              <div className="w-px bg-brand-bg"/>
              <div className="flex items-center gap-1.5"><Star size={13} className="text-brand-peach"/> Earn +20 pts</div>
            </div>
          </div>
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="relative w-14 h-14 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center">
            <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center">
              <Bot size={18} className="text-white"/>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Today's Tasks</div>

      <div className="mx-4 mt-2 space-y-2.5">
        <Row done t="Review AI Change Details" d="Check why your Second Self changed today." badge="Completed"/>
        <Row t="Make One Boundary Decision" d="Accept, edit, or ignore AI support." badge="Start Decision"/>
        <Row done t="Check One Control Setting" d="Review whether today's AI level still feels right." badge="Completed"/>
      </div>

      <button className="mx-4 mt-5 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">
        Continue Challenge
      </button>
    </div>
  );
}

function Row({ done, t, d, badge }: { done?: boolean; t: string; d: string; badge: string }) {
  return (
    <div className="bg-white rounded-2xl p-3.5 flex items-start gap-3 shadow-soft border border-white">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${done ? "gradient-brand" : "border-2 border-brand-bg"}`}>
        {done && <Check size={14} className="text-white"/>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold">{t}</div>
        <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{d}</div>
      </div>
      <button className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${done ? "bg-brand-bg text-brand-mute" : "gradient-brand text-white"}`}>{badge}</button>
    </div>
  );
}
