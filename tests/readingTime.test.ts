import { describe, it, expect } from 'vitest';
import { calculateReadingTime, WORDS_PER_MINUTE } from '../src/utils/readingTime';

describe('calculateReadingTime', () => {
  it('retorna 0 para conteudo vazio', () => {
    expect(calculateReadingTime('')).toBe(0);
    expect(calculateReadingTime('   ')).toBe(0);
  });

  it('retorna no minimo 1 minuto para conteudo curto', () => {
    expect(calculateReadingTime('apenas algumas palavras aqui')).toBe(1);
  });

  it('arredonda para cima com base em ~200 palavras/minuto', () => {
    const texto250 = Array(250).fill('palavra').join(' ');
    // 250 / 200 = 1.25 -> ceil -> 2
    expect(calculateReadingTime(texto250)).toBe(2);
  });

  it('calcula corretamente multiplos minutos', () => {
    const texto = Array(WORDS_PER_MINUTE * 3).fill('palavra').join(' ');
    expect(calculateReadingTime(texto)).toBe(3);
  });

  it('ignora espacos multiplos e quebras de linha na contagem', () => {
    expect(calculateReadingTime('uma   duas\n\ntres')).toBe(1);
  });
});
