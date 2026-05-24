import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bot,
  ChevronDown,
  Edit3,
  Heart,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";
import defaultAvatarUrl from "@/assets/default-ai-self.svg";
import JimUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import sabrinaUrl from "@/assets/radar-avatar-3.png";
import jamesUrl from "@/assets/radar-avatar-4.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";
import { BottomNav } from "./F09_Home";

type CoverKind = "ai" | "design" | "music" | "photo" | "none";
type SpacePostData = {
  key: string;
  name: string;
  user: string;
  avatar: string;
  auth: "AI Second Self" | "Human verified";
  cover: CoverKind;
  body: string;
  tags: string[];
  starter: string;
  imageUrl?: string;
  id?: string;
  time?: string;
};

const spaceData: Record<string, SpacePostData> = {
  AI_SYNTH: {
    key: "AI_SYNTH",
    name: "AI Synth",
    user: "Jim",
    avatar: JimUrl,
    auth: "AI Second Self",
    cover: "ai",
    body: "Exploration of generative architectural patterns in high-density urban nodes. This draft analyzes the intersection of algorithmic spatial optimization and human navigation logic.",
    tags: ["AI-created", "Source: approved interests"],
    starter:
      "Hi, I am {user}. I am curious about how AI-created identity can stay transparent while still feeling expressive and useful in a new community.",
  },
  DESIGN_SYSTEMS: {
    key: "DESIGN_SYSTEMS",
    name: "Design Systems",
    user: "Joe",
    avatar: joeUrl,
    auth: "Human verified",
    cover: "design",
    body: "I am collecting tiny interface decisions that make a new product feel easier to trust. The best ones are almost invisible until you need them.",
    tags: ["Human post", "Design notes"],
    starter:
      "Hi, I am {user}. I am new here and I would love to trade one design system detail that made onboarding feel clearer.",
  },
  MUSIC_ROOM: {
    key: "MUSIC_ROOM",
    name: "Music Room",
    user: "Sabrina",
    avatar: sabrinaUrl,
    auth: "Human verified",
    cover: "music",
    body: "First week feels easier when the background track is right. I am building a starter playlist for quiet focus and small wins.",
    tags: ["Human post", "Music"],
    starter:
      "Hi, I am {user}. I am building a first-week playlist and would love to hear one track that helps you settle into a new place.",
  },
  PHOTO_WALK: {
    key: "PHOTO_WALK",
    name: "Photo Walk",
    user: "James",
    avatar: jamesUrl,
    auth: "AI Second Self",
    cover: "photo",
    body: "A quick photo walk around the office can turn a new place into a map of small familiar landmarks.",
    tags: ["AI-created", "Source: approved interests"],
    starter:
      "Hi, I am {user}. I am trying to learn the area around the office through small visual details. What is one place nearby worth noticing?",
  },
};

type SpaceKey = keyof typeof spaceData;
type FeedMode = "Friends" | "Featured";

const curatedPosts: SpacePostData[] = [
  {
    ...spaceData.DESIGN_SYSTEMS,
    id: "curated-design",
    user: "Joe",
    time: "18M AGO",
    body: "Tiny product decisions can make a new team feel easier to trust: clear labels, visible state, and a safe way to undo.",
  },
  {
    ...spaceData.MUSIC_ROOM,
    id: "curated-music",
    user: "Sabrina",
    time: "26M AGO",
    body: "I am collecting quiet tracks for first-week focus. Nothing too dramatic, just enough warmth to make the desk feel familiar.",
  },
  {
    ...spaceData.PHOTO_WALK,
    id: "curated-photo",
    user: "James",
    time: "41M AGO",
    body: "A five-minute photo walk helped me remember the route from reception to the project room. Small landmarks really help.",
  },
];

function readUserName() {
  return window.localStorage.getItem("second-self-user-name")?.trim() || "David";
}

function readSpaceKey(): SpaceKey {
  const stored = window.sessionStorage.getItem("second-self.selected-space");
  return stored && stored in spaceData ? (stored as SpaceKey) : "AI_SYNTH";
}

function readCustomPosts(spaceKey: SpaceKey): SpacePostData[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(
      window.sessionStorage.getItem(`second-self.posts.${spaceKey}`) || "[]",
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const viewedSpacesKey = "second-self.viewed-spaces";

function readViewedSpaceKeys() {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(viewedSpacesKey) || "[]");
    return Array.isArray(saved) ? (saved as string[]) : [];
  } catch {
    return [];
  }
}

function recordViewedSpace(key: SpaceKey) {
  const next = Array.from(new Set([key, ...readViewedSpaceKeys()])).slice(0, 6);
  window.sessionStorage.setItem(viewedSpacesKey, JSON.stringify(next));
}

