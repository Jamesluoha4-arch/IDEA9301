import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { FlowPlayer } from "@/components/FlowPlayer";
import { F1_Welcome } from "@/components/frames/F1_Welcome";
import { F2_SelfDescription } from "@/components/frames/F2_SelfDescription";
import { F3_ImportChat } from "@/components/frames/F3_ImportChat";
import { F4_ImportHistory } from "@/components/frames/F4_ImportHistory";
import { F5_AIPersona } from "@/components/frames/F5_AIPersona";
import { F6_FaceScan } from "@/components/frames/F6_FaceScan";
import { F7_AvatarCustomization } from "@/components/frames/F7_AvatarCustomization";
import { F8_AIChat } from "@/components/frames/F8_AIChat";
import { F09_Home } from "@/components/frames/F09_Home";
import { F10_Social } from "@/components/frames/F10_Social";
import { F14_Chat } from "@/components/frames/F14_Chat";
import { F17_SparkReplySheet } from "@/components/frames/F17_SparkReplySheet";
import { F22_SpacesRadar } from "@/components/frames/F22_SpacesRadar";
import { F25_SpacesFeed } from "@/components/frames/F25_SpacesFeed";
import { F27_NewSpace } from "@/components/frames/F27_NewSpace";
import { F28_Interactions } from "@/components/frames/F28_Interactions";
import { F29_ArchitectProfile } from "@/components/frames/F29_ArchitectProfile";
import { F30_SystemVisibility } from "@/components/frames/F30_SystemVisibility";
import { F31_LiveSocialWorld } from "@/components/frames/F31_LiveSocialWorld";
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
import { F56_FrameShopGridAlt } from "@/components/frames/F56_FrameShopGridAlt";
import { F57_HeartPreviewSheet } from "@/components/frames/F57_HeartPreviewSheet";
import { F58_PointsGuideAlt } from "@/components/frames/F58_PointsGuideAlt";
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
import { F83_Settings } from "@/components/frames/F83_Settings";

export const Route = createFileRoute("/")({
  component: Index,
});

