import React from 'react';
import * as L from 'korus-ui';

import { useToggle } from '@common/hooks';
import { ListEmpty } from '@common/components';

import { useSelectRentals, useLoadRentals } from '../hooks';

import {
  RentalTypeTag,
  CadastralNumberTag,
  ContractDateRangeTag,
} from './tags';
import { RentalObjectListItem } from './RentalObjectsListItem';

/**
 * ## Компонент получает и отрисовывет список объектов аренды
 *
 * @example
 * <RentalObjectsList facilityRentalTypes={facilityRentalTypes}/>
 *
 * @param {Object} props - Параметры компонента
 * @param {Array} props.facilityRentalTypes - типы объектов аренды
 * @param {boolean} props.shouldRenderPagination - должен ли рендериться компонент пагинации
 *
 * @returns {React.FC} Компонент со списоком объектов аренды
 */
export const RentalObjectsList = ({
  facilityRentalTypes,
  shouldRenderPagination = false,
}) => {
  const [isExtendedFiltersOpen, toggleExtendedFiltersOpen] = useToggle(false);

  const {
    sortByField,
    addressFilter,
    contractNumberFilter,
    contractDateRangeFilter,
    cadastralNumberFilter,
    rentalTypeFilter,
    BasicRentalsFilters,
    ExtendedRentalsFilters,
  } = useSelectRentals({ facilityRentalTypes });

  const {
    rentals,
    isLoading,
    pageNumber,
    pageSize,
    setPageNumber,
    totalItems,
  } = useLoadRentals({
    sortField: sortByField.value[0],
    sortDirection: sortByField.value[1],
    contractNumber: contractNumberFilter.value,
    contractDateFrom: contractDateRangeFilter.value[0],
    contractDateTo: contractDateRangeFilter.value[1],
    address: addressFilter.value,
    rentalType: rentalTypeFilter.value,
    cadastralNumber: cadastralNumberFilter.value,
  });

  const shouldRenderTags = !!(
    contractDateRangeFilter.value[0] ||
    contractDateRangeFilter.value[1] ||
    cadastralNumberFilter.value ||
    rentalTypeFilter.value
  );

  if (!rentals) {
    return null;
  }

  return (
    <L.Div className="page-content padding-x-32 padding-y-16 border-top">
      <L.Div className="page-wrapper">
        <L.Div className="flex-row padding-bottom-16">
          <BasicRentalsFilters />
          <L.Button
            className="blank margin-left-auto padding-x-none"
            onClick={toggleExtendedFiltersOpen}
          >
            {!isExtendedFiltersOpen
              ? 'Расширенный поиск'
              : 'Закрыть расширенный поиск'}
            <L.I className="novicon-search margin-left-8" />
          </L.Button>
        </L.Div>

        <L.Div className="margin-bottom-12" shouldRender={shouldRenderTags}>
          <L.Tags>
            <RentalTypeTag
              value={rentalTypeFilter.text}
              onClick={rentalTypeFilter.reset}
            />
            <CadastralNumberTag
              value={cadastralNumberFilter.value}
              onClick={cadastralNumberFilter.reset}
            />
            <ContractDateRangeTag
              value={contractDateRangeFilter.value}
              onClick={contractDateRangeFilter.reset}
            />
          </L.Tags>
        </L.Div>

        <L.Collapsible
          isOpen={isExtendedFiltersOpen}
          className="margin-x-32-negative border-top"
        >
          <ExtendedRentalsFilters
            onSubmit={() => toggleExtendedFiltersOpen(false)}
            onReset={() => toggleExtendedFiltersOpen(false)}
          />
        </L.Collapsible>

        <L.Loader isLoading={isLoading}>
          {rentals.length === 0 && isLoading === false && <ListEmpty />}
          {rentals.map((object) => (
            <RentalObjectListItem
              key={object.id}
              objectData={object}
              facilityRentalTypes={facilityRentalTypes}
            />
          ))}
          {shouldRenderPagination && rentals.length > 0 && (
            <L.Pagination
              className="margin-top-32 border-top"
              itemsTotalInfoRender={() => null}
              itemsRangeInfoRender={() => null}
              currentPage={pageNumber}
              pageSize={pageSize}
              totalItems={totalItems}
              onChange={(e) => setPageNumber(e.component.value)}
            />
          )}
        </L.Loader>
      </L.Div>
    </L.Div>
  );
};
