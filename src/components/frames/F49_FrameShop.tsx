import { motion } from "framer-motion";
import { ArrowLeft, Coins, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import defaultAvatarUrl from "@/assets/default-ai-self.svg";
import {
  AvatarFrameEffect,
  avatarFrames,
  frameUpdatedEvent,
  readAppliedAvatarFrame,
  readOwnedAvatarFrames,
  setSelectedAvatarFrame,
} from "@/components/AvatarFrameEffect";
import { readGeneratedAvatar } from "@/lib/avatar-generation";
import { pointsUpdatedEvent, readChallengePoints } from "@/lib/icebreaking-challenge";

export function F49_FrameShop() {
  const avatar = readGeneratedAvatar() || defaultAvatarUrl;
  const [points, setPoints] = useState(readChallengePoints);
  const [appliedFrame, setAppliedFrame] = useState(readAppliedAvatarFrame);
  const [ownedFrames, setOwnedFrames] = useState(readOwnedAvatarFrames);

  useEffect(() => {
    const refreshPoints = () => setPoints(readChallengePoints());
    const refreshFrames = () => {
      setAppliedFrame(readAppliedAvatarFrame());
      setOwnedFrames(readOwnedAvatarFrames());
    };

    window.addEventListener(pointsUpdatedEvent, refreshPoints);
    window.addEventListener(frameUpdatedEvent, refreshFrames);
    return () => {
      window.removeEventListener(pointsUpdatedEvent, refreshPoints);
      window.removeEventListener(frameUpdatedEvent, refreshFrames);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-y-auto gradient-brand-soft px-5 pb-12 pt-12 font-sans text-brand-ink prototype-scroll">
      <div className="flex items-center gap-3 py-3">
        <button
          type="button"
          data-prototype-back="3:0"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/75 shadow-sm"
        >
          <ArrowLeft size={18} className="text-brand-purple" />
        </button>
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
        <div className="w-8" />
      </div>

      <div className="rounded-3xl border border-white bg-white/80 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <AvatarFrameEffect avatar={avatar} frame={appliedFrame} size={102} />
          <div className="min-w-0 flex-1">
            <div className="text-[18px] font-bold">{appliedFrame.name}</div>
            <div className="mt-1 text-[11px] leading-[15px] text-brand-mute">
              Spend icebreaking points on animated avatar frames.
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-bg px-2.5 py-1 text-[11px] font-bold text-brand-purple">
              <Coins size={12} />
              {points} pts available
            </div>
          </div>
        </div>
        <button
          type="button"
          data-prototype-target="6:3"
          className="mt-3 flex w-full items-center justify-between rounded-2xl border border-brand-lavender/20 bg-white/72 px-3 py-2.5 text-left text-[11px] font-bold text-brand-purple shadow-sm"
        >
          <span>How to earn more points</span>
          <span className="rounded-full gradient-brand px-2 py-1 text-[10px] text-white">
            Points Guide
          </span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {avatarFrames.map((frame, index) => {
          const isApplied = appliedFrame.id === frame.id;
          const isOwned = ownedFrames.includes(frame.id);

          return (
            <button
              key={frame.id}
              type="button"
              data-prototype-target="6:2"
              onPointerDown={() => setSelectedAvatarFrame(frame.id)}
              className={`rounded-2xl border bg-white/82 p-4 text-left shadow-soft backdrop-blur-xl ${
                isApplied ? "border-brand-purple/45" : "border-white"
              }`}
            >
              <motion.div
                animate={{ y: [0, index % 2 ? -3 : 2, 0] }}
                transition={{ duration: 2.4 + index * 0.2, repeat: Infinity }}
                className="mb-3 flex min-h-[86px] items-center"
              >
                <AvatarFrameEffect avatar={avatar} frame={frame} size={74} compact />
              </motion.div>
              <div className="text-[13px] font-bold">{frame.name}</div>
              <div className="mt-1 flex items-center justify-between gap-2 text-[10px]">
                <span className="text-brand-mute">
                  {isApplied ? "Applied" : isOwned ? "Owned" : `${frame.price} pts`}
                </span>
                <Sparkles size={12} className="text-brand-pink" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
