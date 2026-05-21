import { motion } from "framer-motion";
import { BriefcaseBusiness, CheckCircle2, Lock, Sparkles } from "lucide-react";
import JimUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import jamesUrl from "@/assets/radar-avatar-3.png";
import sabrinaUrl from "@/assets/radar-avatar-4.png";
import { BottomNav } from "./F09_Home";

const candidates = [
  {
    name: "Jim",
    role: "company coworker",
    signal: "Same workplace context - shared onboarding signal - draft ready",
    match: "92%",
    size: 76,
    distance: 132,
    angle: 18,
    duration: 34,
    img: JimUrl,
    ring: "from-brand-purple to-brand-pink",
  },
  {
    name: "Joe",
    role: "possible design buddy",
    signal: "Shared graduate cohort - similar portfolio interests - intro ready",
    match: "74%",
    size: 52,
    distance: 104,
    angle: 132,
    duration: 42,
    img: joeUrl,
    ring: "from-brand-mint to-brand-sky",
  },
  {
    name: "Sabrina",
    role: "possible community match",
    signal: "Same company space - lunch group overlap - topic idea ready",
    match: "61%",
    size: 44,
    distance: 118,
    angle: 224,
    duration: 48,
    img: jamesUrl,
    ring: "from-brand-peach to-brand-pink",
  },
  {
    name: "James",
    role: "possible project neighbor",
    signal: "Adjacent team context - shared onboarding task - warm note ready",
    match: "48%",
    size: 36,
    distance: 82,
    angle: 292,
    duration: 38,
    img: sabrinaUrl,
    ring: "from-brand-sky to-brand-mint",
  },
];

export function F10_Social() {
  return (
    <div className="relative w-full h-full font-sans text-brand-ink gradient-brand-soft overflow-hidden">
      <div className="absolute inset-0 overflow-y-auto pt-16 pb-28 prototype-scroll">
        <div className="px-5 flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[18px] font-bold leading-[24px]">
              I am searching for
              <br />
              <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
                people who may surprise you
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
              style={{
                width: 250 * s,
                height: 250 * s,
                marginLeft: -125 * s,
                marginTop: -125 * s,
              }}
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
            <RadarCandidate key={person.name} person={person} index={index} />
          ))}

          <div className="absolute bottom-[34px] left-6 flex flex-col items-center z-30">
            <div className="w-9 h-9 rounded-full border-2 border-dashed border-brand-mute flex items-center justify-center bg-white">
              <Lock size={12} className="text-brand-mute" />
            </div>
            <div className="text-[8px] text-brand-mute mt-0.5">private locked</div>
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.985 }}
          className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-soft border border-brand-bg"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-brand-purple" />
            <div className="text-[9px] tracking-[0.6px] text-brand-purple font-bold">
              STRONGEST POSSIBILITY FOUND
            </div>
          </div>
          <div className="mt-1.5 text-[14px] font-bold">Jim - possible company coworker</div>
          <div className="text-[11px] text-brand-mute mt-1">{candidates[0].signal}</div>
          <div
            data-prototype-target="1:6"
            data-prototype-person="Jim"
            data-prototype-source="avatar"
            className="mt-3 relative h-[144px] rounded-2xl bg-gradient-to-br from-[#fff7fb] to-[#eef7ff] border border-brand-bg flex items-center justify-center overflow-visible cursor-pointer"
          >
            <img
              src={candidates[0].img}
              alt=""
              className="h-[136px] w-[136px] object-contain drop-shadow-[0_12px_22px_rgba(108,92,231,0.20)]"
            />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: [0, -2, 0], scale: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse" }}
              className="absolute right-12 top-7 rounded-2xl bg-white px-3 py-1.5 text-[12px] font-bold text-brand-purple shadow-soft border border-brand-lavender/30"
            >
              Hi
            </motion.div>
          </div>
          <motion.button
            data-prototype-target="1:6"
            data-prototype-person="Jim"
            data-prototype-source="review-path"
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            className="mt-3 w-full py-3 rounded-full gradient-brand text-white text-[13px] font-bold shadow-soft"
          >
            Review path
          </motion.button>
        </motion.div>

        <div className="mx-5 mt-3 bg-white/86 backdrop-blur-xl rounded-2xl p-4 shadow-soft border border-white/80">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-brand-purple" />
            <div className="text-[9px] tracking-[0.6px] text-brand-purple font-bold">
              OTHER RESULTS
            </div>
          </div>
          <div className="mt-2.5 space-y-2">
            {candidates.slice(1).map((person) => (
              <motion.button
                key={person.name}
                type="button"
                data-prototype-target="1:6"
                data-prototype-person={person.name}
                whileTap={{ scale: 0.985 }}
                className="w-full rounded-2xl border border-brand-bg bg-white/78 px-3 py-2.5 text-left shadow-[0_8px_18px_rgba(108,92,231,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-white border border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={person.img}
                      alt=""
                      className="h-[124%] w-[124%] object-cover object-top"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold text-brand-ink">
                      {person.name} - {person.role}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-[14px] text-brand-mute">
                      {person.signal}
                    </span>
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="CHAT" />
    </div>
  );
}

function RadarCandidate({ person, index }: { person: (typeof candidates)[number]; index: number }) {
  const x = Math.cos((person.angle * Math.PI) / 180) * person.distance;
  const y = Math.sin((person.angle * Math.PI) / 180) * person.distance;
  const isJim = person.name === "Jim";

  return (
    <motion.div
      data-prototype-target="1:6"
      data-prototype-person={person.name}
      data-prototype-source="avatar"
      className="absolute z-20 cursor-pointer"
      style={{
        left: `calc(50% + ${x - person.size / 2}px)`,
        top: `calc(50% + ${y - person.size / 2}px)`,
        width: person.size,
        height: person.size,
      }}
      initial={{ opacity: 0, scale: 0.45 }}
      animate={{
        opacity: 1,
        scale: isJim ? [1, 1.06, 1] : [1, 1.03, 1],
        x: [0, isJim ? 8 : 5, 0, isJim ? -7 : -4, 0],
        y: [0, isJim ? -5 : -3, 0, isJim ? 6 : 4, 0],
      }}
      transition={{
        opacity: { duration: 0.45, delay: 0.75 + index * 0.55 },
        scale: { duration: 2.4 + index * 0.3, repeat: Infinity, delay: 0.75 + index * 0.55 },
        x: { duration: person.duration / 5, repeat: Infinity, ease: "easeInOut" },
        y: { duration: person.duration / 6, repeat: Infinity, ease: "easeInOut" },
      }}
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
          isJim ? "-bottom-12 border-brand-purple/30" : "-bottom-8 border-brand-bg"
        }`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        <div className={`${isJim ? "text-[10px]" : "text-[8px]"} font-bold text-brand-ink`}>
          {person.name} - {person.match}
        </div>
        {isJim && <div className="text-[8px] text-brand-purple font-bold">{person.role}</div>}
      </motion.div>
    </motion.div>
  );
}
