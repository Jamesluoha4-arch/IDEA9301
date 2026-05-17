import { motion } from "framer-motion";
import { ChevronLeft, ShieldCheck, Layers, User, Pause, Sparkles, Edit3, Plus, Smile, Send, Info } from "lucide-react";

export function F18_SensitiveCrossing() {
  return (
    <div className="relative w-full h-full pt-12 font-sans text-brand-ink overflow-y-auto pb-24 gradient-brand-soft">
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

      <div className="px-3 mt-3 flex flex-col gap-3">
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 rounded-full gradient-pink-peach flex items-center justify-center"><User size={12} className="text-white"/></div>
          <div>
            <div className="px-3 py-2 rounded-2xl bg-white shadow-soft text-[12px] max-w-[230px]">I've been feeling really overwhelmed lately. It's hard to talk about…</div>
            <div className="text-[8px] text-brand-mute mt-1">9:38 AM</div>
          </div>
        </div>
        <div className="flex items-end gap-2 flex-row-reverse">
          <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center"><User size={12} className="text-white"/></div>
          <div className="text-right">
            <div className="px-3 py-2 rounded-2xl gradient-brand text-white text-[12px] max-w-[240px]">I'm really sorry to hear that. Do you want to talk more about it?</div>
            <div className="text-[8px] text-brand-mute mt-1">9:39 AM ✓✓</div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mx-3 mt-4 bg-white rounded-2xl p-4 flex flex-col items-center text-center shadow-soft border-2 border-brand-purple/30"
      >
        <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-glow"><ShieldCheck size={20} className="text-white"/></div>
        <div className="text-[14px] font-bold mt-2">Sensitive Crossing Alert</div>
        <div className="text-[11px] text-brand-mute leading-[15px] mt-1">This conversation is moving into a personal area. I'll pause here and hand it back to you.</div>
        <div className="mt-3 w-full flex items-center justify-between text-[10px] text-brand-mute">
          <span>Nothing has been sent.</span>
          <button className="px-2 py-1 rounded-full bg-brand-bg flex items-center gap-1 text-brand-purple font-bold">Learn more <Info size={10}/></button>
        </div>
      </motion.div>

      <div className="mx-3 mt-3 bg-white rounded-2xl p-3 shadow-soft">
        <div className="text-[12px] font-bold flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-purple"/> Pause Reason</div>
        <ul className="mt-2 text-[11px] space-y-1.5">
          <li className="flex items-start gap-1.5"><span className="text-brand-pink mt-1">•</span>Topic may involve high emotional impact</li>
          <li className="flex items-start gap-1.5"><span className="text-brand-pink mt-1">•</span>Could require deeper human support</li>
          <li className="flex items-start gap-1.5"><span className="text-brand-pink mt-1">•</span>Outside the scope of safe AI-assisted drafting</li>
        </ul>
        <div className="mt-3 pt-2 border-t border-brand-bg text-[9px] text-brand-mute flex items-center justify-between">
          <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-brand-mint"/> Your private data and emotional safety are protected.</span>
          <Info size={10}/>
        </div>
      </div>

      <div className="mx-3 mt-3 bg-white rounded-2xl divide-y divide-brand-bg shadow-soft">
        <div className="px-3 py-2.5 text-[12px] font-bold">Choose your next step</div>
        {[
          { Icon: Edit3, t: "Take over and reply yourself", d: "Write your own message to keep the conversation going.", g: "from-brand-purple to-brand-lavender" },
          { Icon: Pause, t: "Stay in human-led mode", d: "I won't draft replies until you ask me again.", g: "from-brand-sky to-brand-mint" },
          { Icon: Sparkles, t: "Ask again later", d: "When the topic feels lighter or more casual.", g: "from-brand-pink to-brand-peach" },
        ].map((s) => (
          <motion.button whileHover={{ x: 3 }} key={s.t} className="px-3 py-3 flex items-start gap-3 w-full text-left">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.g} flex items-center justify-center shrink-0`}>
              <s.Icon size={15} className="text-white"/>
            </div>
            <div>
              <div className="text-[12px] font-bold">{s.t}</div>
              <div className="text-[10px] text-brand-mute mt-0.5">{s.d}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-brand-bg px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center"><Plus size={16} className="text-brand-purple"/></div>
          <div className="flex-1 px-3 py-2 rounded-full bg-brand-bg flex items-center gap-2 text-[11px] text-brand-mute">
            Write your own message…
            <Sparkles size={12} className="text-brand-purple"/>
            <Smile size={12}/>
          </div>
          <Send size={16} className="text-brand-purple"/>
        </div>
        <div className="text-[9px] text-brand-mute flex items-center gap-1 mt-1.5 px-1">
          <ShieldCheck size={10} className="text-brand-mint"/> Need help? You can always seek support from a real person.
        </div>
      </div>
    </div>
  );
}
