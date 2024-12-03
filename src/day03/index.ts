import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const calculate = (input: string) => {
  // get all numbers from string
  const numbers = input.match(/\d{1,3}/g);
  return numbers?.reduce((acc, num) => acc * parseInt(num), 1) ?? 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // regex pattern to match mul and two numbers with one to three digits
  const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = input.match(mulPattern);

  // sum up all the results of the calculations
  return matches?.reduce((acc, match) => acc + calculate(match), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // regex pattern to match mul and two numbers with one to three digits or do() or don't()
  const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
  const matches = input.match(mulPattern);

  let result = 0;
  let shouldCalculate = true;

  matches?.forEach((match) => {
    if (shouldCalculate && match === "don't()") {
      shouldCalculate = false;
    } else if (!shouldCalculate && match === "do()") {
      shouldCalculate = true;
    } else if (shouldCalculate) {
      result += calculate(match) ?? 0;
    }
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
