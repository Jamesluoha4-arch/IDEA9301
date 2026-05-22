import { motion } from "framer-motion";
import { ArrowLeft, Gift, Sparkles, Star } from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const frames = [
  { name: "Star Glow", price: "Applied", aura: "shadow-[0_0_30px_rgba(108,92,231,0.55)]" },
  { name: "Orbit Path", price: "160 pts", aura: "ring-2 ring-brand-sky/55" },
  { name: "Heart Halo", price: "220 pts", aura: "ring-2 ring-brand-pink/60" },
  { name: "Mint Wreath", price: "180 pts", aura: "ring-2 ring-brand-mint/60" },
  { name: "Cloud Float", price: "240 pts", aura: "shadow-[0_0_28px_rgba(167,219,255,0.75)]" },
  { name: "Dot Circle", price: "120 pts", aura: "ring-2 ring-dashed ring-brand-lavender" },
];

export function F49_FrameShop() {
  const avatar = readGeneratedAvatar() || defaultAvatarUrl;

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
        <Gift size={17} className="text-brand-purple" />
      </div>
      <div className="rounded-3xl border border-white bg-white/80 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.07, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 3.1, repeat: Infinity }}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-glow"
          >
            <span className="absolute inset-0 rounded-full border-2 border-brand-purple/35 animate-ping" />
            <img src={avatar} alt="" className="relative h-16 w-16 object-contain object-bottom" />
          </motion.div>
          <div>
            <div className="text-[18px] font-bold">Star Glow</div>
            <div className="text-[11px] text-brand-mute">
              Spend points on animated avatar frames.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {frames.map((frame, index) => (
          <button
            key={frame.name}
            className="rounded-2xl border border-white bg-white/82 p-4 text-left shadow-soft backdrop-blur-xl"
          >
            <motion.div
              animate={
                index % 2
                  ? { y: [0, -4, 0], rotate: [0, 4, 0] }
                  : { scale: [1, 1.08, 1], rotate: [0, -4, 0] }
              }
              transition={{ duration: 2.8 + index * 0.18, repeat: Infinity }}
              className={`relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white ${frame.aura}`}
            >
              <img src={avatar} alt="" className="h-14 w-14 object-contain object-bottom" />
              {index === 0 ? (
                <Sparkles size={15} className="absolute -right-1 top-0 text-brand-purple" />
              ) : (
                <Star size={13} className="absolute -right-1 top-1 text-brand-pink" />
              )}
            </motion.div>
            <div className="text-[13px] font-bold">{frame.name}</div>
            <div className="mt-1 text-[10px] text-brand-mute">{frame.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
