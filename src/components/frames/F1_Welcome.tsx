import { motion } from "framer-motion";

import secondSelfLogo from "@/assets/second-self-logo.png";

export function F1_Welcome() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#f1eefb] via-white to-white">
      {/* Animated orb background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-10 w-[300px] h-[300px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 -right-10 w-[260px] h-[260px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, #f6b4db 0%, transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #8ee3c4 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Persona orb (replaces animation placeholder) */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[180px] h-[180px] flex items-center justify-center">
        <motion.div
          className="absolute -inset-8 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.52) 0%, rgba(246,180,219,0.34) 42%, transparent 72%)",
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.38, 0.62, 0.38] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-4 rounded-full opacity-35 blur-2xl"
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
        <motion.div
          className="relative w-[132px] h-[132px] rounded-[34px] bg-white/78 shadow-glow flex items-center justify-center overflow-hidden"
          animate={{ y: [0, -8, 0], scale: [1, 1.13, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={secondSelfLogo} alt="Second Self" className="h-[118%] w-[118%] object-contain" />
        </motion.div>
      </div>

      {/* Content 鈥?preserve original positions */}
      <div className="absolute left-6 right-6 top-[300px] flex flex-col items-center gap-2">
        <motion.h1
          className="text-[28px] font-bold text-brand-ink leading-[32px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome
        </motion.h1>
        <motion.p
          className="pt-2 text-[20px] font-semibold text-brand-ink text-center leading-[28px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Create an AI self and explore
          <br />
          new ways to connect.
        </motion.p>
        <motion.p
          className="pt-4 text-[15px] text-brand-mute text-center leading-[22px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          I will help you find people with similar
          <br />
          interests, support conversations, break
          <br />
          social barriers, and bridge AI with people.
        </motion.p>
      </div>

      {/* CTA */}
      <div className="absolute left-6 right-6 top-[583px] flex flex-col items-center gap-4">
        <motion.button
          className="w-full py-[18px] rounded-2xl gradient-brand text-white text-[13px] font-bold tracking-[0.6px] uppercase shadow-soft relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">GET STARTED</span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>
      </div>
    </div>
  );
}
