import { motion } from "framer-motion";
import { useState } from "react";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const tabs = ["Hairstyle", "Eyes", "Nose & Mouth"];

const hairPresets = [
  { name: "Original", filter: "none", bg: "#2f2826" },
  { name: "Espresso", filter: "sepia(0.25) saturate(0.9) brightness(0.9)", bg: "#46352c" },
  { name: "Ash Brown", filter: "sepia(0.35) saturate(0.75) brightness(1.02)", bg: "#6b5748" },
  { name: "Ink", filter: "saturate(0.45) brightness(0.76)", bg: "#1f2937" },
  { name: "Caramel", filter: "sepia(0.55) saturate(1.1) brightness(1.08)", bg: "#8b6548" },
  { name: "Violet", filter: "hue-rotate(18deg) saturate(1.2)", bg: "#8b5cf6" },
  { name: "Amber", filter: "sepia(0.85) saturate(1.35) brightness(1.05)", bg: "#b87917" },
  { name: "Slate", filter: "saturate(0.4) hue-rotate(170deg) brightness(0.9)", bg: "#64748b" },
  { name: "Midnight", filter: "saturate(0.55) brightness(0.72) contrast(1.1)", bg: "#172033" },
];

const eyePresets = [
  "Wink",
  "Soft",
  "Bright",
  "Calm",
  "Glasses",
  "Smile",
  "Focus",
  "Cute",
  "Sleepy",
];
const mouthPresets = [
  "Neutral",
  "Smile",
  "Tiny O",
  "Serious",
  "Soft",
  "Shy",
  "Cute",
  "Flat",
  "Mini",
];

export function F7_AvatarCustomization() {
  const [tab, setTab] = useState("Hairstyle");
  const [hair, setHair] = useState(0);
  const [eyes, setEyes] = useState(0);
  const [mouth, setMouth] = useState(0);
  const [avatarUrl] = useState(readGeneratedAvatar);

  const activeIndex = tab === "Hairstyle" ? hair : tab === "Eyes" ? eyes : mouth;
  const selectOption = (index: number) => {
    if (tab === "Hairstyle") setHair(index);
    if (tab === "Eyes") setEyes(index);
    if (tab === "Nose & Mouth") setMouth(index);
  };

  const reset = () => {
    setHair(0);
    setEyes(0);
    setMouth(0);
  };

  return (
    <div className="relative w-full h-full bg-white pt-12">
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-brand-bg z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center"
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
        <div className="flex-1 text-center text-[15px] font-bold text-brand-ink">
          Avatar Customization
        </div>
        <div className="w-9" />
      </div>

      <div className="absolute top-[110px] left-4 right-4 h-[300px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#fff3fb] via-[#f6efff] to-[#eef8ff] shadow-soft">
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage: "radial-gradient(circle, #6c5ce7 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <FigurinePreview avatarUrl={avatarUrl} hair={hair} eyes={eyes} mouth={mouth} large />
        </div>
      </div>

      <div className="absolute top-[425px] left-6 right-6">
        <div className="flex justify-around border-b border-brand-bg relative">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-[13px] font-bold transition-colors ${tab === t ? "text-brand-purple" : "text-brand-mute"}`}
            >
              {t}
              {tab === t && (
                <motion.div
                  layoutId="tab"
                  className="absolute -bottom-px left-0 right-0 h-0.5 gradient-brand rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute top-[470px] left-6 right-6 grid grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }).map((_, i) => {
          const selected = activeIndex === i;
          return (
            <button
              key={`${tab}-${i}`}
              type="button"
              onClick={() => selectOption(i)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selected ? "border-brand-purple shadow-soft" : "border-brand-bg"}`}
              style={{
                background:
                  tab === "Hairstyle"
                    ? `linear-gradient(135deg, ${hairPresets[i].bg}, ${hairPresets[i].bg}cc)`
                    : "linear-gradient(135deg,#fbf7ff,#eef8ff)",
              }}
            >
              {tab === "Hairstyle" && <HairCard avatarUrl={avatarUrl} index={i} />}
              {tab === "Eyes" && <EyesCard avatarUrl={avatarUrl} index={i} />}
              {tab === "Nose & Mouth" && <MouthCard avatarUrl={avatarUrl} index={i} />}
              {selected && (
                <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6c5ce7"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
        <motion.button
          onClick={reset}
          whileTap={{ scale: 0.97 }}
          className="flex-1 py-3.5 rounded-2xl border-2 border-brand-bg bg-white text-[13px] font-bold text-brand-mute"
        >
          Reset
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
}

function FigurinePreview({
  avatarUrl,
  hair,
  eyes,
  mouth,
  large = false,
}: {
  avatarUrl: string;
  hair: number;
  eyes: number;
  mouth: number;
  large?: boolean;
}) {
  const eyeOffset = eyes % 3;
  const mouthOffset = mouth % 3;

  return (
    <div className={`relative ${large ? "w-[190px] h-[250px]" : "w-full h-full"}`}>
      <img
        src={avatarUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_12px_22px_rgba(108,92,231,0.2)]"
        style={{ filter: hairPresets[hair].filter }}
      />
      <span
        className="absolute rounded-full border-2 border-white/80 shadow-sm"
        style={{
          left: large ? `${82 + eyeOffset * 2}px` : "42%",
          top: large ? `${82 + eyeOffset}px` : "31%",
          width: large ? 9 : 5,
          height: large ? 9 : 5,
          background: eyes % 2 ? "#1f1f2e" : "#6c5ce7",
          opacity: eyes === 0 ? 0 : 0.72,
        }}
      />
      <span
        className="absolute rounded-full bg-[#d66f66] shadow-sm"
        style={{
          left: large ? `${93 + mouthOffset}px` : "48%",
          top: large ? `${111 + mouthOffset * 2}px` : "44%",
          width: large ? 18 : 9,
          height: mouth % 2 ? 4 : 7,
          opacity: mouth === 0 ? 0 : 0.7,
          transform: mouth % 2 ? "rotate(-4deg)" : "none",
        }}
      />
    </div>
  );
}

function HairCard({ avatarUrl, index }: { avatarUrl: string; index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-2">
      <FigurinePreview avatarUrl={avatarUrl} hair={index} eyes={0} mouth={0} />
    </div>
  );
}

function EyesCard({ avatarUrl, index }: { avatarUrl: string; index: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
      <FigurinePreview avatarUrl={avatarUrl} hair={0} eyes={index} mouth={0} />
      <span className="absolute bottom-2 text-[8px] font-bold text-brand-mute">
        {eyePresets[index]}
      </span>
    </div>
  );
}

function MouthCard({ avatarUrl, index }: { avatarUrl: string; index: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
      <FigurinePreview avatarUrl={avatarUrl} hair={0} eyes={0} mouth={index} />
      <span className="absolute bottom-2 text-[8px] font-bold text-brand-mute">
        {mouthPresets[index]}
      </span>
    </div>
  );
}
