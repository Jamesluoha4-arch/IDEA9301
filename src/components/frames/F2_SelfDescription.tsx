import { motion } from "framer-motion";
import { useState } from "react";

export function F2_SelfDescription() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);

  return (
    <div className="relative w-full h-full bg-white pt-12">
      <div className="px-6 py-8 flex flex-col gap-8">
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="text-[12px] font-bold tracking-[0.6px] uppercase text-brand-purple">
            STEP 1 OF 3
          </div>
          <div className="flex gap-2 h-2">
            <motion.button
              type="button"
              className="flex-1 rounded-full gradient-brand"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="sr-only">STEP 1 OF 3</span>
            </motion.button>
            <button type="button" className="flex-1 rounded-full bg-brand-bg">
              <span className="sr-only">STEP 2 OF 3</span>
            </button>
            <button type="button" className="flex-1 rounded-full bg-brand-bg">
              <span className="sr-only">STEP 3 OF 3</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold text-brand-ink leading-[32px]">Give me a name</h2>
          <p className="text-[15px] text-brand-mute leading-[22px]">
            Tell me what I should call you, then shape the kind of presence you want me to become.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold tracking-[0.5px] uppercase text-brand-purple">
            My name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Example: David"
            className="w-full rounded-2xl border-2 border-brand-bg bg-brand-bg/40 px-4 py-4 outline-none text-[15px] font-semibold text-brand-ink placeholder:text-brand-mute/60 focus:border-brand-purple transition-colors"
          />
        </div>

        {/* Textarea */}
        <motion.div
          className="rounded-2xl border-2 border-brand-bg focus-within:border-brand-purple bg-brand-bg/40 transition-colors p-4 min-h-[168px]"
          whileHover={{ y: -2 }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Be calm, a little playful, and help me speak with more confidence..."
            className="w-full h-[128px] bg-transparent resize-none outline-none text-[14px] text-brand-ink placeholder:text-brand-mute/70 leading-[20px]"
          />
        </motion.div>

        {/* Voice */}
        <motion.div
          className="rounded-2xl border-2 border-dashed border-brand-lavender/50 bg-gradient-to-br from-[#ece9ff]/60 to-[#ffeaf5]/60 p-4 flex flex-col items-center gap-4"
          whileHover={{ scale: 1.01 }}
        >
          <motion.button
            onClick={() => setRecording((r) => !r)}
            className="relative w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-soft"
            whileTap={{ scale: 0.92 }}
          >
            {recording && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-2xl border-2 border-brand-purple"
                  animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.span
                  className="absolute inset-0 rounded-2xl border-2 border-brand-pink"
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
              </>
            )}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0" />
              <line x1="12" y1="18" x2="12" y2="22" />
            </svg>
          </motion.button>
          <div className="text-center">
            <div className="text-[15px] font-bold text-brand-ink">
              {recording ? "I'm listening..." : "Tell me by voice instead"}
            </div>
            <div className="text-[12px] text-brand-mute mt-1">
              I will learn the tone you want me to carry.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer buttons */}
      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
        <motion.button
          className="flex-1 py-4 rounded-2xl border-2 border-brand-bg bg-white text-[12px] font-bold tracking-[0.6px] uppercase text-brand-mute"
          whileTap={{ scale: 0.97 }}
        >
          SKIP FOR NOW
        </motion.button>
        <motion.button
          className="flex-1 py-4 rounded-2xl gradient-brand text-white text-[12px] font-bold tracking-[0.6px] uppercase shadow-soft"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          CONTINUE
        </motion.button>
      </div>
    </div>
  );
}
