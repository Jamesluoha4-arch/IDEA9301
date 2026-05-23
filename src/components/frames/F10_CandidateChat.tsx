import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  ChevronLeft,
  Delete,
  Layers,
  MemoryStick,
  Mic,
  Plus,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import JimUrl from "@/assets/radar-avatar-1.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import sabrinaUrl from "@/assets/radar-avatar-3.png";
import jamesUrl from "@/assets/radar-avatar-4.png";
import miaUrl from "@/assets/avatar-mia.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";
import { recordJimIcebreakerMessage } from "@/lib/icebreaking-challenge";

const styleTabs = ["Friendly", "Direct", "Playful", "Brief", "Warm"] as const;
export type StyleTab = (typeof styleTabs)[number];
type CandidateName = keyof typeof candidateOpeners;
type ChatMessage = { from: "ai" | "me"; text: string } | { from: "system"; text: string };

const chatListStorageKey = "second-self.chat-list";
const openedCandidateStorageKey = "second-self.opened-candidate-chat";
const candidateSourceStorageKey = "second-self.selected-candidate-source";
const JimReviewSeenStorageKey = "second-self.Jim-review-path-seen";

const candidateOpeners = {
  Jim: {
    title: "Jim AI",
    relationship: "Possible coworker",
    avatar: JimUrl,
    reason: "Same workplace context - shared onboarding signal",
    preview: "Same workplace context - shared onboarding signal - draft ready",
    drafts: {
      Friendly:
        "Hi, Jim. I am {user}. I noticed we may be in the same onboarding group. Want to compare notes on what has been most helpful so far?",
      Direct:
        "Hi, Jim. I am {user}. It looks like our onboarding overlaps. Want to exchange useful notes after the next session?",
      Playful:
        "Hey Jim, I am {user}. Fellow onboarding explorer here. Want to trade one survival tip after the next session?",
      Brief: "Hi, Jim. I am {user}. Want to compare onboarding notes sometime today?",
      Warm: "Hi, Jim. I am {user}. I am also getting oriented this week. I would be happy to compare notes if that feels useful.",
    },
  },
  Joe: {
    title: "Joe AI",
    relationship: "Possible design buddy",
    avatar: joeUrl,
    reason: "Shared graduate cohort - similar portfolio interests",
    preview: "Shared graduate cohort - similar portfolio interests - intro ready",
    drafts: {
      Friendly:
        "Hi, Joe. I am {user}. I saw we may share a design background. Maybe we can trade one useful resource from onboarding this week.",
      Direct:
        "Hi, Joe. I am {user}. It looks like we both connect to design work. Want to share onboarding resources?",
      Playful:
        "Hi, Joe. I am {user}. Design-brain check-in: want to swap the best onboarding thing we found this week?",
      Brief: "Hi, Joe. I am {user}. Want to swap one useful design onboarding resource?",
      Warm: "Hi, Joe. I am {user}. I noticed we may share a design background. I would love to exchange anything helpful we find this week.",
    },
  },
  Sabrina: {
    title: "Sabrina AI",
    relationship: "Possible community match",
    avatar: sabrinaUrl,
    reason: "Same company space - lunch group overlap",
    preview: "Same company space - lunch group overlap - topic idea ready",
    drafts: {
      Friendly:
        "Hi, Sabrina. I am {user}. Looks like we may be in the same company space. Want to compare good lunch spots or first-week survival tips?",
      Direct:
        "Hi, Sabrina. I am {user}. Our company spaces overlap. Want to compare first-week tips?",
      Playful:
        "Hey Sabrina, I am {user}. New-starter radar says we might be nearby. Want to trade lunch intel?",
      Brief: "Hi, Sabrina. I am {user}. Want to compare first-week tips?",
      Warm: "Hi, Sabrina. I am {user}. I am still learning the space too. It could be nice to compare what we find useful.",
    },
  },
  James: {
    title: "James AI",
    relationship: "Possible project neighbor",
    avatar: jamesUrl,
    reason: "Adjacent team context - shared onboarding task",
    preview: "Adjacent team context - shared onboarding task - warm note ready",
    drafts: {
      Friendly:
        "Hi, James. I am {user}. I noticed our onboarding tasks may overlap. I would be happy to trade notes if that helps us both get oriented faster.",
      Direct: "Hi, James. I am {user}. Our onboarding tasks may overlap. Want to compare notes?",
      Playful:
        "Hi, James. I am {user}. Looks like our onboarding maps may cross. Want to solve a bit of it together?",
      Brief: "Hi, James. I am {user}. Want to compare onboarding notes?",
      Warm: "Hi, James. I am {user}. I noticed we may be working near the same area. I would be glad to share any useful notes I find.",
    },
  },
  Mia: {
    title: "Mia AI",
    relationship: "Possible creative match",
    avatar: miaUrl,
    reason: "Shared design taste - community energy",
    preview: "Shared design taste - community energy - friendly opener ready",
    drafts: {
      Friendly:
        "Hi, Mia. I am {user}. I noticed we may both care about visual design and community energy. Want to swap one idea that made this week feel easier?",
      Direct:
        "Hi, Mia. I am {user}. It looks like our design interests overlap. Want to compare one useful resource?",
      Playful:
        "Hey Mia, I am {user}. Creative radar says we might have good notes to trade. Want to swap one?",
      Brief: "Hi, Mia. I am {user}. Want to compare one design note from this week?",
      Warm: "Hi, Mia. I am {user}. I noticed we may share similar creative interests. It could be nice to compare what has inspired us this week.",
    },
  },
};

