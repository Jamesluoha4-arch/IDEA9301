import { motion } from "framer-motion";
import { ArrowLeft, Bot, HelpCircle, Target, ShieldCheck, Star, Flame, CheckCircle2 } from "lucide-react";

export function F45_ReflectionSaved() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Quick Reflection</div>
        <div className="w-5"/>
      </div>

      <div className="mt-2 flex justify-center">
        <div className="px-3 py-1.5 rounded-full gradient-brand text-white text-[11px] font-bold shadow-glow flex items-center gap-1">
          <CheckCircle2 size={12}/> Reflection saved
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 flex items-center gap-3 shadow-soft border border-white">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 rounded-2xl gradient-mint-sky flex items-center justify-center shadow-glow shrink-0">
          <Bot size={26} className="text-white"/>
        </motion.div>
        <div className="flex-1">
          <div className="text-[15px] font-bold">Streak protected today</div>
          <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-brand-bg text-[10px] font-bold text-brand-purple">+5 pts earned</div>
          <div className="text-[10px] text-brand-mute leading-[14px] mt-1.5">You took a moment to reflect and protect your streak.</div>
        </div>
      </div>

      <div className="mx-4 mt-3 space-y-2">
        <Card Icon={HelpCircle} g="gradient-brand" t="Why you missed" d="Needed clearer guidance"/>
        <Card Icon={Target} g="gradient-pink-peach" t="Tomorrow" d="Show a simpler task"/>
        <Card Icon={ShieldCheck} g="gradient-mint-sky" t="Reflection outcome" d="Submitting this reflection protects today's streak and helps improve tomorrow's challenge."/>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="text-[13px] font-bold mb-2">You're all set</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center"><Star size={15} className="text-white"/></div>
            <div>
              <div className="text-[16px] font-bold">185 pts</div>
              <div className="text-[9px] text-brand-mute">Available Points</div>
            </div>
          </div>
          <div className="w-px h-10 bg-brand-bg"/>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-pink-peach flex items-center justify-center"><Flame size={15} className="text-white"/></div>
            <div>
              <div className="text-[16px] font-bold">3-day streak</div>
              <div className="text-[9px] text-brand-mute">Protected</div>
            </div>
          </div>
        </div>
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">Back to Home</button>
      <button className="mx-4 mt-2 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Go to Frame Shop</button>

      <div className="mx-4 mt-3 p-2.5 rounded-xl bg-white/60 text-[10px] text-brand-mute text-center border border-white">
        Come back tomorrow for a new challenge.
      </div>
    </div>
  );
}

function Card({ Icon, g, t, d }: { Icon: any; g: string; t: string; d: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 flex items-start gap-3 shadow-soft border border-white">
      <div className={`w-9 h-9 rounded-xl ${g} flex items-center justify-center shrink-0`}><Icon size={15} className="text-white"/></div>
      <div className="flex-1">
        <div className="text-[12px] font-bold">{t}</div>
        <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{d}</div>
      </div>
    </div>
  );
}
