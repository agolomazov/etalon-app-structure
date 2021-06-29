import React from 'react';
import * as L from 'korus-ui';

import { EMPTY_CONTENT } from '@src/constants';
import { setDateFormat, getDictionaryText } from '@common/utils';

/**
 * ## Вкладка с информацией по договору
 * @example
 * <ContractInfo
 *    contractDetails={contractDetails}
 *    contractTypes={contractTypes}
 *    accrualPeriods={accrualPeriods}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.contractDetails - данные по договору
 * @param {object} props.contractTypes - типы договоров
 * @param {object} props.accrualPeriods - типы периодов начисления
 * @returns {React.FC} Вкладка с информацией по договору
 */
export const ContractInfo = ({
  contractDetails,
  contractTypes,
  accrualPeriods,
}) => {
  if (!contractDetails) {
    return null;
  }
  const {
    number,
    rentalCalculationMethod = '',
    nextPaymentDate = null,
    startDate = '',
    expirationDate = '',
    type,
    BCC = [],
    annualRentalRate = '',
    penaltyRate = EMPTY_CONTENT,
    landlord,
  } = contractDetails;

  const { name, inn, kpp, email, juridicalAddress } = landlord;

  return (
    <L.Div>
      <L.Div className="margin-bottom-12 txt-uppercase txt-small txt-gray">
        Информация по договору
      </L.Div>
      <L.Dl className="list w-30 padding-bottom-16 margin-bottom-24">
        <L.Dt>Договор</L.Dt>
        <L.Dd>{number}</L.Dd>
        <L.Dt>Срок действия договора</L.Dt>
        <L.Dd>
          <L.I className="novicon-datepicker margin-right-12 txt-gray" />
          {`${setDateFormat(startDate)} - ${setDateFormat(expirationDate)}`}
        </L.Dd>
        <L.Dt>Тип договора</L.Dt>
        <L.Dd>{getDictionaryText(contractTypes, type, EMPTY_CONTENT)}</L.Dd>
        <L.Dt>КБК</L.Dt>
        <L.Dd>{BCC.join(', ')}</L.Dd>
        <L.Dt>Ставка годовой арендной платы</L.Dt>
        <L.Dd>
          <L.RUB precision="2">{annualRentalRate}</L.RUB>
        </L.Dd>
        <L.Dt>Период начисления арендной платы</L.Dt>
        <L.Dd>
          {getDictionaryText(
            accrualPeriods,
            rentalCalculationMethod,
            EMPTY_CONTENT,
            true,
          )}
        </L.Dd>
        {nextPaymentDate !== null && (
          <>
            <L.Dt>Дата следующей оплаты</L.Dt>
            <L.Dd>
              <L.I className="novicon-datepicker margin-right-12 txt-gray" />
              {setDateFormat(nextPaymentDate)}
            </L.Dd>
          </>
        )}
        <L.Dt>Ставка по пеням</L.Dt>
        <L.Dd>{penaltyRate}</L.Dd>
      </L.Dl>

      <L.Div className="margin-bottom-12 txt-uppercase txt-small txt-gray">
        Информация об арендодателе
      </L.Div>
      <L.Dl className="list w-30 padding-bottom-16 margin-bottom-24">
        <L.Dt>Наименование арендодателя</L.Dt>
        <L.Dd>{name}</L.Dd>
        <L.Dt>Юридический адрес</L.Dt>
        <L.Dd>{juridicalAddress}</L.Dd>
        <L.Dt>ИНН</L.Dt>
        <L.Dd>{inn}</L.Dd>
        <L.Dt>КПП</L.Dt>
        <L.Dd>{kpp}</L.Dd>
        <L.Dt>Почта</L.Dt>
        <L.Dd>{email}</L.Dd>
      </L.Dl>
    </L.Div>
  );
};
