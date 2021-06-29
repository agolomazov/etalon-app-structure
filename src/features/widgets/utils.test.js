import { plurolizeContracts } from './utils';

describe('plurolizeContracts - метод формирования окончания в дательном у слова "договор"', () => {
  test('Должен вернуть пустую строку, при отсутствии входного параметра ', () => {
    expect(plurolizeContracts()).toBe('');
  });

  test('Должен сформировать окончание в дательном падеже', () => {
    expect(plurolizeContracts(1)).toBe('1 договору');
    expect(plurolizeContracts(101)).toBe('101 договору');
    expect(plurolizeContracts(2)).toBe('2 договорам');
    expect(plurolizeContracts(10)).toBe('10 договорам');
  });
});
