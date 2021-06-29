import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationPaymentMissed = (state) =>
  state[getConfig('modules.situations')].paymentMissed;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = (state) => situationPaymentMissed(state).appeal;

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appeal,
  isSomethingLoading,
};
