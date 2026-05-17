import { motion } from "framer-motion";
import { ArrowLeft, Heart, AtSign, MessageSquare, Sparkles, RefreshCw, Archive, Trash2, ShieldCheck, Bot } from "lucide-react";

const items = [
  { name: "Alex Rivera", type: "HUMAN_AUTH", time: "2m ago", Icon: Heart, body: "Liked your architectural protocol draft.", color: "text-brand-pink", g: "from-brand-pink to-brand-peach" },
  { name: "Synth Core 04", type: "AI_SYNTH", time: "15m ago", Icon: AtSign, body: "Mentioned you in a synthesis report.", color: "text-brand-purple", g: "from-brand-purple to-brand-lavender" },
  { name: "Sarah M", type: "HUMAN_AUTH", time: "1h ago", Icon: MessageSquare, body: "Commented on your node visualization.", color: "text-brand-sky", g: "from-brand-sky to-brand-mint" },
  { name: "Vector Logic", type: "AI_SYNTH", time: "3h ago", Icon: Sparkles, body: "Automated system update regarding your permissions.", color: "text-brand-purple", g: "from-brand-lavender to-brand-pink" },
  { name: "K Takeda", type: "HUMAN_AUTH", time: "6h ago", Icon: RefreshCw, body: "Re-drafted your component library to their workspace.", color: "text-brand-mint", g: "from-brand-mint to-brand-sky" },
];

export function F28_Interactions() {
  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div className="text-[16px] font-bold">Interactions</div>
      </div>

      <div className="px-4 mt-3 space-y-2">
        {items.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ x: 3 }}
            className="bg-white rounded-2xl p-3 flex items-start gap-3 shadow-soft border border-brand-bg"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${it.g} flex items-center justify-center shrink-0`}>
              {it.type === "AI_SYNTH" ? <Bot size={20} className="text-white"/> : <div className="text-[14px] font-bold text-white">{it.name.charAt(0)}</div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-[13px] font-bold">{it.name}</div>
                <div className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold tracking-[0.3px] flex items-center gap-1 ${it.type === "AI_SYNTH" ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-mint/15 text-brand-mint"}`}>
                  {it.type === "AI_SYNTH" ? <Bot size={8}/> : <ShieldCheck size={8}/>}
                  {it.type}
                </div>
                <div className="ml-auto text-[10px] text-brand-mute font-mono">{it.time}</div>
              </div>
              <div className="mt-1 flex items-start gap-1.5">
                <it.Icon size={13} className={`${it.color} mt-0.5 shrink-0`}/>
                <div className="text-[12px] leading-[16px] text-brand-ink/80">{it.body}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 mx-4 pt-4 border-t border-dashed border-brand-bg">
        <div className="text-[9px] font-mono text-brand-mute text-center tracking-[0.4px]">[END_OF_RECENT_ACTIVITY_STREAM]</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="py-2.5 rounded-full bg-white border border-brand-bg text-[11px] font-bold tracking-[0.4px] flex items-center justify-center gap-1.5 shadow-soft">
            <Archive size={12} className="text-brand-purple"/> LOAD_ARCHIVE
          </button>
          <button className="py-2.5 rounded-full bg-white border border-brand-bg text-[11px] font-bold tracking-[0.4px] flex items-center justify-center gap-1.5 shadow-soft">
            <Trash2 size={12} className="text-brand-pink"/> CLEAR_LOGS
          </button>
        </div>
      </div>
    </div>
  );
}
