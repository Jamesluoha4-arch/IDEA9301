import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bot,
  Heart,
  MessageSquare,
  Share2,
  Plus,
  ShieldCheck,
  User,
} from "lucide-react";
import { BottomNav } from "./F09_Home";

type Post = {
  user: string;
  time: string;
  authType: "AI_SYNTH" | "HUMAN_AUTH";
  cover: string;
  body: string;
  likes: string;
  comments: number;
  ref: string;
  tags: string[];
};

const posts: Post[] = [
  {
    user: "SYNTH_UNIT_91",
    time: "2H AGO",
    authType: "AI_SYNTH",
    cover: "linear-gradient(135deg, #1f1f2e 0%, #6c5ce7 60%, #a78bfa 100%)",
    body: "AI-created post based on approved public interests. No private chats were used.",
    likes: "1.2K",
    comments: 48,
    ref: "REF: #772-BX",
    tags: ["AI-CREATED", "SOURCE: APPROVED INTERESTS"],
  },
  {
    user: "ERIK_S_08",
    time: "JUST NOW",
    authType: "HUMAN_AUTH",
    cover: "linear-gradient(180deg, #ffbe98 0%, #f6b4db 50%, #6c5ce7 100%)",
    body: "Capturing the golden hour at Node_08. The lens flare adds a soul that no algorithm can replicate. Pure glass, pure light.",
    likes: "3.4K",
    comments: 156,
    ref: "REF: #ORIG-99",
    tags: ["HUMAN POST", "ORIGINAL"],
  },
];

function AuthBadge({ t }: { t: Post["authType"] }) {
  const ai = t === "AI_SYNTH";
  return (
    <div
      className={`px-2 py-0.5 rounded-md text-[8px] font-bold tracking-[0.4px] flex items-center gap-1 ${ai ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-mint/15 text-brand-mint"}`}
    >
      {ai ? <Bot size={9} /> : <ShieldCheck size={9} />}
      {t}
    </div>
  );
}

export function F25_SpacesFeed() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center justify-between glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple" />
        <div className="text-[11px] font-bold tracking-[0.6px]">SPACES</div>
        <Bell size={16} className="text-brand-purple" />
      </div>

      <div className="px-5 pt-4 text-[9px] font-mono tracking-[0.5px] text-brand-mute flex items-center gap-2">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-brand-mint"
        />
        SPACES: AI/HUMAN LABELS ACTIVE
      </div>

      <div className="px-4 mt-3 space-y-3 relative">
        {posts.map((p, idx) => (
          <motion.div
            key={p.user}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 * idx }}
            className="bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-bg"
          >
            <div className="px-3 pt-3 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${p.authType === "AI_SYNTH" ? "gradient-brand" : "gradient-mint-sky"}`}
              >
                {p.authType === "AI_SYNTH" ? (
                  <Bot size={14} className="text-white" />
                ) : (
                  <User size={14} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-bold tracking-[0.3px]">{p.user}</div>
                <div className="text-[9px] font-mono text-brand-mute">{p.time}</div>
              </div>
              <AuthBadge t={p.authType} />
            </div>

            <div
              className="mx-3 mt-3 h-[140px] rounded-2xl relative overflow-hidden"
              style={{ background: p.cover }}
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </div>

            <div className="px-3 mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <div
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-brand-bg text-[8px] font-bold tracking-[0.3px] text-brand-purple"
                >
                  [{t}]
                </div>
              ))}
            </div>

            <div className="px-3 mt-2.5 text-[12px] leading-[16px]">{p.body}</div>

            <div className="px-3 mt-3 mb-3 pt-2.5 border-t border-brand-bg flex items-center gap-4 text-[11px] text-brand-mute">
              <button className="flex items-center gap-1.5">
                <Heart size={13} className="text-brand-pink" /> {p.likes}
              </button>
              <button className="flex items-center gap-1.5">
                <MessageSquare size={13} className="text-brand-purple" /> {p.comments}
              </button>
              <button className="ml-auto flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-ink">
                <Share2 size={12} /> {p.ref}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-24 right-5 w-12 h-12 rounded-full gradient-brand shadow-glow flex items-center justify-center"
      >
        <Plus size={20} className="text-white" />
      </motion.button>

      <BottomNav active="SOCIAL" />
    </div>
  );
}
