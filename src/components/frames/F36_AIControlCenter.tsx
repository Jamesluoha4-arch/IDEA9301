import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bot, Delete, Gift, Send, Shield, UserRound } from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import {
  AvatarFrameEffect,
  frameUpdatedEvent,
  readAppliedAvatarFrame,
} from "@/components/AvatarFrameEffect";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const modeStorageKey = "second-self.ai-control-mode";
const qwertyRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

type AiMode = "Observer" | "Co-pilot" | "Assistant" | "Auto-pilot";

type ShapingProfile = {
  name: string;
  id: string;
  intro: string;
};

type PersonaMessage = {
  from: "user" | "ai";
  text: string;
};

const modeDetails: Record<AiMode, { summary: string; dot: string }> = {
  Observer: {
    summary: "I only observe and show patterns when you ask.",
    dot: "bg-brand-mute",
  },
  "Co-pilot": {
    summary: "I can suggest and draft while you stay in control.",
    dot: "bg-brand-purple",
  },
  Assistant: {
    summary: "I can draft. You approve every send.",
    dot: "bg-brand-mint",
  },
  "Auto-pilot": {
    summary: "I can act inside the boundaries you choose.",
    dot: "bg-brand-peach",
  },
};

function readAiMode(): AiMode {
  const value =
    typeof window === "undefined" ? "" : window.sessionStorage.getItem(modeStorageKey);
  return value === "Observer" ||
    value === "Co-pilot" ||
    value === "Assistant" ||
    value === "Auto-pilot"
    ? value
    : "Assistant";
}

function readShapingProfile(): ShapingProfile {
  if (typeof window === "undefined") {
    return { name: "Sabrina", id: "gakajo", intro: "" };
  }

  return {
    name: window.localStorage.getItem("second-self-shaping-name") || "Sabrina",
    id: window.localStorage.getItem("second-self-shaping-id") || "gakajo",
    intro: window.localStorage.getItem("second-self-shaping-intro") || "",
  };
}

