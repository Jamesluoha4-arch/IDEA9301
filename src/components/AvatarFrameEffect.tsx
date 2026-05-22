import { motion } from "framer-motion";
import { Cloud, Heart, Leaf, Orbit, Sparkles, Star } from "lucide-react";
import type { ReactNode } from "react";

export type AvatarFrameId =
  | "star-glow"
  | "orbit-path"
  | "heart-halo"
  | "mint-wreath"
  | "cloud-float"
  | "dot-circle";

export type AvatarFrame = {
  id: AvatarFrameId;
  name: string;
  price: number;
  blurb: string;
  accent: string;
};

export const frameUpdatedEvent = "second-self-avatar-frame-updated";

export const avatarFrames: AvatarFrame[] = [
  {
    id: "star-glow",
    name: "Star Glow",
    price: 0,
    blurb: "A steady violet shimmer for your default Second Self.",
    accent: "from-brand-purple to-brand-pink",
  },
  {
    id: "orbit-path",
    name: "Orbit Path",
    price: 160,
    blurb: "A clear path of moving light that circles your avatar.",
    accent: "from-brand-sky to-brand-lavender",
  },
  {
    id: "heart-halo",
    name: "Heart Halo",
    price: 220,
    blurb: "Warm hearts drift around your avatar in softer moments.",
    accent: "from-brand-pink to-brand-peach",
  },
  {
    id: "mint-wreath",
    name: "Mint Wreath",
    price: 180,
    blurb: "Mint leaves sway like a calm welcome around the frame.",
    accent: "from-brand-mint to-brand-sky",
  },
  {
    id: "cloud-float",
    name: "Cloud Float",
    price: 240,
    blurb: "A lift of clouds and sky glow gives your avatar buoyancy.",
    accent: "from-brand-sky to-white",
  },
  {
    id: "dot-circle",
    name: "Dot Circle",
    price: 120,
    blurb: "Dotted pulses keep the frame crisp, active, and playful.",
    accent: "from-brand-lavender to-brand-purple",
  },
];

const appliedFrameKey = "second-self-avatar-frame";
const ownedFrameKey = "second-self-owned-avatar-frames";
const selectedFrameKey = "second-self-selected-avatar-frame";

export function getAvatarFrame(id: string | null | undefined) {
  return avatarFrames.find((frame) => frame.id === id) ?? avatarFrames[0];
}

export function readAppliedAvatarFrame() {
  if (typeof window === "undefined") return avatarFrames[0];
  return getAvatarFrame(window.localStorage.getItem(appliedFrameKey));
}

export function setAppliedAvatarFrame(id: AvatarFrameId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(appliedFrameKey, id);
  window.dispatchEvent(new Event(frameUpdatedEvent));
}

export function readSelectedAvatarFrame() {
  if (typeof window === "undefined") return avatarFrames[0];
  return getAvatarFrame(window.sessionStorage.getItem(selectedFrameKey));
}

export function setSelectedAvatarFrame(id: AvatarFrameId) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(selectedFrameKey, id);
}

export function readOwnedAvatarFrames() {
  if (typeof window === "undefined") return [avatarFrames[0].id];

  try {
    const ids = JSON.parse(window.localStorage.getItem(ownedFrameKey) || "[]") as AvatarFrameId[];
    return Array.from(new Set([avatarFrames[0].id, ...ids]));
  } catch {
    return [avatarFrames[0].id];
  }
}

export function ownAvatarFrame(id: AvatarFrameId) {
  if (typeof window === "undefined") return;
  const next = Array.from(new Set([...readOwnedAvatarFrames(), id]));
  window.localStorage.setItem(ownedFrameKey, JSON.stringify(next));
  window.dispatchEvent(new Event(frameUpdatedEvent));
}

export function AvatarFrameEffect({
  avatar,
  frame = readAppliedAvatarFrame(),
  size = 84,
  compact = false,
  className = "",
}: {
  avatar: string;
  frame?: AvatarFrame;
  size?: number;
  compact?: boolean;
  className?: string;
}) {
  const detail = compact ? 0.8 : 1;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <FrameDecoration frame={frame} detail={detail} />
      <motion.span
        animate={frame.id === "cloud-float" ? { y: [0, -5 * detail, 0] } : undefined}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-white shadow-[0_16px_36px_rgba(31,31,46,0.16)]"
      >
        <img src={avatar} alt="" className="h-[112%] w-[112%] object-contain object-bottom" />
      </motion.span>
    </div>
  );
}

