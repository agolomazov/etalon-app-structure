import { createSlice } from '@reduxjs/toolkit';

// Получаем глобальные настройки приложения
import { getConfig } from '@common/config';

const initialState = null;

/**
 * Обработчик установки ошибки
 *
 * @param {null|object} state - Текущее состояние глобальных ошибок
 * @param {object} payload - Объект описывающий ошибку
 *
 * @returns {object} Новое значение состояния
 */
const toSetError = (
  state,
  { payload: { title, message, isFatal = false, code = '' } },
) => ({
  isFatal,
  title,
  message,
  code,
});

/**
 * Сброс состояния до начального
 *
 * @returns {object} Новое значение состояния
 */
const toClearError = () => initialState;

const errorsSlice = createSlice({
  name: getConfig('modules.errors'),
  initialState,
  reducers: {
    setError: toSetError,
    clearError: toClearError,
  },
});

export const errorsReducer = errorsSlice.reducer;

export const actions = {
  ...errorsSlice.actions,
};
