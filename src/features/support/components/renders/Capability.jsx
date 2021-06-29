import React from 'react';

/**
 * ## Отрисовывает элемент списка возможностей
 * @example
 * Capability()
 *
 * @returns {ReactNode} Рендер элемента списка возможностей
 */
export const Capability = () => (
  <>
    {`Произвести выгрузку платежных поручений в формат `}
    <strong>xml</strong>
    {` для последующей загрузки в `}
    <strong>1С</strong>
  </>
);
