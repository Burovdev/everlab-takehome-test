export const getApiUrl = (path: string) => {
  return import.meta.env.VITE_API_URL + path;
};
