import { motion } from "framer-motion";
import { ArrowLeft, Coins, LockKeyhole, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import {
  AvatarFrameEffect,
  FrameSpec,
  ownAvatarFrame,
  readAppliedAvatarFrame,
  readOwnedAvatarFrames,
  readSelectedAvatarFrame,
  setAppliedAvatarFrame,
} from "@/components/AvatarFrameEffect";
import { readGeneratedAvatar } from "@/lib/avatar-generation";
import {
  pointsUpdatedEvent,
  readChallengePoints,
  spendChallengePoints,
} from "@/lib/icebreaking-challenge";

const detailCopy = {
  "star-glow": {
    title: "Signature glow",
    note: "Violet sparks breathe around your default frame.",
    mood: "Starter",
  },
  "orbit-path": {
    title: "Orbit track",
    note: "Light points circle a crisp path around the avatar.",
    mood: "Focused",
  },
  "heart-halo": {
    title: "Heart halo",
    note: "Soft hearts lift and settle like a warm reaction.",
    mood: "Warm",
  },
  "mint-wreath": {
    title: "Mint wreath",
    note: "Leaf accents sway around a calm social presence.",
    mood: "Calm",
  },
  "cloud-float": {
    title: "Cloud float",
    note: "Sky glow and cloud motion make the frame feel buoyant.",
    mood: "Airy",
  },
  "dot-circle": {
    title: "Dot circle",
    note: "Dotted pulses keep the outline playful and alert.",
    mood: "Active",
  },
} as const;

export function F53_CloudUnlockSheet() {
  const avatar = readGeneratedAvatar() || defaultAvatarUrl;
  const [frame] = useState(readSelectedAvatarFrame);
  const [points, setPoints] = useState(readChallengePoints);
  const [owned, setOwned] = useState(() => readOwnedAvatarFrames().includes(frame.id));
  const [applied, setApplied] = useState(() => readAppliedAvatarFrame().id === frame.id);
  const canUnlock = owned || points >= frame.price;
  const detail = detailCopy[frame.id];

  useEffect(() => {
    const refresh = () => setPoints(readChallengePoints());
    window.addEventListener(pointsUpdatedEvent, refresh);
    return () => window.removeEventListener(pointsUpdatedEvent, refresh);
  }, []);

  const unlockAndApply = () => {
    if (!owned && !spendChallengePoints(frame.price)) return;
    if (!owned) {
      ownAvatarFrame(frame.id);
      setOwned(true);
    }
    setAppliedAvatarFrame(frame.id);
    setApplied(true);
  };

  return (
    <div className="relative h-full w-full overflow-hidden pt-12 font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pb-2 pt-3 flex items-center gap-3 opacity-40">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
        <div className="w-5" />
      </div>
      <div className="mt-2 space-y-3 px-4 opacity-40">
        <div className="h-20 rounded-3xl bg-white" />
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-28 rounded-2xl bg-white" />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-brand-ink/25" />

      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 24 }}
        className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white p-5 pb-8 shadow-[0_-10px_40px_rgba(31,31,46,0.25)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="w-9" />
          <div className="h-1.5 w-10 rounded-full bg-brand-bg" />
          <button
            type="button"
            data-prototype-target="6:1"
            aria-label="Close frame detail"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-bg bg-white text-brand-ink shadow-sm"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex h-28 w-28 items-center justify-center rounded-3xl border border-white bg-gradient-to-br ${frame.accent} shadow-soft`}
          >
            <div className="flex h-[102px] w-[102px] items-center justify-center rounded-[26px] bg-white/82 backdrop-blur-xl">
              <AvatarFrameEffect avatar={avatar} frame={frame} size={92} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[22px] font-bold leading-tight">{frame.name}</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-bg px-2.5 py-1 text-[11px] font-bold text-brand-purple">
              <Coins size={11} className="text-brand-peach" />
              {frame.price} pts
            </div>
            <div className="mt-2 text-[11px] text-brand-mute">{points} pts available.</div>
          </div>
        </div>
        <div className="mt-4 h-px bg-brand-bg" />
        <div className="mt-3 rounded-3xl border border-brand-bg bg-gradient-to-br from-white via-brand-bg/35 to-white p-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-mute">
            {detail.title}
          </div>
          <div className="mt-1 text-[12px] font-semibold leading-[17px]">{frame.blurb}</div>
          <div className="mt-1 text-[11px] leading-[15px] text-brand-mute">{detail.note}</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <FrameSpec>Animated</FrameSpec>
          <FrameSpec>{owned ? "Owned" : "Unlock with points"}</FrameSpec>
          <FrameSpec>{detail.mood}</FrameSpec>
        </div>
        <button
          type="button"
          onClick={unlockAndApply}
          data-prototype-target={applied ? "6:1" : undefined}
          disabled={!canUnlock}
          className={`mt-4 w-full rounded-2xl py-3.5 text-[14px] font-bold ${
            canUnlock ? "bg-brand-ink text-white" : "bg-brand-bg text-brand-mute"
          }`}
        >
          {applied
            ? "Back to Frame Shop"
            : owned
              ? "Apply Frame"
              : canUnlock
                ? "Unlock and Apply"
                : `Need ${frame.price - points} more pts`}
        </button>
        <button
          type="button"
          data-prototype-target="6:1"
          className="mt-2 w-full rounded-2xl border border-brand-bg bg-white py-3.5 text-[14px] font-bold"
        >
          Cancel
        </button>
        <div className="mt-3 flex items-center justify-center gap-1 text-center text-[10px] text-brand-mute">
          <LockKeyhole size={11} />
          Frames change your look, not your AI permissions.
          <Sparkles size={11} className="text-brand-pink" />
        </div>
      </motion.div>
    </div>
  );
}
