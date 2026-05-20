import { motion } from "framer-motion";
import {
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  Clipboard,
  Gift,
  IdCard,
  Menu,
  MessageSquareWarning,
  Plus,
  QrCode,
  Search,
  Share2,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { generatedAvatarStorageKey, readGeneratedAvatar } from "@/lib/avatar-generation";

function readUserName() {
  return window.localStorage.getItem("second-self-user-name")?.trim() || "David";
}

function todayText() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export function F09_Home() {
  const [name, setName] = useState(readUserName);
  const [menuOpen, setMenuOpen] = useState(false);
  const dateLine = useMemo(todayText, []);

  useEffect(() => {
    const refreshName = () => setName(readUserName());
    refreshName();
    window.addEventListener("storage", refreshName);
    return () => window.removeEventListener("storage", refreshName);
  }, []);

  return (
    <div className="relative w-full h-full pt-12 overflow-y-auto pb-28 font-sans text-brand-ink gradient-brand-soft">
      <div className="min-h-[900px] px-6 pt-7 relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] text-brand-purple">
              SECOND SELF
            </div>
            <motion.button
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.94 }}
              className="mt-4 w-11 h-11 rounded-2xl border border-white/80 bg-white/58 backdrop-blur-2xl shadow-[0_14px_34px_rgba(31,31,46,0.10)] flex items-center justify-center text-brand-ink"
              aria-label="Open menu"
            >
              <Menu size={19} strokeWidth={2.4} />
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="mt-8 w-11 h-11 rounded-2xl border border-white/80 bg-white/58 backdrop-blur-2xl shadow-[0_14px_34px_rgba(31,31,46,0.10)] flex items-center justify-center text-brand-purple"
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={2.4} />
          </motion.button>
        </div>

        <main className="absolute left-6 right-6 top-[240px] flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[34px] font-bold tracking-[-0.9px] leading-[42px]"
          >
            Hi,{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#f6b4db] bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-[310px] text-[15px] leading-[23px] text-brand-mute"
          >
            Today is {dateLine}. Let&apos;s begin a wonderful social journey together.
          </motion.p>

          <motion.button
            data-prototype-target="1:1"
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 relative h-[92px] w-[92px] rounded-full border border-white/80 bg-white/56 backdrop-blur-2xl shadow-[0_22px_48px_rgba(108,92,231,0.20),0_0_42px_rgba(246,180,219,0.22)] flex items-center justify-center"
            aria-label="Start a new chat"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-brand-purple/25"
              animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-3 rounded-full bg-gradient-to-br from-brand-purple/22 via-white/20 to-brand-pink/18 blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative h-[58px] w-[58px] rounded-full gradient-brand flex items-center justify-center shadow-glow">
              <Plus size={28} className="text-white" strokeWidth={2.5} />
            </span>
          </motion.button>
        </main>
      </div>

      {menuOpen && (
        <SideMenu
          name={name}
          avatarUrl={readGeneratedAvatar()}
          onClose={() => setMenuOpen(false)}
        />
      )}

      <BottomNav active="CHAT" />
    </div>
  );
}

