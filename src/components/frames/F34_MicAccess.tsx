import { motion } from "framer-motion";
import { ArrowLeft, Mic } from "lucide-react";
import { BottomNav } from "./F09_Home";

const flow = [
  { n: 1, t: "Voice cue", d: "tone shift", g: "from-brand-purple to-brand-lavender" },
  { n: 2, t: "Microphone", d: "brief access", g: "from-brand-sky to-brand-mint" },
  { n: 3, t: "AI adapts", d: "slower timing", g: "from-brand-pink to-brand-peach" },
  { n: 4, t: "Response", d: "suggested only", g: "from-brand-mint to-brand-sky" },
];

const recent = [
  { t: "12:42", b: "Microphone briefly activated during emotionally adaptive response." },
  { t: "12:18", b: "Voice pacing analyzed during low-engagement interaction." },
  { t: "11:57", b: "Audio context used to reduce conversational tension." },
  { t: "11:31", b: "Background listening paused after inactivity." },
];

export function F34_MicAccess() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 pt-2 flex items-center gap-3">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div>
          <div className="text-[14px] font-bold tracking-[0.4px]">MICROPHONE ACCESS</div>
          <div className="text-[9px] font-mono text-brand-mute">SYSTEM_VISIBILITY_V1.0</div>
        </div>
      </div>
      <div className="px-5 mt-2 text-[11px] text-brand-mute">Reviewing voice-based interaction support activity.</div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[9px] font-bold tracking-[0.6px] text-brand-mute">LIVE ACCESS OVERVIEW</div>
        <div className="mt-3 flex items-center gap-4">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-14 h-14 rounded-2xl gradient-brand shadow-glow flex items-center justify-center relative">
            <Mic size={22} className="text-white"/>
            <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-2xl border-2 border-brand-purple"/>
          </motion.div>
          <div className="flex-1">
            <div className="text-[10px] text-brand-mute">Microphone Status</div>
            <div className="text-[18px] font-bold leading-[22px]"><span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Recently Active</span></div>
          </div>
        </div>

        {/* waveform */}
        <div className="mt-4 flex items-end justify-center gap-1 h-[40px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full gradient-brand"
              animate={{ height: [`${10 + Math.sin(i) * 8 + 5}px`, `${20 + Math.cos(i * 0.5) * 12}px`, `${10 + Math.sin(i) * 8 + 5}px`] }}
              transition={{ duration: 1.5 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.04 }}
            />
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-brand-bg space-y-1.5 text-[11px]">
          {[
            ["Purpose", "Conversation tone adaptation"],
            ["Recent Duration", "3m 14s"],
            ["Last Access", "12 minutes ago"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-brand-mute">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
          <div className="pt-1 text-[10px] text-brand-mute italic leading-[13px]">The microphone supported softer AI social response timing.</div>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="text-[14px] font-bold">AI Audio Participation</div>
        <div className="text-[10px] text-brand-mute">How voice cues become safer AI response timing.</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {flow.map((s, i) => (
            <motion.div key={s.n} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.06 * i }} className="bg-brand-bg/40 rounded-2xl p-2.5 border border-brand-bg">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${s.g} flex items-center justify-center text-white text-[10px] font-bold`}>{s.n}</div>
                <div className="text-[12px] font-bold">{s.t}</div>
              </div>
              <div className="text-[9px] text-brand-mute mt-1 ml-8">{s.d}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 text-center text-[10px] text-brand-mute font-mono">No message was sent automatically</div>
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Recent Audio Activity</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
        {recent.map((r) => (
          <div key={r.t} className="px-3 py-2.5 flex items-start gap-3">
            <div className="text-[10px] font-mono text-brand-purple font-bold w-[34px] mt-0.5">{r.t}</div>
            <div className="flex-1 text-[11px] leading-[14px]">{r.b}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 mb-4 px-4 py-3 rounded-2xl bg-white/50 border border-brand-bg text-[10px] text-brand-mute text-center leading-[14px]">
        Most microphone activity occurred during emotionally familiar conversations.
      </div>

      <BottomNav active="PRESENCE"/>
    </div>
  );
}
