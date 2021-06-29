import React from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';
import { ContractList } from '@features/contracts';
import { selectors as dictionariesSelectors } from '@features/dictionaries';
import { selectors as appSettingsSelectors } from '@features/app-settings';

/**
 * ## Страница "Мои договоры"
 * @example
 * <ContractsListPage />
 *
 * @returns {React.FC} Страница "Мои договоры"
 */
export const ContractsListPage = () => {
  const accrualPeriods =
    useSelector(dictionariesSelectors.accrualPeriods) || [];
  const contractTypes = useSelector(dictionariesSelectors.contractTypes) || [];
  const contractStatuses =
    useSelector(dictionariesSelectors.contractStatuses) || [];
  const isContractsBeFiltrationEnabled = useSelector(
    appSettingsSelectors.isContractsBeFiltrationEnabled,
  );
  return (
    <MainLayout
      subHeader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <SubHeader>
          <L.H1>Мои договоры</L.H1>
        </SubHeader>
      }
    >
      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <ContractList
          accrualPeriods={accrualPeriods}
          contractTypes={contractTypes}
          contractStatuses={contractStatuses}
          shouldRenderPagination={isContractsBeFiltrationEnabled}
        />
      </L.Div>
    </MainLayout>
  );
};
