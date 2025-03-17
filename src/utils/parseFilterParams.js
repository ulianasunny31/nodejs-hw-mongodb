function parseType(type) {
  if (type === undefined) return;

  const isType = ['personal', 'work', 'home'].includes(type);

  if (isType) return type;

  return 'personal';
}

function parseIsFav(isFav) {
  if (isFav === undefined) return;
  return isFav;
}

export function parseFilterParams({ type, isFavourite }) {
  const parsedType = parseType(type);
  const parsedIsFav = parseIsFav(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFav,
  };
}
