import { motion } from "framer-motion";
import {
  Bookmark,
  Bot,
  ChevronLeft,
  Layers,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

const candidateOpeners = {
  Alex: {
    title: "Alex AI",
    relationship: "Possible company coworker",
    tone: "Warm and confident",
    opener:
      "Hey Alex, I noticed we may be joining similar onboarding circles. Would love to hear what has helped you settle in so far.",
    reason: "Same workplace context · shared onboarding signal",
  },
  Mia: {
    title: "Mia AI",
    relationship: "Possible design buddy",
    tone: "Creative and light",
    opener:
      "Hi Mia, I saw we may share a design background. If you are up for it, maybe we can swap one thing that inspired us this week.",
    reason: "Shared graduate cohort · similar portfolio interests",
  },
  Sam: {
    title: "Sam AI",
    relationship: "Possible community match",
    tone: "Casual and easy",
    opener:
      "Hey Sam, looks like we may be in the same company space. Want to compare notes on good lunch spots or first-week survival tips?",
    reason: "Same company space · lunch group overlap",
  },
  Nora: {
    title: "Nora AI",
    relationship: "Possible project neighbor",
    tone: "Polished and curious",
    opener:
      "Hi Nora, I noticed our onboarding tasks may overlap. I would be happy to trade notes if that helps both of us get oriented faster.",
    reason: "Adjacent team context · shared onboarding task",
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

      <div className="px-4 py-4 flex flex-col gap-3 overflow-y-auto h-[calc(100%-132px)] prototype-scroll">
        <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-purple/20">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shrink-0">
            <ShieldCheck size={13} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold">
              I found a low-pressure way to start this conversation.
            </div>
            <div className="text-[9px] text-brand-mute">
              You review first. Nothing is sent without you.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center shrink-0">
            <Bot size={13} className="text-white" />
          </div>
          <div className="max-w-[78%]">
            <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-brand-purple mb-1">
              Your Second Self
            </div>
            <div className="bg-white rounded-2xl px-3 py-3 text-[12px] leading-[17px] shadow-soft border border-brand-bg">
              {candidate.opener}
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-[8px] text-brand-mute font-bold">
              <Sparkles size={8} /> AI SUGGESTION ONLY
            </div>
          </div>
        </div>

        <div className="mt-1 rounded-2xl bg-white/82 border border-white/80 p-3 shadow-soft">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-brand-purple" />
            <div className="text-[10px] font-bold tracking-[0.12em] text-brand-purple">
              WHY THIS COULD WORK
            </div>
          </div>
          <div className="mt-2 text-[12px] leading-[17px] text-brand-mute">{candidate.reason}</div>
          <div className="mt-2 inline-flex rounded-full bg-brand-bg px-3 py-1 text-[10px] font-bold text-brand-ink">
            {candidate.tone}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 glass border-t border-brand-bg px-3 py-3">
        <div className="flex items-center gap-2">
          <button className="flex-1 rounded-2xl bg-white px-3 py-3 text-[11px] font-bold text-brand-purple shadow-sm flex items-center justify-center gap-1.5">
            <Bookmark size={12} /> Save draft
          </button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex-1 rounded-2xl gradient-brand px-3 py-3 text-[11px] font-bold text-white shadow-soft flex items-center justify-center gap-1.5"
          >
            <Send size={12} /> Use this
          </motion.button>
          <button className="w-10 h-10 rounded-2xl bg-white text-brand-purple shadow-sm flex items-center justify-center">
            <User size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
