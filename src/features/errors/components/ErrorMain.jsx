import React from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../selectors';
import { ErrorFatal } from './ErrorFatal';
import { ErrorApp } from './ErrorApp';

/**
 * ## Компонент выводит ошибки взависимости от их типа
 *
 * @example
 * <ErrorMain/>
 *
 * @returns {React.FC} Компонент выводит ошибки взависимости от их типа
 */
export const ErrorMain = () => {
  const title = useSelector(selectors.errorTitle);
  const code = useSelector(selectors.errorCode);
  const errorIsFatal = useSelector(selectors.isErrorFatal);
  const message = useSelector(selectors.errorMessage);

  return errorIsFatal ? (
    <ErrorFatal code={code} title={title} message={message} />
  ) : (
    <ErrorApp title={title} />
  );
};
