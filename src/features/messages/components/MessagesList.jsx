import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { APP_ROUTES } from '@src/constants';

import { selectors } from '../selectors';
import { MessagesListItem } from './MessagesListItem';
import { setFilterMessagesList } from '../utils';

/**
 * ## Список обращений
 * @example
 * <MessagesList appeals={appeals}/>
 *
 * @param {array} appeals - массив обращений
 *
 *  @returns {React$Node} компонент списка обращеий
 */
export const MessagesList = ({ appeals }) => {
  const [searchValue, setSeachValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const currentAppealId = useSelector(selectors.currentAppealId);
  const [selectedAppealId, setSelectedAppealId] = React.useState(null);

  React.useEffect(() => {
    if (currentAppealId) {
      setSelectedAppealId(currentAppealId);
    }
  }, [currentAppealId]);

  React.useEffect(() => {
    if (appeals.length === 0) {
      return;
    }
    const filterdList = setFilterMessagesList(appeals, searchValue);
    setFilteredData(filterdList);
  }, [searchValue, appeals]);

  return (
    <L.Div className="message-list">
      <L.Input
        className="width-100 padding-right-32 margin-bottom-12"
        form="message"
        name="message-search"
        placeholder="Поиск"
        onChange={(el) => setSeachValue(el.component.value)}
      />
      <L.Div className="message-list-scroll-area padding-right-16">
        {filteredData.length !== 0 &&
          filteredData.map((appealItem) => (
            <Link
              to={APP_ROUTES.MESSAGES_APPEAL(appealItem.id)}
              className="txt-black block message-item"
              key={`div${appealItem.id}`}
              onClick={() => setSelectedAppealId(appealItem.id)}
            >
              <MessagesListItem
                appeal={appealItem}
                key={appealItem.id}
                isSelected={appealItem.id === selectedAppealId}
              />
            </Link>
          ))}
      </L.Div>
    </L.Div>
  );
};
