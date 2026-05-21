import { ArrowLeft, Flame, Calendar, Star, Check, Info, ChevronRight } from "lucide-react";

const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const states = ["done","done","recovered","done","todo","todo","todo"] as const;

export function F40_ChallengeHistory() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Challenge History</div>
        <div className="w-5"/>
      </div>

      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        <Stat icon={<Flame size={14}/>} g="gradient-pink-peach" t="Current streak" v="3 days" active/>
        <Stat icon={<Calendar size={14}/>} g="gradient-mint-sky" t="This week" v="5 / 7 done"/>
        <Stat icon={<Star size={14}/>} g="gradient-brand" t="Challenge points" v="+85 pts"/>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-bold">This Week</div>
          <Calendar size={14} className="text-brand-purple"/>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
          {days.map((d, i) => (
            <div key={d} className="flex flex-col items-center gap-1">
              <div className="text-[9px] font-bold text-brand-mute">{d}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] ${
                states[i] === "done" ? "gradient-brand text-white" :
                states[i] === "recovered" ? "gradient-pink-peach text-white" :
                "border-2 border-brand-bg text-brand-mute"
              }`}>
                {states[i] === "done" && <Check size={12}/>}
                {states[i] === "recovered" && <Star size={11}/>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-brand-bg flex items-center justify-around text-[10px]">
          <Legend g="gradient-brand" t="Completed"/>
          <Legend g="bg-brand-bg" t="Missed"/>
          <Legend g="gradient-pink-peach" t="Recovered" star/>
        </div>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-white">
        <div className="text-[13px] font-bold mb-2">Recent Days</div>
        <div className="divide-y divide-brand-bg">
          <Day g="gradient-brand" Icon={Check} t="Today" d="2 / 3 completed"/>
          <Day g="bg-brand-bg" Icon={Check} t="Yesterday" d="All done"/>
          <Day g="gradient-pink-peach" Icon={Star} t="Mon" d="Reflection saved"/>
          <Day g="bg-brand-bg" Icon={Check} t="Sun" d="Missed" muted/>
          <Day g="bg-brand-bg" Icon={Check} t="Sun" d="Missed" muted/>
        </div>
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
          <div className="w-8 h-8 rounded-full gradient-brand-soft flex items-center justify-center"><Info size={13} className="text-brand-purple"/></div>
          <div className="flex-1">
            <div className="text-[12px] font-bold">How it helps</div>
            <div className="text-[10px] text-brand-mute leading-[14px]">Tracking your streak can help you return and stay aware of your AI boundaries.</div>
          </div>
        </div>
      ))}

      <button className="mx-4 mt-4 w-[calc(100%-2rem)] py-3.5 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft">Back to Daily Challenge</button>
    </div>
  );
}

function Stat({ icon, g, t, v, active }: { icon: any; g: string; t: string; v: string; active?: boolean }) {
  return (
    <div className={`rounded-2xl p-3 ${active ? "bg-white border-2 border-brand-purple" : "bg-white border border-white"} shadow-soft`}>
      <div className={`w-7 h-7 rounded-lg ${g} flex items-center justify-center text-white`}>{icon}</div>
      <div className="text-[10px] text-brand-mute mt-2">{t}</div>
      <div className="text-[13px] font-bold mt-0.5">{v}</div>
    </div>
  );
}

function Legend({ g, t, star }: { g: string; t: string; star?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${g}`}>{star && <Star size={8} className="text-white"/>}</div>
      <span className="text-brand-mute">{t}</span>
    </div>
  );
}

function Day({ g, Icon, t, d, muted }: { g: string; Icon: any; t: string; d: string; muted?: boolean }) {
  return (
    <div className="py-2.5 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-full ${g} flex items-center justify-center`}>
        <Icon size={14} className={muted ? "text-brand-mute" : "text-white"}/>
      </div>
      <div className="flex-1">
        <div className="text-[12px] font-bold">{t}</div>
        <div className="text-[10px] text-brand-mute">{d}</div>
      </div>
      <ChevronRight size={14} className="text-brand-mute"/>
    </div>
  );
}
