import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ShieldCheck, Layers, User, Plus, Sparkles, Smile, Send, Bookmark, ChevronRight, TrendingUp, Bot } from "lucide-react";

const messages = [
  { from: "them", text: "Hey! Are we still on for this weekend?" },
  { from: "me", text: "Yeah, absolutely. Thinking of doing something outdoors." },
  { from: "them", text: "Nice! Any specific trails in mind?" },
  { from: "me", text: "Not locked in yet. Open to ideas— want something scenic but not too crowded." },
  { from: "them", text: "Got it. Let me know what you find!" },
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
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-hidden gradient-brand-soft">
      <div className="px-3 py-2 flex items-center gap-2 glass border-b border-brand-bg">
        <div className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center"><ChevronLeft size={14} className="text-brand-purple"/></div>
        <div className="flex-1 text-center">
          <div className="text-[15px] font-bold">Alex AI</div>
          <div className="text-[9px] text-brand-purple flex items-center justify-center gap-1 font-bold"><ShieldCheck size={9}/> Friend</div>
        </div>
        <div className="px-2.5 py-1.5 rounded-full bg-white shadow-soft flex items-center gap-1 text-[10px] text-brand-purple font-bold">
          <Layers size={11}/> AI Context
        </div>
      </div>

      <div className="px-3 py-3 flex flex-col gap-3 overflow-y-auto" style={{ height: "calc(100% - 220px)" }}>
        <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-purple/20">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center shrink-0">
            <ShieldCheck size={13} className="text-white"/>
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold">AI can suggest replies, but only you can send them.</div>
            <div className="text-[9px] text-brand-mute">Your Second Self pre-warmed this conversation.</div>
          </div>
          <ChevronRight size={12} className="mt-1 text-brand-mute"/>
        </div>

        {messages.map((m, i) => {
          const isLast = i === messages.length - 1;
          const me = m.from === "me";
          return (
            <div key={i} className={`flex items-end gap-2 ${me ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${me ? "gradient-brand" : "gradient-pink-peach"}`}>
                {me ? <User size={12} className="text-white"/> : <Bot size={12} className="text-white"/>}
              </div>
              <div className={`max-w-[75%] ${me ? "text-right" : ""} relative`}>
                <div className={`px-3 py-2 rounded-2xl text-[12px] leading-[16px] ${me ? "gradient-brand text-white" : "bg-white shadow-soft"}`}>
                  {m.text}
                </div>
                <div className={`text-[8px] text-brand-mute mt-1 tracking-wider font-bold flex items-center gap-1 ${me ? "justify-end" : ""}`}>
                  <Sparkles size={8}/> SENT BY AI
                </div>
                {reactionOnLast && isLast && (
                  <motion.div
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: -22 }}
                    className="absolute -top-2 left-2 bg-brand-ink rounded-full px-2 py-1 flex items-center gap-1.5 text-[12px] z-10 shadow-glow"
                  >
                    {["👏","🤔","😄","🤣","💛","🤙","🖤"].map((e) => <span key={e}>{e}</span>)}
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}

        {showFinishedDivider && (
          <>
            <div className="flex items-center gap-2 my-2 text-[9px] text-brand-purple">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-lavender to-transparent"/>
              <ShieldCheck size={11}/>
              <div className="font-bold tracking-[0.5px]">AI WARM-UP FINISHED</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-lavender to-transparent"/>
            </div>
            <div className="text-[10px] text-brand-mute text-center -mt-1">Warm-up sequence complete. Awaiting<br/>human input to finalize the session.</div>
          </>
        )}

        {!showFinishedDivider && (
          <div className="bg-white rounded-2xl p-3 flex items-start gap-2 shadow-soft border border-brand-mint/40">
            <div className="w-7 h-7 rounded-lg gradient-mint-sky flex items-center justify-center shrink-0">
              <TrendingUp size={13} className="text-white"/>
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold">Warm-up signal</div>
              <div className="text-[9px] text-brand-mute leading-[12px]">Your Second Self found a shared interest. You both mentioned hiking before.</div>
              <div className="text-[8px] text-brand-purple mt-1 font-bold">Last time 6 days ago</div>
            </div>
            <ChevronRight size={12} className="text-brand-mute"/>
          </div>
        )}
      </div>

      {showSparkSuggestions && (
        <div className="absolute bottom-[64px] left-0 right-0 glass border-t border-brand-bg px-3 pt-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold flex items-center gap-1.5"><Sparkles size={12} className="text-brand-purple"/> SPARK REPLY SUGGESTIONS</div>
            <div className="text-[8px] text-brand-mute font-bold">AI SUGGESTION ONLY</div>
          </div>
          <div className="mt-2 flex gap-1.5">
            <button className="px-3 py-1 rounded-full gradient-brand text-white text-[10px] font-bold shadow-soft">Friendly</button>
            <button className="px-3 py-1 rounded-full bg-white text-[10px] font-bold">Direct</button>
            <button className="px-3 py-1 rounded-full bg-white text-[10px] font-bold">Warm</button>
          </div>
          <div className="mt-2 space-y-1.5">
            {["Maybe we can check out Ridge Loop again. It's one of my favorites.", "Let's do Ridge Loop. It's solid."].map((s) => (
              <motion.div whileHover={{ x: 2 }} key={s} className="bg-white rounded-xl px-2.5 py-2 flex items-start gap-2 shadow-sm">
                <Sparkles size={11} className="mt-0.5 text-brand-pink"/>
                <div className="flex-1 text-[10px] leading-[13px]">{s}</div>
                <Bookmark size={11} className="text-brand-mute"/>
              </motion.div>
            ))}
          </div>
          <div className="mt-1 text-[10px] text-center text-brand-purple font-bold">View more ⌄</div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-bg px-3 py-2.5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center"><Plus size={16} className="text-brand-purple"/></div>
        <div className="flex-1 px-3 py-2 rounded-full bg-brand-bg flex items-center gap-2">
          <div className="flex-1 text-[11px] text-brand-mute">Write your own message…</div>
          <Sparkles size={12} className="text-brand-purple"/>
          <Smile size={12} className="text-brand-mute"/>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center shadow-soft">
          <Send size={14} className="text-white"/>
        </motion.button>
      </div>

      {overlay}
    </div>
  );
}

export function F14_Chat() {
  return <ChatScaffold/>;
}

export function F15_ChatReaction() {
  return (
    <ChatScaffold
      reactionOnLast
      overlay={
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-[340px] left-1/2 -translate-x-1/2 bg-brand-ink text-white rounded-2xl shadow-glow px-1 py-2 flex items-center gap-1 z-20"
        >
          {[
            { l: "Like", icon: "♡" },
            { l: "Reply", icon: "↩" },
            { l: "Share", icon: "↗" },
            { l: "Delete", icon: "🗑" },
            { l: "Report", icon: "⚠" },
          ].map((a) => (
            <div key={a.l} className="flex flex-col items-center px-2.5 py-1 gap-0.5">
              <span className="text-[14px]">{a.icon}</span>
              <span className="text-[8px]">{a.l}</span>
            </div>
          ))}
          <div className="absolute -bottom-7 left-2 right-2 bg-brand-ink rounded-xl px-3 py-1.5 text-[9px] flex items-center justify-between">
            Select Multiple <span>≡</span>
          </div>
        </motion.div>
      }
    />
  );
}

export function F16_ChatFinished() {
  return <ChatScaffold showFinishedDivider/>;
}
