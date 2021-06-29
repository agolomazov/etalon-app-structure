import { useSelector } from 'react-redux';

import { selectors } from '../selectors';

/**
 * Хук для получения состояния загрузки при скачивании печатной формы
 *
 * @returns {boolean} состояние загрузки
 */
export const useDownloadFormIsLoading = () => {
  const isLoading = useSelector(selectors.isDownloadFormLoading);
  return isLoading;
};
