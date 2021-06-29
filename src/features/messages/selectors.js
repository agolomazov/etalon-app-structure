import { getConfig } from '@common/config';

const messagesSelector = (state) => state[getConfig('modules.appeals')];

/**
 * Селектор списка обращений
 */
const appealsList = (state) => messagesSelector(state).appealsList;

/**
 * Селектор информации по обращению
 */
const currentAppeal = (state) => messagesSelector(state).currentAppeal;

/**
 * Селектор ID текущего обращения
 */
const currentAppealId = (state) => currentAppeal(state)?.commonData?.id;

/**
 * Селектор типа текущего обращения
 */
const currentAppealType = (state) => currentAppeal(state)?.commonData?.type;

/**
 * Селектор статуса текущего обращения
 */
const currentAppealStatus = (state) =>
  currentAppeal(state)?.commonData?.state.name;

/**
 * Селектор href текущего обращения
 */
const currentAppealHref = (state) => currentAppeal(state)?.commonData?.href;

/**
 * Селектор признака прочтения сообщения
 */
const isCurrentAppealRead = (state) => currentAppeal(state)?.commonData?.read;

/**
 * Селектор комментариев к обращению
 */
const currentAppealComments = (state) => messagesSelector(state).comments;

/**
 * Селектор состояния кнопки "отправить"
 */
const isButtonActive = (state) => {
  const { feedback, comment } = messagesSelector(state);
  return !!(comment?.body || feedback?.rate);
};

/**
 * Селектор состояния загрузки обращения
 */
const isAppealLoading = (state) => messagesSelector(state).isAppealLoading;

/**
 * Селектор состояния загрузки обращения
 */
const isAppealsListLoading = (state) =>
  messagesSelector(state).isAppealsListLoading;

/**
 * Селектор отзыва
 */
const feedback = (state) => messagesSelector(state).feedback;

/**
 * Селектор нового комментария
 */
const comment = (state) => messagesSelector(state).comment;

/**
 * Селектор связанных документов
 */
const contractAppeals = (state) => messagesSelector(state).contractAppeals;

export const selectors = {
  appealsList,
  currentAppeal,
  currentAppealComments,
  isButtonActive,
  isAppealLoading,
  isAppealsListLoading,
  feedback,
  comment,
  currentAppealId,
  currentAppealType,
  contractAppeals,
  currentAppealStatus,
  currentAppealHref,
  isCurrentAppealRead,
};
