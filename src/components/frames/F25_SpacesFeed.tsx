import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Bot,
  CheckCircle2,
  Heart,
  MessageSquare,
  Send,
  Share2,
  ShieldCheck,
} from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import alexUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import jamesUrl from "@/assets/radar-avatar-3.png";
import sabrinaUrl from "@/assets/radar-avatar-4.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";
import { BottomNav } from "./F09_Home";

const spaceData = {
  AI_SYNTH: {
    name: "AI Synth",
    user: "NODE_NEURAL_72",
    avatar: alexUrl,
    auth: "AI Second Self",
    cover: "from-brand-lavender to-brand-purple",
    body: "Exploration of generative architectural patterns in high-density urban nodes. This draft analyzes the intersection of algorithmic spatial optimization and human navigation logic.",
    tags: ["AI-created", "Source: approved interests", "Spatial thinking"],
    starter:
      "Hi, I am {user}. I am curious about how AI-created identity can stay transparent while still feeling expressive and useful in a new community.",
  },
  DESIGN_SYSTEMS: {
    name: "Design Systems",
    user: "Joe",
    avatar: joeUrl,
    auth: "Human verified",
    cover: "from-brand-sky to-brand-mint",
    body: "A small design note from onboarding: trust often comes from consistent spacing, clear hierarchy, and controls that explain themselves through motion.",
    tags: ["Human post", "Design notes", "Graduate cohort"],
    starter:
      "Hi, I am {user}. I am new here and I would love to trade one design system detail that made onboarding feel clearer.",
  },
  MUSIC_ROOM: {
    name: "Music Room",
    user: "Sabrina",
    avatar: jamesUrl,
    auth: "Human verified",
    cover: "from-brand-pink to-brand-peach",
    body: "First week soundtrack idea: something light enough to focus, warm enough to make a new workspace feel familiar.",
    tags: ["Human post", "Music", "Low-pressure social"],
    starter:
      "Hi, I am {user}. I am building a first-week playlist and would love to hear one track that helps you settle into a new place.",
  },
  PHOTO_WALK: {
    name: "Photo Walk",
    user: "James",
    avatar: sabrinaUrl,
    auth: "AI Second Self",
    cover: "from-brand-peach to-brand-pink",
    body: "A photo walk around the company neighborhood can turn an unfamiliar place into a set of small shared landmarks.",
    tags: ["AI-created", "Photo walk", "Approved interests"],
    starter:
      "Hi, I am {user}. I am trying to learn the area around the office through small visual details. What is one place nearby worth noticing?",
  },
};

type SpaceKey = keyof typeof spaceData;

function readUserName() {
  return window.localStorage.getItem("second-self-user-name")?.trim() || "David";
}

function readSpaceKey(): SpaceKey {
  const stored = window.sessionStorage.getItem("second-self.selected-space");
  return stored && stored in spaceData ? (stored as SpaceKey) : "AI_SYNTH";
}

export function F25_SpacesFeed() {
  const [showComposer, setShowComposer] = useState(false);
  const [approving, setApproving] = useState(false);
  const [composerGone, setComposerGone] = useState(false);
  const spaceKey = readSpaceKey();
  const space = spaceData[spaceKey];
  const userName = readUserName();
  const userAvatar = readGeneratedAvatar() || defaultAvatarUrl;
  const starter = useMemo(() => space.starter.replace("{user}", userName), [space, userName]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowComposer(true), 1000);
    return () => window.clearTimeout(timer);
  }, [spaceKey]);

  const approve = () => {
    setApproving(true);
    window.setTimeout(() => setComposerGone(true), 1700);
  };

  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="px-4 py-3 flex items-center justify-between glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple" data-prototype-back="7:0" />
        <div className="text-[11px] font-bold tracking-[0.6px]">{space.name.toUpperCase()}</div>
        <Bell size={16} className="text-brand-purple" />
      </div>

      <div className="px-5 pt-4">
        <h1 className="text-[22px] font-bold">{space.name} Space</h1>
        <p className="mt-1 text-[12px] text-brand-mute">
          A curated room built from approved interests and transparent identity labels.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Featured", "Human", "AI Second Self", "New starters", "Ideas"].map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full bg-white/86 px-3 py-1.5 text-[10px] font-bold text-brand-purple shadow-sm border border-white"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showComposer && !composerGone && (
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
                onClick={() => setComposerGone(true)}
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
                  animate={{ width: approving ? "100%" : "0%" }}
                  transition={{ duration: 1.55, ease: "easeInOut" }}
                />
                <span className="relative">Approved</span>
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="px-4 mt-4 space-y-3 relative">
        <SpacePost space={space} />
        <SpacePost
          space={{
            ...space,
            user: space.auth === "Human verified" ? "SECOND_SELF_DRAFT" : "Maya",
            avatar: userAvatar,
            auth: space.auth === "Human verified" ? "AI Second Self" : "Human verified",
            body: "I like how this topic makes a new workplace feel less abstract. It gives people a small, safe reason to start talking.",
          }}
        />
      </div>

      <BottomNav active="COMMUNITY" />
    </div>
  );
}

function SpacePost({ space }: { space: (typeof spaceData)[SpaceKey] }) {
  const isAi = space.auth === "AI Second Self";
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-bg"
    >
      <div className="px-3 pt-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-white shadow-sm overflow-hidden flex items-center justify-center">
          <img src={space.avatar} alt="" className="h-[125%] w-[125%] object-cover object-top" />
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-bold tracking-[0.3px]">{space.user}</div>
          <div className="text-[9px] font-mono text-brand-mute">2H AGO</div>
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

      <div
        className={`mx-3 mt-3 h-[132px] rounded-2xl bg-gradient-to-br ${space.cover} relative overflow-hidden`}
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent"
        />
      </div>

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
        <button className="flex items-center gap-1.5">
          <Heart size={13} className="text-brand-pink" /> 1.2K
        </button>
        <button className="flex items-center gap-1.5">
          <MessageSquare size={13} className="text-brand-purple" /> 42
        </button>
        <button className="ml-auto flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-ink">
          <Share2 size={12} /> REF: #{isAi ? "772-BX" : "ORIG-19"}
        </button>
        <button className="flex items-center gap-1 text-[9px] font-bold text-brand-purple">
          <Send size={11} /> Share
        </button>
      </div>
    </motion.div>
  );
}
