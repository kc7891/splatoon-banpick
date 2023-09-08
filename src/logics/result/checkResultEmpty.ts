import { Result } from "@/hooks/useAppState";

export const checkResultEmpty = (results: Result[]) => {
  return results.every((result) => {
    return Object.values(result).every((value) => {
      return value === "none";
    });
  });
};
