import { useState } from "react";
import { ArrowLeft, Info, Ban, Lightbulb, Edit3, Sparkles, Users, Heart, SlidersHorizontal, Check } from "lucide-react";

const LEVELS = [
  { key: "Off", Icon: Ban, desc: "AI will not participate unless invited." },
  { key: "Suggest", Icon: Lightbulb, desc: "AI can suggest topics and ideas." },
  { key: "Draft", Icon: Edit3, desc: "AI can draft replies for you." },
  { key: "Act", Icon: Sparkles, desc: "AI can act on your behalf." },
];

const TARGETS = [
  { key: "Strangers", Icon: Users, current: "Currently: Suggest only" },
  { key: "Friends", Icon: Users, current: "Currently: Draft replies" },
  { key: "Close Relationships", Icon: Heart, current: "Currently: Off" },
];

export function F72_QuickEdit() {
  const [level, setLevel] = useState("Draft");
  const [applied, setApplied] = useState<string[]>(["Strangers", "Friends", "Close Relationships"]);
  const toggle = (k: string) => setApplied((p) => p.includes(k) ? p.filter((x) => x !== k) : [...p, k]);

  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Quick Edit</div>
        <Info size={16} className="text-brand-purple"/>
      </div>
      <div className="px-6 mt-2 text-[11px] text-center text-brand-mute leading-[15px]">
        Set a default AI boundary level and apply it to one or more relationships.
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[13px] font-bold mb-2">1. Choose a default AI level</div>
        <div className="space-y-2">
          {LEVELS.map(({ key, Icon, desc }) => (
            <button key={key} onClick={() => setLevel(key)} className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${level === key ? "bg-white border-2 border-brand-purple shadow-soft" : "bg-white border border-brand-bg"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${level === key ? "border-brand-purple" : "border-brand-bg"}`}>
                {level === key && <div className="w-2 h-2 rounded-full gradient-brand"/>}
              </div>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${level === key ? "gradient-brand-soft" : "bg-brand-bg/60"}`}>
                <Icon size={14} className={level === key ? "text-brand-purple" : "text-brand-ink"}/>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><div className="text-[13px] font-bold">{key}</div>{level === key && <div className="px-1.5 py-0.5 rounded gradient-brand text-white text-[8px] font-bold">CURRENT</div>}</div>
                <div className="text-[10px] text-brand-mute">{desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 px-2 text-[10px] text-brand-mute">
          <Info size={12} className="mt-px shrink-0"/>
          Higher levels provide more help, but may reduce your authenticity and control.
        </div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="text-[13px] font-bold mb-2">2. Apply this level to</div>
        <div className="divide-y divide-brand-bg">
          {TARGETS.map(({ key, Icon, current }) => (
            <button key={key} onClick={() => toggle(key)} className="w-full py-2.5 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-brand-bg/60 flex items-center justify-center"><Icon size={14} className="text-brand-ink"/></div>
              <div className="flex-1">
                <div className="text-[12px] font-bold">{key}</div>
                <div className="text-[10px] text-brand-mute">{current}</div>
              </div>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${applied.includes(key) ? "bg-brand-ink" : "border border-brand-bg"}`}>
                {applied.includes(key) && <Check size={12} className="text-white"/>}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 p-2.5 bg-brand-bg/40 rounded-xl text-[10px] text-brand-mute">
          <SlidersHorizontal size={12} className="mt-px shrink-0"/>
          You can always customize each relationship separately after applying.
        </div>
      </div>

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">Apply Changes</button>
    </div>
  );
}
