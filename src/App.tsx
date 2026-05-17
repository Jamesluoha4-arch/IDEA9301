import { useState } from "react";
import { FlowPlayer } from "@/components/FlowPlayer";

export function App() {
  const [showInfo, setShowInfo] = useState(false);

  if (showInfo) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-6 gradient-brand-soft text-brand-ink">
        <div className="max-w-xl rounded-3xl bg-white/80 border border-white p-6 shadow-glow text-center">
          <div className="text-[11px] font-bold tracking-[0.32em] uppercase text-brand-purple">
            AI Second Self
          </div>
          <h1 className="mt-3 text-3xl font-bold">Interactive Prototype</h1>
          <p className="mt-3 text-[14px] leading-6 text-brand-mute">
            This deploy package focuses on the complete clickable iPhone flow.
            Use the prototype controls to move through onboarding, social warm-up,
            sensitive boundaries, control center, relationships, challenges,
            Spaces, presence, and frame shop flows.
          </p>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-6 px-5 py-3 rounded-2xl bg-brand-ink text-white text-[13px] font-bold"
          >
            Back to prototype
          </button>
        </div>
      </div>
    );
  }

  return <FlowPlayer onOpenGallery={() => setShowInfo(true)} />;
}
