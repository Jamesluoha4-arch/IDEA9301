import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronRight,
  Copy,
  FileText,
  Globe2,
  Lock,
  LogOut,
  MessageSquareText,
  Mic,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Smile,
  UserRound,
  Vibrate,
  Wifi,
  X,
  Check,
} from "lucide-react";
import defaultAvatarUrl from "@/assets/chibi-figurine.png";
import joeUrl from "@/assets/radar-avatar-2.png";
import jamesUrl from "@/assets/radar-avatar-3.png";
import sabrinaUrl from "@/assets/radar-avatar-4.png";
import { readGeneratedAvatar } from "@/lib/avatar-generation";

type Panel = "settings" | "feedback" | "network";

const rowIconClass =
  "h-8 w-8 rounded-full bg-gradient-to-br from-white to-[#f1ecff] border border-white shadow-sm flex items-center justify-center text-brand-purple";

function getUserName() {
  if (typeof window === "undefined") return "David";
  return window.sessionStorage.getItem("second-self.user-name") || "David";
}

function SettingsRow({
  icon: Icon,
  title,
  value,
  onClick,
  danger,
  toggle,
}: {
  icon: typeof UserRound;
  title: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
  toggle?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="w-full h-[54px] px-4 bg-white/88 backdrop-blur-xl border-b border-[#eee9e3] last:border-b-0 flex items-center gap-3 text-left"
    >
      <Icon size={18} className={danger ? "text-[#ef6b82]" : "text-[#24190f]"} />
      <span
        className={`flex-1 text-[14px] font-bold ${danger ? "text-[#ef6b82]" : "text-brand-ink"}`}
      >
        {title}
      </span>
      {value && <span className="text-[12px] font-semibold text-[#9d968d]">{value}</span>}
      {toggle ? (
        <span className="w-12 h-7 rounded-full bg-brand-purple p-1 flex justify-end">
          <span className="h-5 w-5 rounded-full bg-white shadow" />
        </span>
      ) : (
        <ChevronRight size={17} className="text-[#b9b1a7]" />
      )}
    </motion.button>
  );
}

function SettingsSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      {title && <div className="px-5 mb-2 text-[15px] font-semibold text-[#beb7ad]">{title}</div>}
      <div className="mx-5 overflow-hidden rounded-[18px] border border-white/70 shadow-[0_12px_28px_rgba(55,45,35,0.06)]">
        {children}
      </div>
    </div>
  );
}

