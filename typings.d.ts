interface ProblemType {
  _id: string;
  title: string;
  number: number;
  description: string;
  tags: Array<string>;
  company: Array<string>;
  level: string;
  slug: string;
}