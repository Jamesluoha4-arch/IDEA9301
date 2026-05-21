import { ArrowLeft, Bot, Gift, Sparkles, Star } from "lucide-react";

const frames = [
  "Star Glow",
  "Dot Circle",
  "Heart Halo",
  "Leaf Wreath",
  "Cloud Float",
  "Orbit Path",
];

export function F49_FrameShop() {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-white px-5 pb-12 pt-12 font-sans text-brand-ink">
      <div className="flex items-center gap-3 py-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">Frame Shop</div>
        <Gift size={17} className="text-brand-purple" />
      </div>
      <div className="rounded-3xl border border-white bg-white p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand shadow-glow">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <div className="text-[18px] font-bold">Star Glow</div>
            <div className="text-[11px] text-brand-mute">Current frame applied</div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {frames.map((frame, index) => (
          <button
            key={frame}
            className="rounded-2xl border border-brand-bg bg-white p-4 text-left shadow-soft"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${index === 0 ? "gradient-brand" : "bg-brand-bg"}`}
            >
              {index === 0 ? (
                <Sparkles size={18} className="text-white" />
              ) : (
                <Star size={16} className="text-brand-purple" />
              )}
            </div>
            <div className="text-[13px] font-bold">{frame}</div>
            <div className="mt-1 text-[10px] text-brand-mute">
              {index === 0 ? "Applied" : "Preview"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
