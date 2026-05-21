import { useState } from "react";
import { FlowPlayer } from "@/components/FlowPlayer";
import { PhoneFrame } from "@/components/PhoneFrame";
import { flows } from "@/lib/flows";

export function App() {
  const [showGallery, setShowGallery] = useState(false);

  if (showGallery) {
    const frames = flows.flatMap((flow, flowIndex) =>
      flow.steps.map((step, stepIndex) => ({
        id: `${flow.id}-${stepIndex + 1}`,
        title: `${flowIndex + 1}.${stepIndex + 1} ${step.label}`,
        subtitle: step.hint || flow.title,
        Component: step.Component,
      })),
    );

    return (
      <div className="min-h-screen w-full gradient-brand-soft text-brand-ink">
        <div className="sticky top-0 z-50 border-b border-white/70 bg-white/60 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold tracking-[0.32em] uppercase text-brand-purple">
                Second Self Gallery
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-[-0.5px]">All Prototype Screens</h1>
            </div>
            <button
              type="button"
              onClick={() => setShowGallery(false)}
              className="px-5 py-3 rounded-2xl bg-brand-ink text-white text-[13px] font-bold shadow-soft"
            >
              Back to prototype
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 justify-items-center">
            {frames.map(({ id, title, subtitle, Component }) => (
              <div key={id} className="flex flex-col items-center gap-3">
                <PhoneFrame title={title} subtitle={subtitle}>
                  <Component />
                </PhoneFrame>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <FlowPlayer onOpenGallery={() => setShowGallery(true)} />;
}
