import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Pause, User, Info, X, Sparkles, RefreshCw, Clock, Calendar, ToggleLeft } from "lucide-react";

export function F19_AboutSensitiveCrossing() {
  const sections = [
    { Icon: ShieldCheck, t: "Why this appeared", d: "This conversation may involve personal or emotionally sensitive context.", g: "from-brand-purple to-brand-lavender" },
    { Icon: Pause, t: "What AI did", d: "AI paused before generating a new reply. Nothing has been sent.", g: "from-brand-sky to-brand-mint" },
    { Icon: User, t: "Why this matters", d: "Some moments need human judgement, care, or direct support. AI can help organise your thoughts, but it should not replace your emotional responsibility.", g: "from-brand-pink to-brand-peach" },
    { Icon: Info, t: "What happens now", d: "You can continue the conversation yourself, keep AI quiet for this chat, or ask AI again later from the main screen.", g: "from-brand-lavender to-brand-pink" },
  ];
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm z-0"/>
      <motion.div initial={{ y: 80 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 24 }} className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-[32px] pb-5 max-h-[88%] overflow-y-auto shadow-glow">
        <div className="pt-3 flex justify-center"><div className="w-10 h-1.5 rounded-full bg-brand-bg"/></div>
        <div className="px-5 pt-3">
          <div className="flex items-start justify-between">
            <h2 className="text-[20px] font-bold leading-[26px]">About <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Sensitive<br/>Crossing</span></h2>
            <button className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center"><X size={14} className="text-brand-purple"/></button>
          </div>
          <p className="text-[11px] text-brand-mute mt-1">Why this alert appears and what it means.</p>

          <div className="mt-5 space-y-4">
            {sections.map((s, i, arr) => (
              <div key={s.t}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${s.g} flex items-center justify-center shrink-0`}>
                    <s.Icon size={16} strokeWidth={2} className="text-white"/>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{s.t}</div>
                    <div className="text-[11px] text-brand-mute leading-[16px] mt-0.5">{s.d}</div>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="h-px bg-brand-bg mt-4"/>}
              </div>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="mt-6 w-full py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft">
            Got it
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export function F20_StayHumanLed() {
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="absolute inset-0 bg-brand-ink/50 backdrop-blur-sm z-0"/>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 22 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-3xl p-5 w-[88%] text-center shadow-glow">
        <div className="w-14 h-14 mx-auto rounded-2xl gradient-brand flex items-center justify-center shadow-glow"><Pause size={22} className="text-white"/></div>
        <div className="mt-3 text-[18px] font-bold">Stay in <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">human-led</span> mode?</div>
        <div className="mt-1 text-[12px] text-brand-mute leading-[17px]">AI will stop suggesting replies in this chat unless you turn it back on.</div>
        <div className="mt-2 text-[10px] text-brand-mute">You can still write messages yourself at any time.</div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <motion.button whileTap={{ scale: 0.97 }} className="py-3 rounded-2xl bg-brand-bg text-[12px] font-bold">Cancel</motion.button>
          <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: -1 }} className="py-3 rounded-2xl gradient-brand text-white text-[12px] font-bold shadow-soft">Stay Human-led</motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export function F21_AskAILater() {
  const [pick, setPick] = useState("Later in this chat");
  const opts = [
    { Icon: RefreshCw, t: "When the topic changes", d: "AI will suggest again when the conversation moves.", g: "from-brand-sky to-brand-mint" },
    { Icon: Clock, t: "Later in this chat", d: "AI will stay quiet for now in this conversation.", g: "from-brand-purple to-brand-lavender" },
    { Icon: Calendar, t: "Tomorrow", d: "AI will suggest again tomorrow.", g: "from-brand-pink to-brand-peach" },
    { Icon: ToggleLeft, t: "I'll turn it on manually", d: "Keep AI suggestions off until you re-enable them.", g: "from-brand-lavender to-brand-pink" },
  ];
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm z-0"/>
      <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", damping: 24 }} className="absolute top-[80px] left-3 right-3 bottom-3 z-10 bg-white rounded-3xl p-5 flex flex-col shadow-glow">
        <div className="flex justify-end"><button className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center"><X size={14} className="text-brand-purple"/></button></div>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl gradient-brand flex items-center justify-center shadow-glow"><Sparkles size={22} className="text-white"/></div>
          <div className="mt-2 text-[20px] font-bold">Ask <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">AI</span> later</div>
          <div className="text-[12px] text-brand-mute">When would you like AI suggestions to return?</div>
        </div>

        <div className="mt-5 flex-1 space-y-2">
          {opts.map((o) => {
            const active = pick === o.t;
            return (
              <motion.button
                key={o.t}
                layout
                onClick={() => setPick(o.t)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
                animate={{ scale: active ? 1.015 : 1 }}
                transition={{ type: "spring", stiffness: 460, damping: 30 }}
                className={`w-full flex items-start gap-3 p-3 rounded-2xl border-2 transition-colors text-left shadow-soft ${active ? "border-brand-purple bg-white shadow-glow" : "border-transparent bg-white"}`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${o.g} flex items-center justify-center shrink-0`}>
                  <o.Icon size={15} className="text-white"/>
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold">{o.t}</div>
                  <div className="text-[10px] text-brand-mute">{o.d}</div>
                </div>
                <motion.div
                  layout
                  animate={{ rotate: active ? 360 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${active ? "border-brand-purple gradient-brand" : "border-brand-bg"}`}
                >
                  {active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 520, damping: 24 }}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="mt-4 w-full py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft">
          Confirm
        </motion.button>
      </motion.div>
    </div>
  );
}
