import { StageKey } from "@/constants/stage";
import { TeamType, RuleType } from "@/types/database";
import { useState } from "react";

export type Stage = {
  stageKey: StageKey;
  bannedBy: TeamType;
};

export type Result = {
  pickedStageKey?: StageKey | "none";
  pickedBy?: TeamType | "none";
  pickedRule?: RuleType | "none";
  wonBy?: TeamType | "none";
};

export type AppState = {
  stages: Stage[];
  result: Result[];
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    stages: [],
    result: [
      { pickedStageKey: "none" },
      { pickedStageKey: "none" },
      { pickedStageKey: "none" },
    ],
  });

  const setPartialState = (partialState: Partial<AppState>) => {
    setState((prevState) => {
      return { ...prevState, ...partialState };
    });
  };

  return [state, setPartialState] as const;
};
