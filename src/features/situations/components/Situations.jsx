import React from 'react';
import * as L from 'korus-ui';

import { NOT_FOUND_SITUATIONS_GRID_ITEMS } from '../constants';

import { situationsListFilter } from '../utils';
import { SituationsFilter } from './SituationsFilter';
import { SituationsGrid } from './SituationsGrid';

/**
 * ## Компонент жизненных ситуаций, объеденяет в себе SituationsFilter и SituationsGrid
 *
 * @example
 * <Situations situationsList={situationsList} />
 *
 * @param {object} props - параметры компонента
 * @param {Array} props.situationsList - список ЖС
 *
 * @returns {React$Node} Компонент жизненных ситуаций
 */
export const Situations = ({ situationsList }) => {
  const [value, setValue] = React.useState('');
  const [filteredSituationList, setFilteredSituationList] = React.useState(
    situationsList,
  );
  const onValueChange = (fieldValue) => setValue(fieldValue);

  React.useEffect(() => {
    const filtered = situationsListFilter(situationsList, value);
    setFilteredSituationList(
      filtered.length > 0 ? filtered : NOT_FOUND_SITUATIONS_GRID_ITEMS,
    );
  }, [value, situationsList]);

  return (
    <L.Div className="page-content padding-x-32 padding-y-16 border-top">
      <L.Div className="page-wrapper">
        <SituationsFilter value={value} onValueChange={onValueChange} />
        <SituationsGrid situationsList={filteredSituationList} />
      </L.Div>
    </L.Div>
  );
};
