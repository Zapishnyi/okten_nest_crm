export const setCookieExpire = (days: number): string => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  return `expires=${date.toUTCString()}`;
};