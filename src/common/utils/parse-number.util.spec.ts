import { parseNumber } from 'src/common/utils/parse-number.util';

describe('parseNumber', () => {
  it('returns parsed number when value is numeric', () => {
    expect(parseNumber('5432', 1234)).toBe(5432);
  });

  it('returns fallback when value is undefined', () => {
    expect(parseNumber(undefined, 1234)).toBe(1234);
  });

  it('returns fallback when value is not numeric', () => {
    expect(parseNumber('abc', 1234)).toBe(1234);
  });
});
