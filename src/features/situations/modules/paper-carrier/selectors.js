import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

import { selectors as attachmentsSelectors } from '../attachments';

import { APPEAL_TYPE_MAP } from './constants';

const situationPaperCarrier = (state) =>
  state[getConfig('modules.situations')].paperCarrier;

/**
 * ## [Селектор] Тип обращения по ЖС
 */
const appealType = (state) => situationPaperCarrier(state).appealType;

/**
 * ## [Селектор] Объект с обращениями
 */
const appeals = (state) => situationPaperCarrier(state).appeals;

/**
 * ## [Селектор] Объект с полями обращения
 */
const appeal = createSelector(
  attachmentsSelectors.linksToFiles,
  appeals,
  appealType,
  (linksToFiles, apps, appType) => ({
    ...pathOr({}, [appType], apps),
    applicationFileId:
      linksToFiles[APPEAL_TYPE_MAP[appType]?.scannedAppealFileLinkId]?.fileId ||
      undefined,
    powerOfAttorneyFileId:
      linksToFiles[APPEAL_TYPE_MAP[appType]?.scannedPowerOfAttorneyFileLinkId]
        ?.fileId || undefined,
  }),
);

/**
 * ## [Селектор] Что-то где-то загружается
 */
const { isSomethingLoading } = attachmentsSelectors;

export const selectors = {
  appealType,
  appeal,
  isSomethingLoading,
};
