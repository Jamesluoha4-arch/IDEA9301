import { useState } from "react";
import { ArrowLeft, Bot, ShieldAlert, CheckCircle2 } from "lucide-react";

const reasons = ["Too busy", "Not relevant today", "Need clearer guidance", "Wanted more control"];
const tomorrow = ["Show a simpler task", "Keep a similar challenge", "Remind me earlier"];

export function F44_QuickReflection() {
  const [reason, setReason] = useState("Need clearer guidance");
  const [plan, setPlan] = useState("Show a simpler task");

  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">Quick Reflection</div>
        <div className="w-5" />
      </div>

      <div className="mt-2 flex justify-center">
        <div className="px-3 py-1.5 rounded-full bg-white border border-brand-bg text-[11px] font-bold text-brand-purple shadow-soft">
          1 / 3 completed
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl gradient-pink-peach flex items-center justify-center shadow-glow">
          <Bot size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-bold">You didn't finish today's challenge</div>
          <div className="text-[10px] text-brand-mute leading-[14px] mt-1">
            A short reflection can protect your streak once this week.
          </div>
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-peach/20 text-brand-peach text-[9px] font-bold">
            <ShieldAlert size={9} /> 3-DAY STREAK AT RISK
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Why didn't you finish?</div>
      <div className="mx-4 mt-2 grid grid-cols-2 gap-2">
        {reasons.map((r) => (
          <button
            key={r}
            onClick={() => setReason(r)}
            className={`p-3 rounded-2xl text-left shadow-soft transition-all ${reason === r ? "gradient-brand text-white" : "bg-white border border-white"}`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 mb-2 flex items-center justify-center ${reason === r ? "border-white bg-white/30" : "border-brand-bg"}`}
            >
              {reason === r && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div className="text-[11px] font-bold leading-[14px]">{r}</div>
          </button>
        ))}
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">What should happen tomorrow?</div>
      <div className="mx-4 mt-2 space-y-2">
        {tomorrow.map((t) => (
          <button
            key={t}
            onClick={() => setPlan(t)}
            className={`w-full p-3 rounded-2xl flex items-center gap-2.5 shadow-soft text-left transition-all ${plan === t ? "bg-white border-2 border-brand-purple" : "bg-white border border-white"}`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${plan === t ? "border-brand-purple" : "border-brand-bg"}`}
            >
              {plan === t && <div className="w-2 h-2 rounded-full gradient-brand" />}
            </div>
            <span className="text-[12px]">{t}</span>
          </button>
        ))}
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Optional note</div>
      <div className="mx-4 mt-2 bg-white rounded-2xl p-3 shadow-soft border border-white">
        <textarea
          placeholder="Write a quick reflection..."
          className="w-full text-[12px] outline-none resize-none h-16 placeholder:text-brand-mute"
        />
        <div className="text-right text-[9px] text-brand-mute">0 / 200</div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl gradient-mint-sky flex items-center justify-center">
          <CheckCircle2 size={15} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Reflection outcome</div>
          <div className="text-[10px] text-brand-mute leading-[14px]">
            Submitting this reflection protects today's streak and helps improve tomorrow's
            challenge.
          </div>
        </div>
      </div>

      <button className="mx-4 mt-3 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">
        Submit Reflection
      </button>
      <button className="mx-4 mt-2 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-white border border-brand-bg text-[13px] font-bold">
        Back to Challenge
      </button>
    </div>
  );
}
