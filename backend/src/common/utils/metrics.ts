export const getMetricStatus = (lower: number, higher: number, currentValue: number) => {
  if (currentValue < lower) return 'too low';
  if (currentValue > higher) return 'too high';

  return 'good';
};
