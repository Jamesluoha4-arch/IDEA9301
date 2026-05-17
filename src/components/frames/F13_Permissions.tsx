import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, MessageSquare, Brain, Users, FileText, Smile, BookOpen, Link2, Info } from "lucide-react";

const categories = [
  { Icon: MessageSquare, t: "Past Chats", d: "History with your contacts", on: true, g: "from-brand-purple to-brand-lavender" },
  { Icon: Brain, t: "Memories", d: "Core personality events", on: true, g: "from-brand-sky to-brand-mint" },
  { Icon: Users, t: "Relationship Info", d: "Who matters most to you", on: true, g: "from-brand-pink to-brand-peach" },
  { Icon: FileText, t: "Personal Notes", d: "Internal voice and ideas", on: false, g: "from-brand-mute to-brand-mute" },
  { Icon: Smile, t: "Emotional Memories", d: "Specific sentiment data", on: false, g: "from-brand-mute to-brand-mute" },
  { Icon: BookOpen, t: "Private Diary", d: "Locked journal entries", on: false, g: "from-brand-mute to-brand-mute" },
  { Icon: Link2, t: "Cross-Platform Data", d: "Connected external accounts", on: false, g: "from-brand-mute to-brand-mute" },
];

export function F13_Permissions() {
  const [items, setItems] = useState(categories);
  const [mode, setMode] = useState("Strict");

  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[14px] font-bold">Manage Permissions</div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-brand-purple">
          <ShieldCheck size={11}/> APPROVED ONLY
        </div>
      </div>

      <div className="mx-5 mt-4 bg-white rounded-2xl p-4 flex items-start gap-3 shadow-soft border border-brand-bg">
        <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
          <ShieldCheck size={18} strokeWidth={2} className="text-white"/>
        </div>
        <div>
          <div className="text-[13px] font-bold">You're in control</div>
          <div className="text-[11px] text-brand-mute mt-1 leading-[16px]">Your Second Self can only use data you approve. Sensitive data is blocked by default.</div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[16px] font-bold">Data Categories</div>
      <div className="px-5 text-[11px] text-brand-mute mt-1">Choose what your Second Self can access</div>

      <div className="mx-5 mt-3 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
        {items.map((c, i) => (
          <div key={c.t} className="px-3 py-3 flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.on ? c.g : "from-brand-bg to-brand-bg"} flex items-center justify-center`}>
              <c.Icon size={16} strokeWidth={2} className={c.on ? "text-white" : "text-brand-mute"}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold">{c.t}</div>
              <div className="text-[10px] text-brand-mute leading-[12px]">{c.d}</div>
            </div>
            <div className={`text-[10px] font-bold ${c.on ? "text-brand-purple" : "text-brand-mute"}`}>{c.on ? "Allowed" : "Blocked"}</div>
            <button
              onClick={() => setItems((a) => a.map((x, j) => j === i ? { ...x, on: !x.on } : x))}
              className={`relative w-10 h-6 rounded-full transition-colors ${c.on ? "gradient-brand" : "bg-brand-bg"}`}
            >
              <motion.div layout className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow ${c.on ? "right-0.5" : "left-0.5"}`}/>
            </button>
          </div>
        ))}
        <div className="px-3 py-2.5 flex items-start gap-2 text-[10px] text-brand-mute leading-[14px] bg-brand-bg/40 rounded-b-2xl">
          <Info size={12} className="mt-0.5 shrink-0 text-brand-purple"/> Blocked categories will never be used in any AI warm-up or draft.
        </div>
      </div>

      <div className="px-5 mt-6 text-[16px] font-bold">Permission Mode</div>
      <div className="px-5 text-[11px] text-brand-mute mt-1">Choose how strict your AI boundaries should be</div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          { t: "Strict", d: "Maximum privacy. Most data blocked." },
          { t: "Balanced", d: "Recommended. Smart boundaries." },
          { t: "Flexible", d: "More context. Less blocking." },
        ].map((m) => (
          <button
            key={m.t}
            onClick={() => setMode(m.t)}
            className={`w-full bg-white rounded-2xl border-2 p-3.5 flex items-center gap-3 text-left transition-all shadow-soft ${mode === m.t ? "border-brand-purple" : "border-transparent"}`}
          >
            <div className="flex-1">
              <div className="text-[13px] font-bold">{m.t}</div>
              <div className="text-[10px] text-brand-mute">{m.d}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mode === m.t ? "border-brand-purple gradient-brand" : "border-brand-bg"}`}>
              {mode === m.t && <div className="w-1.5 h-1.5 rounded-full bg-white"/>}
            </div>
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 bg-white rounded-2xl p-3 flex items-center gap-3 border border-brand-mint/40">
        <div className="w-9 h-9 rounded-xl gradient-mint-sky flex items-center justify-center shrink-0">
          <ShieldCheck size={16} className="text-white"/>
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Your data is always protected</div>
          <div className="text-[10px] text-brand-mute">You can change these settings anytime. Nothing is used without your permission.</div>
        </div>
      </div>
    </div>
  );
}
