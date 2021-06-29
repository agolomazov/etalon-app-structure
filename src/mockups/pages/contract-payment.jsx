import React from 'react';
import * as L from 'korus-ui';
import {
  Link,
  useHistory,
} from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы Карточка договора
 * @example
 * <ContractItem />
 */
export const ContractPayment = () => {
  const [selected1, setSelected1] = React.useState(0);
  const [selected2, setSelected2] = React.useState(0);
  const [selected3, setSelected3] = React.useState(0);

  const [isChecked1, setIsChecked1] = React.useState(true);
  const [isChecked2, setIsChecked2] = React.useState(true);
  const [isChecked3, setIsChecked3] = React.useState(true);
  const [isChecked4, setIsChecked4] = React.useState(true);
  const [isPayment, setIsPayment] = React.useState('payment-1');

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
            Оплата
          </L.H1>
        </L.Div>
        <L.Div className="subtitle margin-left-32">
          Договор №17/ЗД-0500 от 14.05.2019
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <L.Div className="page-wrapper">
          <L.Tabs
            activeTabKey={selected1}
            className="tabs-wrapper-nav padding-top-16 padding-bottom-32 margin-bottom-32"
            onChange={ev => setSelected1(ev.component.value)}
          >
            <L.Tab title="Через Личный кабинет" tabKey={0}>
              <L.Tabs
                activeTabKey={selected2}
                className="tabs-wrapper-bordered"
                onChange={ev => setSelected2(ev.component.value)}
              >
                <L.Tab title="Аренда земли" tabKey={0}>
                  <L.Div className="table">
                    <L.Table>
                      <L.ColGroup>
                        <L.Col width="50px" />
                        <L.Col width="40%" />
                        <L.Col width="40%" />
                        <L.Col />
                      </L.ColGroup>
                      <L.THead>
                        <L.Tr>
                          <L.Th className="table-header txt-gray" />
                          <L.Th className="table-header txt-gray">
                            Период начисления
                          </L.Th>
                          <L.Th className="table-header txt-gray">
                            УИН
                          </L.Th>
                          <L.Th className="table-header txt-gray txt-right">
                            Сумма
                          </L.Th>
                        </L.Tr>
                      </L.THead>
                      <L.TBody>
                        <L.Tr>
                          <L.Td>
                            <L.CheckBox
                              className="checkbox-single"
                              value={isChecked1}
                              onClick={() => setIsChecked1(!isChecked1)}
                            />
                          </L.Td>
                          <L.Td>
                            с 01.08.2020 по 31.08.2020
                          </L.Td>
                          <L.Td>
                            16703162894200034352
                          </L.Td>
                          <L.Td className="txt-right">
                            <L.RUB>10 000.00</L.RUB>
                          </L.Td>
                        </L.Tr>
                        <L.Tr>
                          <L.Td>
                            <L.CheckBox
                              className="checkbox-single"
                              value={isChecked2}
                              onClick={() => setIsChecked2(!isChecked2)}
                            />
                          </L.Td>
                          <L.Td>
                            с 01.08.2020 по 31.08.2020
                          </L.Td>
                          <L.Td>
                            <L.Span className="txt-light-gray">
                              Отсутствует
                            </L.Span>
                          </L.Td>
                          <L.Td className="txt-right">
                            <L.RUB>10 000.00</L.RUB>
                          </L.Td>
                        </L.Tr>
                        <L.Tr>
                          <L.Td>
                            <L.CheckBox
                              className="checkbox-single"
                              value={isChecked3}
                              onClick={() => setIsChecked3(!isChecked3)}
                            />
                          </L.Td>
                          <L.Td>
                            <L.Span className="txt-light-gray">
                              Период не заполнен
                            </L.Span>
                          </L.Td>
                          <L.Td>
                            <L.Span className="txt-light-gray">
                              Отсутствует
                            </L.Span>
                          </L.Td>
                          <L.Td className="txt-right">
                            <L.RUB>10 000.00</L.RUB>
                          </L.Td>
                        </L.Tr>
                      </L.TBody>
                    </L.Table>
                  </L.Div>
                </L.Tab>
                <L.Tab title="Пени за аренду земли" tabKey={1} />
              </L.Tabs>
            </L.Tab>

            <L.Tab
              tabKey={1}
              tabRender={({ Element, elementProps }) => (
                <Element {...elementProps}>
                  <L.Tooltip
                    title="На&nbsp;ЕПГУ возможна оплата только начислений с&nbsp;УИН.
                    Оплата осуществляется отдельно по&nbsp;каждому начислению."
                  >
                    Через ЕПГУ
                  </L.Tooltip>
                </Element>
              )}
            >
              <L.Tabs
                activeTabKey={selected3}
                className="tabs-wrapper-bordered"
                onChange={ev => setSelected3(ev.component.value)}
              >
                <L.Tab title="Аренда земли" tabKey={0}>
                  <L.Div className="table">
                    <L.Table>
                      <L.ColGroup>
                        <L.Col width="50px" />
                        <L.Col width="40%" />
                        <L.Col width="40%" />
                        <L.Col />
                      </L.ColGroup>
                      <L.THead>
                        <L.Tr>
                          <L.Th className="table-header txt-gray" />
                          <L.Th className="table-header txt-gray">
                            Период начисления
                          </L.Th>
                          <L.Th className="table-header txt-gray">
                            УИН
                          </L.Th>
                          <L.Th className="table-header txt-gray txt-right">
                            Сумма
                          </L.Th>
                        </L.Tr>
                      </L.THead>
                      <L.TBody>
                        <L.Tr>
                          <L.Td>
                            <L.RadioGroup
                              value={isPayment}
                              onChange={(ev) => setIsPayment(ev.component.value)}
                            >
                              <L.RadioButton value="payment-1" />
                            </L.RadioGroup>
                          </L.Td>
                          <L.Td>
                            с 01.08.2020 по 31.08.2020
                          </L.Td>
                          <L.Td>
                            16703162894200034352
                          </L.Td>
                          <L.Td className="txt-right">
                            <L.RUB>10 000.00</L.RUB>
                          </L.Td>
                        </L.Tr>
                        <L.Tr>
                          <L.Td>
                            <L.RadioGroup
                              value={isPayment}
                              onChange={(ev) => setIsPayment(ev.component.value)}
                            >
                              <L.RadioButton value="payment-2" isDisabled />
                            </L.RadioGroup>
                          </L.Td>
                          <L.Td>
                            <L.Tooltip
                              title="Оплата начислений без УИН возможна посредством
                              онлайн оплаты через Личный кабинет, а&nbsp;также
                              в&nbsp;отделении банка или по&nbsp;реквизитам"
                            >
                              <L.Span className="txt-light-gray">
                                с 01.08.2020 по 31.08.2020
                              </L.Span>
                            </L.Tooltip>
                          </L.Td>
                          <L.Td>
                            <L.Span className="txt-light-gray">
                              Отсутствует
                            </L.Span>
                          </L.Td>
                          <L.Td className="txt-right">
                            <L.RUB>10 000.00</L.RUB>
                          </L.Td>
                        </L.Tr>
                        <L.Tr>
                          <L.Td>
                            <L.RadioGroup
                              value={isPayment}
                              onChange={(ev) => setIsPayment(ev.component.value)}
                            >
                              <L.RadioButton value="payment-3" isDisabled />
                            </L.RadioGroup>
                          </L.Td>
                          <L.Td>
                            <L.Tooltip
                              title="В&nbsp;начислении не&nbsp;предусмотрено указание периода"
                            >
                              <L.Span className="txt-light-gray">
                                Период не заполнен
                              </L.Span>
                            </L.Tooltip>
                          </L.Td>
                          <L.Td>
                            <L.Span className="txt-light-gray">
                              Отсутствует
                            </L.Span>
                          </L.Td>
                          <L.Td className="txt-right">
                            <L.RUB>10 000.00</L.RUB>
                          </L.Td>
                        </L.Tr>
                      </L.TBody>
                    </L.Table>
                  </L.Div>
                </L.Tab>
                <L.Tab title="Пени за аренду земли" tabKey={1} />`
              </L.Tabs>
            </L.Tab>

          </L.Tabs>

        </L.Div>
        <L.Div className="toolbar fixed flex-row align-items-center padding-x-32">
          <L.Div className="margin-right-auto" shouldRender={selected1 === 0}>
            <L.CheckBox
              className="checkbox-single"
              value={isChecked4}
              onClick={() => {
                setIsChecked1(!isChecked1)
                setIsChecked2(!isChecked2)
                setIsChecked3(!isChecked3)
                setIsChecked4(!isChecked4)
              }}
            />
            <L.Span className="margin-left-16 txt-bold">
              Выбрано 3
            </L.Span>
          </L.Div>

          <L.Div className="margin-left-auto">
            <L.Span className="padding-right-16 margin-right-32 txt-bold">
              Сумма:
              {' '}
              <L.RUB>30 000</L.RUB>
            </L.Span>
            <L.Button
              className="margin-left-32 success"
              onClick={() => history.push('/contracts-list/contract-item/contract-payment/payment-step-1')}
            >
              Отправить
            </L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
