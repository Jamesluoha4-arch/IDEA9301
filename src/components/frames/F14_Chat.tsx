import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Bot,
  ChevronLeft,
  ChevronRight,
  Layers,
  Plus,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import alexUrl from "@/assets/radar-avatar-1.png";
import { SparkReplySheet, type StyleTab } from "./F10_CandidateChat";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

const initialMessages = [
  { from: "them", text: "Hey, are you also joining the new starter session this week?" },
  { from: "me", text: "Yeah, I am. Still getting used to everything, but excited to start." },
  { from: "them", text: "Same here. Have you figured out which team area you will sit with?" },
  { from: "me", text: "Not fully yet. I am planning to ask after the onboarding briefing." },
  { from: "them", text: "Good idea. Maybe we can compare notes after the session." },
];

export function ChatScaffold({
  showFinishedDivider = false,
  reactionOnLast = false,
  showSparkSuggestions = true,
  overlay,
}: {
  showFinishedDivider?: boolean;
  reactionOnLast?: boolean;
  showSparkSuggestions?: boolean;
  overlay?: ReactNode;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<StyleTab>("Friendly");
  const [sheetOpen, setSheetOpen] = useState(false);
  const userAvatar = readGeneratedAvatar();
  const selectedDrafts: Record<StyleTab, string> = {
    Friendly: "That sounds good. Want to compare notes after the onboarding session?",
    Direct: "Yes, let's compare notes after onboarding.",
    Playful: "Deal. New-starter notes exchange after the session?",
    Brief: "Sure. Let's compare notes after onboarding.",
    Warm: "That would be great. I am still getting oriented too, so comparing notes would help.",
  };
  const visibleSuggestions = [selectedDrafts[selectedStyle], selectedDrafts.Warm];
  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    const reply =
      lower.includes("coffee") || lower.includes("lunch")
        ? "That feels easy and low-pressure. We can keep it casual and compare what we have learned so far."
        : lower.includes("?")
          ? "Good question. I would suggest we compare notes after the next onboarding session and keep it useful for both of us."
          : "Good idea. Maybe we can compare notes after the session and keep the first message simple.";
    setMessages((items) => [...items, { from: "me", text }, { from: "them", text: reply }]);
    setInput("");
  };

  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="px-3 py-2 flex items-center gap-2 glass border-b border-brand-bg">
        <div
          data-prototype-back="1:1"
          className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center"
        >
          <ChevronLeft size={14} className="text-brand-purple" />
        </div>
        <div className="flex-1 text-center">
          <div className="text-[15px] font-bold">Alex AI</div>
          <div className="text-[9px] text-brand-purple flex items-center justify-center gap-1 font-bold">
            <ShieldCheck size={9} /> Possible coworker
          </div>
        </div>
        <div className="px-2.5 py-1.5 rounded-full bg-white shadow-soft flex items-center gap-1 text-[10px] text-brand-purple font-bold">
          <Layers size={11} /> AI Context
        </div>
      </div>

      <div
        className="px-3 py-3 flex flex-col gap-3 overflow-y-auto prototype-scroll"
        style={{ height: "calc(100% - 220px)" }}
      >
        <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-purple/20">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shrink-0">
            <ShieldCheck size={13} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold">
              AI can suggest replies, but only you can send them.
            </div>
            <div className="text-[9px] text-brand-mute">
              Your Second Self pre-warmed this coworker conversation.
            </div>
          </div>
          <ChevronRight size={12} className="mt-1 text-brand-mute" />
        </div>

        {messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          const isMe = message.from === "me";
          return (
            <div
              key={message.text}
              className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}
            >
              <div className="w-7 h-7 rounded-full bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                {isMe ? (
                  userAvatar ? (
                    <img
                      src={userAvatar}
                      alt=""
                      className="h-[130%] w-[130%] object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full gradient-brand flex items-center justify-center">
                      <User size={12} className="text-white" />
                    </div>
                  )
                ) : (
                  <img src={alexUrl} alt="" className="h-[130%] w-[130%] object-cover object-top" />
                )}
              </div>
              <div className={`max-w-[75%] ${isMe ? "text-right" : ""} relative`}>
                <div
                  className={`px-3 py-2 rounded-2xl text-[12px] leading-[16px] ${
                    isMe ? "gradient-brand text-white" : "bg-white shadow-soft"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-[8px] text-brand-mute mt-1 tracking-wider font-bold flex items-center gap-1 ${
                    isMe ? "justify-end" : ""
                  }`}
                >
                  <Sparkles size={8} /> SENT BY AI
                </div>
                {reactionOnLast && isLast && (
                  <motion.div
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: -22 }}
                    className="absolute -top-2 left-2 bg-brand-ink rounded-full px-2 py-1 flex items-center gap-1.5 text-[12px] z-10 shadow-glow"
                  >
                    {["Like", "Warm", "Haha", "Nice"].map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}

        {showFinishedDivider && (
          <>
            <div className="flex items-center gap-2 my-2 text-[9px] text-brand-purple">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-lavender to-transparent" />
              <ShieldCheck size={11} />
              <div className="font-bold tracking-[0.5px]">AI WARM-UP FINISHED</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-lavender to-transparent" />
            </div>
            <div className="text-[10px] text-brand-mute text-center -mt-1">
              Warm-up sequence complete. Awaiting
              <br />
              human input to finalize the session.
            </div>
          </>
        )}

        {!showFinishedDivider && (
          <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-mint/40">
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
            <ChevronRight size={12} className="text-brand-mute" />
          </div>
        )}
      </div>

      {showSparkSuggestions && (
        <div className="absolute bottom-[64px] left-0 right-0 glass border-t border-brand-bg px-3 pt-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold flex items-center gap-1.5">
              <Sparkles size={12} className="text-brand-purple" /> SPARK REPLY SUGGESTIONS
            </div>
            <div className="text-[8px] text-brand-mute font-bold">AI SUGGESTION ONLY</div>
          </div>
          <div className="mt-2 flex gap-1.5">
            {(["Friendly", "Direct", "Playful", "Brief", "Warm"] as StyleTab[]).map((style) => (
              <button
                key={style}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedStyle(style);
                }}
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
              <motion.div
                whileHover={{ x: 2 }}
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="bg-white rounded-xl px-2.5 py-2 flex items-start gap-2 shadow-sm"
              >
                <Sparkles size={11} className="mt-0.5 text-brand-pink" />
                <div className="flex-1 text-[10px] leading-[13px]">{suggestion}</div>
                <Bookmark size={11} className="text-brand-mute" />
              </motion.div>
            ))}
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSheetOpen(true);
            }}
            className="mt-1 w-full text-[10px] text-center text-brand-purple font-bold"
          >
            View more
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-bg px-3 py-2.5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
          <Plus size={16} className="text-brand-purple" />
        </div>
        <div className="flex-1 px-3 py-2 rounded-full bg-brand-bg flex items-center gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendMessage();
            }}
            placeholder="Write your own message..."
            className="flex-1 bg-transparent outline-none text-[11px] text-brand-ink placeholder:text-brand-mute"
          />
          <Sparkles size={12} className="text-brand-purple" />
          <Smile size={12} className="text-brand-mute" />
        </div>
        <motion.button
          type="button"
          onClick={sendMessage}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center shadow-soft"
        >
          <Send size={14} className="text-white" />
        </motion.button>
      </div>

      {overlay}
      <AnimatePresence>
        {sheetOpen && (
          <SparkReplySheet
            selectedStyle={selectedStyle}
            selectedDraft={selectedDrafts[selectedStyle]}
            onStyleChange={setSelectedStyle}
            onClose={() => setSheetOpen(false)}
            onInsert={() => {
              setInput(selectedDrafts[selectedStyle]);
              setSheetOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function F14_Chat() {
  return <ChatScaffold />;
}

export function F15_ChatReaction() {
  return <ChatScaffold reactionOnLast />;
}

export function F16_ChatFinished() {
  return <ChatScaffold showFinishedDivider />;
}
