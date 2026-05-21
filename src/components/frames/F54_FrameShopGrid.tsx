import { ArrowLeft, Sparkles } from "lucide-react";

const items = [
  "Star Glow",
  "Dot Circle",
  "Heart Halo",
  "Leaf Wreath",
  "Cloud Float",
  "Orbit Path",
  "Ribbon Bow",
  "Sunburst",
];

export function F54_FrameShopGrid() {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-white px-5 pb-12 pt-12 font-sans text-brand-ink">
      <div className="flex items-center gap-3 py-3">
        <ArrowLeft size={18} className="text-brand-purple" />
        <div className="flex-1 text-center text-[15px] font-bold">Frame Grid</div>
        <div className="w-5" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <button
            key={item}
            className="rounded-2xl border border-brand-bg bg-white p-4 shadow-soft"
          >
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${index === 2 ? "gradient-pink-peach" : "gradient-brand-soft"}`}
            >
              <Sparkles size={18} className={index === 2 ? "text-white" : "text-brand-purple"} />
            </div>
            <div className="mt-2 text-[12px] font-bold">{item}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
