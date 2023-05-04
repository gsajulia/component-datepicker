"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import left from "../../../../public/chevron-left.svg";
import right from "../../../../public/chevron-right.svg";
import dot from "../../../../public/dot.svg";

const Monthpicker = ({
  changePicker,
  calendar,
  selectedDate,
  changeDate,
  interval,
}) => {
  const actualYearList = calendar.find(
    (elem) => elem.year === selectedDate.year
  );

  const shortMonths = actualYearList.months.map(
    (elem) => `${elem.name[0]}${elem.name[1]}${elem.name[2]}`
  );

  const getCellColor = (index) => {
    switch (index) {
      case selectedDate.month:
        return "var(--deep-purple)";
      case new Date().getMonth():
        return "none";
      default:
        return "none";
    }
  };

  const tableLine = () => {
    return shortMonths.map((month, index) => (
      <div
        className={styles.months}
        onClick={() => changeDate({ month: index })}
        key={month}
        style={{
          background: getCellColor(index),
          color:
            getCellColor(index) === "var(--deep-purple)" ? "white" : "initial",
        }}
      >
        {month}
        {selectedDate.month === index && (
          <Image src={dot} alt="dot" width={4} height={4} priority />
        )}
      </div>
    ));
  };

  const previousYear = () => {
    if (selectedDate.year <= interval.begin) alert("Já está no mínimo");
    else changeDate({ year: selectedDate.year - 1 });
  };

  const nextYear = () => {
    if (selectedDate.year >= interval.end) alert("Já está no máximo");
    else changeDate({ year: selectedDate.year + 1 });
  };

  return (
    <div className={styles.containerMonth}>
      <div className={styles.headerMonth}>
        <Image
          className={styles.leftMonthHeader}
          onClick={previousYear}
          src={left}
          alt="chevron left icon"
          height={24}
          width={24}
        />
        <div className={styles.yearHeaderMonth} onClick={changePicker}>
          {actualYearList.year}
        </div>
        <Image
          className={styles.rightMonthHeader}
          onClick={nextYear}
          src={right}
          alt="chevron right icon"
          height={24}
          width={24}
        />
      </div>
      <div className={styles.tableMonths}>{tableLine()}</div>
    </div>
  );
};

export default Monthpicker;
