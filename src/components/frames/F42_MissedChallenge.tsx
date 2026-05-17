import { motion } from "framer-motion";
import { Settings, AlertTriangle, Bot, Ban, Lightbulb, PenLine, Send, User, Users, Heart, ChevronRight, Clock, Flame } from "lucide-react";

const modes = [{ Icon: Ban, t: "Off" }, { Icon: Lightbulb, t: "Suggest" }, { Icon: PenLine, t: "Draft" }, { Icon: Send, t: "Act" }];
const perms = [{ Icon: User, t: "Strangers", on: false }, { Icon: Users, t: "Friends", on: true }, { Icon: Heart, t: "Close Relationships", on: false }];

export function F42_MissedChallenge() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-4 flex items-center justify-between">
        <div className="text-[22px] font-bold">AI Control Center</div>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center shadow-soft"><Settings size={16} className="text-brand-purple"/></button>
      </div>

      {/* Missed challenge alert */}
      <div className="mx-4 bg-white rounded-2xl p-3.5 shadow-soft border-2 border-brand-peach/40">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-brand-peach/20 flex items-center justify-center"><Flame size={16} className="text-brand-peach"/></div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">Daily Challenge</div>
            <div className="text-[10px] text-brand-mute flex items-center gap-1 mt-0.5"><AlertTriangle size={10}/> Challenge missed today</div>
          </div>
        </div>
        <div className="mt-2.5 pt-2.5 border-t border-brand-bg space-y-1.5">
          <div className="text-[10px] text-brand-mute flex items-center gap-1"><Clock size={10}/> Marked missed at 11:58 PM</div>
          <div className="text-[10px] text-brand-peach font-bold flex items-center gap-1"><Flame size={10}/> 3-day streak at risk</div>
        </div>
        <button className="w-full mt-3 py-2.5 rounded-2xl bg-brand-ink text-white text-[12px] font-bold">Reflect Now</button>
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
              <div className="w-11 h-11 rounded-2xl gradient-brand flex items-center justify-center shadow-glow"><Bot size={18} className="text-white"/></div>
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
