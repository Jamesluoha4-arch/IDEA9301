import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  HelpCircle,
  Info,
  MessageCircle,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  challengeUpdatedEvent,
  icebreakingTasks,
  pointsUpdatedEvent,
  readChallengePoints,
  readIcebreakingProgress,
} from "@/lib/icebreaking-challenge";

const ruleIcons = [MessageCircle, HelpCircle, Sparkles];

export function F55_PointsGuide() {
  const [points, setPoints] = useState(readChallengePoints);
  const [progress, setProgress] = useState(readIcebreakingProgress);
  const earned = icebreakingTasks.reduce(
    (sum, task) => sum + (progress[task.id] ? task.reward : 0),
    0,
  );
  const total = icebreakingTasks.reduce((sum, task) => sum + task.reward, 0);
  const percent = `${(earned / total) * 100}%`;

  useEffect(() => {
    const refresh = () => {
      setPoints(readChallengePoints());
      setProgress(readIcebreakingProgress());
    };
    window.addEventListener(challengeUpdatedEvent, refresh);
    window.addEventListener(pointsUpdatedEvent, refresh);
    return () => {
      window.removeEventListener(challengeUpdatedEvent, refresh);
      window.removeEventListener(pointsUpdatedEvent, refresh);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-y-auto pb-12 pt-12 font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pb-2 pt-3 flex items-center gap-3">
        <button type="button" data-prototype-target="6:1">
          <ChevronLeft size={20} className="text-brand-purple" />
        </button>
        <div className="flex-1 text-center text-[15px] font-bold">Points Guide</div>
        <div className="w-5" />
      </div>

      <div className="mx-4 mt-3 flex items-center gap-4 rounded-2xl border border-white bg-white p-4 shadow-soft">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-bg"
          >
            <Star size={22} className="text-brand-purple" />
          </motion.div>
          <div className="mt-2 text-[20px] font-bold">{points} pts</div>
          <div className="text-[10px] text-brand-mute">Available Points</div>
        </div>
        <div className="h-20 w-px bg-brand-bg" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-mute">
            <TrendingUp size={11} className="text-brand-mint" /> Today earned
          </div>
          <div className="mt-1 text-[22px] font-bold">
            {earned} <span className="text-[14px] font-normal text-brand-mute">/ {total} pts</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-bg">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: percent }}
              transition={{ duration: 1.2 }}
              className="h-full gradient-brand"
            />
          </div>
          <div className="mt-1 text-[10px] text-brand-mute">
            Earn points by finishing Jim icebreakers.
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">How to earn points</div>
      <div className="px-5 mt-0.5 text-[11px] text-brand-mute">
        Complete real Jim chat actions to unlock frame effects.
      </div>

      <div className="mx-4 mt-2 divide-y divide-brand-bg rounded-2xl border border-white bg-white shadow-soft">
        {icebreakingTasks.map((task, index) => {
          const Icon = ruleIcons[index];
          return (
            <motion.div
              key={task.id}
              initial={{ x: -6, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.06 }}
              className="flex items-start gap-3 p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-brand-soft">
                <Icon size={14} className="text-brand-purple" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold leading-tight">{task.title}</div>
                <div className="mt-0.5 text-[10px] leading-[14px] text-brand-mute">
                  {task.detail}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="text-[12px] font-bold text-brand-ink">+{task.reward} pts</div>
                <Info size={11} className="text-brand-mute" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mx-4 mt-4 rounded-2xl border border-white bg-white p-4 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-mint-sky">
            <Gift size={14} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">How points are used</div>
            <div className="mt-2 space-y-2 text-[11px] leading-[16px] text-brand-mute">
              <p>Icebreaking Challenge is your point source.</p>
              <p>Only messages you actively send to Jim count toward those tasks.</p>
              <p>Use points to unlock avatar frames in Frame Shop.</p>
              <p>Frames change appearance, not AI permissions.</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          data-prototype-target="6:0"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-bg bg-white py-3 text-[12px] font-bold"
        >
          <Gift size={13} className="text-brand-purple" />
          Go to Icebreaking Challenge
          <ChevronRight size={12} className="ml-auto" />
        </button>
      </div>

      <button
        type="button"
        data-prototype-target="6:1"
        className="mx-4 mt-3 w-[calc(100%-2rem)] rounded-2xl bg-brand-ink py-3.5 text-[13px] font-bold text-white shadow-soft"
      >
        Back to Frame Shop
      </button>
    </div>
  );
}
