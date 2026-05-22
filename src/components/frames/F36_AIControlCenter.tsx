import { motion } from "framer-motion";
import { useState } from "react";
import { Ban, Gift, Lightbulb, PenLine, Plus, Send, Settings } from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const modes = [
  { Icon: Ban, t: "Off" },
  { Icon: Lightbulb, t: "Suggest" },
  { Icon: PenLine, t: "Draft" },
  { Icon: Send, t: "Act" },
];

type ShapingProfile = {
  name: string;
  id: string;
  intro: string;
};

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
  const [mode, setMode] = useState(2);
  const [savedProfile, setSavedProfile] = useState<ShapingProfile>(() => readShapingProfile());
  const [draftProfile, setDraftProfile] = useState<ShapingProfile>(() => readShapingProfile());
  const avatarUrl = readGeneratedAvatar() || defaultAvatarUrl;
  const hasProfileChanges =
    savedProfile.name !== draftProfile.name ||
    savedProfile.id !== draftProfile.id ||
    savedProfile.intro !== draftProfile.intro;

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
      <div className="px-5 pt-3 pb-4 flex items-center justify-between">
        <div className="text-[22px] font-bold">AI Control</div>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center shadow-soft">
          <Settings size={16} className="text-brand-purple" />
        </button>
      </div>

      <div className="mx-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[10px] font-bold tracking-[0.2em] text-brand-mute">
          CURRENT HELP LEVEL
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div>
            <div className="text-[22px] font-bold gradient-brand bg-clip-text text-transparent">
              Assistant
            </div>
            <div className="text-[11px] text-brand-mute">I can draft. You approve every send.</div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="relative w-20 h-20 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 overflow-hidden rounded-full border border-white bg-white/88 shadow-glow"
            >
              <img src={avatarUrl} alt="" className="h-full w-full object-contain object-bottom" />
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 py-2.5 rounded-2xl bg-brand-ink text-white text-[12px] font-bold">
            Change Mode
          </button>
          <div className="px-3 py-1.5 rounded-full bg-brand-bg text-[10px] font-bold text-brand-purple flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" /> Assistant
          </div>
        </div>
        <button
          type="button"
          data-prototype-target="6:8"
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-lavender/25 bg-gradient-to-r from-brand-bg via-white to-brand-pink/15 py-2.5 text-[12px] font-bold text-brand-purple shadow-sm"
        >
          <Gift size={14} />
          Enter Frame Shop
        </button>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Custom Mode</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-[12px] font-bold">AI Communication Influence Level</div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {modes.map((item, index) => (
            <button
              key={item.t}
              type="button"
              onClick={() => setMode(index)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  index === mode ? "gradient-brand shadow-glow" : "bg-brand-bg"
                }`}
              >
                <item.Icon
                  size={16}
                  className={index === mode ? "text-white" : "text-brand-mute"}
                />
              </div>
              <div
                className={`text-[10px] font-bold ${
                  index === mode ? "text-brand-purple" : "text-brand-mute"
                }`}
              >
                {item.t}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-brand-mute text-center">
          Draft means I can write options. Nothing is sent until you choose it.
        </div>
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
    </div>
  );
}
