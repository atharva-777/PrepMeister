import { TestCase } from "../types/testcase";

const testCases10: TestCase = {
  cases: [
    {
      input: `6
            10 1 2 7 1 3 
            2`,
      expected: `1`,
    },
    {
      input: `4
            4 2 1 2
            1`,
      expected: `0`,
    },
  ],
};

export {testCases10};