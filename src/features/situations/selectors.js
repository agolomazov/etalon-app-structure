import { getConfig } from '@common/config';

const lifeSituation = (state) =>
  state[getConfig('modules.situations')].lifeSituation;

/**
 * ## [Селектор] Тип жизненной ситуации
 */
const lifeSituationType = (state) => lifeSituation(state).lifeSituationType;

/**
 * ## [Селектор] Id жизненной ситуации
 */
const lifeSituationId = (state) => lifeSituation(state).lifeSituationId;

/**
 * ## [Селектор] Процесс загрузки
 */
const isLoading = (state) => lifeSituation(state).isLoading;

/**
 * ## [Селектор] Процесс скачивания печатной формы
 */
const isDownloadFormLoading = (state) =>
  lifeSituation(state).isDownloadFormLoading;

export const selectors = {
  lifeSituationType,
  lifeSituationId,
  isLoading,
  isDownloadFormLoading,
};
