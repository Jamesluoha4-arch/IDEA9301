import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Shield,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const conversations = [
  {
    name: "Sarah Jenkins",
    tag: "AI",
    time: "10:42 AM",
    msg: "I've added that to your calendar. Le…",
  },
  { name: "Michael Chen", tag: "HUMAN", time: "Yesterday", msg: "Sounds good, we can review th…" },
  { name: "David Rodriguez", tag: "AI", time: "Mon", msg: "Summarized the key points from th…" },
  { name: "Design Team Sync", tag: "HUMAN", time: "Mon", msg: "I'll have those wireframes read…" },
];

export function F09_Home() {
  return (
    <div className="relative w-full h-full pt-12 overflow-y-auto pb-20 font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-2 flex items-center justify-between">
        <div className="text-[11px] font-bold tracking-[0.3em] text-brand-purple">SECOND SELF</div>
        <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center shadow-soft">
          <User size={14} strokeWidth={2.2} className="text-white" />
        </div>
      </div>

      <div className="px-5 mt-6 flex items-start justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-[26px] font-bold leading-[32px] tracking-[-0.6px]">
            Good morning,
            <br />
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#f6b4db] bg-clip-text text-transparent">
              David
            </span>
          </h1>
          <p className="text-[12px] text-brand-mute leading-[18px] mt-2">
            Your Second Self is building better
            <br />
            connections for you.
          </p>
        </div>
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Sparkles size={22} className="text-white" />
          </motion.div>
          <motion.span
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-brand-mint border-2 border-white"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="mx-5 mt-5 bg-white rounded-2xl p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-bold">Insights Quick Look</div>
          <button className="flex items-center gap-1 text-[11px] text-brand-purple font-bold">
            This week <ChevronDown size={12} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { l: "AI RATE", v: "64%", d: "↑ 12%", c: "from-brand-purple to-brand-lavender" },
            { l: "SAFE OPENINGS", v: "18", d: "↑ 8%", c: "from-brand-mint to-brand-sky" },
            { l: "SHARED SIGNALS", v: "7", d: "↑ 16%", c: "from-brand-pink to-brand-peach" },
          ].map((s, i) => (
            <div key={s.l}>
              <div className="text-[8px] tracking-[0.6px] text-brand-mute font-bold">{s.l}</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[20px] font-bold leading-none">{s.v}</span>
                <span className="text-[8px] text-brand-mint font-bold">{s.d}</span>
              </div>
              <div className="h-1 rounded-full bg-brand-bg mt-2 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${s.c}`}
                  initial={{ width: 0 }}
                  animate={{ width: ["0%", "70%", "60%"][i] || "60%" }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 flex items-center justify-between">
        <div className="text-[16px] font-bold">AI Spark</div>
        <button className="flex items-center gap-0.5 text-[11px] text-brand-purple font-bold">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <motion.div
        whileHover={{ y: -2 }}
        className="mx-5 mt-2 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-soft border border-brand-bg"
      >
        <div className="w-10 h-10 rounded-2xl gradient-pink-peach flex items-center justify-center shrink-0">
          <Lightbulb size={18} className="text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold">Reconnect with Alex</div>
          <div className="text-[10px] text-brand-mute leading-[14px]">
            It's been 2 weeks. Suggest a coffee meetup this Friday.
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 rounded-xl gradient-brand text-white text-[11px] font-bold shadow-soft"
        >
          View draft
        </motion.button>
      </motion.div>

      <div className="px-5 mt-6 text-[16px] font-bold">Quick Actions</div>
      <div className="px-5 mt-2 grid grid-cols-2 gap-2.5">
        {[
          {
            Icon: MessageSquare,
            t: "Start New Chat",
            d: "Warm up a conversation",
            g: "from-brand-purple to-brand-lavender",
          },
          {
            Icon: BookOpen,
            t: "Review Paths",
            d: "See recent warm-up paths",
            g: "from-brand-sky to-brand-mint",
          },
          {
            Icon: Sun,
            t: "AI Suggestions",
            d: "Get personalized icebreakers",
            g: "from-brand-pink to-brand-peach",
          },
          {
            Icon: Shield,
            t: "Safety Center",
            d: "Manage context & permissions",
            g: "from-brand-lavender to-brand-pink",
          },
        ].map(({ Icon, t, d, g }) => (
          <motion.div
            whileHover={{ y: -3 }}
            key={t}
            className="bg-white rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 cursor-pointer shadow-soft"
          >
            <div
              className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${g} flex items-center justify-center`}
            >
              <Icon size={16} className="text-white" strokeWidth={2} />
            </div>
            <div className="text-[12px] font-bold mt-0.5">{t}</div>
            <div className="text-[9px] text-brand-mute leading-[12px]">{d}</div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 mt-6 text-[16px] font-bold">Recent Conversations</div>
      <div className="mx-5 mt-2 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
        {conversations.map((c) => (
          <div key={c.name} className="p-3 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full gradient-brand-soft flex items-center justify-center shrink-0">
              <User size={14} strokeWidth={1.8} className="text-brand-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-bold truncate">{c.name}</div>
                <div className="text-[9px] text-brand-mute">{c.time}</div>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`text-[7px] px-1.5 py-px rounded font-bold tracking-wide ${c.tag === "AI" ? "gradient-brand text-white" : "bg-brand-bg text-brand-ink"}`}
                >
                  {c.tag}
                </span>
                <div className="text-[10px] text-brand-mute truncate">{c.msg}</div>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full gradient-brand-soft flex items-center justify-center">
              <MessageSquare size={11} strokeWidth={2} className="text-brand-purple" />
            </div>
          </div>
        ))}
        <button className="w-full py-3 text-[11px] text-brand-purple font-bold flex items-center justify-center gap-1">
          View all conversations <ChevronRight size={12} />
        </button>
      </div>

      <BottomNav active="HOME" />
    </div>
  );
}

export function BottomNav({ active }: { active: string }) {
  void active;
  return null;
}

export function FloatingBottomNav({ active }: { active: string }) {
  const items = [
    { Icon: HomeNavIcon, label: "HOME" },
    { Icon: SocialNavIcon, label: "SOCIAL" },
    { Icon: PresenceNavIcon, label: "PRESENCE" },
    { Icon: ProfileNavIcon, label: "PROFILE" },
  ];
  const activeKey = active.toUpperCase();
  const isAvatarActive = activeKey === "AI";
  const [avatarUrl, setAvatarUrl] = useState(readGeneratedAvatar);

  useEffect(() => {
    setAvatarUrl(readGeneratedAvatar());
  }, [active]);

  return (
    <motion.nav
      className="absolute bottom-2 left-4 right-4 z-[90] h-[88px]"
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[76px] overflow-hidden rounded-[38px] border border-white/75 bg-[#fbf9ff]/72 px-5 py-2.5 shadow-[0_20px_48px_rgba(31,31,46,0.12),0_0_34px_rgba(108,92,231,0.22)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/82 via-[#f4efff]/62 to-white/78" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[86px] w-[130px] -translate-x-1/2 rounded-full bg-[#a78bfa]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-[#6c5ce7]/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-6 h-28 w-28 rounded-full bg-[#f6b4db]/12 blur-2xl" />
        <div className="relative grid grid-cols-[1fr_1fr_90px_1fr_1fr] items-end gap-1">
          {items.map(({ Icon, label }, index) => {
            const isActive = activeKey === label;
            const gridColumn = index < 2 ? index + 1 : index + 2;
            return (
              <motion.button
                key={label}
                whileTap={{ scale: 0.94 }}
                style={{ gridColumn }}
                data-prototype-tab={label.toLowerCase()}
                className={`group flex h-[57px] flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-bold tracking-[-0.01em] transition-colors ${
                  isActive ? "text-[#6c5ce7]" : "text-[#6f7285]"
                }`}
              >
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-2xl transition-all ${
                    isActive ? "text-[#6c5ce7]" : "text-[#6f7285] group-hover:text-[#56596b]"
                  }`}
                >
                  <Icon active={isActive} />
                </span>
                <span>{label[0] + label.slice(1).toLowerCase()}</span>
                {isActive && (
                  <motion.span
                    className="h-0.5 w-12 rounded-full bg-[#6c5ce7]"
                    layoutId="bottom-nav-active-line"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className={`absolute left-1/2 top-0 flex h-[88px] w-[88px] -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-[#f1edff] bg-white shadow-[0_18px_42px_rgba(31,31,46,0.16),0_0_34px_rgba(108,92,231,0.25)] ${
          isAvatarActive ? "ring-4 ring-[#a78bfa]/35" : ""
        }`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Second Self"
        data-prototype-tab="ai"
      >
        <span className="sr-only">AI</span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f7f3ff] via-white to-[#fff4fb]" />
        <img
          src={avatarUrl}
          alt=""
          className="relative h-[78px] w-[78px] rounded-full object-cover object-top"
        />
      </motion.button>
    </motion.nav>
  );
}

function HomeNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M5.5 14.3 16 5.8l10.5 8.5v11.1a2.5 2.5 0 0 1-2.5 2.5h-5.2v-8.1h-5.6v8.1H8a2.5 2.5 0 0 1-2.5-2.5V14.3Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <circle
        cx="16"
        cy="16"
        r="11.2"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M11.6 9.3c1.8 2.1 4 .2 5.7 1.5 1.7 1.2-.8 3.1.5 4.5 1 1.1 2.6.1 3.7 1.4 1.2 1.4.2 3.4-1.4 5.2M9.3 18.1c2.5-.4 4 .4 4.7 2.2.6 1.5-.4 2.5-.2 4.1"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PresenceNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect
        x="5"
        y="6"
        width="22"
        height="20"
        rx="3.6"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="m10 21 5.2-5 3.4 3.1 5-6.1"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6 13h4v4"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <circle
        cx="16"
        cy="10.2"
        r="5.2"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M6.4 27.1c1.4-5 5.2-8 9.6-8s8.2 3 9.6 8"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
