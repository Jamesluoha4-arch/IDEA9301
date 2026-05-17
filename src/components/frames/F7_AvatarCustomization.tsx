import { motion } from "framer-motion";
import { useState } from "react";

const tabs = ["Hairstyle", "Eyes", "Nose & Mouth"];
const hairColors = [
  "#1f1f2e", "#6f7285", "#a78bfa", "#f6b4db", "#ffbe98",
  "#8ee3c4", "#6c5ce7", "#a7d8ff", "#3b3469",
];

export function F7_AvatarCustomization() {
  const [tab, setTab] = useState("Hairstyle");
  const [active, setActive] = useState(0);
  return (
    <div className="relative w-full h-full bg-white pt-12">
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-brand-bg z-10">
        <motion.button whileTap={{ scale: 0.9 }} className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f1f2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </motion.button>
        <div className="flex-1 text-center text-[15px] font-bold text-brand-ink">Avatar Customization</div>
        <div className="w-9" />
      </div>

      {/* Avatar preview */}
      <div className="absolute top-[110px] left-4 right-4 h-[300px] rounded-3xl overflow-hidden gradient-brand-soft shadow-soft relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Stylized character */}
            <svg width="160" height="200" viewBox="0 0 160 200">
              <defs>
                <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffbe98"/>
                  <stop offset="100%" stopColor="#f6b4db"/>
                </linearGradient>
                <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={hairColors[active] || "#1f1f2e"}/>
                  <stop offset="100%" stopColor={hairColors[active] || "#1f1f2e"} stopOpacity="0.7"/>
                </linearGradient>
              </defs>
              {/* neck/shoulders */}
              <path d="M50 180 Q80 150 110 180 L110 200 L50 200 Z" fill="#a78bfa" opacity="0.8"/>
              {/* face */}
              <ellipse cx="80" cy="100" rx="50" ry="60" fill="url(#skin)"/>
              {/* hair */}
              <path d="M30 90 Q30 30 80 30 Q130 30 130 90 Q130 70 110 65 Q90 50 80 55 Q70 50 50 65 Q30 70 30 90 Z" fill="url(#hair)"/>
              {/* eyes */}
              <ellipse cx="62" cy="105" rx="4" ry="5" fill="#1f1f2e"/>
              <ellipse cx="98" cy="105" rx="4" ry="5" fill="#1f1f2e"/>
              <circle cx="63" cy="103" r="1.5" fill="white"/>
              <circle cx="99" cy="103" r="1.5" fill="white"/>
              {/* mouth */}
              <path d="M70 135 Q80 142 90 135" fill="none" stroke="#1f1f2e" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>
        {/* mesh dots */}
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle, #6c5ce7 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      </div>

      {/* Tabs */}
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
                <motion.div layoutId="tab" className="absolute -bottom-px left-0 right-0 h-0.5 gradient-brand rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3x3 grid */}
      <div className="absolute top-[470px] left-6 right-6 grid grid-cols-3 gap-2.5">
        {hairColors.map((c, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${active === i ? "border-brand-purple shadow-soft" : "border-brand-bg"}`}
            style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}
          >
            {/* mini hair silhouette */}
            <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full">
              <path d="M10 35 Q10 10 30 10 Q50 10 50 35 Q50 28 40 26 Q30 20 30 22 Q30 20 20 26 Q10 28 10 35 Z" fill="white" opacity="0.85"/>
            </svg>
            {active === i && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Bottom */}
      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
        <motion.button whileTap={{ scale: 0.97 }} className="flex-1 py-3.5 rounded-2xl border-2 border-brand-bg bg-white text-[13px] font-bold text-brand-mute">
          Reset
        </motion.button>
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="flex-1 py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft">
          Save
        </motion.button>
      </div>
    </div>
  );
}
