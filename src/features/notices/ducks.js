import { createSlice } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';
import { createNumericGenerator } from '@common/utils';

const initialState = [];

const genId = createNumericGenerator();

/* eslint-disable no-param-reassign */
const noticeSlice = createSlice({
  name: getConfig('modules.notices'),
  initialState,
  reducers: {
    showNotice: {
      reducer(state, { payload: { text, delay } }) {
        state.push({ id: genId(), text, delay });
      },
      prepare({ text, delay = 3000 }) {
        return { payload: { text, delay } };
      },
    },
    changeNotices: (_, { payload: notices }) => notices,
    clearNotices: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const noticeReducer = noticeSlice.reducer;

export const actions = {
  ...noticeSlice.actions,
};
