interface ProblemType {
  _id: string;
  title: string;
  description: string;
  number: number;
  tags: Array<string>;
  comapany: Array<string>;
  level: string;
  slug: string;
  likes: number;
  dislikes: number;
}