function StatusLine({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex gap-3 px-4 py-3 border-b border-[#eee9e3] last:border-b-0 bg-white/88">
      <Check size={17} className="text-[#41c986] mt-0.5" strokeWidth={3} />
      <div className="min-w-0">
        <div className="text-[14px] font-bold text-brand-ink leading-[18px]">{title}</div>
        <div className="text-[11px] text-[#aaa39a] leading-[16px] mt-1">{meta}</div>
      </div>
    </div>
  );
}

export function F83_Settings() {
  const [panel, setPanel] = useState<Panel>("settings");
  const [showLogout, setShowLogout] = useState(false);
  const userName = useMemo(getUserName, []);
  const avatar = readGeneratedAvatar() || defaultAvatarUrl;

  if (panel === "network") return <NetworkDiagnostics onBack={() => setPanel("settings")} />;
  if (panel === "feedback")
    return <FeedbackPanel onBack={() => setPanel("settings")} userName={userName} />;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f4efe8] text-brand-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.16),transparent_32%),radial-gradient(circle_at_90%_45%,rgba(246,180,219,0.12),transparent_34%)]" />
      <div className="relative h-full overflow-y-auto pb-10 pt-10 prototype-scroll">
        <div className="relative h-10 px-5 flex items-center justify-center">
          <button
            type="button"
            data-prototype-back="0:7"
            className="absolute left-5 h-10 w-10 rounded-full bg-white/65 shadow-sm flex items-center justify-center"
          >
            <X size={23} strokeWidth={2.5} />
          </button>
          <div className="text-[16px] font-bold">Settings</div>
        </div>

        <div className="mx-5 mt-5 h-[64px] rounded-[18px] bg-white/92 border border-white shadow-[0_12px_28px_rgba(55,45,35,0.06)] px-4 flex items-center gap-3">
          <UserRound size={19} className="text-[#24190f]" />
          <div className="flex-1 text-[15px] font-bold">Account Settings</div>
          <span className="rounded-full bg-[#756f61] text-white px-3 py-1 text-[11px] font-bold">
            Free
          </span>
          <img src={avatar} alt="" className="h-9 w-9 object-contain rounded-full bg-[#f8f4ef]" />
          <ChevronRight size={17} className="text-[#b9b1a7]" />
        </div>

        <SettingsSection title="General">
          <SettingsRow icon={Globe2} title="App Language" value="English" />
          <SettingsRow icon={Mic} title="Persona Reply Language" value="English" />
          <SettingsRow icon={Bell} title="Notifications" />
          <SettingsRow icon={Lock} title="Minor Mode" />
          <SettingsRow icon={Vibrate} title="Haptic Feedback" toggle />
        </SettingsSection>

        <SettingsSection title="Help Center">
          <SettingsRow icon={BookOpen} title="Help Docs" />
          <SettingsRow
            icon={MessageSquareText}
            title="Feedback"
            onClick={() => setPanel("feedback")}
          />
          <SettingsRow
            icon={Wifi}
            title="Network Diagnostics"
            onClick={() => setPanel("network")}
          />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingsRow icon={ShieldCheck} title="Privacy Policy" />
          <SettingsRow icon={FileText} title="Terms of Use" />
        </SettingsSection>

        <div className="mx-5 mt-8 overflow-hidden rounded-[18px] border border-white/70 shadow-[0_12px_28px_rgba(55,45,35,0.06)]">
          <SettingsRow icon={LogOut} title="Log Out" danger onClick={() => setShowLogout(true)} />
        </div>
      </div>

      <AnimatePresence>
        {showLogout && (
          <motion.div
            className="absolute inset-0 bg-[#231f1a]/34 backdrop-blur-[2px] flex items-center justify-center px-9 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 8, opacity: 0 }}
              className="w-full rounded-[26px] bg-white/92 backdrop-blur-2xl shadow-[0_24px_60px_rgba(31,31,46,0.20)] px-5 pt-8 pb-5"
            >
              <div className="text-center text-[20px] font-bold">Log out of Second Self?</div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogout(false)}
                  className="h-14 rounded-full bg-[#e4e1dc] text-[16px] font-bold text-brand-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-prototype-target="0:0"
                  className="h-14 rounded-full bg-[#e4e1dc] text-[16px] font-bold text-[#ef6b82]"
                >
                  Log out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NetworkDiagnostics({ onBack }: { onBack: () => void }) {
  const checks = [
    [
      "Internet baseline (Apple captive)",
      "https://captive.apple.com/hotspot-detect.html  路  66ms  路  HTTP 200",
    ],
    [
      "Public IP (Bilibili)",
      "https://api.bilibili.com/x/web-interface/zone  路  482ms  路  HTTP 200",
    ],
    [
      "DNS resolution (api.secondself.ai via AliDNS)",
      "Resolved -> 43.168.224.173  路  680ms  路  HTTP 200",
    ],
  ];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f4efe8] text-brand-ink">
      <div className="relative h-full overflow-y-auto pb-7 pt-10 prototype-scroll">
        <div className="relative h-10 px-5 flex items-center justify-center">
          <button
            type="button"
            onClick={onBack}
            className="absolute left-5 h-10 w-10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={25} strokeWidth={2.5} />
          </button>
          <div className="text-[16px] font-bold">Network Diagnostics</div>
        </div>

        <div className="mx-5 mt-5 rounded-[18px] bg-white/92 px-5 py-6 shadow-[0_12px_28px_rgba(55,45,35,0.06)]">
          <div className="text-[18px] text-[#bdb6ad]">Status</div>
          <div className="mt-3 text-[25px] font-bold text-[#41c986]">All checks passed</div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="text-[18px] tracking-[0.02em]">DIAG-20260521-192906-Z7QH</div>
            <button className="rounded-full bg-[#efeae3] px-4 py-2 text-[13px] font-bold">
              Copy ID
            </button>
          </div>
          <div className="mt-4 text-[14px] text-[#aaa39a]">
            Network is normal. Nothing has been reported.
          </div>
        </div>

        <DiagnosticSection title="Internet baseline">
          {checks.map(([title, meta]) => (
            <StatusLine key={title} title={title} meta={meta} />
          ))}
        </DiagnosticSection>

        <DiagnosticSection title="SecondMe API">
          <StatusLine
            title="API gateway health check"
            meta="https://api.secondself.ai/gate/in/health/check  路  280ms  路  HTTP 200"
          />
        </DiagnosticSection>

        <DiagnosticSection title="Webview domains">
          <StatusLine title="second-me.cn" meta="https://second-me.cn  路  2015ms  路  HTTP 200" />
          <StatusLine
            title="plaza.second-me.cn"
            meta="https://plaza.second-me.cn  路  1182ms  路  HTTP 200"
          />
          <StatusLine
            title="appstore.second-me.cn"
            meta="https://appstore.second-me.cn  路  1956ms  路  HTTP 200"
          />
        </DiagnosticSection>

        <div className="mx-5 mt-6 rounded-[18px] bg-white/92 px-5 py-5 shadow-[0_12px_28px_rgba(55,45,35,0.06)]">
          <div className="text-[18px] text-[#bdb6ad] mb-4">Device & network</div>
          {[
            ["App version", "2.3.7.2605092000  路  international"],
            ["OS", "iOS 26.4.2  路  iPhone 16 Pro Max"],
            ["Network", "wifi"],
            ["Public IP", "180.233.125.196  路  Sydney"],
            ["API origin", "https://api.secondself.ai/gate"],
            ["User ID", "deybt"],
            ["Time", "2026-05-21T09:29:06.359Z  路  Australia/Sydney"],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[96px_1fr] gap-2 py-1.5 text-[13px]">
              <span className="text-[#aaa39a]">{label}</span>
              <span className="font-semibold text-brand-ink">{value}</span>
            </div>
          ))}
        </div>

        <div className="mx-5 mt-6 grid grid-cols-2 gap-4">
          <button className="h-14 rounded-[18px] bg-white text-[16px] font-bold shadow-sm flex items-center justify-center gap-2">
            <RefreshCw size={17} /> Retest
          </button>
          <button className="h-14 rounded-[18px] bg-[#2a1209] text-white text-[16px] font-bold shadow-sm flex items-center justify-center gap-2">
            <Copy size={17} /> Copy report
          </button>
        </div>
      </div>
    </div>
  );
}

function DiagnosticSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <div className="px-5 mb-2 text-[18px] text-[#bdb6ad]">{title}</div>
      <div className="mx-5 overflow-hidden rounded-[18px] border border-white/70 shadow-[0_12px_28px_rgba(55,45,35,0.06)]">
        {children}
      </div>
    </div>
  );
}

function FeedbackPanel({ onBack, userName }: { onBack: () => void; userName: string }) {
  const avatars = [sabrinaUrl, joeUrl, defaultAvatarUrl, jamesUrl];
  return (
    <div className="relative h-full w-full overflow-hidden text-white bg-[#291338]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(167,139,250,0.36),transparent_30%),linear-gradient(180deg,#30143f_0%,#211523_58%,#072923_100%)]" />
      <div className="relative h-full flex flex-col px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="h-12 w-12 rounded-full bg-white/18 backdrop-blur-xl flex items-center justify-center"
          >
            <ArrowLeft size={27} strokeWidth={2.6} />
          </button>
          <div className="flex-1 ml-4 text-[20px] font-bold">Feedback Team</div>
          <button className="h-12 w-12 rounded-full bg-white/18 backdrop-blur-xl flex items-center justify-center">
            <MoreHorizontal size={24} />
          </button>
        </div>

        <div className="mt-[72px] flex-1 flex flex-col items-center">
          <div className="relative h-[210px] w-full">
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 4.2, repeat: Infinity }}
              className="absolute left-1/2 top-3 -translate-x-1/2 h-36 w-56 rounded-[40px] bg-gradient-to-br from-brand-lavender/80 to-brand-mint/70 blur-[1px] opacity-75"
            />
            {avatars.map((src, idx) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                className="absolute bottom-3 h-24 w-24 object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.25)]"
                style={{ left: 18 + idx * 70 }}
                animate={{ y: [0, idx % 2 ? -7 : 6, 0] }}
                transition={{ duration: 3.4 + idx * 0.35, repeat: Infinity }}
              />
            ))}
          </div>

          <div className="mt-2 w-full rounded-[28px] border border-white/14 bg-white/8 backdrop-blur-xl px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <p className="text-[19px] leading-[30px] font-semibold">
              Hi {userName}, I am the feedback team.
              <br />
              Leave me a note, and your Second Self will help us understand what felt helpful,
              confusing, or missing.
            </p>
          </div>
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/28 px-4 py-2 text-[15px] w-fit">
          Find people
          <span className="h-5 w-9 rounded-full bg-white/30 flex items-center p-0.5">
            <span className="h-4 w-4 rounded-full bg-white" />
          </span>
        </div>
        <div className="h-16 rounded-[22px] border border-white/18 bg-black/18 backdrop-blur-xl flex items-center px-4 gap-3">
          <Plus size={24} />
          <input
            className="flex-1 bg-transparent outline-none text-[19px] placeholder:text-white/70"
            placeholder="Tell us what happened..."
          />
          <Smile size={24} />
          <button className="h-11 w-11 rounded-full gradient-brand flex items-center justify-center shadow-glow">
            <Send size={20} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