const replyVariants: Record<CandidateName, string[]> = {
  Jim: [
    "Good idea. Maybe we can compare notes after the onboarding briefing and keep it useful for both of us.",
    "That works. I can keep it simple: one thing we learned, one question we still have, and one easy next step.",
    "I like that. We can make the first message low-pressure, so it feels helpful rather than forced.",
    "Totally fair. I would start with a small note after the session, then see whether the conversation naturally continues.",
  ],
  Joe: [
    "Good point. I can share one onboarding resource that helped me frame my design notes, and you can tell me what feels useful from your side.",
    "I like the angle. Maybe we trade one useful reference and one tiny design observation from the week.",
    "That sounds useful. We could make it visual: one resource, one screenshot, one quick takeaway.",
    "Nice. I would keep the tone curious and creative, almost like swapping desk-side inspiration.",
  ],
  Sabrina: [
    "I'm in. A quick coffee or lunch check-in feels low pressure, and we can swap first-week tips while we are there.",
    "Yeah, that works. I would keep it simple and practical: compare what we know, then decide if it is worth following up.",
    "Nice. We can start casual and see where it goes. First week is easier when someone nearby is also figuring it out.",
    "That feels approachable. A quick hello plus one shared company-space question should be enough to begin.",
  ],
  James: [
    "That sounds helpful. We could compare the task expectations first, then note what each of us still needs to clarify.",
    "I think so. I would suggest a gentle first step: share one note from onboarding and ask whether it matches their experience.",
    "That is a clear starting point. I can keep it warm but structured, so it feels thoughtful rather than too formal.",
    "Good direction. We can make the message specific enough to be useful, but not so formal that it feels like work.",
  ],
  Mia: [
    "That sounds friendly. I would keep the first message creative but simple, with one shared interest and one easy question.",
    "Nice. We can make it feel low-pressure: swap one inspiration, then see if the conversation grows naturally.",
    "Good idea. I would mention the shared design signal and ask for one small recommendation.",
    "That feels warm. A short note about creative overlap should make the first step easier.",
  ],
};

const qwertyRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function readUserName() {
  if (typeof window === "undefined") return "David";
  return window.localStorage.getItem("second-self-user-name")?.trim() || "David";
}

