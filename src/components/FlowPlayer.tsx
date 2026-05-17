import { useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, Home, Layers, Music, RotateCcw, Smile, TrendingUp } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { flows } from "@/lib/flows";

type Props = { onOpenGallery: () => void };
type NodeKey = `${number}:${number}`;

type Rule = {
  match: string | string[];
  target: NodeKey;
  label?: string;
};

const key = (flow: number, step: number) => `${flow}:${step}` as NodeKey;
const home = key(0, 8);

const flowStarts = [
  { label: "Onboarding", target: key(0, 0) },
  { label: "Warm-up", target: key(1, 1) },
  { label: "Sensitive", target: key(2, 0) },
  { label: "Control", target: key(3, 0) },
  { label: "Second Self", target: key(4, 0) },
  { label: "Relationships", target: key(5, 0) },
  { label: "Challenge", target: key(6, 0) },
  { label: "Spaces", target: key(7, 0) },
];

const graph: Record<NodeKey, Rule[]> = {
  [key(0, 0)]: [{ match: "GET STARTED", target: key(0, 1) }],
  [key(0, 1)]: [
    { match: ["CONTINUE", "SKIP FOR NOW"], target: key(0, 2) },
    { match: "STEP 2 OF 3", target: key(0, 2) },
    { match: "STEP 3 OF 3", target: key(0, 4) },
  ],
  [key(0, 2)]: [
    { match: ["CONNECT", "CONTINUE", "SKIP FOR NOW"], target: key(0, 3) },
    { match: "STEP 1 OF 3", target: key(0, 1) },
    { match: "STEP 3 OF 3", target: key(0, 4) },
  ],
  [key(0, 3)]: [
    { match: "IMPORT SELECTED", target: key(0, 4) },
    { match: "CANCEL", target: key(0, 2) },
  ],
  [key(0, 4)]: [
    { match: "Confirm and Create AI Persona", target: key(0, 5) },
    { match: "STEP 1 OF 3", target: key(0, 1) },
    { match: "STEP 2 OF 3", target: key(0, 2) },
  ],
  [key(0, 5)]: [
    { match: "Customize", target: key(0, 6) },
    { match: "Continue", target: key(0, 7) },
    { match: "I am shy", target: key(0, 9) },
  ],
  [key(0, 6)]: [{ match: "Save", target: home }],
  [key(0, 9)]: [{ match: "Lets Go", target: key(0, 7) }],
  [home]: [
    { match: "View draft", target: key(1, 5), label: "Open Alex message draft" },
    { match: "Start New Chat", target: key(1, 1) },
    { match: "Review Paths", target: key(1, 2) },
    { match: "AI Suggestions", target: key(1, 5) },
    { match: "Safety Center", target: key(3, 0) },
    { match: "View all conversations", target: key(5, 0) },
    { match: "SOCIAL", target: key(1, 1) },
    { match: "AI", target: key(4, 0) },
    { match: "PRESENCE", target: key(7, 8) },
    { match: "PROFILE", target: key(4, 0) },
  ],

  [key(1, 1)]: [
    { match: "Photography", target: key(7, 3) },
    { match: "AI_SYNTH", target: key(7, 4) },
    { match: "Review path", target: key(1, 2) },
    { match: "Spaces", target: key(7, 0) },
    { match: "HOME", target: home },
    { match: "PRESENCE", target: key(7, 8) },
  ],
  [key(1, 2)]: [
    { match: "Private data blocked", target: key(1, 3) },
    { match: "Review draft in Message", target: key(1, 5) },
  ],
  [key(1, 3)]: [
    { match: "Manage Permissions", target: key(1, 4) },
    { match: "Got it", target: key(1, 5) },
  ],
  [key(1, 4)]: [
    {
      match: ["Strict", "Balanced", "Flexible"],
      target: key(1, 5),
      label: "Save permissions and open message",
    },
  ],
  [key(1, 5)]: [
    { match: "View more", target: key(1, 6) },
    {
      match: ["Friendly", "Direct", "Warm"],
      target: key(1, 6),
      label: "Choose tone and open Spark Reply",
    },
    { match: "Write your own message", target: key(2, 1), label: "Type a sensitive reply" },
  ],
  [key(1, 6)]: [
    { match: "Insert Draft", target: key(2, 1) },
    { match: "Edit Before Sending", target: key(1, 5) },
    { match: "Back to Chat", target: key(1, 5) },
  ],
  [key(1, 7)]: [{ match: "Reply", target: key(1, 8) }],
  [key(1, 8)]: [
    { match: "View more", target: key(1, 6) },
    { match: ["HOME", "Back to Home"], target: home },
    { match: "SOCIAL", target: key(1, 1) },
  ],

  [key(2, 0)]: [
    { match: "View more", target: key(2, 1) },
    { match: "Warm", target: key(2, 1) },
  ],
  [key(2, 1)]: [
    { match: "Learn more", target: key(2, 2) },
    { match: "Take over and reply yourself", target: key(2, 0) },
    { match: "Stay in human-led mode", target: key(2, 3) },
    { match: "Ask again later", target: key(2, 4) },
  ],
  [key(2, 2)]: [{ match: "Got it", target: key(2, 3) }],
  [key(2, 3)]: [{ match: "Stay Human-led", target: key(2, 4) }],
  [key(2, 4)]: [{ match: "Confirm", target: home }],

  [key(3, 0)]: [
    { match: "Continue", target: key(6, 0) },
    { match: "Change Mode", target: key(3, 3) },
    { match: "View details", target: key(3, 8) },
    { match: "Manage all", target: key(3, 16) },
    { match: "Context Rules", target: key(3, 15) },
    { match: "Quick Edit", target: key(3, 16) },
    { match: "HOME", target: home },
    { match: "SOCIAL", target: key(1, 1) },
    { match: "PRESENCE", target: key(7, 8) },
  ],
  [key(3, 3)]: [
    { match: "Confirm Mode", target: key(3, 5) },
    { match: "Learn about each mode", target: key(3, 4) },
  ],
  [key(3, 4)]: [{ match: "Switch to Observer", target: key(3, 0) }],
  [key(3, 5)]: [{ match: "Switch to Co-pilot", target: key(3, 0) }],
  [key(3, 6)]: [{ match: "Switch to Assistant", target: key(3, 0) }],
  [key(3, 7)]: [{ match: "Switch to Auto-pilot", target: key(3, 0) }],
  [key(3, 8)]: [
    { match: "View contexts", target: key(3, 15) },
    { match: "Suggest", target: key(3, 9) },
    { match: "Draft", target: key(3, 10) },
    { match: "Act", target: key(3, 11) },
  ],
  [key(3, 9)]: [
    { match: "View contexts", target: key(3, 15) },
    { match: "Off", target: key(3, 8) },
    { match: "Draft", target: key(3, 10) },
    { match: "Act", target: key(3, 11) },
  ],
  [key(3, 10)]: [
    { match: "View contexts", target: key(3, 15) },
    { match: "Off", target: key(3, 8) },
    { match: "Suggest", target: key(3, 9) },
    { match: "Act", target: key(3, 11) },
  ],
  [key(3, 11)]: [
    { match: "View contexts", target: key(3, 15) },
    { match: "Off", target: key(3, 8) },
    { match: "Suggest", target: key(3, 9) },
    { match: "Draft", target: key(3, 10) },
  ],
  [key(3, 12)]: [{ match: "Friends", target: key(3, 13) }],
  [key(3, 13)]: [{ match: "Close Relationships", target: key(3, 14) }],
  [key(3, 14)]: [{ match: "Write by myself", target: key(3, 0) }],
  [key(3, 15)]: [{ match: "Back", target: key(3, 0) }],
  [key(3, 16)]: [{ match: "Apply Changes", target: key(3, 0) }],
  [key(3, 17)]: [{ match: "Change Mode", target: key(3, 3) }],

  [key(4, 0)]: [
    { match: "View Change Details", target: key(4, 2) },
    { match: "Go to AI Control Center", target: key(3, 0) },
  ],
  [key(4, 1)]: [
    { match: "View Change Details", target: key(4, 2) },
    { match: "Go to AI Control Center", target: key(3, 0) },
  ],
  [key(4, 2)]: [
    { match: "Adjust AI Boundary", target: key(3, 0) },
    { match: "View AI Trail", target: key(4, 4) },
  ],
  [key(4, 3)]: [
    { match: "Adjust AI Boundary", target: key(3, 0) },
    { match: "View AI Trail", target: key(4, 4) },
  ],
  [key(4, 4)]: [{ match: "View details", target: key(4, 5) }],
  [key(4, 5)]: [{ match: "View details", target: key(4, 6) }],
  [key(4, 6)]: [{ match: "Change Mode", target: key(3, 3) }],

  [key(5, 0)]: [
    { match: "Review signals", target: key(5, 1) },
    { match: "Alex Chen", target: key(5, 2) },
  ],
  [key(5, 1)]: [{ match: "Alex Chen", target: key(5, 2) }],
  [key(5, 2)]: [
    { match: "Relationship Check-in", target: key(5, 3) },
    { match: "View AI Trail", target: key(4, 4) },
  ],
  [key(5, 3)]: [
    { match: "Save Check-in", target: key(5, 4) },
    { match: "View detail", target: key(5, 2) },
  ],
  [key(5, 4)]: [
    { match: "Back to Alex Chen", target: key(5, 2) },
    { match: "View AI Trail", target: key(4, 4) },
  ],
  [key(5, 5)]: [
    { match: "Continue", target: key(1, 5) },
    { match: "Back", target: key(5, 2) },
  ],

  [key(6, 0)]: [{ match: "Continue Challenge", target: key(6, 1) }],
  [key(6, 1)]: [{ match: "Continue Challenge", target: key(6, 2) }],
  [key(6, 2)]: [
    { match: "Go to Frame Shop", target: key(6, 8) },
    { match: "Back to Home", target: home },
    { match: "Come back tomorrow for a new challenge", target: key(6, 3) },
  ],
  [key(6, 3)]: [{ match: "Back to Daily Challenge", target: key(3, 17) }],
  [key(6, 4)]: [
    { match: "Reflect Now", target: key(6, 5) },
    { match: "Context Rules", target: key(3, 15) },
    { match: "Quick Edit", target: key(3, 16) },
  ],
  [key(6, 5)]: [
    { match: "Start Reflection", target: key(6, 6) },
    { match: "Back to Home", target: home },
  ],
  [key(6, 6)]: [{ match: "Submit Reflection", target: key(6, 7) }],
  [key(6, 7)]: [
    { match: "Back to Home", target: home },
    { match: "Go to Frame Shop", target: key(6, 9) },
    { match: "Come back tomorrow for a new challenge", target: key(3, 0) },
  ],
  [key(6, 8)]: [
    { match: "Heart Halo", target: key(6, 11) },
    { match: "Cloud Float", target: key(6, 10) },
    { match: "Unlock", target: key(6, 10) },
    { match: "Points Guide", target: key(6, 14) },
  ],
  [key(6, 9)]: [{ match: "Unlock and Apply", target: key(6, 11) }],
  [key(6, 10)]: [{ match: "Unlock and Apply", target: key(6, 12) }],
  [key(6, 11)]: [{ match: "Apply Frame", target: key(6, 9) }],
  [key(6, 12)]: [
    { match: "Apply Frame", target: key(6, 9) },
    { match: "Cancel", target: key(6, 8) },
  ],
  [key(6, 13)]: [{ match: "Apply Frame", target: key(6, 8) }],
  [key(6, 14)]: [
    { match: "Go to Daily Challenge", target: key(6, 0) },
    { match: "Back to Frame Shop", target: key(6, 8) },
  ],

  [key(7, 0)]: [
    { match: "Connections", target: key(1, 1) },
    { match: "Photography", target: key(7, 3) },
    { match: "AI_SYNTH", target: key(7, 4) },
    { match: "Review path", target: key(7, 1) },
    { match: "HOME", target: home },
  ],
  [key(7, 1)]: [{ match: "Preview", target: key(7, 2) }],
  [key(7, 2)]: [
    { match: "Manage Permissions", target: key(1, 4) },
    { match: "Got it", target: key(7, 3) },
  ],
  [key(7, 3)]: [
    { match: "SYNTH_UNIT_91", target: key(7, 7) },
    { match: "ERIK_S_08", target: key(7, 7) },
    { match: "New Space", target: key(7, 5) },
    { match: "RAW_DATA", target: key(7, 6) },
    { match: "HUMAN_AUTH", target: key(7, 7) },
    { match: "AI_SYNTH", target: key(7, 4) },
    { match: "PRESENCE", target: key(7, 8) },
  ],
  [key(7, 4)]: [
    { match: "VALERIE_ARCH", target: key(7, 7) },
    { match: "HUMAN_AUTH", target: key(7, 7) },
    { match: "Post", target: key(7, 5) },
  ],
  [key(7, 5)]: [{ match: "Publish", target: key(7, 6) }],
  [key(7, 6)]: [{ match: "Profile", target: key(7, 7) }],
  [key(7, 7)]: [{ match: "AI Presence", target: key(7, 8) }],
  [key(7, 8)]: [
    { match: "View Details", target: key(7, 9) },
    { match: "Adjust Visibility", target: key(7, 10) },
    { match: "Device Access", target: key(7, 11) },
    { match: "HOME", target: home },
  ],
  [key(7, 9)]: [{ match: "PRESENCE", target: key(7, 10) }],
  [key(7, 10)]: [
    { match: "Pause AI Social Presence", target: home },
    { match: "View Details", target: key(7, 11) },
  ],
  [key(7, 11)]: [
    { match: "View Details", target: key(7, 12) },
    { match: "Adjust Visibility", target: key(7, 13) },
  ],
  [key(7, 12)]: [{ match: "Pause All Device Presence", target: key(7, 13) }],
  [key(7, 13)]: [{ match: "Pause All Device Presence", target: home }],
};

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function readClickText(target: HTMLElement) {
  const actionable = target.closest(
    "button,a,[role='button'],.cursor-pointer",
  ) as HTMLElement | null;
  if (actionable) return actionable.innerText || actionable.textContent || "";
  return target.innerText || target.textContent || "";
}

