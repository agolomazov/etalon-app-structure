import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { useActions } from '@common/hooks';

import { actions } from '../ducks';

import { QuestionList } from './QuestionList';
import { CapabilitiesList } from './CapabilitiesList';
import { SupportBar } from './SupportBar';

/**
 * ## Отрисовывает раздел Помощь
 * @example
 * <Help />
 *
 * @returns {React.FC} Раздел Помощь
 */
export const Help = () => {
  const { downloadUserManualFlow } = useActions(actions);

  return (
    <L.Div className="page-content page-main inner-32 border-top">
      <L.Div className="page-wrapper margin-right-32">
        <L.Div className="flex-row margin-bottom-12">
          <L.H6 className="line-height-1">Быстрые ответы</L.H6>
          <Link
            to="#"
            download
            className="margin-left-auto"
            onClick={() => downloadUserManualFlow()}
          >
            <L.I className="novicon-doc-list margin-right-8" />
            Руководство пользователя
          </Link>
        </L.Div>
        <QuestionList />
        <CapabilitiesList />
      </L.Div>
      <L.Aside className="aside-main">
        <SupportBar />
      </L.Aside>
    </L.Div>
  );
};
