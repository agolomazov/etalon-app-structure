import React from 'react';
import * as L from 'korus-ui';
import {
  Link,
  useHistory,
} from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

const statusBarSteps = [
  {
    txt: 'Шаг 1',
    type: 'success',
  },
  {
    txt: 'Шаг 2',
    type: 'success',
  },
  {
    txt: 'Шаг 3',
    type: 'success',
  },
  {
    txt: 'Шаг 4',
    type: 'success',
  },
  {
    txt: 'Шаг 5',
    type: 'progress',
  },
];

/**
 * ## Mockup страницы Карточка договора
 * @example
 * <ContractItem />
 */
export const PaymentStep5 = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/contracts-list/contract-item"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>
            Оплата аренды земли через Личный кабинет
          </L.H1>
        </L.Div>
        <L.Div className="subtitle margin-left-32">
          Договор №17/ЗД-0500 от 14.05.2019
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <L.Div className="page-wrapper">
          <L.StatusBar
            className="padding-x-none padding-bottom-32 margin-y-32"
            data={statusBarSteps}
            textField="txt"
            typeField="type"
          />
          <L.Dl className="list form w-25 margin-bottom-32">
            <L.Dt>
              <L.Label>
                Сумма
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-50"
                inputRender={({ Element, elementProps }) => (
                  <>
                    <Element
                      {...elementProps}
                      className="autocomplete-input padding-right-none txt-right"
                      value="14 000"
                      disabled
                    />
                    <L.Span className="input-addon margin-left-4 margin-right-8 txt-gray">
                      ₽
                    </L.Span>
                  </>
                )}
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Коммиссия
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-50"
                inputRender={({ Element, elementProps }) => (
                  <>
                    <Element
                      {...elementProps}
                      className="autocomplete-input padding-right-none txt-right"
                      value="22"
                      disabled
                    />
                    <L.Span className="input-addon margin-left-4 margin-right-8 txt-gray">
                      ₽
                    </L.Span>
                  </>
                )}
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Итого
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-50"
                inputRender={({ Element, elementProps }) => (
                  <>
                    <Element
                      {...elementProps}
                      className="autocomplete-input padding-right-none txt-right"
                      value="14 022"
                      disabled
                    />
                    <L.Span className="input-addon margin-left-4 margin-right-8 txt-gray">
                      ₽
                    </L.Span>
                  </>
                )}
              />
            </L.Dd>
          </L.Dl>
        </L.Div>
        <L.Div className="toolbar padding-x-32 margin-top-auto margin-x-32-negative txt-right">
          <L.Button
            className="margin-left-32"
            onClick={() => history.push('/contracts-list/contract-item/contract-payment/payment-step-4')}
          >
            Назад
          </L.Button>
          <L.Button
            className="margin-left-24 success"
            onClick={() => history.push('/contracts-list/contract-item')}
          >
            Далее
          </L.Button>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
