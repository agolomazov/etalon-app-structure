import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from '@common/config';

const actionPrefix = getConfig('modules.appSettings');

const initialState = {
  isRentalsBeFiltrationEnabled: false,
  isContractsBeFiltrationEnabled: false,
  isAccrualsBeFiltrationEnabled: false,
  isPaymentHistoryBeFiltrationEnabled: false,
  isAppSettingsLoaded: false,
};

/* eslint-disable no-param-reassign */
const appSettingsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setSettings: (
      _,
      {
        payload: {
          isRentalsBeFiltrationEnabled,
          isContractsBeFiltrationEnabled,
          isAccrualsBeFiltrationEnabled,
          isPaymentHistoryBeFiltrationEnabled,
        },
      },
    ) => ({
      isRentalsBeFiltrationEnabled,
      isContractsBeFiltrationEnabled,
      isAccrualsBeFiltrationEnabled,
      isPaymentHistoryBeFiltrationEnabled,
      isAppSettingsLoaded: true,
    }),
    reset: () => initialState,
  },
});
/* eslint-enable no-param-reassign */

export const appSettingsReducer = appSettingsSlice.reducer;

export const actions = {
  ...appSettingsSlice.actions,
};
