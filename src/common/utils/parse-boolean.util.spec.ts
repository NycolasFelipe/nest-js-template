import { parseBoolean } from 'src/common/utils/parse-boolean.util';

describe('parseBoolean', () => {
  it('returns true only when value is "true"', () => {
    expect(parseBoolean('true', false)).toBe(true);
    expect(parseBoolean('false', true)).toBe(false);
  });

  it('returns fallback when value is undefined', () => {
    expect(parseBoolean(undefined, true)).toBe(true);
    expect(parseBoolean(undefined, false)).toBe(false);
  });
});
