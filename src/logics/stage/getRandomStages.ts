import { STAGE } from "@/constants/stage";

export const getRandomStages = (stageCount: number) => {
  const stages = Object.values(STAGE);
  // shuffle stages and pick stages.
  return stages.sort(() => Math.random() - 0.5).slice(0, stageCount);
};