function findRule(rules: Rule[], text: string) {
  const n = normalize(text);
  return rules.find((rule) => {
    const matches = Array.isArray(rule.match) ? rule.match : [rule.match];
    return matches.some((m) => n.includes(normalize(m)));
  });
}

const tabTargets: Record<string, NodeKey> = {
  home,
  social: key(1, 1),
  ai: key(6, 8),
  presence: key(7, 8),
  profile: key(6, 4),
};

function tabFromText(text: string) {
  const n = normalize(text);
  if (["home", "social", "ai", "presence", "profile"].includes(n)) return n;
  return null;
}

function activeTabFor(node: NodeKey) {
  const [flowIdx, stepIdx] = node.split(":").map(Number);
  if (node === home) return "HOME";
  if (flowIdx === 1 && [1].includes(stepIdx)) return "SOCIAL";
  if (flowIdx === 7 && [0, 3, 4, 5, 6, 7].includes(stepIdx)) return "SOCIAL";
  if (flowIdx === 7 && stepIdx >= 8) return "PRESENCE";
  if (flowIdx === 3) return "PROFILE";
  if (flowIdx === 5 && [0, 1].includes(stepIdx)) return "PROFILE";
  if (flowIdx === 6 && [4].includes(stepIdx)) return "PROFILE";
  if (flowIdx === 6 && [8, 9].includes(stepIdx)) return "AI";
  return null;
}

