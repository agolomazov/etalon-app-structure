import { useCallback } from 'react';

import { useActions } from '@common/hooks';

import { actions } from '../ducks';

import { useDownloadFormIsLoading } from './useDownloadFormIsLoading';

/**
 * @typedef {object} DownloadFormHook
 * @property {boolean} isLoading - Процесс загрузки
 * @property {function} download - Функция, которая запускает процесс скачивания формы
 */
/**
 * Хук для скачивания печатной формы
 *
 * @example
 * const {isLoading, download} = useDownloadForm({
 *   appealType: SITUATION_APPEAL_TYPES.OVERPAYMENT_TRANSFER,
 *   appealId: 1,
 *   formType: SITUATION_FORM_TYPES.OVERPAYMENT_APPEAL_DOCUMENT,
 *   formSelector : selectors.form,
 *   formMapper
 * })
 *
 * @param {object} params - Параметры хука
 * @param {string} params.appealType - Тип обращений, одно из SITUATION_APPEAL_TYPES
 * @param {number|string} params.appealId - Id обращения
 * @param {string} params.formType - Тип формы, одно из SITUATION_FORM_TYPES
 * @param {Function} params.formSelector - Селектор, который возвращает данные по форме
 * @param {Function} params.formMapper - Функция-маппер, преоразует данные по форме в серверный формат
 *
 * @returns {DownloadFormHook} результат
 */
export const useDownloadForm = ({
  appealType,
  appealId,
  formType,
  formSelector,
  formMapper,
}) => {
  const downloadFormFlow = useActions(actions.downloadFormFlow);
  const isLoading = useDownloadFormIsLoading();

  const download = useCallback(() => {
    downloadFormFlow({
      appealType,
      appealId,
      formType,
      formSelector,
      formMapper,
    });
  }, [appealType, appealId, formType, formSelector, formMapper]);

  return { isLoading, download };
};
