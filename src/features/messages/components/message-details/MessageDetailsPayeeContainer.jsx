import React from 'react';

import { MessageDetailsPayeeNatural } from './MessageDetailsPayeeNatural';
import { MessageDetailsPayeeJuridical } from './MessageDetailsPayeeJuridical';
import { MessageDetailsPayeePublic } from './MessageDetailsPayeePublic';

/**
 * ## Компонент отображающий информацию о получателе платежа в зависимости от типа получателя
 * @example
 * <MessageDetailsPayeeContainer additionalData={additionalData}/>
 *
 * @param {object} props - информация по обращению
 * @param {object} props.additionalData - информация по обращению
 *
 * @returns {React.FC} информацию о получателе платежа
 */
export const MessageDetailsPayeeContainer = ({ additionalData }) => {
  const {
    payeeNaturalPerson = null,
    payeeJuridicalPerson = null,
    payeePublicSectorCompany = null,
  } = additionalData;
  if (payeeNaturalPerson !== null) {
    return <MessageDetailsPayeeNatural payee={payeeNaturalPerson} />;
  }
  if (payeeJuridicalPerson !== null) {
    return <MessageDetailsPayeeJuridical payee={payeeJuridicalPerson} />;
  }
  if (payeePublicSectorCompany !== null) {
    return <MessageDetailsPayeePublic payee={payeePublicSectorCompany} />;
  }
  return null;
};