function PrototypeTabBar({ active }: { active: string }) {
  const items = [
    { Icon: Home, label: "HOME" },
    { Icon: Music, label: "SOCIAL" },
    { Icon: Smile, label: "AI" },
    { Icon: Fingerprint, label: "PRESENCE" },
    { Icon: TrendingUp, label: "PROFILE" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[90] glass border-t border-brand-bg py-2 px-3 grid grid-cols-5 text-[8px] font-bold tracking-wider">
      {items.map(({ Icon, label }) => {
        const selected = label === active;
        return (
          <button
            key={label}
            className={`flex flex-col items-center gap-1 ${selected ? "text-brand-purple" : "text-brand-mute"}`}
          >
            <div
              className={`w-8 h-8 rounded-2xl flex items-center justify-center ${selected ? "gradient-brand shadow-soft" : ""}`}
            >
              <Icon size={14} strokeWidth={2} className={selected ? "text-white" : ""} />
            </div>
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function FlowPlayer({ onOpenGallery }: Props) {
  const [node, setNode] = useState<NodeKey>(key(0, 0));
  const [history, setHistory] = useState<NodeKey[]>([]);
  const [selectedAiMode, setSelectedAiMode] = useState<
    "Observer" | "Co-pilot" | "Assistant" | "Auto-pilot"
  >("Co-pilot");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tapPulse, setTapPulse] = useState(false);
  const [flowIdx, stepIdx] = node.split(":").map(Number);
  const flow = flows[flowIdx];
  const step = flow.steps[stepIdx];
  const StepComponent = step.Component;
  const rules = graph[node] ?? [];
  const displayScale = 0.66;
  const activeTab = activeTabFor(node);

  const allNodes = useMemo(
    () =>
      flows.flatMap((f, fi) => f.steps.map((s, si) => ({ key: key(fi, si), flow: f, step: s }))),
    [],
  );
  const currentIndex = allNodes.findIndex((item) => item.key === node);

  const navigate = (target: NodeKey) => {
    const nextIndex = allNodes.findIndex((item) => item.key === target);
    setDirection(nextIndex >= currentIndex ? 1 : -1);
    setHistory((items) => [...items, node]);
    setNode(target);
  };

  const goBack = () => {
    const previous = history.at(-1) ?? home;
    const previousIndex = allNodes.findIndex((item) => item.key === previous);
    setDirection(previousIndex <= currentIndex ? -1 : 1);
    setHistory((items) => items.slice(0, -1));
    setNode(previous);
  };

  const restart = () => {
    setDirection(-1);
    setHistory([]);
    setNode(key(0, 0));
  };

  const isBackIconTap = (event: MouseEvent<HTMLDivElement>, text: string) => {
    if (normalize(text)) return false;
    if (node === key(0, 0)) return false;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return x < 72 * displayScale && y > 40 * displayScale && y < 160 * displayScale;
  };

  const targetFromIconRegion = (event: MouseEvent<HTMLDivElement>): NodeKey | null => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const s = displayScale;

    const topRightBell =
      x > 350 * s &&
      y > 54 * s &&
      y < 118 * s &&
      [key(1, 1), key(7, 0), key(7, 3), key(7, 4)].includes(node);
    if (topRightBell) return key(7, 6);

    const feedFab = x > 350 * s && y > 760 * s && [key(7, 3), key(7, 4)].includes(node);
    if (feedFab) return key(7, 5);

    const interactionAvatar =
      node === key(7, 6) && x > 8 * s && x < 86 * s && y > 88 * s && y < 510 * s;
    if (interactionAvatar) return key(7, 7);

    return null;
  };

  const handlePrototypeTap = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("input,textarea,select")) return;

    const text = readClickText(target);
    const normalizedText = normalize(text);
    if (isBackIconTap(event, text)) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      goBack();
      return;
    }

    const iconTarget = targetFromIconRegion(event);
    if (iconTarget) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      navigate(iconTarget);
      return;
    }

    const tab = tabFromText(text);
    if (tab) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      navigate(tabTargets[tab]);
      return;
    }

    if (node === key(3, 3)) {
      if (normalizedText.includes("observer")) {
        setSelectedAiMode("Observer");
        setTapPulse(true);
        window.setTimeout(() => setTapPulse(false), 260);
        return;
      }
      if (normalizedText.includes("co-pilot")) {
        setSelectedAiMode("Co-pilot");
        setTapPulse(true);
        window.setTimeout(() => setTapPulse(false), 260);
        return;
      }
      if (normalizedText.includes("assistant")) {
        setSelectedAiMode("Assistant");
        setTapPulse(true);
        window.setTimeout(() => setTapPulse(false), 260);
        return;
      }
      if (normalizedText.includes("auto-pilot")) {
        setSelectedAiMode("Auto-pilot");
        setTapPulse(true);
        window.setTimeout(() => setTapPulse(false), 260);
        return;
      }
      if (normalizedText.includes("confirm mode")) {
        const targetByMode = {
          Observer: key(3, 4),
          "Co-pilot": key(3, 5),
          Assistant: key(3, 6),
          "Auto-pilot": key(3, 7),
        } satisfies Record<typeof selectedAiMode, NodeKey>;
        setTapPulse(true);
        window.setTimeout(() => setTapPulse(false), 260);
        navigate(targetByMode[selectedAiMode]);
        return;
      }
    }

    if (node === key(3, 16) && normalizedText.includes("apply changes")) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      goBack();
      return;
    }

    const rule = findRule(rules, text);
    if (!rule) return;

    setTapPulse(true);
    window.setTimeout(() => setTapPulse(false), 260);
    navigate(rule.target);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(180deg, #e9e6f3 0%, #f3eaf6 50%, #eaf2f8 100%)" }}
    >
      <div className="px-6 pt-6 pb-3 flex items-center gap-3 max-w-6xl mx-auto w-full">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold tracking-[0.35em] uppercase text-brand-purple">
            AI SECOND SELF · INTEGRATED APP PROTOTYPE
          </div>
          <div className="text-[18px] font-bold text-brand-ink truncate">{flow.title}</div>
          <div className="text-[12px] text-brand-mute truncate">
            {step.label}
            {step.hint ? ` · ${step.hint}` : ""}
          </div>
        </div>
        <button
          onClick={restart}
          className="px-3 py-2 rounded-xl bg-white/70 backdrop-blur border border-white text-[12px] font-bold text-brand-ink flex items-center gap-2 hover:bg-white"
        >
          <RotateCcw size={14} /> Restart
        </button>
        <button
          onClick={onOpenGallery}
          className="px-3 py-2 rounded-xl bg-brand-ink text-white text-[12px] font-bold flex items-center gap-2"
        >
          <Home size={14} /> Gallery
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="rounded-2xl bg-white/70 border border-white px-4 py-3 flex flex-wrap items-center gap-2 shadow-soft">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-brand-mute">
            <Layers size={13} /> Valid taps on this screen
          </div>
          {rules.length ? (
            rules.map((rule, i) => {
              const label = rule.label ?? (Array.isArray(rule.match) ? rule.match[0] : rule.match);
              return (
                <span
                  key={`${label}-${i}`}
                  className="px-2.5 py-1 rounded-full bg-white border border-brand-bg text-[10px] font-bold text-brand-ink"
                >
                  {label}
                </span>
              );
            })
          ) : (
            <span className="text-[11px] text-brand-mute">
              This screen keeps local controls only.
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 py-5">
        <div
          className="relative"
          style={{ width: 440 * displayScale, height: 1026 * displayScale }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={node}
              custom={direction}
              initial={{ opacity: 0, x: direction * 36, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 36, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-start justify-center"
            >
              <div
                className="relative origin-top"
                style={{ transform: `scale(${displayScale})` }}
                onClickCapture={handlePrototypeTap}
              >
                <PhoneFrame title={`${flow.id.toUpperCase()} · ${step.label}`} subtitle={step.hint}>
                  <StepComponent />
                  {activeTab && <PrototypeTabBar active={activeTab} />}
                </PhoneFrame>
                <AnimatePresence>
                  {tapPulse && (
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-purple/50"
                      initial={{ opacity: 0.8, scale: 0.25 }}
                      animate={{ opacity: 0, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="pb-6 px-6 max-w-4xl mx-auto w-full">
        <div className="rounded-2xl bg-white/60 border border-white p-2 flex flex-wrap items-center justify-center gap-2 shadow-soft">
          {flowStarts.map((item) => (
            <span
              key={item.label}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold ${node === item.target ? "bg-brand-ink text-white" : "bg-white/70 text-brand-mute border border-brand-bg"}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
