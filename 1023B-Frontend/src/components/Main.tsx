import styles from './Main.module.css';

import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <div className={styles.wrapper}>
      <main>{children}</main>
    </div>
  );
}
