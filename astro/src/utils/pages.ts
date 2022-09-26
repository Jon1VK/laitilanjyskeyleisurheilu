export const getPageNumbers = (pageCount: number, currentPage: number) => {
  if (pageCount < 10) {
    return Array(pageCount)
      .fill(undefined)
      .map((_, i) => i + 1);
  }
  const pageSet = new Set([
    1,
    2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    pageCount - 1,
    pageCount,
  ]);
  return [...pageSet.values()]
    .filter((page) => 0 < page && page <= pageCount)
    .sort((a, b) => a - b);
};
