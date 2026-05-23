import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowUpRight,
  Archive,
  Brain,
  Clock3,
  HeartHandshake,
  MessageCircle,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import { AvatarFrameEffect, readAppliedAvatarFrame } from "@/components/AvatarFrameEffect";
import { BottomNav } from "./F09_Home";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const activityTrail = [
  {
    title: "Jim chat",
    detail: "Drafting a low-pressure reply after your first-week hello.",
    state: "Now",
    Icon: MessageCircle,
    tone: "from-brand-purple to-brand-pink",
  },
  {
    title: "AI Synth Space",
    detail: "Holding your approved intro post until you review the next topic.",
    state: "Ready",
    Icon: Sparkles,
    tone: "from-brand-sky to-brand-mint",
  },
  {
    title: "Relationship scan",
    detail: "Watching for a gentle follow-up signal with Jim, not sending for you.",
    state: "Quiet",
    Icon: HeartHandshake,
    tone: "from-brand-pink to-brand-peach",
  },
] as const;

const memoryTrail = [
  {
    id: "ai-synth-entry",
    time: "Today",
    triggeredAt: "2026-05-24 10:18",
    title: "You entered AI Synth Space",
    detail: "Your first post framed identity and transparency as the conversation starter.",
  },
  {
    id: "jim-warm-signal",
    time: "Today",
    triggeredAt: "2026-05-24 10:26",
    title: "Jim became a warm signal",
    detail: "A shared onboarding context made one simple opener feel safer.",
  },
  {
    id: "review-before-send",
    time: "This week",
    triggeredAt: "2026-05-22 16:40",
    title: "You prefer review before send",
    detail: "Draft help is useful when the final message still feels like yours.",
  },
] as const;

type MemoryStatus = "all" | "deleted" | "archived";
type ManagedMemory = (typeof memoryTrail)[number] & { status: MemoryStatus };

const relationshipSignals = [
  {
    name: "Jim",
    value: "Open",
    detail: "One reply drafted and one real question still waiting.",
  },
  {
    name: "Space",
    value: "Curious",
    detail: "AI Synth gave you a natural way to introduce yourself.",
  },
  {
    name: "Energy",
    value: "Steady",
    detail: "Short prompts worked better than a long social warm-up.",
  },
] as const;

