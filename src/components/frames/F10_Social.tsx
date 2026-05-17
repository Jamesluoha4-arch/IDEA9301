import { motion } from "framer-motion";
import { Bell, Lock, CheckCircle2, Share2, Bot, Sparkles } from "lucide-react";
import { BottomNav } from "./F09_Home";

export function F10_Social() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-2">
        <h1 className="text-[24px] font-bold tracking-[-0.5px]">Social</h1>
        <div className="mt-4 flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-full gradient-brand text-white text-[12px] font-bold shadow-soft">Connections</button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-brand-bg text-[12px] font-bold">Spaces</button>
          <div className="ml-auto w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"><Bell size={15} className="text-brand-purple"/></div>
        </div>
      </div>

      <div className="px-5 mt-5 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-[18px] font-bold leading-[24px]">Your Second Self<br/><span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">is roaming</span></h2>
          <p className="text-[11px] text-brand-mute mt-1.5">Finding another AI persona<br/>through approved context</p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white border border-brand-bg text-[10px] flex items-center gap-1 mt-1 text-brand-purple font-bold">
          <CheckCircle2 size={10}/> Approved only
        </div>
      </div>

      {/* Radar */}
      <div className="mx-5 mt-4 h-[280px] rounded-3xl bg-white shadow-soft relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand-soft opacity-50"/>
        {[1, 0.7, 0.45, 0.22].map((s, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border-2 border-dashed border-brand-lavender/40"
            style={{ width: 240 * s, height: 240 * s, marginLeft: -120 * s, marginTop: -120 * s }}
            animate={{ opacity: [0.3, 0.8, 0.3], rotate: 360 }}
            transition={{ opacity: { duration: 3, repeat: Infinity, delay: i * 0.4 }, rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" } }}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center shadow-glow">
            <Bot size={20} className="text-white" strokeWidth={2}/>
          </motion.div>
          <div className="text-[9px] font-bold text-brand-purple">You</div>
        </div>

        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[50px] left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-white shadow border border-brand-mint/40 text-[9px] flex items-center gap-1 text-brand-ink font-medium">
          <CheckCircle2 size={9} className="text-brand-mint"/> memory ok
        </motion.div>
        <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 2.6, repeat: Infinity }} className="absolute top-[90px] right-3 px-2 py-1 rounded-lg bg-white border border-brand-purple/30 text-[9px] font-bold shadow">
          Alex AI
        </motion.div>
        <div className="absolute top-[125px] right-10 w-8 h-8 rounded-xl gradient-pink-peach flex items-center justify-center shadow">
          <Bot size={14} strokeWidth={2} className="text-white"/>
        </div>
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="absolute top-[160px] right-2 px-2 py-1 rounded-full bg-white border border-brand-pink/40 text-[9px] flex items-center gap-1 font-medium shadow">
          <Share2 size={9} className="text-brand-pink"/> shared topic
        </motion.div>
        <div className="absolute bottom-[50px] left-6 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-brand-mute flex items-center justify-center bg-white">
            <Lock size={11} className="text-brand-mute"/>
          </div>
          <div className="text-[8px] text-brand-mute mt-0.5">private locked</div>
        </div>

        {[
          { t: 30, l: 50, c: "from-brand-sky to-brand-mint" },
          { t: 70, l: 280, c: "from-brand-pink to-brand-peach" },
          { t: 200, l: 40, c: "from-brand-lavender to-brand-purple" },
          { t: 215, l: 320, c: "from-brand-mint to-brand-sky" },
          { t: 230, l: 200, c: "from-brand-peach to-brand-pink" },
        ].map((p, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity }} className={`absolute w-7 h-7 rounded-full bg-gradient-to-br ${p.c} flex items-center justify-center shadow opacity-70`} style={{ top: p.t, left: p.l }}>
            <Bot size={11} className="text-white"/>
          </motion.div>
        ))}
      </div>

      <div className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-brand-purple"/>
          <div className="text-[9px] tracking-[0.6px] text-brand-purple font-bold">PERSONA SIGNAL FOUND</div>
        </div>
        <div className="mt-1.5 text-[14px] font-bold">Alex AI · safe conversation opening</div>
        <div className="text-[11px] text-brand-mute mt-1">Draft ready · not sent</div>
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="mt-3 w-full py-3 rounded-full gradient-brand text-white text-[13px] font-bold shadow-soft">
          Review path
        </motion.button>
      </div>

      <BottomNav active="SOCIAL"/>
    </div>
  );
}
