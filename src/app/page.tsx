"use client";
import styles from "./page.module.css";
import { Header } from "@/components/header/Header";
import { generateId } from "@/logics/generateHash";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const sessionRef = useRef<string>();

  // TODO: search best practice
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    sessionRef.current = generateId();
  }

  return (
    isClient && (
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <h1>Banpicktoon</h1>
          <Link
            href={`/session/${sessionRef.current}`}
            className={styles.newSession}
          >
            新しく始める
          </Link>
        </div>
      </main>
    )
  );
}
