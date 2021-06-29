import { getConfig } from '@common/config';

const signatureSelector = (state) => state[getConfig('modules.signature')];

/**
 * [Селектор] текущий статус
 */
const status = (state) => signatureSelector(state).status;

/**
 * [Селектор] список сертификатов
 */
const certificates = (state) => signatureSelector(state).certificates;

/**
 * [Селектор] выбранный сертификат
 */
const selectedCertificate = (state) =>
  signatureSelector(state).selectedCertificate;

/**
 * [Селектор] список ошибок
 */
const errors = (state) => signatureSelector(state).errors;

/**
 * [Селектор] состояние загрузки
 */
const isLoading = (state) => signatureSelector(state).isLoading;

export const selectors = {
  status,
  certificates,
  selectedCertificate,
  errors,
  isLoading,
};
