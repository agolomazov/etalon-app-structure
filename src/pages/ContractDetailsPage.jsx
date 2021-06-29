import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as L from 'korus-ui';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';
import { setDateFormat } from '@common/utils';
import { useActions, usePaginationItems } from '@common/hooks';

import { useAppSettingsSelector } from '@features/app-settings';
import { useDictionariesSelector } from '@features/dictionaries';
import { RentalObjectsTable, useLoadRentals } from '@features/rental-objects';
import {
  ContractDetails,
  ContractDetailsCard,
  ContractDetailsTabs,
  ContractInfo,
  selectors as contractDetailsSelectors,
  actions as contractDetailsActions,
} from '@features/contract-details';
import {
  PAYMENT_HISTORY_SORT_FIELDS,
  useLoadPaymentHistory,
  PaymentHistoryTable,
} from '@features/payment-history';
import {
  ACCRUALS_SORT_FIELDS,
  useLoadAccruals,
  AccrualsList,
} from '@features/accruals';
import {
  ContractAppealsList,
  selectors as appealsSelectors,
} from '@features/messages';

/**
 * ## Страница "Подробнее о договоре"
 * @example
 * <ContractDetailsPage />
 *
 * @returns {React.FC} Страница "Подробнее о договоре"
 */
export const ContractDetailsPage = () => {
  const history = useHistory();
  const { id: contractId } = useParams();
  const { loadContractDetailsFlow } = useActions(contractDetailsActions);
  const isLoading = useSelector(contractDetailsSelectors.isLoading);
  const contractDetails = useSelector(contractDetailsSelectors.contractDetails);
  const contractAppeals = useSelector(appealsSelectors.contractAppeals);

  const {
    facilityRentalTypes,
    accrualPeriods,
    accrualTypes,
    contractTypes,
  } = useDictionariesSelector();

  const {
    isRentalsBeFiltrationEnabled,
    isAccrualsBeFiltrationEnabled,
    isPaymentHistoryBeFiltrationEnabled,
  } = useAppSettingsSelector();

  const { number = '', date } = contractDetails || {};

  const [activeTabKey, setActiveTabKey] = useState(2);

  useEffect(() => {
    loadContractDetailsFlow(contractId);
  }, [contractId]);

  const {
    payments,
    isLoading: isLoadingPayments,
    pageNumber: paymentsPageNumber,
    pageSize: paymentsPageSize,
    setPageNumber: setPaymentsPageNumber,
    totalItems: paymentsTotalItems,
  } = useLoadPaymentHistory({
    contractId,
    sortField: PAYMENT_HISTORY_SORT_FIELDS.paymentDate,
    sortDirection: 'DESC',
  });

  const {
    rentals,
    isLoading: isLoadingRentals,
    pageNumber: rentalsPageNumber,
    pageSize: rentalsPageSize,
    setPageNumber: setRentalsPageNumber,
    totalItems: rentalsTotalItems,
  } = useLoadRentals({ contractId });

  const {
    accruals,
    isLoading: isAccrualsLoading,
    pageNumber: accrualsPageNumber,
    pageSize: accrualsPageSize,
    setPageNumber: setAccrualsPageNumber,
    totalItems: accrualsTotalItems,
  } = useLoadAccruals({
    contractId,
    sortField: ACCRUALS_SORT_FIELDS.date,
    sortDirection: 'DESC',
  });

  const {
    items: appeals,
    pageNumber: appealsPageNumber,
    pageSize: appealsPageSize,
    setPageNumber: setAppealsPageNumber,
    totalItems: appealsTotalItems,
  } = usePaginationItems({ items: contractAppeals });

  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <Link
            to="#"
            onClick={() => {
              if (history) {
                history.goBack();
              }
            }}
            className="
              novicon-arrow-backward
              backward-link
              txt-gray
              margin-right-12"
          />
          <L.H1>
            {`Договор ${number} `}
            <L.Span className="txt-gray">{`от ${setDateFormat(date)}`}</L.Span>
          </L.H1>
        </SubHeader>
      }
    >
      <L.Loader
        className="page-content padding-x-32 padding-y-16 border-top"
        isLoading={isLoading}
      >
        <ContractDetails shouldRender={!!contractDetails}>
          <ContractDetailsCard
            contractDetails={contractDetails}
            accrualPeriods={accrualPeriods}
          />
          <ContractDetailsTabs
            activeTabKey={activeTabKey}
            onChange={(e) => setActiveTabKey(e.component.value)}
          >
            <L.Tab title="История платежей" tabKey={0}>
              <PaymentHistoryTable
                payments={payments}
                isLoading={isLoadingPayments}
                pageNumber={paymentsPageNumber}
                pageSize={paymentsPageSize}
                totalItems={paymentsTotalItems}
                onChangePageSize={setPaymentsPageNumber}
                shouldRenderPagination={isPaymentHistoryBeFiltrationEnabled}
              />
            </L.Tab>

            <L.Tab title="Начисления" tabKey={1}>
              <AccrualsList
                accruals={accruals}
                isLoading={isAccrualsLoading}
                pageNumber={accrualsPageNumber}
                pageSize={accrualsPageSize}
                totalItems={accrualsTotalItems}
                onChangePageNumber={setAccrualsPageNumber}
                accrualTypes={accrualTypes}
                shouldRenderPagination={isAccrualsBeFiltrationEnabled}
              />
            </L.Tab>

            <L.Tab title="Подробнее о договоре" tabKey={2}>
              <ContractInfo
                contractDetails={contractDetails}
                contractTypes={contractTypes}
                accrualPeriods={accrualPeriods}
              />
            </L.Tab>

            <L.Tab title="Подробнее об объектах" tabKey={3}>
              <RentalObjectsTable
                contractId={contractId}
                rentals={rentals}
                isLoading={isLoadingRentals}
                pageNumber={rentalsPageNumber}
                pageSize={rentalsPageSize}
                totalItems={rentalsTotalItems}
                onChangePageNumber={setRentalsPageNumber}
                facilityRentalTypes={facilityRentalTypes}
                shouldRenderPagination={isRentalsBeFiltrationEnabled}
              />
            </L.Tab>

            <L.Tab title="Связанные документы" tabKey={4}>
              <ContractAppealsList
                appeals={appeals}
                pageNumber={appealsPageNumber}
                pageSize={appealsPageSize}
                totalItems={appealsTotalItems}
                onChangePageNumber={setAppealsPageNumber}
              />
            </L.Tab>
          </ContractDetailsTabs>
        </ContractDetails>
      </L.Loader>
    </MainLayout>
  );
};
