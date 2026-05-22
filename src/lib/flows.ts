import type { ComponentType } from "react";
import { F1_Welcome } from "@/components/frames/F1_Welcome";
import { F2_SelfDescription } from "@/components/frames/F2_SelfDescription";
import { F3_ImportChat } from "@/components/frames/F3_ImportChat";
import { F4_ImportHistory } from "@/components/frames/F4_ImportHistory";
import { F5_AIPersona } from "@/components/frames/F5_AIPersona";
import { F6_FaceScan } from "@/components/frames/F6_FaceScan";
import { F6_ShySupport } from "@/components/frames/F6_ShySupport";
import { F8_AIChat } from "@/components/frames/F8_AIChat";
import { F09_Home } from "@/components/frames/F09_Home";
import { F10_Social } from "@/components/frames/F10_Social";
import { F10_CandidateChat } from "@/components/frames/F10_CandidateChat";
import { F14_Chat, F15_ChatReaction, F16_ChatFinished } from "@/components/frames/F14_Chat";
import { F17_SparkReplySheet } from "@/components/frames/F17_SparkReplySheet";
import { F22_SpacesRadar } from "@/components/frames/F22_SpacesRadar";
import { F25_SpacesFeed } from "@/components/frames/F25_SpacesFeed";
import { F27_NewSpace } from "@/components/frames/F27_NewSpace";
import { F28_Interactions } from "@/components/frames/F28_Interactions";
import { F29_ArchitectProfile } from "@/components/frames/F29_ArchitectProfile";
import { F30_SystemVisibility } from "@/components/frames/F30_SystemVisibility";
import { F36_AIControlCenter } from "@/components/frames/F36_AIControlCenter";
import { F37_DailyChallenge } from "@/components/frames/F37_DailyChallenge";
import { F41_CopilotMode } from "@/components/frames/F41_CopilotMode";
import { F49_FrameShop } from "@/components/frames/F49_FrameShop";
import { F51_AICenterFull } from "@/components/frames/F51_AICenterFull";
import { F53_CloudUnlockSheet } from "@/components/frames/F53_CloudUnlockSheet";
import { F55_PointsGuide } from "@/components/frames/F55_PointsGuide";
import { F59_ChangeAIMode } from "@/components/frames/F59_ChangeAIMode";
import { F60_ObserverMode } from "@/components/frames/F60_ObserverMode";
import { F61_CopilotModeDetail } from "@/components/frames/F61_CopilotModeDetail";
import { F62_AssistantMode } from "@/components/frames/F62_AssistantMode";
import { F63_AutopilotMode } from "@/components/frames/F63_AutopilotMode";
import { F71_ContextRules } from "@/components/frames/F71_ContextRules";
import { F73_AICenterFullAlt } from "@/components/frames/F73_AICenterFullAlt";
import { F75_ReconnectChoose } from "@/components/frames/F75_ReconnectChoose";
import { F76_CheckinSaved } from "@/components/frames/F76_CheckinSaved";
import { F77_RelationshipCheckin } from "@/components/frames/F77_RelationshipCheckin";
import { F78_RelationshipProfile } from "@/components/frames/F78_RelationshipProfile";
import { F79_RelationshipSignals } from "@/components/frames/F79_RelationshipSignals";
import { F80_RelationshipsList } from "@/components/frames/F80_RelationshipsList";
import { F81_AITrailSpiral, F82_AITrailLined } from "@/components/frames/F81_AITrail";
import { F83_Settings } from "@/components/frames/F83_Settings";

export type Step = {
  label: string;
  hint?: string;
  Component: ComponentType;
};

export type Flow = {
  id: string;
  title: string;
  subtitle: string;
  steps: Step[];
};

