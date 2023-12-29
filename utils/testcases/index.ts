import { testCases1 } from "./two-sum";
import { testCases10 } from "./minimize-the-maximum-difference-of-pairs";
import { TestCase } from "../types/testcase";

interface TestCaseMap {
  [key: string]: TestCase;
}

export const testCases: TestCaseMap = {
  "two-sum": testCases1,
  "minimize-the-maximum-difference-of-pairs": testCases10,
};
