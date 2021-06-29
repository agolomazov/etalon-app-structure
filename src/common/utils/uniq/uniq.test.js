import { createNumericGenerator } from './index';

describe('createNumericGenerator - метод создает генератор целых чисел', () => {
  test('Должен возвращать функцию', () => {
    expect(typeof createNumericGenerator()).toBe('function');
  });

  test('Должен устанавливать начальное значение равное единице по умолчанию', () => {
    const genId = createNumericGenerator();
    expect(genId()).toBe(1);
  });

  test('Должен увеличивать начальное значение на единицу', () => {
    const genId = createNumericGenerator(2);
    expect(genId()).toBe(2);
    expect(genId()).toBe(3);
  });
});
