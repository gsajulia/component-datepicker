export const getPosition = (i, j, sizeCols) => {
  return i * sizeCols + j;
};

export const getMatrixIndex = (index, sizeCols) => {
  const row = Math.floor(index / sizeCols);
  const col = index % sizeCols;

  return { row, col };
};