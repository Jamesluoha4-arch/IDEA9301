import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Edit3, Bot, TrendingUp, MessageSquare, CheckCircle2, User, Calendar } from "lucide-react";

export function F46_SecondSelf() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ChevronLeft size={20} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Your Second Self</div>
        <div className="w-5"/>
      </div>

      {/* Avatar with orbits */}
      <div className="mt-3 mx-auto relative w-[260px] h-[260px] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-brand-lavender/30"/>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border-2 border-dashed border-brand-purple/40"/>

        <button className="absolute top-2 right-6 w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center z-10">
          <Edit3 size={14} className="text-brand-purple"/>
        </button>

        {[
          { Icon: ChevronUp, pos: "top-3 left-1/2 -translate-x-1/2" },
          { Icon: ChevronDown, pos: "bottom-3 left-1/2 -translate-x-1/2" },
          { Icon: ChevronLeft, pos: "left-3 top-1/2 -translate-y-1/2" },
          { Icon: ChevronRight, pos: "right-3 top-1/2 -translate-y-1/2" },
        ].map((c, i) => (
          <div key={i} className={`absolute ${c.pos} w-7 h-7 rounded-full glass flex items-center justify-center text-brand-purple`}>
            <c.Icon size={14}/>
          </div>
        ))}

        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="relative w-28 h-28 rounded-3xl gradient-brand flex items-center justify-center shadow-glow">
          <Bot size={56} className="text-white"/>
        </motion.div>
      </div>

      <div className="mt-2 flex flex-col items-center">
        <div className="px-5 py-2 rounded-full gradient-brand text-white text-[14px] font-bold shadow-soft">Assistant</div>
        <div className="text-[11px] text-brand-mute mt-1.5">Medium AI involvement</div>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-purple font-bold">
          <TrendingUp size={11}/> Changed from Co-pilot
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl p-3 grid grid-cols-3 divide-x divide-brand-bg shadow-soft border border-white">
        {[
          { v: "42%", t: "Autonomy" },
          { v: "68%", t: "Similarity" },
          { v: "Medium", t: "Risk" },
        ].map((s) => (
          <div key={s.t} className="text-center px-2">
            <div className="text-[18px] font-bold gradient-brand bg-clip-text text-transparent">{s.v}</div>
            <div className="text-[10px] text-brand-mute">{s.t}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Why did it change?</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl shadow-soft border border-white divide-y divide-brand-bg">
        {[
          { Icon: MessageSquare, t: "AI drafted 4 replies today" },
          { Icon: CheckCircle2, t: "You accepted 2 suggestions" },
          { Icon: User, t: "High involvement in Alex's chat" },
          { Icon: Calendar, t: "You kept Co-pilot mode for 3 days" },
        ].map((r) => (
          <div key={r.t} className="p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-brand-soft flex items-center justify-center"><r.Icon size={14} className="text-brand-purple"/></div>
            <div className="text-[12px] flex-1">{r.t}</div>
          </div>
        ))}
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">View Change Details</button>
      <button className="mx-4 mt-2 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Go to AI Control Center</button>
    </div>
  );
}
