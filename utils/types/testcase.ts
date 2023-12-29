export interface TestCase {
  cases: Case[];
}

export interface Case {
  input: string;
  expected: string;
}
