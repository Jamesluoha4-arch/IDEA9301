import { motion } from "framer-motion";
import { useState } from "react";

export function F4_ImportHistory() {
  const [selected, setSelected] = useState({ a: true, b: true, c: false });
  return (
    <div className="relative w-full h-full bg-white pt-12">
      <div className="px-6 py-8 flex flex-col gap-5">
        <h2 className="text-[22px] font-bold text-brand-ink">Import History</h2>

        <div className="rounded-2xl border border-brand-bg p-3 flex items-center justify-between">
          <div className="text-[11px] font-bold tracking-[0.6px] uppercase text-brand-mute">SELECTION PROGRESS</div>
          <motion.div
            key={Object.values(selected).filter(Boolean).length}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[15px] font-bold text-brand-purple"
          >
            142 Messages
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 flex flex-col gap-3">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-brand-purple via-brand-lavender to-brand-pink" />

          {/* Last Week expanded */}
          <div className="relative">
            <motion.div
              className="absolute -left-[18px] top-3 w-3 h-3 rounded-full gradient-brand shadow-glow"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="rounded-2xl bg-gradient-to-br from-[#ece9ff]/60 to-[#ffeaf5]/40 border border-brand-purple/30 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-bold text-brand-ink">Last Week</div>
                  <div className="text-[11px] text-brand-mute">24 Items</div>
                </div>
                <div className="px-2.5 py-1 rounded-lg gradient-brand text-white text-[10px] font-bold tracking-[0.6px] uppercase">SELECTED</div>
              </div>

              <div className="bg-white/70 px-3 py-2 flex flex-col gap-2">
                {[
                  { id: "a", who: "User", color: "#6C5CE7", time: "Oct 24, 10:42 AM", msg: "Could you draft an outline for the Q3 strategy presentation? I need it by EOD." },
                  { id: "b", who: "AI PERSONA", color: "#F6B4DB", time: "Oct 24, 10:45 AM", msg: "Certainly. Here is a high-level outline focusing on our core growth metrics and" },
                  { id: "c", who: "User", color: "#6C5CE7", time: "Oct 23, 4:15 PM", msg: "Thanks, that looks good." },
                ].map((item) => {
                  const isSel = selected[item.id as keyof typeof selected];
                  return (
                    <div key={item.id} className="flex items-start gap-2 py-1.5 border-b border-brand-bg last:border-0">
                      <motion.button
                        onClick={() => setSelected((s) => ({ ...s, [item.id]: !s[item.id as keyof typeof s] }))}
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSel ? "gradient-brand border-transparent" : "border-brand-mute/40 bg-white"}`}
                        whileTap={{ scale: 0.85 }}
                      >
                        {isSel && (
                          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </motion.svg>
                        )}
                      </motion.button>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <div className="text-[10px] font-bold tracking-[0.6px] uppercase" style={{ color: item.color }}>{item.who}</div>
                          <div className="text-[10px] text-brand-mute">{item.time}</div>
                        </div>
                        <div className="text-[12px] text-brand-ink leading-[16px]">{item.msg}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Collapsed groups */}
          {[
            { date: "May 2023", count: "450 Items" },
            { date: "April 2023", count: "1,204 Items" },
          ].map((g, i) => (
            <div key={g.date} className="relative">
              <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-brand-lavender" />
              <motion.div
                className="rounded-2xl bg-white border border-brand-bg p-3 flex items-center justify-between"
                whileHover={{ y: -1, borderColor: "rgba(108,92,231,0.4)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <div>
                  <div className="text-[14px] font-bold text-brand-ink">{g.date}</div>
                  <div className="text-[11px] text-brand-mute">{g.count}</div>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-brand-purple/30 text-[10px] font-bold tracking-[0.6px] uppercase text-brand-purple hover:bg-brand-purple hover:text-white transition-colors">
                  SELECT ALL
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex gap-3">
        <motion.button className="flex-1 py-3.5 rounded-2xl border-2 border-brand-bg bg-white text-[12px] font-bold tracking-[0.6px] uppercase text-brand-mute" whileTap={{ scale: 0.97 }}>
          CANCEL
        </motion.button>
        <motion.button className="flex-[1.5] py-3.5 rounded-2xl gradient-brand text-white text-[12px] font-bold tracking-[0.6px] uppercase shadow-soft" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
          IMPORT SELECTED
        </motion.button>
      </div>
    </div>
  );
}
