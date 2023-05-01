"use client";
import { useState } from "react";
import styles from "./styles.module.css";

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
        return "pink";
      case new Date().getMonth():
        return "gray";
      default:
        return "none";
    }
  };

  const tableLine = (begin, end) => {
    return shortMonths.map(
      (month, index) =>
        index >= begin &&
        index < end && (
          <div
            onClick={() => changeDate({ month: index })}
            key={month}
            style={{ background: getCellColor(index) }}
          >
            {month}
          </div>
        )
    );
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
    <div>
      <div>
        <span onClick={previousYear}>{"<-"}</span>
        <div onClick={changePicker}>{actualYearList.year}</div>
        <span onClick={nextYear}>{"->"}</span>
      </div>
      <div>
        <div style={{ display: "flex" }}>{tableLine(0, 3)}</div>
        <div style={{ display: "flex" }}>{tableLine(3, 6)}</div>
        <div style={{ display: "flex" }}>{tableLine(6, 9)}</div>
      </div>
    </div>
  );
};

export default Monthpicker;
