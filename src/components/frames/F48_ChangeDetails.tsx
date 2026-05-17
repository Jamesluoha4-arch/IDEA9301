import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Bot, ShieldCheck, MessageSquare, CheckCircle2, User, Calendar, ChevronRight, AlertCircle, Lock } from "lucide-react";

export function F48_ChangeDetails() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Change Details</div>
        <div className="w-5"/>
      </div>

      <div className="mt-3 mx-auto relative w-[140px] h-[140px] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed border-brand-lavender/40"/>
        <button className="absolute top-0 right-0 w-7 h-7 rounded-full bg-white shadow-soft flex items-center justify-center z-10">
          <Edit3 size={12} className="text-brand-purple"/>
        </button>
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center shadow-glow">
          <Bot size={40} className="text-white"/>
        </motion.div>
      </div>

      <div className="flex flex-col items-center mt-1">
        <div className="px-4 py-1.5 rounded-full bg-brand-ink text-white text-[13px] font-bold flex items-center gap-1.5"><ShieldCheck size={13}/> Assistant</div>
        <div className="text-[11px] text-brand-mute mt-1.5">Changed from Co-pilot today</div>
        <div className="text-[10px] text-brand-mute">May 5, 2025 · 9:41 AM</div>
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Why did it change?</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl shadow-soft border border-white divide-y divide-brand-bg">
        {[
          { Icon: MessageSquare, tag: "AI ACTIVITY", h: "AI drafted 4 replies today", d: "Frequent drafting increased AI support in your chats.", g: "gradient-brand" },
          { Icon: CheckCircle2, tag: "YOUR DECISIONS", h: "You accepted 2 suggestions", d: "Your approvals showed comfort with more AI help.", g: "gradient-mint-sky" },
          { Icon: User, tag: "RELATIONSHIP CONTEXT", h: "High involvement in Alex's chat", d: "One relationship needed more support today.", g: "gradient-pink-peach" },
          { Icon: Calendar, tag: "USAGE PATTERN", h: "You kept Co-pilot mode for 3 days", d: "A repeated pattern reinforced the Assistant state.", g: "gradient-brand" },
        ].map((r) => (
          <div key={r.tag} className="p-3 flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg ${r.g} flex items-center justify-center shrink-0`}><r.Icon size={14} className="text-white"/></div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] tracking-wider font-bold text-brand-mute">{r.tag}</div>
              <div className="text-[12px] font-bold mt-0.5">{r.h}</div>
              <div className="text-[10px] text-brand-mute leading-[14px]">{r.d}</div>
            </div>
            <ChevronRight size={14} className="text-brand-mute mt-1"/>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">State Path</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <Path date="May 1" t="Co-pilot" sub="Previous state" Icon={AlertCircle}/>
          <div className="flex-1 h-px border-t-2 border-dashed border-brand-bg mx-1"/>
          <Path date="May 5" t="Assistant" sub="Current state" Icon={ShieldCheck} active/>
          <div className="flex-1 h-px border-t-2 border-dashed border-brand-bg mx-1"/>
          <Path date="Locked" t="Auto-pilot" sub="Needs approval" Icon={Lock} locked/>
        </div>
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Control Insight</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl p-3 flex items-start gap-3 shadow-soft border border-white">
        <div className="w-8 h-8 rounded-full gradient-brand-soft flex items-center justify-center shrink-0">💡</div>
        <div className="text-[11px] text-brand-mute leading-[15px]">AI involvement increased today, but no action was completed without your approval.</div>
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">Go to AI Control Center</button>
      <button className="mx-4 mt-2 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Back to Second Self</button>
    </div>
  );
}

function Path({ date, t, sub, Icon, active, locked }: { date: string; t: string; sub: string; Icon: any; active?: boolean; locked?: boolean }) {
  return (
    <div className="flex flex-col items-center w-[78px]">
      <div className="text-[9px] text-brand-mute">{date}</div>
      <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center ${active ? "gradient-brand shadow-glow" : locked ? "bg-brand-bg" : "bg-white border border-brand-bg"}`}>
        <Icon size={16} className={active ? "text-white" : "text-brand-mute"}/>
      </div>
      <div className={`mt-1 text-[10px] font-bold ${active ? "text-brand-purple" : locked ? "text-brand-mute" : ""}`}>{t}</div>
      <div className="text-[8px] text-brand-mute text-center leading-tight">{sub}</div>
    </div>
  );
}
