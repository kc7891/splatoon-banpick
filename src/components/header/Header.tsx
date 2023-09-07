import { FC, ReactNode } from "react";
import styles from "./header.module.css";
import cx from "classnames";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

export const Header: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <nav className={styles.container}>
        <ul className={cx(styles.content, styles.navigationHeight)}>
          <li className={styles.title}>
            <Link href="/">
              <AiOutlineHome />
            </Link>
          </li>
          <li>{children}</li>
        </ul>
      </nav>
      {/* spacer */}
      <div className={styles.navigationHeight}></div>
    </>
  );
};
