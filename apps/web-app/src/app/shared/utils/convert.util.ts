export function toBoolean(input: string | number | undefined) {
  return input === 'true' || input === 1 || input === '1';
}

/**
 * Returns a given floating point number rounded to 2 decimal places.
 */
export function toRoundedDecimal(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Returns a given value to a formatted percentage.
 */
export function toPercentageAmount(value: number): string {
  const rounded: number = toRoundedDecimal(value * 100);
  return `${rounded}%`;
}