function personalize(text: string, userName = readUserName()) {
  return text.replaceAll("{user}", userName);
}

function readCandidateName() {
  if (typeof window === "undefined") return "Jim";
  const value = window.sessionStorage.getItem("second-self.selected-candidate") || "Jim";
  return value in candidateOpeners ? (value as CandidateName) : "Jim";
}

type ConversationItem = {
  id: CandidateName;
  name: CandidateName;
  avatar: string;
  preview: string;
  relationship: string;
  pinned: boolean;
  updatedAt: number;
};

function readChatList(): ConversationItem[] {
  try {
    return JSON.parse(
      window.sessionStorage.getItem(chatListStorageKey) || "[]",
    ) as ConversationItem[];
  } catch {
    return [];
  }
}

function sortConversations(items: ConversationItem[]) {
  return [...items].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.updatedAt - a.updatedAt;
  });
}

function saveConversation(name: CandidateName, preview: string) {
  const candidate = candidateOpeners[name];
  const oldItems = readChatList();
  const existing = oldItems.filter((item) => item.id !== name);
  const previous = oldItems.find((item) => item.id === name);
  const next = sortConversations([
    {
      id: name,
      name,
      avatar: candidate.avatar,
      preview,
      relationship: candidate.relationship,
      pinned: previous?.pinned || false,
      updatedAt: Date.now(),
    },
    ...existing,
  ]);
  window.sessionStorage.setItem(chatListStorageKey, JSON.stringify(next));
  window.dispatchEvent(new Event("second-self-chat-list-updated"));
}

function chooseReply(candidateName: CandidateName, turn: number, userText: string) {
  const lower = userText.toLowerCase();
  const variants = replyVariants[candidateName];
  const keywordBoost =
    lower.includes("coffee") || lower.includes("lunch")
      ? 1
      : lower.includes("task") || lower.includes("project")
        ? 2
        : lower.includes("nervous") || lower.includes("awkward")
          ? 3
          : 0;
  return variants[(turn + keywordBoost) % variants.length];
}

function initialMessages(candidateName: CandidateName, userName: string): ChatMessage[] {
  if (candidateName !== "Jim") {
    return [
      { from: "ai", text: personalize(candidateOpeners[candidateName].drafts.Friendly, userName) },
    ];
  }

  return [
    { from: "ai", text: "Hey, are you also joining the new starter session this week?" },
    { from: "me", text: "Yeah, I am. Still getting used to everything, but excited to start." },
    { from: "ai", text: "Same here. Have you figured out which team area you will sit with?" },
    { from: "me", text: "Not fully yet. I am planning to ask after the onboarding briefing." },
    { from: "ai", text: "Good idea. Maybe we can compare notes after the session." },
  ];
}

function buildRegeneratedDraft(
  candidateName: CandidateName,
  style: StyleTab,
  userName: string,
  seed: number,
) {
  const base = candidateOpeners[candidateName];
  const variants: Record<StyleTab, string[]> = {
    Friendly: [
      `Hi, ${candidateName}. I am ${userName}. I noticed we may have overlapping onboarding context. Want to compare one useful note from this week?`,
      `Hi, ${candidateName}. I am ${userName}. We seem to share a low-pressure work signal. Want to swap what has helped us settle in so far?`,
    ],
    Direct: [
      `Hi, ${candidateName}. I am ${userName}. Our onboarding context overlaps. Want to compare notes after the next session?`,
      `Hi, ${candidateName}. I am ${userName}. Want to exchange one practical first-week tip today?`,
    ],
    Playful: [
      `Hey ${candidateName}, I am ${userName}. New-starter radar says we may have useful notes to trade. Want to swap one?`,
      `Hi ${candidateName}, I am ${userName}. Want to trade one tiny survival tip from onboarding?`,
    ],
    Brief: [
      `Hi, ${candidateName}. I am ${userName}. Want to compare onboarding notes?`,
      `Hi, ${candidateName}. I am ${userName}. Want to swap one useful first-week tip?`,
    ],
    Warm: [
      `Hi, ${candidateName}. I am ${userName}. I am still getting oriented too, and I would be happy to compare notes if that feels useful.`,
      `Hi, ${candidateName}. I am ${userName}. It might be nice to share what has helped us feel more settled this week.`,
    ],
  };
  return (
    variants[style][seed % variants[style].length] || personalize(base.drafts[style], userName)
  );
}

