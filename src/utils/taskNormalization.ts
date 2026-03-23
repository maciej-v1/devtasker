export const normalizeTitle = (rawTitle: string): string => {
  return rawTitle.trim();
};

export const isEmptyTitle = (title: string): boolean => {
  return title.length === 0;
};

export const normalizeForComparison = (title: string): string => {
  return title.toLowerCase();
};
