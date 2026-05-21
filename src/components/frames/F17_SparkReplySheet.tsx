import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  Calendar,
  Mountain,
  Check,
  MessageSquare,
  Brain,
  Users,
  ShieldCheck,
} from "lucide-react";

const tones = ["Friendly", "Direct", "Playful", "Brief"];

export function F17_SparkReplySheet() {
  const [tone, setTone] = useState("Friendly");
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-[32px] pb-5 max-h-[88%] overflow-y-auto shadow-glow"
      >
        <div className="pt-3 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-brand-bg" />
        </div>
        <div className="px-5 pt-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold flex items-center gap-2">
              <Sparkles size={18} className="text-brand-purple" /> Spark Reply
            </h2>
            <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[10px] text-brand-purple font-bold">
              AI Reply
            </div>
          </div>
          <p className="text-[11px] text-brand-mute mt-1">
            Nothing will be sent until you approve.
          </p>

          <div className="mt-3 flex gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${tone === t ? "gradient-brand text-white shadow-soft" : "bg-brand-bg text-brand-ink"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            className="mt-4 rounded-2xl p-3.5 relative gradient-brand-soft border-2 border-brand-purple/30"
          >
            <div className="text-[10px] tracking-[0.5px] text-brand-purple font-bold flex items-center justify-between">
              SELECTED DRAFT <Sparkles size={12} />
            </div>
            <div className="text-[12px] mt-1.5 leading-[18px]">
              "Maybe we can check out Ridge Loop? I recall you mentioning you liked the views there
              last fall. Should be nice for a Saturday morning!"
            </div>
          </motion.div>

          <div className="mt-5">
            <div className="text-[10px] tracking-[0.5px] font-bold text-brand-mute">
              REASONING TRAIL
            </div>
            <div className="mt-3 flex items-center justify-between">
              {[
                { Icon: Calendar, l: "Weekend plan", g: "from-brand-sky to-brand-mint" },
                { Icon: Mountain, l: "Hiking memory", g: "from-brand-pink to-brand-peach" },
                {
                  Icon: Check,
                  l: "Draft ready",
                  g: "from-brand-purple to-brand-lavender",
                  active: true,
                },
              ].map((s, i, arr) => (
                <div key={s.l} className="flex items-center gap-1.5 flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${s.g} flex items-center justify-center ${s.active ? "shadow-glow" : ""}`}
                    >
                      <s.Icon size={15} strokeWidth={2} className="text-white" />
                    </div>
                    <div
                      className={`text-[9px] ${s.active ? "font-bold text-brand-purple" : "text-brand-mute"}`}
                    >
                      {s.l}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 text-brand-lavender text-center font-bold">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[10px] tracking-[0.5px] font-bold text-brand-mute">
              USED CONTEXT
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                {
                  Icon: MessageSquare,
                  t: "Past chat",
                  d: "Referencing hike mention from Oct 12.",
                  g: "from-brand-purple to-brand-lavender",
                },
                {
                  Icon: Brain,
                  t: "Memory",
                  d: "Recall: Preference for loop trails over out-back.",
                  g: "from-brand-sky to-brand-mint",
                },
                {
                  Icon: Users,
                  t: "Relationship",
                  d: "Casual tone established over 3 months.",
                  g: "from-brand-pink to-brand-peach",
                },
                {
                  Icon: ShieldCheck,
                  t: "Safe filters",
                  d: "No sensitive data triggers found.",
                  g: "from-brand-mint to-brand-sky",
                },
              ].map((c) => (
                <div key={c.t} className="bg-white rounded-2xl p-2.5 shadow-soft">
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.g} flex items-center justify-center`}
                  >
                    <c.Icon size={13} className="text-white" />
                  </div>
                  <div className="text-[11px] font-bold mt-1.5">{c.t}</div>
                  <div className="text-[9px] text-brand-mute leading-[12px] mt-0.5">{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="py-3 rounded-2xl bg-brand-bg text-[12px] font-bold"
            >
              Edit Before Sending
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              className="py-3 rounded-2xl gradient-brand text-white text-[12px] font-bold shadow-soft"
            >
              Insert Draft
            </motion.button>
          </div>
          <div className="text-center text-[11px] mt-3 text-brand-purple font-bold">
            Back to Chat
          </div>
        </div>
      </motion.div>
    </div>
  );
}