function FrameDecoration({ frame, detail }: { frame: AvatarFrame; detail: number }) {
  if (frame.id === "orbit-path") {
    return (
      <>
        <motion.span
          className="absolute -inset-[12%] rounded-full border border-brand-sky/55"
          animate={{ rotate: 360 }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
        >
          {[12, 136, 256].map((angle) => (
            <span
              key={angle}
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-brand-sky shadow-[0_0_12px_rgba(167,219,255,0.95)]"
              style={{ transform: `rotate(${angle}deg) translateY(-52px) scale(${detail})` }}
            />
          ))}
        </motion.span>
        <Orbit size={16 * detail} className="absolute -right-2 top-1 text-brand-purple" />
      </>
    );
  }

  if (frame.id === "heart-halo") {
    return (
      <>
        <motion.span
          className="absolute -inset-[13%] rounded-full bg-brand-pink/12 blur-md"
          animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        {[
          ["left-0 top-1", 0],
          ["right-0 top-3", 0.5],
          ["bottom-0 right-2", 1],
        ].map(([position, delay]) => (
          <motion.span
            key={position as string}
            className={`absolute ${position}`}
            animate={{ y: [0, -7 * detail, 0], scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 2.3, delay: Number(delay), repeat: Infinity }}
          >
            <Heart size={15 * detail} className="fill-brand-pink text-brand-pink" />
          </motion.span>
        ))}
      </>
    );
  }

  if (frame.id === "mint-wreath") {
    return (
      <>
        <motion.span
          className="absolute -inset-[11%] rounded-full border-2 border-brand-mint/45"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {[
          "left-0 top-5 -rotate-45",
          "right-0 top-5 rotate-45",
          "bottom-1 left-3 -rotate-12",
        ].map((position, index) => (
          <motion.span
            key={position}
            className={`absolute ${position}`}
            animate={{ scale: [0.86, 1.08, 0.86] }}
            transition={{ duration: 2 + index * 0.25, repeat: Infinity }}
          >
            <Leaf size={16 * detail} className="fill-brand-mint/45 text-brand-mint" />
          </motion.span>
        ))}
      </>
    );
  }

  if (frame.id === "cloud-float") {
    return (
      <>
        <motion.span
          className="absolute -inset-[16%] rounded-full bg-brand-sky/28 blur-xl"
          animate={{ scale: [0.92, 1.15, 0.92], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.7, repeat: Infinity }}
        />
        {[
          "left-[-8%] bottom-2",
          "right-[-7%] top-2",
        ].map((position, index) => (
          <motion.span
            key={position}
            className={`absolute ${position} rounded-full bg-white/90 p-1 shadow-soft`}
            animate={{ x: [0, index ? -3 : 3, 0], y: [0, -4, 0] }}
            transition={{ duration: 2.8 + index * 0.4, repeat: Infinity }}
          >
            <Cloud size={17 * detail} className="fill-white text-brand-sky" />
          </motion.span>
        ))}
      </>
    );
  }

  if (frame.id === "dot-circle") {
    return (
      <>
        <motion.span
          className="absolute -inset-[12%] rounded-full border-2 border-dotted border-brand-purple/75"
          animate={{ rotate: 360, scale: [0.96, 1.08, 0.96] }}
          transition={{ rotate: { duration: 7, repeat: Infinity, ease: "linear" }, scale: { duration: 2.4, repeat: Infinity } }}
        />
        <motion.span
          className="absolute -inset-[3%] rounded-full border border-brand-lavender/45"
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.1, repeat: Infinity }}
        />
      </>
    );
  }

  return (
    <>
      <motion.span
        className="absolute -inset-[14%] rounded-full bg-brand-purple/16 blur-lg"
        animate={{ scale: [0.9, 1.14, 0.9], opacity: [0.3, 0.85, 0.3] }}
        transition={{ duration: 2.3, repeat: Infinity }}
      />
      {[["left-0 top-1", 0], ["right-0 top-3", 0.4], ["bottom-1 left-2", 0.8]].map(
        ([position, delay]) => (
          <motion.span
            key={position as string}
            className={`absolute ${position}`}
            animate={{ rotate: [0, 18, 0], scale: [0.88, 1.1, 0.88] }}
            transition={{ duration: 2.1, delay: Number(delay), repeat: Infinity }}
          >
            {Number(delay) ? (
              <Star size={14 * detail} className="fill-brand-pink text-brand-pink" />
            ) : (
              <Sparkles size={16 * detail} className="text-brand-purple" />
            )}
          </motion.span>
        ),
      )}
    </>
  );
}

export function FrameSpec({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-white/82 px-2 py-1 text-[10px] font-bold">{children}</span>;
}
