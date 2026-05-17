/**
 * Converte uma string em um valor booleano.
 *
 * @param value - A string a ser convertida.
 * @param fallback - O valor padrão caso a conversão falhe.
 * @returns O valor booleano resultante.
 */
export const parseBoolean = (
  value: string | undefined,
  fallback: boolean,
): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true';
};
