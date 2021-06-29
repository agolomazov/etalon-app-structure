import { testSaga } from 'redux-saga-test-plan';
import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';

describe('loadContractsSaga - сага загружает справочники', () => {
  test('Сага отрабатывает запрос к API и кладет данные в стор', () => {
    const dictionaries = {
      dictionary: [
        { name: 'DICTIONARY_ONE', text: 'DICTIONARY_ONE_TEXT' },
        { name: 'DICTIONARY_TWO', text: 'DICTIONARY_TWO_TEXT' },
      ],
    };

    testSaga(sagas.loadDictionariesSaga)
      .next()
      .call(callApi, api.getDictionaries)
      .next(dictionaries)
      .put(actions.setDictionaries(dictionaries))
      .next()
      .isDone();
  });
});
