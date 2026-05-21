import { X, MoreHorizontal, Edit3, CheckCircle2, ArrowUp, EyeOff, TrendingUp, ChevronRight } from "lucide-react";

export function F74_ChangeDetailDraft() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <X size={18} className="text-brand-ink"/>
        <div className="flex-1 flex justify-center"><div className="w-10 h-1 rounded-full bg-brand-bg"/></div>
        <MoreHorizontal size={18} className="text-brand-ink"/>
      </div>

      <div className="px-5 mt-3 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl gradient-brand-soft flex items-center justify-center"><Edit3 size={16} className="text-brand-purple"/></div>
        <div>
          <div className="text-[15px] font-bold">You drafted a reply</div>
          <div className="text-[10px] text-brand-mute mt-0.5">11:32 AM 路 AI level: Draft</div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="text-[13px] font-bold">What happened?</div>
        <div className="mt-3 h-32 rounded-2xl bg-brand-bg/40 flex items-center justify-center gradient-brand-soft border border-white">
          <div className="text-center text-[11px] text-brand-mute italic">
            <div className="flex gap-6 justify-center text-[20px]">馃挰 馃挰</div>
            <div className="mt-2 text-brand-ink">Conversation insight</div>
          </div>
        </div>
        <div className="mt-3 bg-brand-bg/50 rounded-2xl p-3 text-[11px] text-center">You used AI to help draft a reply before sending.</div>
      </div>

      <div className="px-5 mt-5">
        <div className="text-[13px] font-bold mb-2">Why did this happen?</div>
        <div className="flex flex-wrap gap-2">
          {["Saved me time", "AI understood better", "Historic pattern"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 rounded-full text-[11px] font-bold ${i === 1 ? "bg-brand-ink text-white" : "bg-white border border-brand-bg"}`}>{t}</button>
          ))}
          <button className="px-3 py-1.5 rounded-full bg-white border border-brand-bg text-[11px] font-bold">路路路</button>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="text-[13px] font-bold mb-2">Your choice</div>
        <div className="space-y-2">
          {[
            { Icon: Edit3, t: "Edited before sending", sel: true },
            { Icon: ArrowUp, t: "Sent without editing" },
            { Icon: EyeOff, t: "Ignored AI suggestion" },
          ].map(({ Icon, t, sel }) => (
            <div key={t} className={`px-3 py-2.5 rounded-2xl flex items-center gap-3 ${sel ? "bg-white border-2 border-brand-purple shadow-soft" : "bg-white border border-brand-bg"}`}>
              <Icon size={14} className="text-brand-ink"/>
              <div className="text-[12px] flex-1">{t}</div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${sel ? "border-brand-purple" : "border-brand-bg"}`}>
                {sel && <CheckCircle2 size={13} className="text-brand-purple"/>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="text-[13px] font-bold mb-2">Impact</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-brand-bg rounded-2xl p-3">
            <div className="text-[9px] font-bold tracking-wider text-brand-mute">ON RELATIONSHIP</div>
            <div className="mt-2 flex items-center justify-between"><div className="text-[13px] font-bold">Neutral</div><Bars value={2}/></div>
          </div>
          <div className="bg-white border border-brand-bg rounded-2xl p-3">
            <div className="text-[9px] font-bold tracking-wider text-brand-mute">ON AI INVOLVEMENT</div>
            <div className="mt-2 flex items-center justify-between"><div className="text-[13px] font-bold">Slightly up</div><Bars value={3}/></div>
          </div>
        </div>
      </div>

      <button className="mx-5 mt-5 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">Adjust AI Boundary</button>
      <button className="mx-5 mt-2 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold flex items-center justify-center gap-1">View AI Trail <ChevronRight size={13}/></button>
    </div>
  );
}

function Bars({ value }: { value: number }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`w-1 rounded-sm ${i <= value ? "gradient-brand" : "bg-brand-bg"}`} style={{ height: `${i * 3 + 4}px` }}/>
      ))}
    </div>
  );
}
