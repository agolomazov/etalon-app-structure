import { testSaga } from 'redux-saga-test-plan';
import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import { sagas } from './sagas';

describe('loadLandlordsSaga - сага загружает список арендодателей', () => {
  test('Сага отрабатывает запрос к API и кладет данные в стор', () => {
    const landlordsResponse = {
      landlords: [
        {
          id: '1',
          name: 'МТУ в Архангельской области и Ненецком автономном округе',
        },
        {
          id: '2',
          name: 'ТУ Росимущества в Оренбургской области',
        },
      ],
    };

    testSaga(sagas.loadLandlordsSaga)
      .next()
      .call(callApi, api.getLandlords)
      .next(landlordsResponse)
      .put(actions.setLandlords(landlordsResponse.landlords))
      .next()
      .isDone();
  });
});
