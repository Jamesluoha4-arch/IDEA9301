import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingBottomNav } from "@/components/frames/F09_Home";
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
const home = key(0, 7);
const aiModeStorageKey = "second-self.ai-control-mode";

type AiMode = "Observer" | "Co-pilot" | "Assistant" | "Auto-pilot";

function readSelectedAiMode(): AiMode {
  const saved =
    typeof window === "undefined" ? "" : window.sessionStorage.getItem(aiModeStorageKey);
  return saved === "Observer" ||
    saved === "Co-pilot" ||
    saved === "Assistant" ||
    saved === "Auto-pilot"
    ? saved
    : "Co-pilot";
}

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
    { match: ["Confirm and Create AI Persona", "Confirm and Bring Me to Life"], target: key(0, 5) },
    { match: "STEP 1 OF 3", target: key(0, 1) },
    { match: "STEP 2 OF 3", target: key(0, 2) },
  ],
  [key(0, 5)]: [
    { match: "Continue", target: key(0, 6) },
    { match: "I am shy", target: key(0, 8) },
  ],
  [key(0, 6)]: [
    { match: "Back again", target: key(0, 5) },
    { match: "Got it", target: home },
  ],
  [key(0, 8)]: [{ match: "Lets Go", target: key(0, 6) }],
  [home]: [
    { match: "View draft", target: key(1, 6), label: "Open Jim message draft" },
    { match: "Start New Chat", target: key(1, 1) },
    { match: ["Review Drafts", "Review Paths"], target: key(1, 6) },
    { match: ["Conversation Help", "AI Suggestions"], target: key(1, 6) },
    { match: ["AI Control", "Safety Center"], target: key(3, 0) },
    { match: "View all conversations", target: key(5, 0) },
    { match: ["CHAT", "SOCIAL"], target: key(1, 6) },
    { match: ["COMMUNITY", "SPACE", "绀惧尯"], target: key(7, 0) },
    { match: "AI", target: key(3, 0) },
    { match: "PRESENCE", target: key(7, 5) },
    { match: ["SETTINGS", "PROFILE"], target: key(3, 9) },
  ],

  [key(1, 1)]: [
    { match: "Photography", target: key(7, 1) },
    { match: "AI_SYNTH", target: key(7, 1) },
    { match: "Review path", target: key(1, 6) },
    { match: "Spaces", target: key(7, 0) },
    { match: "HOME", target: home },
    { match: "PRESENCE", target: key(7, 5) },
  ],
  [key(1, 2)]: [
    { match: "View more", target: key(1, 3) },
    {
      match: ["Friendly", "Direct", "Warm"],
      target: key(1, 3),
      label: "Choose tone and open Spark Reply",
    },
    { match: "Write your own message", target: key(2, 0), label: "Type a reply" },
  ],
  [key(1, 3)]: [
    { match: "Insert Draft", target: key(2, 0) },
    { match: "Regenerate", target: key(1, 3) },
    { match: "Back to Chat", target: key(1, 2) },
  ],
  [key(1, 4)]: [{ match: "Reply", target: key(1, 5) }],
  [key(1, 5)]: [
    { match: "View more", target: key(1, 3) },
    { match: ["HOME", "Back to Home"], target: home },
    { match: "SOCIAL", target: key(1, 1) },
  ],

  [key(2, 0)]: [
    { match: "View more", target: key(2, 0) },
    { match: "Warm", target: key(2, 0) },
    { match: "Back", target: key(1, 6) },
  ],

  [key(3, 0)]: [
    { match: "Continue", target: key(6, 0) },
    { match: "Change Mode", target: key(3, 3) },
    { match: "Context Rules", target: key(3, 10) },
    { match: "HOME", target: home },
    { match: "SOCIAL", target: key(1, 1) },
    { match: "PRESENCE", target: key(7, 5) },
  ],
  [key(3, 3)]: [
    { match: "Confirm Mode", target: key(3, 5) },
    { match: "Learn about each mode", target: key(3, 4) },
  ],
  [key(3, 4)]: [{ match: "Switch to Observer", target: key(3, 0) }],
  [key(3, 5)]: [{ match: "Switch to Co-pilot", target: key(3, 0) }],
  [key(3, 6)]: [{ match: "Switch to Assistant", target: key(3, 0) }],
  [key(3, 7)]: [{ match: "Switch to Auto-pilot", target: key(3, 0) }],
  [key(3, 8)]: [{ match: "Change Mode", target: key(3, 3) }],

  [key(4, 0)]: [
    { match: "View details", target: key(4, 1) },
  ],
  [key(4, 1)]: [{ match: "View details", target: key(4, 2) }],
  [key(4, 2)]: [{ match: "Change Mode", target: key(3, 3) }],

  [key(5, 0)]: [
    { match: "Review signals", target: key(5, 1) },
    { match: "Jim Chen", target: key(5, 2) },
  ],
  [key(5, 1)]: [{ match: "Jim Chen", target: key(5, 2) }],
  [key(5, 2)]: [
    { match: "Relationship Check-in", target: key(5, 3) },
    { match: "View AI Trail", target: key(4, 0) },
  ],
  [key(5, 3)]: [
    { match: "Save Check-in", target: key(5, 4) },
    { match: "View detail", target: key(5, 2) },
  ],
  [key(5, 4)]: [
    { match: "Back to Jim Chen", target: key(5, 2) },
    { match: "View AI Trail", target: key(4, 0) },
  ],
  [key(5, 5)]: [
    { match: "Continue", target: key(1, 6) },
    { match: "Back", target: key(5, 2) },
  ],

  [key(6, 0)]: [{ match: "Message Jim", target: key(1, 6) }],
  [key(6, 1)]: [
    { match: ["Star Glow", "Orbit Path", "Heart Halo", "Mint Wreath", "Cloud Float", "Dot Circle"], target: key(6, 2) },
    { match: "Points Guide", target: key(6, 3) },
  ],
  [key(6, 2)]: [
    { match: ["Cancel", "Back to Frame Shop"], target: key(6, 1) },
    { match: ["Unlock and Apply", "Apply Frame"], target: key(6, 2) },
  ],
  [key(6, 3)]: [
    { match: "Go to Icebreaking Challenge", target: key(6, 0) },
    { match: "Back to Frame Shop", target: key(6, 1) },
  ],

  [key(7, 0)]: [
    { match: "Connections", target: key(1, 1) },
    { match: "Photography", target: key(7, 1) },
    { match: "AI_SYNTH", target: key(7, 1) },
    { match: "Review path", target: key(7, 1) },
    { match: "Explore", target: key(7, 1) },
    { match: "HOME", target: home },
  ],
  [key(7, 1)]: [
    { match: ["New Post", "New Space"], target: key(7, 2) },
    { match: ["RAW_DATA", "Info"], target: key(7, 3) },
    {
      match: ["HUMAN_AUTH", "Human verified", "Jim", "Joe", "Sabrina", "James"],
      target: key(7, 4),
    },
    { match: "PRESENCE", target: key(7, 5) },
  ],
  [key(7, 2)]: [{ match: "Publish", target: key(7, 1) }],
  [key(7, 3)]: [{ match: "Profile", target: key(7, 4) }],
  [key(7, 4)]: [
    { match: ["AI Activity", "AI Presence"], target: key(7, 5) },
    { match: ["Message", "Private chat"], target: key(1, 6) },
  ],
  [key(7, 5)]: [{ match: "HOME", target: home }],
};

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function readClickText(target: HTMLElement) {
  const actionable = target.closest(
    "button,a,[role='button'],.cursor-pointer,[data-prototype-tab]",
  ) as HTMLElement | null;
  if (actionable) return actionable.innerText || actionable.textContent || "";
  return "";
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
  chat: home,
  community: key(7, 0),
  space: key(7, 0),
  social: key(1, 1),
  ai: key(3, 0),
  presence: key(7, 5),
  settings: key(3, 9),
  profile: key(3, 9),
};

