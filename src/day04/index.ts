import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

// const printBoard = (board: string[][]) => {
//   board.forEach((row) => {
//     console.log(row.join(""));
//   });
// };

const getBoard = (input: string) => {
  const board: string[][] = [];
  const lines = input.split("\n");

  lines.forEach((line) => {
    board.push(line.split(""));
  });

  return board;
};

const checkLeft = (board: string[][], x: number, y: number) => {
  if (y < 3) {
    return false;
  }

  return (
    board[x][y - 1] === "M" &&
    board[x][y - 2] === "A" &&
    board[x][y - 3] === "S"
  );
};

const checkRight = (board: string[][], x: number, y: number) => {
  if (y > board[x].length - 4) {
    return false;
  }
  return (
    board[x][y + 1] === "M" &&
    board[x][y + 2] === "A" &&
    board[x][y + 3] === "S"
  );
};

const checkUp = (board: string[][], x: number, y: number) => {
  if (x < 3) {
    return false;
  }

  return (
    board[x - 1][y] === "M" &&
    board[x - 2][y] === "A" &&
    board[x - 3][y] === "S"
  );
};

const checkDown = (board: string[][], x: number, y: number) => {
  if (x > board.length - 4) {
    return false;
  }

  return (
    board[x + 1][y] === "M" &&
    board[x + 2][y] === "A" &&
    board[x + 3][y] === "S"
  );
};

const checkUpLeft = (board: string[][], x: number, y: number) => {
  if (x < 3 || y < 3) {
    return false;
  }

  return (
    board[x - 1][y - 1] === "M" &&
    board[x - 2][y - 2] === "A" &&
    board[x - 3][y - 3] === "S"
  );
};

const checkUpRight = (board: string[][], x: number, y: number) => {
  if (x < 3 || y > board[x].length - 4) {
    return false;
  }

  return (
    board[x - 1][y + 1] === "M" &&
    board[x - 2][y + 2] === "A" &&
    board[x - 3][y + 3] === "S"
  );
};

const checkDownLeft = (board: string[][], x: number, y: number) => {
  if (x > board.length - 4 || y < 3) {
    return false;
  }

  return (
    board[x + 1][y - 1] === "M" &&
    board[x + 2][y - 2] === "A" &&
    board[x + 3][y - 3] === "S"
  );
};

const checkDownRight = (board: string[][], x: number, y: number) => {
  if (x > board.length - 4 || y > board[x].length - 4) {
    return false;
  }

  return (
    board[x + 1][y + 1] === "M" &&
    board[x + 2][y + 2] === "A" &&
    board[x + 3][y + 3] === "S"
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const board = getBoard(input);
  let occurences = 0;

  for (let x = 0; x < board.length; x++) {
    // rows
    for (let y = 0; y < board[x].length; y++) {
      // columns
      const cell = board[x][y];

      if (cell === "X") {
        if (checkLeft(board, x, y)) {
          occurences++;
        }

        if (checkRight(board, x, y)) {
          occurences++;
        }

        if (checkUp(board, x, y)) {
          occurences++;
        }

        if (checkDown(board, x, y)) {
          occurences++;
        }

        if (checkUpLeft(board, x, y)) {
          occurences++;
        }

        if (checkUpRight(board, x, y)) {
          occurences++;
        }

        if (checkDownLeft(board, x, y)) {
          occurences++;
        }

        if (checkDownRight(board, x, y)) {
          occurences++;
        }
      }
    }
  }

  return occurences;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const board = getBoard(input);
  let occurences = 0;

  for (let x = 0; x < board.length; x++) {
    // rows
    for (let y = 0; y < board[x].length; y++) {
      // columns
      const cell = board[x][y];

      if (cell === "A") {
        if (
          x > 0 &&
          x < board.length - 1 &&
          y > 0 &&
          y < board[x].length - 1 &&
          ((board[x - 1][y - 1] === "M" && board[x + 1][y + 1] === "S") ||
            (board[x - 1][y - 1] === "S" && board[x + 1][y + 1] === "M")) &&
          ((board[x - 1][y + 1] === "M" && board[x + 1][y - 1] === "S") ||
            (board[x - 1][y + 1] === "S" && board[x + 1][y - 1] === "M"))
        ) {
          occurences++;
        }
      }
    }
  }

  return occurences;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
