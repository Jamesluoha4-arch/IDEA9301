import { User, MessageCircle, Home, Compass, Fingerprint, Activity, ChevronRight } from "lucide-react";

export function F79_RelationshipSignals() {
  return (
    <div className="relative w-full h-full pt-12 pb-16 overflow-y-auto font-sans text-brand-ink bg-white">
      <div className="px-5 pt-4">
        <div className="text-[22px] font-bold leading-tight">Today's Relationship Signals</div>
        <div className="text-[11px] text-brand-mute mt-1.5">AI noticed 3 relationships may need attention.</div>
      </div>

      <Group label="HIGH PRIORITY" name="Sarah Jenkins" status="Needs response" sub="LAST MESSAGE 5H AGO"/>
      <Group label="MEDIUM PRIORITY" name="Alex Chen" status="Cooling down" sub="REPLY GAP INCREASED"/>
      <Group label="LOW PRIORITY" name="Marcus Lee" status="Active" sub="1 NEW SHARED MOMENT"/>

      <div className="px-5 mt-6 text-[14px] font-bold">What's happening today</div>
      <div className="mx-4 mt-2 bg-white border border-brand-bg rounded-2xl divide-y divide-brand-bg">
        {[
          { n: "3", t: "Drafts" },
          { n: "2", t: "Suggestions" },
          { n: "1", t: "Blocked action" },
        ].map((r) => (
          <div key={r.t} className="px-4 py-3 flex items-center gap-3">
            <div className="w-6 text-[10px] text-brand-mute font-bold">●</div>
            <div className="text-[14px] font-bold w-5">{r.n}</div>
            <div className="text-[12px] flex-1">{r.t}</div>
            <ChevronRight size={13} className="text-brand-mute"/>
          </div>
        ))}
      </div>

      <Tabbar/>
    </div>
  );
}

function Group({ label, name, status, sub }: { label: string; name: string; status: string; sub: string }) {
  return (
    <div className="mt-4">
      <div className="px-5 text-[10px] font-bold tracking-wider text-brand-mute">{label}</div>
      <div className="mx-4 mt-1.5 bg-white border border-brand-bg rounded-2xl p-3 flex items-center gap-3 shadow-soft">
        <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center"><User size={18} className="text-brand-mute"/></div>
        <div className="flex-1">
          <div className="text-[13px] font-bold">{name}</div>
          <div className="text-[11px] text-brand-mute">{status}</div>
          <div className="text-[9px] tracking-wider text-brand-mute mt-0.5">{sub}</div>
        </div>
        <MessageCircle size={16} className="text-brand-ink"/>
      </div>
    </div>
  );
}

function Tabbar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-bg px-3 py-2 flex justify-around">
      {[{Icon:Home,t:"Home",a:true},{Icon:Compass,t:"Discovery"},{Icon:Fingerprint,t:"Identity"},{Icon:Activity,t:"Insights"}].map(({Icon,t,a}) => (
        <div key={t} className={`flex flex-col items-center gap-0.5 ${a ? "text-brand-ink" : "text-brand-mute"}`}>
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${a ? "bg-brand-ink text-white" : ""}`}>
            <Icon size={13} className={a ? "text-white" : ""}/>
          </div>
          <span className="text-[9px] font-bold">{t}</span>
        </div>
      ))}
    </div>
  );
}
