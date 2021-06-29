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
    type: 'progress',
  },
  {
    txt: 'Шаг 2',
  },
  {
    txt: 'Шаг 3',
  },
  {
    txt: 'Шаг 4',
  },
  {
    txt: 'Шаг 5',
  },
];

const inputs = [
  {
    label: 'Счет получателья платежа',
    value: '40101810045250010041',
  },
  {
    label: 'ИНН',
    value: '7708701670',
  },
  {
    label: 'БИК',
    value: '044525000',
  },
  {
    label: 'К/С',
    value: '044525000044525000044525000',
  },
  {
    label: 'Банк получателя',
    value: 'ГУ Банка России по ЦФО',
  },
  {
    label: 'Название организации',
    value: 'ООО "Ромашка"',
  },
  {
    label: 'КПП',
    value: '770801001',
  },
  {
    label: 'КБК',
    value: '16711105021016000120',
  },
  {
    label: 'ОКТМО',
    value: '45378000',
  },
  {
    label: 'УИН (при наличии)',
    value: '0000017800015085013506365',
  },
];

/**
 * ## Mockup страницы Карточка договора
 * @example
 * <ContractItem />
 */
export const PaymentStep1 = () => {
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
            {inputs.map(input => (
              <>
                <L.Dt>
                  {input.label}
                </L.Dt>
                <L.Dd>
                  <L.Input className="width-50" value={input.value} isDisabled />
                </L.Dd>
              </>
            ))}
            <L.Dt>
              <L.Label>
                Вид документа
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.DropDownSelect
                className="width-50"
                data={[
                  'Первый вид',
                  'Второй вид'
                ]}
              />
            </L.Dd>
          </L.Dl>
        </L.Div>
        <L.Div className="toolbar padding-x-32 margin-top-auto margin-x-32-negative txt-right">
          <L.Button
            className="margin-left-32"
            onClick={() => history.push('/contracts-list/contract-item/contract-payment')}
          >
            Назад
          </L.Button>
          <L.Button
            className="margin-left-24 success"
            onClick={() => history.push('/contracts-list/contract-item/contract-payment/payment-step-2')}
          >
            Далее
          </L.Button>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
