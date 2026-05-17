/**
 * Converte uma string em um valor numérico.
 *
 * @param value - A string a ser convertida.
 * @param fallback - O valor padrão caso a conversão falhe.
 * @returns O valor numérico resultante.
 */
export const parseNumber = (
  value: string | undefined,
  fallback: number,
): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
