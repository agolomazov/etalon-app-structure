import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationContractMissed = (state) =>
  state[getConfig('modules.situations')].contractMissed;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = (state) => situationContractMissed(state).appeal;

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appeal,
  isSomethingLoading,
};
