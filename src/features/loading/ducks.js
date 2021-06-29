import { createSlice } from '@reduxjs/toolkit';

// Получаем глобальные настройки приложения
import { getConfig } from '@common/config';

const initialState = {
  isLoading: false,
  isGlobal: false,
};

const loadingSlice = createSlice({
  name: getConfig('modules.loading'),
  initialState,
  reducers: {
    startLoading: (_, { payload: { isGlobal = false } = {} }) => ({
      isLoading: true,
      isGlobal,
    }),
    stopLoading: () => initialState,
  },
});

export const loadingReducer = loadingSlice.reducer;

export const actions = {
  ...loadingSlice.actions,
};
