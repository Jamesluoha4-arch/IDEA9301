import { motion } from "framer-motion";
import { useState } from "react";

const styles = [
  { name: "Realistic", grad: "linear-gradient(135deg,#6c5ce7,#a78bfa)" },
  { name: "Stylized", grad: "linear-gradient(135deg,#1f1f2e,#6f7285)" },
  { name: "Anime", grad: "linear-gradient(135deg,#f6b4db,#ffbe98)" },
  { name: "Sketch", grad: "linear-gradient(135deg,#a7d8ff,#8ee3c4)" },
];

export function F6_FaceScan() {
  const [active, setActive] = useState("Realistic");
  return (
    <div className="relative w-full h-full bg-white pt-12">
      {/* Top bar */}
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 z-10 bg-white/80 backdrop-blur-md border-b border-brand-bg">
        <motion.button whileTap={{ scale: 0.9 }} className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f1f2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </motion.button>
        <div className="flex-1 text-center text-[15px] font-bold text-brand-ink">Face Scan</div>
        <div className="w-9" />
      </div>

      {/* Scan area */}
      <div className="absolute top-[110px] left-4 right-4 h-[340px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1f1f2e] via-[#3b3469] to-[#6c5ce7] shadow-soft">
        {/* Grid */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        {/* Face wireframe (abstract) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-44 h-52"
            animate={{ rotateY: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg viewBox="0 0 200 240" className="w-full h-full">
              <defs>
                <radialGradient id="faceGrad" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#f6b4db" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.2"/>
                </radialGradient>
              </defs>
              <ellipse cx="100" cy="120" rx="65" ry="90" fill="url(#faceGrad)" stroke="#a78bfa" strokeWidth="1.5"/>
              {/* mesh lines */}
              {Array.from({ length: 9 }).map((_, i) => (
                <ellipse key={`v${i}`} cx="100" cy="120" rx={10 + i * 7} ry="90" fill="none" stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="0.8"/>
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h${i}`} x1="35" y1={40 + i * 18} x2="165" y2={40 + i * 18} stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="0.8"/>
              ))}
              {/* features */}
              <circle cx="80" cy="105" r="4" fill="#f6b4db"/>
              <circle cx="120" cy="105" r="4" fill="#f6b4db"/>
              <path d="M85 160 Q100 170 115 160" fill="none" stroke="#f6b4db" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Corner brackets */}
        {[
          { tl: "top-6 left-6", c: "border-t-2 border-l-2" },
          { tl: "top-6 right-6", c: "border-t-2 border-r-2" },
          { tl: "bottom-6 left-6", c: "border-b-2 border-l-2" },
          { tl: "bottom-6 right-6", c: "border-b-2 border-r-2" },
        ].map((b, i) => (
          <div key={i} className={`absolute ${b.tl} w-8 h-8 ${b.c} border-brand-mint rounded-sm`} />
        ))}

        {/* Scan line */}
        <motion.div
          className="absolute left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand-mint to-transparent shadow-[0_0_10px_#8ee3c4]"
          animate={{ top: ["15%", "85%", "15%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] font-bold tracking-[0.4em] uppercase text-brand-mint">SCANNING</div>
      </div>

      {/* Styles */}
      <div className="absolute top-[470px] left-6 right-6">
        <div className="text-[11px] font-bold tracking-[0.6px] uppercase text-brand-mute border-b border-brand-bg pb-2 mb-3">GENERATED STYLES</div>
        <div className="grid grid-cols-2 gap-3">
          {styles.map((s) => {
            const isActive = active === s.name;
            return (
              <motion.button
                key={s.name}
                onClick={() => setActive(s.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`p-2 pr-3 rounded-2xl bg-white border-2 flex items-center gap-2 transition-colors ${isActive ? "border-brand-purple shadow-soft" : "border-brand-bg"}`}
              >
                <div className="w-9 h-9 rounded-xl relative overflow-hidden" style={{ background: s.grad }}>
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </motion.div>
                  )}
                </div>
                <span className="text-[13px] font-bold text-brand-ink">{s.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
        <motion.button whileTap={{ scale: 0.97 }} className="flex-1 py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">
          Customize
        </motion.button>
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="flex-1 py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft">
          Continue
        </motion.button>
      </div>
    </div>
  );
}
