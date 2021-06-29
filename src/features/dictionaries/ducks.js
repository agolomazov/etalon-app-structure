import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.dictionaries');

const initialState = {};

const dictionariesSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setDictionaries: (_, { payload }) => payload,
    resetDictionaries: () => initialState,
  },
});

export const dictionariesReducer = dictionariesSlice.reducer;

export const actions = {
  ...dictionariesSlice.actions,
};
