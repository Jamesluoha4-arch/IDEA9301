import { motion } from "framer-motion";

const sources = [
  { name: "Messages", color: "#A7D8FF", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  )},
  { name: "WhatsApp", color: "#8EE3C4", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  )},
  { name: "Instagram", color: "#F6B4DB", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { name: "Other", color: "#FFBE98", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F1F2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>
  )},
];

export function F3_ImportChat() {
  return (
    <div className="relative w-full h-full bg-white pt-12">
      <div className="px-6 py-8 flex flex-col gap-6">
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="text-[12px] font-bold tracking-[0.6px] uppercase text-brand-purple">STEP 2 OF 3</div>
          <div className="flex gap-2 h-2">
            <div className="flex-1 rounded-full bg-brand-lavender/40" />
            <motion.div className="flex-1 rounded-full gradient-brand" initial={{ scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1 }} transition={{ duration: 0.6 }} />
            <div className="flex-1 rounded-full bg-brand-bg" />
          </div>
        </div>

        <div>
          <h2 className="text-[24px] font-bold text-brand-ink leading-[32px]">Import your chat history</h2>
          <p className="text-[15px] text-brand-mute leading-[22px] mt-2">Help your AI understand how you naturally talk.</p>
        </div>

        {/* Upload area */}
        <motion.div
          className="rounded-2xl border-2 border-dashed border-brand-purple/40 bg-gradient-to-br from-[#ece9ff]/50 to-[#e6f4ff]/50 p-6 flex flex-col items-center gap-3"
          whileHover={{ y: -2, borderColor: "rgba(108,92,231,0.7)" }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-soft"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <polyline points="9 15 12 12 15 15"/>
            </svg>
          </motion.div>
          <div className="text-[16px] font-bold text-brand-ink">Upload chat records</div>
          <div className="text-[12px] text-brand-mute">TXT, PDF, CSV, screenshots</div>
        </motion.div>

        {/* Sources */}
        <div className="rounded-2xl border border-brand-bg bg-white p-2 flex flex-col gap-1">
          {sources.map((s, i) => (
            <motion.div
              key={s.name}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-bg/60 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color }}>{s.icon}</div>
              <div className="flex-1 text-[14px] font-bold text-brand-ink">{s.name}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg border border-brand-purple/30 text-[10px] font-bold tracking-[0.6px] uppercase text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
              >
                CONNECT
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="rounded-2xl bg-[#e6f4ff]/60 border border-brand-sky/40 p-3 flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div className="text-[12px] text-brand-ink leading-[16px]">You can review, delete, or limit what your AI can use.</div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
        <motion.button className="flex-1 py-4 rounded-2xl border-2 border-brand-bg bg-white text-[12px] font-bold tracking-[0.6px] uppercase text-brand-mute" whileTap={{ scale: 0.97 }}>
          SKIP FOR NOW
        </motion.button>
        <motion.button className="flex-1 py-4 rounded-2xl gradient-brand text-white text-[12px] font-bold tracking-[0.6px] uppercase shadow-soft" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
          CONTINUE
        </motion.button>
      </div>
    </div>
  );
}