export const flows: Flow[] = [
  {
    id: "f1",
    title: "Flow 1 - Create AI Second Self",
    subtitle: "Welcome / self description / import chat / persona / face scan / chat / home",
    steps: [
      { label: "Welcome", hint: "Tap Get started", Component: F1_Welcome },
      { label: "Self description", hint: "Name and voice input", Component: F2_SelfDescription },
      { label: "Import chat", hint: "TXT / PDF / 骞冲彴", Component: F3_ImportChat },
      { label: "Pick history", hint: "鎸夋椂闂存垨鏉℃暟", Component: F4_ImportHistory },
      {
        label: "AI Persona Summary",
        hint: "Confirm style, energy, and tags",
        Component: F5_AIPersona,
      },
      { label: "Face Scan", hint: "鐢熸垚椋庢牸", Component: F6_FaceScan },
      { label: "AI Assistant Chat", hint: "棣栨瀵硅瘽", Component: F8_AIChat },
      { label: "Home Dashboard", hint: "杩涘叆涓婚〉", Component: F09_Home },
      { label: "Shy Support", hint: "Gentle start", Component: F6_ShySupport },
    ],
  },
  {
    id: "f2",
    title: "Flow 2 - Low-risk Social Warm-up",
    subtitle: "Radar / match signal / data transparency / Spark Reply",
    steps: [
      { label: "Home", hint: "鐐瑰嚮 Social", Component: F09_Home },
      { label: "Social Radar", hint: "鎺㈢储娼滃湪杩炴帴", Component: F10_Social },
      { label: "Jim 鑱婂ぉ", hint: "Spark 鍥炲寤鸿", Component: F14_Chat },
      { label: "Spark Reply Sheet", hint: "Reasoning and context", Component: F17_SparkReplySheet },
      { label: "Reactions", hint: "琛ㄦ儏鍙嶅簲", Component: F15_ChatReaction },
      { label: "Warm-up Done", hint: "Hand off to human", Component: F16_ChatFinished },
      { label: "Candidate chat", hint: "AI recommended opener", Component: F10_CandidateChat },
    ],
  },
  {
    id: "f3",
    title: "Flow 3 路 Live Reply",
    subtitle: "AI reply suggestions inside the chat",
    steps: [{ label: "Jim chat", hint: "Live reply suggestions", Component: F14_Chat }],
  },
  {
    id: "f4",
    title: "Flow 4 路 AI Control Center",
    subtitle: "Mode / context rules / settings",
    steps: [
      { label: "AI Control Center", hint: "Assistant 路 Custom", Component: F36_AIControlCenter },
      { label: "Full layout (alt)", hint: "鏉冮檺 路 琛屼负", Component: F73_AICenterFullAlt },
      { label: "AI Center Full", hint: "Custom 路 Permissions", Component: F51_AICenterFull },
      { label: "Change AI Mode", hint: "4 modes sheet", Component: F59_ChangeAIMode },
      { label: "Observer", hint: "Idle 路 minimal", Component: F60_ObserverMode },
      { label: "Co-pilot", hint: "Active 路 balanced", Component: F61_CopilotModeDetail },
      { label: "Assistant", hint: "Drafts replies", Component: F62_AssistantMode },
      { label: "Auto-pilot", hint: "Max autonomy", Component: F63_AutopilotMode },
      {
        label: "Co-pilot recent actions",
        hint: "Drafted / Suggested / Blocked",
        Component: F41_CopilotMode,
      },
      { label: "Settings", hint: "Account / help / diagnostics", Component: F83_Settings },
      { label: "Context Rules", hint: "Sensitive moments stay human-led", Component: F71_ContextRules },
    ],
  },
  {
    id: "f5",
    title: "Flow 5 - AI Trail",
    subtitle: "AI trail views and control center handoff",
    steps: [
      { label: "AI Trail 路 Spiral", hint: "鏃堕棿绾?路 鏇茬嚎", Component: F81_AITrailSpiral },
      { label: "AI Trail 路 Lined", hint: "鏃堕棿绾?路 铏氱嚎", Component: F82_AITrailLined },
      {
        label: "杩涘叆 Control Center 璋冩暣",
        hint: "Change mode",
        Component: F36_AIControlCenter,
      },
    ],
  },
  {
    id: "f6",
    title: "Flow 6 路 鍏崇郴缁存姢",
    subtitle: "Signals 鈫?Profile 鈫?Check-in 鈫?Reconnect",
    steps: [
      {
        label: "Relationships List",
        hint: "All / Cooling / Active",
        Component: F80_RelationshipsList,
      },
      { label: "Today's Signals", hint: "3 鍏崇郴闇€鍏虫敞", Component: F79_RelationshipSignals },
      { label: "Jim Chen Profile", hint: "Cooling down", Component: F78_RelationshipProfile },
      {
        label: "Relationship Check-in",
        hint: "Feeling 路 step 路 note",
        Component: F77_RelationshipCheckin,
      },
      { label: "Check-in Saved", hint: "Reminder adjusted", Component: F76_CheckinSaved },
      {
        label: "Reconnect with Jim",
        hint: "鑷繁 / 寤鸿 / 鑽夌",
        Component: F75_ReconnectChoose,
      },
    ],
  },
  {
    id: "f7",
    title: "Flow 7 - Icebreaking Challenge and Points",
    subtitle: "Icebreaking challenge / points / animated frame shop",
    steps: [
      { label: "Icebreaking Challenge", hint: "Jim tasks / live points", Component: F37_DailyChallenge },
      { label: "Frame Shop", hint: "Unlock decorations with points", Component: F49_FrameShop },
      { label: "Frame Detail", hint: "Unlock and apply", Component: F53_CloudUnlockSheet },
      { label: "Points Guide", hint: "Earn 路 use 路 streak", Component: F55_PointsGuide },
    ],
  },
  {
    id: "f8",
    title: "Flow 8 - Spaces and AI Visibility",
    subtitle: "Spaces / profile / presence insight",
    steps: [
      { label: "Spaces Radar", hint: "Topic nodes synced", Component: F22_SpacesRadar },
      { label: "Spaces Feed", hint: "HUMAN / AI_SYNTH / RAW", Component: F25_SpacesFeed },
      { label: "New Space", hint: "Create + publish", Component: F27_NewSpace },
      { label: "Interactions", hint: "Activity stream", Component: F28_Interactions },
      { label: "Architect Profile", hint: "鍏磋叮鍖归厤", Component: F29_ArchitectProfile },
      { label: "Presence", hint: "Live AI activity and user insight", Component: F30_SystemVisibility },
    ],
  },
];
