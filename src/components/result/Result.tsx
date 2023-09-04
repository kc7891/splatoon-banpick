import Image from "next/image";
import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import styles from "./result.module.css";
import cx from "classnames";
import { RULE } from "@/constants/rule";
import { StageState } from "@/hooks/useAppState";

const PickColumn: FC<{
  activeStages: { name: string; path: string }[];
}> = ({ activeStages }) => {
  const [stageIndex, setStageIndex] = useState<number>(-1);
  const [rule, setRule] = useState<string>("");

  const stage = useMemo(
    () => activeStages[stageIndex],
    [activeStages, stageIndex],
  );
  const { name, path } = stage || {};

  const handleSelectStage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) {
        return;
      }
      setStageIndex(Number(value));
    },
    [],
  );

  const handleSelectRule = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) {
        return;
      }
      setRule(value);
    },
    [],
  );

  return (
    <div className={styles.pickColumnContainer}>
      <div>
        <select
          className={styles.stageSelect}
          value={`${stageIndex}`}
          onChange={handleSelectStage}
        >
          <option value="-1">マップ選択</option>
          {activeStages.map((stage, index) => {
            return (
              <option key={stage.name} value={index}>
                {stage.name}
              </option>
            );
          })}
        </select>
        <select
          className={styles.ruleSelect}
          value={rule}
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

const ResultRow: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAlphaWon, setIsAlphaWon] = useState<boolean>();
  const toggleAlphaWon = useCallback(() => {
    setIsAlphaWon((prev) => {
      return prev === undefined ? true : undefined;
    });
  }, []);

  const toggleBravoWon = useCallback(() => {
    setIsAlphaWon((prev) => {
      return prev === undefined ? false : undefined;
    });
  }, []);

  const result = useMemo(() => {
    if (isAlphaWon === undefined) {
      return {};
    }
    return isAlphaWon
      ? { alpha: "WIN", bravo: "LOSE" }
      : { alpha: "LOSE", bravo: "WIN" };
  }, [isAlphaWon]);

  return (
    <>
      <div
        className={cx(
          styles.teamCol,
          styles.alphaCol,
          isAlphaWon === undefined
            ? ""
            : isAlphaWon
            ? styles.alphaWon
            : styles.lose,
        )}
      >
        <button
          className={cx(
            styles.resultButton,
            isAlphaWon === undefined
              ? ""
              : isAlphaWon
              ? styles.alphaWon
              : styles.lose,
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
          isAlphaWon === undefined
            ? ""
            : isAlphaWon
            ? styles.lose
            : styles.bravoWon,
        )}
      >
        <button
          className={cx(
            styles.resultButton,
            isAlphaWon === undefined
              ? ""
              : isAlphaWon
              ? styles.lose
              : styles.bravoWon,
          )}
          onClick={toggleBravoWon}
        >
          <span>{result.bravo || "+"}</span>
        </button>
      </div>
    </>
  );
};

const MAX_GAME = 3;
export const Result: FC<{
  activeStages: StageState["activeStatges"];
}> = ({ activeStages }) => {
  const availableStages = useMemo(() => {
    return activeStages.filter((stage) => !stage.isBanned);
  }, [activeStages]);

  //   TODO: activeStagesの選択が切り替わったら、選択状態を全て削除しているが、雑実装なので要修正
  const rowIds = useMemo(() => {
    return new Array(MAX_GAME).fill(0).map(() => {
      return `${Math.random()}`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStages]);

  return (
    <div className={styles.container}>
      <ul>
        <li className={cx(styles.row, styles.header)}>
          <div className={cx(styles.teamCol, styles.alphaCol)}>アルファ</div>
          <div className={cx(styles.teamCol, styles.bravoCol)}>ブラボー</div>
        </li>
        {rowIds.map((id) => {
          return (
            <li key={id} className={cx(styles.row, styles.content)}>
              <ResultRow>
                <PickColumn activeStages={availableStages} />
              </ResultRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
