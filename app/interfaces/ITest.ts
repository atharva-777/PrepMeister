export interface ITest {
  message: string;
  success: boolean;
  data: Daum[];
}

export interface Daum {
  _id: string;
  title: string;
  number: number;
  description: string;
  tags: string[];
  company: string[];
  __v: number;
  slug: string;
  examples: Example[];
  level?: string;
}

export interface Example {
  input: string;
  output: string;
  explaination: string;
  _id: string;
}
