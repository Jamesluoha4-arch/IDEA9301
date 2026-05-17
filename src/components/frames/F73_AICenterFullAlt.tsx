import { Settings, ChevronRight, Bot, Users, Heart, User, Plus, Mic, ImageIcon, Shield, ArrowRight } from "lucide-react";

export function F73_AICenterFullAlt() {
  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="text-[18px] font-bold">AI Control Center</div>
        <Settings size={18} className="text-brand-purple"/>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-10 h-10 rounded-xl gradient-brand-soft flex items-center justify-center"><Shield size={16} className="text-brand-purple"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Daily Challenge</div>
          <div className="text-[10px] text-brand-mute">Today's boundary task · 1 / 3 completed today</div>
        </div>
        <button className="px-3 py-1.5 rounded-full bg-brand-ink text-white text-[10px] font-bold">Continue</button>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-soft border border-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-wider text-brand-mute">CURRENT AI MODE</div>
            <div className="text-[22px] font-bold mt-0.5">Co-pilot</div>
            <div className="text-[10px] text-brand-mute leading-[14px] max-w-[180px] mt-0.5">AI can draft and suggest, but won't act without your approval.</div>
            <button className="mt-3 px-3 py-1.5 rounded-xl bg-brand-ink text-white text-[11px] font-bold">Change Mode</button>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center">
              <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center"><Bot size={16} className="text-white"/></div>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-brand-bg text-[9px] font-bold text-brand-purple">● ACTIVE</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-brand-bg flex items-center justify-between">
          <div className="text-[11px] font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full gradient-brand"/> Adaptive mode</div>
          <div className="w-10 h-5 rounded-full bg-brand-ink relative"><div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white"/></div>
        </div>
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Custom Mode</div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[12px] font-bold">AI Communication Influence Level</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">View details <ChevronRight size={11}/></button>
        </div>
        <div className="flex items-center justify-around">
          {["Off","Suggest","Draft","Act"].map((k, i) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${i === 2 ? "gradient-brand shadow-glow" : "bg-white border border-brand-bg"}`}>
                <Bot size={13} className={i === 2 ? "text-white" : "text-brand-ink"}/>
              </div>
              <div className={`text-[10px] font-bold ${i === 2 ? "text-brand-purple" : "text-brand-mute"}`}>{k}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[10px] text-brand-mute text-center">AI can draft replies for you, but won't send anything.</div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-bold">AI Permission</div>
          <button className="text-[10px] font-bold text-brand-purple flex items-center gap-0.5">Manage all <ChevronRight size={11}/></button>
        </div>
        {[
          { Icon: User, t: "Strangers", active: false },
          { Icon: Users, t: "Friends", active: true },
          { Icon: Heart, t: "Close Relationships", active: false },
        ].map(({ Icon, t, active }) => (
          <div key={t} className={`mt-1.5 px-3 py-2.5 rounded-2xl flex items-center gap-2.5 ${active ? "gradient-brand text-white" : "bg-white border border-brand-bg"}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${active ? "bg-white/20" : "bg-brand-bg"}`}><Icon size={12} className={active ? "text-white" : "text-brand-ink"}/></div>
            <div className="text-[12px] font-bold">{t}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Basic Shaping</div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-[11px] text-center font-bold mb-2">Complete Basic Info</div>
        {[
          { t: "Name", v: "Sabrina" },
          { t: "ID", v: "gakajo" },
          { t: "Personal intro", v: "+" },
        ].map((r) => (
          <div key={r.t} className="py-2.5 flex items-center gap-2 border-t border-brand-bg first:border-0">
            <div className="text-[11px] flex-1">{r.t}</div>
            <div className={`text-[11px] ${r.v === "+" ? "text-white w-5 h-5 rounded-full bg-brand-ink flex items-center justify-center" : "text-brand-mute"}`}>{r.v}</div>
            {r.v !== "+" && <ChevronRight size={12} className="text-brand-mute"/>}
          </div>
        ))}
      </div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-[11px] text-center font-bold mb-2">Set Your Image</div>
        <div className="flex items-center justify-center gap-2">
          <button className="px-3 py-1.5 rounded-full bg-brand-bg text-[10px] font-bold flex items-center gap-1"><ImageIcon size={11}/> Reshape avatar</button>
          <button className="w-7 h-7 rounded-full bg-brand-ink text-white flex items-center justify-center"><Plus size={13}/></button>
        </div>
      </div>

      <div className="mx-4 mt-2 bg-white rounded-2xl p-3.5 shadow-soft border border-white">
        <div className="text-[11px] text-center font-bold mb-2">Record Your Voice</div>
        {[ "Voice", "Voice self-introduction" ].map((t) => (
          <div key={t} className="py-2 flex items-center gap-2 border-t border-brand-bg first:border-0">
            <Mic size={12} className="text-brand-mute"/>
            <div className="text-[11px] flex-1">{t}</div>
            <button className="w-6 h-6 rounded-full bg-brand-ink text-white flex items-center justify-center"><Plus size={12}/></button>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl gradient-brand-soft flex items-center justify-center"><Shield size={14} className="text-brand-purple"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">Context Rules</div>
          <div className="text-[10px] text-brand-mute">Sensitive situations have extra AI limits.</div>
        </div>
        <ChevronRight size={13} className="text-brand-mute"/>
      </div>

      <button className="mx-4 mt-3 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft flex items-center justify-between px-4">
        <div className="text-left">
          <div>Quick Edit</div>
          <div className="text-[9px] font-normal text-white/70">Apply one level to multiple relationships</div>
        </div>
        <ArrowRight size={14}/>
      </button>
    </div>
  );
}
