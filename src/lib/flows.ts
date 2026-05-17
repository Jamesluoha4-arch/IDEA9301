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
import { F11_WarmupComplete } from "@/components/frames/F11_WarmupComplete";
import { F12_PrivacyLock } from "@/components/frames/F12_PrivacyLock";
import { F13_Permissions } from "@/components/frames/F13_Permissions";
import { F14_Chat, F15_ChatReaction, F16_ChatFinished } from "@/components/frames/F14_Chat";
import { F17_SparkReplySheet } from "@/components/frames/F17_SparkReplySheet";
import { F18_SensitiveCrossing } from "@/components/frames/F18_SensitiveCrossing";
import {
  F19_AboutSensitiveCrossing,
  F20_StayHumanLed,
  F21_AskAILater,
} from "@/components/frames/F19_Modals";
import { F22_SpacesRadar } from "@/components/frames/F22_SpacesRadar";
import { F23_SpaceWarmupComplete } from "@/components/frames/F23_SpaceWarmupComplete";
import { F24_PrivateBlocked } from "@/components/frames/F24_PrivateBlocked";
import { F25_SpacesFeed } from "@/components/frames/F25_SpacesFeed";
import { F26_CuratedStream } from "@/components/frames/F26_CuratedStream";
import { F27_NewSpace } from "@/components/frames/F27_NewSpace";
import { F28_Interactions } from "@/components/frames/F28_Interactions";
import { F29_ArchitectProfile } from "@/components/frames/F29_ArchitectProfile";
import { F30_SystemVisibility } from "@/components/frames/F30_SystemVisibility";
import { F31_LiveSocialWorld } from "@/components/frames/F31_LiveSocialWorld";
import { F32_PresenceReflection } from "@/components/frames/F32_PresenceReflection";
import { F33_DeviceVisibility } from "@/components/frames/F33_DeviceVisibility";
import { F34_MicAccess } from "@/components/frames/F34_MicAccess";
import { F35_PresenceInsight } from "@/components/frames/F35_PresenceInsight";
import { F36_AIControlCenter } from "@/components/frames/F36_AIControlCenter";
import { F37_DailyChallenge } from "@/components/frames/F37_DailyChallenge";
import { F38_ChallengeProgress } from "@/components/frames/F38_ChallengeProgress";
import { F39_ChallengeDone } from "@/components/frames/F39_ChallengeDone";
import { F40_ChallengeHistory } from "@/components/frames/F40_ChallengeHistory";
import { F41_CopilotMode } from "@/components/frames/F41_CopilotMode";
import { F42_MissedChallenge } from "@/components/frames/F42_MissedChallenge";
import { F43_MissedDaily } from "@/components/frames/F43_MissedDaily";
import { F44_QuickReflection } from "@/components/frames/F44_QuickReflection";
import { F45_ReflectionSaved } from "@/components/frames/F45_ReflectionSaved";
import { F46_SecondSelf } from "@/components/frames/F46_SecondSelf";
import { F47_SecondSelfAlt } from "@/components/frames/F47_SecondSelfAlt";
import { F48_ChangeDetails } from "@/components/frames/F48_ChangeDetails";
import { F49_FrameShop } from "@/components/frames/F49_FrameShop";
import { F50_FrameUnlock } from "@/components/frames/F50_FrameUnlock";
import { F51_AICenterFull } from "@/components/frames/F51_AICenterFull";
import { F52_HeartUnlockSheet } from "@/components/frames/F52_HeartUnlockSheet";
import { F53_CloudUnlockSheet } from "@/components/frames/F53_CloudUnlockSheet";
import { F54_FrameShopGrid } from "@/components/frames/F54_FrameShopGrid";
import { F55_PointsGuide } from "@/components/frames/F55_PointsGuide";
import { F57_HeartPreviewSheet } from "@/components/frames/F57_HeartPreviewSheet";
import { F59_ChangeAIMode } from "@/components/frames/F59_ChangeAIMode";
import { F60_ObserverMode } from "@/components/frames/F60_ObserverMode";
import { F61_CopilotModeDetail } from "@/components/frames/F61_CopilotModeDetail";
import { F62_AssistantMode } from "@/components/frames/F62_AssistantMode";
import { F63_AutopilotMode } from "@/components/frames/F63_AutopilotMode";
import {
  F64_InfluenceOff,
  F65_InfluenceSuggest,
  F66_InfluenceDraft,
  F67_InfluenceAct,
} from "@/components/frames/F64_InfluenceLevels";
import {
  F68_WhyStrangers,
  F69_WhyFriends,
  F70_WhyClose,
} from "@/components/frames/F68_WhyThisLevel";
import { F71_ContextRules } from "@/components/frames/F71_ContextRules";
import { F72_QuickEdit } from "@/components/frames/F72_QuickEdit";
import { F73_AICenterFullAlt } from "@/components/frames/F73_AICenterFullAlt";
import { F74_ChangeDetailDraft } from "@/components/frames/F74_ChangeDetailDraft";
import { F75_ReconnectChoose } from "@/components/frames/F75_ReconnectChoose";
import { F76_CheckinSaved } from "@/components/frames/F76_CheckinSaved";
import { F77_RelationshipCheckin } from "@/components/frames/F77_RelationshipCheckin";
import { F78_RelationshipProfile } from "@/components/frames/F78_RelationshipProfile";
import { F79_RelationshipSignals } from "@/components/frames/F79_RelationshipSignals";
import { F80_RelationshipsList } from "@/components/frames/F80_RelationshipsList";
import { F81_AITrailSpiral, F82_AITrailLined } from "@/components/frames/F81_AITrail";

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
    title: "Flow 1 · 创建 AI Second Self",
    subtitle: "Welcome → 自我描述 → 导入聊天 → Persona → Face Scan → Chat → Home",
    steps: [
      { label: "Welcome", hint: "Tap Get started", Component: F1_Welcome },
      { label: "Self description", hint: "填写个性 / 语音输入", Component: F2_SelfDescription },
      { label: "Import chat", hint: "TXT / PDF / 平台", Component: F3_ImportChat },
      { label: "Pick history", hint: "按时间或条数", Component: F4_ImportHistory },
      { label: "AI Persona 总结", hint: "确认风格、能量、标签", Component: F5_AIPersona },
      { label: "Face Scan", hint: "生成风格", Component: F6_FaceScan },
      { label: "AI Assistant Chat", hint: "首次对话", Component: F8_AIChat },
      { label: "Home Dashboard", hint: "进入主页", Component: F09_Home },
      { label: "Shy Support", hint: "Gentle start", Component: F6_ShySupport },
    ],
  },
  {
    id: "f2",
    title: "Flow 2 · 低风险社交预热",
    subtitle: "Radar → 匹配信号 → 数据透明 → Spark Reply",
    steps: [
      { label: "Home", hint: "点击 Social", Component: F09_Home },
      { label: "Social Radar", hint: "探索潜在连接", Component: F10_Social },
      { label: "Warm-up Complete", hint: "Path 已批准", Component: F11_WarmupComplete },
      { label: "被阻止的私密数据", hint: "情绪 / 日记 / 跨平台", Component: F12_PrivacyLock },
      { label: "管理权限", hint: "类别 + 模式", Component: F13_Permissions },
      { label: "Alex 聊天", hint: "Spark 回复建议", Component: F14_Chat },
      { label: "Spark Reply Sheet", hint: "推理 + 上下文", Component: F17_SparkReplySheet },
      { label: "Reactions", hint: "表情反应", Component: F15_ChatReaction },
      { label: "Warm-up Done", hint: "交接给真人", Component: F16_ChatFinished },
    ],
  },
  {
    id: "f3",
    title: "Flow 3 · 敏感场景边界",
    subtitle: "Sensitive Crossing → 选择如何继续",
    steps: [
      { label: "Alex 聊天", hint: "情绪话题升温", Component: F14_Chat },
      { label: "Sensitive Crossing", hint: "AI 暂停，未发送", Component: F18_SensitiveCrossing },
      { label: "About this pause", hint: "Learn More", Component: F19_AboutSensitiveCrossing },
      { label: "Stay human-led", hint: "AI 在此聊天停建议", Component: F20_StayHumanLed },
      { label: "Ask AI later", hint: "话题变化 / 明天 / 手动", Component: F21_AskAILater },
    ],
  },
  {
    id: "f4",
    title: "Flow 4 · AI Control Center",
    subtitle: "Mode → Influence Level → 权限 → Context Rules",
    steps: [
      { label: "AI Control Center", hint: "Assistant · Custom", Component: F36_AIControlCenter },
      { label: "Full layout (alt)", hint: "权限 · 行为", Component: F73_AICenterFullAlt },
      { label: "AI Center Full", hint: "Custom · Permissions", Component: F51_AICenterFull },
      { label: "Change AI Mode", hint: "4 modes sheet", Component: F59_ChangeAIMode },
      { label: "Observer", hint: "Idle · minimal", Component: F60_ObserverMode },
      { label: "Co-pilot", hint: "Active · balanced", Component: F61_CopilotModeDetail },
      { label: "Assistant", hint: "Drafts replies", Component: F62_AssistantMode },
      { label: "Auto-pilot", hint: "Max autonomy", Component: F63_AutopilotMode },
      { label: "Influence · Off", hint: "完全控制", Component: F64_InfluenceOff },
      { label: "Influence · Suggest", hint: "Ideas only", Component: F65_InfluenceSuggest },
      { label: "Influence · Draft", hint: "AI 起草", Component: F66_InfluenceDraft },
      { label: "Influence · Act", hint: "AI 在边界内行动", Component: F67_InfluenceAct },
      { label: "Why · Strangers", hint: "Suggest 示例", Component: F68_WhyStrangers },
      { label: "Why · Friends", hint: "Draft 示例", Component: F69_WhyFriends },
      { label: "Why · Close", hint: "Off 示例", Component: F70_WhyClose },
      { label: "Context Rules", hint: "敏感场景限制", Component: F71_ContextRules },
      { label: "Quick Edit", hint: "默认级别 · apply", Component: F72_QuickEdit },
      {
        label: "Co-pilot 最近行为",
        hint: "Drafted / Suggested / Blocked",
        Component: F41_CopilotMode,
      },
    ],
  },
  {
    id: "f5",
    title: "Flow 5 · Second Self 状态变化",
    subtitle: "Autonomy / Similarity / Risk → Change Details",
    steps: [
      { label: "Your Second Self", hint: "Assistant 状态", Component: F46_SecondSelf },
      { label: "Second Self · alt", hint: "Tagged reasons", Component: F47_SecondSelfAlt },
      { label: "Change Details", hint: "状态路径 · 洞察", Component: F48_ChangeDetails },
      {
        label: "Change Detail · Draft",
        hint: "What happened / 影响",
        Component: F74_ChangeDetailDraft,
      },
      { label: "AI Trail · Spiral", hint: "时间线 · 曲线", Component: F81_AITrailSpiral },
      { label: "AI Trail · Lined", hint: "时间线 · 虚线", Component: F82_AITrailLined },
      { label: "进入 Control Center 调整", hint: "Change mode", Component: F36_AIControlCenter },
    ],
  },
  {
    id: "f6",
    title: "Flow 6 · 关系维护",
    subtitle: "Signals → Profile → Check-in → Reconnect",
    steps: [
      {
        label: "Relationships List",
        hint: "All / Cooling / Active",
        Component: F80_RelationshipsList,
      },
      { label: "Today's Signals", hint: "3 关系需关注", Component: F79_RelationshipSignals },
      { label: "Alex Chen Profile", hint: "Cooling down", Component: F78_RelationshipProfile },
      {
        label: "Relationship Check-in",
        hint: "Feeling · step · note",
        Component: F77_RelationshipCheckin,
      },
      { label: "Check-in Saved", hint: "提醒已调整", Component: F76_CheckinSaved },
      { label: "Reconnect with Alex", hint: "自己 / 建议 / 草稿", Component: F75_ReconnectChoose },
    ],
  },
  {
    id: "f7",
    title: "Flow 7 · 每日挑战与积分",
    subtitle: "Challenge → 完成 → Streak → Frame Shop",
    steps: [
      { label: "Daily Challenge", hint: "今日任务 1/3", Component: F37_DailyChallenge },
      { label: "Progress 67%", hint: "2 of 3 done", Component: F38_ChallengeProgress },
      { label: "Challenge Done", hint: "+20 pts 奖励", Component: F39_ChallengeDone },
      { label: "Challenge History", hint: "Streak · 周记录", Component: F40_ChallengeHistory },
      { label: "Missed Challenge", hint: "Streak at risk", Component: F42_MissedChallenge },
      { label: "Daily · Missed", hint: "Quick Reflection 提示", Component: F43_MissedDaily },
      { label: "Quick Reflection", hint: "Why · 明天 · 备注", Component: F44_QuickReflection },
      { label: "Reflection Saved", hint: "+5 pts · streak 保住", Component: F45_ReflectionSaved },
      { label: "Frame Shop", hint: "用积分解锁装饰", Component: F49_FrameShop },
      { label: "Frame Shop Grid", hint: "All frames", Component: F54_FrameShopGrid },
      { label: "Frame Unlock", hint: "80 pts sheet", Component: F50_FrameUnlock },
      { label: "Heart Halo Unlock", hint: "Owned · apply", Component: F52_HeartUnlockSheet },
      { label: "Heart Halo Preview", hint: "Large preview", Component: F57_HeartPreviewSheet },
      { label: "Cloud Float Unlock", hint: "80 pts sheet", Component: F53_CloudUnlockSheet },
      { label: "Points Guide", hint: "Earn · use · streak", Component: F55_PointsGuide },
    ],
  },
  {
    id: "f8",
    title: "Flow 8 · Spaces 与 AI 可见性",
    subtitle: "Feed → Profile → System Visibility → 设备",
    steps: [
      { label: "Spaces Radar", hint: "空间节点同步", Component: F22_SpacesRadar },
      { label: "Space Warm-up Done", hint: "预览就绪", Component: F23_SpaceWarmupComplete },
      { label: "Private Data Blocked", hint: "Got it", Component: F24_PrivateBlocked },
      { label: "Spaces Feed", hint: "HUMAN / AI_SYNTH / RAW", Component: F25_SpacesFeed },
      { label: "Curated Stream", hint: "Live sync · drafts", Component: F26_CuratedStream },
      { label: "New Space", hint: "Create + publish", Component: F27_NewSpace },
      { label: "Interactions", hint: "活动流", Component: F28_Interactions },
      { label: "Architect Profile", hint: "兴趣匹配", Component: F29_ArchitectProfile },
      { label: "System Visibility", hint: "Mini social world", Component: F30_SystemVisibility },
      { label: "Live Social World", hint: "Replay · 气泡", Component: F31_LiveSocialWorld },
      { label: "Presence Reflection", hint: "语气 · 关系", Component: F32_PresenceReflection },
      { label: "Device Visibility", hint: "物理层", Component: F33_DeviceVisibility },
      { label: "Microphone Access", hint: "Voice flow", Component: F34_MicAccess },
      {
        label: "AI Presence Insight",
        hint: "Device participation",
        Component: F35_PresenceInsight,
      },
    ],
  },
];