const frames = [
  {
    id: "3888-164",
    title: "01 路 Welcome Screen",
    sub: "AI persona introduction",
    Component: F1_Welcome,
  },
  {
    id: "3888-184",
    title: "02 路 Self Description",
    sub: "Step 1 of 3",
    Component: F2_SelfDescription,
  },
  {
    id: "3888-215",
    title: "03 路 Import Chat History",
    sub: "Step 2 of 3",
    Component: F3_ImportChat,
  },
  {
    id: "3888-430",
    title: "04 路 Import History Selection",
    sub: "Modal 路 message picker",
    Component: F4_ImportHistory,
  },
  {
    id: "3888-283",
    title: "05 路 AI Persona Summary",
    sub: "Step 3 of 3",
    Component: F5_AIPersona,
  },
  { id: "3888-354", title: "06 路 Face Scan", sub: "Generated styles", Component: F6_FaceScan },
  {
    id: "3888-393",
    title: "07 路 Avatar Customization",
    sub: "Hairstyle / eyes / mouth",
    Component: F7_AvatarCustomization,
  },
  {
    id: "3888-515",
    title: "08 路 AI Assistant Chat",
    sub: "Active conversation",
    Component: F8_AIChat,
  },
  {
    id: "3888-571",
    title: "09 路 Home Dashboard",
    sub: "Good morning 路 insights",
    Component: F09_Home,
  },
  {
    id: "3888-4206",
    title: "10 路 Social 路 Roaming",
    sub: "Connections radar",
    Component: F10_Social,
  },
  {
    id: "3888-811",
    title: "14 路 Jim AI Chat",
    sub: "Spark reply suggestions",
    Component: F14_Chat,
  },
  {
    id: "3888-1351",
    title: "17 路 Spark Reply Sheet",
    sub: "Reasoning trail 路 context",
    Component: F17_SparkReplySheet,
  },
  {
    id: "3888-4336",
    title: "22 路 Spaces 路 Radar",
    sub: "Spatial nodes sync",
    Component: F22_SpacesRadar,
  },
  {
    id: "3888-3154",
    title: "26 路 Spaces Feed",
    sub: "Synth + human posts",
    Component: F25_SpacesFeed,
  },
  { id: "3888-3318", title: "28 路 New Space", sub: "Create + publish", Component: F27_NewSpace },
  {
    id: "3888-3043",
    title: "29 路 Interactions",
    sub: "Activity stream",
    Component: F28_Interactions,
  },
  {
    id: "3888-3359",
    title: "30 路 Architect Valerie",
    sub: "Profile 路 neural match",
    Component: F29_ArchitectProfile,
  },
  {
    id: "3888-3473",
    title: "31 路 System Visibility",
    sub: "Mini social world",
    Component: F30_SystemVisibility,
  },
  {
    id: "3888-3589",
    title: "32 路 Live Social World",
    sub: "Replay 路 bubble map",
    Component: F31_LiveSocialWorld,
  },
  {
    id: "3888-8101",
    title: "37 路 AI Control Center",
    sub: "Assistant 路 custom mode",
    Component: F36_AIControlCenter,
  },
  {
    id: "3888-7412",
    title: "38 路 Daily Challenge",
    sub: "Boundary task 路 1/3",
    Component: F37_DailyChallenge,
  },
  {
    id: "3888-11064",
    title: "39 路 Challenge Progress",
    sub: "67% 路 2 of 3 done",
    Component: F38_ChallengeProgress,
  },
  {
    id: "3888-7563",
    title: "40 路 Challenge Done",
    sub: "Reward unlocked",
    Component: F39_ChallengeDone,
  },
  {
    id: "3888-7178",
    title: "41 路 Challenge History",
    sub: "Week streak 路 recent",
    Component: F40_ChallengeHistory,
  },
  {
    id: "3888-8817",
    title: "42 路 Co-pilot Mode",
    sub: "Recent AI actions",
    Component: F41_CopilotMode,
  },
  {
    id: "3888-8544",
    title: "43 路 Missed Challenge",
    sub: "Streak at risk",
    Component: F42_MissedChallenge,
  },
  {
    id: "3888-7945",
    title: "44 路 Daily 路 Missed",
    sub: "Quick reflection prompt",
    Component: F43_MissedDaily,
  },
  {
    id: "3888-11226",
    title: "45 路 Quick Reflection",
    sub: "Why 路 tomorrow 路 note",
    Component: F44_QuickReflection,
  },
  {
    id: "3888-9407",
    title: "46 路 Reflection Saved",
    sub: "Streak protected",
    Component: F45_ReflectionSaved,
  },
  {
    id: "3888-9075",
    title: "47 路 Your Second Self",
    sub: "Assistant 路 orbits",
    Component: F46_SecondSelf,
  },
  {
    id: "3888-9236",
    title: "48 路 Second Self 路 alt",
    sub: "Tagged reasons",
    Component: F47_SecondSelfAlt,
  },
  {
    id: "3888-10882",
    title: "49 路 Change Details",
    sub: "State path 路 insight",
    Component: F48_ChangeDetails,
  },
  {
    id: "3888-9876",
    title: "50 路 Frame Shop",
    sub: "Browse 路 apply 路 unlock",
    Component: F49_FrameShop,
  },
  {
    id: "3888-13820",
    title: "51 路 Frame Unlock",
    sub: "Bottom sheet 路 80 pts",
    Component: F50_FrameUnlock,
  },
  {
    id: "3888-6357",
    title: "52 路 AI Control Center",
    sub: "Custom mode 路 permissions 路 actions",
    Component: F51_AICenterFull,
  },
  {
    id: "3888-10543",
    title: "53 路 Heart Halo Unlock",
    sub: "Sheet 路 owned 路 apply",
    Component: F52_HeartUnlockSheet,
  },
  {
    id: "3888-10195",
    title: "54 路 Cloud Float Unlock",
    sub: "Sheet 路 80 pts",
    Component: F53_CloudUnlockSheet,
  },
  {
    id: "3888-9543",
    title: "55 路 Frame Shop Grid",
    sub: "All frames 路 Heart Halo applied",
    Component: F54_FrameShopGrid,
  },
  {
    id: "3888-7722",
    title: "56 路 Points Guide",
    sub: "Earn 路 use 路 streak",
    Component: F55_PointsGuide,
  },
  {
    id: "3888-13487",
    title: "57 路 Frame Shop (alt)",
    sub: "Tabs 路 grid",
    Component: F56_FrameShopGridAlt,
  },
  {
    id: "3888-14129",
    title: "58 路 Heart Halo Preview",
    sub: "Sheet 路 large preview",
    Component: F57_HeartPreviewSheet,
  },
  {
    id: "3888-13264",
    title: "59 路 Points Guide (alt)",
    sub: "Daily decision 路 streak",
    Component: F58_PointsGuideAlt,
  },
  {
    id: "3888-6713",
    title: "60 路 Change AI Mode",
    sub: "Bottom sheet 路 4 modes",
    Component: F59_ChangeAIMode,
  },
  {
    id: "3888-6598",
    title: "61 路 Observer Mode",
    sub: "Idle 路 minimal AI",
    Component: F60_ObserverMode,
  },
  {
    id: "3888-6842",
    title: "62 路 Co-pilot Mode",
    sub: "Active 路 balanced",
    Component: F61_CopilotModeDetail,
  },
  {
    id: "3888-7059",
    title: "63 路 Assistant Mode",
    sub: "Ready 路 drafts replies",
    Component: F62_AssistantMode,
  },
  {
    id: "3888-6947",
    title: "64 路 Auto-pilot Mode",
    sub: "Acting 路 max autonomy",
    Component: F63_AutopilotMode,
  },
  {
    id: "3888-5806",
    title: "65 路 Influence 路 Off",
    sub: "Full control & privacy",
    Component: F64_InfluenceOff,
  },
  {
    id: "3888-5260",
    title: "66 路 Influence 路 Suggest",
    sub: "Ideas, you write",
    Component: F65_InfluenceSuggest,
  },
  {
    id: "3888-5543",
    title: "67 路 Influence 路 Draft",
    sub: "AI drafts, you send",
    Component: F66_InfluenceDraft,
  },
  {
    id: "3888-6074",
    title: "68 路 Influence 路 Act",
    sub: "AI acts in boundaries",
    Component: F67_InfluenceAct,
  },
  {
    id: "3888-4821",
    title: "69 路 Why 路 Strangers",
    sub: "Suggest level example",
    Component: F68_WhyStrangers,
  },
  {
    id: "3888-4671",
    title: "70 路 Why 路 Friends",
    sub: "Draft level example",
    Component: F69_WhyFriends,
  },
  {
    id: "3888-5092",
    title: "71 路 Why 路 Close",
    sub: "Off level example",
    Component: F70_WhyClose,
  },
  {
    id: "3888-4500",
    title: "73 路 Quick Edit",
    sub: "Default level 路 apply",
    Component: F72_QuickEdit,
  },
  {
    id: "3888-8324",
    title: "74 路 AI Control Center (alt)",
    sub: "Full layout 路 permissions",
    Component: F73_AICenterFullAlt,
  },
  {
    id: "3888-11721",
    title: "75 路 Change Detail 路 Draft",
    sub: "What happened 路 choice 路 impact",
    Component: F74_ChangeDetailDraft,
  },
  {
    id: "3888-11368",
    title: "76 路 Reconnect with Jim",
    sub: "Choose AI support level",
    Component: F75_ReconnectChoose,
  },
  {
    id: "3888-12085",
    title: "77 路 Check-in Saved",
    sub: "Next steps 路 paused",
    Component: F76_CheckinSaved,
  },
  {
    id: "3888-11569",
    title: "78 路 Relationship Check-in",
    sub: "Feeling 路 step 路 note",
    Component: F77_RelationshipCheckin,
  },
  {
    id: "3888-12175",
    title: "79 路 Jim Chen Profile",
    sub: "Cooling down 路 signals",
    Component: F78_RelationshipProfile,
  },
  {
    id: "3888-11429",
    title: "80 路 Today's Signals",
    sub: "3 relationships 路 priorities",
    Component: F79_RelationshipSignals,
  },
  {
    id: "3888-11842",
    title: "81 路 Relationships List",
    sub: "Signals 路 health graph",
    Component: F80_RelationshipsList,
  },
  {
    id: "3888-12665",
    title: "82 路 AI Trail 路 Spiral",
    sub: "Timeline 路 curved path",
    Component: F81_AITrailSpiral,
  },
  {
    id: "3888-12457",
    title: "83 路 AI Trail 路 Lined",
    sub: "Timeline 路 dashed path",
    Component: F82_AITrailLined,
  },
  {
    id: "3888-16021",
    title: "84 路 Settings",
    sub: "Account / feedback / diagnostics",
    Component: F83_Settings,
  },
];

