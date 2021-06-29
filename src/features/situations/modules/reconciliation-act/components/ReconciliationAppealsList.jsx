import React from 'react';
import * as L from 'korus-ui';
import { ReconciliationAppeal } from './ReconciliationAppeal';

/**
 * ## Компонент отображает список обращений
 *
 * @example
 * <ReconciliationAppealsList appeals={appeals}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.appeals - список обращений
 * @param {Array} props.contracts - список договоров
 * @param {boolean} props.isLoading - показать loader
 *
 * @returns {React.FC} Компонент отображает список обращений
 */
export const ReconciliationAppealsList = ({
  appeals = [],
  contracts,
  isLoading,
}) => {
  const hasAppeals = appeals.length > 0;
  const moreThanOneAppeal = appeals.length > 1;

  return (
    <>
      <L.H6 className="margin-bottom-12" shouldRender={hasAppeals}>
        2. Выберите договор/договоры
      </L.H6>
      {appeals.map((appeal) => (
        <ReconciliationAppeal
          key={appeal.id}
          contracts={contracts}
          appeal={appeal}
          shouldRenderDeleteButton={moreThanOneAppeal}
        />
      ))}
      {isLoading && <L.Loader isLoading={isLoading} style={{ zIndex: '0' }} />}
      <L.P className="txt-gray" shouldRender={moreThanOneAppeal}>
        В отношении каждого договора будет сформировано отдельное обращение
      </L.P>
    </>
  );
};
