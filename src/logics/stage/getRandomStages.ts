import { STAGE } from "@/constants/stage";

export const getRandomStageKeys = (stageCount: number) => {
  const stageKeys = Object.keys(STAGE) as Array<keyof typeof STAGE>;
  // shuffle stages and pick stages.
  return stageKeys.sort(() => Math.random() - 0.5).slice(0, stageCount);
};
