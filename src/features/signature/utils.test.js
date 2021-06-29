import { extractCryptoProErrorCode } from './utils';

describe('extractCryptoProErrorCode - метод извлекает код ошибки КриптоПро из сообщения об ошибки', () => {
  test('Должен вернуть пустую строку, если не передан входной параметр', () => {
    expect(extractCryptoProErrorCode()).toBe('');
  });

  test('Должен вернуть пустую строку, если отсутствует код ошибки', () => {
    expect(
      extractCryptoProErrorCode(
        'Какое-то более-менее подробное сообщение об ошибке',
      ),
    ).toBe('');
  });

  test('Должен вернуть код ошибки, если он присутствует в сообщении об ошибки', () => {
    expect(
      extractCryptoProErrorCode(
        'Какое-то более-менее подробное сообщение об ошибке. (0x8010006E)',
      ),
    ).toBe('0x8010006E');
  });
});
