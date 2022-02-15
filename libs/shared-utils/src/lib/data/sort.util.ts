export enum SortType {
  Ascend = 'asc',
  Descend = 'desc',
}

function ascendComparator<T>(a: T, b: T, sortField: keyof T): number {
  if (b[sortField] < a[sortField]) {
    return 1;
  } else if (b[sortField] > a[sortField]) {
    return -1;
  } else {
    return 0;
  }
}

function getComparator<T>(
  sortType: SortType,
  sortField: keyof T
): (a: T, b: T) => number {
  return sortType === SortType.Ascend
    ? (a, b) => ascendComparator<T>(a, b, sortField)
    : (a, b) => -ascendComparator<T>(a, b, sortField);
}

export function objectsSortOnKey<T>(
  array: T[],
  sortField: keyof T,
  sortType: SortType = SortType.Ascend
): T[] {
  const comparator: (a: T, b: T) => number = getComparator(sortType, sortField);
  const stabilized = array.map((item: T, index: number) => [item, index] as [T, number]);
  stabilized.sort((a: [T, number], b: [T, number]) => {
    const order: number = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilized.map((item) => item[0]);
}

// Use as objectSortOnKey(items, 'id', SortType.Descend);
