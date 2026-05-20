import { motion } from "framer-motion";
import { useMemo } from "react";

type PersonalitySnapshot = {
  comm?: string;
  energy?: string;
  tags?: string[];
};

function readPersonality(): PersonalitySnapshot {
  try {
    return JSON.parse(window.localStorage.getItem("second-self-personality") || "{}");
  } catch {
    return {};
  }
}

function getAiReply({ comm = "Direct", energy = "Balanced", tags = [] }: PersonalitySnapshot) {
  const tagTone = tags.length
    ? ` I will keep the ${tags.slice(0, 2).join(" and ")} parts visible.`
    : "";

  if (comm === "Direct" && energy === "Introverted") {
    return `Got it. I will keep things clear, short, and low-pressure. I can suggest a few careful options, but I will never push you to reply before you feel ready. ${tagTone} 🙂`;
  }
  if (comm === "Direct" && energy === "Extroverted") {
    return `Perfect. I will help you move conversations forward with confident, friendly wording. I can give you quick drafts that feel natural and easy to send. ${tagTone} ✨`;
  }
  if (comm === "Reflective" && energy === "Introverted") {
    return `I understand. I will slow the pace down, notice emotional detail, and offer gentle replies that leave room for nuance. Nothing goes out unless it feels like you. ${tagTone} 🌙`;
  }
  if (comm === "Reflective" && energy === "Extroverted") {
    return `Nice. I will help you sound warm and expressive while still thinking carefully before each message. I can turn your social energy into thoughtful conversation starts. ${tagTone} 💫`;
  }
  if (energy === "Balanced") {
    return `Great. I will balance clarity with warmth, shifting between direct answers and reflective support depending on the moment. You stay in control of every message. ${tagTone} 🌿`;
  }
  return `I am ready. I will adapt to the personality you gave me and offer conversation support that sounds like you, not a generic assistant. ${tagTone} ✨`;
}

export function F8_AIChat() {
  const personality = useMemo(readPersonality, []);
  const aiReply = getAiReply(personality);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-brand-bg/40 to-white pt-12">
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-brand-bg z-10">
        <div className="relative w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-soft">
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-brand-purple"
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <BotIcon />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-bold text-brand-ink tracking-wide">
            SECOND SELF READY
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-brand-mint font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
            PERSONALITY SYNCED
          </div>
        </div>
        <button className="w-9 h-9 rounded-full hover:bg-brand-bg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f1f2e">
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </button>
      </div>

      <div className="absolute top-[110px] left-0 right-0 bottom-[118px] px-4 py-4 flex flex-col gap-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2"
        >
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <BotIcon small />
          </div>
          <div className="flex flex-col gap-1 max-w-[82%]">
            <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand-purple">
              Your Second Self
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-white border border-brand-bg p-3 shadow-sm">
              <p className="text-[14px] text-brand-ink leading-[20px]">
                I am ready. I can suggest topics, draft replies, and explain what data I used, but I
                will not send anything without you.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-2 justify-end"
        >
          <div className="flex flex-col gap-1 max-w-[80%] items-end">
            <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand-mute">
              YOU
            </div>
            <div className="rounded-2xl rounded-tr-sm gradient-brand p-3 shadow-soft">
              <p className="text-[14px] text-white leading-[20px]">
                Great. Help me prepare conversations, but keep me in control.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-brand-bg border border-brand-lavender/30 flex items-center justify-center shrink-0">
            <UserIcon />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-start gap-2"
        >
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <BotIcon small />
          </div>
          <div className="flex flex-col gap-1 max-w-[82%]">
            <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand-purple">
              Your Second Self
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-white border border-brand-bg p-3 shadow-sm">
              <p className="text-[14px] text-brand-ink leading-[20px]">{aiReply}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-4 right-4 flex justify-end gap-2">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 rounded-full bg-white border border-brand-bg text-brand-purple text-[12px] font-bold shadow-sm"
        >
          Back again
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 rounded-full gradient-brand text-white text-[12px] font-bold shadow-soft"
        >
          Got it
        </motion.button>
      </div>
    </div>
  );
}

function BotIcon({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
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
  );
}
