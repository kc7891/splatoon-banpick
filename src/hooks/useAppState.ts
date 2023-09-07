import { StageKey } from "@/constants/stage";
import { TeamType, RuleType } from "@/types/database";
import { useState } from "react";

export type AppState = {
  stages: Array<{
    stageKey: StageKey;
    bannedBy: TeamType;
  }>;
  result: Array<{
    pickedStageKey?: StageKey | "none";
    pickedBy?: TeamType | "none";
    pickedRule?: RuleType | "none";
    wonBy?: TeamType | "none";
  }>;
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    stages: [],
    result: [],
  });

  const setPartialState = (partialState: Partial<AppState>) => {
    setState((prevState) => {
      return { ...prevState, ...partialState };
    });
  };

  return [state, setPartialState] as const;
};
