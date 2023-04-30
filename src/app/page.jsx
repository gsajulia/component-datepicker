"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Datepicker from "./components/Datepicker/Datepicker";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const interval = { begin: 2020, end: 2023 };

  return (
    <main className={styles.main}>
      <Datepicker interval={interval} />
    </main>
  );
}
