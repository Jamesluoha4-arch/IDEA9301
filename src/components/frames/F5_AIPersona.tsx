import { motion } from "framer-motion";
import { useState } from "react";

export function F5_AIPersona() {
  const [comm, setComm] = useState(35);
  const [energy, setEnergy] = useState(55);
  const [tags, setTags] = useState(["Thoughtful", "Warm"]);
  const [addingTag, setAddingTag] = useState(false);
  const [draftTag, setDraftTag] = useState("");
  const commLabel = comm < 38 ? "Direct" : comm > 68 ? "Reflective" : "Balanced";
  const energyLabel = energy < 38 ? "Introverted" : energy > 68 ? "Extroverted" : "Balanced";
  const description = getDescription(commLabel, energyLabel);

  const submitTag = () => {
    const next = draftTag.trim();
    if (next && !tags.includes(next)) setTags((items) => [...items, next]);
    setDraftTag("");
    setAddingTag(false);
  };

  return (
    <div className="relative w-full h-full bg-white pt-12 overflow-y-auto">
      <div className="px-6 py-6 flex flex-col gap-5 pb-32">
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="text-[12px] font-bold tracking-[0.6px] uppercase text-brand-purple">
            STEP 3 OF 3
          </div>
          <div className="flex gap-2 h-2">
            <button type="button" className="flex-1 rounded-full bg-brand-lavender/40">
              <span className="sr-only">STEP 1 OF 3</span>
            </button>
            <button type="button" className="flex-1 rounded-full bg-brand-lavender/40">
              <span className="sr-only">STEP 2 OF 3</span>
            </button>
            <motion.button
              type="button"
              className="flex-1 rounded-full gradient-brand"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="sr-only">STEP 3 OF 3</span>
            </motion.button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-[22px] font-bold text-brand-ink">Your AI Persona</h2>
          <p className="text-[13px] text-brand-mute mt-1">
            Here is how your AI currently understands you.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex justify-center">
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="absolute inset-0 rounded-3xl gradient-brand blur-xl opacity-50"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-20 h-20 rounded-3xl gradient-brand-soft border-2 border-white shadow-soft flex items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6c5ce7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full gradient-brand shadow-soft flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Personality Card */}
        <motion.div
          className="rounded-2xl bg-gradient-to-br from-white to-brand-bg/40 border border-brand-bg p-4 flex flex-col gap-4 shadow-soft"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[15px] font-bold text-brand-ink border-b border-brand-bg pb-2">
            Personality Summary
          </div>

          {/* Slider 1 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-bold text-brand-purple">Communication Style</span>
              <motion.span
                key={commLabel}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-[12px] font-bold text-brand-ink"
              >
                {commLabel}
              </motion.span>
            </div>
            <BrandSlider value={comm} onChange={setComm} />
            <div className="flex justify-between text-[10px] text-brand-mute">
              <span>Direct</span>
              <span>Reflective</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-bold text-brand-purple">Social Energy</span>
              <motion.span
                key={energyLabel}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-[12px] font-bold text-brand-ink"
              >
                {energyLabel}
              </motion.span>
            </div>
            <BrandSlider value={energy} onChange={setEnergy} />
            <div className="flex justify-between text-[10px] text-brand-mute">
              <span>Introverted</span>
              <span>Extroverted</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.div
                key={tag}
                whileHover={{ y: -2 }}
                className="px-3 py-1 rounded-full gradient-brand-soft border border-brand-purple/30 text-[11px] font-bold text-brand-ink"
              >
                {tag}
              </motion.div>
            ))}
            {addingTag ? (
              <input
                autoFocus
                value={draftTag}
                onChange={(e) => setDraftTag(e.target.value)}
                onBlur={submitTag}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitTag();
                  if (e.key === "Escape") {
                    setDraftTag("");
                    setAddingTag(false);
                  }
                }}
                placeholder="New tag"
                className="w-24 px-3 py-1 rounded-full border border-brand-purple/40 bg-white text-[11px] outline-none text-brand-ink"
              />
            ) : (
              <button
                onClick={() => setAddingTag(true)}
                className="px-3 py-1 rounded-full border border-dashed border-brand-mute/40 text-[11px] text-brand-mute hover:border-brand-purple hover:text-brand-purple transition-colors flex items-center gap-1"
              >
                <span>+</span> Tag
              </button>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <div className="rounded-2xl bg-brand-bg/60 border border-brand-bg p-3.5">
          <div className="text-[12px] font-bold text-brand-purple mb-1">
            Personality description:
          </div>
          <p className="text-[12px] text-brand-ink leading-[18px] italic">"{description}"</p>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-6 left-6 right-6">
        <motion.button
          className="w-full py-4 rounded-2xl gradient-brand text-white text-[14px] font-bold shadow-soft relative overflow-hidden"
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Confirm and Create AI Persona</span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>
      </div>
    </div>
  );
}

function getDescription(comm: string, energy: string) {
  if (comm === "Direct" && energy === "Introverted") {
    return "You communicate in a concise and careful way, preferring clear expectations before joining a conversation. Your AI should offer short, low-pressure replies that protect your space while keeping warmth visible.";
  }
  if (comm === "Direct" && energy === "Extroverted") {
    return "You are quick, clear, and socially responsive. Your AI should help you move conversations forward with confident wording, practical suggestions, and a friendly tone that still feels efficient.";
  }
  if (comm === "Reflective" && energy === "Introverted") {
    return "You tend to think before responding and value emotional accuracy. Your AI should draft gentle, thoughtful messages that leave room for nuance and avoid pushing you into immediate social action.";
  }
  if (comm === "Reflective" && energy === "Extroverted") {
    return "You enjoy connection but like your words to feel considered. Your AI should help turn active social energy into warm, expressive messages with enough detail to feel personal.";
  }
  if (energy === "Balanced") {
    return "You balance clarity with warmth, shifting between direct answers and reflective support depending on the moment. Your AI should adapt its suggestions to context and keep your voice steady.";
  }
  return "You show a flexible communication style that changes with the social setting. Your AI should offer a few alternate phrasings so you can choose the tone that feels most like you.";
}

function BrandSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative h-6 flex items-center">
      <div className="absolute left-0 right-0 h-1.5 rounded-full bg-brand-bg" />
      <div
        className="absolute left-0 h-1.5 rounded-full gradient-brand"
        style={{ width: `${value}%` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
      <motion.div
        className="absolute w-5 h-5 -ml-2.5 rounded-full gradient-brand border-2 border-white shadow-soft pointer-events-none"
        style={{ left: `${value}%` }}
        whileHover={{ scale: 1.15 }}
      />
    </div>
  );
}
