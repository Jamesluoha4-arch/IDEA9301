import { motion } from "framer-motion";
import { ArrowLeft, Gift, Sparkles, Star, Box, CheckCircle2, Bot, Hand, ChevronRight } from "lucide-react";

const frames = [
  { t: "Star Glow", state: "Applied", Icon: Sparkles },
  { t: "Dot Circle", state: "Apply", Icon: () => <div className="w-7 h-7 rounded-full border-2 border-dashed border-brand-purple"/> },
  { t: "Heart Halo", state: "Apply", Icon: () => <span className="text-brand-pink text-lg">♡</span> },
  { t: "Leaf Wreath", state: "Apply", Icon: () => <span className="text-brand-mint text-lg">❀</span> },
  { t: "Sparkle Ring", state: "Apply", Icon: () => <div className="w-7 h-7 rounded-full border border-brand-purple"/> },
  { t: "Ribbon Bow", state: "Apply", Icon: () => <span className="text-lg">⏃</span> },
  { t: "Cloud Float", state: "80 pts", Icon: () => <span className="text-lg">☁</span>, locked: true },
  { t: "Geo Lines", state: "120 pts", Icon: () => <span className="text-lg">◇</span>, locked: true },
  { t: "Orbit Path", state: "120 pts", Icon: () => <span className="text-lg">◯</span>, locked: true },
  { t: "Double Heart", state: "150 pts", Icon: () => <span className="text-lg">♥</span>, locked: true },
  { t: "Sunburst", state: "150 pts", Icon: () => <span className="text-lg">✺</span>, locked: true },
  { t: "Diamond Cut", state: "180 pts", Icon: () => <span className="text-lg">◈</span>, locked: true },
];
const tabs = ["All", "Owned", "Locked", "New"];

export function F49_FrameShop() {
  return (
    <div className="relative w-full h-full pt-12 pb-12 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
        <div className="w-5"/>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-white">
        <div className="w-9 h-9 rounded-xl gradient-pink-peach flex items-center justify-center"><Gift size={15} className="text-white"/></div>
        <div className="flex-1">
          <div className="text-[12px] font-bold">More frames are coming soon</div>
          <div className="text-[10px] text-brand-mute">Our frame library is still growing.</div>
        </div>
        <Sparkles size={14} className="text-brand-purple"/>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-3 grid grid-cols-3 divide-x divide-brand-bg shadow-soft border border-white">
        <Stat Icon={Star} g="gradient-brand" v="180 pts" t="Available Points"/>
        <Stat Icon={Box} g="gradient-mint-sky" v="12 / 24" t="Frames Owned"/>
        <div className="text-center px-2">
          <div className="text-[10px] font-bold flex items-center justify-center gap-0.5">Points Guide <ChevronRight size={10}/></div>
          <div className="text-[8px] text-brand-mute leading-tight mt-1">CHALLENGES · DECISIONS<br/>REFLECTIONS · STREAKS</div>
        </div>
      </div>

      {/* Current frame preview */}
      <div className="mx-4 mt-3 bg-white rounded-3xl p-4 flex items-center gap-3 shadow-soft border border-white">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-dashed border-brand-lavender flex items-center justify-center shrink-0">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-glow">
            <Bot size={24} className="text-white"/>
          </motion.div>
        </motion.div>
        <div className="flex-1 text-right">
          <div className="text-[10px] text-brand-mute">Current frame</div>
          <div className="text-[18px] font-bold">Star Glow</div>
          <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-ink text-white text-[10px] font-bold">
            <CheckCircle2 size={11}/> Applied
          </div>
        </div>
      </div>
      <div className="text-center text-[10px] text-brand-mute mt-2">Tap any frame below to preview or apply.</div>

      <div className="mx-4 mt-3 flex gap-2">
        {tabs.map((t, i) => (
          <button key={t} className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold ${i === 0 ? "bg-brand-ink text-white" : "bg-white border border-brand-bg text-brand-ink"}`}>{t}</button>
        ))}
      </div>

      <div className="mx-4 mt-3 grid grid-cols-4 gap-2">
        {frames.map((f) => (
          <div key={f.t} className="bg-white rounded-2xl p-2 flex flex-col items-center shadow-soft border border-white">
            <div className={`w-12 h-12 rounded-full ${f.locked ? "bg-brand-bg/60" : "gradient-brand-soft"} flex items-center justify-center`}>
              <f.Icon/>
            </div>
            <div className="text-[9px] font-bold mt-1.5 text-center">{f.t}</div>
            <button className={`mt-1 w-full px-1 py-0.5 rounded-full text-[8px] font-bold flex items-center justify-center gap-0.5 ${
              f.state === "Applied" ? "bg-brand-ink text-white" :
              f.locked ? "bg-brand-bg text-brand-mute" : "bg-white border border-brand-bg text-brand-purple"
            }`}>
              {f.state === "Applied" && "✓"} {f.state}
            </button>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-3 bg-white rounded-2xl p-2.5 flex items-center gap-2 shadow-soft border border-white">
        <Hand size={13} className="text-brand-purple"/>
        <div className="flex-1 text-[11px] font-bold">Tap any frame to preview or apply.</div>
      </div>
      <div className="text-center text-[10px] text-brand-mute mt-2">More frames below ↓</div>
    </div>
  );
}

function Stat({ Icon, g, v, t }: { Icon: any; g: string; v: string; t: string }) {
  return (
    <div className="text-center px-2 flex flex-col items-center">
      <div className="flex items-center gap-1">
        <div className={`w-5 h-5 rounded-md ${g} flex items-center justify-center`}><Icon size={11} className="text-white"/></div>
        <span className="text-[12px] font-bold">{v}</span>
      </div>
      <div className="text-[9px] text-brand-mute mt-1">{t}</div>
    </div>
  );
}
