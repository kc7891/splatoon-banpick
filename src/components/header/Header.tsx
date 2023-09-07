import { FC } from "react";
import styles from "./header.module.css";
import cx from "classnames";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <>
      <nav className={styles.container}>
        <ul className={cx(styles.content, styles.navigationHeight)}>
          <li className={styles.title}>
            <Link href="/">
              <AiOutlineHome />
            </Link>
          </li>
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
