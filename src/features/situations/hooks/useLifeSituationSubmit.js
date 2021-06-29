import { useActions } from '@common/hooks';

import { actions } from '../ducks';

/**
 * Хук создает функцию, которая отправляет обращения на BE
 *
 * @example
 * const submit = useLifeSituationSubmit({
 *   appealIds: ['c198de78-316c-11eb-adc1-0242ac120002'],
 *   appealType: SITUATION_APPEAL_TYPES.SCANNED_ACT,
 *   appealSelector : selectors.appeal,
 *   appealMapper
 * })
 *
 * @param {object} params - Параметры хука
 * @param {Array<string>} params.appealIds - Список идентификаторов обращений, которые будут отправляться на сервер
 * @param {string} params.appealType - Тип обращений, одно из SITUATION_APPEAL_TYPES
 * @param {Function} params.appealSelector - Селектор, который возвращает данные по обращениям
 * @param {Function} params.appealMapper - Функция-маппер, преоразует данные по обращению в серверный формат
 *
 * @returns {Function} Функция, которая запускает процесс отправки обращений на сервер
 */
export const useLifeSituationSubmit = ({
  appealIds = [],
  appealType,
  appealSelector,
  appealMapper,
} = {}) => {
  const submitLifeSituationFlow = useActions(actions.submitLifeSituationFlow);

  const submit = () => {
    submitLifeSituationFlow({
      appealIds,
      appealType,
      appealSelector,
      appealMapper,
    });
  };

  return submit;
};
