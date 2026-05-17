import { motion } from "framer-motion";

export function F6_ShySupport() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#f3efff] via-white to-white pt-12 overflow-hidden">
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 z-10">
        <motion.button
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
        <div className="relative w-[190px] h-[190px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#8ee3c4]/30 blur-2xl" />
          <div className="absolute inset-3 rounded-full bg-[#f6b4db]/35 blur-2xl" />
          <motion.div
            className="absolute inset-0 rounded-full border border-brand-purple/15"
            animate={{ scale: [0.9, 1.18, 0.9], opacity: [0.35, 0.12, 0.35] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[116px] h-[116px] rounded-full bg-gradient-to-br from-brand-purple via-brand-lavender to-brand-pink opacity-80 shadow-glow"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-[58px] h-[58px] rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
            <div className="w-[28px] h-[28px] rounded-full bg-white shadow-sm" />
          </div>
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
