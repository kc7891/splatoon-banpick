"use client";
import styles from "./page.module.css";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // TODO: search best practice
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <h1>Banpicktoon</h1>
          <button className={styles.newSession}>新しく始める</button>
        </div>
      </main>
    )
  );
}
