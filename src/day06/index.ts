import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const printBoard = (board: string[][]) => {
  console.log("\n\n********** New Board ***********\n\n");
  console.log(board.map((row) => row.join("")).join("\n"));
};

const findStart = (board: string[][]): { column: number; row: number } => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (
        board[y][x] === "^" ||
        board[y][x] === "v" ||
        board[y][x] === "<" ||
        board[y][x] === ">"
      ) {
        return { column: x, row: y };
      }
    }
  }

  return { column: -1, row: -1 };
};

const moveGuard = (
  board: string[][],
  current: { column: number; row: number },
): {
  newBoard: string[][];
  newPosition: { column: number; row: number };
} => {
  const acutalDirection = board[current.row][current.column];
  let newDirection = acutalDirection;
  let newPosition = current;

  const newBoard = board;
  newBoard[current.row][current.column] = "X";

  // up
  if (acutalDirection === "^") {
    if (board[current.row - 1][current.column] === "#") {
      // rotate right
      newDirection = ">";
      newPosition = { column: current.column + 1, row: current.row };
    } else {
      // continue up
      newPosition = { column: current.column, row: current.row - 1 };
    }
  }
  // right
  else if (acutalDirection === ">") {
    if (board[current.row][current.column + 1] === "#") {
      // rotate right
      newDirection = "v";
      newPosition = { column: current.column, row: current.row + 1 };
    } else {
      // rotate right
      newPosition = { column: current.column + 1, row: current.row };
    }
  }
  // down
  else if (acutalDirection === "v") {
    if (board[current.row + 1][current.column] === "#") {
      // rotate right
      newDirection = "<";
      newPosition = { column: current.column - 1, row: current.row };
    } else {
      newPosition = { column: current.column, row: current.row + 1 };
    }
  }
  // left
  else if (acutalDirection === "<") {
    if (board[current.row][current.column - 1] === "#") {
      // rotate right
      newDirection = "^";
      newPosition = { column: current.column, row: current.row - 1 };
    } else {
      newPosition = { column: current.column - 1, row: current.row };
    }
  }

  newBoard[newPosition.row][newPosition.column] = newDirection;

  return { newBoard, newPosition };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let board = input.split("\n").map((row) => row.split(""));

  const start = findStart(board);

  if (start.column === -1 || start.row === -1) console.log("No start found");

  let currentPosition = start;
  let endReached = false;
  let visited = new Set<string>();

  // printBoard(board);

  while (endReached === false) {
    // check if guard leaves the map
    const acutalDirection = board[currentPosition.row][currentPosition.column];

    if (
      (acutalDirection === "^" && currentPosition.row === 0) || // upper bound
      (acutalDirection === ">" &&
        currentPosition.column === board[currentPosition.row].length - 1) || // right bound
      (acutalDirection === "v" && currentPosition.row === board.length - 1) || // lower bound
      (acutalDirection === "<" && currentPosition.column === 0) // left bound
    ) {
      endReached = true;
      visited.add(`${currentPosition.column},${currentPosition.row}`);
      break;
    }

    visited.add(`${currentPosition.column},${currentPosition.row}`);
    const { newBoard, newPosition } = moveGuard(board, currentPosition);

    currentPosition = newPosition;
    board = newBoard;
  }

  // printBoard(board);

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
