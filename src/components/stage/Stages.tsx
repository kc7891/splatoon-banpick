import Image from "next/image";
import { FC, useCallback } from "react";
import { noop } from "@/logics/noop";
import styles from "./stages.module.css";
import { Block } from "../svg/Block";
import { AppState } from "@/hooks/useAppState";
import { TeamType } from "@/types/database";
import { STAGE } from "@/constants/stage";

const Stage: FC<{
  stageKey: string;
  name: string;
  imgPath: string;
  isBanned?: boolean;
  onBan?: (targetName: string) => void;
  onUnban?: (targetName: string) => void;
}> = ({ stageKey, name, imgPath, isBanned, onBan = noop, onUnban = noop }) => {
  const handleBan = useCallback(() => {
    onBan(stageKey);
  }, [stageKey, onBan]);
  const handleUnBan = useCallback(() => {
    onUnban(stageKey);
  }, [stageKey, onUnban]);

  return (
    <div className={styles.stageContainer}>
      <button onClick={isBanned ? handleUnBan : handleBan}>
        {isBanned ? (
          <div className={styles.overlay}>
            <Block className={styles.blockIcon} />
          </div>
        ) : (
          <div className={styles.banButton}>+</div>
        )}
        <figure>
          <figcaption className={styles.caption}>{name}</figcaption>
          <Image
            className={styles.stageImage}
            src={imgPath}
            alt={name}
            width="400"
            height="227"
          />
        </figure>
      </button>
    </div>
  );
};

export const Stages: FC<{
  stages: AppState["stages"];
  onChangeStageState?: (stages: Partial<AppState>) => void;
}> = ({ stages, onChangeStageState = noop }) => {
  const switchBan = useCallback(
    (targetKey: string, bannedBy: TeamType) => {
      onChangeStageState({
        stages: stages.map((data) => {
          if (data.stageKey === targetKey) {
            return {
              ...data,
              bannedBy,
            };
          }
          return data;
        }),
        result: [
          { pickedStageKey: "none" },
          { pickedStageKey: "none" },
          { pickedStageKey: "none" },
        ],
      });
    },
    [onChangeStageState, stages],
  );

  const handleBan = useCallback(
    (targetKey: string) => {
      switchBan(targetKey, "admin");
    },
    [switchBan],
  );

  const handleUnban = useCallback(
    (targetName: string) => {
      switchBan(targetName, "none");
    },
    [switchBan],
  );

  return (
    <div className={styles.stagesContainer}>
      {stages.map(({ stageKey, bannedBy }) => {
        if (stageKey === "none") {
          return null;
        }

        const { name, path } = STAGE[stageKey];
        return (
          <Stage
            key={stageKey}
            stageKey={stageKey}
            name={name}
            imgPath={path}
            isBanned={bannedBy !== "none"}
            onBan={handleBan}
            onUnban={handleUnban}
          />
        );
      })}
    </div>
  );
};
