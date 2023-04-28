"use client";
import { useState } from "react";
import styles from "./styles.module.css";

const Datepicker = () => {
  const calendar = getYearList(2022, 2023);
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });

  console.log(selectedDate);
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
    return years;
  }

  function getFirstDayOfWeek(month, year) {
    const date = new Date(Date.UTC(year, month, 1));
    return date.getUTCDay();
  }

  const actualYearList = calendar.find(
    (elem) => elem.year === selectedDate.year
  );
  //TODO last month dont have before
  const beforeActualYearList = calendar.find(
    (elem) => elem.year - 1 === selectedDate.year - 1
  );

  const firstDay = getFirstDayOfWeek(selectedDate.month, selectedDate.year);

  const getFirstRow = () => {
    const row = [];

    const lastMonthSize = firstDay;
    const actualMonthFirstRowSize = 7 - firstDay;
    let lastMonthDays = beforeActualYearList.months[selectedDate.month].days;
    //last month
    for (let i = 0; i < lastMonthSize; i++) {
      row.push({ type: "last", day: lastMonthDays });
      lastMonthDays--;
    }

    //first row actual month
    for (let i = 0; i < actualMonthFirstRowSize; i++) {
      row.push({ type: "actual", day: i + 1 });
    }

    return row;
  };

  const getDaysMatrixAfterFirstRow = () => {
    let rows,
      columns = 7;
    const daysOfMonthOfActualYear =
      actualYearList.months[selectedDate.month].days;
    const startOfSecondLine = 7 - firstDay + 1;

    const daysFromSecondLine = daysOfMonthOfActualYear - (7 - firstDay);
    rows = Math.ceil(daysFromSecondLine / 7);
    let count = startOfSecondLine;
    let type = "actual";

    const daysMatrixRows = [getFirstRow()];
    let daysMatrixColumns = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        daysMatrixColumns.push({ type, day: count });
        if (count >= daysOfMonthOfActualYear) {
          count = 0;
          type = "next";
        }
        count++;
      }
      daysMatrixRows.push(daysMatrixColumns);
      daysMatrixColumns = [];
    }

    return daysMatrixRows;
  };

  const matrixDays = getDaysMatrixAfterFirstRow();
  return (
    <div>
      <table className={styles.calendar}>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {[
            ...new Array(
              actualYearList.months[selectedDate.month].days + firstDay
            ),
          ].map((_, index) => {
            return <tr key={index}>{index + 1}</tr>;
          })} */}
          {matrixDays.map((_, i) => {
            return (
              <tr key={i}>
                {matrixDays[i].map((elem, j) => {
                  return <td key={j}>{elem.day}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Datepicker;
