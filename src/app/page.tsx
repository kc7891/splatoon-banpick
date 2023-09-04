import Image from "next/image";
import styles from "./page.module.css";
import { STAGE } from "./constants/stage";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        {Object.entries(STAGE).map(([key, data]) => {
          return (
            <div key={key}>
              <h1>{data.name}</h1>
              <Image src={data.path} alt={data.name} width="400" height="227" />
            </div>
          );
        })}
      </div>
    </main>
  );
}
