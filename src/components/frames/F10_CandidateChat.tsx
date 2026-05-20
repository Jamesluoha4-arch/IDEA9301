import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  ChevronLeft,
  Layers,
  MemoryStick,
  Plus,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Users,
} from "lucide-react";
import alexUrl from "@/assets/radar-avatar-1.png";
import miaUrl from "@/assets/radar-avatar-2.png";
import samUrl from "@/assets/radar-avatar-3.png";
import noraUrl from "@/assets/radar-avatar-4.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const styleTabs = ["Friendly", "Direct", "Playful", "Brief", "Warm"] as const;
export type StyleTab = (typeof styleTabs)[number];

const candidateOpeners = {
  Alex: {
    title: "Alex AI",
    relationship: "Possible company coworker",
    avatar: alexUrl,
    reason: "Same workplace context · shared onboarding signal",
    drafts: {
      Friendly:
        "Hi Alex, I noticed we may be in the same onboarding group. Want to compare notes on what has been most helpful so far?",
      Direct:
        "Hi Alex, looks like our onboarding overlaps. Want to exchange useful notes after the next session?",
      Playful:
        "Hey Alex, fellow onboarding explorer here. Want to trade one survival tip after the next session?",
      Brief: "Hi Alex, want to compare onboarding notes sometime today?",
      Warm: "Hi Alex, I am also getting oriented this week. I would be happy to compare notes if that feels useful.",
    },
  },
  Mia: {
    title: "Mia AI",
    relationship: "Possible design buddy",
    avatar: miaUrl,
    reason: "Shared graduate cohort · similar portfolio interests",
    drafts: {
      Friendly:
        "Hi Mia, I saw we may share a design background. Maybe we can trade one useful resource from onboarding this week.",
      Direct:
        "Hi Mia, looks like we both connect to design work. Want to share onboarding resources?",
      Playful:
        "Hi Mia, design-brain check-in: want to swap the best onboarding thing we found this week?",
      Brief: "Hi Mia, want to swap one useful design onboarding resource?",
      Warm: "Hi Mia, I noticed we may share a design background. I would love to exchange anything helpful we find this week.",
    },
  },
  Sam: {
    title: "Sam AI",
    relationship: "Possible community match",
    avatar: samUrl,
    reason: "Same company space · lunch group overlap",
    drafts: {
      Friendly:
        "Hey Sam, looks like we may be in the same company space. Want to compare good lunch spots or first-week survival tips?",
      Direct: "Hi Sam, our company spaces overlap. Want to compare first-week tips?",
      Playful: "Hey Sam, new-starter radar says we might be nearby. Want to trade lunch intel?",
      Brief: "Hey Sam, want to compare first-week tips?",
      Warm: "Hi Sam, I am still learning the space too. It could be nice to compare what we find useful.",
    },
  },
  Nora: {
    title: "Nora AI",
    relationship: "Possible project neighbor",
    avatar: noraUrl,
    reason: "Adjacent team context · shared onboarding task",
    drafts: {
      Friendly:
        "Hi Nora, I noticed our onboarding tasks may overlap. I would be happy to trade notes if that helps us both get oriented faster.",
      Direct: "Hi Nora, our onboarding tasks may overlap. Want to compare notes?",
      Playful:
        "Hi Nora, looks like our onboarding maps may cross. Want to solve a bit of it together?",
      Brief: "Hi Nora, want to compare onboarding notes?",
      Warm: "Hi Nora, I noticed we may be working near the same area. I would be glad to share any useful notes I find.",
    },
  },
};

function readCandidateName() {
  if (typeof window === "undefined") return "Alex";
  const value = window.sessionStorage.getItem("second-self.selected-candidate") || "Alex";
  return value in candidateOpeners ? (value as keyof typeof candidateOpeners) : "Alex";
}

