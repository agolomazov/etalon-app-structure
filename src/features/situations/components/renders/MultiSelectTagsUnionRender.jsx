import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент для кастомизация MultiSelect
 *
 * @example <L.MultiSelect tagsUnionRender={MultiSelectTagsUnionRender} />
 *
 * @returns {React.FC}  Компонент для кастомизация MultiSelect
 */
export const MultiSelectTagsUnionRender = ({
  elementProps,
  componentProps,
  Element,
}) => {
  const { value } = componentProps;
  const choose = L.utils.getWordEnding({
    count: value?.length ?? 0,
    one: 'Выбрана',
    two: 'Выбрано',
    five: 'Выбрано',
  });
  const status = L.utils.getWordEnding({
    count: value?.length ?? 0,
    one: 'характеристика',
    two: 'характеристики',
    five: 'характеристик',
  });
  return (
    <Element {...elementProps}>
      {`${choose} ${value?.length} ${status}`}
    </Element>
  );
};
