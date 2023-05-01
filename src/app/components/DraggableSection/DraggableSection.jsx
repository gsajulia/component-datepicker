import { useEffect, useState } from "react";
import { getPosition, getMatrixIndex } from "@/app/utils/array";

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
      return "selected";
    return "";
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
          return (
            <td
              key={j}
              style={{
                background:
                  getDayClassName(i, j) === "selected" ? "pink" : "none",
              }}
              draggable={true}
              // onClick={(e) => handleDragStart(e, elem.day, i, j)}
              onDragStart={(e) => handleDragStart(e, elem.day, i, j)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, elem.day, i, j)}
            >
              {elem.day}
            </td>
          );
        })}
      </tr>
    );
  });
}

export default DraggableSection;