function Index() {
  const [mode, setMode] = useState<"flow" | "gallery">("flow");
  if (mode === "flow") return <FlowPlayer onOpenGallery={() => setMode("gallery")} />;
  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(180deg, #e9e6f3 0%, #f3eaf6 50%, #eaf2f8 100%)" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        <button
          onClick={() => setMode("flow")}
          className="mb-6 px-4 py-2 rounded-xl bg-brand-ink text-white text-[12px] font-bold"
        >
          鈫?Back to interactive flow
        </button>
        <div className="text-[11px] font-bold tracking-[0.4em] uppercase text-brand-purple mb-3">
          AI SECOND SELF 路 HIGH-FIDELITY PROTOTYPES
        </div>
        <h1 className="text-5xl font-bold text-brand-ink leading-tight">
          PRD Prototype{" "}
          <span className="bg-gradient-to-r from-[#6c5ce7] via-[#a78bfa] to-[#f6b4db] bg-clip-text text-transparent">
            AI Second Self
          </span>
        </h1>
        <p className="mt-3 text-[15px] text-brand-mute max-w-2xl">
          iPhone 17 Pro Max sized interaction prototype covering onboarding, warm-up, sensitive
          boundaries, control center, relationships, challenges, Spaces, and AI visibility.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "#6C5CE7",
            "#A78BFA",
            "#F6B4DB",
            "#A7D8FF",
            "#8EE3C4",
            "#FFBE98",
            "#1F1F2E",
            "#F7F6FB",
          ].map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white text-[11px] font-mono text-brand-ink"
            >
              <span
                className="w-3 h-3 rounded-full border border-black/10"
                style={{ background: c }}
              />
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Frames grid */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 justify-items-center">
          {frames.map((f) => (
            <div key={f.id} className="flex flex-col items-center gap-2">
              <PhoneFrame title={f.title} subtitle={`${f.sub}  路  ${f.id}`}>
                <f.Component />
              </PhoneFrame>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pb-12 text-[12px] text-brand-mute">
        Built with Tailwind + Framer Motion 路 hover & tap the frames to feel the interactions
      </div>
    </div>
  );
}
