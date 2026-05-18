import { motion } from "framer-motion";
import { useState } from "react";
import {
  Settings,
  Flag,
  Bot,
  Ban,
  Lightbulb,
  PenLine,
  Send,
  User,
  Users,
  Heart,
  ChevronRight,
  Plus,
  AlertTriangle,
  Mic,
} from "lucide-react";

const modes = [
  { Icon: Ban, t: "Off" },
  { Icon: Lightbulb, t: "Suggest" },
  { Icon: PenLine, t: "Draft" },
  { Icon: Send, t: "Act" },
];

const perms = [
  { Icon: User, t: "Strangers", on: false },
  { Icon: Users, t: "Friends", on: true },
  { Icon: Heart, t: "Close Relationships", on: false },
];

export function F36_AIControlCenter() {
  const [mode, setMode] = useState(2);
  const [adaptive, setAdaptive] = useState(true);

  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      {/* Header */}
      <div className="px-5 pt-3 pb-4 flex items-center justify-between">
        <div className="text-[22px] font-bold">AI Control</div>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center shadow-soft">
          <Settings size={16} className="text-brand-purple" />
        </button>
      </div>

      {/* Boundary check */}
      <div className="mx-4 bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-12 h-12 rounded-2xl gradient-pink-peach flex items-center justify-center shrink-0">
          <Flag size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold">Today's boundary check</div>
          <div className="text-[11px] text-brand-mute">
            Review what I can suggest, draft, or pause.
          </div>
        </div>
        <button className="px-3.5 py-2 rounded-full gradient-brand text-white text-[11px] font-bold shadow-soft">
          Continue
        </button>
      </div>

      {/* Current Mode */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[10px] font-bold tracking-[0.2em] text-brand-mute">
          CURRENT HELP LEVEL
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-[22px] font-bold gradient-brand bg-clip-text text-transparent">
              Assistant
            </div>
            <div className="text-[11px] text-brand-mute">I can draft. You approve every send.</div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="relative w-16 h-16 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-glow"
            >
              <Bot size={20} className="text-white" />
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 py-2.5 rounded-2xl bg-brand-ink text-white text-[12px] font-bold">
            Change Mode
          </button>
          <div className="px-3 py-1.5 rounded-full bg-brand-bg text-[10px] font-bold text-brand-purple flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" /> Assistant
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 pt-3 border-t border-brand-bg">
          <span className="text-[11px] text-brand-mute flex-1">Adaptive mode</span>
          <button
            onClick={() => setAdaptive(!adaptive)}
            className={`relative w-10 h-6 rounded-full transition-colors ${adaptive ? "gradient-brand" : "bg-brand-bg"}`}
          >
            <motion.div
              layout
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow ${adaptive ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
      </div>

      {/* Custom Mode */}
      <div className="px-5 mt-5 text-[15px] font-bold">Custom Mode</div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold">AI Communication Influence Level</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">
            View details <ChevronRight size={11} />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {modes.map((m, i) => (
            <button
              key={m.t}
              onClick={() => setMode(i)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${i === mode ? "gradient-brand shadow-glow" : "bg-brand-bg"}`}
              >
                <m.Icon size={16} className={i === mode ? "text-white" : "text-brand-mute"} />
              </div>
              <div
                className={`text-[10px] font-bold ${i === mode ? "text-brand-purple" : "text-brand-mute"}`}
              >
                {m.t}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-brand-mute text-center">
          Draft means I can write options. Nothing is sent until you choose it.
        </div>
      </div>

      {/* AI Permission */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold">Where I am allowed to help</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">
            Manage all <ChevronRight size={11} />
          </button>
        </div>
        <div className="mt-3 space-y-1.5">
          {perms.map((p) => (
            <div
              key={p.t}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl ${p.on ? "gradient-brand text-white" : "bg-brand-bg/50"}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${p.on ? "bg-white/20" : "bg-white"}`}
              >
                <p.Icon size={13} className={p.on ? "text-white" : "text-brand-purple"} />
              </div>
              <div
                className={`flex-1 text-[12px] font-bold ${p.on ? "text-white" : "text-brand-ink"}`}
              >
                {p.t}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Shaping */}
      <div className="px-5 mt-5 text-[15px] font-bold">Basic Shaping</div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-center text-[12px] font-bold mb-3">Edit your Second Self</div>
        <div className="divide-y divide-brand-bg">
          {[
            ["Name", "Sabrina"],
            ["ID", "gakajo"],
            ["Personal intro", "+"],
          ].map(([k, v]) => (
            <div key={k} className="py-2.5 flex items-center justify-between">
              <span className="text-[12px]">{k}</span>
              <span className="text-[11px] text-brand-mute flex items-center gap-1.5">
                {v} <ChevronRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-center text-[12px] font-bold mb-3">Set Your Image</div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl gradient-brand-soft border border-brand-lavender/30 text-[12px] font-bold text-brand-purple">
          Reshape avatar <Plus size={14} />
        </button>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-center text-[12px] font-bold mb-3">Record Your Voice</div>
        <div className="space-y-2">
          {["Voice", "Voice self-introduction"].map((v) => (
            <button
              key={v}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-brand-bg/50"
            >
              <span className="text-[11px] flex items-center gap-2">
                <Mic size={12} className="text-brand-purple" />
                {v}
              </span>
              <Plus size={14} className="text-brand-purple" />
            </button>
          ))}
        </div>
      </div>

      {/* Context Rules */}
      <button className="mx-4 mt-4 w-[calc(100%-2rem)] bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl bg-brand-peach/30 flex items-center justify-center">
          <AlertTriangle size={15} className="text-brand-peach" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-[12px] font-bold">Context Rules</div>
          <div className="text-[10px] text-brand-mute">
            Sensitive situations have extra AI limits.
          </div>
        </div>
        <ChevronRight size={14} className="text-brand-mute" />
      </button>

      <button className="mx-4 mt-2 w-[calc(100%-2rem)] gradient-brand rounded-2xl p-3 flex items-center justify-between shadow-glow">
        <div className="text-left">
          <div className="text-[12px] font-bold text-white">Quick Boundary Edit</div>
          <div className="text-[10px] text-white/80">Apply one help level across relationships</div>
        </div>
        <ChevronRight size={14} className="text-white" />
      </button>
    </div>
  );
}
