import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, MessageCircle, Sparkles, Trophy } from "lucide-react";
import {
  challengeUpdatedEvent,
  icebreakingTasks,
  pointsUpdatedEvent,
  readChallengePoints,
  readIcebreakingProgress,
  type IcebreakingTaskId,
} from "@/lib/icebreaking-challenge";

export function F37_DailyChallenge() {
  const [progress, setProgress] = useState(readIcebreakingProgress);
  const [points, setPoints] = useState(readChallengePoints);
  const completedCount = icebreakingTasks.filter((task) => progress[task.id]).length;
  const rewardTotal = icebreakingTasks.reduce((sum, task) => sum + task.reward, 0);
  const percent = `${(completedCount / icebreakingTasks.length) * 100}%`;
  const activeTask =
    icebreakingTasks.find((task) => !progress[task.id]) ?? icebreakingTasks.at(-1);

  useEffect(() => {
    const refresh = () => {
      setProgress(readIcebreakingProgress());
      setPoints(readChallengePoints());
    };
    window.addEventListener(challengeUpdatedEvent, refresh);
    window.addEventListener(pointsUpdatedEvent, refresh);
    return () => {
      window.removeEventListener(challengeUpdatedEvent, refresh);
      window.removeEventListener(pointsUpdatedEvent, refresh);
    };
  }, []);

  const prompt = useMemo(() => {
    if (completedCount === 0) return "Open Jim's chat and start with your own Hi.";
    if (completedCount === 1) return "The hello landed. Ask Jim one first-week question next.";
    if (completedCount === 2) return "You are in motion. Share one small detail from your own week.";
    return "Ice broken. You earned every point in today's challenge.";
  }, [completedCount]);

  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <button
          type="button"
          data-prototype-back="3:0"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/72 shadow-sm"
        >
          <ArrowLeft size={18} className="text-brand-purple" />
        </button>
        <div className="flex-1 text-center text-[15px] font-bold">Icebreaking Challenge</div>
        <div className="w-8" />
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 flex items-center gap-3 shadow-soft border border-white">
        <div className="flex-1">
          <div className="text-[16px] font-bold">Today's Icebreaking Challenge</div>
          <div className="text-[11px] text-brand-mute mt-1.5 leading-[15px]">
            Practice a real first-week opener with Jim and let the system detect each step.
          </div>
        </div>
        <motion.div
          animate={{ scale: [0.94, 1.06, 0.94], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-glow"
        >
          <Trophy size={26} className="text-white" />
        </motion.div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-bold">{completedCount} / 3 completed</div>
          <div className="rounded-full bg-brand-bg px-2.5 py-1 text-[10px] font-bold text-brand-purple">
            {points} pts available
          </div>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-brand-bg overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: percent }}
            transition={{ duration: 0.8 }}
            className="h-full gradient-brand rounded-full"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-[11px] leading-[15px] text-brand-mute">{prompt}</div>
          <div className="px-2.5 py-1 rounded-full gradient-pink-peach text-white text-[10px] font-bold whitespace-nowrap">
            +{rewardTotal} pts
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Today's Tasks</div>
      <div className="mx-4 mt-2 space-y-2.5">
        {icebreakingTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            done={progress[task.id]}
            current={activeTask?.id === task.id}
            title={task.title}
            detail={task.detail}
            reward={task.reward}
          />
        ))}
      </div>

      <div className="mx-4 mt-4 rounded-2xl border border-white bg-white/72 p-3 shadow-soft">
        <div className="flex items-start gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl gradient-brand-soft text-brand-purple">
            <Sparkles size={15} />
          </span>
          <div>
            <div className="text-[12px] font-bold">Live detection</div>
            <div className="mt-0.5 text-[10px] leading-[14px] text-brand-mute">
              Only messages you actively send to Jim count toward this icebreaking challenge.
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-prototype-person="Jim"
        data-prototype-target="1:6"
        className="mx-4 mt-5 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-2xl bg-brand-ink py-3.5 text-[14px] font-bold text-white shadow-soft"
      >
        <MessageCircle size={15} />
        Message Jim
      </button>
    </div>
  );
}

function TaskCard({
  id,
  done,
  current,
  title,
  detail,
  reward,
}: {
  id: IcebreakingTaskId;
  done: boolean;
  current: boolean;
  title: string;
  detail: string;
  reward: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-3.5 flex items-start gap-3 shadow-soft border border-white">
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          done ? "gradient-brand" : current ? "border-2 border-brand-purple/55" : "border-2 border-brand-bg"
        }`}
      >
        {done && <Check size={14} className="text-white" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-bold">{title}</div>
        <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{detail}</div>
      </div>
      <div
        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${
          done ? "bg-brand-mint/18 text-brand-purple" : "gradient-brand text-white"
        }`}
      >
        {done ? "Completed" : `+${reward} pts`}
      </div>
    </div>
  );
}
