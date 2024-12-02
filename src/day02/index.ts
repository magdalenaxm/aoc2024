import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isReportSafe = (report: number[]) => {
  const type = report[0] < report[1] ? "increasing" : "decreasing";

  for (let i = 0; i < report.length; i++) {
    if (
      report[i] === report[i + 1] ||
      Math.abs(report[i] - report[i + 1]) > 3
    ) {
      // no increase or decrease of more than 3
      return false;
    } else if (type === "increasing" && report[i] > report[i + 1]) {
      return false;
    } else if (type === "decreasing" && report[i] < report[i + 1]) {
      return false;
    }
  }

  return true;
};

const part1 = (rawInput: string) => {
  const reports = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  return reports.filter((report) => isReportSafe(report)).length;
};

const part2 = (rawInput: string) => {
  let safeReports = 0;
  const reports = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  const unsafeReports = reports.filter((report) => !isReportSafe(report));

  safeReports = reports.length - unsafeReports.length;

  unsafeReports.forEach((report) => {
    for (let i = 0; i < report.length; i++) {
      const reportCopy = [...report];
      reportCopy.splice(i, 1);
      if (isReportSafe(reportCopy)) {
        safeReports++;
        break;
      }
    }
  });

  return safeReports;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
