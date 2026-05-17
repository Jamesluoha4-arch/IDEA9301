import { motion } from "framer-motion";

export function F8_AIChat() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-brand-bg/40 to-white pt-12">
      {/* Header */}
      <div className="absolute top-12 left-0 right-0 px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-brand-bg z-10">
        <div className="relative w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-soft">
          <motion.div className="absolute inset-0 rounded-xl border-2 border-brand-purple" animate={{ scale: [1, 1.3], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-bold text-brand-ink tracking-wide">AI ASSISTANT</div>
          <div className="flex items-center gap-1.5 text-[10px] text-brand-mint font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
            ACTIVE
          </div>
        </div>
        <button className="w-9 h-9 rounded-full hover:bg-brand-bg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f1f2e"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[100px] px-4 py-4 flex flex-col gap-4 overflow-y-auto">
        {/* AI msg */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
            </svg>
          </div>
          <div className="flex flex-col gap-1 max-w-[80%]">
            <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand-purple">AI Assistant</div>
            <div className="rounded-2xl rounded-tl-sm bg-white border border-brand-bg p-3 shadow-sm">
              <p className="text-[14px] text-brand-ink leading-[20px]">Hello! I am ready to assist you today. How can I help you with your tasks or questions?</p>
            </div>
          </div>
        </motion.div>

        {/* User msg */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-start gap-2 justify-end">
          <div className="flex flex-col gap-1 max-w-[80%] items-end">
            <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-brand-mute">YOU</div>
            <div className="rounded-2xl rounded-tr-sm gradient-brand p-3 shadow-soft">
              <p className="text-[14px] text-white leading-[20px]">Can you create a wireframe layout for a chat interface?</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-brand-bg border border-brand-lavender/30 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </motion.div>

        {/* Typing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
            </svg>
          </div>
          <div className="rounded-2xl rounded-bl-sm bg-white border border-brand-bg px-4 py-3 shadow-sm flex items-center gap-1.5">
            {[0, 0.2, 0.4].map((d) => (
              <motion.div
                key={d}
                className="w-2 h-2 rounded-full gradient-brand"
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: d }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Input */}
      <div className="absolute bottom-6 left-4 right-4 flex items-center gap-2">
        <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="w-11 h-11 rounded-full gradient-brand-soft border border-brand-lavender/30 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </motion.button>
        <div className="flex-1 rounded-full bg-white border border-brand-bg px-4 py-3 shadow-sm">
          <input className="w-full bg-transparent outline-none text-[14px] placeholder:text-brand-mute" placeholder="Message AI Assistant..." />
        </div>
        <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05, y: -2 }} className="w-11 h-11 rounded-full gradient-brand flex items-center justify-center shadow-soft">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
