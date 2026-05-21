import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, CheckCircle2, Calendar, FlaskConical, Users, MessageSquare, Bookmark, Lock, ChevronRight, Bot } from "lucide-react";

export function F11_WarmupComplete() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[14px] font-bold">Connections</div>
        <div className="px-2.5 py-1 rounded-full gradient-brand text-white text-[10px] flex items-center gap-1 shadow-soft">
          <ShieldCheck size={10}/> Approved only
        </div>
      </div>

      <div className="px-5 mt-5">
        <h1 className="text-[20px] font-bold leading-[26px]"><span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">AI Warm-up</span> Complete</h1>
        <p className="text-[12px] text-brand-mute leading-[18px] mt-2">Your Second Self started a low-risk warm-up with Jim AI and found a safe opening.</p>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-purple font-bold">
          <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-brand-mint"/> Ready for you
        </div>
      </div>

      <div className="mx-5 mt-4 bg-white rounded-2xl p-4 relative shadow-soft border border-brand-bg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[12px] font-bold"><Users size={13} className="text-brand-purple"/> Warm-up Path</div>
          <div className="px-2 py-0.5 rounded-md gradient-brand-soft text-[9px] font-bold text-brand-purple">Review required</div>
        </div>
        <div className="mt-4 flex items-center justify-between relative">
          <PathBot label="Your Second Self" gradient="gradient-brand"/>
          <div className="flex-1 flex items-center justify-center gap-1">
            {[...Array(7)].map((_, i) => (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-lavender" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}/>
            ))}
          </div>
          <PathBot label="Jim AI" gradient="gradient-pink-peach"/>
        </div>
        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute top-[58px] left-1/2 -translate-x-1/2 w-[62%] bg-white rounded-xl p-2.5 shadow-soft border border-brand-mint/40">
          <div className="flex items-start gap-1.5">
            <CheckCircle2 size={12} className="mt-0.5 text-brand-mint"/>
            <div>
              <div className="text-[11px] font-bold">Warm-up successful</div>
              <div className="text-[9px] text-brand-mute">Shared interest found: Hiking</div>
            </div>
          </div>
        </motion.div>
        <div className="mt-4 flex justify-center gap-2">
          <Pill icon={<ShieldCheck size={10} className="text-brand-purple"/>}>approved context</Pill>
          <Pill icon={<Lock size={10} className="text-brand-mint"/>}>safe opening</Pill>
        </div>
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Match Signals</div>
      <div className="px-5 mt-2 grid grid-cols-3 gap-2">
        {[
          { Icon: Calendar, t: "Time Gap", d: "No chat for 2 weeks", g: "from-brand-sky to-brand-mint" },
          { Icon: FlaskConical, t: "Shared Topic", d: "Outdoor weekend plan", g: "from-brand-pink to-brand-peach" },
          { Icon: Users, t: "Permission", d: "Friend level draft only", g: "from-brand-purple to-brand-lavender" },
        ].map(({ Icon, t, d, g }) => (
          <div key={t} className="bg-white rounded-2xl p-3 flex flex-col items-center text-center gap-1 shadow-soft">
            <div className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${g} flex items-center justify-center`}>
              <Icon size={16} strokeWidth={2} className="text-white"/>
            </div>
            <div className="text-[11px] font-bold mt-1">{t}</div>
            <div className="text-[8px] text-brand-mute leading-[11px]">{d}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5 text-[14px] font-bold">Approved Sources</div>
      <div className="mx-5 mt-2 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
        {[
          { Icon: MessageSquare, t: "Past chat: weekend plan", on: true },
          { Icon: Bookmark, t: "Memory: hiking", on: true },
          { Icon: Users, t: "Relationship: friend", on: true },
          { Icon: Lock, t: "Private data blocked", on: false },
        ].map(({ Icon, t, on }) => (
          <div key={t} className="px-3 py-3 flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${on ? "gradient-brand-soft" : "bg-brand-bg"}`}>
              <Icon size={14} strokeWidth={2} className={on ? "text-brand-purple" : "text-brand-mute"}/>
            </div>
            <div className={`flex-1 text-[12px] ${on ? "font-medium" : "italic text-brand-mute"}`}>{t}</div>
            {on ? (
              <div className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center">
                <CheckCircle2 size={12} className="text-white"/>
              </div>
            ) : <ChevronRight size={14} className="text-brand-mute"/>}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 glass border-t border-brand-bg">
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="w-full py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft">
          Review draft in Message
        </motion.button>
      </div>
    </div>
  );
}

function PathBot({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-soft`}>
        <Bot size={22} strokeWidth={2} className="text-white"/>
      </div>
      <div className="text-[8px] px-1.5 py-0.5 rounded bg-white shadow-sm">{label}</div>
    </div>
  );
}

function Pill({ icon, children }: any) {
  return <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[9px] flex items-center gap-1 font-medium">{icon}{children}</div>;
}