export function F10_CandidateChat() {
  const candidateName = readCandidateName();
  const candidate = candidateOpeners[candidateName];
  const [selectedStyle, setSelectedStyle] = useState<StyleTab>("Friendly");
  const [messages, setMessages] = useState([{ from: "ai", text: candidate.drafts.Friendly }]);
  const [input, setInput] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const userAvatar = readGeneratedAvatar();

  const selectedDraft = candidate.drafts[selectedStyle];
  const visibleSuggestions = useMemo(
    () => [candidate.drafts[selectedStyle], candidate.drafts.Warm],
    [candidate, selectedStyle],
  );

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((items) => [...items, { from: "me", text }]);
    setInput("");
  };

  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="px-3 py-2 flex items-center gap-2 glass border-b border-brand-bg">
        <button
          type="button"
          data-prototype-back="1:1"
          className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center"
        >
          <ChevronLeft size={14} className="text-brand-purple" />
        </button>
        <div className="flex-1 text-center">
          <div className="text-[15px] font-bold">{candidate.title}</div>
          <div className="text-[9px] text-brand-purple flex items-center justify-center gap-1 font-bold">
            <ShieldCheck size={9} /> {candidate.relationship}
          </div>
        </div>
        <div className="px-2.5 py-1.5 rounded-full bg-white shadow-soft flex items-center gap-1 text-[10px] text-brand-purple font-bold">
          <Layers size={11} /> AI Context
        </div>
      </div>

      <div
        className="px-3 py-3 flex flex-col gap-3 overflow-y-auto prototype-scroll"
        style={{ height: "calc(100% - 238px)" }}
      >
        <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-purple/20">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shrink-0">
            <ShieldCheck size={13} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold">
              AI can suggest an opener, but only you can send it.
            </div>
            <div className="text-[9px] text-brand-mute">
              Your Second Self found a low-pressure workplace connection.
            </div>
          </div>
        </div>

        {messages.map((message, index) => {
          const isMe = message.from === "me";
          return (
            <motion.div
              key={`${message.text}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                {isMe ? (
                  userAvatar ? (
                    <img
                      src={userAvatar}
                      alt=""
                      className="h-[130%] w-[130%] object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full gradient-brand flex items-center justify-center text-white text-[11px] font-bold">
                      You
                    </div>
                  )
                ) : (
                  <img
                    src={candidate.avatar}
                    alt=""
                    className="h-[130%] w-[130%] object-cover object-top"
                  />
                )}
              </div>
              <div className={`max-w-[78%] ${isMe ? "text-right" : ""}`}>
                <div
                  className={`px-3 py-2.5 rounded-2xl text-[12px] leading-[17px] shadow-soft ${
                    isMe ? "gradient-brand text-white" : "bg-white"
                  }`}
                >
                  {message.text}
                </div>
                {!isMe && (
                  <div className="text-[8px] text-brand-mute mt-1 tracking-wider font-bold flex items-center gap-1">
                    <Sparkles size={8} /> AI SUGGESTION ONLY
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-[64px] left-0 right-0 glass border-t border-brand-bg px-3 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold flex items-center gap-1.5">
            <Sparkles size={12} className="text-brand-purple" /> SPARK REPLY SUGGESTIONS
          </div>
          <div className="text-[8px] text-brand-mute font-bold">AI SUGGESTION ONLY</div>
        </div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {styleTabs.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                selectedStyle === style ? "gradient-brand text-white shadow-soft" : "bg-white"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          {visibleSuggestions.map((suggestion) => (
            <motion.button
              type="button"
              onClick={() => setInput(suggestion)}
              whileHover={{ x: 2 }}
              key={suggestion}
              className="w-full bg-white rounded-xl px-2.5 py-2 flex items-start gap-2 shadow-sm text-left"
            >
              <Sparkles size={11} className="mt-0.5 text-brand-pink" />
              <div className="flex-1 text-[10px] leading-[13px]">{suggestion}</div>
              <Bookmark size={11} className="text-brand-mute" />
            </motion.button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="mt-1 w-full text-[10px] text-center text-brand-purple font-bold"
        >
          View more
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-bg px-3 py-2.5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
          <Plus size={16} className="text-brand-purple" />
        </div>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          placeholder="Write your own message..."
          className="flex-1 px-3 py-2 rounded-full bg-brand-bg outline-none text-[11px] text-brand-ink placeholder:text-brand-mute"
        />
        <Sparkles size={12} className="text-brand-purple" />
        <Smile size={12} className="text-brand-mute" />
        <motion.button
          type="button"
          onClick={sendMessage}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center shadow-soft"
        >
          <Send size={14} className="text-white" />
        </motion.button>
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <SparkReplySheet
            selectedStyle={selectedStyle}
            selectedDraft={selectedDraft}
            onStyleChange={setSelectedStyle}
            onClose={() => setSheetOpen(false)}
            onInsert={() => {
              setInput(selectedDraft);
              setSheetOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function SparkReplySheet({
  selectedStyle,
  selectedDraft,
  onStyleChange,
  onClose,
  onInsert,
}: {
  selectedStyle: StyleTab;
  selectedDraft: string;
  onStyleChange: (style: StyleTab) => void;
  onClose: () => void;
  onInsert: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-[120]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-ink/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.section
        initial={{ y: 460 }}
        animate={{ y: 0 }}
        exit={{ y: 460 }}
        transition={{ type: "spring", stiffness: 330, damping: 34 }}
        className="absolute left-0 right-0 bottom-0 rounded-t-[30px] bg-white px-4 pt-5 pb-6 shadow-[0_-22px_58px_rgba(31,31,46,0.20)]"
      >
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-brand-bg" />
        <div className="flex items-center justify-between">
          <div className="text-[22px] font-bold flex items-center gap-2">
            <Sparkles size={18} className="text-brand-purple" /> Spark Reply
          </div>
          <div className="rounded-full bg-brand-bg px-3 py-1 text-[10px] font-bold text-brand-purple">
            AI SUGGESTION ONLY
          </div>
        </div>
        <p className="mt-1 text-[12px] text-brand-mute">Nothing will be sent until you approve.</p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {styleTabs.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onStyleChange(style)}
              className={`px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap ${
                selectedStyle === style ? "gradient-brand text-white shadow-soft" : "bg-brand-bg"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-3xl border-2 border-brand-lavender/45 bg-brand-bg/30 p-4">
          <div className="text-[10px] font-bold tracking-[0.14em] text-brand-purple">
            SELECTED DRAFT
          </div>
          <div className="mt-2 text-[13px] leading-[18px]">"{selectedDraft}"</div>
        </div>
        <div className="mt-5 text-[10px] font-bold tracking-[0.14em] text-brand-mute">
          REASONING TRAIL
        </div>
        <div className="mt-3 grid grid-cols-3 items-center text-center text-[9px] text-brand-mute">
          <div className="flex flex-col items-center gap-1">
            <span className="w-10 h-10 rounded-full bg-brand-mint flex items-center justify-center text-white">
              <Calendar size={15} />
            </span>
            Onboarding
          </div>
          <div className="text-brand-purple">→</div>
          <div className="flex flex-col items-center gap-1">
            <span className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white">
              <Check size={15} />
            </span>
            Draft ready
          </div>
        </div>
        <div className="mt-5 text-[10px] font-bold tracking-[0.14em] text-brand-mute">
          USED CONTEXT
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { Icon: Briefcase, title: "Past chat", body: "Referencing onboarding overlap." },
            { Icon: MemoryStick, title: "Memory", body: "Recall: new starter context." },
            { Icon: Users, title: "Relationship", body: "Low-pressure first contact." },
            { Icon: ShieldCheck, title: "Safe filters", body: "No sensitive data triggers found." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl bg-brand-bg/55 p-3">
              <Icon size={16} className="text-brand-purple" />
              <div className="mt-2 text-[11px] font-bold">{title}</div>
              <div className="text-[9px] text-brand-mute">{body}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-2xl bg-brand-bg py-3 text-[12px] font-bold"
          >
            Edit Before Sending
          </button>
          <button
            onClick={onInsert}
            className="flex-1 rounded-2xl gradient-brand py-3 text-[12px] font-bold text-white"
          >
            Insert Draft
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}
