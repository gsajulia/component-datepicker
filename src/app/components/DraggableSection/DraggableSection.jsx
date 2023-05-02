import Image from "next/image";
import { useEffect, useState } from "react";
import { getPosition, getMatrixIndex } from "@/app/utils/array";
import styles from "./styles.module.css";
import dropdown from "../../../../public/arrow-drop-down.svg";
import dot from "../../../../public/dot.svg";

function DraggableSection({ matrixDays, changeDate }) {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDragStart = (e, day, i, j) => {
    setSelectedDays([]);
    setSelectedDays([{ day, index: getPosition(i, j, matrixDays[0].length) }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, day, i, j) => {
    if (!selectedDays.includes(day)) {
      setSelectedDays([
        ...selectedDays,
        { day, index: getPosition(i, j, matrixDays[0].length) },
      ]);
    }
  };

  const getDayClassName = (i, j) => {
    const indices = selectedDays.map((day) => day.index);
    const minIndex = Math.min(...indices);
    const maxIndex = Math.max(...indices);

    const actualPosition = getPosition(i, j, matrixDays[0].length);

    if (actualPosition >= minIndex && actualPosition <= maxIndex)
      return {
        selection: "selected",
        position:
          actualPosition === minIndex
            ? "min"
            : actualPosition === maxIndex
            ? "max"
            : "middle",
      };
    return {
      selection: "",
      position: "",
    };
  };

  useEffect(() => {
    const changeDateWithDragDays = (selected) => {
      let days = [];
      const indices = selected.map((day) => day.index);
      const minIndex = Math.min(...indices);
      const maxIndex = Math.max(...indices);

      if (minIndex === maxIndex) {
        const position = getMatrixIndex(minIndex, matrixDays[0].length);
        const { row, col } = position;
        days.push(matrixDays[row][col]);
      } else {
        for (let i = minIndex; i <= maxIndex; i++) {
          const position = getMatrixIndex(i, matrixDays[0].length);
          const { row, col } = position;
          days.push({ ...matrixDays[row][col], row, col });
        }
      }
      return days;
    };

    const days = changeDateWithDragDays(selectedDays);

    changeDate({ day: days });
  }, [selectedDays]);

  return matrixDays.map((_, i) => {
    return (
      <tr key={i}>
        {matrixDays[i].map((elem, j) => {
          const style = getDayClassName(i, j);
          return (
            <td
              key={j}
              style={{
                borderTopLeftRadius: style.position === "min" ? ".5rem" : "0",
                borderBottomLeftRadius:
                  style.position === "min" ? ".5rem" : "0",
                borderTopRightRadius: style.position === "max" ? ".5rem" : "0",
                borderBottomRightRadius:
                  style.position === "max" ? ".5rem" : "0",
                background: style.selection === "selected" ? "#6200EE" : "none",
                color: style.selection === "selected" && "white",
              }}
              draggable={true}
              className={`
                ${
                  elem.type === "last" || elem.type === "next"
                    ? styles.lastOrNextMonthDays
                    : ""
                } ${styles.cell} ${
                style.position === "min" ? styles.actualCircle : ""
              }`}
              // onClick={(e) => handleDragStart(e, elem.day, i, j)}
              onDragStart={(e) => handleDragStart(e, elem.day, i, j)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, elem.day, i, j)}
            >
              {elem.day}
              {style.position === "min" && (
                <Image src={dot} alt="dot" width={4} height={4} priority />
              )}
            </td>
          );
        })}
      </tr>
    );
  });
}

export default DraggableSection;
