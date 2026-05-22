import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, Gift, Plus, Shield } from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import {
  AvatarFrameEffect,
  frameUpdatedEvent,
  readAppliedAvatarFrame,
} from "@/components/AvatarFrameEffect";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const modeStorageKey = "second-self.ai-control-mode";

type AiMode = "Observer" | "Co-pilot" | "Assistant" | "Auto-pilot";

type ShapingProfile = {
  name: string;
  id: string;
  intro: string;
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
  const [savedProfile, setSavedProfile] = useState<ShapingProfile>(() => readShapingProfile());
  const [draftProfile, setDraftProfile] = useState<ShapingProfile>(() => readShapingProfile());
  const [avatarFrame, setAvatarFrame] = useState(readAppliedAvatarFrame);
  const avatarUrl = readGeneratedAvatar() || defaultAvatarUrl;
  const activeMode = modeDetails[aiMode];
  const hasProfileChanges =
    savedProfile.name !== draftProfile.name ||
    savedProfile.id !== draftProfile.id ||
    savedProfile.intro !== draftProfile.intro;

  useEffect(() => {
    const timer = window.setTimeout(() => setChallengeReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const refreshFrame = () => setAvatarFrame(readAppliedAvatarFrame());
    window.addEventListener(frameUpdatedEvent, refreshFrame);
    return () => window.removeEventListener(frameUpdatedEvent, refreshFrame);
  }, []);

  const updateProfile = (field: keyof ShapingProfile, value: string) => {
    setDraftProfile((profile) => ({ ...profile, [field]: value }));
  };

  const saveProfile = () => {
    const nextProfile = {
      name: draftProfile.name.trim() || savedProfile.name,
      id: draftProfile.id.trim() || savedProfile.id,
      intro: draftProfile.intro.trim(),
    };
    setSavedProfile(nextProfile);
    setDraftProfile(nextProfile);
    window.localStorage.setItem("second-self-shaping-name", nextProfile.name);
    window.localStorage.setItem("second-self-shaping-id", nextProfile.id);
    window.localStorage.setItem("second-self-shaping-intro", nextProfile.intro);
  };

  const prepareReshape = () => {
    window.sessionStorage.setItem("second-self.face-scan-return", "3:0");
  };

  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-4">
        <div className="text-[22px] font-bold">AI Control</div>
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

      <div className="px-5 mt-5 text-[15px] font-bold">Basic Shaping</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-center text-[12px] font-bold mb-3">Edit your Second Self</div>
        <div className="space-y-2.5">
          <label className="block rounded-2xl bg-brand-bg/55 px-3 py-2.5">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-mute">
              Name
            </span>
            <input
              value={draftProfile.name}
              onChange={(event) => updateProfile("name", event.target.value)}
              className="mt-1 w-full bg-transparent text-[13px] font-semibold outline-none placeholder:text-brand-mute"
              placeholder="Name your Second Self"
            />
          </label>
          <label className="block rounded-2xl bg-brand-bg/55 px-3 py-2.5">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-mute">
              ID
            </span>
            <input
              value={draftProfile.id}
              onChange={(event) => updateProfile("id", event.target.value)}
              className="mt-1 w-full bg-transparent text-[13px] font-semibold outline-none placeholder:text-brand-mute"
              placeholder="Choose an ID"
            />
          </label>
          <label className="block rounded-2xl bg-brand-bg/55 px-3 py-2.5">
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-brand-mute">
              Personal intro
            </span>
            <textarea
              value={draftProfile.intro}
              onChange={(event) => updateProfile("intro", event.target.value)}
              className="mt-1 min-h-16 w-full resize-none bg-transparent text-[12px] leading-[17px] outline-none placeholder:text-brand-mute"
              placeholder="Describe how your Second Self should introduce itself."
            />
          </label>
        </div>
        {hasProfileChanges && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={saveProfile}
            className="mt-3 w-full rounded-2xl gradient-brand py-3 text-[12px] font-bold text-white shadow-soft"
          >
            Save
          </motion.button>
        )}
        <button
          type="button"
          data-prototype-target="0:5"
          onPointerDown={prepareReshape}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl gradient-brand-soft border border-brand-lavender/30 text-[12px] font-bold text-brand-purple"
        >
          Reshape avatar <Plus size={14} />
        </button>
      </div>

      <button
        type="button"
        data-prototype-target="3:10"
        className="mx-4 mt-4 flex w-[calc(100%-2rem)] items-center justify-between rounded-3xl border border-white bg-white/82 px-4 py-3.5 text-left shadow-soft backdrop-blur-xl"
      >
        <span>
          <span className="block text-[13px] font-bold">Context Rules</span>
          <span className="mt-0.5 block text-[10px] text-brand-mute">
            See when I step back to keep sensitive moments human-led.
          </span>
        </span>
        <ChevronRight size={16} className="text-brand-purple" />
      </button>
    </div>
  );
}
