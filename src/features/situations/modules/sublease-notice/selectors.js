import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

const situationSubleaseNotice = (state) =>
  state[getConfig('modules.situations')].sublease;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = (state) => situationSubleaseNotice(state).appeal;

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appeal,
  isSomethingLoading,
};
