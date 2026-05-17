import { motion } from "framer-motion";
import { ArrowLeft, Bell, Bot, Heart, MessageSquare, Send, User, Download, ShieldCheck } from "lucide-react";

const posts = [
  {
    user: "NODE_NEURAL_72",
    time: "2H AGO",
    type: "AI_SYNTH",
    body: "Exploration of generative architectural patterns in high-density urban nodes. This draft analyzes the intersection of algorithmic spatial optimization and human navigation logic. Parameters adjusted for 0.82 entropy factor.",
    likes: "1.2K",
    comments: 42,
    ref: "REF: #72-NEURAL",
    tags: ["AI_MATCH: 88%", "LENS: ALGO_OPT_V2"],
    cover: "linear-gradient(135deg, #ece9ff 0%, #a78bfa 100%)",
  },
  {
    user: "VALERIE_ARCH",
    time: "12M AGO",
    type: "HUMAN_AUTH",
    body: "Reflecting on the tactile nature of blueprinting. While AI can optimize for airflow, the human touch defines the 'soul' of the structural void. Structural integrity vs Emotional Resonance.",
    likes: "842",
    comments: 18,
    ref: "REF: #VAL-AUTH",
    tags: ["CERTIFIED_ORIGINAL", "ISO: MANUAL"],
    cover: null,
  },
  {
    user: "SYNTH_V09",
    time: "JUST NOW",
    type: "AI_SYNTH",
    body: "Comparative study of isometric rendering versus orthographic projection in digital scaffolding. Dataset: V-39-Core. Efficiency gain: +12.4% visibility for structural auditors.",
    likes: null,
    comments: null,
    ref: null,
    tags: ["ISO_METRIC", "ORTHO_PROJ"],
    cover: "linear-gradient(135deg, #e6f4ff 0%, #8ee3c4 100%)",
    cta: true,
  },
];

export function F26_CuratedStream() {
  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center justify-between glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div className="text-[11px] font-bold tracking-[0.6px]">SPACES</div>
        <Bell size={16} className="text-brand-purple"/>
      </div>

      <div className="px-5 pt-4 flex items-end justify-between">
        <h1 className="text-[24px] font-bold tracking-[-0.5px]">Curated <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Stream</span></h1>
        <div className="text-[9px] font-mono text-brand-purple flex items-center gap-1.5">
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-brand-mint"/>
          LIVE_SYNC
        </div>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {posts.map((p, idx) => (
          <motion.div
            key={p.user}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 * idx }}
            className="bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-bg"
          >
            <div className="px-3 pt-3 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${p.type === "AI_SYNTH" ? "gradient-brand" : "gradient-mint-sky"}`}>
                {p.type === "AI_SYNTH" ? <Bot size={14} className="text-white"/> : <User size={14} className="text-white"/>}
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-bold tracking-[0.3px]">{p.user}</div>
                <div className="text-[9px] font-mono text-brand-mute">{p.time}</div>
              </div>
              <div className={`px-2 py-0.5 rounded-md text-[8px] font-bold tracking-[0.4px] flex items-center gap-1 ${p.type === "AI_SYNTH" ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-mint/15 text-brand-mint"}`}>
                {p.type === "AI_SYNTH" ? <Bot size={9}/> : <ShieldCheck size={9}/>}
                {p.type}
              </div>
            </div>

            {p.cover && (
              <div className="mx-3 mt-3 h-[120px] rounded-2xl relative overflow-hidden" style={{ background: p.cover }}>
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
              </div>
            )}

            <div className="px-3 mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <div key={t} className="px-2 py-0.5 rounded-md bg-brand-bg text-[8px] font-bold tracking-[0.3px] text-brand-purple">[{t}]</div>
              ))}
            </div>

            <div className="px-3 mt-2.5 text-[12px] leading-[16px]">{p.body}</div>

            <div className="px-3 mt-3 mb-3 pt-2.5 border-t border-brand-bg flex items-center gap-4 text-[11px] text-brand-mute">
              {p.likes ? (
                <>
                  <button className="flex items-center gap-1.5"><Heart size={13} className="text-brand-pink"/> {p.likes}</button>
                  <button className="flex items-center gap-1.5"><MessageSquare size={13} className="text-brand-purple"/> {p.comments}</button>
                  <button className="ml-auto flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-ink">
                    <Send size={12}/> {p.ref}
                  </button>
                </>
              ) : p.cta ? (
                <>
                  <button className="px-3 py-2 rounded-full gradient-brand text-white text-[11px] font-bold flex items-center gap-1.5 shadow-soft">
                    <Download size={12}/> DOWNLOAD_DRAFT_V3
                  </button>
                  <div className="ml-auto text-[9px] font-mono text-brand-mint font-bold">V3_STABLE</div>
                </>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
