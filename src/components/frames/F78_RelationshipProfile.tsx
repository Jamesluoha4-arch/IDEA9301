import { motion } from "framer-motion";
import { ArrowLeft, MoreHorizontal, User, Info, Flag, Calendar, Bot, ChevronRight, Lightbulb } from "lucide-react";

export function F78_RelationshipProfile() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-ink"/>
        <div className="flex-1 text-center text-[15px] font-bold">Alex Chen</div>
        <MoreHorizontal size={18} className="text-brand-ink"/>
      </div>

      <div className="mx-4 mt-3 bg-white border border-brand-bg rounded-3xl p-3.5 flex items-start gap-3 shadow-soft">
        <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center"><User size={20} className="text-brand-mute"/></div>
        <div className="flex-1">
          <div className="text-[14px] font-bold leading-tight">Cooling<br/>down</div>
          <div className="text-[10px] text-brand-mute mt-0.5">Since May 2</div>
        </div>
        <div className="flex flex-col gap-1 text-[9px]">
          <Bar label="AI involvement" value="Medium" pct={60}/>
          <Bar label="Your response" value="Low" pct={25}/>
        </div>
      </div>

      <div className="mx-4 mt-3">
        <div className="text-[11px] font-bold flex items-center gap-1.5">Depth level <Info size={11} className="text-brand-mute"/></div>
        <div className="mt-2 relative h-1 bg-brand-bg rounded-full">
          <motion.div initial={{ width: 0 }} animate={{ width: "55%" }} transition={{ duration: 1 }} className="h-full gradient-brand rounded-full"/>
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-ink" style={{ left: "55%" }}/>
        </div>
        <div className="flex justify-between text-[9px] text-brand-mute mt-1.5"><span>Casual friend</span><span>Familiar friend</span></div>
      </div>

      <div className="px-5 mt-4 text-[13px] font-bold">Overview <Info size={11} className="inline text-brand-mute"/></div>
      <div className="mx-4 mt-2 grid grid-cols-3 gap-2">
        {[
          { t: "AI actions", v: "12 times", s: "vs last 7 days +20%" },
          { t: "You responded", v: "4 times", s: "vs last 7 days -8%" },
          { t: "Key change", v: "May 4", s: "Bot drifted" },
        ].map((m) => (
          <div key={m.t} className="bg-white border border-brand-bg rounded-2xl p-2.5">
            <div className="text-[9px] text-brand-mute">{m.t}</div>
            <div className="text-[13px] font-bold mt-0.5">{m.v}</div>
            <div className="text-[8px] text-brand-mute mt-0.5">{m.s}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[13px] font-bold">Key signals</div>
      <div className="mx-4 mt-2 grid grid-cols-3 gap-2">
        {[
          { t: "Reply gap", s: "8h → 26h" },
          { t: "Warmth ↓", s: "Shorter replies" },
          { t: "AI involvement", s: "5.4x this week" },
        ].map((m) => (
          <div key={m.t} className="bg-white border border-brand-bg rounded-2xl p-2.5">
            <div className="text-[10px] font-bold">{m.t}</div>
            <div className="text-[8px] text-brand-mute mt-0.5">{m.s}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[13px] font-bold">What's driving this change</div>
      <div className="mx-4 mt-2 space-y-2">
        {[
          { t: "You missed 1 message" },
          { t: "No new shared memory in 12 days" },
          { t: "AI drafted more replies this week", Icon: Bot },
        ].map(({ t, Icon }) => (
          <div key={t} className="bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-2.5">
            {Icon ? <Icon size={13} className="text-brand-purple"/> : <Flag size={13} className="text-brand-ink"/>}
            <div className="text-[11px] flex-1">{t}</div>
            <ChevronRight size={12} className="text-brand-mute"/>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[13px] font-bold">Recent moments</div>
      <div className="mx-4 mt-2 space-y-2">
        {[
          { t: "Hiking trip", d: "Apr 26" },
          { t: "Late-night study chat", d: "Apr 29" },
          { t: "Missed reply on May 2", d: "May 2" },
        ].map((m, i) => (
          <div key={i} className="bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-2.5">
            <Calendar size={13} className="text-brand-ink"/>
            <div className="flex-1">
              <div className="text-[12px] font-bold">{m.t}</div>
              <div className="text-[10px] text-brand-mute">{m.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[13px] font-bold flex items-center gap-1.5">AI involvement over time <Info size={11} className="text-brand-mute"/> <div className="ml-auto text-[10px] font-normal text-brand-mute">7 days ▾</div></div>
      <div className="mx-4 mt-2 bg-white border border-brand-bg rounded-2xl p-3">
        <div className="grid grid-cols-1 gap-1 text-[9px] text-brand-mute mb-1">
          {["High","Medium","Low"].map((l) => <div key={l}>{l}</div>)}
        </div>
        <svg viewBox="0 0 200 50" className="w-full h-12">
          <polyline points="0,30 30,20 60,35 100,15 130,32 170,18 200,28" fill="none" stroke="hsl(258 70% 60%)" strokeWidth="1.8"/>
          {[0,30,60,100,130,170,200].map((x,i) => <circle key={i} cx={x} cy={[30,20,35,15,32,18,28][i]} r="2" fill="hsl(258 70% 60%)"/>)}
        </svg>
        <div className="flex justify-between text-[9px] text-brand-mute mt-1"><span>Apr 29</span><span>Apr 30</span><span>May 1</span><span>May 2</span><span>May 3</span><span>May 4</span><span>Today</span></div>
      </div>

      <div className="px-5 mt-4 text-[13px] font-bold">Suggested next step</div>
      <div className="mx-4 mt-2 bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center"><Lightbulb size={14} className="text-brand-ink"/></div>
        <div>
          <div className="text-[12px] font-bold">Send a small personal check-in</div>
          <div className="text-[9px] text-brand-mute">A simple message can help rebuild warmth.</div>
        </div>
      </div>

      <button className="mx-5 mt-4 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">Relationship Check-in</button>
      <button className="mx-5 mt-2 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">View AI Trail</button>
    </div>
  );
}

function Bar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-brand-mute">{label}</span>
      <div className="w-14 h-1 bg-brand-bg rounded-full"><div className="h-full bg-brand-ink rounded-full" style={{ width: `${pct}%` }}/></div>
      <span className="font-bold">{value}</span>
    </div>
  );
}
