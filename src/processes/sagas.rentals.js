import { call, select, all, takeEvery } from 'redux-saga/effects';

import { selectors as appSettingsSelectors } from '@features/app-settings';
import {
  actions as rentalsActions,
  sagas as rentalsSagas,
} from '@features/rental-objects';

import { exceptionHandlerSaga } from './sagas.errors';

/**
 * Загрузка списка объектов аренды
 *
 * @param {object} action - экшн
 * @param {object} action.payload - пайлоад
 * @param {object} action.payload.filters - фильтры
 * @param {string} action.payload.filters.contractId - Id договора
 * @param {string} action.payload.filters.contractNumber - Номер договора
 * @param {string} action.payload.filters.contractDateFrom - Дата договора с
 * @param {string} action.payload.filters.contractDateTo - Дата договора по
 * @param {string} action.payload.filters.address - Адрес
 * @param {string} action.payload.filters.typeId - Идентификатор типа
 * @param {string} action.payload.filters.cadastralNumber - Кадастровый номер
 * @param {object} action.payload.sort - сортировка
 * @param {string} action.payload.sort.field - Поле, по которому проводится сортировка
 * @param {string} action.payload.sort.direction - Направление, по которому проводится сортировка
 * @param {object} action.payload.page - пагинация
 * @param {number} action.payload.page.number - Номер страницы
 * @param {number} action.payload.page.size - Размер страницы
 *
 * @returns {void}
 */
export function* loadRentalsFlow({ payload: queryParams }) {
  try {
    // получаем параметры приложения
    const isRentalsBeFiltrationEnabled = yield select(
      appSettingsSelectors.isRentalsBeFiltrationEnabled,
    );

    // загружаем объекты аренды
    yield call(rentalsSagas.loadRentalsSaga, {
      queryParams,
      isClientSideFilteringEnable: !isRentalsBeFiltrationEnabled,
    });
  } catch (error) {
    // Запускаем обработчик ошибки
    yield call(exceptionHandlerSaga, error);
  }
}

/**
 * Вотчер объектов
 *
 * @returns {void}
 */
export function* rentalsWatcher() {
  yield all([takeEvery(rentalsActions.loadRentalsFlow, loadRentalsFlow)]);
}
