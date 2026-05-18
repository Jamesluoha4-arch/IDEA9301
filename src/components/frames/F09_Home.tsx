import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Compass,
  Fingerprint,
  Home,
  Lightbulb,
  MessageSquare,
  Shield,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import chibiAvatar from "@/assets/chibi-figurine.png";

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
    { Icon: Home, label: "HOME" },
    { Icon: Compass, label: "SOCIAL" },
    { Icon: Fingerprint, label: "PRESENCE" },
    { Icon: Activity, label: "PROFILE" },
  ];
  const activeKey = active.toUpperCase();
  const isAvatarActive = activeKey === "AI";

  return (
    <motion.nav
      className="absolute bottom-3 left-5 right-5 z-[90] h-[72px]"
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[62px] overflow-hidden rounded-[30px] border border-white/70 bg-white/62 px-4 py-2 shadow-[0_18px_45px_rgba(31,31,46,0.14),0_0_34px_rgba(108,92,231,0.18)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/75 via-[#f7f6fb]/45 to-white/55" />
        <div className="pointer-events-none absolute -top-8 left-8 h-20 w-20 rounded-full bg-[#a78bfa]/22 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 right-6 h-24 w-24 rounded-full bg-[#6c5ce7]/14 blur-2xl" />
        <div className="relative grid grid-cols-[1fr_1fr_78px_1fr_1fr] items-end gap-1">
          {items.map(({ Icon, label }, index) => {
            const isActive = activeKey === label;
            const gridColumn = index < 2 ? index + 1 : index + 2;
            return (
              <motion.button
                key={label}
                whileTap={{ scale: 0.94 }}
                style={{ gridColumn }}
                data-prototype-tab={label.toLowerCase()}
                className={`group flex h-[50px] flex-col items-center justify-center gap-1 rounded-2xl text-[8px] font-bold tracking-[0.01em] transition-colors ${
                  isActive ? "text-brand-purple" : "text-[#6f7285]"
                }`}
              >
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-2xl transition-all ${
                    isActive
                      ? "text-[#6c5ce7] shadow-[0_10px_20px_rgba(108,92,231,0.16)]"
                      : "text-[#6f7285] group-hover:bg-white/65"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.6 : 2.1}
                    fill={isActive ? "currentColor" : "none"}
                  />
                </span>
                <span>{label}</span>
                {isActive && (
                  <motion.span
                    className="h-0.5 w-8 rounded-full bg-[#6c5ce7]"
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
        className={`absolute left-1/2 top-0 flex h-[74px] w-[74px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_16px_36px_rgba(31,31,46,0.18),0_0_28px_rgba(108,92,231,0.28)] ${
          isAvatarActive ? "ring-4 ring-[#a78bfa]/30" : ""
        }`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Second Self"
        data-prototype-tab="ai"
      >
        <span className="sr-only">AI</span>
        <span className="absolute inset-1 rounded-full bg-gradient-to-br from-[#ece9ff] via-white to-[#ffeaf5]" />
        <img
          src={chibiAvatar}
          alt=""
          className="relative h-[64px] w-[64px] rounded-full object-cover object-top"
        />
      </motion.button>
    </motion.nav>
  );
}
