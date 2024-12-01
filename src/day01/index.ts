import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const getListsFromInput = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n").map(line => (line.match(/\d+/g) as string[]))
  const list1 = input.map(line => parseInt(line[0]));
  const list2 = input.map(line =>  parseInt(line[1]))
 return {list1, list2};
}

const part1 = (rawInput: string) => {
  const {list1, list2} = getListsFromInput(rawInput);

  const sortedList1 = list1.sort((a, b) => a - b);
  const sortedList2 = list2.sort((a, b) => a - b);

  let total = 0;

  for (let i = 0; i < sortedList1.length; i++){
    total += Math.abs(sortedList1[i] - sortedList2[i]);
  }

  return total;
};

const occurences = (list: number[], searchValue: number) =>  list.filter(x => x == searchValue).length;

const part2 = (rawInput: string) => {
 const {list1, list2} = getListsFromInput(rawInput);

 let similiarity = 0;

 list1.forEach((value) => {
  similiarity += value * occurences(list2, value);
 })

  return similiarity;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
