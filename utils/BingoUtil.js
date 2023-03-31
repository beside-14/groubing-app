export default function generateBingoBoard(rows, columns, items) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      const item = items[index];
      if (item) {
        row.push({ ...item, selected: item.selected || false });
      } else {
        row.push({
          x: j,
          y: i,
          title: "",
          color: "#F3F3F3",
          selected: false,
        });
      }
    }
    board.push(row);
  }
  return board;
}
