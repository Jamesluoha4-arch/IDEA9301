import { motion } from "framer-motion";
import { Bell, BriefcaseBusiness, CheckCircle2, Lock, Sparkles } from "lucide-react";
import alexUrl from "@/assets/candidate-alex.svg";
import miaUrl from "@/assets/candidate-mia.svg";
import noraUrl from "@/assets/candidate-nora.svg";
import samUrl from "@/assets/candidate-sam.svg";
import { BottomNav } from "./F09_Home";

const candidates = [
  {
    name: "Alex",
    role: "company coworker",
    match: "92%",
    size: 76,
    distance: 132,
    angle: 18,
    duration: 34,
    img: alexUrl,
    ring: "from-brand-purple to-brand-pink",
  },
  {
    name: "Mia",
    role: "design intern",
    match: "74%",
    size: 52,
    distance: 104,
    angle: 132,
    duration: 42,
    img: miaUrl,
    ring: "from-brand-mint to-brand-sky",
  },
  {
    name: "Sam",
    role: "same community",
    match: "61%",
    size: 44,
    distance: 118,
    angle: 224,
    duration: 48,
    img: samUrl,
    ring: "from-brand-peach to-brand-pink",
  },
  {
    name: "Nora",
    role: "shared topic",
    match: "48%",
    size: 36,
    distance: 82,
    angle: 292,
    duration: 38,
    img: noraUrl,
    ring: "from-brand-sky to-brand-mint",
  },
];

export function F10_Social() {
  return (
    <div className="relative w-full h-full pt-12 pb-20 font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-2">
        <h1 className="text-[24px] font-bold tracking-[-0.5px]">Social</h1>
        <div className="mt-4 flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-full gradient-brand text-white text-[12px] font-bold shadow-soft">
            Conversations
          </button>
          <button className="px-4 py-1.5 rounded-full bg-white border border-brand-bg text-[12px] font-bold">
            Spaces
          </button>
          <div className="ml-auto w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center">
            <Bell size={15} className="text-brand-purple" />
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-[18px] font-bold leading-[24px]">
            I am searching for
            <br />
            <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
              people you may like
            </span>
          </h2>
          <p className="text-[11px] text-brand-mute mt-1.5">
            Ranked by approved company context.
            <br />
            Larger circles mean stronger possibility.
          </p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white border border-brand-bg text-[10px] flex items-center gap-1 mt-1 text-brand-purple font-bold">
          <CheckCircle2 size={10} /> Approved only
        </div>
      </div>

      <div className="mx-5 mt-4 h-[280px] rounded-3xl bg-white shadow-soft relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand-soft opacity-60" />
        {[1, 0.72, 0.45, 0.24].map((s, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border-2 border-dashed border-brand-lavender/35"
            style={{ width: 250 * s, height: 250 * s, marginLeft: -125 * s, marginTop: -125 * s }}
            animate={{ opacity: [0.22, 0.7, 0.22], scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 3.2 + i * 0.45, repeat: Infinity, delay: i * 0.35 }}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center shadow-glow"
          >
            <BriefcaseBusiness size={22} className="text-white" strokeWidth={2} />
          </motion.div>
          <div className="text-[9px] font-bold text-brand-purple">Your AI</div>
        </div>

        <motion.div
          className="absolute top-[34px] left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white shadow border border-brand-mint/40 text-[9px] flex items-center gap-1 text-brand-ink font-medium z-30"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <CheckCircle2 size={9} className="text-brand-mint" /> searching company signals
        </motion.div>

        {candidates.map((person, index) => (
          <OrbitingCandidate key={person.name} person={person} index={index} />
        ))}

        <div className="absolute bottom-[34px] left-6 flex flex-col items-center z-30">
          <div className="w-9 h-9 rounded-full border-2 border-dashed border-brand-mute flex items-center justify-center bg-white">
            <Lock size={12} className="text-brand-mute" />
          </div>
          <div className="text-[8px] text-brand-mute mt-0.5">private locked</div>
        </div>
      </div>

      <div className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-brand-purple" />
          <div className="text-[9px] tracking-[0.6px] text-brand-purple font-bold">
            STRONGEST POSSIBILITY FOUND
          </div>
        </div>
        <div className="mt-1.5 text-[14px] font-bold">Alex · possible company coworker</div>
        <div className="text-[11px] text-brand-mute mt-1">
          Same workplace context · shared onboarding signal · draft ready
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -1 }}
          className="mt-3 w-full py-3 rounded-full gradient-brand text-white text-[13px] font-bold shadow-soft"
        >
          Review path
        </motion.button>
      </div>

      <BottomNav active="CHAT" />
    </div>
  );
}

function OrbitingCandidate({
  person,
  index,
}: {
  person: (typeof candidates)[number];
  index: number;
}) {
  const x = Math.cos((person.angle * Math.PI) / 180) * person.distance;
  const y = Math.sin((person.angle * Math.PI) / 180) * person.distance;
  const isAlex = person.name === "Alex";

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={{
        width: person.distance * 2,
        height: person.distance * 2,
        marginLeft: -person.distance,
        marginTop: -person.distance,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{
        opacity: { duration: 0.45, delay: 0.75 + index * 0.55 },
        rotate: { duration: person.duration, repeat: Infinity, ease: "linear" },
      }}
    >
      <motion.div
        className="absolute"
        style={{
          left: person.distance + x - person.size / 2,
          top: person.distance + y - person.size / 2,
          width: person.size,
          height: person.size,
        }}
        initial={{ scale: 0.45 }}
        animate={{ scale: isAlex ? [1, 1.06, 1] : [1, 1.03, 1] }}
        transition={{
          scale: {
            duration: 2.4 + index * 0.3,
            repeat: Infinity,
            delay: 0.75 + index * 0.55,
          },
        }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotate: -360 }}
          transition={{ duration: person.duration, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className={`absolute -inset-1 rounded-full bg-gradient-to-br ${person.ring} opacity-45 blur-sm`}
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <div className="relative h-full w-full rounded-full bg-white border-[3px] border-white shadow-soft overflow-hidden flex items-center justify-center">
            <img src={person.img} alt="" className="h-[118%] w-[118%] object-cover object-top" />
          </div>
          <motion.div
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white border shadow px-2 py-1 text-center ${
              isAlex ? "-bottom-12 border-brand-purple/30" : "-bottom-8 border-brand-bg"
            }`}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          >
            <div className={`${isAlex ? "text-[10px]" : "text-[8px]"} font-bold text-brand-ink`}>
              {person.name} · {person.match}
            </div>
            {isAlex && <div className="text-[8px] text-brand-purple font-bold">{person.role}</div>}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
