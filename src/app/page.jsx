"use client";
import styles from "./page.module.css";
import Datepicker from "./components/Datepicker/Datepicker";

export default function Home() {
  const interval = { begin: 2020, end: 2023 };
  const date = new Date();
  return (
    <main className={styles.main}>
      <Datepicker interval={interval} date={date} />
    </main>
  );
}
