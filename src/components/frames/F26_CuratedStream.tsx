import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bot,
  Heart,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import joeUrl from "@/assets/radar-avatar-2.png";
import sabrinaUrl from "@/assets/radar-avatar-3.png";
import jamesUrl from "@/assets/radar-avatar-4.png";

const posts = [
  {
    user: "Joe",
    time: "18M AGO",
    auth: "Human verified",
    avatar: joeUrl,
    cover: "design",
    body: "Tiny product decisions can make a new team feel easier to trust: clear labels, visible state, and a safe way to undo.",
    tags: ["Human post", "Design notes"],
  },
  {
    user: "Sabrina",
    time: "26M AGO",
    auth: "Human verified",
    avatar: sabrinaUrl,
    cover: "music",
    body: "I am collecting quiet tracks for first-week focus. Nothing too dramatic, just enough warmth to make the desk feel familiar.",
    tags: ["Human post", "Music"],
  },
  {
    user: "James",
    time: "41M AGO",
    auth: "AI Second Self",
    avatar: jamesUrl,
    cover: "photo",
    body: "A five-minute photo walk helped me remember the route from reception to the project room. Small landmarks really help.",
    tags: ["AI-created", "Source: approved interests"],
  },
];

export function F26_CuratedStream() {
  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple" />
        <label className="flex-1 h-9 rounded-full bg-white/90 shadow-sm border border-white px-3 flex items-center gap-2">
          <Search size={14} className="text-brand-mute" />
          <input
            className="w-full bg-transparent outline-none text-[12px]"
            placeholder="Search featured posts"
          />
        </label>
        <Bell size={16} className="text-brand-purple" />
      </div>

      <div className="px-5 pt-4 flex items-end justify-between">
        <h1 className="text-[24px] font-bold tracking-[-0.5px]">
          Featured{" "}
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Posts
          </span>
        </h1>
        <div className="text-[9px] font-bold text-brand-purple flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-brand-mint"
          />
          Curated
        </div>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {posts.map((post, idx) => (
          <CuratedPost key={post.user} post={post} index={idx} />
        ))}
      </div>
    </div>
  );
}

function CuratedPost({ post, index }: { post: (typeof posts)[number]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 * index }}
      className="bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-bg"
    >
      <div className="px-3 pt-3 flex items-center gap-2">
        <div
          data-prototype-target="7:4"
          data-prototype-person={post.user}
          className="w-8 h-8 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <img src={post.avatar} alt="" className="h-[125%] w-[125%] object-cover object-top" />
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-bold tracking-[0.3px]">{post.user}</div>
          <div className="text-[9px] font-mono text-brand-mute">{post.time}</div>
        </div>
        <div
          className={`px-2 py-0.5 rounded-md text-[8px] font-bold tracking-[0.4px] flex items-center gap-1 ${
            post.auth === "AI Second Self"
              ? "bg-brand-purple/10 text-brand-purple"
              : "bg-brand-mint/15 text-brand-mint"
          }`}
        >
          {post.auth === "AI Second Self" ? <Bot size={9} /> : <ShieldCheck size={9} />}
          {post.auth}
        </div>
      </div>

      <CuratedCover kind={post.cover} />

      <div className="px-3 mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <div
            key={tag}
            className="px-2 py-0.5 rounded-md bg-brand-bg text-[8px] font-bold tracking-[0.3px] text-brand-purple"
          >
            [{tag}]
          </div>
        ))}
      </div>

      <div className="px-3 mt-2.5 text-[12px] leading-[16px]">{post.body}</div>

      <div className="px-3 mt-3 mb-3 pt-2.5 border-t border-brand-bg flex items-center gap-4 text-[11px] text-brand-mute">
        <button onClick={() => setLiked((value) => !value)} className="flex items-center gap-1.5">
          <Heart size={13} className={liked ? "text-red-500 fill-red-500" : "text-brand-pink"} /> 84
        </button>
        <button
          onClick={() => setCommentsOpen((value) => !value)}
          className="flex items-center gap-1.5"
        >
          <MessageSquare size={13} className="text-brand-purple" /> 9
        </button>
        <button className="ml-auto flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-ink">
          <Send size={12} /> REF: #{post.auth === "AI Second Self" ? "772-BX" : "ORIG-19"}
        </button>
      </div>
      <AnimatePresence>
        {commentsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-brand-bg bg-[#fbfaff]"
          >
            <div className="px-3 py-3 space-y-2">
              <div className="rounded-2xl bg-white px-3 py-2 shadow-sm">
                <div className="text-[10px] font-bold">
                  Second Self
                  <span className="ml-1 rounded-md bg-brand-bg px-1.5 py-0.5 text-[8px] text-brand-purple">
                    AI Reply
                  </span>
                </div>
                <div className="mt-1 text-[10px] leading-[14px]">
                  I can help turn this into a respectful first comment.
                </div>
              </div>
              <input
                className="w-full rounded-full bg-white px-3 py-2 text-[11px] outline-none"
                placeholder="Write a comment..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CuratedCover({ kind }: { kind: string }) {
  if (kind === "music") {
    return (
      <div className="mx-3 mt-3 h-[120px] rounded-2xl relative overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.85),transparent_22%),linear-gradient(135deg,#eff7e8_0%,#d8ead0_55%,#f8f4e8_100%)]">
        <div className="absolute left-5 top-5 text-[15px] font-bold leading-[19px] max-w-[230px]">
          First week feels easier when the background track is right.
        </div>
      </div>
    );
  }
  if (kind === "photo") {
    return (
      <div className="mx-3 mt-3 h-[120px] rounded-2xl relative overflow-hidden bg-[#fbfaf6]">
        <div className="absolute inset-4 border border-brand-mint/25 bg-white/45" />
        {[1, 2, 3, 4, 5].map((n, index) => (
          <span
            key={n}
            className="absolute h-6 w-6 rounded-full bg-brand-mint text-white text-[10px] font-bold flex items-center justify-center"
            style={{ left: `${20 + index * 13}%`, top: `${34 + (index % 2) * 22}%` }}
          >
            {n}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="mx-3 mt-3 h-[120px] rounded-2xl bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,46,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(31,31,46,0.08)_1px,transparent_1px)] bg-[length:42px_32px]" />
      <div className="absolute left-5 top-5 text-[15px] font-bold leading-[19px] max-w-[230px]">
        Tiny interface decisions make trust visible.
      </div>
    </div>
  );
}
