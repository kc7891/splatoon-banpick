import { useCallback, useEffect, useRef, useState } from "react";

// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, database } from "firebase/database";
import { SessionData } from "@/types/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi9tUkHCDN1cvObVMzH0ut0NoG3j4exmg",
  authDomain: "banpicktoon.firebaseapp.com",
  databaseURL:
    "https://banpicktoon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "banpicktoon",
  storageBucket: "banpicktoon.appspot.com",
  messagingSenderId: "828980576443",
  appId: "1:828980576443:web:98adf40925cae65e12a99e",
  measurementId: "G-8BS4Q6Q8N9",
};

export const useSessionDatabase = (sessionId: string) => {
  const appRef = useRef<FirebaseApp>();
  const setValue = useCallback(
    (partialSessionData: Partial<SessionData>) => {
      const db = getDatabase();
      console.log("set", partialSessionData);
      set(ref(db, sessionId), partialSessionData);
    },
    [sessionId],
  );

  const onValueChange = useCallback(
    (callback: (data: SessionData) => void) => {
      const db = getDatabase();
      const sessionRef = ref(db, sessionId);
      onValue(sessionRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
      });
    },
    [sessionId],
  );

  const visibilitychange = useCallback(() => {
    if (document.visibilityState === "visible") {
      database.goOnline();
    }

    if (document.visibilityState === "hidden") {
      database.goOffline();
    }
  }, []);

  useEffect(() => {
    appRef.current = initializeApp(firebaseConfig);

    document.addEventListener("visibilitychange", visibilitychange);
    return document.removeEventListener("visibilitychange", visibilitychange);
  }, [visibilitychange]);

  return appRef.current ? ([setValue, onValueChange] as const) : ([] as const);
};
