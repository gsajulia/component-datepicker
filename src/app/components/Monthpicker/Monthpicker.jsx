"use client";
import { useState } from "react";
import styles from "./styles.module.css";

const Monthpicker = ({
  changePicker,
  calendar,
  selectedDate,
  minimumYearVerification,
  maximumYearVerification,
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
          <div key={month} style={{ background: getCellColor(index) }}>
            {month}
          </div>
        )
    );
  };

  return (
    <div>
      <div>
        <span onClick={minimumYearVerification}>{"<-"}</span>
        <div onClick={changePicker}>{actualYearList.year}</div>
        <span onClick={maximumYearVerification}>{"->"}</span>
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
