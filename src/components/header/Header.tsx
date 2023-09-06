import { FC } from "react";
import styles from "./header.module.css";
import cx from "classnames";

export const Header: FC = () => {
  return (
    <>
      <nav className={styles.container}>
        <ul className={cx(styles.content, styles.navigationHeight)}>
          <li className={styles.title}>Banpicktoon</li>
          <li>
            {/* TODO: ヘルプの準備ができたら表示 */}
            {/* <BiHelpCircle /> */}
          </li>
        </ul>
      </nav>
      {/* spacer */}
      <div className={styles.navigationHeight}></div>
    </>
  );
};