function tabFromText(text: string) {
  const n = normalize(text);
  if (
    [
      "home",
      "chat",
      "community",
      "space",
      "绀惧尯",
      "social",
      "ai",
      "presence",
      "settings",
      "profile",
    ].includes(n)
  )
    return n === "绀惧尯" ? "community" : n;
  return null;
}

function tabFromElement(target: HTMLElement) {
  const tab = target.closest("[data-prototype-tab]") as HTMLElement | null;
  const value = tab?.dataset.prototypeTab;
  if (value && value in tabTargets) return value;
  return null;
}

function targetFromElement(target: HTMLElement): NodeKey | null {
  const targetNode = target.closest("[data-prototype-target]") as HTMLElement | null;
  const value = targetNode?.dataset.prototypeTarget;
  return value && value.includes(":") ? (value as NodeKey) : null;
}

function avatarNavModeFromElement(target: HTMLElement) {
  const node = target.closest("[data-avatar-nav-mode]") as HTMLElement | null;
  const value = node?.dataset.avatarNavMode;
  return value === "pending" || value === "default" ? value : null;
}

function prototypeBackTarget(target: HTMLElement): NodeKey | null {
  const back = target.closest("[data-prototype-back]") as HTMLElement | null;
  if (!back) return null;
  const targetNode = back.dataset.prototypeBack;
  return targetNode && targetNode.includes(":") ? (targetNode as NodeKey) : null;
}

