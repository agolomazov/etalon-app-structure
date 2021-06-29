import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент для кастомизация поля ввода. Добавляет префикс №
 *
 * @example <L.AutoComplete inputRender={NumberPrefixInputRender}/>
 *
 * @returns {React$Node} Компонент для кастомизация поля ввода
 */
export const NumberPrefixInputRender = ({ Element, elementProps }) => (
  <>
    <L.Span className="input-addon margin-left-8 margin-right-4 txt-gray">
      №
    </L.Span>
    <Element
      {...elementProps}
      className="autocomplete-input padding-left-none"
    />
  </>
);
