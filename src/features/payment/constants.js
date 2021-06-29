/**
 * Сообщение для tooltip, если отсутствует период начисления
 */
export const EMPTY_PERIOD_TOOLTIP_TITLE =
  'В начислении не предусмотрено указание периода';

/**
 * Сообщение для tooltip, если отсутствует uin начисления
 */
export const EMPTY_UIN_TOOLTIP_TITLE =
  'Оплата начислений без УИН возможна ' +
  'посредством онлайн оплаты через Личный кабинет, а\xa0также ' +
  'в\xa0отделении банка или по\xa0реквизитам';

/**
 * Способ оплаты
 */
export const PAYMENT_METHOD_TYPES = {
  /** Через Личный кабинет */
  LK: 'LK',
  /** Через ЕПГУ */
  EPGU: 'EPGU',
};

/**
 * Маппинг КБК и Наименования
 */
export const BCC_TITLE_MAP = {
  '16711105021016000120': {
    ordinalNumber: 1,
    title: 'Аренда земли',
    upsTitle: 'Онлайн оплата аренды земли',
  },
  '16711610121010001140': {
    ordinalNumber: 2,
    title: 'Пени за аренду земли',
    upsTitle: 'Онлайн оплата пени за аренду земли',
  },
  '16711105071016000120': {
    ordinalNumber: 3,
    title: 'Аренда имущества',
    upsTitle: 'Онлайн оплата аренды имущества',
  },
  '16711607090019000140': {
    ordinalNumber: 4,
    title: 'Пени за аренду имущества',
    upsTitle: 'Онлайн оплата пени за аренду имущества',
  },
};