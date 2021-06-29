import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Компонент отображающий информацию о получателе платежа для бюджетной организации
 * @example
 * <MessageDetailsPayeePublic payee={payee}/>
 *
 * @param {object} props - информация о получателе средств
 * @param {object} props.payee - информация о получателе средств
 *
 * @returns {React.FC} информацию о получателе платежа для бюджетной организации
 */
export const MessageDetailsPayeePublic = ({ payee }) => {
  if (payee === null) {
    return null;
  }
  return (
    <>
      <L.Dt>Наименование организации</L.Dt>
      <L.Dd>{payee.companyName}</L.Dd>
      <L.Dt>ИНН</L.Dt>
      <L.Dd>{payee.inn}</L.Dd>
      <L.Dt>КПП</L.Dt>
      <L.Dd>{payee.kpp}</L.Dd>
      <L.Dt>Банковские реквизиты</L.Dt>
      <L.Dd> </L.Dd>
      <L.Dt>Наименование банка</L.Dt>
      <L.Dd>{payee.bankInfo.bankName}</L.Dd>
      <L.Dt>БИК</L.Dt>
      <L.Dd>{payee.bankInfo.bic}</L.Dd>
      <L.Dt>Банковский счет</L.Dt>
      <L.Dd>{payee.bankInfo.bankAccount}</L.Dd>
      <L.Dt>Лицевой счет</L.Dt>
      <L.Dd>{payee.personalAccount}</L.Dd>
      <L.Dt>КБК</L.Dt>
      <L.Dd>{payee.bcc}</L.Dd>
    </>
  );
};
