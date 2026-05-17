import { ChevronLeft, Info, User, Users, Heart, CheckCircle2, XCircle, Sparkles } from "lucide-react";

const PERMS = [
  { key: "Strangers", Icon: User, label: "People you don't know", level: "Suggest level", intro: "AI can suggest safe topics for strangers, but you decide what to say.", in: "Hi, I'm new here. Any tips for getting started?", out: ["Check out the getting started guide.", "Try introducing yourself in the community.", "The FAQ section might be helpful."], cap: "Suggested by AI • You decide what to say", buttons: ["Use suggestion", "Write my own reply"], summary: [
    { ok: true, t: "AI can suggest topics and reply ideas" },
    { ok: false, t: "AI cannot draft full replies" },
    { ok: false, t: "AI cannot send messages automatically" },
    { ok: false, t: "AI cannot start conversations" },
  ]},
  { key: "Friends", Icon: Users, label: "Known contacts", level: "Draft level", intro: "AI can help prepare replies for friends, but you approve before anything is sent.", in: "Hey! How was your weekend?", out: ["It was great! Went hiking with some friends. The weather was perfect."], cap: "Drafted by AI • Waiting for your approval", buttons: ["Edit draft", "Use draft"], summary: [
    { ok: true, t: "AI can suggest topics and draft replies" },
    { ok: false, t: "AI cannot send messages automatically" },
    { ok: false, t: "AI cannot start conversations" },
    { ok: false, t: "AI cannot act without your approval" },
  ]},
  { key: "Close Relationships", Icon: Heart, label: "People closest to you", level: "Off level", intro: "For your closest relationships, AI stays off by default. You can invite AI help only when you choose to.", in: "I'm feeling a bit overwhelmed. Not sure how to say it...", out: ["AI won't suggest, draft, or act in this conversation.", "You're in full control."], cap: "AI is off", buttons: ["Invite AI help", "Write by myself"], summary: [
    { ok: false, t: "AI won't suggest topics or reply ideas" },
    { ok: false, t: "AI won't draft replies for you" },
    { ok: false, t: "AI won't send messages automatically" },
    { ok: false, t: "AI won't act without your approval" },
  ]},
] as const;

export function WhyThisLevel({ active }: { active: 0 | 1 | 2 }) {
  const P = PERMS[active];
  const isOff = active === 2;
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ChevronLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Why this level?</div>
        <Info size={16} className="text-brand-purple"/>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-3 shadow-soft border border-white">
        <div className="text-[10px] font-bold text-brand-mute mb-2">AI Permission</div>
        {PERMS.map((p, i) => (
          <button key={p.key} className={`w-full mt-1 px-3 py-2.5 rounded-2xl flex items-center gap-2.5 transition-all ${i === active ? "gradient-brand text-white shadow-glow" : "bg-white border border-brand-bg"}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === active ? "bg-white/20" : "bg-brand-bg"}`}>
              <p.Icon size={13} className={i === active ? "text-white" : "text-brand-ink"} />
            </div>
            <div className={`text-[12px] font-bold ${i === active ? "" : ""}`}>{p.key}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full border-2 border-brand-bg bg-white flex items-center justify-center shadow-soft"><P.Icon size={22} className="text-brand-ink"/></div>
        <div className="mt-2 text-[18px] font-bold">{P.key}</div>
        <div className="text-[11px] text-brand-mute">{P.label}</div>
      </div>

      <div className="px-6 mt-3 text-center text-[11px] text-brand-mute leading-[16px]">{P.intro}</div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[12px] font-bold mb-2">Example at {P.level}</div>
        <div className="bg-brand-bg/60 rounded-2xl rounded-bl-sm px-3 py-2 text-[11px] max-w-[78%]">{P.in}</div>
        {isOff ? (
          <>
            <div className="my-3 flex items-center gap-2"><div className="flex-1 h-px bg-brand-bg"/><div className="text-[10px] text-brand-mute flex items-center gap-1"><Sparkles size={10}/> AI is off</div><div className="flex-1 h-px bg-brand-bg"/></div>
            <div className="bg-white border border-brand-bg rounded-2xl p-3 text-[11px] text-brand-mute leading-[15px]">
              {P.out.map((l, j) => <div key={j} className={j === 0 ? "font-bold text-brand-ink" : "mt-1"}>{l}</div>)}
            </div>
          </>
        ) : (
          <div className="mt-2 ml-auto bg-white border border-brand-purple/20 rounded-2xl rounded-br-sm px-3 py-2 text-[11px] max-w-[85%]">
            {P.out.map((l, j) => <div key={j} className={j === 0 ? "" : "mt-1"}>{l}</div>)}
            <div className="text-[9px] text-brand-purple mt-1.5">{P.cap}</div>
          </div>
        )}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {P.buttons.map((b, i) => (
            <button key={b} className={`py-2 rounded-xl text-[11px] font-bold ${i === 0 ? "bg-white border border-brand-bg" : "bg-white border border-brand-bg"}`}>{b}</button>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-3.5 shadow-soft border border-white">
        <div className="text-[12px] font-bold mb-2">Boundary summary</div>
        {P.summary.map((s) => (
          <div key={s.t} className="py-1.5 flex items-center gap-2.5">
            {s.ok ? <CheckCircle2 size={14} className="text-brand-purple"/> : <XCircle size={14} className="text-brand-mute"/>}
            <div className="text-[11px]">{s.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function F68_WhyStrangers() { return <WhyThisLevel active={0}/>; }
export function F69_WhyFriends() { return <WhyThisLevel active={1}/>; }
export function F70_WhyClose() { return <WhyThisLevel active={2}/>; }