function activeTabFor(node: NodeKey) {
  const [flowIdx, stepIdx] = node.split(":").map(Number);
  if (node === home) return "CHAT";
  if (flowIdx === 1 && [1, 2, 3, 4, 5, 6].includes(stepIdx)) return "CHAT";
  if (flowIdx === 7 && [0, 1, 2, 3, 4].includes(stepIdx)) return "COMMUNITY";
  if (flowIdx === 7 && stepIdx >= 5) return "PRESENCE";
  if (flowIdx === 3 && stepIdx === 9) return "SETTINGS";
  if (flowIdx === 3) return "AI";
  if (flowIdx === 4) return "SETTINGS";
  if (flowIdx === 6 && [1, 2, 3].includes(stepIdx)) return "SETTINGS";
  return null;
}

export function FlowPlayer({ onOpenGallery }: Props) {
  void onOpenGallery;
  const initialNode = (() => {
    if (typeof window === "undefined") return key(0, 0);
    const frame = new URLSearchParams(window.location.search).get("exportFrame");
    return frame && frame.includes(":") ? (frame as NodeKey) : key(0, 0);
  })();
  const isExportMode =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("exportFrame");
  const [node, setNode] = useState<NodeKey>(initialNode);
  const [history, setHistory] = useState<NodeKey[]>([]);
  const [selectedAiMode, setSelectedAiMode] = useState<AiMode>(() => readSelectedAiMode());
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tapPulse, setTapPulse] = useState(false);
  const [viewportScale, setViewportScale] = useState({ x: 1, y: 1, isMobile: false });
  const [flowIdx, stepIdx] = node.split(":").map(Number);
  const flow = flows[flowIdx];
  const step = flow.steps[stepIdx];
  const StepComponent = step.Component;
  const rules = graph[node] ?? [];
  useEffect(() => {
    if (isExportMode || typeof window === "undefined") return;

    const updateScale = () => {
      const width = window.visualViewport?.width ?? window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      const isMobile = width <= 520;

      setViewportScale(
        isMobile
          ? {
              x: width / 440,
              y: height / 956,
              isMobile: true,
            }
          : { x: 1, y: 1, isMobile: false },
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.visualViewport?.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
      window.visualViewport?.removeEventListener("resize", updateScale);
    };
  }, [isExportMode]);

  const displayScaleX = isExportMode ? 1 : viewportScale.x;
  const displayScaleY = isExportMode ? 1 : viewportScale.y;
  const isMobileViewport = !isExportMode && viewportScale.isMobile;
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

  const handlePrototypeTap = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-prototype-keyboard]")) return;
    if (target.closest("input,textarea,select")) return;

    const text = readClickText(target);
    const normalizedText = normalize(text);
    const candidateTarget = target.closest("[data-prototype-person]") as HTMLElement | null;
    if (candidateTarget?.dataset.prototypePerson) {
      window.sessionStorage.setItem(
        "second-self.selected-profile",
        candidateTarget.dataset.prototypePerson,
      );
      window.sessionStorage.setItem(
        "second-self.selected-candidate",
        candidateTarget.dataset.prototypePerson,
      );
      if (candidateTarget.dataset.prototypeSource) {
        window.sessionStorage.setItem(
          "second-self.selected-candidate-source",
          candidateTarget.dataset.prototypeSource,
        );
      } else {
        window.sessionStorage.removeItem("second-self.selected-candidate-source");
      }
      window.sessionStorage.setItem(
        "second-self.opened-candidate-chat",
        candidateTarget.dataset.prototypePerson,
      );
    }
    const spaceTarget = target.closest("[data-prototype-space]") as HTMLElement | null;
    if (spaceTarget?.dataset.prototypeSpace) {
      window.sessionStorage.setItem(
        "second-self.selected-space",
        spaceTarget.dataset.prototypeSpace,
      );
    }
    const avatarNavMode = avatarNavModeFromElement(target);
    if (avatarNavMode) {
      window.sessionStorage.setItem("second-self.avatar-nav-mode", avatarNavMode);
    }
    const directTarget = targetFromElement(target);
    if (directTarget) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      navigate(directTarget);
      return;
    }

    const backTarget = prototypeBackTarget(target);
    if (backTarget) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      if (node === key(0, 5) && backTarget === key(3, 0)) {
        window.sessionStorage.removeItem("second-self.face-scan-return");
      }
      navigate(backTarget);
      return;
    }

    if (target.closest("[data-prototype-back]")) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      goBack();
      return;
    }

    const directTab = tabFromElement(target);
    if (directTab) {
      setTapPulse(true);
      window.setTimeout(() => setTapPulse(false), 260);
      navigate(tabTargets[directTab]);
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

    if (node === key(3, 4) && normalizedText.includes("switch to observer")) {
      window.sessionStorage.setItem(aiModeStorageKey, "Observer");
    }
    if (node === key(3, 5) && normalizedText.includes("switch to co-pilot")) {
      window.sessionStorage.setItem(aiModeStorageKey, "Co-pilot");
    }
    if (node === key(3, 6) && normalizedText.includes("switch to assistant")) {
      window.sessionStorage.setItem(aiModeStorageKey, "Assistant");
    }
    if (node === key(3, 7) && normalizedText.includes("switch to auto-pilot")) {
      window.sessionStorage.setItem(aiModeStorageKey, "Auto-pilot");
    }

    const rule = findRule(rules, text);
    if (!rule) return;
    if (rule.target === home && node === key(0, 6)) {
      const existingMode = window.sessionStorage.getItem("second-self.avatar-nav-mode");
      if (existingMode !== "pending") {
        window.sessionStorage.setItem("second-self.avatar-nav-mode", "default");
      }
    }

    setTapPulse(true);
    window.setTimeout(() => setTapPulse(false), 260);
    navigate(rule.target);
  };

  return (
    <div
      className={`prototype-shell min-h-screen w-full flex items-center justify-center ${
        isExportMode ? "prototype-export-shell" : ""
      }`}
      style={{ background: "linear-gradient(180deg, #f7f6fb 0%, #fbfaff 54%, #f5f8fc 100%)" }}
    >
      <div className="prototype-phone-stage flex items-start justify-center">
        <div
          className="relative"
          style={{ width: 440 * displayScaleX, height: 956 * displayScaleY }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={node}
              custom={direction}
              initial={{ opacity: 0, x: direction * 36, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 36, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-0 flex items-start ${
                isMobileViewport ? "justify-start" : "justify-center"
              }`}
            >
              <div
                className="relative origin-top"
                style={{
                  transform: `scale(${displayScaleX}, ${displayScaleY})`,
                  transformOrigin: "top left",
                }}
                onClickCapture={handlePrototypeTap}
              >
                <PhoneFrame
                  title={`${flow.id.toUpperCase()} 路 ${step.label}`}
                  subtitle={step.hint}
                  showLabel={false}
                  showChrome={!isExportMode && !isMobileViewport}
                >
                  <StepComponent />
                  {activeTab && <FloatingBottomNav active={activeTab} />}
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
    </div>
  );
}
