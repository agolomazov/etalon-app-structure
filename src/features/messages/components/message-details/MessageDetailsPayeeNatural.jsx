import React from 'react';
import * as L from 'korus-ui';

import { setDateFormat } from '@common/utils';

/**
 * ## Компонент отображающий информацию о получателе платежа для физического лица
 * @example
 * <MessageDetailsPayeeNatural payee={payee}/>
 *
 * @param {object} props - информация о получателе средств
 * @param {object} props.payee - информация о получателе средств
 *
 * @returns {React.FC} информацию о получателе платежа для физического лица
 */
export const MessageDetailsPayeeNatural = ({ payee }) => {
  if (payee === null) {
    return null;
  }
  return (
    <>
      <L.Dt>ФИО получателя</L.Dt>
      <L.Dd>{payee.fullName}</L.Dd>
      <L.Dt>ИНН</L.Dt>
      <L.Dd>{payee.inn}</L.Dd>
      <L.Dt>Паспортные данные</L.Dt>
      <L.Dd> </L.Dd>
      <L.Dt>Серия</L.Dt>
      <L.Dd>{payee.passportSeriesAndNumber.series}</L.Dd>
      <L.Dt>Номер</L.Dt>
      <L.Dd>{payee.passportSeriesAndNumber.number}</L.Dd>
      <L.Dt>Кем выдан</L.Dt>
      <L.Dd>{payee.passportIssuedBy}</L.Dd>
      <L.Dt>Дата выдачи</L.Dt>
      <L.Dd>
        <L.I
          className="novicon-datepicker
                    margin-right-12
                    txt-gray"
        />
        {setDateFormat(payee.passportIsueDate)}
      </L.Dd>
      <L.Dt>Банковские реквизиты</L.Dt>
      <L.Dd> </L.Dd>
      <L.Dt>Наименование банка</L.Dt>
      <L.Dd>{payee.bankInfo.bankName}</L.Dd>
      <L.Dt>БИК</L.Dt>
      <L.Dd>{payee.bankInfo.bic}</L.Dd>
      <L.Dt>Банковский счет</L.Dt>
      <L.Dd>{payee.bankInfo.bankAccount}</L.Dd>
      <L.Dt>Корреспондентский счет</L.Dt>
      <L.Dd>{payee.corrAccount}</L.Dd>
    </>
  );
};
