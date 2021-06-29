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
export const ContractItem = () => {
  const history = useHistory();
  const [selected, setSelected] = React.useState(2);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/contracts-list"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>
            Договор №121133
            {' '}
            <L.Span className="txt-gray">
              от 21.05.2013
            </L.Span>
          </L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <L.Div className="page-wrapper">
          <L.Div className="page-wrapper-md">
            <L.Div className="message warning inner-12 margin-bottom-16">
              <L.I className="novicon-exclamation-in-circle-fill txt-warning padding-right-8" />
              Платеж на сумму
              {' '}
              <L.RUB>1 000 000.00</L.RUB>
              {' '}
              находится в обработке
            </L.Div>
          </L.Div>
          <L.Div className="card card-danger padding-x-32 padding-y-16 margin-bottom-8">
            <L.H6 className="padding-bottom-16">
              г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
            </L.H6>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8 txt-danger border-bottom-dashed">
                Задолженность
                <L.H6 className="flex-row align-items-center margin-left-auto">
                  <L.RUB>5 500 000.00</L.RUB>
                </L.H6>
              </L.Div>
              <L.Div className="flex-row align-items-center padding-y-8 txt-danger border-bottom-dashed">
                Пени
                <L.H6 className="flex-row align-items-center margin-left-auto">
                  <L.RUB>600 000.00</L.RUB>
                </L.H6>
              </L.Div>
              <L.Div className="flex-row align-items-center padding-y-8 border-bottom-dashed">
                Начислено за текущий месяц
                <L.Span className="margin-left-16 txt-gray">оплатить до 05.03.2020</L.Span>
                <L.H6 className="flex-row align-items-center margin-left-auto">
                  <L.RUB>5 500 000.00</L.RUB>
                </L.H6>
              </L.Div>
              <L.Div className="flex-row flex-wrap align-items-center padding-top-16">
                <Link to="#" download>
                  <L.I className="novicon-doc-list margin-right-8" />
                  Сформировать квитанцию
                </Link>
                <Link to="#" download className="margin-left-32">
                  <L.I className="novicon-upload margin-right-8" />
                  Выгрузка 1С
                </Link>
                <L.Div className="margin-left-auto">
                  <L.Span className="txt-small txt-gray">
                    Платеж будет учтен в течение 10 дней после совершения оплаты
                  </L.Span>
                  <L.Button
                    className="success margin-left-24"
                    onClick={() => history.push('/contracts-list/contract-item/contract-payment')}
                  >
                    Оплатить
                  </L.Button>
                </L.Div>
              </L.Div>
            </L.Div>
          </L.Div>

          <L.Div className="page-wrapper">
            <L.Tabs
              activeTabKey={selected}
              className="tabs-wrapper-nav padding-top-32 margin-top-24"
              onChange={ev => setSelected(ev.component.value)}
            >
              <L.Tab title="История платежей" tabKey={0}>
                <L.Div className="table">
                  <L.Table>
                    <L.ColGroup>
                      <L.Col width="36px" />
                      <L.Col width="27%" />
                      <L.Col width="22%" />
                      <L.Col />
                      <L.Col width="20%" />
                    </L.ColGroup>
                    <L.THead>
                      <L.Tr>
                        <L.Th className="table-header txt-gray" />
                        <L.Th className="table-header txt-gray">
                          Дата поступления платежа
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Платежное поручение
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Дата платежного поручения
                        </L.Th>
                        <L.Th className="table-header txt-gray txt-right">
                          Сумма
                        </L.Th>
                      </L.Tr>
                    </L.THead>
                    <L.TBody>
                      <L.Tr>
                        <L.Td>
                          <L.I className="novicon-success-fill txt-success" />
                        </L.Td>
                        <L.Td>
                          29.05.2020
                        </L.Td>
                        <L.Td>
                          <L.Span className="txt-gray">
                            №
                          </L.Span>
                          279
                        </L.Td>
                        <L.Td>
                          29.05.2020
                        </L.Td>
                        <L.Td className="txt-right">
                          <L.RUB>10 000.00</L.RUB>
                        </L.Td>
                      </L.Tr>
                      <L.Tr>
                        <L.Td>
                          <L.I className="novicon-success-fill txt-success" />
                        </L.Td>
                        <L.Td>
                          19.05.2020
                        </L.Td>
                        <L.Td>
                          <L.Span className="txt-gray">
                            №
                          </L.Span>
                          278
                        </L.Td>
                        <L.Td>
                          19.05.2020
                        </L.Td>
                        <L.Td className="txt-right">
                          <L.RUB>10 000.00</L.RUB>
                        </L.Td>
                      </L.Tr>
                    </L.TBody>
                  </L.Table>
                  <L.Pagination
                    totalItems={50}
                    itemsRangeInfoRender={() => null}
                  />
                </L.Div>
              </L.Tab>

              <L.Tab title="Начисления" tabKey={1}>
                <L.Div className="table">
                  <L.Table>
                    <L.ColGroup>
                      <L.Col width="30%" />
                      <L.Col width="22%" />
                      <L.Col />
                      <L.Col width="20%" />
                    </L.ColGroup>
                    <L.THead>
                      <L.Tr>
                        <L.Th className="table-header txt-gray">
                          Дата выставления
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Тип начисления
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Период начисления
                        </L.Th>
                        <L.Th className="table-header txt-gray txt-right">
                          Сумма
                        </L.Th>
                      </L.Tr>
                    </L.THead>
                    <L.TBody>
                      <L.Tr>
                        <L.Td>
                          29.05.2020
                        </L.Td>
                        <L.Td>
                          Аренда
                        </L.Td>
                        <L.Td>
                          с 20.05.2020 по 19.06.2020
                        </L.Td>
                        <L.Td className="txt-right">
                          <L.RUB>10 000.00</L.RUB>
                        </L.Td>
                      </L.Tr>
                      <L.Tr>
                        <L.Td>
                          29.05.2020
                        </L.Td>
                        <L.Td>
                          Пени
                        </L.Td>
                        <L.Td>
                          с 20.05.2020 по 19.06.2020
                        </L.Td>
                        <L.Td className="txt-right">
                          <L.RUB>1 000.00</L.RUB>
                        </L.Td>
                      </L.Tr>
                    </L.TBody>
                  </L.Table>
                  <L.Pagination
                    totalItems={50}
                    itemsRangeInfoRender={() => null}
                  />
                </L.Div>
              </L.Tab>

              <L.Tab title="Подробнее о договоре" tabKey={2}>
                <L.Div className="margin-bottom-12 txt-uppercase txt-small txt-gray">
                  Информация по договору
                </L.Div>
                <L.Dl className="list w-30 padding-bottom-16 margin-bottom-24">
                  <L.Dt>
                    Договор
                  </L.Dt>
                  <L.Dd>
                    №121133
                  </L.Dd>
                  <L.Dt>
                    Срок действия договора
                  </L.Dt>
                  <L.Dd>
                    <L.I className="novicon-datepicker margin-right-12 txt-gray" />
                    21.05.2020 - 15.01.2022
                  </L.Dd>
                  <L.Dt>
                    Тип договора
                  </L.Dt>
                  <L.Dd>
                    Договор аренды земли
                  </L.Dd>
                  <L.Dt>
                    КБК
                  </L.Dt>
                  <L.Dd>
                    167 1 11 05021 01 6000 120
                  </L.Dd>
                  <L.Dt>
                    Ставка годовой арендной платы
                  </L.Dt>
                  <L.Dd>
                    <L.RUB>20 231.00</L.RUB>
                  </L.Dd>
                  <L.Dt>
                    Порядок начисления аренды
                  </L.Dt>
                  <L.Dd>
                    Ежемесячно
                  </L.Dd>
                  <L.Dt>
                    Дата следующей оплаты
                  </L.Dt>
                  <L.Dd>
                    <L.I className="novicon-datepicker margin-right-12 txt-gray" />
                    17.06.2020
                  </L.Dd>
                  <L.Dt>
                    Ставка по пеням
                  </L.Dt>
                  <L.Dd>
                    0,05%
                  </L.Dd>
                </L.Dl>

                <L.Div className="margin-bottom-12 txt-uppercase txt-small txt-gray">
                  Информация об арендодателе
                </L.Div>
                <L.Dl className="list w-30 padding-bottom-16 margin-bottom-24">
                  <L.Dt>
                    Наименование арендодателя
                  </L.Dt>
                  <L.Dd>
                    Территориальное управление Росимуществом  в г. Москве
                  </L.Dd>
                  <L.Dt>
                    Юридический адрес
                  </L.Dt>
                  <L.Dd>
                    Большой Сампсониевский, 68
                  </L.Dd>
                  <L.Dt>
                    ИНН
                  </L.Dt>
                  <L.Dd>
                    4640915116
                  </L.Dd>
                  <L.Dt>
                    КПП
                  </L.Dt>
                  <L.Dd>
                    901201452
                  </L.Dd>
                  <L.Dt>
                    Почта
                  </L.Dt>
                  <L.Dd>
                    contract@mail.ru
                  </L.Dd>
                </L.Dl>

                <L.Div className="margin-bottom-12 txt-uppercase txt-small txt-gray">
                  Информация по объекту
                </L.Div>
                <L.Dl className="list w-30 padding-bottom-16 margin-bottom-24">
                  <L.Dt>
                    Тип
                  </L.Dt>
                  <L.Dd>
                    Земельный участок
                  </L.Dd>
                  <L.Dt>
                    Адрес
                  </L.Dt>
                  <L.Dd>
                    г.Москва, площадь Васильевский спуск от Красной площади до Кремлевской
                  </L.Dd>
                  <L.Dt>
                    Кадастровый номер
                  </L.Dt>
                  <L.Dd>
                    47:14:1203001:814
                  </L.Dd>
                  <L.Dt>
                    Площадь по договору
                  </L.Dt>
                  <L.Dd>
                    34 434 м<sup>2</sup>
                  </L.Dd>
                </L.Dl>
              </L.Tab>

              <L.Tab title="Подробнее об объекте" tabKey={3}>
                <L.Div className="message warning block-inline inner-12 margin-bottom-16">
                  <L.I className="novicon-exclamation-in-circle-fill txt-warning padding-right-8" />
                  Отсутствует информация по объектам.
                  {' '}
                  <L.A href="">
                    Сообщить о неточности
                  </L.A>
                </L.Div>
                <L.Div className="table">
                  <L.Table>
                    <L.ColGroup>
                      <L.Col width="40%" />
                      <L.Col width="17%" />
                      <L.Col />
                      <L.Col width="25%" />
                    </L.ColGroup>
                    <L.THead>
                      <L.Tr>
                        <L.Th className="table-header txt-gray">
                          Адрес
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Кадастровый номер
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Площадь
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Тип
                        </L.Th>
                      </L.Tr>
                    </L.THead>
                    <L.TBody>
                      <L.Tr>
                        <L.Td>
                          г.Санкт-Петербург, Большой Сампсониевский проспект, 68
                        </L.Td>
                        <L.Td>
                          78:34:0004418:61
                        </L.Td>
                        <L.Td>
                          3 032 кв. м
                        </L.Td>
                        <L.Td>
                          Земельный  участок
                        </L.Td>
                      </L.Tr>
                      <L.Tr>
                        <L.Td>
                          г.Санкт-Петербург, Большой Сампсониевский проспект, 68
                        </L.Td>
                        <L.Td>
                          78:34:0004418:61
                        </L.Td>
                        <L.Td>
                          3 032 кв. м
                        </L.Td>
                        <L.Td>
                          Земельный  участок
                        </L.Td>
                      </L.Tr>
                    </L.TBody>
                  </L.Table>
                  <Link
                    to="/situations-list/situation-change-rent-info"
                    className="margin-top-16"
                  >
                    Внести изменения
                    <L.Tooltip
                      title={
                        <>
                          Сообщите об изменении характеристик арендованных объектов при необходимости
                          <br />
                          (Адрес, площадь, назначение, категория, вид разрешенного использования)
                        </>
                      }
                      position="top"
                    >
                      <L.I className="novicon-question txt-gray margin-left-8" />
                    </L.Tooltip>
                  </Link>
                  <L.Pagination
                    totalItems={50}
                    itemsRangeInfoRender={() => null}
                  />
                </L.Div>
              </L.Tab>

              <L.Tab
                tabKey={4}
                tabRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    Связанные документы
                    <L.Span className="count warning flex-row align-items-center justify-content-center">
                      1
                    </L.Span>
                  </Element>
                )}
              >
                <L.Div className="table">
                  <L.Table>
                    <L.ColGroup>
                      <L.Col width="36px" />
                      <L.Col width="15%" />
                      <L.Col />
                      <L.Col width="25%" />
                    </L.ColGroup>
                    <L.THead>
                      <L.Tr>
                        <L.Th className="table-header txt-gray" />
                        <L.Th className="table-header txt-gray">
                          Дата
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Тема
                        </L.Th>
                        <L.Th className="table-header txt-gray">
                          Статус
                        </L.Th>
                      </L.Tr>
                    </L.THead>
                    <L.TBody>
                      <L.Tr className="pointer">
                        <L.Td>
                          <L.I className="novicon-paper-clip txt-gray" />
                        </L.Td>
                        <L.Td className="txt-bold">
                          21.02.2020 в 11:40
                        </L.Td>
                        <L.Td className="txt-bold">
                          Дополнительное соглашение об изменение арендной платы
                        </L.Td>
                        <L.Td>
                          <L.Span className="tag warning">
                            Требует подписи
                          </L.Span>
                        </L.Td>
                      </L.Tr>
                      <L.Tr className="pointer">
                        <L.Td>
                          <L.I className="novicon-paper-clip txt-gray" />
                        </L.Td>
                        <L.Td>
                          20.02.2020 в 20:20
                        </L.Td>
                        <L.Td>
                          Отсутствует платеж по договору аренды
                        </L.Td>
                        <L.Td>
                          <L.Span className="tag info">
                            Дан промежуточный ответ
                          </L.Span>
                        </L.Td>
                      </L.Tr>
                      <L.Tr className="pointer">
                        <L.Td>
                          <L.I className="novicon-paper-clip txt-gray" />
                        </L.Td>
                        <L.Td>
                          19.01.2020 в 12:30
                        </L.Td>
                        <L.Td>
                          Жалобы на акты, действия / бездействия должностных лиц
                        </L.Td>
                        <L.Td>
                          <L.Span className="tag success">
                            Итоговый ответ
                          </L.Span>
                        </L.Td>
                      </L.Tr>
                    </L.TBody>
                  </L.Table>
                </L.Div>
              </L.Tab>
            </L.Tabs>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
