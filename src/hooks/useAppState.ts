import { STAGE } from "@/constants/stage";
import { getRandomStages } from "@/logics/stage/getRandomStages";
import { useState } from "react";

export type StageState = {
  activeStatges: Array<
    (typeof STAGE)[keyof typeof STAGE] & {
      isBanned?: boolean;
      bannedBy?: string;
    }
  >;
};

type State = {
  stageState: StageState;
};

export const useAppState = () => {
  const [state, setState] = useState<State>({
    stageState: {
      activeStatges: getRandomStages(6).map((e) => ({ ...e, isBanned: false })),
    },
  });

  const setPartialState = (partialState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...partialState };
    });
  };

  return [state, setPartialState] as const;
};
