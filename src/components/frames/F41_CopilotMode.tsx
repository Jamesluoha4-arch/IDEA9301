import { motion } from "framer-motion";
import { Settings, Trophy, Bot, Ban, Lightbulb, PenLine, Send, User, Users, Heart, ChevronRight, AlertTriangle, MessageSquare, CheckCircle2, Eye } from "lucide-react";

const modes = [{ Icon: Ban, t: "Off" }, { Icon: Lightbulb, t: "Suggest" }, { Icon: PenLine, t: "Draft" }, { Icon: Send, t: "Act" }];
const perms = [{ Icon: User, t: "Strangers", on: false }, { Icon: Users, t: "Friends", on: true }, { Icon: Heart, t: "Close Relationships", on: false }];

export function F41_CopilotMode() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-4 flex items-center justify-between">
        <div className="text-[22px] font-bold">AI Control Center</div>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center shadow-soft"><Settings size={16} className="text-brand-purple"/></button>
      </div>

      {/* Daily Challenge completed banner */}
      <div className="mx-4 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-11 h-11 rounded-2xl gradient-mint-sky flex items-center justify-center shrink-0">
          <Trophy size={17} className="text-white"/>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="text-[13px] font-bold">Daily Challenge</div>
            <div className="px-2 py-0.5 rounded-full gradient-brand text-white text-[9px] font-bold">+20 pts earned</div>
          </div>
          <div className="text-[10px] text-brand-mute mt-1 flex items-center gap-1"><CheckCircle2 size={10} className="text-brand-purple"/> All done today 路 3 / 3</div>
        </div>
        <button className="px-2.5 py-1.5 rounded-full bg-brand-bg text-[10px] font-bold text-brand-purple">View Reward</button>
      </div>

      {/* Co-pilot mode */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[10px] font-bold tracking-[0.2em] text-brand-mute">CURRENT AI MODE</div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-[22px] font-bold gradient-brand bg-clip-text text-transparent">Co-pilot</div>
            <div className="text-[10px] text-brand-mute leading-[14px] mt-1">AI can draft and suggest, but won't act without your approval.</div>
          </div>
          <div className="relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-dashed border-brand-lavender"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 rounded-2xl gradient-brand flex items-center justify-center shadow-glow">
                <Bot size={18} className="text-white"/>
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white shadow-soft text-[8px] font-bold text-brand-purple flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-brand-mint animate-pulse"/>ACTIVE
            </div>
          </div>
        </div>
        <button className="w-full mt-4 py-2.5 rounded-2xl bg-brand-ink text-white text-[12px] font-bold">Change Mode</button>
      </div>

      <div className="px-5 mt-5 text-[15px] font-bold">Custom Mode</div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold">AI Communication Influence Level</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">View details <ChevronRight size={11}/></button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {modes.map((m, i) => (
            <div key={m.t} className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 2 ? "gradient-brand shadow-glow" : "bg-brand-bg"}`}>
                <m.Icon size={16} className={i === 2 ? "text-white" : "text-brand-mute"}/>
              </div>
              <div className={`text-[10px] font-bold ${i === 2 ? "text-brand-purple" : "text-brand-mute"}`}>{m.t}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-brand-mute text-center">AI can draft replies for you, but won't send anything.</div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold">AI Permission</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">Manage all <ChevronRight size={11}/></button>
        </div>
        <div className="mt-3 space-y-1.5">
          {perms.map((p) => (
            <div key={p.t} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${p.on ? "gradient-brand text-white" : "bg-brand-bg/50"}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${p.on ? "bg-white/20" : "bg-white"}`}>
                <p.Icon size={13} className={p.on ? "text-white" : "text-brand-purple"}/>
              </div>
              <div className={`flex-1 text-[12px] font-bold ${p.on ? "text-white" : "text-brand-ink"}`}>{p.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent AI Actions */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[12px] font-bold">Recent AI Actions</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">View all <ChevronRight size={11}/></button>
        </div>
        <div className="relative pl-5">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-brand-bg"/>
          {[
            { t: "2:40 PM", h: "Drafted a reply for Jim", s: "In Chat 路 Personal", Icon: PenLine, g: "gradient-brand" },
            { t: "11:15 AM", h: "Suggested topics in Discovery", s: "In Discovery", Icon: Lightbulb, g: "gradient-mint-sky" },
            { t: "Yesterday 8:30 PM", h: "Blocked an emotional context", s: "In Chat 路 Personal", Icon: Eye, g: "gradient-pink-peach" },
          ].map((a, i) => (
            <div key={i} className="relative mb-3 last:mb-0">
              <div className={`absolute -left-5 top-1 w-2.5 h-2.5 rounded-full ${a.g}`}/>
              <div className="text-[10px] text-brand-mute">{a.t}</div>
              <div className="mt-1 bg-brand-bg/40 rounded-xl p-2.5 flex items-start gap-2">
                <div className={`w-6 h-6 rounded-lg ${a.g} flex items-center justify-center shrink-0`}><a.Icon size={11} className="text-white"/></div>
                <div className="flex-1">
                  <div className="text-[11px] font-bold leading-[14px]">{a.h}</div>
                  <div className="text-[9px] text-brand-mute mt-0.5">{a.s}</div>
                </div>
                <div className="flex gap-1">
                  <button className="px-1.5 py-0.5 rounded-md bg-white text-[8px] font-bold text-brand-purple">Review</button>
                  <button className="px-1.5 py-0.5 rounded-md bg-white text-[8px] font-bold text-brand-mute">Why?</button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-[10px] text-brand-mute text-center pt-1">That's all for today</div>
        </div>
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl bg-brand-peach/30 flex items-center justify-center"><AlertTriangle size={15} className="text-brand-peach"/></div>
        <div className="flex-1 text-left">
          <div className="text-[12px] font-bold">Context Rules</div>
          <div className="text-[10px] text-brand-mute">Sensitive situations have extra AI limits.</div>
        </div>
        <ChevronRight size={14} className="text-brand-mute"/>
      </button>

      <button className="mx-4 mt-2 w-[calc(100%-2rem)] gradient-brand rounded-2xl p-3 flex items-center justify-between shadow-glow">
        <div className="text-left">
          <div className="text-[12px] font-bold text-white">Quick Edit</div>
          <div className="text-[10px] text-white/80">Apply one level to multiple relationships</div>
        </div>
        <ChevronRight size={14} className="text-white"/>
      </button>
    </div>
  );
}
