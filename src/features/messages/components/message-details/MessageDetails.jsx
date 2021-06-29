import React from 'react';
import * as L from 'korus-ui';

import { MessageDetailsFactory } from './MessageDetailsFactory';

/**
 * ## Компонент содержащий детали обращения
 * @example
 * <MessageDetails appealData={appealData}/>
 *
 * @param {object} props - Параметры компонента
 * @param {object} props.appealData - информация по обращению
 * @param {object} props.facilityRentalTypes - словарь типов объектов аренды
 *
 * @returns {React.FC} Компонент - детали сообщения
 */
export const MessageDetails = ({ appealData, facilityRentalTypes }) => {
  const [isRequestOpen, setIsRequestOpen] = React.useState(true);
  if (!appealData) {
    return null;
  }
  return (
    <>
      <L.Div
        className="flex-row
          align-items-center
          margin-bottom-4
          txt-uppercase
          txt-small
          txt-gray"
      >
        Информация по запросу
        <L.Button
          className="blank padding-x-none margin-left-auto txt-right"
          onClick={() => setIsRequestOpen(!isRequestOpen)}
        >
          {isRequestOpen ? 'Свернуть' : 'Развернуть'}
        </L.Button>
      </L.Div>
      <L.Collapsible isOpen={isRequestOpen}>
        <MessageDetailsFactory
          data={appealData}
          facilityRentalTypes={facilityRentalTypes}
        />
      </L.Collapsible>
    </>
  );
};
