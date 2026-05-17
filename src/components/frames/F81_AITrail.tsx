import { ArrowLeft, Calendar, User, ChevronUp, Edit3, MessageCircle, RefreshCw, Heart, Shield, Sparkles } from "lucide-react";

const EVENTS = [
  { Icon: MessageCircle, time: "May 2 · 09:45 PM", title: "Warmth ↑", sub: "AI insight", tag: "Insight", tagBg: "bg-brand-lavender/40 text-brand-purple", side: "Warming up" },
  { Icon: RefreshCw, time: "May 2 · 02:00 PM", title: "Reply sent by you", sub: "Message delivered", tag: "Draft", tagBg: "bg-brand-bg text-brand-ink", side: "Closer" },
  { Icon: Sparkles, time: "May 2 · 10:30 AM", title: "Reconnected", sub: "Topic shared", tag: "Suggest", tagBg: "bg-brand-mint/40 text-brand-ink", side: "Warming up" },
  { Icon: Edit3, time: "May 1 · 04:05 PM", title: "Tone updated", sub: "You adjusted", tag: "Update", tagBg: "bg-brand-sky/40 text-brand-ink", side: "Adjustment" },
  { Icon: Shield, time: "May 1 · 03:20 PM", title: "Sensitive moment", sub: "Action blocked", tag: "Blocked", tagBg: "bg-brand-peach/40 text-brand-peach", side: "Protected" },
  { Icon: Heart, time: "May 1 · 1:00 PM", title: "Reconnected", sub: "Relationship improved", tag: "Celebration", tagBg: "bg-brand-mint/40 text-brand-ink", side: "Positive" },
];

export function AITrail({ variant }: { variant: "spiral" | "lined" }) {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-ink"/>
        <div className="flex-1 text-center text-[15px] font-bold">AI Trail</div>
        <Calendar size={16} className="text-brand-ink"/>
      </div>

      <div className="mx-4 mt-3 bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-3 shadow-soft">
        <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center"><User size={18} className="text-brand-mute"/></div>
        <div className="flex-1">
          <div className="text-[14px] font-bold">Alex Chen</div>
          <div className="text-[10px] text-brand-mute">Cooling down · Since May 2</div>
        </div>
        <div className="flex flex-col gap-1 text-[9px]">
          <Bar label="AI INVOLVEMENT" value="Medium" pct={55}/>
          <Bar label="YOUR RESPONSE" value="Low" pct={22}/>
        </div>
      </div>

      <div className="px-4 mt-3 flex gap-1.5 overflow-x-auto">
        {["You", "Alex", "Suggest", "Draft"].map((t, i) => (
          <button key={t} className="px-3 py-1.5 rounded-full bg-white border border-brand-bg text-[10px] font-bold whitespace-nowrap flex items-center gap-1">
            {i === 0 ? <User size={10}/> : i === 1 ? <User size={10}/> : i === 2 ? <Sparkles size={10}/> : <Edit3 size={10}/>}
            {t}
          </button>
        ))}
      </div>

      <div className="px-5 mt-3 flex items-center justify-end gap-1 text-[10px] font-bold tracking-wider text-brand-mute">CLOSEST TO NOW <ChevronUp size={11}/></div>

      <div className="relative mx-4 mt-2 pl-12 pr-4">
        {variant === "spiral" && (
          <svg className="absolute left-0 top-0 w-12 h-full pointer-events-none" preserveAspectRatio="none">
            <path d="M 24 0 Q 4 100 24 200 Q 44 300 24 400 Q 4 500 24 600" fill="none" stroke="hsl(258 30% 70%)" strokeWidth="1" strokeDasharray="2 3"/>
          </svg>
        )}
        {variant === "lined" && (
          <div className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-brand-bg"/>
        )}
        <div className="space-y-3">
          {EVENTS.map((e, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-12 top-2 w-9 h-9 rounded-full bg-white border border-brand-bg flex items-center justify-center shadow-soft">
                <e.Icon size={14} className="text-brand-ink"/>
              </div>
              <div className="bg-white border border-brand-bg rounded-2xl p-3 shadow-soft">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[9px] text-brand-mute">{e.time}</div>
                    <div className="text-[13px] font-bold mt-0.5">{e.title}</div>
                    <div className="text-[10px] text-brand-mute">{e.sub}</div>
                  </div>
                  <div className="text-[9px] text-brand-mute">{e.side}</div>
                </div>
                <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[9px] font-bold ${e.tagBg}`}>{e.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center"><Edit3 size={13} className="text-brand-ink"/></div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5"><div className="text-[12px] font-bold">Warmth ↓</div></div>
          <div className="text-[9px] text-brand-mute">May 1, 11:32 AM · DRAFT</div>
          <div className="text-[10px] text-brand-mute mt-0.5">You drafted a reply with AI.</div>
        </div>
        <button className="px-2.5 py-1.5 rounded-lg bg-white border border-brand-bg text-[10px] font-bold">View details</button>
      </div>
    </div>
  );
}

function Bar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-brand-mute tracking-wider">{label}</span>
      <div className="w-12 h-1 bg-brand-bg rounded-full"><div className="h-full bg-brand-ink rounded-full" style={{ width: `${pct}%` }}/></div>
      <span className="font-bold">{value}</span>
    </div>
  );
}

export function F81_AITrailSpiral() { return <AITrail variant="spiral"/>; }
export function F82_AITrailLined() { return <AITrail variant="lined"/>; }
