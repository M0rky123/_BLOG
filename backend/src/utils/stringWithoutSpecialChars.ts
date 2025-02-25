export const stringWithoutSpecialChars = (username: string): string => {
  return username
    .normalize("NFD")
    .trim()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9!._-]/g, "");
};
