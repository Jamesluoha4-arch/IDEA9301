import { motion } from "framer-motion";
import { useState } from "react";
import { ChibiAvatar } from "@/components/ChibiAvatar";

const tabs = ["Hairstyle", "Eyes", "Nose & Mouth"];
const swatches = [
  "#241d20",
  "#3a2a22",
  "#5b4231",
  "#111827",
  "#6b4f3f",
  "#7c3aed",
  "#a16207",
  "#475569",
  "#0f172a",
];

export function F7_AvatarCustomization() {
  const [tab, setTab] = useState("Hairstyle");
  const [hair, setHair] = useState(0);
  const [eyes, setEyes] = useState(4);
  const [mouth, setMouth] = useState(2);

  const activeIndex = tab === "Hairstyle" ? hair : tab === "Eyes" ? eyes : mouth;
  const selectOption = (index: number) => {
    if (tab === "Hairstyle") setHair(index);
    if (tab === "Eyes") setEyes(index);
    if (tab === "Nose & Mouth") setMouth(index);
  };

  const reset = () => {
    setHair(0);
    setEyes(4);
    setMouth(2);
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
          <ChibiAvatar size={150} hair={hair} eyes={eyes} mouth={mouth} />
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
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 bg-white transition-all ${selected ? "border-brand-purple shadow-soft" : "border-brand-bg"}`}
              style={{
                background:
                  tab === "Hairstyle"
                    ? `linear-gradient(135deg, ${swatches[i]}, ${swatches[i]}cc)`
                    : "linear-gradient(135deg,#fbf7ff,#eef8ff)",
              }}
            >
              {tab === "Hairstyle" && <HairThumb index={i} />}
              {tab === "Eyes" && <EyesThumb index={i} />}
              {tab === "Nose & Mouth" && <MouthThumb index={i} />}
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

function HairThumb({ index }: { index: number }) {
  const paths = [
    "M8 42 C8 15 24 8 38 10 C54 12 60 23 56 43 C47 29 37 28 30 21 C23 31 15 28 8 42 Z",
    "M9 38 C12 17 25 8 42 11 C52 13 58 24 55 43 C45 34 34 27 25 19 C20 29 15 35 9 38 Z",
    "M7 43 C9 18 29 6 44 15 C57 22 59 36 52 49 C42 32 30 31 21 25 C18 34 12 37 7 43 Z",
  ];
  return (
    <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
      <path d={paths[index % paths.length]} fill="white" opacity="0.88" />
    </svg>
  );
}

function EyesThumb({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
      <circle cx="32" cy="32" r="23" fill="#fff" opacity="0.6" />
      {index % 3 === 0 && (
        <>
          <ellipse cx="24" cy="32" rx="4" ry="6" fill="#1f1f2e" />
          <ellipse cx="40" cy="32" rx="4" ry="6" fill="#1f1f2e" />
        </>
      )}
      {index % 3 === 1 && (
        <>
          <path
            d="M18 33 Q24 27 30 33"
            stroke="#1f1f2e"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M34 33 Q40 27 46 33"
            stroke="#1f1f2e"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
      {index % 3 === 2 && (
        <>
          <rect
            x="15"
            y="26"
            width="15"
            height="10"
            rx="4"
            fill="none"
            stroke="#1f1f2e"
            strokeWidth="3"
          />
          <rect
            x="34"
            y="26"
            width="15"
            height="10"
            rx="4"
            fill="none"
            stroke="#1f1f2e"
            strokeWidth="3"
          />
        </>
      )}
    </svg>
  );
}

function MouthThumb({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
      <circle cx="32" cy="32" r="23" fill="#fff" opacity="0.6" />
      {index % 4 === 0 && (
        <path
          d="M22 33 Q32 41 42 33"
          stroke="#1f1f2e"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {index % 4 === 1 && (
        <path d="M23 35 H41" stroke="#1f1f2e" strokeWidth="3" strokeLinecap="round" />
      )}
      {index % 4 === 2 && <ellipse cx="32" cy="35" rx="6" ry="8" fill="#8b2e3b" />}
      {index % 4 === 3 && (
        <path
          d="M23 37 Q32 29 41 37"
          stroke="#1f1f2e"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
