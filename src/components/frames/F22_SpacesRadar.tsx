import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bot,
  Camera,
  CheckCircle2,
  Clock3,
  Code2,
  Music,
  RefreshCw,
} from "lucide-react";
import defaultAvatarUrl from "@/assets/default-ai-self.svg";
import JimUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import sabrinaUrl from "@/assets/radar-avatar-3.png";
import jamesUrl from "@/assets/radar-avatar-4.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";
import { BottomNav } from "./F09_Home";

const spaceTopics = [
  {
    key: "AI_SYNTH",
    name: "AI Synth",
    title: "AI Synth - safe space opening",
    intro:
      "A space for people exploring AI-created identity, synthetic media, and responsible creative systems.",
    signal: "AI-assisted creation - transparent identity - draft ready",
    Icon: Bot,
    avatar: JimUrl,
    user: "Jim",
    certification: "AI Second Self",
    post: "Exploration of generative architectural patterns in high-density urban nodes. This draft analyzes the intersection of algorithmic spatial optimization and human navigation logic.",
    tags: ["AI-created", "Approved interests"],
    g: "from-brand-purple to-brand-pink",
    angle: 215,
  },
  {
    key: "DESIGN_SYSTEMS",
    name: "Design Systems",
    title: "Design Systems - visual thinking match",
    intro:
      "A calm room for graduate designers comparing patterns, onboarding resources, and product craft.",
    signal: "Shared design interests - portfolio overlap - intro ready",
    Icon: Code2,
    avatar: joeUrl,
    user: "Joe",
    certification: "Human verified",
    post: "I am collecting tiny interface decisions that make a new product feel easier to trust. The best ones are almost invisible until you need them.",
    tags: ["Human post", "Design notes"],
    g: "from-brand-sky to-brand-mint",
    angle: 314,
  },
  {
    key: "MUSIC_ROOM",
    name: "Music Room",
    title: "Music Room - low-pressure social cue",
    intro:
      "A warm community for sharing playlists, show memories, and first-week energy without forcing conversation.",
    signal: "Shared taste signal - casual opening - preview ready",
    Icon: Music,
    avatar: sabrinaUrl,
    user: "Sabrina",
    certification: "Human verified",
    post: "First week feels easier when the background track is right. I am building a starter playlist for quiet focus and small wins.",
    tags: ["Human post", "Music"],
    g: "from-brand-pink to-brand-peach",
    angle: 44,
  },
  {
    key: "PHOTO_WALK",
    name: "Photo Walk",
    title: "Photo Walk - shared observation space",
    intro:
      "A space for noticing the company neighborhood through photos, light, materials, and small discoveries.",
    signal: "Adjacent company context - outdoor interest - warm note ready",
    Icon: Camera,
    avatar: jamesUrl,
    user: "James",
    certification: "AI Second Self",
    post: "A quick photo walk around the office can turn a new place into a map of small familiar landmarks.",
    tags: ["AI-created", "Source: approved interests"],
    g: "from-brand-lavender to-brand-purple",
    angle: 136,
  },
];

type SpaceTopic = (typeof spaceTopics)[number];
type ActivityPost = { spaceName: string; body: string; time: string };

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

function recordViewedSpace(key: string) {
  const next = Array.from(new Set([key, ...readViewedSpaceKeys()])).slice(0, 4);
  window.sessionStorage.setItem(viewedSpacesKey, JSON.stringify(next));
}

function readActivityPosts(): ActivityPost[] {
  if (typeof window === "undefined") return [];
  return spaceTopics.flatMap((topic) => {
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(`second-self.posts.${topic.key}`) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.map((post) => ({
        spaceName: topic.name,
        body: String(post.body || post.starter || "New approved post"),
        time: String(post.time || "JUST NOW"),
      }));
    } catch {
      return [];
    }
  });
}

