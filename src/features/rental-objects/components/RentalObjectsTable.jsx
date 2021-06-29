import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import * as L from 'korus-ui';

import {
  APP_ROUTES,
  APP_QUERY_PARAMS,
  APP_QUERY_VALUES,
  EMPTY_CONTENT,
} from '@src/constants';
import { getUiMessages } from '@common/messages';
import { getDictionaryText } from '@common/utils';

import { displayAreaOrCount } from '../utils';

/**
 * ## Компонент отрисовывет таблицу с объектами аренды
 *
 * @example
 *
 * <RentalObjectsTable contractId={'10'} facilityRentalTypes={facilityRentalTypes}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {string} props.contractId - идентификатор договора
 * @param {Array} props.rentals - список объектов аренды
 * @param {boolean} props.isLoading - состояние загрузки
 * @param {number} props.pageNumber - текущий номер страницы
 * @param {number} props.pageSize - количество элементов на странице
 * @param {number} props.totalItems - общее количество записей
 * @param {Function} props.onChangePageNumber - обработчик изменения текущей страницы
 * @param {Array} props.facilityRentalTypes - справочник с типами объектов аренды
 * @param {boolean} props.shouldRenderPagination - должен ли рендериться компонент пагинации
 *
 * @returns {React.FC} Компонент отрисовывет таблицу с объектами аренды
 */
export const RentalObjectsTable = ({
  contractId,
  rentals,
  isLoading,
  pageNumber,
  pageSize,
  totalItems,
  onChangePageNumber,
  facilityRentalTypes,
  shouldRenderPagination = false,
}) => {
  const isIncompleteRentalDetails = useMemo(
    () =>
      rentals.some(
        ({ address, cadastralNumber, area }) =>
          !(address && cadastralNumber && area),
      ),
    [rentals],
  );

  // eslint-disable-next-line max-len
  const changeObjectInfoLink = `${APP_ROUTES.SITUATION_CHANGE_OBJECT_INFO}?${APP_QUERY_PARAMS.CONTRACT_ID}=${contractId}&${APP_QUERY_PARAMS.APPEAL_TYPE}=${APP_QUERY_VALUES.APPEAL_TYPE_CHANGE_INFO}`;
  // eslint-disable-next-line max-len
  const missingObjectInfoLink = `${APP_ROUTES.SITUATION_CHANGE_OBJECT_INFO}?${APP_QUERY_PARAMS.CONTRACT_ID}=${contractId}&${APP_QUERY_PARAMS.APPEAL_TYPE}=${APP_QUERY_VALUES.APPEAL_TYPE_MISSING_INFO}`;

  return (
    <>
      <L.Div
        shouldRender={isIncompleteRentalDetails}
        className="message warning block-inline
                   inner-12 margin-bottom-16"
      >
        <L.I
          className="novicon-exclamation-in-circle-fill
                     txt-warning padding-right-8"
        />
        Отсутствует информация по объектам.
        <> </>
        <Link to={missingObjectInfoLink}>Сообщить о неточности</Link>
      </L.Div>

      <L.Div className="table">
        <L.Table>
          <L.ColGroup>
            <L.Col width="40%" />
            <L.Col width="17%" />
            <L.Col />
            <L.Col width="25%" />
          </L.ColGroup>
          <L.THead>
            <L.Tr>
              <L.Th className="table-header txt-gray">Адрес</L.Th>
              <L.Th className="table-header txt-gray">Кадастровый номер</L.Th>
              <L.Th className="table-header txt-gray">Площадь</L.Th>
              <L.Th className="table-header txt-gray">Тип</L.Th>
            </L.Tr>
          </L.THead>
          <L.TBody>
            {rentals.map(
              ({ id, typeId, address, cadastralNumber, area, count }) => (
                <L.Tr key={id}>
                  <L.Td>{address || getUiMessages('msgNoAddress')}</L.Td>
                  <L.Td>{cadastralNumber || EMPTY_CONTENT}</L.Td>
                  <L.Td>{displayAreaOrCount(area, count)}</L.Td>
                  <L.Td>
                    {getDictionaryText(facilityRentalTypes, typeId, typeId)}
                  </L.Td>
                </L.Tr>
              ),
            )}
          </L.TBody>
        </L.Table>

        <Link to={changeObjectInfoLink} className="margin-top-16">
          Внести изменения
          <L.Tooltip
            title="Перейти в жизненную ситуацию
                   для внесения изменений в характеристики арендованных объектов
                   (адрес, площадь, назначение, категория,
                   вид разрешенного использования)."
            position="top"
          >
            <L.I className="novicon-question txt-gray margin-left-8" />
          </L.Tooltip>
        </Link>

        {shouldRenderPagination && rentals.length > 0 && (
          <L.Pagination
            itemsTotalInfoRender={() => null}
            itemsRangeInfoRender={() => null}
            isLoading={isLoading}
            currentPage={pageNumber}
            pageSize={pageSize}
            totalItems={totalItems}
            onChange={(e) => onChangePageNumber(e.component.value)}
          />
        )}
      </L.Div>
    </>
  );
};
