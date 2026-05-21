import { ArrowLeft, Ban, Edit3, Lightbulb, Wand2 } from "lucide-react";

const levels = [
  { title: "Off", Icon: Ban, body: "AI stays quiet unless you ask." },
  { title: "Suggest", Icon: Lightbulb, body: "AI suggests ideas, but you write." },
  { title: "Draft", Icon: Edit3, body: "AI drafts replies that you approve." },
  { title: "Act", Icon: Wand2, body: "AI can act within clear boundaries." },
] as const;

function InfluenceLevel({ active }: { active: number }) {
  const current = levels[active];
  return (
    <div className="relative h-full w-full overflow-y-auto bg-white px-5 pb-12 pt-12 font-sans text-brand-ink">
      <div className="flex items-center gap-3 py-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">AI Influence Level</div>
        <div className="w-5" />
      </div>
      <div className="rounded-3xl border border-brand-bg bg-white p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand shadow-glow">
            <current.Icon size={22} className="text-white" />
          </div>
          <div>
            <div className="text-[22px] font-bold">{current.title}</div>
            <div className="text-[11px] text-brand-mute">{current.body}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {levels.map((level, index) => (
          <div
            key={level.title}
            className={`rounded-2xl border p-4 ${index === active ? "border-brand-purple bg-brand-bg" : "border-brand-bg bg-white"}`}
          >
            <div className="flex items-center gap-3">
              <level.Icon size={18} className="text-brand-purple" />
              <div>
                <div className="text-[13px] font-bold">{level.title}</div>
                <div className="text-[10px] text-brand-mute">{level.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function F64_InfluenceOff() {
  return <InfluenceLevel active={0} />;
}
export function F65_InfluenceSuggest() {
  return <InfluenceLevel active={1} />;
}
export function F66_InfluenceDraft() {
  return <InfluenceLevel active={2} />;
}
export function F67_InfluenceAct() {
  return <InfluenceLevel active={3} />;
}
