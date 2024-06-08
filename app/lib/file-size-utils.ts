/**
 * Converts a number in bytes into a string representation
 * of its closest byte multiple (B, kB, MB or GB)
 * @param n number of bytes
 * @returns string with number and unit
 */
export function numberToByteMultiple(n: number) {
  const multiples: [string, number][] = [
    ["GB", 1_000_000_000],
    ["MB", 1_000_000],
    ["kB", 1_000],
    ["B", 1],
  ];

  for (const [symbol, value] of multiples) {
    if (n / value > 1) {
      return `${+(n / value).toFixed(2)} ${symbol}`;
    }
  }

  return `${n} B`;
}
