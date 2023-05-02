"use client";
import styles from "./page.module.css";
import Datepicker from "./components/Datepicker/Datepicker";

export default function Home() {
  const interval = { begin: 2020, end: 2023 };

  return (
    <main className={styles.main}>
      <Datepicker interval={interval} />
    </main>
  );
}
