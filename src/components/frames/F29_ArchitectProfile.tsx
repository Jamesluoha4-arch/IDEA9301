import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import jimUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import sabrinaUrl from "@/assets/radar-avatar-3.png";
import jamesUrl from "@/assets/radar-avatar-4.png";

const profiles = {
  Jim: {
    avatar: jimUrl,
    role: "Possible coworker",
    location: "Onboarding Circle",
    level: "New Starter Match",
    interests: ["onboarding", "quiet-start", "workplace-notes", "coffee-chat"],
    activity: [
      "Posted a safe opener about comparing onboarding notes.",
      "Replied to a new starter thread with a low-pressure suggestion.",
      "Approved one AI-assisted introduction draft.",
    ],
  },
  Joe: {
    avatar: joeUrl,
    role: "Possible design buddy",
    location: "Design Systems",
    level: "Human Verified",
    interests: ["product-craft", "trust-patterns", "graduate-design", "interfaces"],
    activity: [
      "Published a note about tiny interface decisions.",
      "Commented on a trust and transparency thread.",
      "Saved a design resource for the onboarding cohort.",
    ],
  },
  Sabrina: {
    avatar: sabrinaUrl,
    role: "Music Room host",
    location: "Music Room",
    level: "Human Verified",
    interests: ["playlist", "focus", "first-week", "small-wins"],
    activity: [
      "Shared a first-week focus playlist.",
      "Replied to a starter note about quiet work rituals.",
      "Liked a post about warm introductions.",
    ],
  },
  James: {
    avatar: jamesUrl,
    role: "Photo Walk neighbor",
    location: "Photo Walk",
    level: "AI Second Self",
    interests: ["photo-walk", "office-map", "landmarks", "observation"],
    activity: [
      "Posted an AI-assisted note about mapping small office landmarks.",
      "Commented on a shared observation route.",
      "Saved a prompt for noticing useful places nearby.",
    ],
  },
};

type ProfileName = keyof typeof profiles;

function readProfile(): ProfileName {
  if (typeof window === "undefined") return "Jim";
  const candidate = window.sessionStorage.getItem("second-self.selected-candidate");
  const space = window.sessionStorage.getItem("second-self.selected-profile");
  const value = space || candidate || "Jim";
  return value in profiles ? (value as ProfileName) : "Jim";
}

export function F29_ArchitectProfile() {
  const name = readProfile();
  const profile = profiles[name];

  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="px-4 py-3 flex items-center justify-between glass border-b border-brand-bg sticky top-0 z-20">
        <button
          data-prototype-back="7:1"
          className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-brand-purple" />
        </button>
        <div className="text-[11px] font-bold tracking-[0.6px]">PROFILE</div>
        <Bell size={16} className="text-brand-purple" />
      </div>

      <div className="px-5 pt-5 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-[112px] h-[112px] rounded-[32px] bg-white shadow-glow flex items-center justify-center border-[6px] border-[#f1edff]"
        >
          <img src={profile.avatar} alt="" className="h-[124%] w-[124%] object-cover object-top" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-brand-ink text-white text-[8px] font-bold flex items-center gap-1 whitespace-nowrap">
            <ShieldCheck size={9} /> {profile.level}
          </div>
        </motion.div>
        <h1 className="mt-5 text-[24px] font-bold tracking-[-0.3px]">
          {name}{" "}
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
        <div className="mt-1 text-[12px] text-brand-mute">{profile.role}</div>
      </div>

      <div className="mx-5 mt-4 grid grid-cols-2 gap-2">
        <div className="bg-white rounded-2xl p-3 shadow-soft border border-brand-bg">
          <div className="text-[9px] font-bold tracking-[0.5px] text-brand-mute flex items-center gap-1">
            <MapPin size={10} /> LOCATION
          </div>
          <div className="text-[12px] font-bold mt-0.5">{profile.location}</div>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-soft border border-brand-bg">
          <div className="text-[9px] font-bold tracking-[0.5px] text-brand-mute flex items-center gap-1">
            <Briefcase size={10} /> AUTH LEVEL
          </div>
          <div className="text-[12px] font-bold mt-0.5">{profile.level}</div>
        </div>
      </div>

      <div className="mx-5 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-brand-purple" />
          <div className="text-[14px] font-bold">Shared signals</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {profile.interests.map((item, i) => (
            <motion.div
              key={item}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.04 * i }}
              className="px-2.5 py-1 rounded-lg gradient-brand-soft border border-brand-lavender/30 text-[10px] font-bold text-brand-purple"
            >
              #{item}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock size={14} className="text-brand-purple" />
          <div className="text-[14px] font-bold">Past activity</div>
        </div>
        <div className="space-y-2">
          {profile.activity.map((item, i) => (
            <motion.div
              key={item}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white rounded-2xl p-3 shadow-soft border border-brand-bg"
            >
              <div className="text-[9px] font-mono text-brand-mute tracking-[0.4px]">
                {i === 0 ? "TODAY" : "THIS WEEK"}
              </div>
              <div className="text-[12px] leading-[16px] font-semibold mt-1">{item}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        data-prototype-target="1:6"
        data-prototype-person={name}
        className="mx-5 mt-5 w-[calc(100%-2.5rem)] h-12 rounded-full gradient-brand text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-soft"
      >
        <MessageCircle size={16} />
        Start private chat
      </button>
    </div>
  );
}
