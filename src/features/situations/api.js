import { v4 as uuidv4 } from 'uuid';

import { tenantContractClient } from '@src/request';

/**
 * ## Заглушка, пока не готово api
 *
 * @param {number} delayMs - задержка в мс
 *
 * @returns {object} мок для http запросов по ЖС
 */
const createMockHttpClient = (delayMs) => {
  const delay = (ms = delayMs) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  return {
    async createLifeSituation() {
      await delay();
      return { data: { id: uuidv4() } };
    },
    async createAppeal() {
      await delay();
      return { data: { id: uuidv4() } };
    },
    async deleteAppeal() {
      await delay();
      return { data: {} };
    },
    async saveAppeal() {
      await delay();

      return {
        data: {
          appeals: [
            {
              title: '"Новое обращение"',
            },
          ],
        },
      };
    },

    async deleteAppealFile() {
      await delay();
      return {
        data: {},
      };
    },

    async downloadForm() {
      await delay();
      return {
        data: 'Test form',
      };
    },
  };
};

export const mockRequest = createMockHttpClient(150);

/**
 * Создание жизненной ситуации
 *
 * @example createLifeSituation(SITUATION_TYPES.RECONCILIATION_ACT)
 *
 * @param {string} lifeSituationType - Тип ЖС
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const createLifeSituation = (lifeSituationType) =>
  lifeSituationType
    ? tenantContractClient.post(`life-situation/${lifeSituationType}`, {})
    : mockRequest.createLifeSituation();

/**
 * Создание обращения
 *
 * @example createAppeal(SITUATION_TYPES.RECONCILIATION_ACT, 1, SITUATION_APPEAL_TYPES.SCANNED_ACT)
 *
 * @param {string} lifeSituationType - Тип ЖС
 * @param {number} lifeSituationId - Id ЖС
 * @param {string} appealType - Тип обращения
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const createAppeal = (lifeSituationType, lifeSituationId, appealType) =>
  lifeSituationType && appealType
    ? tenantContractClient.post(
        `life-situation/${lifeSituationType}/${lifeSituationId}/${appealType}`,
        {},
      )
    : mockRequest.createAppeal();

/**
 * Удаление обращения
 *
 * @example deleteAppeal(1,1)
 *
 * @param {number} lifeSituationId - Id жизненной ситуации
 * @param {number} appealId - Id обращения
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const deleteAppeal = (lifeSituationId, appealId) =>
  tenantContractClient.delete(
    `life-situation/${lifeSituationId}/appeal/${appealId}`,
  );

/**
 * Сохранение обращения
 *
 * @example saveAppeal(SITUATION_TYPES.RECONCILIATION_ACT, 1, SITUATION_APPEAL_TYPES.SCANNED_ACT)
 *
 * @param {string} lifeSituationType - Тип ЖС
 * @param {number} lifeSituationId - Id ЖС
 * @param {string} appealType - Тип обращения
 * @param {object} appealData - Объект с полями обращения
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const saveAppeal = (
  lifeSituationType,
  lifeSituationId,
  appealType,
  appealData,
) =>
  lifeSituationType && appealType
    ? tenantContractClient.post(
        // eslint-disable-next-line max-len
        `life-situation/${lifeSituationType}/${lifeSituationId}/${appealType}-collection`,
        appealData,
      )
    : mockRequest.saveAppeal({ appealType });

/**
 * Прикрепить файл к обращению
 *
 * @example attachAppealFile({
 *                             appealId: 1,
 *                             file: 'dGVzdA==',
 *                             fileName: 'Test-file.txt'
 *                           })
 *
 * @param {object} params - Параметры
 * @param {number|string} params.appealId - Id обращения
 * @param {string} params.file - Файл в base64
 * @param {string} params.fileName - Название файла
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const attachAppealFile = ({ appealId, file, fileName } = {}) =>
  tenantContractClient.post(`appeal/${appealId}/file`, {
    file,
    fileName,
  });

/**
 * Удалить документ по обращению
 *
 * @example deleteAppealFile( 1, 1 )
 *
 * @param {number} appealId - Id обращения
 * @param {string|number} fileId - Id файл
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const deleteAppealFile = (appealId, fileId) =>
  tenantContractClient.delete(`appeal/${appealId}/file/${fileId}`, {});

/**
 * Скачать pdf форму
 *
 * @example downloadForm({
 *                             lifeSituationType: SITUATION_TYPES.RECONCILIATION_ACT,
 *                             lifeSituationId: 1,
 *                             appealType : SITUATION_APPEAL_TYPES.SCANNED_ACT,
 *                             appealId: 1,
 *                             file: 'dGVzdA==',
 *                             fileName: 'Test-file.txt'
 *                           })
 *
 * @param {object} params - Параметры
 * @param {string} params.lifeSituationType - Тип ЖС
 * @param {number} params.lifeSituationId - Id ЖС
 * @param {string} params.appealType - Тип обращения
 * @param {number} params.appealId - Id обращения
 * @param {string} params.formType - Тип формы
 * @param {string} params.formData - Объект с полями формы
 *
 * @returns {AxiosPromise<any>} Результат ответа от бекенда
 */
const downloadForm = ({
  lifeSituationType,
  lifeSituationId,
  appealType,
  appealId,
  formType,
  formData,
} = {}) => {
  const formTypePath = formType ? `/${formType}` : '';

  return lifeSituationType && appealType
    ? tenantContractClient.post(
        // eslint-disable-next-line max-len
        `life-situation/${lifeSituationType}/${lifeSituationId}/${appealType}/${appealId}${formTypePath}/form`,
        formData,
        {
          responseType: 'blob',
        },
      )
    : mockRequest.downloadForm();
};

export const api = {
  createLifeSituation,
  createAppeal,
  deleteAppeal,
  saveAppeal,
  attachAppealFile,
  deleteAppealFile,
  downloadForm,
};
