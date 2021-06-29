import { sortPaymentsByDate } from './utils';

const payments = [
  {
    id: '1',
    receiveDate: '2020-08-01',
  },
  {
    id: '2',
    receiveDate: '2020-11-01',
  },
  {
    id: '3',
    receiveDate: '2020-10-01',
  },
];
const result = [payments[1], payments[2], payments[0]];

const singleResult = [payments[1]];

describe('sortPaymentsByDate - Метод для сортировки по датам в платежах', () => {
  test('Должен вернуть корректный массив', () => {
    expect(sortPaymentsByDate(payments)).toStrictEqual(result);
    expect(sortPaymentsByDate([])).toStrictEqual([]);
    expect(sortPaymentsByDate(singleResult)).toStrictEqual(singleResult);
  });
});
