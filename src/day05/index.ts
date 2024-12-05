import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getUpdates = (
  updates: number[][],
  rules: { first: number; second: number }[],
): { correctUpdates: number[][]; incorrectUpdates: number[][] } => {
  const correctUpdates: number[][] = [];
  const incorrectUpdates: number[][] = [];

  updates.forEach((update) => {
    const result = update.every((page, index) => {
      const matchingRules = rules.filter(
        (r) =>
          (r.first === page && update.includes(r.second)) ||
          (r.second === page && update.includes(r.first)),
      );

      if (index === 0) {
        return matchingRules.every((rule) => rule.first === page);
      } else if (index === update.length - 1) {
        return matchingRules.every((rule) => rule.second === page);
      }

      return matchingRules.every((rule) => {
        const otherPage = rule.first === page ? rule.second : rule.first;
        const otherIndex = update.indexOf(otherPage);
        return (
          otherIndex !== -1 &&
          (rule.first === page ? index < otherIndex : index > otherIndex)
        );
      });
    });

    if (result) {
      correctUpdates.push(update);
    } else {
      incorrectUpdates.push(update);
    }
  });

  return { correctUpdates, incorrectUpdates };
};

const getData = (input: string) => {
  const [rulesInput, updatesInput] = input.split("\n\n");

  const rules = rulesInput.split("\n").map((rule) => {
    const [first, second] = rule.split("|").map(Number);
    return { first, second };
  });

  const updates = updatesInput
    .split("\n")
    .map((update) => update.split(",").map(Number));

  return { rules, updates };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { updates, rules } = getData(input);

  const { correctUpdates } = getUpdates(updates, rules);

  return correctUpdates.reduce(
    (sum, update) => sum + update[Math.floor(update.length / 2)],
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { updates, rules } = getData(input);
  const sortedUpdates: number[][] = [];

  const { incorrectUpdates } = getUpdates(updates, rules);

  incorrectUpdates.forEach((update) => {
    const sortedUpdate = update.sort((a: number, b: number) => {
      const rule = rules.find((r) => r.first === a && r.second === b);
      if (rule) {
        if (update.indexOf(rule.first) < update.indexOf(rule.second)) {
          return 1;
        } else {
          return -1;
        }
      }
      return 1;
    });
    sortedUpdates.push(sortedUpdate);
  });

  return incorrectUpdates.reduce(
    (sum, update) => sum + update[Math.floor(update.length / 2)],
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
