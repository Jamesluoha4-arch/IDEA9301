import { motion } from "framer-motion";
import { Heart, Lock, BookOpen, Link2, ShieldCheck, MessageSquare, Bookmark, Users, Ban, ArrowLeft } from "lucide-react";

const blocked = [
  { Icon: Heart, t: "Emotional memories", g: "from-brand-pink to-brand-peach" },
  { Icon: Users, t: "Private relationship notes", g: "from-brand-purple to-brand-lavender" },
  { Icon: BookOpen, t: "Personal diary records", g: "from-brand-sky to-brand-mint" },
  { Icon: Link2, t: "Cross-platform private data", g: "from-brand-lavender to-brand-pink" },
];

export function F24_PrivateBlocked() {
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      {/* faded backdrop header preview */}
      <div className="px-4 pb-3 flex items-center justify-between opacity-60">
        <ArrowLeft size={16}/>
        <div className="text-[13px] font-bold">Spaces</div>
        <div className="px-2.5 py-1 rounded-full bg-brand-ink text-white text-[10px] font-bold flex items-center gap-1">
          <ShieldCheck size={10}/> Approved only
        </div>
      </div>
      <div className="absolute inset-0 bg-brand-ink/45 backdrop-blur-sm z-0"/>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25 }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-[32px] pb-5 max-h-[88%] overflow-y-auto shadow-glow"
      >
        <div className="pt-3 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-brand-bg"/>
        </div>

        <div className="px-6 pt-4 flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shrink-0 shadow-glow relative">
            <Lock size={22} strokeWidth={2} className="text-white"/>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center border-2 border-white">
              <Ban size={9} className="text-white"/>
            </div>
          </div>
          <div>
            <h2 className="text-[18px] font-bold">Private Data <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Blocked</span></h2>
            <p className="text-[11px] text-brand-mute mt-1 leading-[16px]">Your Second Self did not use sensitive personal data for this warm-up.</p>
          </div>
        </div>

        <div className="px-6 mt-5 flex items-center justify-between">
          <div className="text-[10px] font-bold tracking-[0.6px] text-brand-mute">BLOCKED IN THIS PATH</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-brand-mint">
            <ShieldCheck size={11}/> SAFETY ACTIVE
          </div>
        </div>

        <div className="mx-6 mt-3 space-y-2">
          {blocked.map(({ Icon, t, g }, i) => (
            <motion.div
              key={t}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white rounded-2xl px-3 py-3 flex items-center gap-3 shadow-soft border border-brand-bg"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${g} flex items-center justify-center`}>
                <Icon size={16} strokeWidth={2} className="text-white"/>
              </div>
              <div className="flex-1 text-[13px] font-bold">{t}</div>
              <Ban size={14} className="text-brand-mute"/>
            </motion.div>
          ))}
        </div>

        <div className="px-6 mt-5 text-[10px] font-bold tracking-[0.6px] text-brand-mute">USED INSTEAD</div>
        <div className="px-6 mt-3 grid grid-cols-3 gap-2">
          {[
            { Icon: MessageSquare, t: "Past chat: camera settings" },
            { Icon: Bookmark, t: "Memory: photo walk" },
            { Icon: Users, t: "Relationship: friend" },
          ].map(({ Icon, t }) => (
            <div key={t} className="bg-white rounded-2xl p-2.5 flex flex-col items-center text-center gap-1 border border-brand-mint/30">
              <Icon size={14} className="text-brand-mint"/>
              <div className="text-[9px] leading-[12px] mt-1">{t}</div>
            </div>
          ))}
        </div>

        <div className="px-6 mt-6 space-y-2">
          <motion.button whileTap={{ scale: 0.98 }} className="w-full py-3.5 rounded-2xl bg-brand-bg text-brand-ink text-[13px] font-bold border border-brand-bg">
            Manage Permissions
          </motion.button>
          <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="w-full py-3.5 rounded-2xl gradient-brand text-white text-[13px] font-bold shadow-soft">
            Got it
          </motion.button>
        </div>
        <div className="px-6 mt-3 flex items-center justify-center gap-1.5 text-[10px] text-brand-mute">
          <ShieldCheck size={11} className="text-brand-mint"/> This path only used approved context.
        </div>
      </motion.div>
    </div>
  );
}
