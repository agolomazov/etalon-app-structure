import React from 'react';
import * as L from 'korus-ui';

import { MainLayout } from '@common/layouts';
import { SubHeader } from '@common/components';

import { Feedback } from '@features/support';

/**
 * ## Страница Оставить отзыв о Личном кабинете
 * @example
 * <FeedbackPage />
 *
 * @returns {React.FC} Страница Оставить отзыв о Личном кабинете
 */
export const FeedbackPage = () => (
  <MainLayout
    subHeader={
      // eslint-disable-next-line react/jsx-wrap-multilines
      <SubHeader>
        <L.H1>Оставить отзыв о Личном кабинете</L.H1>
      </SubHeader>
    }
  >
    <Feedback />
  </MainLayout>
);
