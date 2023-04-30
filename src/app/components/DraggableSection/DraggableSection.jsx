import { useState } from "react";

function DraggableSection({ matrixDays }) {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDragStart = (e, day, i, j) => {
    setSelectedDays([]);
    setSelectedDays([{ day, index: getPosition(i, j) }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, day, i, j) => {
    if (!selectedDays.includes(day)) {
      setSelectedDays([...selectedDays, { day, index: getPosition(i, j) }]);
    }
  };

  const getDayClassName = (i, j) => {
    const indices = selectedDays.map((day) => day.index);
    const minIndex = Math.min(...indices);
    const maxIndex = Math.max(...indices);

    const actualPosition = getPosition(i, j);

    if (actualPosition >= minIndex && actualPosition <= maxIndex)
      return "selected";
    return "";
  };

  function getPosition(i, j) {
    return i * matrixDays[0].length + j;
  }

  console.log(selectedDays);

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
              onClick={(e) => handleDragStart(e, elem.day, i, j)}
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