function SideMenu({
  name,
  avatarUrl,
  onClose,
}: {
  name: string;
  avatarUrl: string;
  onClose: () => void;
}) {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const items = [
    { Icon: IdCard, label: "Personal Card" },
    { Icon: BriefcaseBusiness, label: "Tasks" },
    { Icon: Search, label: "Search" },
    { Icon: QrCode, label: "Scan" },
    { Icon: MessageSquareWarning, label: "Feedback" },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-[120]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-ink/18 backdrop-blur-[2px]"
        aria-label="Close menu"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        className="absolute left-0 top-0 bottom-0 w-[78%] rounded-r-[34px] border-r border-white/80 bg-white/68 backdrop-blur-2xl shadow-[20px_0_58px_rgba(31,31,46,0.18)] px-5 pt-16 pb-6 overflow-y-auto"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="w-20 h-20 rounded-[28px] border border-white/80 bg-white/70 shadow-soft overflow-hidden flex items-center justify-center">
              {avatarUrl && (
                <img src={avatarUrl} alt="" className="h-full w-full object-cover object-top" />
              )}
            </div>
            <div className="mt-4 text-[22px] font-bold tracking-[-0.4px] text-brand-ink">
              {name}
            </div>
            <div className="mt-1 text-[11px] font-bold tracking-[0.2em] text-brand-purple">
              SECOND SELF USER
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-white/70 border border-white shadow-sm flex items-center justify-center text-brand-mute"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-7 space-y-2">
          {items.map(({ Icon, label }) => (
            <motion.button
              key={label}
              onClick={() => setActiveSheet(label)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-2xl border border-white/70 bg-white/56 backdrop-blur-xl px-3.5 py-3 flex items-center gap-3 text-left shadow-[0_10px_30px_rgba(108,92,231,0.08)] transition-colors"
            >
              <span className="w-9 h-9 rounded-2xl gradient-brand-soft border border-brand-lavender/30 flex items-center justify-center text-brand-purple">
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span className="text-[13px] font-bold text-brand-ink">{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.aside>

      {activeSheet && (
        <MenuBottomSheet
          active={activeSheet}
          name={name}
          avatarUrl={avatarUrl}
          onClose={() => setActiveSheet(null)}
        />
      )}
    </motion.div>
  );
}

function MenuBottomSheet({
  active,
  name,
  avatarUrl,
  onClose,
}: {
  active: string;
  name: string;
  avatarUrl: string;
  onClose: () => void;
}) {
  const detail = {
    "Personal Card": {
      title: "Personal Card",
      subtitle: "Share your identity card with new contacts.",
      action: "Save Card",
      Icon: IdCard,
    },
    Tasks: {
      title: "Tasks",
      subtitle: "Your gentle social tasks for today.",
      action: "Start Task",
      Icon: BriefcaseBusiness,
    },
    Search: {
      title: "Search",
      subtitle: "Find people, spaces, drafts, and approved context.",
      action: "Open Search",
      Icon: Search,
    },
    Scan: {
      title: "Scan",
      subtitle: "Scan a QR code to add a friend or join a space.",
      action: "Open Camera",
      Icon: QrCode,
    },
    "Recommend to Friends": {
      title: "Recommend to Friends",
      subtitle: "Invite friends to create their own Second Self.",
      action: "Invite Friends",
      Icon: Gift,
    },
    Feedback: {
      title: "Feedback",
      subtitle: "Tell us what felt helpful, awkward, or missing.",
      action: "Send Feedback",
      Icon: MessageSquareWarning,
    },
  }[active] ?? {
    title: active,
    subtitle: "Second Self action",
    action: "Continue",
    Icon: CheckCircle2,
  };
  const Icon = detail.Icon;

  return (
    <motion.div
      className="absolute inset-0 z-[150]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-ink/32 backdrop-blur-[3px]"
        aria-label="Close sheet"
        onClick={onClose}
      />
      <motion.section
        initial={{ y: 420 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 330, damping: 34 }}
        className="absolute left-0 right-0 bottom-0 rounded-t-[32px] bg-white px-6 pt-6 pb-7 shadow-[0_-22px_58px_rgba(31,31,46,0.20)]"
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-brand-bg flex items-center justify-center text-brand-ink"
            aria-label="Close sheet"
          >
            <X size={22} strokeWidth={2.6} />
          </button>
          <div className="text-[22px] font-bold tracking-[-0.4px] text-brand-ink">
            {detail.title}
          </div>
          <div className="w-10" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f7f3ff] via-white to-[#fff4fb] shadow-soft overflow-hidden">
            {avatarUrl && (
              <img src={avatarUrl} alt="" className="h-full w-full object-cover object-top" />
            )}
          </div>
          <div className="text-left">
            <div className="text-[17px] font-bold text-brand-ink">{name}</div>
            <div className="text-[15px] text-brand-mute">second.me/{name.toLowerCase()}</div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          {active === "Search" ? (
            <div className="w-full rounded-[28px] border border-brand-bg bg-brand-bg/50 px-4 py-4 flex items-center gap-3">
              <Search size={19} className="text-brand-purple" />
              <div className="text-[14px] text-brand-mute">Search people, spaces, or drafts...</div>
            </div>
          ) : active === "Tasks" ? (
            <div className="w-full rounded-[28px] border border-brand-bg bg-brand-bg/50 p-4 space-y-3">
              {["Say hi to one new coworker", "Review one AI draft", "Join a community space"].map(
                (task) => (
                  <div key={task} className="flex items-center gap-3 text-[13px] text-brand-ink">
                    <CheckCircle2 size={16} className="text-brand-purple" />
                    {task}
                  </div>
                ),
              )}
            </div>
          ) : active === "Feedback" ? (
            <div className="w-full h-[170px] rounded-[28px] border border-brand-bg bg-brand-bg/50 p-4 text-left text-[14px] text-brand-mute">
              What should I improve next?
            </div>
          ) : active === "Scan" ? (
            <QrScanner />
          ) : (
            <QrPreview active={active} />
          )}
        </div>

        <div className="mt-5 text-center text-[16px] font-semibold text-brand-mute">
          {detail.subtitle}
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-full border-2 border-brand-lavender/55 bg-white py-4 text-[16px] font-bold text-brand-ink shadow-soft flex items-center justify-center gap-3"
        >
          <Icon size={19} className="text-brand-purple" />
          {detail.action}
          <span className="text-[22px] leading-none">›</span>
        </button>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {[
            { Icon: Users, label: "Chat" },
            { Icon: Gift, label: "Friends" },
            { Icon: Share2, label: "Share" },
            { Icon: Clipboard, label: "Copy" },
          ].map((item) => (
            <button key={item.label} type="button" className="flex flex-col items-center gap-2">
              <span className="w-14 h-14 rounded-full border border-brand-bg bg-white shadow-sm flex items-center justify-center text-brand-purple">
                <item.Icon size={22} />
              </span>
              <span className="text-[11px] font-semibold text-brand-mute">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function QrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState("Opening camera...");

  useEffect(() => {
    let cancelled = false;

    const openCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("Camera is not supported in this browser.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 720 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setStatus("Align the QR code inside the frame.");
      } catch {
        setStatus("Camera permission was blocked. Please allow camera access.");
      }
    };

    void openCamera();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="relative w-[245px] h-[245px] rounded-[30px] overflow-hidden border border-brand-bg bg-brand-ink shadow-sm">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-ink/20 to-brand-purple/20" />
      <div className="absolute inset-8 rounded-[24px] border-2 border-white/80 shadow-[0_0_30px_rgba(142,227,196,0.35)]" />
      <motion.div
        className="absolute left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-brand-mint to-transparent"
        animate={{ top: ["26%", "74%", "26%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-4 left-4 right-4 rounded-full bg-white/78 px-3 py-2 text-center text-[10px] font-bold text-brand-purple backdrop-blur-xl">
        {status}
      </div>
    </div>
  );
}

function QrPreview({ active }: { active: string }) {
  return (
    <div className="relative w-[230px] h-[230px] rounded-[30px] border border-brand-bg bg-white p-5 shadow-sm">
      <div className="grid grid-cols-9 gap-1">
        {Array.from({ length: 81 }).map((_, index) => {
          const filled =
            index % 2 === 0 ||
            index % 7 === 0 ||
            index % 13 === 0 ||
            (active.length + index) % 11 === 0;
          return (
            <span
              key={index}
              className={`aspect-square rounded-full ${filled ? "bg-brand-ink" : "bg-transparent"}`}
            />
          );
        })}
      </div>
      <div className="absolute left-1/2 top-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white border border-brand-bg shadow-soft flex flex-col items-center justify-center">
        <div className="text-[16px] font-bold text-brand-ink">Me.</div>
        <div className="mt-1 flex gap-0.5">
          <span className="w-5 h-5 rounded-full bg-brand-purple/70" />
          <span className="w-5 h-5 rounded-full bg-brand-peach/80" />
        </div>
      </div>
    </div>
  );
}

export function BottomNav({ active }: { active: string }) {
  void active;
  return null;
}

export function FloatingBottomNav({ active }: { active: string }) {
  const items = [
    { Icon: ChatNavIcon, key: "CHAT", label: "Chat", tab: "chat" },
    { Icon: CommunityNavIcon, key: "COMMUNITY", label: "Space", tab: "community" },
    { Icon: PresenceNavIcon, key: "PRESENCE", label: "Presence", tab: "presence" },
    { Icon: SettingsNavIcon, key: "SETTINGS", label: "Settings", tab: "settings" },
  ];
  const activeKey = active.toUpperCase();
  const isAvatarActive = activeKey === "AI";
  const [avatarUrl, setAvatarUrl] = useState(
    () => window.sessionStorage.getItem(generatedAvatarStorageKey) || "",
  );
  const [avatarBubble, setAvatarBubble] = useState(false);

  useEffect(() => {
    setAvatarUrl(window.sessionStorage.getItem(generatedAvatarStorageKey) || "");
  }, [active]);

  useEffect(() => {
    let timer: number | undefined;
    const handleAvatarReady = (event: Event) => {
      const imageUrl = (event as CustomEvent<{ imageUrl?: string }>).detail?.imageUrl;
      setAvatarUrl(imageUrl || readGeneratedAvatar());
      setAvatarBubble(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setAvatarBubble(false), 2000);
    };

    window.addEventListener("second-self-avatar-ready", handleAvatarReady);
    return () => {
      window.removeEventListener("second-self-avatar-ready", handleAvatarReady);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <motion.nav
      className="absolute bottom-2 left-4 right-4 z-[90] h-[88px]"
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[76px] overflow-hidden rounded-[38px] border border-white/75 bg-[#fbf9ff]/72 px-5 py-2.5 shadow-[0_20px_48px_rgba(31,31,46,0.12),0_0_34px_rgba(108,92,231,0.22)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/82 via-[#f4efff]/62 to-white/78" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[86px] w-[130px] -translate-x-1/2 rounded-full bg-[#a78bfa]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-[#6c5ce7]/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-6 h-28 w-28 rounded-full bg-[#f6b4db]/12 blur-2xl" />
        <div className="relative grid grid-cols-[1fr_1fr_90px_1fr_1fr] items-end gap-1">
          {items.map(({ Icon, key, label, tab }, index) => {
            const isActive = activeKey === key;
            const gridColumn = index < 2 ? index + 1 : index + 2;
            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.94 }}
                style={{ gridColumn }}
                data-prototype-tab={tab}
                className={`group flex h-[57px] flex-col items-center justify-center gap-1 rounded-2xl text-[9.5px] font-bold tracking-[-0.01em] transition-colors ${
                  isActive ? "text-[#6c5ce7]" : "text-[#6f7285]"
                }`}
              >
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-2xl transition-all ${
                    isActive ? "text-[#6c5ce7]" : "text-[#6f7285] group-hover:text-[#56596b]"
                  }`}
                >
                  <Icon active={isActive} />
                </span>
                <span>{label}</span>
                {isActive && (
                  <motion.span
                    className="h-0.5 w-12 rounded-full bg-[#6c5ce7]"
                    layoutId="bottom-nav-active-line"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className={`absolute left-1/2 top-0 flex h-[88px] w-[88px] -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-[#f1edff] bg-white shadow-[0_18px_42px_rgba(31,31,46,0.16),0_0_34px_rgba(108,92,231,0.25)] ${
          isAvatarActive ? "ring-4 ring-[#a78bfa]/35" : ""
        }`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Second Self"
        data-prototype-tab="ai"
      >
        {avatarBubble && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-[92px] left-1/2 w-[188px] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/88 px-3 py-2 text-[11px] font-bold text-brand-ink shadow-soft backdrop-blur-xl"
          >
            Hi, I am {readUserName()} as well.
          </motion.span>
        )}
        <span className="sr-only">AI</span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f7f3ff] via-white to-[#fff4fb]" />
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt=""
            className="relative h-[78px] w-[78px] rounded-full object-cover object-top"
          />
        )}
      </motion.button>
    </motion.nav>
  );
}

function ChatNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M6.3 9.7A4.2 4.2 0 0 1 10.5 5.5h11A4.2 4.2 0 0 1 25.7 9.7v6.6a4.2 4.2 0 0 1-4.2 4.2h-4.2l-5.8 5.4v-5.4h-1A4.2 4.2 0 0 1 6.3 16.3V9.7Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 12.7h7.6M12.2 16h5.4"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CommunityNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <circle
        cx="16"
        cy="16"
        r="11.2"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M11.6 9.3c1.8 2.1 4 .2 5.7 1.5 1.7 1.2-.8 3.1.5 4.5 1 1.1 2.6.1 3.7 1.4 1.2 1.4.2 3.4-1.4 5.2M9.3 18.1c2.5-.4 4 .4 4.7 2.2.6 1.5-.4 2.5-.2 4.1"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PresenceNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect
        x="5"
        y="6"
        width="22"
        height="20"
        rx="3.6"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="m10 21 5.2-5 3.4 3.1 5-6.1"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6 13h4v4"
        fill="none"
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 5.2 18.2 7l2.8-.4 1.2 2.6 2.5 1.4-.5 2.8 1.4 2.6-1.4 2.6.5 2.8-2.5 1.4-1.2 2.6-2.8-.4-2.2 1.8-2.2-1.8-2.8.4-1.2-2.6-2.5-1.4.5-2.8L6.4 16l1.4-2.6-.5-2.8 2.5-1.4L11 6.6l2.8.4L16 5.2Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle
        cx="16"
        cy="16"
        r="3.6"
        fill={active ? "#ffffff" : "none"}
        stroke={active ? "#ffffff" : "currentColor"}
        strokeWidth="2.5"
      />
    </svg>
  );
}
