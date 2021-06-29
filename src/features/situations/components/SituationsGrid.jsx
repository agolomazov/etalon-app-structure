import React from 'react';
import * as L from 'korus-ui';

import { SituationsGridItem } from './SituationsGridItem';

/**
 * ## Компонент со списком жизненных ситуаций
 *
 * @example
 * <SituationsGrid situationsList={situationsList}/>
 *
 * @param {object} props - параметры компонента
 * @param {Array} props.situationsList - список ЖС
 *
 * @returns {React$Node} Компонент со списком жизненных ситуаций
 */
export const SituationsGrid = ({ situationsList }) => (
  <L.Div className="situations-list flex-row flex-wrap">
    {situationsList.map(({ title, ...rest }) => (
      <SituationsGridItem key={title} title={title} {...rest} />
    ))}
  </L.Div>
);
