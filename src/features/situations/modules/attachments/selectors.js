import { createSelector } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

const situationAttachmentsFiles = (state) =>
  state[getConfig('modules.situations')].attachments.files;

const situationAttachmentsLoaders = (state) =>
  state[getConfig('modules.situations')].attachments.loaders;

const linksToFiles = (state) =>
  state[getConfig('modules.situations')].attachments.links;

const filesByAppealId = (state, appealId) =>
  situationAttachmentsFiles(state)[appealId];

/**
 * Функция создает селектор для получения прикреленного файла
 */
const createFileSelector = (linkId) =>
  createSelector(linksToFiles, filesByAppealId, (links, files = {}) => {
    const { fileId } = links[linkId] || {};
    return (linkId ? files[fileId] : Object.values(files)[0]) || {};
  });

/**
 * Функция создает селектор для получения списка прикрепленных файлов
 */
const createFilesListSelector = () =>
  createSelector(filesByAppealId, (files = {}) => Object.values(files));

/**
 * Процесс загрузки файла
 */
const isFileUploading = (state, uniq) =>
  situationAttachmentsLoaders(state)[uniq] || false;

/**
 * ## [Селектор] Что-то где-то загружается
 */
const isSomethingLoading = createSelector(
  situationAttachmentsFiles,
  situationAttachmentsLoaders,
  (atts, loaders) => {
    const files = Object.values(atts).reduce(
      (allFiles, filesForAppeal) => [
        ...allFiles,
        ...Object.values(filesForAppeal),
      ],
      [],
    );

    const isFileLoading = files.some(({ isLoading }) => isLoading);
    const isUploading = Object.keys(loaders).length > 0;

    return isFileLoading || isUploading;
  },
);

export const selectors = {
  createFileSelector,
  createFilesListSelector,
  isFileUploading,
  isSomethingLoading,
  filesByAppealId,
  linksToFiles,
};
