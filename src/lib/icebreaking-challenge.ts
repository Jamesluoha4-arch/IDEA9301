export type IcebreakingTaskId = "hello" | "question" | "detail";

export type IcebreakingProgress = Record<IcebreakingTaskId, boolean>;

export const challengeUpdatedEvent = "second-self-icebreaking-updated";
export const pointsUpdatedEvent = "second-self-points-updated";

const progressKey = "second-self-icebreaking-progress";
const pointsKey = "second-self-points";
const basePoints = 180;

export const icebreakingTasks = [
  {
    id: "hello" as const,
    title: "Send Jim the first Hi",
    detail: "Start the icebreaker yourself with a simple hello.",
    reward: 10,
  },
  {
    id: "question" as const,
    title: "Ask Jim one first-week question",
    detail: "Use a real onboarding question to keep the chat moving.",
    reward: 15,
  },
  {
    id: "detail" as const,
    title: "Share one small detail back",
    detail: "Offer a useful detail about your own first week.",
    reward: 20,
  },
];

function defaultProgress(): IcebreakingProgress {
  return { hello: false, question: false, detail: false };
}

export function readIcebreakingProgress(): IcebreakingProgress {
  if (typeof window === "undefined") return defaultProgress();

  try {
    return {
      ...defaultProgress(),
      ...JSON.parse(window.localStorage.getItem(progressKey) || "{}"),
    };
  } catch {
    return defaultProgress();
  }
}

export function readChallengePoints() {
  if (typeof window === "undefined") return basePoints;
  const saved = Number(window.localStorage.getItem(pointsKey));
  return Number.isFinite(saved) && saved >= 0 ? saved : basePoints;
}

export function spendChallengePoints(amount: number) {
  const current = readChallengePoints();
  if (current < amount) return false;
  writePoints(current - amount);
  return true;
}

export function recordJimIcebreakerMessage(text: string) {
  if (typeof window === "undefined") return readIcebreakingProgress();

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const progress = readIcebreakingProgress();
  let completedTask: IcebreakingTaskId | null = null;

  if (!progress.hello && /\b(hi|hello|hey)\b/.test(lower)) {
    completedTask = "hello";
  } else if (
    progress.hello &&
    !progress.question &&
    (trimmed.includes("?") ||
      /\b(what|which|where|when|how|can|could|should|any tips)\b/.test(lower))
  ) {
    completedTask = "question";
  } else if (
    progress.question &&
    !progress.detail &&
    trimmed.length >= 22 &&
    /\b(i|i'm|im|my|me|we|our)\b/.test(lower)
  ) {
    completedTask = "detail";
  }

  if (!completedTask) return progress;

  const next = { ...progress, [completedTask]: true };
  window.localStorage.setItem(progressKey, JSON.stringify(next));
  const reward = icebreakingTasks.find((task) => task.id === completedTask)?.reward ?? 0;
  writePoints(readChallengePoints() + reward);
  window.dispatchEvent(new Event(challengeUpdatedEvent));
  return next;
}

function writePoints(points: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(pointsKey, String(Math.max(0, Math.round(points))));
  window.dispatchEvent(new Event(pointsUpdatedEvent));
}
