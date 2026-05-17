import { motion } from "framer-motion";
import { ArrowLeft, Bell, ShieldCheck, Sparkles, Layers, Clock, MapPin, Briefcase, Image as ImageIcon } from "lucide-react";

const interests = ["digital_photography", "lofi_beats", "minimalist_town", "urban_exploration", "coffee_culture", "indie_games"];

const activity = [
  { date: "29 JUL 2025", title: "Photo Series: Abandoned Sub-Levels", body: "Capturing the raw structural decay of forgotten sectors in high-contrast monochrome.", g: "from-brand-ink to-brand-purple" },
  { date: "15 JUL 2025", title: "Review: Minimalist Brew Methods", body: "Evaluating the efficiency and flavor profiles of low-waste coffee extraction systems.", g: "from-brand-peach to-brand-pink" },
  { date: "01 JUL 2025", title: "Soundtrack Analysis: Indie Synth Wave", body: "Deconstructing the algorithmic harmony of recent lo-fi releases in the indie gaming scene.", g: "from-brand-sky to-brand-mint" },
];

export function F29_ArchitectProfile() {
  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-4 py-3 flex items-center justify-between glass border-b border-brand-bg">
        <ArrowLeft size={16} className="text-brand-purple"/>
        <div className="text-[11px] font-bold tracking-[0.6px]">SPACES</div>
        <Bell size={16} className="text-brand-purple"/>
      </div>

      {/* Avatar block */}
      <div className="px-5 pt-5 flex flex-col items-center">
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-3xl gradient-brand shadow-glow flex items-center justify-center">
            <div className="text-[36px] font-bold text-white">V</div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-brand-ink text-white text-[8px] font-bold flex items-center gap-1">
            <ShieldCheck size={9}/> HUMAN_AUTH
          </div>
        </div>
        <h1 className="mt-5 text-[22px] font-bold tracking-[-0.3px]">Architect <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Valerie</span></h1>
        <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono">
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-brand-mint"/>
          <span className="text-brand-mint font-bold">[STATUS: ACTIVE]</span>
        </div>
      </div>

      {/* Meta */}
      <div className="mx-5 mt-4 grid grid-cols-2 gap-2">
        <div className="bg-white rounded-2xl p-3 shadow-soft border border-brand-bg">
          <div className="text-[9px] font-bold tracking-[0.5px] text-brand-mute flex items-center gap-1"><MapPin size={10}/> LOCATION</div>
          <div className="text-[12px] font-bold mt-0.5">Node_Cluster_B</div>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-soft border border-brand-bg">
          <div className="text-[9px] font-bold tracking-[0.5px] text-brand-mute flex items-center gap-1"><Briefcase size={10}/> AUTH_LEVEL</div>
          <div className="text-[12px] font-bold mt-0.5">Senior Blueprint Dev</div>
        </div>
      </div>

      {/* Neural match */}
      <div className="mx-5 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5"><Sparkles size={14} className="text-brand-purple"/> <div className="text-[14px] font-bold">Neural match</div></div>
          <div className="text-[9px] font-mono tracking-[0.4px] text-brand-mute">AI_SYNTH_OUT</div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#ece9ff" strokeWidth="3"/>
              <motion.circle
                cx="18" cy="18" r="15" fill="none" stroke="url(#mg)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${88 * 0.94} 100`}
                initial={{ strokeDasharray: "0 100" }} animate={{ strokeDasharray: `${88 * 0.94} 100` }} transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="mg" x1="0" x2="1">
                  <stop offset="0" stopColor="#6c5ce7"/>
                  <stop offset="1" stopColor="#f6b4db"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[18px] font-bold">88%</div>
          </div>
          <div className="flex-1 text-[11px] leading-[15px] text-brand-mute">
            Both of you prioritize sustainable algorithmic structures and minimalist aesthetics. System synchronicity predicted at high confidence level.
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="mx-5 mt-4 bg-white rounded-3xl p-4 shadow-soft border border-brand-bg">
        <div className="flex items-center gap-1.5"><Layers size={14} className="text-brand-purple"/> <div className="text-[14px] font-bold">Core nodes of interest</div></div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {interests.map((t, i) => (
            <motion.div
              key={t}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.04 * i }}
              className="px-2.5 py-1 rounded-lg gradient-brand-soft border border-brand-lavender/30 text-[10px] font-bold text-brand-purple"
            >
              #{t}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past activity */}
      <div className="mx-5 mt-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock size={14} className="text-brand-purple"/>
          <div className="text-[14px] font-bold">Past activity</div>
          <div className="ml-auto w-7 h-7 rounded-full gradient-brand flex items-center justify-center shadow-soft">
            <Sparkles size={12} className="text-white"/>
          </div>
        </div>
        <div className="space-y-2">
          {activity.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft border border-brand-bg"
            >
              <div className={`h-[100px] bg-gradient-to-br ${a.g} relative flex items-center justify-center`}>
                <ImageIcon size={28} className="text-white/40"/>
              </div>
              <div className="p-3">
                <div className="text-[9px] font-mono text-brand-mute tracking-[0.4px]">{a.date}</div>
                <div className="text-[13px] font-bold mt-1">{a.title}</div>
                <div className="text-[11px] text-brand-mute leading-[14px] mt-1">{a.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
