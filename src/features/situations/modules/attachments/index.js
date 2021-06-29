import { selectors as attachmentsSelectors } from './selectors';

export { situationAttachmentsReducer, actions } from './ducks';
export { sagas } from './sagas';
export { AttachmentDrop } from './components/AttachmentDrop';
export { AttachmentsList } from './components/AttachmentsList';

const { isSomethingLoading, linksToFiles } = attachmentsSelectors;

export const selectors = {
  isSomethingLoading,
  linksToFiles,
};
