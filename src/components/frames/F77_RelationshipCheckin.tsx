import { useState } from "react";
import { ChevronLeft, MoreHorizontal, Heart, User, Smile, Meh, Frown, AlertTriangle, Clock, Bell } from "lucide-react";

export function F77_RelationshipCheckin() {
  const [feeling, setFeeling] = useState("Becoming distant");
  const [step, setStep] = useState<string | null>(null);

  const feelings = [
    { Icon: Smile, t: "Still close" },
    { Icon: Frown, t: "Becoming distant" },
    { Icon: Meh, t: "Not sure" },
    { Icon: Meh, t: "Naturally quiet" },
  ];
  const steps = [
    { Icon: AlertTriangle, t: "Reconnect", d: "Send a personal message." },
    { Icon: Clock, t: "Maybe later", d: "Remind me in a few days." },
    { Icon: Bell, t: "Keep it quiet", d: "Pause reminders for now." },
  ];

  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ChevronLeft size={18} className="text-brand-ink"/>
        <div className="flex-1 text-center text-[15px] font-bold">Relationship Check-in</div>
        <MoreHorizontal size={18} className="text-brand-ink"/>
      </div>

      <div className="mx-4 mt-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center"><User size={20} className="text-brand-mute"/></div>
        <div className="flex-1">
          <div className="text-[16px] font-bold">Jim Chen</div>
          <div className="text-[10px] text-brand-mute flex items-center gap-1.5">Cooling down <span className="w-1 h-1 rounded-full bg-brand-mute"/> Since May 2</div>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-white border border-brand-bg text-[10px] font-bold">View detail</button>
      </div>

      <div className="mx-4 mt-3 bg-white border border-brand-bg rounded-2xl p-3 flex items-start gap-3">
        <Heart size={14} className="text-brand-ink mt-0.5"/>
        <div>
          <div className="text-[12px] font-bold">This relationship shows signs of cooling down.</div>
          <div className="text-[10px] text-brand-mute mt-0.5">A quick check helps you decide how to keep it healthy.</div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="text-[13px] font-bold">1. How do you feel about this relationship right now?</div>
        <div className="text-[10px] text-brand-mute mt-1">Choose the option that feels most accurate.</div>
      </div>
      <div className="mx-4 mt-2 grid grid-cols-4 gap-1.5">
        {feelings.map(({ Icon, t }) => (
          <button key={t} onClick={() => setFeeling(t)} className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 ${feeling === t ? "bg-white border-2 border-brand-purple shadow-soft" : "bg-white border border-brand-bg"}`}>
            <div className="w-9 h-9 rounded-full bg-brand-bg/60 flex items-center justify-center"><Icon size={14} className="text-brand-ink"/></div>
            <div className="text-[9px] font-bold text-center leading-[12px]">{t}</div>
          </button>
        ))}
      </div>

      <div className="px-5 mt-5">
        <div className="text-[13px] font-bold">2. What would you like to do?</div>
        <div className="text-[10px] text-brand-mute mt-1">Choose one next step.</div>
      </div>
      <div className="mx-4 mt-2 space-y-2">
        {steps.map(({ Icon, t, d }) => (
          <button key={t} onClick={() => setStep(t)} className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left ${step === t ? "bg-white border-2 border-brand-purple" : "bg-white border border-brand-bg"}`}>
            <Icon size={15} className="text-brand-ink"/>
            <div className="flex-1">
              <div className="text-[12px] font-bold">{t}</div>
              <div className="text-[10px] text-brand-mute">{d}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${step === t ? "border-brand-purple" : "border-brand-bg"}`}>
              {step === t && <div className="w-full h-full p-1"><div className="w-full h-full rounded-full gradient-brand"/></div>}
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 mt-5">
        <div className="text-[13px] font-bold">3. Anything you want AI to keep in mind?</div>
        <div className="text-[10px] text-brand-purple mt-0.5">Optional</div>
      </div>
      <div className="mx-4 mt-2 bg-white border border-brand-bg rounded-2xl p-3">
        <textarea placeholder="Write something..." className="w-full text-[12px] outline-none resize-none h-16 placeholder:text-brand-mute"/>
        <div className="text-right text-[9px] text-brand-mute">0/120</div>
      </div>

      <button className="mx-5 mt-4 w-[calc(100%-2.5rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold">Save Check-in</button>
      <div className="px-6 mt-2 text-center text-[10px] text-brand-mute">馃敀 Your choice is private and only used to support this relationship.</div>
    </div>
  );
}
