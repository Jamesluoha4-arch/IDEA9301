import { motion } from "framer-motion";
import { ChevronLeft, Star, TrendingUp, ClipboardCheck, CheckCircle2, RefreshCw, FileText, Flame, Trophy, ChevronRight, Gift, Info } from "lucide-react";

const rules = [
  { Icon: ClipboardCheck, t: "Daily Challenge", d: "Complete all daily challenge tasks.", pts: "+20 pts" },
  { Icon: CheckCircle2, t: "Daily Decision", d: "Make a clear choice when AI asks for confirmation.", pts: "+10 pts" },
  { Icon: RefreshCw, t: "Reflection Recovery", d: "If you miss a daily challenge, complete a short reflection.", pts: "+5 pts" },
  { Icon: FileText, t: "Review AI Change Details", d: "Check why your Second Self changed state.", pts: "+5 pts" },
  { Icon: Flame, t: "3-Day Control Streak", d: "Keep AI actions reviewed for 3 days.", pts: "+30 pts" },
  { Icon: Trophy, t: "Weekly Boundary Check-in", d: "Review your overall AI control settings once a week.", pts: "+50 pts" },
];

export function F55_PointsGuide() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ChevronLeft size={20} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Points Guide</div>
        <div className="w-5"/>
      </div>

      {/* Summary card */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-white flex items-center gap-4">
        <div className="flex flex-col items-center">
          <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-14 h-14 rounded-full border-2 border-brand-bg flex items-center justify-center">
            <Star size={22} className="text-brand-purple"/>
          </motion.div>
          <div className="text-[20px] font-bold mt-2">180 pts</div>
          <div className="text-[10px] text-brand-mute">Available Points</div>
        </div>
        <div className="w-px h-20 bg-brand-bg"/>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-mute">
            <TrendingUp size={11} className="text-brand-mint"/> Today earned
          </div>
          <div className="text-[22px] font-bold mt-1">35 <span className="text-[14px] text-brand-mute font-normal">/ 60 pts</span></div>
          <div className="mt-2 h-1.5 rounded-full bg-brand-bg overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "58%" }} transition={{ duration: 1.2 }} className="h-full gradient-brand"/>
          </div>
          <div className="text-[10px] text-brand-mute mt-1">You can still earn 25 pts today.</div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">How to earn points</div>
      <div className="text-[11px] text-brand-mute px-5 mt-0.5">Complete these actions to earn points every day.</div>

      <div className="mx-4 mt-2 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft border border-white">
        {rules.map((r, i) => (
          <motion.div key={r.t} initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }} className="p-3 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl gradient-brand-soft flex items-center justify-center shrink-0">
              <r.Icon size={14} className="text-brand-purple"/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold leading-tight">{r.t}</div>
              <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{r.d}</div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="text-[12px] font-bold text-brand-ink">{r.pts}</div>
              <Info size={11} className="text-brand-mute"/>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How points are used */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl gradient-mint-sky flex items-center justify-center shrink-0"><Gift size={14} className="text-white"/></div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">How points are used</div>
            <div className="text-[11px] text-brand-mute leading-[16px] mt-2 space-y-2">
              <p>Daily Challenge is your main point source.</p>
              <p>If you miss a task, Reflection Recovery gives fewer points but keeps you engaged.</p>
              <p>Use points to unlock avatar frames in Frame Shop.</p>
              <p>Frames only change appearance, not AI permissions.</p>
            </div>
          </div>
        </div>
        <button className="mt-3 w-full py-3 rounded-2xl bg-white border border-brand-bg text-[12px] font-bold flex items-center justify-center gap-2">
          <Gift size={13} className="text-brand-purple"/> Go to Daily Challenge <ChevronRight size={12} className="ml-auto"/>
        </button>
      </div>

      <button className="mx-4 mt-3 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">Back to Frame Shop</button>
    </div>
  );
}
