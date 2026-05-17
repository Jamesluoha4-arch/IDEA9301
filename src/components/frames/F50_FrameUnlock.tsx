import { motion } from "framer-motion";
import { ArrowLeft, Star, Info } from "lucide-react";

export function F50_FrameUnlock() {
  return (
    <div className="relative w-full h-full pt-12 overflow-hidden font-sans text-brand-ink gradient-brand-soft">
      {/* Dimmed background */}
      <div className="px-5 pt-3 pb-2 flex items-center gap-3 opacity-40">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
        <div className="w-5"/>
      </div>
      <div className="opacity-40 px-4 mt-2 space-y-3">
        <div className="bg-white rounded-2xl p-3 h-14"/>
        <div className="bg-white rounded-2xl p-3 h-14"/>
        <div className="bg-white rounded-2xl p-4 h-24"/>
        <div className="grid grid-cols-4 gap-2">
          {[0,1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20"/>)}
        </div>
      </div>

      {/* Backdrop dim */}
      <div className="absolute inset-0 bg-brand-ink/30 backdrop-blur-[1px]"/>

      {/* Bottom sheet */}
      <motion.div initial={{ y: 400 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 25 }} className="absolute bottom-0 inset-x-0 bg-white rounded-t-[28px] p-5 pb-8 shadow-[0_-10px_40px_rgba(31,31,46,0.25)]">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-brand-bg mb-4"/>

        <div className="flex items-center gap-3">
          <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-20 h-20 rounded-2xl gradient-mint-sky flex items-center justify-center shadow-glow">
            <span className="text-3xl">☁</span>
          </motion.div>
          <div className="flex-1">
            <div className="text-[20px] font-bold">Cloud Float</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-bg text-[11px] font-bold text-brand-purple">
              <Star size={11} className="text-brand-peach"/> 80 pts
            </div>
            <div className="text-[11px] text-brand-mute mt-2">You have 180 pts available.</div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-2xl gradient-brand-soft border border-brand-lavender/30">
          <div className="text-[11px] text-brand-ink leading-[15px]">A playful frame unlocked with points.</div>
        </div>

        <button className="w-full mt-4 py-3.5 rounded-2xl gradient-brand text-white text-[14px] font-bold shadow-glow">Unlock and Apply</button>
        <button className="w-full mt-2 py-3.5 rounded-2xl bg-white border border-brand-bg text-[14px] font-bold">Cancel</button>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-brand-mute">
          <Info size={11}/> After unlocking, this frame will move to Owned.
        </div>
      </motion.div>
    </div>
  );
}
