import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Delete, Gift, RefreshCcw, Send, Shield, UserRound } from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import greenAvatarUrl from "@/assets/chibi-figurine-green.png";
import winnieAvatarUrl from "@/assets/avatar-mia.png";
import sabrinaAvatarUrl from "@/assets/radar-avatar-3.png";
import jamesAvatarUrl from "@/assets/radar-avatar-4.png";
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

type CreativePersona = {
  id: string;
  label: string;
  title: string;
  avatar: string;
  tone: string;
  intro: string;
  fallback: string;
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

const defaultAiMessage =
  "Hi, I am your AI Self. Ask me how I would introduce you, reply to Jim, or handle a social situation.";

const creativePersonas: CreativePersona[] = [
  {
    id: "interviewer",
    label: "Interviewer",
    title: "Interview practice",
    avatar: winnieAvatarUrl,
    tone: "from-brand-purple to-brand-pink",
    intro:
      "I can act as a calm interviewer, ask focused follow-up questions, and help you shape confident answers.",
    fallback:
      "As your interviewer, I would ask for one concrete example, then help you answer with a clear situation, action, and result.",
  },
  {
    id: "supervisor",
    label: "Department Supervisor",
    title: "Workplace guidance",
    avatar: greenAvatarUrl,
    tone: "from-brand-sky to-brand-mint",
    intro:
      "I can respond like a supportive supervisor, keeping the conversation practical, respectful, and outcome-focused.",
    fallback:
      "As a supervisor, I would keep this direct and constructive: name the goal, clarify the next step, and reduce ambiguity.",
  },
  {
    id: "influencer",
    label: "Influencer",
    title: "Public voice",
    avatar: sabrinaAvatarUrl,
    tone: "from-brand-pink to-brand-peach",
    intro:
      "I can help you turn ideas into warm, engaging social content with a confident but natural voice.",
    fallback:
      "As an influencer, I would make this more expressive: start with a relatable hook, keep it human, and end with a small invitation.",
  },
  {
    id: "ceo",
    label: "CEO",
    title: "Strategic lens",
    avatar: jamesAvatarUrl,
    tone: "from-brand-ink to-brand-purple",
    intro:
      "I can think like a CEO, summarising priorities, risks, and the decision that moves the situation forward.",
    fallback:
      "As a CEO, I would focus on the highest-leverage point: what matters, why now, and what decision needs to be made.",
  },
  {
    id: "ai-designer",
    label: "AI Industry Designer",
    title: "AI design critique",
    avatar: defaultAvatarUrl,
    tone: "from-brand-purple to-brand-sky",
    intro:
      "I can review AI product ideas through interaction design, trust, data boundaries, and user control.",
    fallback:
      "As an AI industry designer, I would look at the user control, the transparency moment, and whether the system makes its limits visible.",
  },
];

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
    return { name: "David", id: "gakajo", intro: "" };
  }

  const nickname =
    window.localStorage.getItem("second-self-user-name") ||
    window.localStorage.getItem("second-self-shaping-name") ||
    "David";

  return {
    name: nickname,
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
  const [activePersona, setActivePersona] = useState<CreativePersona | null>(null);
  const [personaMessages, setPersonaMessages] = useState<PersonaMessage[]>([
    {
      from: "ai",
      text: defaultAiMessage,
    },
  ]);
  const avatarUrl = readGeneratedAvatar() || defaultAvatarUrl;
  const chatAvatarUrl = activePersona?.avatar || avatarUrl;
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
    const reply = activePersona
      ? generateCreativeReply(activePersona, lower)
      : lower.includes("jim")
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

  const selectCreativePersona = (persona: CreativePersona) => {
    setActivePersona(persona);
    setPersonaInput("");
    setPersonaKeyboardOpen(false);
    setPersonaMessages([{ from: "ai", text: persona.intro }]);
  };

  const resetCreativePersona = () => {
    setActivePersona(null);
    setPersonaInput("");
    setPersonaKeyboardOpen(false);
    setPersonaMessages([{ from: "ai", text: defaultAiMessage }]);
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
        className="relative mx-auto mb-3 flex h-52 w-52 items-center justify-center"
      >
        <motion.span
          animate={{ scale: [0.8, 1.18, 0.8], opacity: [0.5, 0.05, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-brand-purple/25"
        />
        <AvatarFrameEffect avatar={avatarUrl} frame={avatarFrame} size={172} />
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

      <div className="px-5 mt-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[15px] font-bold">Creative avatars</div>
          <div className="mt-0.5 text-[10px] text-brand-mute">
            Swipe to choose a temporary AI role for this chat.
          </div>
        </div>
        {activePersona && (
          <button
            type="button"
            onClick={resetCreativePersona}
            className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-brand-purple shadow-sm"
          >
            <RefreshCcw size={11} />
            Reset
          </button>
        )}
      </div>
      <div className="mt-2 overflow-x-auto px-4 pb-2 prototype-scroll">
        <div className="flex w-max gap-3">
          {creativePersonas.map((persona, index) => (
            <motion.button
              key={persona.id}
              type="button"
              onClick={() => selectCreativePersona(persona)}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-[118px] shrink-0 snap-center text-left"
            >
              <span
                className={`relative flex h-[118px] w-[118px] items-center justify-center overflow-hidden rounded-full border-[4px] ${
                  activePersona?.id === persona.id
                    ? "border-brand-purple shadow-glow"
                    : "border-white shadow-soft"
                } bg-gradient-to-br ${persona.tone}`}
              >
                <span className="absolute inset-0 bg-white/20" />
                <img
                  src={persona.avatar}
                  alt=""
                  className="relative h-[112%] w-[112%] object-cover object-top"
                />
              </span>
              <span className="mt-2 block text-center text-[10px] font-bold leading-[13px] text-brand-ink">
                {persona.label}
              </span>
              <span className="mt-0.5 block text-center text-[8px] leading-[11px] text-brand-mute">
                {persona.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Talk to your AI Self</div>
      <div className="mx-4 mt-2 rounded-3xl border border-white bg-white/88 p-4 shadow-soft backdrop-blur-xl">
        {activePersona && (
          <div className="mb-3 flex items-center gap-2 rounded-2xl bg-brand-bg/65 px-3 py-2">
            <img src={activePersona.avatar} alt="" className="h-9 w-9 rounded-full object-cover object-top" />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold">{activePersona.label}</div>
              <div className="text-[9px] leading-[12px] text-brand-mute">{activePersona.title}</div>
            </div>
            <button
              type="button"
              onClick={resetCreativePersona}
              className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-brand-purple shadow-sm"
            >
              Reset
            </button>
          </div>
        )}
        <div className="min-h-[220px] max-h-[290px] space-y-2 overflow-y-auto pr-1 prototype-scroll">
          {personaMessages.map((message, index) => {
            const isUser = message.from === "user";
            return (
              <div
                key={`${message.from}-${index}-${message.text}`}
                className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-bg text-brand-purple shadow-sm">
                    <img
                      src={chatAvatarUrl}
                      alt=""
                      className="h-[120%] w-[120%] object-cover object-top"
                    />
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

function generateCreativeReply(persona: CreativePersona, lower: string) {
  if (lower.includes("jim") || lower.includes("colleague") || lower.includes("coworker")) {
    if (persona.id === "interviewer") {
      return "I would turn this into a practice prompt: what do you want Jim to remember about you after the first exchange?";
    }
    if (persona.id === "supervisor") {
      return "I would keep the Jim message respectful and easy to answer: mention the shared work context, then ask one practical question.";
    }
    if (persona.id === "influencer") {
      return "I would make the message warmer: a tiny shared moment, one friendly line, and a question that feels light rather than formal.";
    }
    if (persona.id === "ceo") {
      return "I would focus on relationship value: open with context, signal reliability, and invite a short exchange that can grow later.";
    }
    return "I would design this as a low-friction interaction: one clear cue, one safe question, and visible user control before sending.";
  }

  if (lower.includes("post") || lower.includes("content") || lower.includes("social")) {
    if (persona.id === "influencer") {
      return "I would lead with a relatable hook, keep the middle visual and specific, then end with a simple question people can answer quickly.";
    }
    if (persona.id === "ai-designer") {
      return "I would make the AI authorship visible and keep the post grounded in your approved context, not hidden inference.";
    }
  }

  if (lower.includes("interview") || lower.includes("job")) {
    if (persona.id === "interviewer") {
      return "Let us practice it as an interview answer: give me one situation, one action you took, and one measurable result.";
    }
    if (persona.id === "supervisor") {
      return "I would answer with team impact: what you noticed, how you responded, and how it helped the work move forward.";
    }
  }

  return persona.fallback;
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
