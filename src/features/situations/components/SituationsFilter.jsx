import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент фильтр списка жизненных ситуаций
 *
 * @example
 * <SituationsFilter value={value} onValueChange={onValueChange} />
 *
 * @param {object} props - параметры компонента
 * @param {string} props.value - значение фильтра
 * @param {Function} props.onValueChange - обработчик изменения фильтра
 *
 * @returns {React$Node} Компонент фильтр списка жизненных ситуаций
 */
export const SituationsFilter = ({ value, onValueChange }) => (
  <L.Div className="flex-row padding-bottom-16">
    <L.Input
      className="width-45 margin-right-16"
      form="situations"
      name="searchSituation"
      placeholder="Поиск"
      value={value}
      onChange={(el) => onValueChange(el.component.value)}
    />
  </L.Div>
);
