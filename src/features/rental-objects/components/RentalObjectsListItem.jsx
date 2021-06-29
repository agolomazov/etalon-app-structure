import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { APP_ROUTES, EMPTY_CONTENT } from '@src/constants';
import { setDateFormat, getDictionaryText } from '@common/utils';
import { getUiMessages } from '@common/messages';

import { displayAreaOrCount } from '../utils';

/**
 * ## Элемент списка объектов
 * @example
 * <RentalObjectListItem objectData={data}/>
 *
 * @param {object} props - параметры компонента
 * @param {object} props.objectData - список начислений
 * @param {Array} props.facilityRentalTypes - типы объектов аренды
 *
 * @returns {React.FC} Элемент списка объектов
 */
export const RentalObjectListItem = ({ objectData, facilityRentalTypes }) => {
  const {
    address = '',
    typeId,
    cadastralNumber = '',
    area,
    count,
    contract,
  } = objectData;
  const { id = '', number, date } = contract;

  return (
    <L.Div
      className="card card-default
                 padding-x-32 padding-y-16 margin-bottom-8"
    >
      <Link to={APP_ROUTES.CONTRACT_DETAILS(id)} className="link-overlay" />
      <L.Div className="row">
        <L.Div className="col-6">
          <L.H6 className="padding-bottom-32">
            {address || getUiMessages('msgNoAddress')}
          </L.H6>
          <L.Div className="margin-top-auto txt-gray">
            {`Договор №${number} от ${setDateFormat(date)}`}
          </L.Div>
        </L.Div>
        <L.Div className="col-2 txt-right">
          {getDictionaryText(facilityRentalTypes, typeId, typeId)}
        </L.Div>
        <L.Div className="col-2 txt-right">
          {cadastralNumber || EMPTY_CONTENT}
        </L.Div>
        <L.Div className="col-2 txt-right">
          {displayAreaOrCount(area, count)}
        </L.Div>
      </L.Div>
    </L.Div>
  );
};
