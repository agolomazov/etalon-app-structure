import { createSelector } from '@reduxjs/toolkit';
import { pathOr } from 'ramda';

import { getConfig } from '@common/config';

const noticesSelector = (state) =>
  pathOr([], [getConfig('modules.notices')], state);

const notices = createSelector(noticesSelector, (noticesArray) => noticesArray);

export const selectors = {
  notices,
};