function composerSeenKey(spaceKey: SpaceKey) {
  return `second-self.space-intro-seen.${spaceKey}`;
}

export function F25_SpacesFeed() {
  const [showComposer, setShowComposer] = useState(false);
  const [composerGone, setComposerGone] = useState(false);
  const [mode, setMode] = useState<FeedMode>("Friends");
  const [filterOpen, setFilterOpen] = useState(false);
  const [customPosts, setCustomPosts] = useState<SpacePostData[]>([]);
  const spaceKey = readSpaceKey();
  const space = spaceData[spaceKey];
  const userName = readUserName();
  const userAvatar = readGeneratedAvatar() || defaultAvatarUrl;
  const starter = useMemo(() => space.starter.replace("{user}", userName), [space, userName]);

  useEffect(() => {
    setShowComposer(false);
    setComposerGone(false);
    setCustomPosts(readCustomPosts(spaceKey));
    recordViewedSpace(spaceKey);
    if (window.sessionStorage.getItem(composerSeenKey(spaceKey))) return;
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(composerSeenKey(spaceKey), "true");
      setShowComposer(true);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [spaceKey]);

  const closeComposer = () => setComposerGone(true);

  const approve = () => {
    const starterPost: SpacePostData = {
      ...space,
      id: "starter-post",
      user: userName,
      avatar: userAvatar,
      auth: "AI Second Self",
      cover: "none",
      body: starter,
      tags: ["AI-created", "Approved opening"],
      time: "JUST NOW",
      starter,
    };
    const nextPosts = [starterPost, ...customPosts.filter((post) => post.id !== "starter-post")];
    setCustomPosts(nextPosts);
    window.sessionStorage.setItem(`second-self.posts.${spaceKey}`, JSON.stringify(nextPosts));
    closeComposer();
  };

  const friendPosts: SpacePostData[] = [
    ...customPosts,
    space,
    {
      ...spaceData.MUSIC_ROOM,
      id: "sabrina-reflection",
      user: "Sabrina",
      avatar: sabrinaUrl,
      cover: "none" as const,
      body: "I like how this topic gives new starters a small and safe reason to speak. It feels easier than forcing a big introduction.",
      tags: ["Human post", "New starter note"],
    },
  ];
  const posts = mode === "Friends" ? friendPosts : curatedPosts;

  return (
    <div className="relative w-full h-full overflow-hidden font-sans text-brand-ink gradient-brand-soft">
      <div className="h-full pt-12 pb-24 overflow-y-auto prototype-scroll">
        <div className="px-4 py-3 flex items-center gap-3 glass border-b border-brand-bg">
          <button
            type="button"
            data-prototype-back="7:0"
            className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <ArrowLeft size={15} className="text-brand-purple" />
          </button>
          <label className="flex-1 h-9 rounded-full bg-white/90 shadow-sm border border-white px-3 flex items-center gap-2">
            <Search size={14} className="text-brand-mute" />
            <input
              className="w-full bg-transparent outline-none text-[12px]"
              placeholder={`Search ${space.name}`}
            />
          </label>
          <button
            type="button"
            data-prototype-target="7:3"
            className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell size={14} className="text-brand-purple" />
          </button>
        </div>

        <div className="px-5 pt-4">
          <h1 className="text-[22px] font-bold">{space.name} Space</h1>
          <p className="mt-1 text-[12px] text-brand-mute">
            A curated room built from approved interests and transparent identity labels.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setFilterOpen((value) => !value)}
                className="rounded-full gradient-brand px-4 py-2 text-[11px] font-bold text-white shadow-soft flex items-center gap-1.5"
              >
                {mode}
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    className="absolute left-0 top-10 z-40 w-28 rounded-2xl bg-white shadow-soft border border-brand-bg p-1"
                  >
                    {(["Friends", "Featured"] as FeedMode[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setMode(item);
                          setFilterOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2 text-left text-[11px] font-bold ${
                          mode === item ? "bg-brand-bg text-brand-purple" : "text-brand-ink"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="rounded-full bg-white/80 px-4 py-2 text-[11px] font-bold text-brand-mute shadow-sm">
              Pending
            </button>
            <button className="rounded-full bg-white/80 px-4 py-2 text-[11px] font-bold text-brand-mute shadow-sm">
              Mine
            </button>
            <button className="ml-auto h-9 w-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center">
              <Search size={15} className="text-brand-mint" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showComposer && !composerGone && mode === "Friends" && (
            <motion.section
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="mx-5 mt-4 rounded-3xl border border-white/80 bg-white/78 p-4 shadow-soft backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-2xl bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={userAvatar}
                    alt=""
                    className="h-[125%] w-[125%] object-cover object-top"
                  />
                </span>
                <div className="flex-1">
                  <div className="text-[13px] font-bold">
                    Welcome to {space.name} Space, {userName}
                  </div>
                  <div className="text-[10px] text-brand-mute">
                    Let&apos;s begin with this prepared opening.
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-2xl bg-brand-bg/70 p-3 text-[12px] leading-[17px]">
                {starter}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={closeComposer}
                  className="flex-1 rounded-full bg-white py-3 text-[12px] font-bold text-brand-mute shadow-sm"
                >
                  Cancel post
                </button>
                <button
                  type="button"
                  onClick={approve}
                  className="relative flex-1 overflow-hidden rounded-full gradient-brand py-3 text-[12px] font-bold text-white shadow-soft"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-brand-ink/35"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                    onAnimationComplete={closeComposer}
                  />
                  <span className="relative">Approved</span>
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="px-4 mt-4 space-y-3 relative">
          <AnimatePresence initial={false}>
            {posts.map((post, index) => (
              <SpacePost key={post.id ?? `${post.key}-${index}`} space={post} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <button
        data-prototype-target="7:2"
        className="absolute bottom-[94px] right-5 h-14 w-14 rounded-full bg-gradient-to-br from-brand-mint to-brand-sky text-white shadow-glow flex items-center justify-center z-30 border-[4px] border-white/70"
      >
        <Edit3 size={22} />
      </button>

      <BottomNav active="COMMUNITY" />
    </div>
  );
}

function SpacePost({ space, index }: { space: SpacePostData; index: number }) {
  const [liked, setLiked] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userComments, setUserComments] = useState<
    { name: string; tag: string; text: string; avatar: string }[]
  >([]);
  const isAi = space.auth === "AI Second Self";
  const isStarter = space.id === "starter-post";
  const aiApproved =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("second-self.ai-activity-approved") === "true";
  const comments = [
    {
      name: "Joe",
      tag: "Human verified",
      text: "This is useful. I care most about where the AI clearly explains what it used.",
      avatar: joeUrl,
    },
    {
      name: "Second Self",
      tag: aiApproved ? "Human Approved" : "AI Reply",
      text: aiApproved
        ? "Human approval recorded. This reply now reflects approved Second Self activity."
        : "I can summarize the thread and keep private context out of the response.",
      avatar: defaultAvatarUrl,
    },
    ...userComments,
  ];

  const submitComment = () => {
    const text = newComment.trim();
    if (!text) return;
    setUserComments((items) => [
      ...items,
      {
        name: readUserName(),
        tag: "Human verified",
        text,
        avatar: readGeneratedAvatar() || defaultAvatarUrl,
      },
    ]);
    setNewComment("");
  };

  return (
    <motion.div
      layout
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ delay: 0.04 * index }}
      className="bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-bg"
    >
      <div className="px-3 pt-3 flex items-center gap-2">
        <div
          data-prototype-target="7:4"
          data-prototype-person={space.user}
          className="w-8 h-8 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <img src={space.avatar} alt="" className="h-[125%] w-[125%] object-cover object-top" />
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-bold tracking-[0.3px]">{space.user}</div>
          <div className="text-[9px] font-mono text-brand-mute">{space.time ?? "2H AGO"}</div>
        </div>
        <div
          className={`px-2 py-0.5 rounded-md text-[8px] font-bold tracking-[0.4px] flex items-center gap-1 ${
            isAi ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-mint/15 text-brand-mint"
          }`}
        >
          {isAi ? <Bot size={9} /> : <ShieldCheck size={9} />}
          {space.auth}
        </div>
      </div>

      <PostCover kind={space.cover} imageUrl={space.imageUrl} />

      <div className="px-3 mt-3 flex flex-wrap gap-1.5">
        {space.tags.map((tag) => (
          <div
            key={tag}
            className="px-2 py-0.5 rounded-md bg-brand-bg text-[8px] font-bold tracking-[0.3px] text-brand-purple"
          >
            [{tag}]
          </div>
        ))}
      </div>

      <div className="px-3 mt-2.5 text-[12px] leading-[16px]">{space.body}</div>

      <div className="px-3 mt-3 mb-3 pt-2.5 border-t border-brand-bg flex items-center gap-4 text-[11px] text-brand-mute">
        {!isStarter && (
          <>
            <button
              onClick={() => setLiked((value) => !value)}
              className="flex items-center gap-1.5"
            >
              <Heart
                size={13}
                className={liked ? "text-red-500 fill-red-500" : "text-brand-pink"}
              />{" "}
              {index === 0 ? "1.2K" : "84"}
            </button>
            <button
              onClick={() => setCommentsOpen((value) => !value)}
              className="flex items-center gap-1.5"
            >
              <MessageSquare size={13} className="text-brand-purple" />{" "}
              {comments.length + (index === 0 ? 40 : 7)}
            </button>
          </>
        )}
        <button className="ml-auto flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-ink">
          <Send size={12} /> REF: #{isAi ? "772-BX" : "ORIG-19"}
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
              {comments.map((comment, commentIndex) => (
                <div key={`${comment.name}-${commentIndex}`} className="flex gap-2">
                  <img
                    src={comment.avatar}
                    alt=""
                    className="h-7 w-7 rounded-full bg-white object-cover object-top"
                  />
                  <div className="flex-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
                    <div className="text-[10px] font-bold">
                      {comment.name}
                      <span
                        className={`ml-1 rounded-md px-1.5 py-0.5 text-[8px] ${
                          comment.tag === "Human verified"
                            ? "bg-brand-mint/15 text-brand-mint"
                            : comment.tag === "Human Approved"
                              ? "bg-brand-purple/10 text-brand-purple"
                              : "bg-brand-bg text-brand-purple"
                        }`}
                      >
                        {comment.tag}
                      </span>
                    </div>
                    <div className="mt-1 text-[10px] leading-[14px] text-brand-ink/85">
                      {comment.text}
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2 rounded-full bg-white px-3 py-2 text-[11px] text-brand-mute flex items-center gap-2">
                <input
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") submitComment();
                  }}
                  className="min-w-0 flex-1 bg-transparent outline-none"
                  placeholder="Write a comment..."
                />
                <button
                  type="button"
                  onClick={submitComment}
                  className="rounded-full bg-brand-mint/15 px-2.5 py-1 text-[10px] font-bold text-brand-mint"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PostCover({ kind, imageUrl }: { kind: string; imageUrl?: string }) {
  if (kind === "none") return null;
  if (imageUrl) {
    return (
      <div className="mx-3 mt-3 h-[132px] rounded-2xl overflow-hidden bg-brand-bg">
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }
  if (kind === "ai") {
    return (
      <div className="mx-3 mt-3 h-[132px] rounded-2xl overflow-hidden relative bg-[radial-gradient(circle_at_62%_44%,rgba(167,139,250,0.8),transparent_18%),linear-gradient(135deg,#142035_0%,#2d3153_45%,#9279e8_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:18px_18px] opacity-40" />
        <div className="absolute left-4 top-4 w-[62%] text-white">
          <div className="text-[16px] font-bold leading-[18px]">
            A space for AI-created identity and responsible creative systems.
          </div>
          <div className="mt-2 text-[8px] text-white/75">
            Transparency 路 Consent 路 Attribution
          </div>
        </div>
      </div>
    );
  }
  if (kind === "design") {
    return (
      <div className="mx-3 mt-3 h-[132px] rounded-2xl bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,46,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(31,31,46,0.08)_1px,transparent_1px)] bg-[length:42px_32px]" />
        <div className="absolute left-5 top-5 text-[15px] font-bold leading-[19px] max-w-[230px]">
          Tiny interface decisions make a new product easier to trust.
        </div>
        <div className="absolute right-5 bottom-4 rounded-xl bg-white shadow-soft px-3 py-2 text-[9px] text-brand-mute">
          Smart defaults
        </div>
      </div>
    );
  }
  if (kind === "music") {
    return (
      <div className="mx-3 mt-3 h-[132px] rounded-2xl relative overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.85),transparent_22%),linear-gradient(135deg,#eff7e8_0%,#d8ead0_55%,#f8f4e8_100%)]">
        <div className="absolute left-5 top-5 text-[16px] font-bold leading-[20px] max-w-[240px]">
          First week feels easier when the background track is right.
        </div>
        <div className="absolute bottom-4 left-5 flex items-center gap-2 text-[9px] text-brand-mute">
          42 min 路 12 tracks 路 designed for focus
        </div>
      </div>
    );
  }
  return (
    <div className="mx-3 mt-3 h-[132px] rounded-2xl relative overflow-hidden bg-[#fbfaf6]">
      <div className="absolute inset-4 border border-brand-mint/25 bg-white/45" />
      {[1, 2, 3, 4, 5].map((n, index) => (
        <span
          key={n}
          className="absolute h-6 w-6 rounded-full bg-brand-mint text-white text-[10px] font-bold flex items-center justify-center"
          style={{
            left: `${20 + index * 13}%`,
            top: `${34 + (index % 2) * 22}%`,
          }}
        >
          {n}
        </span>
      ))}
      <div className="absolute left-5 top-5 text-[15px] font-bold leading-[19px] max-w-[230px]">
        A quick photo walk can map small familiar landmarks.
      </div>
    </div>
  );
}
