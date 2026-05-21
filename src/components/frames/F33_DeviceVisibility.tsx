import { motion } from "framer-motion";
import {
  Maximize2,
  Mic,
  MapPin,
  HardDrive,
  Bluetooth,
  Camera,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { BottomNav } from "./F09_Home";
import deviceLayers from "@/assets/device-layers.png";

const access = [
  {
    Icon: Mic,
    t: "Microphone",
    d: "Used for conversation tone adaptation",
    time: "now",
    g: "from-brand-purple to-brand-lavender",
    active: true,
  },
  {
    Icon: MapPin,
    t: "Location",
    d: "Used for nearby social recommendations",
    time: "12 min ago",
    g: "from-brand-sky to-brand-mint",
    active: true,
  },
  {
    Icon: HardDrive,
    t: "Storage",
    d: "Accessing shared memory archive",
    time: "16 min ago",
    g: "from-brand-pink to-brand-peach",
  },
  {
    Icon: Bluetooth,
    t: "Bluetooth",
    d: "Detecting nearby trusted devices",
    time: "23 min ago",
    g: "from-brand-lavender to-brand-pink",
  },
  {
    Icon: Camera,
    t: "Camera",
    d: "Currently inactive",
    time: "today",
    g: "from-brand-mute to-brand-mute",
    inactive: true,
  },
];

const recent = [
  {
    t: "12:42",
    b: "AI used microphone during private conversation",
    Icon: Mic,
    c: "text-brand-purple",
  },
  {
    t: "12:18",
    b: "Location accessed for nearby social event recommendation",
    Icon: MapPin,
    c: "text-brand-sky",
  },
  {
    t: "11:54",
    b: "Shared memory archive opened during reconnection flow",
    Icon: HardDrive,
    c: "text-brand-pink",
  },
  {
    t: "10:37",
    b: "Camera briefly activated during collaborative memory sharing",
    Icon: Camera,
    c: "text-brand-mint",
  },
];

export function F33_DeviceVisibility() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-2">
        <div className="text-[13px] font-bold tracking-[0.4px]">DEVICE ACCESS</div>
        <div className="text-[10px] text-brand-mute mt-1">
          See which device signals I used, and why.
        </div>
      </div>

      <div className="mx-5 mt-4 bg-brand-ink rounded-full p-1 flex">
        <button className="flex-1 py-2 rounded-full text-white text-[12px] font-bold">
          AI Activity
        </button>
        <button className="flex-1 py-2 rounded-full bg-white text-brand-ink text-[12px] font-bold">
          Device Access
        </button>
      </div>

      {/* Hero card with uploaded image */}
      <motion.div
        whileHover={{ y: -2 }}
        className="mx-5 mt-4 rounded-3xl overflow-hidden shadow-glow border border-brand-bg relative bg-white"
      >
        <div className="relative h-[230px] overflow-hidden">
          <img
            src={deviceLayers}
            alt="Device layers"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-white/95" />
          <div className="relative p-4">
            <div className="text-[9px] font-bold tracking-[0.6px] text-brand-purple">
              DEVICE PRESENCE OVERVIEW
            </div>
            <div className="mt-1 text-[18px] font-bold leading-[22px] max-w-[230px] text-brand-ink">
              I only access devices when{" "}
              <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
                there is a clear purpose
              </span>
            </div>
            <Maximize2 size={14} className="absolute top-4 right-4 text-brand-ink" />
          </div>
        </div>
        <div className="px-4 py-3 text-center text-[11px] text-brand-mute">
          You can pause any device signal at any time.
        </div>
      </motion.div>

      <div className="px-5 mt-4 text-[14px] font-bold">Active access</div>
      <div className="px-5 text-[10px] text-brand-mute">
        Each item shows the reason it was used.
      </div>

      <div className="mx-5 mt-2 space-y-2">
        {access.map((a, i) => (
          <motion.div
            key={a.t}
            initial={{ x: -6, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.04 * i }}
            className="bg-white rounded-2xl px-3 py-2.5 shadow-soft border border-brand-bg flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${a.g} flex items-center justify-center relative`}
            >
              <a.Icon
                size={15}
                className={a.inactive ? "text-brand-mute" : "text-white"}
                strokeWidth={2}
              />
              {a.active && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-mint"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold">{a.t}</div>
              <div className="text-[9px] text-brand-mute leading-[12px]">{a.d}</div>
            </div>
            <div className="text-[10px] text-brand-mute font-mono">{a.time}</div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 mt-4 text-[14px] font-bold">Recent access history</div>
      <div className="mx-5 mt-2 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
        {recent.map((r) => (
          <div key={r.t} className="px-3 py-2.5 flex items-center gap-2.5">
            <r.Icon size={13} className={r.c} />
            <div className="text-[10px] font-mono text-brand-purple font-bold w-[34px]">{r.t}</div>
            <div className="flex-1 text-[11px] leading-[14px]">{r.b}</div>
            <ChevronRight size={12} className="text-brand-mute" />
          </div>
        ))}
      </div>

      <div className="mx-5 mt-3 mb-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-brand-purple" />{" "}
          <div className="text-[12px] font-bold">Access summary</div>
        </div>
        <div className="text-[11px] text-brand-mute mt-1.5 leading-[15px]">
          Most access supported conversation preparation. Nothing was sent automatically.
        </div>
        <div className="mt-3 flex gap-2">
          <button className="px-4 py-2 rounded-full bg-brand-ink text-white text-[11px] font-bold">
            View Details
          </button>
          <button className="px-4 py-2 rounded-full bg-white border border-brand-bg text-[11px] font-bold">
            Adjust Visibility
          </button>
        </div>
      </div>

      <BottomNav active="PRESENCE" />
    </div>
  );
}
