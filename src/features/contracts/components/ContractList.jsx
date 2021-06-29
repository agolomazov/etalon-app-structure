import React from 'react';
import * as L from 'korus-ui';

import { useToggle } from '@common/hooks';

import { ListEmpty } from '@common/components';

import {
  ActiveDatePeriodTag,
  ContractDateTag,
  ContractStatusTag,
  ContractTypeTag,
} from './tags';
import { ContractListItem } from './ContractListItem';

import { useSelectContracts, useLoadContracts } from '../hooks';

/**
 * ## Компонент получает список договорв и отрисовывает его
 * @example
 * <ContractList
 *    accrualPeriods={accrualPeriods}
 *    contractTypes={contractTypes}
 *    contractStatuses={contractStatuses}
 *    shouldRenderPagination={shouldRenderPagination}
 * />
 *
 * @param {object} props - Параметры компонента
 * @param {Array} props.accrualPeriods - периоды начислений
 * @param {Array} props.contractTypes - типы контрактов
 * @param {Array} props.contractStatuses - статусы контрактов
 * @param {Array} props.shouldRenderPagination - параметры пагинации
 *
 * @returns {React.FC} Компонент список договоров
 */
export const ContractList = ({
  accrualPeriods,
  contractTypes,
  contractStatuses,
  shouldRenderPagination = false,
}) => {
  const [isExtendedFiltersOpen, toggleExtendedFiltersOpen] = useToggle(false);

  const {
    sortByField,
    addressFilter,
    contractNumberFilter,
    contractDateRangeFilter,
    activeContractDateRangeFilter,
    contractTypeFilter,
    contractStatusFilter,
    BasicContractsFilters,
    ExtendedContractsFilters,
  } = useSelectContracts({ contractTypes, contractStatuses });

  const {
    contracts,
    isLoading,
    pageNumber,
    pageSize,
    setPageNumber,
    totalItems,
  } = useLoadContracts({
    sortField: sortByField.value[0],
    sortDirection: sortByField.value[1],
    contractNumber: contractNumberFilter.value,
    contractDateFrom: contractDateRangeFilter.value[0],
    contractDateTo: contractDateRangeFilter.value[1],
    expirationDateFrom: activeContractDateRangeFilter.value[0],
    expirationDateTo: activeContractDateRangeFilter.value[1],
    address: addressFilter.value,
    contractType: contractTypeFilter.value,
    contractStatus: contractStatusFilter.value,
  });

  const shouldRenderTags = !!(
    contractDateRangeFilter.value[0] ||
    contractDateRangeFilter.value[1] ||
    activeContractDateRangeFilter.value[0] ||
    activeContractDateRangeFilter.value[1] ||
    contractTypeFilter.value ||
    contractStatusFilter.value
  );

  if (!contracts) {
    return null;
  }

  return (
    <L.Div className="page-wrapper">
      <L.Div className="flex-row padding-bottom-16">
        <BasicContractsFilters />
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
          <ContractDateTag
            value={contractDateRangeFilter.value}
            onClick={contractDateRangeFilter.reset}
          />
          <ActiveDatePeriodTag
            value={activeContractDateRangeFilter.value}
            onClick={activeContractDateRangeFilter.reset}
          />
          <ContractTypeTag
            value={contractTypeFilter.text}
            onClick={contractTypeFilter.reset}
          />
          <ContractStatusTag
            value={contractStatusFilter.text}
            onClick={contractStatusFilter.reset}
          />
        </L.Tags>
      </L.Div>

      <L.Collapsible
        isOpen={isExtendedFiltersOpen}
        className="margin-x-32-negative border-top"
      >
        <ExtendedContractsFilters
          onSubmit={() => toggleExtendedFiltersOpen(false)}
          onReset={() => toggleExtendedFiltersOpen(false)}
        />
      </L.Collapsible>

      <L.Loader isLoading={isLoading}>
        {contracts.length === 0 && isLoading === false && <ListEmpty />}
        {contracts.map((contract) => (
          <ContractListItem
            contractData={contract}
            accrualPeriods={accrualPeriods}
            key={contract.id}
          />
        ))}
        {shouldRenderPagination && contracts.length > 0 && (
          <L.Pagination
            className="margin-top-32 border-top"
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={pageNumber}
            itemsTotalInfoRender={() => null}
            itemsRangeInfoRender={() => null}
            onChange={(e) => setPageNumber(e.component.value)}
          />
        )}
      </L.Loader>
    </L.Div>
  );
};
