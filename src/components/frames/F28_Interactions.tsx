import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  AtSign,
  Bot,
  CheckCircle2,
  Heart,
  MessageSquare,
  Pin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

type Activity = {
  id: string;
  name: string;
  type: "Human verified" | "AI Activity" | "Human Approved";
  time: string;
  icon: typeof Heart;
  body: string;
  color: string;
  g: string;
  pinned?: boolean;
};

const initialItems: Activity[] = [
  {
    id: "jim-like",
    name: "Jim",
    type: "Human verified",
    time: "2m ago",
    icon: Heart,
    body: "Liked your transparent identity draft.",
    color: "text-brand-pink",
    g: "from-brand-pink to-brand-peach",
  },
  {
    id: "core-mention",
    name: "Second Self",
    type: "AI Activity",
    time: "15m ago",
    icon: AtSign,
    body: "Mentioned you in an approved space summary.",
    color: "text-brand-purple",
    g: "from-brand-purple to-brand-lavender",
  },
  {
    id: "sabrina-comment",
    name: "Sabrina",
    type: "Human verified",
    time: "1h ago",
    icon: MessageSquare,
    body: "Commented on your first-week playlist idea.",
    color: "text-brand-sky",
    g: "from-brand-sky to-brand-mint",
  },
  {
    id: "joe-redraft",
    name: "Joe",
    type: "Human verified",
    time: "6h ago",
    icon: RefreshCw,
    body: "Re-drafted your tiny interface note to his workspace.",
    color: "text-brand-mint",
    g: "from-brand-mint to-brand-sky",
  },
];

export function F28_Interactions() {
  const [approved, setApproved] = useState(
    () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("second-self.ai-activity-approved") === "true",
  );
  const [items, setItems] = useState<Activity[]>(() =>
    approved
      ? initialItems.map((item) =>
          item.type === "AI Activity"
            ? { ...item, type: "Human Approved", body: `${item.body} Human approval recorded.` }
            : item,
        )
      : initialItems,
  );

  const sorted = [...items].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  const pinItem = (id: string) => {
    setItems((list) =>
      list.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)),
    );
  };

  const deleteItem = (id: string) => {
    setItems((list) => list.filter((item) => item.id !== id));
  };

  const approveActivity = () => {
    if (approved) return;
    setApproved(true);
    window.sessionStorage.setItem("second-self.ai-activity-approved", "true");
    setItems((list) =>
      list.map((item) =>
        item.type === "AI Activity"
          ? { ...item, type: "Human Approved", body: `${item.body} Human approval recorded.` }
          : item,
      ),
    );
  };

  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft prototype-scroll">
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-brand-bg sticky top-0 z-20">
        <button
          data-prototype-back="7:1"
          className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-brand-purple" />
        </button>
        <div className="text-[16px] font-bold">Interactions</div>
      </div>

      <div className="px-4 mt-3 space-y-2">
        <AnimatePresence initial={false}>
          {sorted.map((item, i) => (
            <SwipeActivity
              key={item.id}
              item={item}
              index={i}
              onPin={() => pinItem(item.id)}
              onDelete={() => deleteItem(item.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mx-4 mt-5 rounded-3xl bg-white/82 border border-white p-4 shadow-soft">
        <div className="text-[10px] font-bold tracking-[0.6px] text-brand-purple border-b border-brand-bg pb-2">
          AI SECOND SELF ACTIVITY
        </div>
        <div className="mt-3 flex items-start gap-3">
          <div className="h-10 w-10 rounded-2xl gradient-brand flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">
              Second Self summarized a Space reply for you.
            </div>
            <div className="mt-1 text-[11px] leading-[15px] text-brand-mute">
              It used only approved public context. Confirm to label the action as Human Approved.
            </div>
          </div>
        </div>
        <button
          onClick={approveActivity}
          className={`mt-3 w-full rounded-full py-3 text-[12px] font-bold text-white ${
            approved ? "bg-brand-mint" : "gradient-brand"
          }`}
        >
          {approved ? "Human Approved" : "Approved"}
        </button>
      </div>
    </div>
  );
}

function SwipeActivity({
  item,
  index,
  onPin,
  onDelete,
}: {
  item: Activity;
  index: number;
  onPin: () => void;
  onDelete: () => void;
}) {
  const Icon = item.icon;
  const verified = item.type === "Human verified";
  const approved = item.type === "Human Approved";

  return (
    <motion.div
      layout
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ delay: 0.04 * index }}
      className="relative h-[82px] overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-y-0 right-0 flex">
        <button
          onClick={onPin}
          className="w-16 bg-brand-purple text-white text-[11px] font-bold flex flex-col items-center justify-center gap-1"
        >
          <Pin size={16} fill="white" />
          Pin
        </button>
        <button
          onClick={onDelete}
          className="w-16 bg-[#ff6b7a] text-white text-[11px] font-bold flex flex-col items-center justify-center gap-1"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: -128, right: 0 }}
        dragElastic={0.04}
        className="absolute inset-0 bg-white rounded-2xl p-3 flex items-start gap-3 shadow-soft border border-brand-bg"
      >
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.g} flex items-center justify-center shrink-0`}
        >
          {item.type === "AI Activity" ? (
            <Bot size={20} className="text-white" />
          ) : (
            <div className="text-[14px] font-bold text-white">{item.name.charAt(0)}</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-[13px] font-bold">{item.name}</div>
            {item.pinned && <Pin size={11} className="text-brand-purple fill-brand-purple" />}
            <div
              className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold tracking-[0.3px] flex items-center gap-1 ${
                verified
                  ? "bg-brand-mint/15 text-brand-mint"
                  : approved
                    ? "bg-brand-purple/10 text-brand-purple"
                    : "bg-brand-bg text-brand-purple"
              }`}
            >
              {verified ? (
                <ShieldCheck size={8} />
              ) : approved ? (
                <CheckCircle2 size={8} />
              ) : (
                <Bot size={8} />
              )}
              {item.type}
            </div>
            <div className="ml-auto text-[10px] text-brand-mute font-mono">{item.time}</div>
          </div>
          <div className="mt-1 flex items-start gap-1.5">
            <Icon size={13} className={`${item.color} mt-0.5 shrink-0`} />
            <div className="text-[12px] leading-[16px] text-brand-ink/80">{item.body}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
