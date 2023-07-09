export const generateBingoBoard = (size, items) => {
  console.log('sizesize', size)
  const board = []

  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      const index = i * size + j
      const item = items[index]
      if (item) {
        row.push({...item, selected: item.selected || false})
      } else {
        row.push({
          x: j,
          y: i,
          title: '',
          color: '#F3F3F3',
          selected: false,
        })
      }
    }
    board.push(row)
  }
  return board
}

export const countBingos = (board, size) => {
  let count = 0

  // 가로 검사
  for (let i = 0; i < size; i++) {
    if (board[i].every(item => item.selected)) {
      count++
    }
  }

  // 세로 검사
  for (let i = 0; i < size; i++) {
    let isBingo = true
    for (let j = 0; j < size; j++) {
      if (!board[j][i].selected) {
        isBingo = false
        break
      }
    }
    if (isBingo) {
      count++
    }
  }

  // 대각선 검사 (왼쪽 위 -> 오른쪽 아래)
  if (board.every((row, index) => row[index].selected)) {
    count++
  }

  // 대각선 검사 (오른쪽 위 -> 왼쪽 아래)
  if (board.every((row, index) => row[size - index - 1].selected)) {
    count++
  }

  return count
}
