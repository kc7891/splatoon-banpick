import Image from "next/image";
import { FC, ReactNode, useCallback, useMemo } from "react";
import styles from "./result.module.css";
import cx from "classnames";
import { RULE } from "@/constants/rule";
import { AppState } from "@/hooks/useAppState";
import { STAGE, StageKey } from "@/constants/stage";
import { RuleType, TeamType } from "@/types/database";

const PickColumn: FC<{
  stageKey?: StageKey;
  ruleKey?: RuleType;
  stages: StageKey[];
  onChangeValue?: (stageKey: StageKey, rule: RuleType) => void;
}> = ({ stages, stageKey = "none", ruleKey = "none", onChangeValue }) => {
  const stage = useMemo(
    () => (stageKey && stageKey !== "none" ? STAGE[stageKey] : undefined),
    [stageKey],
  );
  const rule = useMemo(
    () =>
      ruleKey && ruleKey in RULE
        ? ((RULE as any)[ruleKey] as (typeof RULE)[keyof typeof RULE])
        : undefined,
    [ruleKey],
  );
  const { name, path } = stage || {};

  const handleSelectStage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) {
        return;
      }
      if (onChangeValue) onChangeValue(value as StageKey, ruleKey);
    },
    [onChangeValue, ruleKey],
  );

  const handleSelectRule = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) {
        if (onChangeValue) onChangeValue(stageKey, "none");
        return;
      }
      if (onChangeValue) onChangeValue(stageKey, value as RuleType);
    },
    [onChangeValue, stageKey],
  );

  return (
    <div className={styles.pickColumnContainer}>
      <div>
        <select
          className={styles.stageSelect}
          value={stageKey}
          onChange={handleSelectStage}
        >
          <option value="none">マップ選択</option>
          {stages.map((stageKey) => {
            const stage = stageKey !== "none" ? STAGE[stageKey] : undefined;
            return (
              <option key={stageKey} value={stageKey}>
                {stage?.name}
              </option>
            );
          })}
        </select>
        <div className={styles.ruleIconContainer}>
          {rule?.path && (
            <Image
              className={styles.ruleIcon}
              src={rule.path}
              alt={rule.name}
              width="128"
              height="128"
            />
          )}
        </div>
        <select
          className={cx(styles.ruleSelect, { [styles.hide]: rule })}
          value={ruleKey}
          onChange={handleSelectRule}
        >
          <option value="">ルール選択</option>
          {Object.entries(RULE).map(([key, data]) => {
            return (
              <option key={key} value={key}>
                {data.name}
              </option>
            );
          })}
        </select>
        {name && path ? (
          <figure className={styles.stageImageContainer}>
            <Image
              className={styles.stageImage}
              src={path}
              alt={name}
              width="400"
              height="227"
            />
          </figure>
        ) : (
          <div className={styles.stagePlaceholder}></div>
        )}
      </div>
    </div>
  );
};

const ResultRow: FC<{
  children: ReactNode;
  wonBy: TeamType;
  onChangeWonBy: (teamType: TeamType) => void;
}> = ({ children, wonBy, onChangeWonBy }) => {
  const toggleAlphaWon = useCallback(() => {
    onChangeWonBy(wonBy === "alpha" ? "none" : "alpha");
  }, [onChangeWonBy, wonBy]);

  const toggleBravoWon = useCallback(() => {
    onChangeWonBy(wonBy === "bravo" ? "none" : "bravo");
  }, [onChangeWonBy, wonBy]);

  const result = useMemo(() => {
    if (wonBy === "alpha") {
      return { alpha: "WIN", bravo: "LOSE" };
    }
    if (wonBy === "bravo") {
      return { alpha: "LOSE", bravo: "WIN" };
    }
    return {};
  }, [wonBy]);

  return (
    <>
      <div
        className={cx(
          styles.teamCol,
          styles.alphaCol,
          wonBy === "alpha"
            ? styles.alphaWon
            : wonBy === "bravo"
            ? styles.lose
            : "",
        )}
      >
        <button
          className={cx(
            styles.resultButton,
            wonBy === "alpha"
              ? styles.alphaWon
              : wonBy === "bravo"
              ? styles.lose
              : "",
          )}
          onClick={toggleAlphaWon}
        >
          <span>{result.alpha || "+"}</span>
        </button>
      </div>
      <div className={cx(styles.pickCol)}>{children}</div>
      <div
        className={cx(
          styles.teamCol,
          styles.bravoCol,
          wonBy === "bravo"
            ? styles.bravoWon
            : wonBy === "alpha"
            ? styles.lose
            : "",
        )}
      >
        <button
          className={cx(
            styles.resultButton,
            wonBy === "bravo"
              ? styles.bravoWon
              : wonBy === "alpha"
              ? styles.lose
              : "",
          )}
          onClick={toggleBravoWon}
        >
          <span>{result.bravo || "+"}</span>
        </button>
      </div>
    </>
  );
};

export const Result: FC<{
  stages: AppState["stages"];
  results: AppState["result"];
  onChangeState?: (stages: AppState) => void;
}> = ({ stages, results, onChangeState }) => {
  const availableStageKeys = useMemo(() => {
    return stages
      .filter((stage) => stage.bannedBy === "none")
      .map((stage) => stage.stageKey);
  }, [stages]);

  const updateResult = useCallback(
    (
      index: number,
      {
        stageKey,
        ruleKey,
        wonBy,
      }: { stageKey?: StageKey; ruleKey?: RuleType; wonBy?: TeamType },
    ) => {
      if (!onChangeState) return;
      onChangeState({
        stages: stages,
        result: results.map((data, i) => {
          if (i === index) {
            const update = {
              ...data,
              pickedStageKey: stageKey,
              pickedRule: ruleKey,
              wonBy,
            };

            Object.keys(update).forEach((key) => {
              // @ts-ignore 眠いので無視
              if (update[key] === undefined) {
                // @ts-ignore
                delete update[key];
              }
            });

            return update;
          }
          return data;
        }),
      });
    },
    [onChangeState, results, stages],
  );

  return (
    <div className={styles.container}>
      <ul>
        <li className={cx(styles.row, styles.header)}>
          <div className={cx(styles.teamCol, styles.alphaCol)}>アルファ</div>
          <div className={cx(styles.teamCol, styles.bravoCol)}>ブラボー</div>
        </li>
        {results?.map((data, index) => {
          return (
            <li key={index} className={cx(styles.row, styles.content)}>
              <ResultRow
                wonBy={data.wonBy || "none"}
                onChangeWonBy={(teamType) => {
                  updateResult(index, {
                    stageKey: data.pickedStageKey,
                    ruleKey: data.pickedRule,
                    wonBy: teamType,
                  });
                }}
              >
                <PickColumn
                  stageKey={data.pickedStageKey}
                  ruleKey={data.pickedRule}
                  stages={availableStageKeys}
                  onChangeValue={(stageKey, ruleKey) =>
                    updateResult(index, {
                      stageKey,
                      ruleKey,
                      wonBy: data.wonBy,
                    })
                  }
                />
              </ResultRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
