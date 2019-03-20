let globalMatrix;

module.exports = function solveSudoku(matrix) {
  globalMatrix = matrix;
  const UNDEFINEDCELL = findUndefinedCell();

  if(UNDEFINEDCELL) {
    const X = findingRightValue(UNDEFINEDCELL.rowIndex, UNDEFINEDCELL.colIndex, 1);
    globalMatrix[UNDEFINEDCELL.rowIndex][UNDEFINEDCELL.colIndex] = X;
    return solveSudoku(globalMatrix);
  } else {
    return globalMatrix;
  }
  
}

function findUndefinedCell() {
  let result = false;

  globalMatrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if(col == 0) {
        result = {
          rowIndex: rowIndex,
          colIndex: colIndex
        }
      }  
    });
  });

  return result;
}

function findingRightValue(row, col, x) {
  const ROW = Math.floor(row - row % 3);
  const COL = Math.floor(col - col % 3);

  for (let i = ROW; i < ROW + 3; i++) {
		for (let j = COL; j < COL + 3; j++) {
			if (globalMatrix[i][j] == x) {
				return findingRightValue(row, col, x + 1);
			}
		}
  }

  for(let i = 0, len = globalMatrix.length; i < len; i++) {
    if(globalMatrix[row][i] == x || globalMatrix[i][col] == x) {
      return findingRightValue(row, col, x + 1);
    }
  }
  
  return x;
}