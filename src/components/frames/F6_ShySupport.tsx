import { motion } from "framer-motion";

import defaultAvatarUrl from "@/assets/default-ai-self.svg";

export function F6_ShySupport() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f3efff] via-white to-white pt-12 overflow-hidden">
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 z-10">
        <motion.button
          data-prototype-back="0:5"
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full bg-white/80 border border-brand-bg flex items-center justify-center shadow-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1f1f2e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </motion.button>
      </div>

      <div className="absolute top-[98px] left-0 right-0 h-[310px] flex items-center justify-center">
        <div className="relative w-[210px] h-[210px] flex items-center justify-center">
          <motion.div
            className="absolute -inset-6 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(167,139,250,0.52) 0%, rgba(246,180,219,0.34) 42%, transparent 72%)",
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.38, 0.62, 0.38] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-2 rounded-full opacity-35 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(142,227,196,0.5) 0%, rgba(167,216,255,0.2) 50%, transparent 76%)",
            }}
            animate={{ scale: [1.08, 0.92, 1.08], opacity: [0.25, 0.46, 0.25] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-brand-purple/28"
            animate={{ scale: [0.72, 1.58, 0.72], opacity: [0.48, 0, 0.48] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-5 rounded-full border-2 border-brand-pink/30"
            animate={{ scale: [0.78, 1.78, 0.78], opacity: [0.42, 0, 0.42] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.45, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-12 rounded-full border border-brand-mint/35"
            animate={{ scale: [0.82, 2.05, 0.82], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3.1, repeat: Infinity, delay: 0.9, ease: "easeOut" }}
          />
          <motion.img
            src={defaultAvatarUrl}
            alt="AI Self avatar"
            className="relative h-[214px] w-[214px] object-contain drop-shadow-[0_20px_38px_rgba(108,92,231,0.22)]"
            animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="absolute top-[405px] left-8 right-8 text-center">
        <motion.h2
          className="text-[26px] font-bold text-brand-ink"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Don't worry, I've got you
        </motion.h2>
        <p className="mt-4 text-[15px] leading-[23px] text-brand-mute">
          You can move at your own pace. I will help create a gentle AI assistant that speaks for
          you only when you want support.
        </p>
      </div>

      <div className="absolute bottom-7 left-6 right-6">
        <motion.button
          className="w-full py-4 rounded-2xl gradient-brand text-white text-[14px] font-bold shadow-soft"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Lets Go
        </motion.button>
      </div>
    </div>
  );
}
