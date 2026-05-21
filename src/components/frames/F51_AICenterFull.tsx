import { motion } from "framer-motion";
import { Settings, Ban, Lightbulb, Edit3, User, Users, UserCheck, Heart, ChevronRight, FileEdit, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

const perms = [
  { Icon: User, label: "Strangers", active: false },
  { Icon: Users, label: "Friends", active: true },
  { Icon: Heart, label: "Close Relationships", active: false },
];
const actions = [
  { time: "2:40 PM", Icon: FileEdit, text: "Drafted a reply for Jim", ctx: "In Chat 路 Personal" },
  { time: "11:15 AM", Icon: Sparkles, text: "Suggested topics in Discovery", ctx: "In Discovery" },
  { time: "Yesterday 8:30 PM", Icon: CheckCircle2, text: "Blocked in emotional context", ctx: "In Chat 路 Personal" },
];
const levels = [
  { Icon: Ban, label: "Off" },
  { Icon: Lightbulb, label: "Suggest" },
  { Icon: Edit3, label: "Draft", active: true },
  { Icon: User, label: "Act" },
];

export function F51_AICenterFull() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 flex items-center justify-between">
        <div className="text-[20px] font-bold">AI Control Center</div>
        <Settings size={18} className="text-brand-purple"/>
      </div>

      {/* Current mode */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 border border-brand-bg shadow-soft">
        <div className="text-[9px] font-bold tracking-[0.6px] text-brand-mute">CURRENT AI MODE</div>
        <div className="flex items-start justify-between mt-1">
          <div className="flex-1">
            <div className="text-[22px] font-bold">Co-pilot</div>
            <div className="text-[11px] text-brand-mute leading-[15px] mt-1">AI can draft and suggest, but won't act without your approval.</div>
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center shrink-0 ml-3">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center"><div className="text-[16px]">馃</div></div>
          </motion.div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <button className="px-4 py-2 rounded-full bg-brand-ink text-white text-[12px] font-bold">Change Mode</button>
          <div className="px-2 py-1 rounded-full bg-brand-mint/15 text-brand-mint text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint"/> ACTIVE
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[18px] font-bold">Custom Mode</div>

      {/* Influence levels */}
      <div className="mx-4 mt-2 bg-white rounded-2xl p-4 border border-brand-bg shadow-soft">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold">AI Communication Influence Level</div>
          <button className="text-[10px] text-brand-purple font-bold flex items-center">View details <ChevronRight size={11}/></button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {levels.map((l) => (
            <button key={l.label} className="flex flex-col items-center gap-1">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${l.active ? "bg-brand-ink text-white" : "bg-white border border-brand-bg text-brand-ink"}`}>
                <l.Icon size={16}/>
              </div>
              <div className="text-[10px] font-bold">{l.label}</div>
            </button>
          ))}
        </div>
        <div className="text-[10px] text-brand-mute text-center mt-3">AI can draft replies for you, but won't send anything.</div>
      </div>

      {/* AI Permission */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 border border-brand-bg shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-bold">AI Permission</div>
          <button className="text-[10px] text-brand-purple font-bold flex items-center">Manage all <ChevronRight size={11}/></button>
        </div>
        <div className="space-y-1.5">
          {perms.map((p) => (
            <div key={p.label} className={`flex items-center gap-2.5 p-2 rounded-xl ${p.active ? "gradient-brand-soft border border-brand-lavender/40" : "bg-white border border-brand-bg"}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.active ? "gradient-brand text-white" : "bg-brand-bg text-brand-mute"}`}><p.Icon size={14}/></div>
              <div className="text-[12px] font-bold">{p.label}</div>
              {p.active && <UserCheck size={12} className="ml-auto text-brand-purple"/>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent actions */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 border border-brand-bg shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-bold">Recent AI Actions</div>
          <button className="text-[10px] text-brand-purple font-bold flex items-center">View all <ChevronRight size={11}/></button>
        </div>
        <div className="relative pl-3 border-l-2 border-dashed border-brand-bg space-y-3">
          {actions.map((a, i) => (
            <motion.div key={i} initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i*0.08 }} className="relative">
              <div className="absolute -left-[17px] top-1 w-3 h-3 rounded-full gradient-brand border-2 border-white"/>
              <div className="text-[9px] font-mono text-brand-mute">{a.time}</div>
              <div className="mt-1 p-2.5 rounded-xl bg-brand-bg/40 flex items-start gap-2">
                <a.Icon size={13} className="text-brand-purple mt-0.5 shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold leading-[14px]">{a.text}</div>
                  <div className="text-[9px] text-brand-mute mt-0.5">{a.ctx}</div>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button className="px-2 py-0.5 rounded-md bg-white border border-brand-bg text-[8px] font-bold">Review</button>
                  <button className="px-2 py-0.5 rounded-md bg-white border border-brand-bg text-[8px] font-bold">Why?</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center text-[10px] text-brand-mute mt-3">That's all for today</div>
      </div>

      {/* Context Rules */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 border border-brand-bg shadow-soft flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-pink-peach flex items-center justify-center"><AlertTriangle size={14} className="text-white"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Context Rules</div>
          <div className="text-[10px] text-brand-mute">Sensitive situations have extra AI limits.</div>
        </div>
        <ChevronRight size={14} className="text-brand-mute"/>
      </div>

      {/* Quick Edit CTA */}
      <button className="mx-4 mt-3 w-[calc(100%-2rem)] py-4 rounded-2xl bg-brand-ink text-white flex items-center justify-between px-4 shadow-soft">
        <div className="text-left">
          <div className="text-[13px] font-bold">Quick Edit</div>
          <div className="text-[10px] text-white/70">Apply one level to multiple relationships</div>
        </div>
        <ChevronRight size={16}/>
      </button>
    </div>
  );
}
