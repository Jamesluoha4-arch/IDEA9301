import { motion } from "framer-motion";
import { ArrowLeft, Heart, CheckCircle2 } from "lucide-react";

export function F57_HeartPreviewSheet() {
  return (
    <div className="relative w-full h-full pt-12 overflow-hidden font-sans text-brand-ink gradient-brand-soft">
      <div className="opacity-30 px-5 pt-3 pb-2 flex items-center gap-3">
        <ArrowLeft size={18} className="text-brand-purple"/>
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
      </div>
      <div className="opacity-30 mx-4 mt-2 space-y-2">
        <div className="bg-white rounded-2xl h-12"/>
        <div className="bg-white rounded-2xl h-12"/>
        <div className="bg-white rounded-3xl h-20"/>
        <div className="grid grid-cols-4 gap-2">{[0,1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-16"/>)}</div>
      </div>

      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"/>

      <motion.div initial={{ y: 500 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 24 }} className="absolute bottom-0 inset-x-0 bg-white rounded-t-[28px] p-6 pb-8 shadow-[0_-10px_40px_rgba(31,31,46,0.2)]">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-brand-bg mb-4"/>

        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <Heart size={20} className="text-brand-pink absolute top-2 left-2 fill-brand-pink/40"/>
            <Heart size={20} className="text-brand-pink absolute top-3 right-3 fill-brand-pink/40"/>
            <Heart size={20} className="text-brand-pink absolute bottom-4 right-5 fill-brand-pink/40"/>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="w-32 h-32 rounded-full border-2 border-dashed border-brand-pink/40 flex items-center justify-center">
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-3xl gradient-pink-peach flex items-center justify-center shadow-glow">
                <div className="text-3xl">馃</div>
              </motion.div>
            </motion.div>
          </div>
          <div className="text-[22px] font-bold mt-3">Heart Halo</div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-ink text-white text-[10px] font-bold mt-1">
            <CheckCircle2 size={11}/> Owned
          </div>
          <div className="text-[12px] text-brand-mute mt-3 text-center">A soft frame for close and warm moments.</div>
        </div>

        <button className="w-full mt-5 py-3.5 rounded-2xl bg-brand-ink text-white text-[14px] font-bold shadow-soft">Apply Frame</button>
        <button className="w-full mt-2 py-3.5 rounded-2xl bg-white border border-brand-bg text-[14px] font-bold">Cancel</button>
      </motion.div>
    </div>
  );
}
