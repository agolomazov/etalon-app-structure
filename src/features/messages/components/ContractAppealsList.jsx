import React from 'react';
import * as L from 'korus-ui';

import { ContractAppealsItem } from './ContractAppealsItem';

/**
 * ## Список обращений вкладки "Связанные документы" компонента "Детали договора"
 *
 * @example
 * <ContractAppealsList />
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.appeals - список обращений
 * @param {number} props.pageNumber - текущий номер страницы
 * @param {number} props.pageSize - количество элементов на странице
 * @param {number} props.totalItems - общее количество записей
 * @param {Function} props.onChangePageNumber - обработчик изменения текущей страницы
 *
 * @returns {React.FC} Список обращений
 */
export const ContractAppealsList = ({
  appeals = [],
  pageNumber,
  pageSize,
  totalItems,
  onChangePageNumber,
}) => {
  if (appeals.length === 0) {
    return (
      <L.Div className="txt-center margin-top-120">
        <L.Img
          src="https://cdn.esphere.ru/images/ri/empty.svg"
          className="margin-bottom-32"
        />
        <L.P>Нет связанных с договором сообщений и уведомлений</L.P>
      </L.Div>
    );
  }

  return (
    <L.Div className="table">
      <L.Table>
        <L.ColGroup>
          <L.Col width="36px" />
          <L.Col width="15%" />
          <L.Col />
          <L.Col width="25%" />
        </L.ColGroup>
        <L.THead>
          <L.Tr>
            <L.Th className="table-header txt-gray" />
            <L.Th className="table-header txt-gray">Дата</L.Th>
            <L.Th className="table-header txt-gray">Тема</L.Th>
            <L.Th className="table-header txt-gray">Статус</L.Th>
          </L.Tr>
        </L.THead>
        <L.TBody>
          {appeals.map((appeal) => (
            <ContractAppealsItem appealData={appeal} key={appeal.id} />
          ))}
        </L.TBody>
      </L.Table>

      <L.Pagination
        itemsTotalInfoRender={() => null}
        itemsRangeInfoRender={() => null}
        currentPage={pageNumber}
        pageSize={pageSize}
        totalItems={totalItems}
        onChange={(e) => onChangePageNumber(e.component.value)}
      />
    </L.Div>
  );
};