export function F22_SpacesRadar() {
  const [visibleNodes, setVisibleNodes] = useState(false);
  const [showSignal, setShowSignal] = useState(false);
  const [selected, setSelected] = useState<SpaceTopic>(spaceTopics[0]);
  const [refreshCycle, setRefreshCycle] = useState(0);
  const [toast, setToast] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const userAvatar = readGeneratedAvatar() || defaultAvatarUrl;

  useEffect(() => {
    const nodesTimer = window.setTimeout(() => setVisibleNodes(true), 450);
    const signalTimer = window.setTimeout(() => setShowSignal(true), 2600);
    window.sessionStorage.setItem("second-self.selected-space", spaceTopics[0].key);
    return () => {
      window.clearTimeout(nodesTimer);
      window.clearTimeout(signalTimer);
    };
  }, []);

  const chooseTopic = (topic: SpaceTopic) => {
    setSelected(topic);
    setShowSignal(true);
    window.sessionStorage.setItem("second-self.selected-space", topic.key);
    recordViewedSpace(topic.key);
  };

  const refreshSpaces = () => {
    if (refreshing) return;
    setRefreshing(true);
    setToast("No more availability for now.");
    setVisibleNodes(false);
    setShowSignal(false);
    window.setTimeout(() => {
      setRefreshCycle((value) => value + 1);
      setVisibleNodes(true);
      setShowSignal(true);
      setRefreshing(false);
    }, 500);
    window.setTimeout(() => setToast(""), 1000);
  };

  if (showActivities) {
    return <ActivityHistory onBack={() => setShowActivities(false)} />;
  }

  return (
    <div className="relative w-full h-full font-sans text-brand-ink gradient-brand-soft overflow-hidden">
      <div className="absolute inset-0 overflow-y-auto pt-16 pb-28 prototype-scroll">
        <div className="px-5 flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[18px] font-bold leading-[24px]">
              I am finding
              <br />
              <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
                spaces that may surprise you
              </span>
            </h2>
            <p className="text-[11px] text-brand-mute mt-1.5">Tap any topic to preview the space.</p>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowActivities(true)}
              className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"
              aria-label="View activity history"
            >
              <Clock3 size={15} className="text-brand-purple" />
            </button>
            <button
              type="button"
              data-prototype-target="7:3"
              className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell size={15} className="text-brand-purple" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="absolute left-5 right-5 top-[92px] z-50 rounded-2xl border border-white/80 bg-white/92 px-4 py-2 text-center text-[11px] font-bold text-brand-purple shadow-soft backdrop-blur-xl"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-5 mt-4 h-[330px] rounded-3xl bg-white/84 shadow-soft relative overflow-hidden border border-white/80">
          <div className="absolute inset-0 gradient-brand-soft opacity-65" />
          <button
            type="button"
            onClick={refreshSpaces}
            className="absolute right-4 top-4 z-40 w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"
            aria-label="Refresh spaces"
          >
            <motion.span
              animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <RefreshCw size={15} className="text-brand-purple" />
            </motion.span>
          </button>
          {[1, 0.72, 0.45, 0.24].map((s, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full border-2 border-dashed border-brand-lavender/35"
              style={{
                width: 260 * s,
                height: 260 * s,
                marginLeft: -130 * s,
                marginTop: -130 * s,
              }}
              animate={{ opacity: [0.18, 0.68, 0.18], scale: [0.96, 1.06, 0.96] }}
              transition={{ duration: 3.1 + i * 0.42, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}

          <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="relative w-20 h-20 rounded-full bg-white shadow-glow flex items-center justify-center border-[6px] border-[#f1edff]"
            >
              <motion.span
                className="absolute inset-[-12px] rounded-full border border-brand-purple/18"
                animate={{ scale: [0.86, 1.42, 0.86], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
              <img
                src={userAvatar}
                alt=""
                className="relative h-[70px] w-[70px] rounded-full object-cover object-top"
              />
            </motion.div>
            <div className="mt-2 px-3 py-1 rounded-full bg-brand-ink text-white text-[9px] font-bold">
              YOUR AI SPACE CORE
            </div>
          </div>

          <AnimatePresence>
            {visibleNodes &&
            spaceTopics.map((topic, index) => (
              <SpaceNode
                key={`${refreshCycle}-${topic.key}`}
                topic={topic}
                index={index}
                selected={selected.key === topic.key}
                onChoose={() => chooseTopic(topic)}
              />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showSignal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={11} className="text-brand-mint" />
              <div className="text-[9px] tracking-[0.6px] text-brand-purple font-bold">
                SPACE SIGNAL FOUND
              </div>
            </div>
            <div className="mt-1 text-[14px] font-bold">{selected.title}</div>
            <div className="text-[11px] text-brand-mute mt-0.5">{selected.intro}</div>
            <PostPreview topic={selected} />
            <motion.button
              type="button"
              data-prototype-target="7:1"
              data-prototype-space={selected.key}
              onPointerDown={() => {
                recordViewedSpace(selected.key);
              }}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
              className="mt-3 w-full py-3 rounded-full gradient-brand text-white text-[13px] font-bold shadow-soft"
            >
              Explore
            </motion.button>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <BottomNav active="COMMUNITY" />
    </div>
  );
}

function ActivityHistory({ onBack }: { onBack: () => void }) {
  const viewed = readViewedSpaceKeys()
    .map((key) => spaceTopics.find((topic) => topic.key === key))
    .filter(Boolean) as SpaceTopic[];
  const posts = readActivityPosts();

  return (
    <div className="relative h-full w-full overflow-y-auto pb-24 pt-12 font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="sticky top-0 z-20 border-b border-white/70 bg-white/60 px-5 pb-3 pt-3 backdrop-blur-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-purple shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="text-[24px] font-bold">Activities</div>
        <div className="mt-1 text-[11px] leading-[15px] text-brand-mute">
          Review spaces you visited and posts your Second Self prepared with your approval.
        </div>
      </div>

      <div className="mx-4 mt-4 space-y-4">
        <section className="rounded-[28px] border border-white bg-white/82 p-4 shadow-soft backdrop-blur-xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
            Viewed spaces
          </div>
          <div className="mt-3 space-y-2">
            {viewed.length ? (
              viewed.map((space) => (
                <div key={space.key} className="rounded-2xl bg-brand-bg/60 px-3 py-2.5">
                  <div className="text-[12px] font-bold">{space.name} Space</div>
                  <div className="mt-0.5 text-[10px] leading-[14px] text-brand-mute">
                    {space.intro}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-brand-bg/50 px-3 py-3 text-[11px] font-bold text-brand-mute">
                No spaces viewed yet.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-white bg-white/82 p-4 shadow-soft backdrop-blur-xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple">
            Your posts
          </div>
          <div className="mt-3 space-y-2">
            {posts.length ? (
              posts.map((post, index) => (
                <div
                  key={`${post.spaceName}-${index}`}
                  className="rounded-2xl bg-white px-3 py-3 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[12px] font-bold">{post.spaceName}</div>
                    <div className="text-[9px] font-bold text-brand-purple">{post.time}</div>
                  </div>
                  <div className="mt-1 text-[10px] leading-[14px] text-brand-mute">
                    {post.body}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-brand-bg/50 px-3 py-3 text-[11px] font-bold text-brand-mute">
                No posts published yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function SpaceNode({
  topic,
  index,
  selected,
  onChoose,
}: {
  topic: SpaceTopic;
  index: number;
  selected: boolean;
  onChoose: () => void;
}) {
  const radius = topic.key === "AI_SYNTH" ? 118 : 110;
  const x = Math.cos((topic.angle * Math.PI) / 180) * radius;
  const y = Math.sin((topic.angle * Math.PI) / 180) * radius;
  const Icon = topic.Icon;

  return (
    <motion.button
      type="button"
      onClick={onChoose}
      initial={{ opacity: 0, scale: 0.45, x: 0, y: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [x, x + 8, x - 6, x],
        y: [y, y - 6, y + 8, y],
      }}
      transition={{
        opacity: { duration: 0.45, delay: index * 0.36 },
        scale: { duration: 0.45, delay: index * 0.36 },
        x: { duration: 6.8 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.36 },
        y: { duration: 7.6 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.36 },
      }}
      exit={{ opacity: 0, scale: 0.42, x: 0, y: 0 }}
      className="absolute left-1/2 top-1/2 z-30 flex h-[64px] w-[84px] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
    >
      <span
        className={`h-[52px] w-[52px] rounded-full border-[3px] border-white bg-gradient-to-br ${topic.g} shadow-soft flex items-center justify-center ${
          selected ? "ring-4 ring-brand-purple/20" : ""
        }`}
      >
        <Icon size={21} className="text-white" />
      </span>
      <span className="mt-1 rounded-full bg-white/85 px-2 py-0.5 text-[8px] font-bold text-brand-ink shadow-sm whitespace-nowrap">
        {topic.name}
      </span>
    </motion.button>
  );
}

function PostPreview({ topic }: { topic: SpaceTopic }) {
  return (
    <div className="mt-3 rounded-2xl border border-brand-bg bg-white/80 p-3 shadow-[0_8px_20px_rgba(108,92,231,0.06)]">
      <div className="flex items-center gap-2">
        <span
          data-prototype-target="7:4"
          data-prototype-person={topic.user}
          className="h-8 w-8 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <img src={topic.avatar} alt="" className="h-[125%] w-[125%] object-cover object-top" />
        </span>
        <span className="flex-1">
          <span className="block text-[11px] font-bold">{topic.user}</span>
          <span className="block text-[8px] text-brand-mute">2H AGO</span>
        </span>
        <span className="rounded-full bg-brand-bg px-2 py-1 text-[8px] font-bold text-brand-purple">
          {topic.certification}
        </span>
      </div>
      <SpaceCover topicKey={topic.key} compact />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {topic.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-brand-bg px-2 py-0.5 text-[8px] font-bold text-brand-purple"
          >
            [{tag}]
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-[14px] text-brand-ink">{topic.post}</p>
    </div>
  );
}

function SpaceCover({ topicKey, compact = false }: { topicKey: string; compact?: boolean }) {
  const height = compact ? "h-[82px]" : "h-[132px]";
  if (topicKey === "AI_SYNTH") {
    return (
      <div
        className={`mt-3 ${height} rounded-2xl overflow-hidden relative bg-[radial-gradient(circle_at_62%_44%,rgba(167,139,250,0.8),transparent_18%),linear-gradient(135deg,#142035_0%,#2d3153_45%,#9279e8_100%)]`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:18px_18px] opacity-40" />
        <div className="absolute left-4 top-4 w-[58%] text-white">
          <div className="text-[14px] font-bold leading-[17px]">
            AI-created identity,
            <br />
            transparent systems.
          </div>
          <div className="mt-1 text-[7px] text-white/75">Create. Collaborate. Reflect.</div>
        </div>
        <div className="absolute right-4 top-4 h-14 w-14 rounded-full border border-white/35 bg-white/10 backdrop-blur flex items-center justify-center">
          <Bot size={22} className="text-white" />
        </div>
      </div>
    );
  }
  if (topicKey === "DESIGN_SYSTEMS") {
    return (
      <div className={`mt-3 ${height} rounded-2xl bg-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,46,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(31,31,46,0.08)_1px,transparent_1px)] bg-[length:42px_32px]" />
        <div className="absolute left-4 top-4 text-[12px] font-bold leading-[16px] max-w-[160px]">
          Tiny interface decisions that make trust visible.
        </div>
        <div className="absolute right-5 bottom-4 rounded-xl bg-white shadow-soft px-3 py-2 text-[8px] text-brand-mute">
          Smart defaults
        </div>
      </div>
    );
  }
  if (topicKey === "MUSIC_ROOM") {
    return (
      <div
        className={`mt-3 ${height} rounded-2xl relative overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.85),transparent_22%),linear-gradient(135deg,#eff7e8_0%,#d8ead0_55%,#f8f4e8_100%)]`}
      >
        <div className="absolute left-4 top-4 text-[13px] font-bold leading-[17px] max-w-[165px]">
          First week feels easier when the background track is right.
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[8px] text-brand-mute">
          <Music size={12} /> 42 min 路 12 tracks
        </div>
      </div>
    );
  }
  return (
    <div className={`mt-3 ${height} rounded-2xl relative overflow-hidden bg-[#fbfaf6]`}>
      <div className="absolute inset-4 border border-brand-mint/25 bg-white/45" />
      {[1, 2, 3, 4, 5].map((n, index) => (
        <span
          key={n}
          className="absolute h-5 w-5 rounded-full bg-brand-mint text-white text-[9px] font-bold flex items-center justify-center"
          style={{
            left: `${20 + index * 13}%`,
            top: `${34 + (index % 2) * 22}%`,
          }}
        >
          {n}
        </span>
      ))}
      <div className="absolute left-4 top-4 text-[13px] font-bold leading-[17px] max-w-[175px]">
        A quick photo walk can map small familiar landmarks.
      </div>
    </div>
  );
}
