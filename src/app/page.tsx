"use client";
import styles from "./page.module.css";
import { Result } from "@/components/result/Result";
import { Stages } from "@/components/stage/Stages";
import { StageState, useAppState } from "@/hooks/useAppState";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [appState, setAppState] = useAppState();
  const [isClient, setIsClient] = useState(false);

  // TODO: search best practice
  useEffect(() => {
    setIsClient(true);
  }, []);

  const setStageState = useCallback(
    (state: StageState) => {
      setAppState({ stageState: state });
    },
    [setAppState],
  );

  return (
    isClient && (
      <main className={styles.main}>
        <Stages
          state={appState.stageState}
          onChangeStageState={setStageState}
        />
        <Result />
      </main>
    )
  );
}
