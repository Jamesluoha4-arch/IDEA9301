import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, CheckCircle2, Bot, Camera, Target, Heart, ShieldAlert, Bookmark, Image, MessageSquare, ShieldHalf, Lock, ChevronRight } from "lucide-react";

const sources = [
  { Icon: Bookmark, t: "Interest: photography" },
  { Icon: Image, t: "Memory: photo walk" },
  { Icon: MessageSquare, t: "Past chat: camera settings" },
  { Icon: ShieldHalf, t: "Space rules checked" },
  { Icon: Lock, t: "Private data blocked", muted: true },
];

export function F23_SpaceWarmupComplete() {
  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center justify-between glass border-b border-brand-bg">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="text-[14px] font-bold">Spaces</div>
        <div className="px-2.5 py-1 rounded-full bg-brand-ink text-white text-[10px] font-bold flex items-center gap-1">
          <ShieldCheck size={10}/> Approved only
        </div>
      </div>

      <div className="px-5 pt-5">
        <h1 className="text-[22px] font-bold leading-[26px]">Space Warm-up <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Complete</span></h1>
        <p className="text-[12px] text-brand-mute mt-1.5 leading-[16px]">Your Second Self explored this space and found a safe way to join.</p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-brand-mint">
          <CheckCircle2 size={12}/> Ready for you
        </div>
      </div>

      {/* Path card */}
      <motion.div whileHover={{ y: -2 }} className="mx-5 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-start justify-between">
          <div className="text-[16px] font-bold leading-[20px]">Space Warm-up<br/>Path</div>
          <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[9px] tracking-[0.5px] text-brand-purple font-bold">REVIEW REQUIRED</div>
        </div>

        <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 mx-auto w-[85%] rounded-2xl gradient-brand-soft p-3 border border-brand-mint/30 relative">
          <div className="text-[10px] font-bold flex items-center gap-1 text-brand-mint"><CheckCircle2 size={10}/> Safe entry found</div>
          <div className="text-[10px] mt-1 text-brand-ink leading-[13px]">Suggested way to join: Ask about architecture photography workflow</div>
        </motion.div>

        <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-dashed border-brand-mute flex items-center justify-center">
              <Bot size={16} className="text-brand-mute"/>
            </div>
            <div className="text-[8px] font-bold text-brand-mute text-center leading-[10px]">YOUR SECOND<br/>SELF</div>
          </div>
          <motion.div animate={{ scaleX: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity }} className="flex-1 mx-1 border-t-2 border-dashed border-brand-lavender"/>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center shadow-glow">
              <Camera size={16} className="text-white"/>
            </div>
            <div className="text-[8px] font-bold text-center leading-[10px]">PHOTOGRAPHY<br/>COMMUNITY</div>
          </div>
          <motion.div animate={{ scaleX: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="flex-1 mx-1 border-t-2 border-dashed border-brand-mint"/>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full gradient-mint-sky flex items-center justify-center shadow">
              <CheckCircle2 size={16} className="text-white"/>
            </div>
            <div className="text-[8px] font-bold text-brand-mint text-center leading-[10px]">SAFE ENTRY<br/>FOUND</div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-bg flex flex-wrap gap-1.5">
          <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[10px] font-medium flex items-center gap-1"><ShieldCheck size={10} className="text-brand-mint"/> approved context</div>
          <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[10px] font-medium flex items-center gap-1"><Camera size={10} className="text-brand-purple"/> read-only preview</div>
          <div className="px-2.5 py-1 rounded-full bg-brand-bg text-[10px] font-medium flex items-center gap-1"><Lock size={10} className="text-brand-mute"/> no post sent</div>
        </div>
      </motion.div>

      {/* Signals */}
      <div className="px-5 mt-5">
        <div className="text-[10px] tracking-[0.6px] font-bold text-brand-mute">SPACE SIGNALS</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { Icon: Target, t: "Topic Match", d: "Architecture 92% match", g: "from-brand-purple to-brand-lavender" },
            { Icon: Heart, t: "Community Tone", d: "Supportive Visual feedback", g: "from-brand-pink to-brand-peach" },
            { Icon: ShieldAlert, t: "Entry Safety", d: "Preview only · no auto post", g: "from-brand-mint to-brand-sky" },
          ].map((s) => (
            <div key={s.t} className="bg-white rounded-2xl p-2.5 shadow-soft text-center border border-brand-bg">
              <div className={`mx-auto w-9 h-9 rounded-xl bg-gradient-to-br ${s.g} flex items-center justify-center`}>
                <s.Icon size={15} className="text-white" strokeWidth={2}/>
              </div>
              <div className="text-[10px] font-bold mt-1.5">{s.t}</div>
              <div className="text-[8px] text-brand-mute leading-[10px] mt-0.5">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved sources */}
      <div className="px-5 mt-4">
        <div className="text-[10px] tracking-[0.6px] font-bold text-brand-mute">APPROVED SOURCES</div>
        <div className="mt-2 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
          {sources.map(({ Icon, t, muted }) => (
            <div key={t} className="px-3 py-2.5 flex items-center gap-2.5">
              <Icon size={14} className={muted ? "text-brand-mute" : "text-brand-purple"}/>
              <div className={`flex-1 text-[12px] ${muted ? "text-brand-mute" : "font-medium"}`}>{t}</div>
              {muted ? <ChevronRight size={14} className="text-brand-mute"/> : <CheckCircle2 size={14} className="text-brand-mint"/>}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5">
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="w-full py-3.5 rounded-full gradient-brand text-white text-[14px] font-bold shadow-soft">
          Preview community
        </motion.button>
      </div>
    </div>
  );
}
