export const calculateYearsDiff = (date: Date | string) => {
  const time = new Date(date).getTime();

  const age = (Date.now() - time) / (365 * 24 * 60 * 60 * 1000);

  return Math.floor(age);
};

export const convertHl7DateStringToDate = (dateString: string) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return new Date(year + '-' + month + '-' + day);
};
