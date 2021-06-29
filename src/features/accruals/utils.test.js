import { sortAccrualsByDate } from './utils';

const accruals = [
  {
    id: '1',
    date: '2020-08-01',
    type: 'RENTAL',
  },
  {
    id: '2',
    date: '2020-11-01',
    type: 'RENTAL_PENALTY',
  },
  {
    id: '3',
    date: '2020-10-01',
    type: 'RENTAL',
  },
];
const result = [accruals[1], accruals[2], accruals[0]];

const singleResult = [accruals[1]];

describe('sortAccrualsByDate - Метод для сортировки по датам в начислениях', () => {
  test('Должен вернуть корректный массив', () => {
    expect(sortAccrualsByDate(accruals)).toStrictEqual(result);
    expect(sortAccrualsByDate([])).toStrictEqual([]);
    expect(sortAccrualsByDate(singleResult)).toStrictEqual(singleResult);
  });
});
