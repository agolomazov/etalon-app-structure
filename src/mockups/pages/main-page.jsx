import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';
import { ConfirmationOfReceipt } from '@mockups-components/dialogs';

/**
 * ## Mockup главной страницы
 * @example
 * <MainPage />
 */
export const MainPage = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <MainLayout>
      <L.Div className="page-content page-main inner-32">
        <L.Div className="page-wrapper margin-right-32">
          <L.Div className="card margin-bottom-16">
            <L.Div className="card-main-header flex-column padding-top-32 padding-x-32 padding-bottom-24">
              <L.Div className="tag-custom danger align-self-start txt-large">
                У вас есть задолженность!
              </L.Div>
              <L.H5 className="padding-top-8 txt-normal">
                17 Марта 2020
              </L.H5>
              <L.Div className="flex-row padding-top-32 margin-top-auto">
                <L.H5 className="align-self-end line-height-1">
                  Всего к оплате
                </L.H5>
                <L.H1 className="title-main margin-left-auto line-height-1">
                  <L.RUB>
                    50 000 000.00₽
                  </L.RUB>
                </L.H1>
              </L.Div>
            </L.Div>
            <L.Div className="padding-x-32">
              <L.Div className="flex-row align-items-center padding-y-16 border-bottom">
                <L.Div>
                  <L.H5 className="block-inline margin-right-12 line-height-1 txt-danger">
                    Задолженность
                  </L.H5>
                  <L.Span className="block-inline txt-gray">
                    с учетом пени 2 000 000.00 ₽
                  </L.Span>
                </L.Div>
                <L.H2 className="title-main-secondary margin-left-auto txt-danger">
                  <L.RUB>
                    30 000 000.00
                  </L.RUB>
                </L.H2>
              </L.Div>
              <L.Div className="flex-row align-items-center padding-y-16 border-bottom-dashed border-bottom-dashed-md">
                <L.Div>
                  <L.H5 className="block-inline margin-right-12 line-height-1">
                    К оплате в этом периоде
                  </L.H5>
                  <L.Span className="block-inline txt-gray">
                    начисление по 4 договорам
                  </L.Span>
                </L.Div>
                <L.H2 className="title-main-secondary margin-left-auto">
                  <L.RUB>
                    20 000 000.00
                  </L.RUB>
                </L.H2>
              </L.Div>
              <L.Div className="flex-row align-items-center padding-y-16">
                <L.Span className="subtitle">
                  Возможна частичная оплата
                </L.Span>
                <L.Button className="success margin-left-auto">
                  Оплатить
                </L.Button>
              </L.Div>
            </L.Div>
          </L.Div>
        </L.Div>
        <L.Aside className="aside-main">
          <L.Div className="aside-main-item calendar-main calendar-wrapper inner-24 margin-bottom-32">
            <L.Div className="calendar-nav">
              <L.Span className="calendar-prev-button">
                <L.I className="calendar-prev-icon" />
              </L.Span>
              <L.Span className="calendar-title">
                Май 2020
              </L.Span>
              <L.Span className="calendar-next-button">
                <L.I className="calendar-next-icon" />
              </L.Span>
            </L.Div>
            <L.Div className="calendar-week-days">
              <L.Div className="calendar-date-cell">Пн</L.Div>
              <L.Div className="calendar-date-cell">Вт</L.Div>
              <L.Div className="calendar-date-cell">Ср</L.Div>
              <L.Div className="calendar-date-cell">Чт</L.Div>
              <L.Div className="calendar-date-cell">Пт</L.Div>
              <L.Div className="calendar-date-cell">Сб</L.Div>
              <L.Div className="calendar-date-cell">Вс</L.Div>
            </L.Div>
            <L.Div className="calendar-month-dates">
              <L.Div className="calendar-dates-row">
                <L.Div className="calendar-date-cell disabled-date">27</L.Div>
                <L.Div className="calendar-date-cell disabled-date">28</L.Div>
                <L.Div className="calendar-date-cell disabled-date">29</L.Div>
                <L.Div className="calendar-date-cell disabled-date">30</L.Div>
                <L.Div className="calendar-date-cell disabled-date">1</L.Div>
                <L.Div className="calendar-date-cell disabled-date day-off">2</L.Div>
                <L.Div className="calendar-date-cell disabled-date day-off">3</L.Div>
              </L.Div>
              <L.Div className="calendar-dates-row">
                <L.Div className="calendar-date-cell disabled-date">4</L.Div>
                <L.Div className="calendar-date-cell disabled-date">5</L.Div>
                <L.Div className="calendar-date-cell danger">
                  6
                  <L.Div className="calendar-tooltip padding-top-16">
                    <L.Div className="padding-x-16 margin-bottom-12 txt-gray">
                      Срок оплаты по договору:
                    </L.Div>
                    <L.Ul className="margin-bottom-16">
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                    </L.Ul>
                    <L.Div className="calendar-tooltip-footer flex-row align-items-center padding-y-16 margin-x-16 margin-top-8 border-top">
                      Всего к оплате:
                      &nbsp;
                      <L.RUB>
                        43 460
                      </L.RUB>‬
                      <L.Button className="success margin-left-auto">
                        Оплатить
                      </L.Button>
                    </L.Div>
                  </L.Div>
                </L.Div>
                <L.Div className="calendar-date-cell disabled-date">7</L.Div>
                <L.Div className="calendar-date-cell disabled-date">8</L.Div>
                <L.Div className="calendar-date-cell disabled-date day-off">9</L.Div>
                <L.Div className="calendar-date-cell disabled-date day-off">10</L.Div>
              </L.Div>
              <L.Div className="calendar-dates-row">
                <L.Div className="calendar-date-cell">11</L.Div>
                <L.Div className="calendar-date-cell">12</L.Div>
                <L.Div className="calendar-date-cell">13</L.Div>
                <L.Div className="calendar-date-cell">14</L.Div>
                <L.Div className="calendar-date-cell">15</L.Div>
                <L.Div className="calendar-date-cell day-off">16</L.Div>
                <L.Div className="calendar-date-cell day-off">17</L.Div>
              </L.Div>
              <L.Div className="calendar-dates-row">
                <L.Div className="calendar-date-cell">18</L.Div>
                <L.Div className="calendar-date-cell">19</L.Div>
                <L.Div className="calendar-date-cell">20</L.Div>
                <L.Div className="calendar-date-cell warning">
                  21
                  <L.Div className="calendar-tooltip padding-top-16">
                    <L.Div className="padding-x-16 margin-bottom-12 txt-gray">
                      Срок оплаты по договору:
                    </L.Div>
                    <L.Ul className="margin-bottom-16">
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                      <L.Li className="calendar-tooltip-date padding-x-16 padding-y-4 margin-bottom-8">
                        №17/ЗД-0501 от 14.05.2019
                      </L.Li>
                    </L.Ul>
                    <L.Span className="padding-x-16 txt-gray">
                      ... ещё 45
                    </L.Span>
                    <L.Div className="calendar-tooltip-footer flex-row align-items-center padding-y-16 margin-x-16 margin-top-8 border-top">
                      Всего к оплате:
                      &nbsp;
                      <L.RUB>
                        43 460
                      </L.RUB>‬
                      <L.Button className="success margin-left-auto">
                        Оплатить
                      </L.Button>
                    </L.Div>
                  </L.Div>
                </L.Div>
                <L.Div className="calendar-date-cell">22</L.Div>
                <L.Div className="calendar-date-cell day-off">23</L.Div>
                <L.Div className="calendar-date-cell day-off">24</L.Div>
              </L.Div>
              <L.Div className="calendar-dates-row">
                <L.Div className="calendar-date-cell">25</L.Div>
                <L.Div className="calendar-date-cell">26</L.Div>
                <L.Div className="calendar-date-cell">27</L.Div>
                <L.Div className="calendar-date-cell">28</L.Div>
                <L.Div className="calendar-date-cell">29</L.Div>
                <L.Div className="calendar-date-cell day-off">30</L.Div>
                <L.Div className="calendar-date-cell day-off">31</L.Div>
              </L.Div>
              <L.Div className="calendar-dates-row">
                <L.Div className="calendar-date-cell different-month-date">1</L.Div>
                <L.Div className="calendar-date-cell different-month-date">2</L.Div>
                <L.Div className="calendar-date-cell different-month-date">3</L.Div>
                <L.Div className="calendar-date-cell different-month-date">4</L.Div>
                <L.Div className="calendar-date-cell different-month-date">5</L.Div>
                <L.Div className="calendar-date-cell different-month-date">6</L.Div>
                <L.Div className="calendar-date-cell different-month-date">7</L.Div>
              </L.Div>
            </L.Div>
          </L.Div>
          <L.Div className="aside-main-item inner-24 margin-bottom-32">
            <L.Div className="flex-row align-items-center padding-bottom-16 border-bottom">
              Входящие документы
              <L.Img
                src="https://cdn.esphere.ru/images/nova/icons/mail.svg"
                className="margin-left-auto"
                alt="Входящие документы"
              />
            </L.Div>
            <L.Div className="margin-top-16 margin-bottom-8 txt-gray">
              15.02.2020 в 20:20
            </L.Div>
            <L.H6 className="margin-bottom-8">
              Уведомление об изменении арендной платы
            </L.H6>
            <L.Div className="margin-bottom-8">
              Со второго квартала 2020 года, будут изменены условия.
            </L.Div>
            <L.Div className="inner-12 secondary flex-row align-items-center margin-bottom-24">
              <L.I className="novicon-doc-list margin-right-12 txt-gray" />
              <L.A
                href="#"
                download
                className="width-100 padding-right-12 txt-nowrap"
              >
                Имя_файла
              </L.A>
              <L.Span className="txt-gray">
                10&nbsp;мб
              </L.Span>
            </L.Div>
            <L.Div className="flex-row justify-content-end">
              <L.Div className="dot active" />
              <L.Div className="dot" />
              <L.Div className="dot" />
            </L.Div>
          </L.Div>
          <L.Div className="aside-main-item inner-24">
            <Link to="/contracts-list" className="flex-row padding-bottom-16 txt-black border-bottom">
              <L.Img
                src="https://cdn.esphere.ru/images/nova/icons/mail.svg"
                className="margin-right-24"
                alt="Договоры"
              />
              <L.Div className="flex-row align-items-end">
                <L.H2 className="line-height-1 margin-right-8">
                  4
                </L.H2>
                <L.Span className="line-height-1 txt-bold">
                  договора
                </L.Span>
              </L.Div>
            </Link>
            <Link to="/objects-list" className="flex-row padding-top-16 txt-black">
              <L.Img
                src="https://cdn.esphere.ru/images/nova/icons/escrow-fl.svg"
                className="margin-right-24"
                alt="Объекты"
              />
              <L.Div className="flex-row align-items-end">
                <L.H2 className="line-height-1 margin-right-8">
                  4
                </L.H2>
                <L.Span className="line-height-1 txt-bold">
                  объекта
                </L.Span>
              </L.Div>
            </Link>
          </L.Div>
        </L.Aside>
      </L.Div>

      <ConfirmationOfReceipt
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </MainLayout>
  );
};
