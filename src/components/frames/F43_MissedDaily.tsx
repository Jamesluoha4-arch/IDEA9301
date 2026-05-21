import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Info, Bot, Check, Sparkles, Music2 } from "lucide-react";

export function F43_MissedDaily() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Daily Challenge</div>
        <Calendar size={16} className="text-brand-purple"/>
      </div>

      <div className="mt-2 flex justify-center">
        <div className="px-3 py-1.5 rounded-full bg-brand-peach/20 text-brand-peach text-[11px] font-bold border border-brand-peach/30">
          鈯?Challenge missed today
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-start gap-3 shadow-soft border border-white">
        <div className="w-7 h-7 rounded-full bg-brand-bg flex items-center justify-center shrink-0"><Info size={13} className="text-brand-mute"/></div>
        <div className="text-[11px] text-brand-mute leading-[15px]">A challenge is marked missed if all 3 tasks are not completed by 11:59 PM. It switches to missed at 12:00 AM.</div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 flex items-center gap-3 shadow-soft border border-white">
        <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-16 h-16 rounded-2xl gradient-pink-peach flex items-center justify-center shadow-glow">
          <Bot size={26} className="text-white"/>
        </motion.div>
        <div className="flex-1">
          <div className="text-[14px] font-bold">Today's Boundary Challenge</div>
          <div className="text-[10px] text-brand-mute leading-[14px] mt-1">You completed part of today's challenge, but did not finish all tasks.</div>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-bold">1 / 3 completed</div>
          <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[10px] font-bold text-brand-mute">Reward not earned</div>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-brand-bg overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "33%" }} transition={{ duration: 1 }} className="h-full gradient-pink-peach rounded-full"/>
        </div>
        <div className="mt-2 text-[11px] text-brand-mute">Complete all tasks in one day to earn +20 pts.</div>
      </div>

      <div className="px-5 mt-4 text-[15px] font-bold">Today's Tasks</div>
      <div className="mx-4 mt-2 space-y-2.5">
        <Row done t="Review AI Change Details" d="Check why your Second Self changed today." badge="Completed"/>
        <Row missed t="Make One Boundary Decision" d="Accept, edit, or ignore AI support." badge="Missed"/>
        <Row missed t="Check One Control Setting" d="Review whether today's AI level still feels right." badge="Missed"/>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center shadow-glow shrink-0"><Sparkles size={16} className="text-white"/></div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">Keep your streak with a short reflection</div>
            <div className="text-[10px] text-brand-mute leading-[14px] mt-1">If you miss a daily challenge, you can complete a quick reflection to maintain your awareness.</div>
          </div>
        </div>
        <button className="w-full mt-3 py-3 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">Start Reflection</button>
        <button className="w-full mt-2 py-3 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Back to Home</button>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl gradient-mint-sky flex items-center justify-center"><Music2 size={15} className="text-white"/></div>
        <div className="flex-1 text-[11px]">Come back tomorrow for a new challenge.</div>
        <div className="px-2 py-0.5 rounded-full gradient-pink-peach text-white text-[9px] font-bold">3-day streak</div>
      </div>
    </div>
  );
}

function Row({ done, missed, t, d, badge }: { done?: boolean; missed?: boolean; t: string; d: string; badge: string }) {
  return (
    <div className="bg-white rounded-2xl p-3.5 flex items-start gap-3 shadow-soft border border-white">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${done ? "gradient-brand" : "border-2 border-brand-bg"}`}>
        {done && <Check size={14} className="text-white"/>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold">{t}</div>
        <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{d}</div>
      </div>
      <button className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${done ? "bg-brand-bg text-brand-mute" : missed ? "bg-brand-peach/20 text-brand-peach" : "gradient-brand text-white"}`}>{badge}</button>
    </div>
  );
}