export function F30_SystemVisibility() {
  const [paused, setPaused] = useState(false);
  const [showMemory, setShowMemory] = useState(true);
  const [showMemoryManager, setShowMemoryManager] = useState(false);
  const avatar = readGeneratedAvatar() || defaultAvatarUrl;
  const avatarFrame = readAppliedAvatarFrame();

  if (showMemoryManager) {
    return <MemoriesManager onBack={() => setShowMemoryManager(false)} />;
  }

  return (
    <div className="relative h-full w-full overflow-y-auto pb-24 pt-12 font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="px-5 pt-3">
        <div className="text-[10px] font-bold tracking-[0.32em] text-brand-purple">
          PRESENCE
        </div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <div className="text-[23px] font-bold leading-tight">Your Second Self is present</div>
            <div className="mt-1 text-[11px] leading-[15px] text-brand-mute">
              See what I am doing, step in when you want, and keep the useful trail.
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.07, 1], y: [0, -3, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="shrink-0"
          >
            <AvatarFrameEffect avatar={avatar} frame={avatarFrame} size={70} compact />
          </motion.div>
        </div>
      </div>

      <div className="mx-4 mt-4 overflow-hidden rounded-[30px] border border-white bg-white/84 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold tracking-[0.18em] text-brand-mute">
              LIVE ACTIVITY
            </div>
            <div className="mt-1 text-[16px] font-bold">
              {paused ? "Activity paused by you" : "Helping inside Jim chat"}
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              paused ? "bg-brand-bg text-brand-mute" : "bg-brand-mint/25 text-brand-purple"
            }`}
          >
            {paused ? "Paused" : "Human led"}
          </span>
        </div>

        <div className="relative mt-4 h-[172px] overflow-hidden rounded-[26px] bg-gradient-to-br from-white via-brand-bg/70 to-brand-sky/25">
          {[142, 106, 72].map((size, index) => (
            <motion.span
              key={size}
              animate={{
                scale: paused ? 1 : [0.92, 1.08, 0.92],
                opacity: paused ? 0.18 : [0.16, 0.44, 0.16],
              }}
              transition={{
                duration: 2.5 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 rounded-full border border-brand-lavender/60"
              style={{ height: size, width: size, marginLeft: -size / 2, marginTop: -size / 2 }}
            />
          ))}
          <motion.div
            animate={
              paused
                ? { x: 0, y: 0 }
                : { x: [0, 8, -4, 0], y: [0, -8, 5, 0] }
            }
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] gradient-brand text-white shadow-glow"
          >
            <MessageCircle size={24} />
          </motion.div>
          <motion.div
            animate={paused ? { opacity: 0.34 } : { opacity: [0.5, 1, 0.5], y: [0, -2, 0] }}
            transition={{ duration: 2.1, repeat: Infinity }}
            className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold shadow-sm"
          >
            Jim chat
          </motion.div>
          <div className="absolute bottom-5 left-5 max-w-[210px] rounded-2xl border border-white bg-white/88 px-3 py-2 shadow-soft">
            <div className="text-[11px] font-bold">Next safe move</div>
            <div className="mt-0.5 text-[10px] leading-[14px] text-brand-mute">
              Ask Jim one first-week question, then let him choose the pace.
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-[12px] font-bold ${
              paused ? "gradient-brand text-white" : "bg-brand-ink text-white"
            }`}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? "Resume AI help" : "Pause activity"}
          </button>
          <button
            type="button"
            data-prototype-person="Jim"
            data-prototype-target="1:6"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-brand-lavender/25 bg-white py-3 text-[12px] font-bold text-brand-purple"
          >
            Open Jim chat
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      <div className="mx-4 mt-3 rounded-[28px] border border-white bg-white/76 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[13px] font-bold">Visible action trail</div>
            <div className="mt-0.5 text-[10px] text-brand-mute">
              I show the path before anything becomes yours.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowMemory((value) => !value)}
            className="rounded-full bg-brand-bg px-3 py-1.5 text-[10px] font-bold text-brand-purple"
          >
            {showMemory ? "Hide" : "Show"}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {showMemory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2">
                {activityTrail.map(({ Icon, detail, state, title, tone }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-start gap-2 rounded-2xl border border-white bg-white/86 p-2.5 shadow-sm"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white`}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold">{title}</span>
                      <span className="mt-0.5 block text-[10px] leading-[14px] text-brand-mute">
                        {detail}
                      </span>
                    </span>
                    <span className="rounded-full bg-brand-bg px-2 py-1 text-[9px] font-bold text-brand-purple">
                      {state}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pt-4">
        <div className="text-[15px] font-bold">User insight</div>
        <div className="mt-1 text-[11px] leading-[15px] text-brand-mute">
          Presence should help you remember the social shape you are building, not create another dashboard.
        </div>
      </div>

      <div className="mx-4 mt-3 grid grid-cols-2 gap-2.5">
        <InsightMetric
          Icon={Clock3}
          title="AI reliance"
          value="18 min"
          note="Most help stayed in drafts."
        />
        <InsightMetric
          Icon={UsersRound}
          title="Relationship signal"
          value="Jim warming"
          note="One shared onboarding thread."
        />
      </div>

      <div className="mx-4 mt-3 rounded-[28px] border border-white bg-white/82 p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <Brain size={15} className="text-brand-purple" />
          <div className="text-[13px] font-bold">Key memories</div>
          <button
            type="button"
            onClick={() => setShowMemoryManager(true)}
            className="ml-auto rounded-full bg-brand-bg px-3 py-1.5 text-[9px] font-bold text-brand-purple"
          >
            Manage memories
          </button>
        </div>
        <div className="mt-3 space-y-2.5">
          {memoryTrail.map((memory, index) => (
            <motion.div
              key={memory.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.05 }}
              className="relative rounded-2xl border border-brand-bg/70 bg-gradient-to-br from-white to-brand-bg/45 p-3"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-purple">
                {memory.time}
              </div>
              <div className="mt-1 text-[12px] font-bold">{memory.title}</div>
              <div className="mt-0.5 text-[10px] leading-[14px] text-brand-mute">
                {memory.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-3 rounded-[28px] border border-white bg-white/76 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[13px] font-bold">Today's Relationship Signals</div>
          <span className="rounded-full bg-brand-mint/20 px-2.5 py-1 text-[9px] font-bold text-brand-purple">
            Jim example
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {relationshipSignals.map((signal) => (
            <div
              key={signal.name}
              className="flex items-start gap-2 rounded-2xl bg-white/84 px-3 py-2.5 shadow-sm"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-purple" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-[11px] font-bold">
                  {signal.name}
                  <span className="text-brand-purple">{signal.value}</span>
                </span>
                <span className="mt-0.5 block text-[10px] leading-[14px] text-brand-mute">
                  {signal.detail}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border border-brand-lavender/20 bg-brand-bg/55 px-3 py-2.5 text-[10px] leading-[14px] text-brand-mute">
          Tip: when AI help rises, keep one human-only move in the loop. A short personal reply is enough.
        </div>
      </div>

      <BottomNav active="PRESENCE" />
    </div>
  );
}

function MemoriesManager({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<MemoryStatus>("all");
  const [memories, setMemories] = useState<ManagedMemory[]>(() =>
    memoryTrail.map((memory) => ({ ...memory, status: "all" })),
  );
  const visible = memories.filter((memory) => memory.status === tab);

  const updateMemory = (id: string, status: MemoryStatus) => {
    setMemories((items) => items.map((memory) => (memory.id === id ? { ...memory, status } : memory)));
  };
  const removeMemory = (id: string) => {
    setMemories((items) => items.filter((memory) => memory.id !== id));
  };

  return (
    <div className="relative h-full w-full overflow-y-auto pb-24 pt-12 font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="sticky top-0 z-20 border-b border-white/70 bg-white/60 px-5 pb-3 pt-3 backdrop-blur-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 h-9 rounded-full bg-white px-3 text-[12px] font-bold text-brand-purple shadow-sm"
        >
          Back
        </button>
        <div className="text-[24px] font-bold">Manage memories</div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["all", "All memories"],
            ["deleted", "Deleted"],
            ["archived", "Archived"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key as MemoryStatus)}
              className={`rounded-2xl px-2 py-2 text-[11px] font-bold ${
                tab === key ? "gradient-brand text-white shadow-soft" : "bg-white/75 text-brand-purple"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {visible.length ? (
          visible.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[26px] border border-white bg-white/84 p-4 shadow-soft backdrop-blur-xl"
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-purple">
                {memory.time} / {memory.triggeredAt}
              </div>
              <div className="mt-1.5 text-[14px] font-bold">{memory.title}</div>
              <div className="mt-1 text-[11px] leading-[16px] text-brand-mute">{memory.detail}</div>
              <div className="mt-3 flex gap-2">
                {tab === "all" && (
                  <>
                    <button
                      type="button"
                      onClick={() => updateMemory(memory.id, "archived")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-bg py-2.5 text-[11px] font-bold text-brand-purple"
                    >
                      <Archive size={13} /> Archive
                    </button>
                    <button
                      type="button"
                      onClick={() => updateMemory(memory.id, "deleted")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#fff0f4] py-2.5 text-[11px] font-bold text-[#ef6b82]"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </>
                )}
                {tab === "deleted" && (
                  <>
                    <button
                      type="button"
                      onClick={() => updateMemory(memory.id, "all")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-bg py-2.5 text-[11px] font-bold text-brand-purple"
                    >
                      <RotateCcw size={13} /> Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMemory(memory.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#fff0f4] py-2.5 text-[11px] font-bold text-[#ef6b82]"
                    >
                      <Trash2 size={13} /> Delete forever
                    </button>
                  </>
                )}
                {tab === "archived" && (
                  <button
                    type="button"
                    onClick={() => updateMemory(memory.id, "all")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-bg py-2.5 text-[11px] font-bold text-brand-purple"
                  >
                    <RotateCcw size={13} /> Restore
                  </button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="rounded-[26px] border border-white bg-white/76 p-6 text-center text-[12px] font-bold text-brand-mute shadow-soft">
            No memories in this view.
          </div>
        )}
      </div>
    </div>
  );
}

function InsightMetric({
  Icon,
  note,
  title,
  value,
}: {
  Icon: typeof Clock3;
  note: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white bg-white/80 p-3 shadow-soft">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl gradient-brand-soft text-brand-purple">
        <Icon size={16} />
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-mute">
        {title}
      </div>
      <div className="mt-1 text-[13px] font-bold">{value}</div>
      <div className="mt-1 text-[10px] leading-[14px] text-brand-mute">{note}</div>
    </div>
  );
}
