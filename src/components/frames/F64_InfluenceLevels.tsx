import { ArrowLeft, Info, Ban, Lightbulb, Edit3, Wand2, CheckCircle2, XCircle, User, Shield, AlertTriangle, ChevronRight } from "lucide-react";

const LEVELS = [
  { key: "Off", Icon: Ban, summary: "AI stays silent unless you ask directly.", hint: "AI stays silent until you ask.", can: ["Respond only when manually triggered"], cannot: ["Suggest conversation topics", "Draft replies", "Start conversations on its own", "Act on your behalf"], control: "You write and send every message.", best: "Full control and privacy." },
  { key: "Suggest", Icon: Lightbulb, summary: "AI can suggest ideas and replies, but won't write for you.", hint: "AI suggests ideas, but you write and send.", can: ["Suggest conversation topics", "Suggest replies"], cannot: ["Draft full replies", "Start conversations on its own", "Act on your behalf"], control: "You write and send every message.", best: "Getting inspiration while keeping full control." },
  { key: "Draft", Icon: Edit3, summary: "AI can draft replies for you, but you review and send.", hint: "AI drafts replies for you, but you review and send.", can: ["Draft full replies"], cannot: ["Suggest conversation topics", "Start conversations on its own", "Act on your behalf"], control: "You review and send every message.", best: "Saving time on writing while keeping full control." },
  { key: "Act", Icon: Wand2, summary: "AI can act on your behalf, within the boundaries you set.", hint: "AI can act on your behalf, within the boundaries you set.", can: ["Suggest conversation topics", "Draft and send replies", "Start conversations on its own", "Act on your behalf"], cannot: ["Go beyond the boundaries you set"], control: "You set boundaries and can review AI's actions.", best: "Maximum convenience with boundaries and oversight." },
] as const;

const COMPARE = [
  { row: "Suggest topics", v: [false, true, true, true] },
  { row: "Draft replies", v: [false, false, true, true] },
  { row: "Start conversations", v: [false, false, false, true] },
  { row: "Act on your behalf", v: [false, false, false, true] },
];

export function InfluenceLevel({ active }: { active: 0 | 1 | 2 | 3 }) {
  const L = LEVELS[active];
  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">AI Influence Level</div>
        <Info size={16} className="text-brand-purple" />
      </div>

      <div className="px-6 mt-2 text-[11px] text-center text-brand-mute leading-[15px]">
        Choose how much influence AI has in your conversations. You can change this anytime.
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-white flex items-center gap-3">
        <div className="flex-1">
          <div className="text-[10px] font-bold tracking-wider text-brand-mute">CURRENT SETTING</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-[22px] font-bold">{L.key}</div>
            <div className="px-2 py-0.5 rounded-full gradient-brand text-white text-[9px] font-bold">CURRENT</div>
          </div>
          <div className="text-[11px] text-brand-mute leading-[15px] mt-1">{L.summary}</div>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-brand-bg flex items-center justify-center">
          <L.Icon size={20} className="text-brand-ink" />
        </div>
      </div>

      <div className="mx-4 mt-4 flex items-center justify-around">
        {LEVELS.map((it, i) => (
          <button key={it.key} className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === active ? "gradient-brand shadow-glow" : "bg-white border border-brand-bg"}`}>
              <it.Icon size={16} className={i === active ? "text-white" : "text-brand-ink"} />
            </div>
            <div className={`text-[10px] font-bold ${i === active ? "text-brand-purple" : "text-brand-mute"}`}>{it.key}</div>
          </button>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white/70 rounded-2xl p-2.5 flex items-center gap-2 border border-white">
        <Info size={12} className="text-brand-mute" />
        <div className="text-[11px] text-brand-mute">{L.hint}</div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-white space-y-3">
        <div className="text-[13px] font-bold">About {L.key} level</div>
        <Section Icon={CheckCircle2} g="text-brand-purple" t="AI can:" items={L.can} />
        <div className="h-px bg-brand-bg" />
        <Section Icon={XCircle} g="text-brand-mute" t="AI cannot:" items={L.cannot} />
        <div className="h-px bg-brand-bg" />
        <Section Icon={User} g="text-brand-peach" t="You stay in control:" items={[L.control]} />
        <div className="h-px bg-brand-bg" />
        <Section Icon={Shield} g="text-brand-purple" t="Best for:" items={[L.best]} />
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl shadow-soft border border-white overflow-hidden">
        <div className="grid grid-cols-5 px-3 py-2 text-[10px] text-brand-mute border-b border-brand-bg">
          <div className="font-bold text-brand-ink">Compare Levels</div>
          {LEVELS.map((it, i) => (
            <div key={it.key} className={`text-center font-bold ${i === active ? "text-brand-purple" : ""}`}>
              <it.Icon size={11} className="inline" /><div className="text-[8px] uppercase mt-0.5">{it.key}</div>
            </div>
          ))}
        </div>
        {COMPARE.map((r) => (
          <div key={r.row} className="grid grid-cols-5 px-3 py-2 text-[10px] border-b border-brand-bg last:border-0">
            <div className="font-bold">{r.row}</div>
            {r.v.map((ok, i) => (
              <div key={i} className={`text-center ${i === active ? "bg-brand-bg/50 rounded" : ""}`}>
                {ok ? <span className="text-brand-purple">✓</span> : <span className="text-brand-mute">×</span>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl bg-brand-peach/20 flex items-center justify-center"><AlertTriangle size={14} className="text-brand-peach" /></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Boundary Reminder</div>
          <div className="text-[10px] text-brand-mute">Even at higher levels, AI will not act in these contexts.</div>
        </div>
        <button className="px-2.5 py-1.5 rounded-full bg-white border border-brand-bg text-[10px] font-bold flex items-center gap-1">View contexts <ChevronRight size={11}/></button>
      </div>
    </div>
  );
}

function Section({ Icon, g, t, items }: { Icon: any; g: string; t: string; items: readonly string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2"><Icon size={14} className={g}/><div className="text-[12px] font-bold">{t}</div></div>
      <div className="mt-1.5 pl-6 space-y-1">
        {items.map((i) => <div key={i} className="text-[11px] text-brand-mute leading-[15px]">{i}</div>)}
      </div>
    </div>
  );
}

export function F64_InfluenceOff() { return <InfluenceLevel active={0} />; }
export function F65_InfluenceSuggest() { return <InfluenceLevel active={1} />; }
export function F66_InfluenceDraft() { return <InfluenceLevel active={2} />; }
export function F67_InfluenceAct() { return <InfluenceLevel active={3} />; }
