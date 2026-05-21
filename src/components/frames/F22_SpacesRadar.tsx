import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Bot, Camera, CheckCircle2, Code2, Music, Sparkles, Users } from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import alexUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import jamesUrl from "@/assets/radar-avatar-3.png";
import sabrinaUrl from "@/assets/radar-avatar-4.png";
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
    avatar: alexUrl,
    user: "NODE_NEURAL_72",
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
    avatar: jamesUrl,
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
    avatar: sabrinaUrl,
    user: "James",
    certification: "AI Second Self",
    post: "A quick photo walk around the office can turn a new place into a map of small familiar landmarks.",
    tags: ["AI-created", "Source: approved interests"],
    g: "from-brand-lavender to-brand-purple",
    angle: 136,
  },
];

type SpaceTopic = (typeof spaceTopics)[number];

export function F22_SpacesRadar() {
  const [visibleNodes, setVisibleNodes] = useState(false);
  const [showSignal, setShowSignal] = useState(false);
  const [selected, setSelected] = useState<SpaceTopic>(spaceTopics[0]);
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
  };

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
            <p className="text-[11px] text-brand-mute mt-1.5">
              Approved interests only.
              <br />
              Tap any topic to preview the space.
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center">
            <Bell size={15} className="text-brand-purple" />
          </div>
        </div>

        <div className="mx-5 mt-4 h-[330px] rounded-3xl bg-white/84 shadow-soft relative overflow-hidden border border-white/80">
          <div className="absolute inset-0 gradient-brand-soft opacity-65" />
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

          {visibleNodes &&
            spaceTopics.map((topic, index) => (
              <SpaceNode
                key={topic.key}
                topic={topic}
                index={index}
                selected={selected.key === topic.key}
                onChoose={() => chooseTopic(topic)}
              />
            ))}
        </div>

        {showSignal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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
              data-prototype-target="7:3"
              data-prototype-space={selected.key}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
              className="mt-3 w-full py-3 rounded-full gradient-brand text-white text-[13px] font-bold shadow-soft"
            >
              Explore
            </motion.button>
          </motion.div>
        )}
      </div>

      <BottomNav active="COMMUNITY" />
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
        <span className="h-8 w-8 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center">
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
      <div className={`mt-3 h-[82px] rounded-2xl bg-gradient-to-br ${topic.g} opacity-70`} />
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
