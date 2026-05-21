import { useState } from "react";
import { ArrowLeft, Edit3, Sparkles, FileText, User } from "lucide-react";

export function F75_ReconnectChoose() {
  const [sel, setSel] = useState("Write myself");
  const options = [
    { Icon: Edit3, t: "Write myself", d: "I'll write the message without AI help." },
    { Icon: Sparkles, t: "AI suggest topic", d: "AI suggests a topic, I'll write myself." },
    { Icon: FileText, t: "Draft with AI", d: "AI drafts a message for my review." },
  ];

  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-3 flex items-center gap-3 border-b border-brand-bg">
        <ArrowLeft size={18} className="text-brand-ink"/>
        <div className="flex-1 text-center text-[15px] font-bold">Reconnect with Jim</div>
        <div className="w-5"/>
      </div>

      <div className="mx-4 mt-4 bg-white border border-brand-bg rounded-2xl p-3.5 flex items-center gap-3 shadow-soft">
        <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center"><User size={20} className="text-brand-mute"/></div>
        <div className="flex-1">
          <div className="text-[14px] font-bold">Jim Chen</div>
          <div className="text-[10px] text-brand-mute">Cooling down</div>
          <div className="text-[10px] text-brand-mute">Since May 2</div>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-white border border-brand-bg text-[10px] font-bold">View detail</button>
      </div>

      <div className="px-5 mt-6">
        <div className="text-[15px] font-bold">How would you like to reach out?</div>
        <div className="text-[11px] text-brand-mute mt-1">Choose the level of AI support you prefer.</div>
      </div>

      <div className="mx-4 mt-3 space-y-2.5">
        {options.map(({ Icon, t, d }) => (
          <button key={t} onClick={() => setSel(t)} className={`w-full p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all ${sel === t ? "bg-white border-2 border-brand-purple shadow-soft" : "bg-white border border-brand-bg"}`}>
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${sel === t ? "gradient-brand-soft" : "bg-brand-bg/60"}`}>
              <Icon size={16} className={sel === t ? "text-brand-purple" : "text-brand-ink"}/>
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold">{t}</div>
              <div className="text-[10px] text-brand-mute mt-0.5">{d}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-brand-bg bg-white grid grid-cols-2 gap-3">
        <button className="py-3 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">Back</button>
        <button className="py-3 rounded-2xl bg-brand-bg text-[13px] font-bold text-brand-mute">Continue</button>
      </div>
    </div>
  );
}
