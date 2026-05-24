import { ReactNode } from "react";

interface PhoneFrameProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  /** iPhone 17 Pro Max CSS viewport height. */
  height?: number;
  width?: number;
  showLabel?: boolean;
  showChrome?: boolean;
}

export function PhoneFrame({
  title,
  subtitle,
  children,
  height = 956,
  width = 440,
  showLabel = false,
  showChrome = true,
}: PhoneFrameProps) {
  return (
    <div className="prototype-phone-wrapper flex flex-col items-center gap-3">
      {showLabel && title && (
        <div className="text-center">
          <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-mute">
            {title}
          </div>
          {subtitle && <div className="text-xs text-brand-mute/70 mt-0.5">{subtitle}</div>}
        </div>
      )}
      <div
        className={`prototype-phone-screen relative bg-white overflow-hidden ${
          showChrome
            ? "rounded-[52px] shadow-[0_25px_70px_-15px_rgba(108,92,231,0.35),0_0_0_8px_#1f1f2e,0_0_0_9px_rgba(255,255,255,0.1)]"
            : ""
        }`}
        style={{ height, width }}
      >
        {showChrome && (
          <>
            <div className="prototype-phone-notch absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-[#1f1f2e] rounded-full z-50 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]" />
            <div className="prototype-phone-camera absolute top-[21px] left-1/2 translate-x-[36px] w-[10px] h-[10px] rounded-full bg-[#303246] z-50" />
          </>
        )}
        {children}
      </div>
    </div>
  );
}
