"use client";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Datepicker from "./components/Datepicker/Datepicker";
import Monthpicker from "./components/Monthpicker/Monthpicker";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [datepickerType, setDateickerType] = useState(true);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function getMonthList(year) {
    const months = [
      { name: "Janeiro", days: getDaysInMonth(year, 1) },
      { name: "Fevereiro", days: getDaysInMonth(year, 2) },
      { name: "Março", days: getDaysInMonth(year, 3) },
      { name: "Abril", days: getDaysInMonth(year, 4) },
      { name: "Maio", days: getDaysInMonth(year, 5) },
      { name: "Junho", days: getDaysInMonth(year, 6) },
      { name: "Julho", days: getDaysInMonth(year, 7) },
      { name: "Agosto", days: getDaysInMonth(year, 8) },
      { name: "Setembro", days: getDaysInMonth(year, 9) },
      { name: "Outubro", days: getDaysInMonth(year, 10) },
      { name: "Novembro", days: getDaysInMonth(year, 11) },
      { name: "Dezembro", days: getDaysInMonth(year, 12) },
    ];
    return months;
  }

  function getYearList(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      const months = getMonthList(year);
      years.push({ year, months });
    }
    console.log(years);
    return years;
  }

  const interval = { begin: 2022, end: 2023 };
  const calendar = getYearList(interval.begin, interval.end);

  const changePicker = () => {
    setDateickerType((prev) => !prev);
  };

  const changeDate = (obj) => {
    setSelectedDate((prev) => ({ ...prev, obj }));
  };

  const minimumYearVerification = (month = null) => {
    if (month !== null) {
      changeDate({ month });
      return;
    }
    if (selectedDate.year - 1 <= interval.begin) {
      // alert("Já está no ano mínimo");
      return;
    }

    changeDate({ year: selectedDate.year - 1 });
  };

  const maximumYearVerification = (month = null) => {
    debugger;
    if (month !== null) {
      changeDate({ month });
      return;
    }
    if (selectedDate.year + 1 >= interval.end) {
      alert("Já está no ano máximo");
      return;
    }

    changeDate({ year: selectedDate.year - 1 });
  };

  return (
    <main className={styles.main}>
      {/* {datepickerType ? (
        <Datepicker
          changePicker={changePicker}
          calendar={calendar}
          selectedDate={selectedDate}
          changeDate={changeDate}
          interval={interval}
          minimumYearVerification={minimumYearVerification}
          maximumYearVerification={maximumYearVerification}
        />
      ) : (
        <Monthpicker
          changePicker={changePicker}
          calendar={calendar}
          selectedDate={selectedDate}
          changeDate={changeDate}
          interval={interval}
          minimumYearVerification={minimumYearVerification}
          maximumYearVerification={maximumYearVerification}
        />
      )} */}
    </main>
  );
}
