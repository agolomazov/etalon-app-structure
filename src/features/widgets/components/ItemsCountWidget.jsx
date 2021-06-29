import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@src/constants';
import { pluralize } from '@common/utils';

/**
 * ## Виджет с количеством договоров и объектом
 * @example
 * <ItemCountWidget
 *    itemCountWidgetData={itemCountWidgetData}
 * />
 *
 * @param {object} props - параметры компонента
 * @param {object} props.itemCountWidgetData - данные виджета
 *
 * @returns {React.FC} Виджет с количеством договоров и объектом
 */
export const ItemCountWidget = ({ itemCountWidgetData }) => {
  if (!itemCountWidgetData) {
    return null;
  }
  const { contractCount, facilityRentalCount } = itemCountWidgetData;
  return (
    <L.Div className="aside-main-item inner-24">
      <Link
        to={APP_ROUTES.CONTRACTS}
        className="flex-row padding-bottom-16 txt-black border-bottom"
      >
        <L.Img
          src="https://cdn.esphere.ru/images/nova/icons/mail.svg"
          className="margin-right-24"
          alt="Договоры"
        />
        <L.Div className="flex-row align-items-end">
          <L.H2 className="line-height-1 margin-right-8">{contractCount}</L.H2>
          <L.Span className="line-height-1 txt-bold">
            {contractCount
              ? pluralize('договор', 'договора', 'договоров')(contractCount)
              : ''}
          </L.Span>
        </L.Div>
      </Link>
      <Link
        to={APP_ROUTES.RENTAL_OBJECTS}
        className="flex-row padding-top-16 txt-black"
      >
        <L.Img
          src="https://cdn.esphere.ru/images/nova/icons/escrow-fl.svg"
          className="margin-right-24"
          alt="Объекты"
        />
        <L.Div className="flex-row align-items-end">
          <L.H2 className="line-height-1 margin-right-8">
            {facilityRentalCount}
          </L.H2>
          <L.Span className="line-height-1 txt-bold">
            {facilityRentalCount
              ? pluralize('объект', 'объекта', 'объектов')(facilityRentalCount)
              : ''}
          </L.Span>
        </L.Div>
      </Link>
    </L.Div>
  );
};
