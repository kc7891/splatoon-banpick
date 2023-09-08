import { Result } from "@/hooks/useAppState";

export const checkResultEmpty = (results: Result[]) => {
  console.log("results", results);
  return results.every((result) => {
    return Object.values(result).every((value) => {
      return value === "none";
    });
  });
};
