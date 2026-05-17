import { motion } from "framer-motion";
import { Bell, User, Database, Music, Cloud, Camera, Globe, Gamepad2, Bot, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { BottomNav } from "./F09_Home";

const nodes = [
  { Icon: User, label: "HUMAN_ENTITY", sub: "ID: 882-X9", t: 18, l: 240, g: "from-brand-purple to-brand-lavender", size: 44 },
  { Icon: Database, label: "REPOS", t: 80, l: 30, g: "from-brand-sky to-brand-mint", size: 38 },
  { Icon: Music, label: "MUSIC", t: 165, l: 5, g: "from-brand-pink to-brand-peach", size: 38 },
  { Icon: Cloud, label: "SYNC_ACTIVE", t: 215, l: 50, g: "from-brand-mint to-brand-sky", size: 32, faded: true },
  { Icon: Camera, label: "PHOTOGRAPHY", t: 130, l: 215, g: "from-brand-lavender to-brand-pink", size: 38 },
  { Icon: Globe, label: "DXFP_CORE", t: 165, l: 270, g: "from-brand-purple to-brand-sky", size: 36 },
  { Icon: Gamepad2, label: "GAMING", t: 280, l: 235, g: "from-brand-peach to-brand-pink", size: 38 },
  { Icon: Bot, label: "AI_SYNTH", sub: "LOAD: 12%", t: 310, l: 35, g: "from-brand-purple to-brand-pink", size: 44 },
];

export function F22_SpacesRadar() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 font-sans text-brand-ink gradient-brand-soft overflow-hidden">
      <div className="px-5 pt-2">
        <h1 className="text-[24px] font-bold tracking-[-0.5px]">Social</h1>
        <div className="mt-4 flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-full bg-white border border-brand-bg text-[12px] font-bold">Connections</button>
          <button className="px-4 py-1.5 rounded-full gradient-brand text-white text-[12px] font-bold shadow-soft">Spaces</button>
          <div className="ml-auto w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"><Bell size={15} className="text-brand-purple"/></div>
        </div>
      </div>

      <div className="mx-5 mt-3 px-3 py-1.5 rounded-full bg-white/70 border border-brand-purple/20 text-[9px] font-mono text-brand-purple tracking-[0.5px] flex items-center gap-2">
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-brand-mint"/>
        AI_TWIN_STATUS: SYNCHRONIZING_SPATIAL_NODES
      </div>

      {/* Radar canvas */}
      <div className="relative mt-2 mx-2 h-[400px]">
        {[1, 0.78, 0.55, 0.32].map((s, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-brand-lavender/40"
            style={{ width: 320 * s, height: 320 * s, marginLeft: -160 * s, marginTop: -160 * s }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Neural core center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-20 h-20 rounded-full bg-white shadow-glow flex items-center justify-center border-2 border-brand-lavender/30">
            <div className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center">
              <Sparkles size={22} className="text-white"/>
            </div>
          </motion.div>
          <div className="mt-2 px-3 py-1 rounded-full bg-brand-ink text-white text-[9px] font-bold flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-mint"/> NEURAL_CORE: ACTIVE
          </div>
        </div>

        {nodes.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: n.faded ? 0.6 : 1, scale: 1 }}
            transition={{ delay: 0.1 * i, type: "spring" }}
            className="absolute flex flex-col items-center"
            style={{ top: n.t, left: n.l }}
          >
            <div className="bg-white rounded-full p-0.5 shadow-soft">
              <div className={`rounded-full bg-gradient-to-br ${n.g} flex items-center justify-center`} style={{ width: n.size, height: n.size }}>
                <n.Icon size={n.size * 0.42} className="text-white" strokeWidth={2}/>
              </div>
            </div>
            <div className="mt-1 text-[8px] font-bold tracking-[0.4px] text-brand-ink">[{n.label}]</div>
            {n.sub && <div className="text-[7px] text-brand-mute font-mono">{n.sub}</div>}
          </motion.div>
        ))}

        {/* Compass float */}
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center">
          <Compass size={16} className="text-brand-purple"/>
        </motion.div>
      </div>

      <div className="mx-5 mt-1 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={11} className="text-brand-mint"/>
          <div className="text-[9px] tracking-[0.6px] text-brand-purple font-bold">SPACE SIGNAL FOUND</div>
        </div>
        <div className="mt-1 text-[14px] font-bold">AI Synth · safe space opening</div>
        <div className="text-[11px] text-brand-mute mt-0.5">Preview ready · not posted</div>
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="mt-3 w-full py-3 rounded-full gradient-brand text-white text-[13px] font-bold shadow-soft">
          Review path
        </motion.button>
      </div>

      <BottomNav active="SOCIAL"/>
    </div>
  );
}
