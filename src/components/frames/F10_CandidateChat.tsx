import { motion } from "framer-motion";
import {
  Bookmark,
  Bot,
  ChevronLeft,
  Layers,
  Plus,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";

const candidateOpeners = {
  Alex: {
    title: "Alex AI",
    relationship: "Possible company coworker",
    tone: "Friendly",
    opener:
      "Hi Alex, I noticed we may be in the same onboarding group. Want to compare notes on what has been most helpful so far?",
    reason: "Same workplace context · shared onboarding signal",
    suggestions: [
      "Hi Alex, I think we may be starting around the same time. Want to swap one onboarding tip?",
      "Hey Alex, I am still finding my way around. Would be nice to compare first-week notes sometime.",
    ],
  },
  Mia: {
    title: "Mia AI",
    relationship: "Possible design buddy",
    tone: "Creative",
    opener:
      "Hi Mia, I saw we may share a design background. Maybe we can trade one useful resource from onboarding this week.",
    reason: "Shared graduate cohort · similar portfolio interests",
    suggestions: [
      "Hi Mia, I noticed we both seem close to design work. Want to swap one onboarding resource?",
      "Hey Mia, I am collecting useful first-week design notes. Happy to trade what I find.",
    ],
  },
  Sam: {
    title: "Sam AI",
    relationship: "Possible community match",
    tone: "Easygoing",
    opener:
      "Hey Sam, looks like we may be in the same company space. Want to compare good lunch spots or first-week survival tips?",
    reason: "Same company space · lunch group overlap",
    suggestions: [
      "Hey Sam, I am new here too. Any lunch spot you have already found worth trying?",
      "Hi Sam, looks like our spaces overlap. Want to compare first-week survival tips?",
    ],
  },
  Nora: {
    title: "Nora AI",
    relationship: "Possible project neighbor",
    tone: "Polished",
    opener:
      "Hi Nora, I noticed our onboarding tasks may overlap. I would be happy to trade notes if that helps us both get oriented faster.",
    reason: "Adjacent team context · shared onboarding task",
    suggestions: [
      "Hi Nora, I think our onboarding tasks overlap. Would you be open to comparing notes?",
      "Hi Nora, I am getting oriented on the same area. Happy to share anything useful I find.",
    ],
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
        style={{ height: "calc(100% - 220px)" }}
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

        <div className="flex items-end gap-2">
          <div className="w-7 h-7 rounded-full gradient-pink-peach flex items-center justify-center shrink-0">
            <Bot size={12} className="text-white" />
          </div>
          <div className="max-w-[78%]">
            <div className="px-3 py-2.5 rounded-2xl text-[12px] leading-[17px] bg-white shadow-soft">
              {candidate.opener}
            </div>
            <div className="text-[8px] text-brand-mute mt-1 tracking-wider font-bold flex items-center gap-1">
              <Sparkles size={8} /> AI SUGGESTION ONLY
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-mint/40">
          <div className="w-7 h-7 rounded-lg gradient-mint-sky flex items-center justify-center shrink-0">
            <TrendingUp size={13} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold">Warm-up signal</div>
            <div className="text-[9px] text-brand-mute leading-[12px]">{candidate.reason}</div>
            <div className="text-[8px] text-brand-purple mt-1 font-bold">
              Tone: {candidate.tone}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[64px] left-0 right-0 glass border-t border-brand-bg px-3 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-bold flex items-center gap-1.5">
            <Sparkles size={12} className="text-brand-purple" /> SPARK REPLY SUGGESTIONS
          </div>
          <div className="text-[8px] text-brand-mute font-bold">AI SUGGESTION ONLY</div>
        </div>
        <div className="mt-2 flex gap-1.5">
          <button className="px-3 py-1 rounded-full gradient-brand text-white text-[10px] font-bold shadow-soft">
            {candidate.tone}
          </button>
          <button className="px-3 py-1 rounded-full bg-white text-[10px] font-bold">Direct</button>
          <button className="px-3 py-1 rounded-full bg-white text-[10px] font-bold">Warm</button>
        </div>
        <div className="mt-2 space-y-1.5">
          {candidate.suggestions.map((suggestion) => (
            <motion.div
              whileHover={{ x: 2 }}
              key={suggestion}
              className="bg-white rounded-xl px-2.5 py-2 flex items-start gap-2 shadow-sm"
            >
              <Sparkles size={11} className="mt-0.5 text-brand-pink" />
              <div className="flex-1 text-[10px] leading-[13px]">{suggestion}</div>
              <Bookmark size={11} className="text-brand-mute" />
            </motion.div>
          ))}
        </div>
        <div className="mt-1 text-[10px] text-center text-brand-purple font-bold">View more</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-bg px-3 py-2.5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center">
          <Plus size={16} className="text-brand-purple" />
        </div>
        <div className="flex-1 px-3 py-2 rounded-full bg-brand-bg flex items-center gap-2">
          <div className="flex-1 text-[11px] text-brand-mute">Write your own message...</div>
          <Sparkles size={12} className="text-brand-purple" />
          <Smile size={12} className="text-brand-mute" />
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center shadow-soft"
        >
          <Send size={14} className="text-white" />
        </motion.button>
      </div>
    </div>
  );
}
