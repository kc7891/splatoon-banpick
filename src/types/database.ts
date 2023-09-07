import { RULE } from "@/constants/rule";
import { StageKey } from "@/constants/stage";

export type TeamType = "alpha" | "bravo" | "admin" | "none";
export type RuleType = keyof typeof RULE;

export type SessionData = {
  stages: Array<{
    stageKey: StageKey;
    bannedBy: TeamType;
  }>;
  result: Array<{
    pickedStageKey: StageKey;
    pickedBy: TeamType;
    pickedRule: RuleType;
    wonBy: TeamType;
  }>;
};
