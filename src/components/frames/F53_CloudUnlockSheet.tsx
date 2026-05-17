import { motion } from "framer-motion";
import { ArrowLeft, User, Star } from "lucide-react";

export function F53_CloudUnlockSheet() {
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
        <div className="bg-white rounded-3xl h-20"/>
        <div className="grid grid-cols-4 gap-2">{[0,1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-20"/>)}</div>
      </div>

      <div className="absolute inset-0 bg-brand-ink/25"/>

      <motion.div initial={{ y: 500 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 24 }} className="absolute bottom-0 inset-x-0 bg-white rounded-t-[28px] p-5 pb-8 shadow-[0_-10px_40px_rgba(31,31,46,0.25)]">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-brand-bg mb-4"/>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-3xl border border-brand-bg flex items-center justify-center bg-white">
            <User size={36} className="text-brand-mute"/>
          </div>
          <div className="flex-1">
            <div className="text-[22px] font-bold leading-tight">Cloud Float</div>
            <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-bg text-[11px] font-bold text-brand-purple">
              <Star size={11} className="text-brand-peach"/> 80 pts
            </div>
            <div className="text-[11px] text-brand-mute mt-2">You have 180 pts available.</div>
          </div>
        </div>
        <div className="mt-4 h-px bg-brand-bg"/>
        <div className="text-[12px] mt-3">A playful frame unlocked with points.</div>
        <button className="w-full mt-4 py-3.5 rounded-2xl bg-brand-ink text-white text-[14px] font-bold">Unlock and Apply</button>
        <button className="w-full mt-2 py-3.5 rounded-2xl bg-white border border-brand-bg text-[14px] font-bold">Cancel</button>
        <div className="text-center text-[10px] text-brand-mute mt-3">ⓘ After unlocking, this frame will move to Owned.</div>
      </motion.div>
    </div>
  );
}
