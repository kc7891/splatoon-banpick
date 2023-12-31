"use client";
import styles from "./page.module.css";
import { Header } from "@/components/header/Header";
import { Result } from "@/components/result/Result";
import { Stages } from "@/components/stage/Stages";
import { AppState, useAppState } from "@/hooks/useAppState";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSessionDatabase } from "@/hooks/useDatabase";
import { redirect } from "next/navigation";
import { getRandomStageKeys } from "@/logics/stage/getRandomStages";
import equal from "fast-deep-equal";
import { SessionData } from "@/types/database";
import { checkResultEmpty } from "@/logics/result/checkResultEmpty";

export default function Session() {
  const pathname = usePathname();
  const sessionId = pathname.replace(/.*session\//, "");

  if (sessionId === undefined || typeof sessionId !== "string") {
    redirect("/");
  }

  const [appState, setAppState] = useAppState();
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [setDatabase, onDatabaseValueChange] = useSessionDatabase(sessionId);

  const setDatabaseWithConfirm = useCallback(
    (data: AppState) => {
      if (!setDatabase) return;

      const isResultEmpty = checkResultEmpty(appState.result);
      if (
        !isResultEmpty &&
        !confirm("Pick・試合結果をリセットしますがよろしいですか？")
      )
        return;
      setDatabase(data);
    },
    [appState.result, setDatabase],
  );

  const setAppStateWithDatabase = useCallback(
    (value: SessionData) => {
      if (!value || equal(appState, value)) {
        return;
      }
      console.log(value);
      setAppState(value);
    },
    [appState, setAppState],
  );

  // TODO: search best practice
  useEffect(() => {
    setIsClient(true);
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  const isSubscribed = useRef(false);
  if (isSubscribed.current === false) {
    if (isClient && onDatabaseValueChange) {
      isSubscribed.current = true;
      onDatabaseValueChange(setAppStateWithDatabase);
    }
  }

  const setNewStage = useCallback(() => {
    const stages = getRandomStageKeys(6).map(
      (key) =>
        ({
          stageKey: key,
          bannedBy: "none",
        }) as const,
    );
    setDatabaseWithConfirm({
      stages,
      result: [
        { pickedStageKey: "none" },
        { pickedStageKey: "none" },
        { pickedStageKey: "none" },
      ],
    });
  }, [setDatabaseWithConfirm]);

  return !isClient ? null : isClient && appState.stages.length === 0 ? (
    <main className={styles.main}>
      <Header></Header>
      {isLoaded && (
        <div className={styles.newGameContainer}>
          <button className={styles.setStageButtonLarge} onClick={setNewStage}>
            ゲームを始める
          </button>
        </div>
      )}
    </main>
  ) : (
    <main className={styles.main}>
      <Header>
        <button onClick={setNewStage}>new game</button>
      </Header>
      <Stages
        stages={appState.stages}
        onChangeStageState={setDatabaseWithConfirm}
      />
      <Result
        stages={appState.stages}
        results={appState.result}
        onChangeState={setDatabase}
      />
    </main>
  );
}
