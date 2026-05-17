import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChibiAvatar } from "@/components/ChibiAvatar";

export function F6_FaceScan() {
  const [scanStarted, setScanStarted] = useState(false);
  const [resultReady, setResultReady] = useState(false);

  useEffect(() => {
    if (!scanStarted) return;
    setResultReady(false);
    const timer = window.setTimeout(() => setResultReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, [scanStarted]);

  return (
    <div className="relative w-full h-full bg-white pt-12">
      {/* Top bar */}
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 z-10 bg-white/80 backdrop-blur-md border-b border-brand-bg">
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
        <div className="flex-1 text-center text-[15px] font-bold text-brand-ink">Face Scan</div>
        <div className="w-9" />
      </div>

      {/* Scan area */}
      <button
        type="button"
        onClick={() => setScanStarted(true)}
        className="absolute top-[110px] left-4 right-4 h-[310px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1f1f2e] via-[#3b3469] to-[#6c5ce7] shadow-soft text-left"
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Face wireframe (abstract) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-44 h-52"
            animate={scanStarted ? { rotateY: [0, 8, -8, 0] } : { rotateY: 0 }}
            transition={{ duration: 6, repeat: scanStarted ? Infinity : 0, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg viewBox="0 0 200 240" className="w-full h-full">
              <defs>
                <radialGradient id="faceGrad" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#f6b4db" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              <ellipse
                cx="100"
                cy="120"
                rx="65"
                ry="90"
                fill="url(#faceGrad)"
                stroke="#a78bfa"
                strokeWidth="1.5"
              />
              {/* mesh lines */}
              {Array.from({ length: 9 }).map((_, i) => (
                <ellipse
                  key={`v${i}`}
                  cx="100"
                  cy="120"
                  rx={10 + i * 7}
                  ry="90"
                  fill="none"
                  stroke="#a78bfa"
                  strokeOpacity="0.25"
                  strokeWidth="0.8"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="35"
                  y1={40 + i * 18}
                  x2="165"
                  y2={40 + i * 18}
                  stroke="#a78bfa"
                  strokeOpacity="0.25"
                  strokeWidth="0.8"
                />
              ))}
              {/* features */}
              <circle cx="80" cy="105" r="4" fill="#f6b4db" />
              <circle cx="120" cy="105" r="4" fill="#f6b4db" />
              <path
                d="M85 160 Q100 170 115 160"
                fill="none"
                stroke="#f6b4db"
                strokeWidth="2"
                strokeLinecap="round"
              />
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
        {scanStarted && (
          <motion.div
            className="absolute left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand-mint to-transparent shadow-[0_0_10px_#8ee3c4]"
            animate={{ top: ["15%", "85%", "15%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] font-bold tracking-[0.35em] uppercase text-brand-mint">
          {scanStarted ? "SCANNING" : "TAP TO START"}
        </div>
      </button>

      {/* Output */}
      <div className="absolute top-[445px] left-6 right-6">
        <div className="text-[11px] font-bold tracking-[0.6px] uppercase text-brand-mute border-b border-brand-bg pb-2 mb-3">
          OUTPUT RESULT
        </div>
        <div className="h-[215px] rounded-3xl border border-brand-bg bg-gradient-to-br from-[#fff7fb] to-[#eef7ff] overflow-hidden flex items-center justify-center shadow-sm">
          {!scanStarted && (
            <div className="px-8 text-center text-[13px] leading-[20px] text-brand-mute">
              Tap the face scan panel to generate your Q-style anime avatar.
            </div>
          )}
          {scanStarted && !resultReady && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {[0, 0.15, 0.3].map((delay) => (
                  <motion.span
                    key={delay}
                    className="w-2.5 h-2.5 rounded-full gradient-brand"
                    animate={{ y: [0, -7, 0], opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay }}
                  />
                ))}
              </div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-purple">
                Generating
              </div>
            </div>
          )}
          {resultReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-4"
            >
              <ChibiAvatar size={138} hair={0} eyes={4} mouth={2} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-6 left-6 right-6">
        {resultReady ? (
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold"
            >
              Customize
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft"
            >
              Continue
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl border-2 border-brand-bg bg-white text-[13px] font-bold text-brand-ink shadow-sm"
          >
            I am shy
          </motion.button>
        )}
      </div>
    </div>
  );
}
