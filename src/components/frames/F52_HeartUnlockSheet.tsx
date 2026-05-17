import { motion } from "framer-motion";
import { ArrowLeft, Heart, CheckCircle2 } from "lucide-react";

export function F52_HeartUnlockSheet() {
  return (
    <div className="relative w-full h-full pt-12 overflow-hidden font-sans text-brand-ink gradient-brand-soft">
      <div className="opacity-40 px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
        <div className="w-5"/>
      </div>
      <div className="opacity-40 px-4 mt-2 space-y-3">
        <div className="bg-white rounded-2xl h-14"/>
        <div className="bg-white rounded-2xl h-14"/>
        <div className="bg-white rounded-3xl h-24"/>
        <div className="grid grid-cols-4 gap-2">
          {[0,1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20"/>)}
        </div>
      </div>

      <div className="absolute inset-0 bg-brand-ink/25 backdrop-blur-[1px]"/>

      <motion.div initial={{ y: 500 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 24 }} className="absolute bottom-0 inset-x-0 bg-white rounded-t-[28px] p-6 pb-8 shadow-[0_-10px_40px_rgba(31,31,46,0.25)]">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-brand-bg mb-4"/>
        <div className="flex flex-col items-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="w-28 h-28 rounded-full border-2 border-dashed border-brand-pink/50 flex items-center justify-center relative">
            <Heart size={14} className="text-brand-pink absolute top-1 left-3 fill-brand-pink"/>
            <Heart size={14} className="text-brand-pink absolute top-2 right-2 fill-brand-pink"/>
            <Heart size={14} className="text-brand-pink absolute bottom-3 right-4 fill-brand-pink"/>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-2xl gradient-pink-peach flex items-center justify-center shadow-glow">
              <div className="text-2xl">🤖</div>
            </motion.div>
          </motion.div>
          <div className="text-[22px] font-bold mt-3">Heart Halo</div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-ink text-white text-[10px] font-bold mt-1">
            <CheckCircle2 size={11}/> Owned
          </div>
          <div className="text-[12px] text-brand-mute mt-3 text-center">A soft frame for close and warm moments.</div>
        </div>
        <button className="w-full mt-5 py-3.5 rounded-2xl gradient-brand text-white text-[14px] font-bold shadow-glow">Apply Frame</button>
        <button className="w-full mt-2 py-3.5 rounded-2xl bg-white border border-brand-bg text-[14px] font-bold">Cancel</button>
      </motion.div>
    </div>
  );
}
