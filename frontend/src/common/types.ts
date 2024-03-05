export type ResultType = {
  status: 'good' | 'too high' | 'too low';
  value: number;
  metric: { name: string };
};
