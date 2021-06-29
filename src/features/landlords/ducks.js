import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.landlords');

const initialState = [];

const landlordsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setLandlords: (_, { payload }) => payload,
    resetLandlords: () => initialState,
  },
});

export const landlordsReducer = landlordsSlice.reducer;

export const actions = {
  ...landlordsSlice.actions,
};