export function F36_AIControlCenter() {
  const [aiMode] = useState<AiMode>(() => readAiMode());
  const [challengeReady, setChallengeReady] = useState(false);
  const [savedProfile] = useState<ShapingProfile>(() => readShapingProfile());
  const [avatarFrame, setAvatarFrame] = useState(readAppliedAvatarFrame);
  const [personaInput, setPersonaInput] = useState("");
  const [personaKeyboardOpen, setPersonaKeyboardOpen] = useState(false);
  const [personaMessages, setPersonaMessages] = useState<PersonaMessage[]>([
    {
      from: "ai",
      text: "Hi, I am your AI Self. Ask me how I would introduce you, reply to Jim, or handle a social situation.",
    },
  ]);
  const avatarUrl = readGeneratedAvatar() || defaultAvatarUrl;
  const activeMode = modeDetails[aiMode];

  useEffect(() => {
    const timer = window.setTimeout(() => setChallengeReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const refreshFrame = () => setAvatarFrame(readAppliedAvatarFrame());
    window.addEventListener(frameUpdatedEvent, refreshFrame);
    return () => window.removeEventListener(frameUpdatedEvent, refreshFrame);
  }, []);

  const sendPersonaMessage = () => {
    const text = personaInput.trim();
    if (!text) return;

    const lower = text.toLowerCase();
    const reply = lower.includes("jim")
      ? "I would keep it warm and low-pressure: mention the shared context, ask one simple question, and let Jim choose whether to continue."
      : lower.includes("introduce") || lower.includes("intro")
        ? `I can introduce myself as ${savedProfile.name}: ${savedProfile.intro || "a careful, friendly version of you that helps start conversations while you stay in control."}`
        : lower.includes("safe") || lower.includes("privacy")
          ? "I will avoid private chats, blocked topics, and anything you have not approved. If a moment feels sensitive, I should step back and ask you first."
          : "I hear you. I would turn that into a short, human-sounding reply with one clear intention and no pressure to over-share.";

    setPersonaMessages((messages) => [
      ...messages,
      { from: "user", text },
      { from: "ai", text: reply },
    ]);
    setPersonaInput("");
    setPersonaKeyboardOpen(false);
  };

  const appendPersonaInput = (value: string) => {
    setPersonaInput((current) => `${current}${value}`);
  };

  const deletePersonaInput = () => {
    setPersonaInput((current) => current.slice(0, -1));
  };

  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-4">
        <div className="text-[22px] font-bold">{savedProfile.name}</div>
      </div>

      {challengeReady && (
        <motion.button
          type="button"
          data-prototype-target="6:0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-3xl border border-white bg-white/90 p-3 text-left shadow-soft backdrop-blur-xl"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-pink-peach text-white shadow-soft">
            <Shield size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-bold">Icebreaking challenge ready</span>
            <span className="mt-0.5 block text-[10px] leading-[14px] text-brand-mute">
              Practice three small Jim openers to earn your next avatar frame.
            </span>
          </span>
          <span className="rounded-full gradient-brand px-3 py-1.5 text-[10px] font-bold text-white">
            Continue
          </span>
        </motion.button>
      )}

      <motion.div
        animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto mb-3 flex h-32 w-32 items-center justify-center"
      >
        <motion.span
          animate={{ scale: [0.8, 1.18, 0.8], opacity: [0.5, 0.05, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-brand-purple/25"
        />
        <AvatarFrameEffect avatar={avatarUrl} frame={avatarFrame} size={102} />
      </motion.div>

      <div className="mx-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[10px] font-bold tracking-[0.2em] text-brand-mute">
          CURRENT HELP LEVEL
        </div>
        <div className="mt-2">
          <div className="text-[22px] font-bold gradient-brand bg-clip-text text-transparent">
            {aiMode}
          </div>
          <div className="mt-1 text-[11px] text-brand-mute">{activeMode.summary}</div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 py-2.5 rounded-2xl bg-brand-ink text-white text-[12px] font-bold">
            Change Mode
          </button>
          <div className="px-3 py-1.5 rounded-full bg-brand-bg text-[10px] font-bold text-brand-purple flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeMode.dot}`} />
            {aiMode}
          </div>
        </div>
        <button
          type="button"
          data-prototype-target="6:1"
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-lavender/25 bg-gradient-to-r from-brand-bg via-white to-brand-pink/15 py-2.5 text-[12px] font-bold text-brand-purple shadow-sm"
        >
          <Gift size={14} />
          Enter Frame Shop
        </button>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Talk to your AI Self</div>
      <div className="mx-4 mt-2 rounded-3xl border border-white bg-white/88 p-3.5 shadow-soft backdrop-blur-xl">
        <div className="max-h-[178px] space-y-2 overflow-y-auto pr-1 prototype-scroll">
          {personaMessages.map((message, index) => {
            const isUser = message.from === "user";
            return (
              <div
                key={`${message.from}-${index}-${message.text}`}
                className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-bg text-brand-purple">
                    <Bot size={14} />
                  </span>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] leading-[16px] shadow-sm ${
                    isUser
                      ? "gradient-brand text-white"
                      : "border border-brand-bg bg-white text-brand-ink"
                  }`}
                >
                  {message.text}
                </div>
                {isUser && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-purple/12 text-brand-purple">
                    <UserRound size={14} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-brand-bg/70 px-3 py-2">
          <button
            type="button"
            onClick={() => setPersonaKeyboardOpen(true)}
            className="min-w-0 flex-1 bg-transparent py-1 text-left text-[12px] font-semibold text-brand-ink outline-none"
          >
            {personaInput || <span className="text-brand-mute">Message your AI self...</span>}
          </button>
          <button
            type="button"
            onClick={sendPersonaMessage}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-brand text-white shadow-soft"
            aria-label="Send message to AI self"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {personaKeyboardOpen && (
          <AiSelfKeyboard
            value={personaInput}
            onType={appendPersonaInput}
            onDelete={deletePersonaInput}
            onSend={sendPersonaMessage}
            onClose={() => setPersonaKeyboardOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AiSelfKeyboard({
  value,
  onType,
  onDelete,
  onSend,
  onClose,
}: {
  value: string;
  onType: (value: string) => void;
  onDelete: () => void;
  onSend: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 280 }}
      animate={{ y: 0 }}
      exit={{ y: 280 }}
      transition={{ type: "spring", stiffness: 360, damping: 38 }}
      data-prototype-keyboard
      className="absolute bottom-0 left-0 right-0 z-[110] border-t border-white/75 bg-gradient-to-b from-[#f6f1ff] via-[#eee8fb] to-[#dfe8f5] px-2 pt-2 pb-3 shadow-[0_-18px_34px_rgba(108,92,231,0.18)]"
    >
      <div className="mb-2 flex items-center gap-2 px-1">
        <div className="flex-1 rounded-2xl bg-white/80 px-3 py-2 text-[12px] font-semibold text-brand-ink shadow-sm">
          {value || <span className="text-brand-mute">Message your AI self...</span>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-full bg-white/70 text-[14px] font-bold text-brand-purple shadow-sm"
        >
          v
        </button>
      </div>
      <div className="mb-2 flex justify-around text-[17px] text-brand-ink/80">
        {["I", "you", "we", "this", "good", "not", "in", "yes"].map((word) => (
          <button key={word} type="button" onClick={() => onType(`${word} `)}>
            {word}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {qwertyRows.map((row, rowIndex) => (
          <div key={row.join("")} className="flex justify-center gap-1.5">
            {rowIndex === 2 && (
              <button
                type="button"
                onClick={() => onType("")}
                className="h-11 w-11 rounded-xl border border-white/70 bg-white/55 text-[18px] text-brand-purple shadow-sm"
              >
                Aa
              </button>
            )}
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => onType(key)}
                className="h-11 min-w-[30px] flex-1 rounded-xl border border-white bg-white/92 text-[22px] text-brand-ink shadow-sm"
              >
                {key}
              </button>
            ))}
            {rowIndex === 2 && (
              <button
                type="button"
                onClick={onDelete}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/70 bg-white/55 text-brand-purple shadow-sm"
              >
                <Delete size={20} />
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <button
            type="button"
            className="h-11 w-16 rounded-xl border border-white/70 bg-white/55 text-[16px] text-brand-ink shadow-sm"
          >
            123
          </button>
          <button
            type="button"
            onClick={() => onType(" ")}
            className="h-11 flex-1 rounded-xl border border-white bg-white/92 text-[17px] text-brand-ink shadow-sm"
          >
            space
          </button>
          <button
            type="button"
            onClick={onSend}
            className="h-11 w-20 rounded-xl gradient-brand text-[16px] font-bold text-white shadow-soft"
          >
            send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
