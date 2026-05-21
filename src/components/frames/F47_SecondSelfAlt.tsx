import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Edit3, Bot, ShieldCheck, TrendingUp, Info, MessageSquare, CheckCircle2, User, Calendar } from "lucide-react";

export function F47_SecondSelfAlt() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Your Second Self</div>
        <div className="w-5"/>
      </div>

      <div className="mt-3 mx-auto relative w-[230px] h-[230px] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-brand-purple/30"/>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-3 rounded-full border border-brand-lavender/30"/>

        <button className="absolute top-2 right-4 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center z-10">
          <Edit3 size={13} className="text-brand-purple"/>
        </button>

        {[
          { Icon: ChevronUp, pos: "top-1 left-1/2 -translate-x-1/2" },
          { Icon: ChevronDown, pos: "bottom-1 left-1/2 -translate-x-1/2" },
          { Icon: ChevronLeft, pos: "left-1 top-1/2 -translate-y-1/2" },
          { Icon: ChevronRight, pos: "right-1 top-1/2 -translate-y-1/2" },
        ].map((c, i) => (
          <div key={i} className={`absolute ${c.pos} w-6 h-6 rounded-full glass flex items-center justify-center text-brand-purple`}>
            <c.Icon size={12}/>
          </div>
        ))}

        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 rounded-3xl gradient-brand flex items-center justify-center shadow-glow">
          <Bot size={48} className="text-white"/>
        </motion.div>
      </div>

      <div className="flex flex-col items-center">
        <div className="px-4 py-1.5 rounded-full bg-brand-ink text-white text-[13px] font-bold flex items-center gap-1.5"><ShieldCheck size={13}/> Assistant</div>
        <div className="text-[11px] text-brand-mute mt-1.5">Medium AI involvement</div>
        <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-brand-purple">
          <TrendingUp size={11}/> Changed from Co-pilot 馃檪
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-start gap-2.5 shadow-soft border border-white">
        <div className="w-7 h-7 rounded-full gradient-brand-soft flex items-center justify-center shrink-0"><Info size={12} className="text-brand-purple"/></div>
        <div>
          <div className="text-[12px] font-bold">About this change</div>
          <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">Based on recent AI activity, your decisions, relationship involvement, and control settings.</div>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 grid grid-cols-3 divide-x divide-brand-bg shadow-soft border border-white">
        {[
          { v: "42%", t: "AUTONOMY", g: "brand-purple" },
          { v: "68%", t: "SIMILARITY", g: "brand-pink" },
          { v: "Medium", t: "RISK", g: "brand-peach" },
        ].map((s) => (
          <div key={s.t} className="text-center px-2">
            <div className="text-[18px] font-bold">{s.v}</div>
            <div className="text-[8px] tracking-[0.15em] text-brand-mute mt-0.5 flex items-center justify-center gap-0.5">
              {s.t} <Info size={8}/>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Why did it change?</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl shadow-soft border border-white divide-y divide-brand-bg">
        {[
          { Icon: MessageSquare, t: "AI drafted 4 replies today", tag: "ACTIVITY" },
          { Icon: CheckCircle2, t: "You accepted 2 suggestions", tag: "DECISION" },
          { Icon: User, t: "High involvement in Jim's chat", tag: "RELATIONSHIP" },
          { Icon: Calendar, t: "You kept Co-pilot mode for 3 days", tag: "PATTERN" },
        ].map((r) => (
          <div key={r.t} className="p-3 flex items-center gap-2.5">
            <r.Icon size={14} className="text-brand-purple"/>
            <div className="text-[12px] flex-1">{r.t}</div>
            <div className="px-1.5 py-0.5 rounded-md bg-brand-bg text-[8px] font-bold text-brand-purple tracking-wider">{r.tag}</div>
          </div>
        ))}
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">View Change Details</button>
      <button className="mx-4 mt-2 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Go to AI Control Center</button>
    </div>
  );
}
