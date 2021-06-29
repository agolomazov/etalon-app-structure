import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент для кастомизация поля ввода. Добавляет суффикс ₽
 *
 * @example <L.Input inputRender={RubPostfixInputRender}/>
 *
 * @returns {React$Node} Компонент для кастомизация поля ввода
 */
export const RubPostfixInputRender = ({ Element, elementProps }) => (
  <>
    <Element
      {...elementProps}
      className="autocomplete-input padding-right-none txt-right"
    />
    <L.Span className="input-addon margin-left-4 margin-right-8 txt-gray">
      ₽
    </L.Span>
  </>
);