export function F10_CandidateChat() {
  const candidateName = readCandidateName();
  const candidate = candidateOpeners[candidateName];
  const userName = readUserName();
  const userAvatar = readGeneratedAvatar();
  const selfAvatar = userAvatar || JimUrl;
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const holdTimer = useRef<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleTab>("Friendly");
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialMessages(candidateName, userName),
  );
  const [input, setInput] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [commentTarget, setCommentTarget] = useState<string | null>(null);
  const [replyTurn, setReplyTurn] = useState(0);
  const [draftSeed, setDraftSeed] = useState(0);
  const [showWarmupSignal, setShowWarmupSignal] = useState(false);
  const [findSecondSelf, setFindSecondSelf] = useState(false);
  const [presenceToast, setPresenceToast] = useState("");

  useEffect(() => {
    const openedName = window.sessionStorage.getItem(openedCandidateStorageKey);
    if (openedName === candidateName) {
      saveConversation(candidateName, personalize(candidate.drafts.Friendly, userName));
      window.sessionStorage.removeItem(openedCandidateStorageKey);
    }
  }, [candidate.drafts.Friendly, candidateName, userName]);

  useEffect(() => {
    const source = window.sessionStorage.getItem(candidateSourceStorageKey);
    const alreadySeen = window.sessionStorage.getItem(JimReviewSeenStorageKey);
    const shouldShow = candidateName === "Jim" && source === "review-path" && !alreadySeen;
    setShowWarmupSignal(shouldShow);
    if (shouldShow) {
      window.sessionStorage.setItem(JimReviewSeenStorageKey, "1");
    }
  }, [candidateName]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, keyboardOpen]);

  useEffect(() => {
    if (!presenceToast) return;
    const timer = window.setTimeout(() => setPresenceToast(""), 1900);
    return () => window.clearTimeout(timer);
  }, [presenceToast]);

  const selectedDraft = useMemo(
    () => personalize(candidate.drafts[selectedStyle], userName),
    [candidate.drafts, selectedStyle, userName],
  );
  const visibleSuggestions = useMemo(
    () => [
      personalize(candidate.drafts[selectedStyle], userName),
      personalize(candidate.drafts.Warm, userName),
    ],
    [candidate, selectedStyle, userName],
  );
  const replyLabel = findSecondSelf ? "Human Reply" : "AI Reply";

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    if (candidateName === "Jim") {
      recordJimIcebreakerMessage(text);
    }
    setShowWarmupSignal(false);
    const reply = chooseReply(candidateName, replyTurn, text);
    const nextMessages: ChatMessage[] = [];
    if (candidateName === "Jim" && replyTurn === 0) {
      nextMessages.push({ from: "system", text: "AI WARM-UP FINISHED" });
    }
    nextMessages.push({ from: "me", text }, { from: "ai", text: reply });
    setMessages((items) => [...items, ...nextMessages]);
    setReplyTurn((value) => value + 1);
    saveConversation(candidateName, reply);
    setInput("");
  };

  const appendInput = (value: string) => {
    setInput((current) => `${current}${value}`);
  };

  const deleteInput = () => {
    setInput((current) => current.slice(0, -1));
  };

  const startHold = (message: ChatMessage) => {
    if (message.from === "system") return;
    window.clearTimeout(holdTimer.current ?? undefined);
    holdTimer.current = window.setTimeout(() => setCommentTarget(message.text), 520);
  };

  const cancelHold = () => {
    window.clearTimeout(holdTimer.current ?? undefined);
  };

  const toggleFindMode = () => {
    setFindSecondSelf((current) => {
      const next = !current;
      setPresenceToast(
        next
          ? `${candidateName}'s Second Self is back.`
          : `${candidateName}'s Second Self is not here for now.`,
      );
      return next;
    });
  };

  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="px-3 py-2 flex items-center gap-2 glass border-b border-brand-bg">
        <button
          type="button"
          data-prototype-back="0:7"
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

      <AnimatePresence>
        {presenceToast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="absolute left-4 right-4 top-[92px] z-40 rounded-2xl border border-white/80 bg-white/92 px-3 py-2.5 text-[11px] font-bold text-brand-ink shadow-soft backdrop-blur-2xl"
          >
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-mint/20 text-brand-purple">
              <Check size={12} />
            </span>
            {presenceToast}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={messageListRef}
        className="px-3 py-3 flex flex-col gap-3 overflow-y-auto prototype-scroll"
        style={{ height: keyboardOpen ? "calc(100% - 610px)" : "calc(100% - 420px)" }}
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
          if (message.from === "system") {
            return (
              <div key={`${message.text}-${index}`} className="py-1 text-center">
                <div className="flex items-center gap-2 text-[9px] text-brand-purple">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-lavender to-transparent" />
                  <ShieldCheck size={10} />
                  <span className="font-bold tracking-[0.5px]">{message.text}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-lavender to-transparent" />
                </div>
                <p className="mt-1 text-[9px] leading-[13px] text-brand-mute">
                  Warm-up sequence complete. Awaiting human input to finalize the session.
                </p>
              </div>
            );
          }

          const isMe = message.from === "me";
          return (
            <motion.div
              key={`${message.text}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                {isMe ? (
                  userAvatar ? (
                    <img
                      src={selfAvatar}
                      alt=""
                      className="h-[130%] w-[130%] object-cover object-top"
                    />
                  ) : (
                    <img
                      src={selfAvatar}
                      alt=""
                      className="h-[130%] w-[130%] object-cover object-top"
                    />
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
                <motion.button
                  type="button"
                  onPointerDown={() => startHold(message)}
                  onPointerUp={cancelHold}
                  onPointerLeave={cancelHold}
                  whileTap={{ scale: 0.985 }}
                  className={`px-3 py-2.5 rounded-2xl text-left text-[12px] leading-[17px] shadow-soft ${
                    isMe ? "gradient-brand text-white" : "bg-white"
                  }`}
                >
                  {message.text}
                </motion.button>
                {!isMe && (
                  <div className="text-[8px] text-brand-mute mt-1 tracking-wider font-bold flex items-center gap-1">
                    <Sparkles size={8} /> {replyLabel}
                  </div>
                )}
                {commentTarget === message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    className={`absolute -top-14 ${isMe ? "right-12" : "left-12"} rounded-full border border-white/80 bg-white/95 px-3 py-2 shadow-[0_12px_32px_rgba(31,31,46,0.18)] backdrop-blur-xl flex items-center gap-3 text-[21px] z-30`}
                  >
                    {["鉂わ笍", "馃槀", "馃槷", "馃槩", "馃槧", "馃憤", "+"].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setCommentTarget(null)}
                        className="leading-none hover:scale-110 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
        {showWarmupSignal && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-mint/40"
          >
            <div className="w-7 h-7 rounded-lg gradient-mint-sky flex items-center justify-center shrink-0">
              <TrendingUp size={13} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold">Warm-up signal</div>
              <div className="text-[9px] text-brand-mute leading-[12px]">
                Your Second Self found a shared onboarding context. You are both new to the company.
              </div>
              <div className="text-[8px] text-brand-purple mt-1 font-bold">
                Company signal updated today
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messageEndRef} className="h-16 shrink-0" />
      </div>

      <motion.div
        animate={{ y: keyboardOpen ? -232 : 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        className="absolute bottom-[150px] left-0 right-0 glass border-t border-brand-bg px-3 pt-3 pb-2"
      >
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold flex items-center gap-1.5">
            <Sparkles size={12} className="text-brand-purple" /> SPARK REPLY SUGGESTIONS
          </div>
          <div className="text-[8px] text-brand-mute font-bold">{replyLabel}</div>
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
      </motion.div>

      <motion.div
        animate={{ y: keyboardOpen ? -232 : 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        className="absolute bottom-[86px] left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-brand-bg px-3 py-2.5 flex items-center gap-2"
      >
        <motion.button
          type="button"
          onClick={toggleFindMode}
          whileTap={{ scale: 0.96 }}
          className={`absolute -top-11 left-3 flex h-8 items-center gap-2 rounded-full border px-2.5 text-[10px] font-bold shadow-soft backdrop-blur-xl transition-colors ${
            findSecondSelf
              ? "border-brand-lavender/50 gradient-brand text-white"
              : "border-white/80 bg-white/82 text-brand-ink"
          }`}
        >
          <span>{findSecondSelf ? "Find Second Self" : "Find person"}</span>
          <span
            className={`relative h-4 w-7 rounded-full ${
              findSecondSelf ? "bg-white/28" : "bg-brand-bg"
            }`}
          >
            <motion.span
              layout
              className={`absolute top-0.5 h-3 w-3 rounded-full ${
                findSecondSelf ? "right-0.5 bg-white" : "left-0.5 bg-brand-mute"
              }`}
            />
          </span>
        </motion.button>
        <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
          <Plus size={16} className="text-brand-purple" />
        </div>
        <button
          type="button"
          onClick={() => setKeyboardOpen(true)}
          className="flex-1 px-3 py-2 rounded-full bg-brand-bg text-left text-[11px] text-brand-ink"
        >
          {input || <span className="text-brand-mute">Write your own message...</span>}
        </button>
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
      </motion.div>

      <AnimatePresence>
        {keyboardOpen && (
          <PrototypeKeyboard
            value={input}
            onType={appendInput}
            onDelete={deleteInput}
            onSend={() => {
              sendMessage();
              setKeyboardOpen(false);
            }}
            onClose={() => setKeyboardOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <SparkReplySheet
            selectedStyle={selectedStyle}
            selectedDraft={selectedDraft}
            draftSeed={draftSeed}
            candidateName={candidateName}
            userName={userName}
            onStyleChange={setSelectedStyle}
            onRegenerate={() => setDraftSeed((value) => value + 1)}
            onClose={() => setSheetOpen(false)}
            onInsert={(draft) => {
              setInput(draft);
              setKeyboardOpen(true);
              setSheetOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PrototypeKeyboard({
  value,
  onType,
  onDelete,
  onSend,
  onClose,
}: {
  value: string;
  onType: (value: string) => void;
  onDelete: () => void;
  onSend: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 280 }}
      animate={{ y: 0 }}
      exit={{ y: 280 }}
      transition={{ type: "spring", stiffness: 360, damping: 38 }}
      data-prototype-keyboard
      className="absolute bottom-0 left-0 right-0 z-[110] bg-gradient-to-b from-[#f6f1ff] via-[#eee8fb] to-[#dfe8f5] px-2 pt-2 pb-3 shadow-[0_-18px_34px_rgba(108,92,231,0.18)] border-t border-white/75"
    >
      <div className="hidden">
        <button className="h-10 w-10 rounded-full bg-white/70 flex items-center justify-center">
          <Mic size={18} />
        </button>
        <div className="flex-1 rounded-xl bg-white px-3 py-2 text-[13px] min-h-10">
          {value || <span className="text-brand-mute">Message...</span>}
        </div>
        <button className="h-10 w-10 rounded-full bg-white/70 flex items-center justify-center">
          <Smile size={18} />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="h-10 w-10 rounded-full bg-white/70 text-[16px] font-bold"
        >
          v
        </button>
      </div>
      <div className="mb-2 flex justify-around text-[20px] text-brand-ink/80">
        {["I", "you", "we", "this", "good", "not", "in", "yes"].map((word) => (
          <button key={word} type="button" onClick={() => onType(`${word} `)}>
            {word}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {qwertyRows.map((row, rowIndex) => (
          <div key={row.join("")} className="flex justify-center gap-1.5">
            {rowIndex === 2 && (
              <button
                type="button"
                onClick={() => onType("")}
                className="h-12 w-12 rounded-xl bg-white/55 text-[22px] text-brand-purple shadow-sm border border-white/70"
              >
                鈬?{" "}
              </button>
            )}
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => onType(key)}
                className="h-12 min-w-[35px] flex-1 rounded-xl bg-white/92 text-[26px] text-brand-ink shadow-sm border border-white"
              >
                {key}
              </button>
            ))}
            {rowIndex === 2 && (
              <button
                type="button"
                onClick={onDelete}
                className="h-12 w-12 rounded-xl bg-white/55 flex items-center justify-center text-brand-purple shadow-sm border border-white/70"
              >
                <Delete size={22} />
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <button
            type="button"
            className="h-12 w-16 rounded-xl bg-white/55 text-[18px] text-brand-ink shadow-sm border border-white/70"
          >
            123
          </button>
          <button
            type="button"
            onClick={() => onType(" ")}
            className="h-12 flex-1 rounded-xl bg-white/92 text-[18px] text-brand-ink shadow-sm border border-white"
          >
            space
          </button>
          <button
            type="button"
            onClick={onSend}
            className="h-12 w-20 rounded-xl gradient-brand text-[17px] font-bold text-white shadow-soft"
          >
            send
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 mx-auto block h-6 w-16 rounded-full bg-white/50 text-[14px] text-brand-purple"
        >
          v
        </button>
      </div>
    </motion.div>
  );
}

export function SparkReplySheet({
  selectedStyle,
  selectedDraft,
  draftSeed,
  candidateName,
  userName,
  onStyleChange,
  onRegenerate,
  onClose,
  onInsert,
}: {
  selectedStyle: StyleTab;
  selectedDraft: string;
  draftSeed?: number;
  candidateName?: CandidateName;
  userName?: string;
  onStyleChange: (style: StyleTab) => void;
  onRegenerate?: () => void;
  onClose: () => void;
  onInsert: (draft: string) => void;
}) {
  const [editableDraft, setEditableDraft] = useState(selectedDraft);

  useEffect(() => {
    if (candidateName && userName) {
      setEditableDraft(
        buildRegeneratedDraft(candidateName, selectedStyle, userName, draftSeed ?? 0),
      );
      return;
    }
    setEditableDraft(selectedDraft);
  }, [candidateName, draftSeed, selectedDraft, selectedStyle, userName]);

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
            AI Reply
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
        <label className="mt-4 block rounded-3xl border-2 border-brand-lavender/45 bg-brand-bg/30 p-4">
          <div className="text-[10px] font-bold tracking-[0.14em] text-brand-purple">
            SELECTED DRAFT
          </div>
          <textarea
            value={editableDraft}
            onChange={(event) => setEditableDraft(event.target.value)}
            className="mt-2 min-h-[86px] w-full resize-none bg-transparent text-[13px] leading-[18px] outline-none"
          />
        </label>
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
          <div className="text-brand-purple">-&gt;</div>
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
            onClick={onRegenerate}
            className="flex-1 rounded-2xl bg-brand-bg py-3 text-[12px] font-bold"
          >
            Regenerate
          </button>
          <button
            onClick={() => onInsert(editableDraft)}
            className="flex-1 rounded-2xl gradient-brand py-3 text-[12px] font-bold text-white"
          >
            Insert Draft
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}
