import { ChevronLeft, Frown, Heart, CloudRain, MessageCircle, Shield } from "lucide-react";

const RULES = [
  { Icon: Frown, g: "gradient-brand-soft", title: "Conflict", sub: "Detected tension or disagreement", tag: "Human Only", desc: "AI won't suggest or draft. You stay in full control." },
  { Icon: Heart, g: "gradient-pink-peach", title: "Apology", sub: "When you are apologising or taking responsibility", tag: "Human Only", desc: "AI won't write apologies on your behalf. It may only help you reflect before you respond." },
  { Icon: CloudRain, g: "gradient-mint-sky", title: "Emotional Topics", sub: "Strong emotions or vulnerable moments detected", tag: "Suggest Only", desc: "AI can suggest supportive directions, but won't draft full replies." },
  { Icon: MessageCircle, g: "gradient-brand", title: "Casual Chat", sub: "Normal everyday conversation", tag: "Follow Setting", desc: "AI follows the permission level you set for each relationship." },
];

export function F71_ContextRules() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <button type="button" data-prototype-back="3:0" className="flex items-center">
          <ChevronLeft size={18} className="text-brand-purple"/>
        </button>
        <div className="flex-1 text-center text-[15px] font-bold">Context Rules</div>
        <div className="w-5"/>
      </div>
      <div className="px-6 mt-2 text-[11px] text-center text-brand-mute leading-[15px]">
        AI may reduce its actions in sensitive situations, even if a higher level is allowed.
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {RULES.map(({ Icon, g, title, sub, tag, desc }) => (
          <div key={title} className="bg-white rounded-3xl p-4 shadow-soft border border-white">
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-full ${g} flex items-center justify-center shrink-0`}>
                <Icon size={18} className="text-white"/>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[14px] font-bold">{title}</div>
                  <div className="px-2 py-0.5 rounded-full bg-white border border-brand-bg text-[9px] font-bold text-brand-ink">{tag}</div>
                </div>
                <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">{sub}</div>
              </div>
            </div>
            <div className="my-3 border-t border-dashed border-brand-bg"/>
            <div className="text-[11px] text-brand-mute leading-[16px]">{desc}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white/60 rounded-2xl p-3 flex items-start gap-3 border border-white">
        <div className="w-9 h-9 rounded-xl gradient-brand-soft flex items-center justify-center shrink-0"><Shield size={15} className="text-brand-purple"/></div>
        <div>
          <div className="text-[12px] font-bold">How it works</div>
          <div className="text-[10px] text-brand-mute leading-[14px] mt-0.5">AI checks relationship type and conversation context before acting. When a situation becomes sensitive, the system temporarily limits AI involvement to protect your control.</div>
        </div>
      </div>

      <button
        type="button"
        data-prototype-target="3:0"
        className="mx-4 mt-5 w-[calc(100%-2rem)] rounded-2xl gradient-brand py-3.5 text-[14px] font-bold text-white shadow-glow"
      >
        Got it
      </button>
    </div>
  );
}
