import { getConfig } from '@common/config';

const incomingDocumentsSelector = (state) =>
  state[getConfig('modules.incomingDocuments')];

/**
 * Селектор состояния модального окна отклонения документа
 */
const isRejectModalOpen = (state) =>
  incomingDocumentsSelector(state).isRejectModalOpen;

/**
 * [Селектор] список входящих документов требующих подтверждение
 */
const incomingDocumentsRequiredConfirmation = (state) =>
  incomingDocumentsSelector(state).incomingDocumentsRequiredConfirmation;

/**
 * [Селектор] состояние загрузки
 */
const isLoading = (state) => incomingDocumentsSelector(state).isLoading;

export const selectors = {
  isRejectModalOpen,
  incomingDocumentsRequiredConfirmation,
  isLoading,
};
