import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Check, Sparkles, ChevronRight } from "lucide-react";

export function F37_DailyChallenge() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Daily Challenge</div>
        <div className="w-5"/>
      </div>

      {/* Hero */}
      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 flex items-center gap-3 shadow-soft border border-white">
        <div className="flex-1">
          <div className="text-[16px] font-bold">Today's Boundary Challenge</div>
          <div className="text-[11px] text-brand-mute mt-1.5 leading-[15px]">Keep your AI support visible and under your control.</div>
        </div>
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }} className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-glow">
          <Trophy size={26} className="text-white"/>
        </motion.div>
      </div>

      {/* Progress */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="text-[14px] font-bold">1 / 3 completed</div>
        <div className="mt-2 h-1.5 rounded-full bg-brand-bg overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "33%" }} transition={{ duration: 1 }} className="h-full gradient-brand rounded-full"/>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-[11px] text-brand-mute">Reward: Complete all tasks today to earn</div>
          <div className="px-2.5 py-1 rounded-full gradient-pink-peach text-white text-[10px] font-bold">+20 pts</div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Today's Tasks</div>

      <div className="mx-4 mt-2 space-y-2.5">
        <TaskCard done t="Review AI Change Details" d="Check why your Second Self changed today." badge="Completed"/>
        <TaskCard t="Make One Boundary Decision" d="Accept, edit, or ignore AI support." badge="Start Decision"/>
        <TaskCard t="Check One Control Setting" d="Review whether today's AI level still feels right." badge="Review Control"/>

        {[1, 2].map((i) => (
          <div key={i} className="bg-white/70 rounded-2xl p-3 flex items-center gap-3 border border-white">
            <div className="w-7 h-7 rounded-full gradient-brand-soft flex items-center justify-center">
              <Sparkles size={13} className="text-brand-purple"/>
            </div>
            <div className="flex-1 text-[11px] text-brand-mute">Missed challenge? A short reflection can protect your streak once this week.</div>
            <ChevronRight size={14} className="text-brand-mute"/>
          </div>
        ))}
      </div>

      <button className="mx-4 mt-5 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">
        Continue Challenge
      </button>
    </div>
  );
}

function TaskCard({ done, t, d, badge }: { done?: boolean; t: string; d: string; badge: string }) {
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
