import { motion } from "framer-motion";
import { ArrowLeft, Calendar, TrendingUp, Check, Star, Package, Flame } from "lucide-react";

export function F39_ChallengeDone() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Daily Challenge</div>
        <Calendar size={16} className="text-brand-purple"/>
      </div>

      <div className="mt-2 flex justify-center">
        <div className="px-3 py-1.5 rounded-full gradient-brand text-white text-[11px] font-bold shadow-glow">
          ✓ All done today
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full gradient-mint-sky flex items-center justify-center"><TrendingUp size={14} className="text-white"/></div>
          <div className="text-[14px] font-bold">Today's Progress</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-brand-bg overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5 }} className="h-full gradient-brand rounded-full"/>
          </div>
          <div className="text-[14px] font-bold gradient-brand bg-clip-text text-transparent">100%</div>
        </div>
        <div className="mt-3 flex gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 font-bold"><Check size={13} className="text-brand-purple"/> 3 / 3 completed</div>
          <div className="w-px bg-brand-bg"/>
          <div className="flex items-center gap-1.5 font-bold"><Star size={13} className="text-brand-peach"/> +20 pts earned</div>
        </div>
        <div className="mt-2 text-[11px] text-brand-mute">You completed today's challenge set.</div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-[13px] font-bold mb-2.5">Completed Tasks</div>
        {[
          "Review AI Change Details",
          "Make One Boundary Decision",
          "Check One Control Setting",
        ].map((t) => (
          <div key={t} className="py-2 flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center"><Check size={11} className="text-white"/></div>
            <div className="flex-1 text-[12px]">{t}</div>
            <div className="px-2 py-0.5 rounded-full bg-brand-bg text-[9px] font-bold text-brand-mute">Completed</div>
          </div>
        ))}
      </div>

      {/* Reward unlocked */}
      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="flex items-start gap-3">
          <motion.div initial={{ rotate: -10 }} animate={{ rotate: 10 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }} className="w-12 h-12 rounded-2xl gradient-pink-peach flex items-center justify-center shadow-glow">
            <Package size={20} className="text-white"/>
          </motion.div>
          <div className="flex-1">
            <div className="text-[14px] font-bold">Reward unlocked</div>
            <div className="text-[10px] text-brand-mute leading-[14px] mt-1">Today's points have been added to your balance. You can now use points in Frame Shop to unlock avatar frames.</div>
          </div>
        </div>
        <button className="w-full mt-3 py-3 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">Go to Frame Shop</button>
        <button className="w-full mt-2 py-3 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Back to Home</button>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl bg-brand-peach/30 flex items-center justify-center"><Flame size={15} className="text-brand-peach"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Come back tomorrow for a new challenge.</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-full gradient-pink-peach text-white text-[9px] font-bold">3-day streak</div>
            <div className="text-[10px] text-brand-mute">Keep your streak to earn more points.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
