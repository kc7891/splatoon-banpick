import Image from "next/image";
import { FC, useCallback } from "react";
import { noop } from "@/logics/noop";
import { StageState } from "@/hooks/useAppState";
import styles from "./stages.module.css";

const Stage: FC<{
  name: string;
  imgPath: string;
  isBanned?: boolean;
  onBan?: (targetName: string) => void;
  onUnban?: (targetName: string) => void;
}> = ({ name, imgPath, isBanned, onBan = noop, onUnban = noop }) => {
  const handleBan = useCallback(() => {
    onBan(name);
  }, [name, onBan]);
  const handleUnBan = useCallback(() => {
    onUnban(name);
  }, [name, onUnban]);

  return (
    <div className={styles.stageContainer}>
      <button onClick={isBanned ? handleUnBan : handleBan}>
        {isBanned && <div className={styles.overlay}>⚠</div>}
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
  state: StageState;
  onChangeStageState: (state: StageState) => void;
}> = ({ state, onChangeStageState = noop }) => {
  const { activeStatges } = state;

  const switchBan = useCallback(
    (targetName: string, isBanned: boolean) => {
      onChangeStageState({
        activeStatges: activeStatges.map((data) => {
          if (data.name === targetName) {
            return {
              ...data,
              isBanned,
            };
          }
          return data;
        }),
      });
    },
    [activeStatges, onChangeStageState],
  );

  const handleBan = useCallback(
    (targetName: string) => {
      switchBan(targetName, true);
    },
    [switchBan],
  );

  const handleUnban = useCallback(
    (targetName: string) => {
      switchBan(targetName, false);
    },
    [switchBan],
  );

  return (
    <div className={styles.stagesContainer}>
      {activeStatges.map((data) => {
        const { name, path, isBanned } = data;
        return (
          <Stage
            key={data.name}
            name={name}
            imgPath={path}
            isBanned={isBanned}
            onBan={handleBan}
            onUnban={handleUnban}
          />
        );
      })}
    </div>
  );
};
