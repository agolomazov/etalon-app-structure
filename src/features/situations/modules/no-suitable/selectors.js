import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationNoSuitable = (state) =>
  state[getConfig('modules.situations')].noSuitable;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = (state) => situationNoSuitable(state).appeal;

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appeal,
  isSomethingLoading,
};
