import { getCardColor } from './index';

describe('getCardColor - Метод для получения класса подсветки элемента списка договоров', () => {
  test('Должен вернуть корректное название класса', () => {
    expect(getCardColor(50, 200, 400)).toBe('card-danger');
    expect(getCardColor(400000, '22200', 4100)).toBe('card-danger');
    expect(getCardColor('30000', '22200', '410012')).toBe('card-danger');
    expect(getCardColor(-500, -3000, 100)).toBe('card-danger');
    expect(getCardColor(null, null, null)).toBe('card-default');
    expect(getCardColor(0, 0, 0)).toBe('card-default');
    expect(getCardColor('', '', '')).toBe('card-default');
    expect(getCardColor('', '', 1000)).toBe('card-warning');
    expect(getCardColor(null, null, '1000')).toBe('card-warning');
    expect(getCardColor(1000, null, '1000')).not.toBe('card-default');
    expect(getCardColor('500', null, 16000)).not.toBe('card-warning');
  });
});
