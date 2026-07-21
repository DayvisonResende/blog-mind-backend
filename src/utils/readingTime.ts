/** Media de palavras lidas por minuto usada no calculo. */
export const WORDS_PER_MINUTE = 200;

/**
 * Calcula o tempo de leitura estimado (em minutos) de um conteudo,
 * a partir da contagem de palavras (~200 palavras/minuto).
 * Retorna no minimo 1 minuto para qualquer conteudo nao vazio.
 */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}
