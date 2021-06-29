import { APP_ROUTES } from '@src/constants';

import { situationsListFilter, getSituationsList } from './utils';
import { SITUATIONS_GRID_ITEMS } from './constants';

export const SITUATIONS_GRID_ITEMS_NO_HIDEN = [
  {
    title: 'Получить акт сверки взаимных расчетов',
    to: APP_ROUTES.SITUATION_ACT,
    tags:
      'расчеты состояние расчетов детализация сверка взаиморасчеты направить',
  },
  {
    title: 'Отсутствует платеж по договору аренды',
    to: APP_ROUTES.SITUATION_PAYMENT_MISSED,
    tags:
      // eslint-disable-next-line max-len
      'нет платежа платежное поручение квитанция платежка платёжка не зачислили незачисленный платеж платёж',
  },
  {
    title: 'В Личном кабинете отсутствует информация о моем договоре аренды',
    to: APP_ROUTES.SITUATION_CONTRACT_MISSED,
    tags: 'нет договора поиск договора добавить',
  },
  {
    title: 'Изменить реквизиты Арендатора',
    to: APP_ROUTES.SITUATION_CHANGE_DETAILS,
    tags:
      // eslint-disable-next-line max-len
      'юридический адрес смена директора гендиректора руководителя кпп инн организационно правовая форма название компании организации телефон контактный email для связи электронной почты профиль',
  },
  {
    title: 'Распорядиться переплатой',
    to: APP_ROUTES.SITUATION_OVERPAYMENT,
    tags:
      // eslint-disable-next-line max-len
      'вернуть переплату возврат переплаты что делать с переплатой зачесть зачет зачёт вернуть деньги перевести перенести',
  },
  {
    title: 'Уведомление о субаренде',
    to: APP_ROUTES.SITUATION_SUBLEASE_NOTICE,
    tags: 'субаренда уведомить передача в субаренду аренду',
  },
  {
    title:
      // eslint-disable-next-line max-len
      'Заявление на получение / на отказ от получения документов на бумажном носителе',
    to: APP_ROUTES.SITUATION_PAPER_CARRIER,
    tags:
      // eslint-disable-next-line max-len
      'отказаться от получения только по почте почта получать бумаге через лк лка получать электронный вариант без бумаги',
  },
  {
    title: 'Жалобы на акты, действия / бездействия должностных лиц',
    to: APP_ROUTES.SITUATION_COMPLAINT,
    tags:
      // eslint-disable-next-line max-len
      'подать оставить жалобу пожаловаться нет ответа не отвечают нарушение нарушено',
  },
  {
    title: 'Нет подходящей жизненной ситуации',
    to: APP_ROUTES.SITUATION_NO_SUITABLE,
    tags:
      // eslint-disable-next-line max-len
      'нетипизированный запрос не найден найдена необходимая нет нужной требуемой',
  },
  {
    title: 'Внести изменения в характеристики арендованных объектов',
    to: APP_ROUTES.SITUATION_CHANGE_OBJECT_INFO,
    tags:
      // eslint-disable-next-line max-len
      'площадь адрес назначение объекта кадастровый номер вид разрешенного использования тип нет информации отсутствует информация дополнить уточнить изменить данные',
  },
];

const testCaseOne = [
  {
    title: 'Получить акт сверки взаимных расчетов',
    to: APP_ROUTES.SITUATION_ACT,
    tags:
      'расчеты состояние расчетов детализация сверка взаиморасчеты направить',
  },
  {
    title: 'Изменить реквизиты Арендатора',
    to: APP_ROUTES.SITUATION_CHANGE_DETAILS,
    tags:
      // eslint-disable-next-line max-len
      'юридический адрес смена директора гендиректора руководителя кпп инн организационно правовая форма название компании организации телефон контактный email для связи электронной почты профиль',
  },
];

const testCaseOne_filtered = [
  {
    title: 'Получить акт сверки взаимных расчетов',
    to: APP_ROUTES.SITUATION_ACT,
    tags:
      'расчеты состояние расчетов детализация сверка взаиморасчеты направить',
  },
];

const testCaseTwo = [
  {
    title: 'Уведомление о субаренде',
    to: APP_ROUTES.SITUATION_SUBLEASE_NOTICE,
    tags: 'субаренда уведомить передача в субаренду аренду',
  },
];

describe('situationsListFilter - осуществляет поиск по списоку ЖС по названию и ключевым словам', () => {
  test('Должен вернуть корректное значение', () => {
    expect(situationsListFilter(SITUATIONS_GRID_ITEMS, '')).toStrictEqual(
      SITUATIONS_GRID_ITEMS,
    );
    expect(
      situationsListFilter(SITUATIONS_GRID_ITEMS, 'no chanse'),
    ).toStrictEqual([]);
    expect(situationsListFilter(SITUATIONS_GRID_ITEMS, 'акт св')).toStrictEqual(
      testCaseOne,
    );
    expect(
      situationsListFilter(SITUATIONS_GRID_ITEMS, 'аренда увед'),
    ).toStrictEqual(testCaseTwo);
  });
});

describe('getSituationsList - фильтрует список ЖС в зависимости от типа организации пользователя', () => {
  test('Должен вернуть корректное значение', () => {
    expect(
      getSituationsList(SITUATIONS_GRID_ITEMS, 'JURIDICAL_PERSON'),
    ).toStrictEqual(SITUATIONS_GRID_ITEMS_NO_HIDEN);
    expect(getSituationsList(testCaseOne, 'NATURAL_PERSON')).toStrictEqual(
      testCaseOne_filtered,
    );
    expect(getSituationsList(testCaseOne, null)).toStrictEqual(
      testCaseOne_filtered,
    );
    expect(
      getSituationsList(SITUATIONS_GRID_ITEMS, 'any type'),
    ).not.toStrictEqual(SITUATIONS_GRID_ITEMS_NO_HIDEN);
  });
});
