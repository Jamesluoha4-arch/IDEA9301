import { motion } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Camera, X } from "lucide-react";
import { useState } from "react";

export function F27_NewSpace() {
  const [tags, setTags] = useState(["architecture", "optimization"]);
  const [text, setText] = useState("");

  return (
    <div className="relative w-full h-full pt-12 pb-6 overflow-y-auto font-sans text-brand-ink gradient-brand-soft">
      <div className="px-5 pt-2 flex items-center justify-between">
        <ArrowLeft size={18} className="text-brand-purple" />
      </div>
      <div className="px-5 mt-2 flex items-center justify-between">
        <h1 className="text-[26px] font-bold tracking-[-0.5px]">
          New{" "}
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Post
          </span>
        </h1>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -1 }}
          className="px-4 py-2 rounded-full gradient-brand text-white text-[11px] font-bold tracking-[0.6px] shadow-soft"
        >
          PUBLISH
        </motion.button>
      </div>

      {/* Add photo */}
      <div className="px-5 mt-5">
        <div className="text-[10px] font-bold tracking-[0.6px] text-brand-mute">ADD PHOTO</div>
        <motion.div
          whileHover={{ y: -2 }}
          className="mt-2 rounded-2xl border-2 border-dashed border-brand-lavender/50 bg-white/60 p-6 flex flex-col items-center justify-center gap-2"
        >
          <div className="w-12 h-12 rounded-2xl gradient-brand-soft flex items-center justify-center">
            <ImageIcon size={20} className="text-brand-purple" />
          </div>
          <div className="text-[12px] text-brand-mute">No media selected</div>
          <button className="mt-2 px-4 py-2 rounded-full bg-white border border-brand-bg text-[11px] font-bold flex items-center gap-1.5 shadow-soft">
            <Camera size={12} className="text-brand-purple" /> Upload source
          </button>
        </motion.div>
      </div>

      {/* Add text */}
      <div className="px-5 mt-5">
        <div className="text-[10px] font-bold tracking-[0.6px] text-brand-mute">ADD TEXT</div>
        <div className="mt-2 rounded-2xl bg-white p-4 shadow-soft border border-brand-bg">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description here..."
            className="w-full min-h-[120px] resize-none bg-transparent outline-none text-[13px] placeholder:text-brand-mute"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="px-5 mt-5">
        <div className="text-[10px] font-bold tracking-[0.6px] text-brand-mute">ADD TAGS</div>
        <div className="mt-2 rounded-2xl bg-white p-3 shadow-soft border border-brand-bg flex flex-wrap gap-1.5 items-center">
          {tags.map((t) => (
            <motion.div
              key={t}
              layout
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="px-2.5 py-1 rounded-lg gradient-brand text-white text-[11px] font-bold flex items-center gap-1"
            >
              #{t}
              <button onClick={() => setTags((a) => a.filter((x) => x !== t))}>
                <X size={11} />
              </button>
            </motion.div>
          ))}
          <input
            placeholder="Add tag..."
            className="flex-1 min-w-[80px] bg-transparent outline-none text-[12px] placeholder:text-brand-mute py-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                setTags((a) => [...a, e.currentTarget.value.trim()]);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>

      <div className="px-5 mt-6 text-[10px] text-brand-mute leading-[14px]">
        I will check this post for safety before publishing. Private chats and blocked data will not
        be used for recommendations.
      </div>
    </div>
  );
}
