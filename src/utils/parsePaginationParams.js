function parseNumber(value, defaultVal) {
  if (typeof value === 'undefined') {
    return defaultVal;
  }

  const parsedNum = parseInt(value);

  if (Number.isNaN(parsedNum)) {
    return defaultVal;
  }

  return parsedNum;
}

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNumber(page, 10);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
