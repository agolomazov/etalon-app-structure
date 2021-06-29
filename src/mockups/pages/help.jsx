import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup главной страницы
 * @example
 * <MainPage />
 */
export const Help = () => {

  const [activeKey, setActiveKey] = React.useState();
  const [isQuestionOpen1, setIsQuestionOpen1] = React.useState(false);
  const [isQuestionOpen2, setIsQuestionOpen2] = React.useState(false);
  const [isQuestionOpen3, setIsQuestionOpen3] = React.useState(false);
  const [isQuestionOpen4, setIsQuestionOpen4] = React.useState(false);
  const [isMoreQuestion, setIsMoreQuestion] = React.useState(false);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Помощь</L.H1>
        </L.Div>
      </L.Div>
      <L.Div className="page-content page-main inner-32">
        <L.Div className="page-wrapper margin-right-32">
          <L.Div className="flex-row margin-bottom-12">
            <L.H6 className="line-height-1">
              Быстрые ответы
            </L.H6>
            <Link to="#" download className="margin-left-auto">
              <L.I className="novicon-doc-list margin-right-8" />
              Руководство пользователя
            </Link>
          </L.Div>
          <L.Div className="page-wrapper-md">
            <L.Collapse
              isAccordion
              activePanelKey={activeKey}
              onSelect={(ev) => setActiveKey(ev.component.value)}
            >
              <L.Collapse.Panel
                panelKey="0"
                wrapperRender={
                  ({ elementProps }) => <L.Div {...elementProps} className={`question-panel margin-bottom-4 ${isQuestionOpen1 && "border"}`} />
                }
              >
                <L.Collapse.Heading
                  wrapperRender={
                    ({ elementProps }) => <L.Div {...elementProps} className={`collapse-heading-wrapper quick-view ${isQuestionOpen1 && "quick-view-selected"}`} />
                  }
                  iconRender={() => null}
                  onClick={() => setIsQuestionOpen1(!isQuestionOpen1)}
                >
                  <L.H6 className="txt-normal">
                    <L.Span className="question-num block-inline">
                      1.
                    </L.Span>
                    Зачем нужен Личный кабинет?
                  </L.H6>
                </L.Collapse.Heading>
                <L.Collapse.Body>
                  <L.Div className="question-panel-content inner-16 txt-large">
                    В&nbsp;Личном кабинете представлена вся информация по&nbsp;договорам
                    и&nbsp;арендованным объектам, обращениям в&nbsp;территориальные органы,
                    платежам, официальным уведомлениям.
                  </L.Div>
                </L.Collapse.Body>
              </L.Collapse.Panel>
              <L.Collapse.Panel
                panelKey="1"
                wrapperRender={
                  ({ elementProps }) => <L.Div {...elementProps} className={`question-panel margin-bottom-4 ${isQuestionOpen2 && "border"}`} />
                }
              >
                <L.Collapse.Heading
                  wrapperRender={
                    ({ elementProps }) => <L.Div {...elementProps} className={`collapse-heading-wrapper quick-view ${isQuestionOpen2 && "quick-view-selected"}`} />
                  }
                  iconRender={() => null}
                  onClick={() => setIsQuestionOpen2(!isQuestionOpen2)}
                >
                  <L.H6 className="txt-normal">
                    <L.Span className="question-num block-inline">
                      2.
                    </L.Span>
                    Какие функциональные возможности предусматривает сервис?
                  </L.H6>
                </L.Collapse.Heading>
                <L.Collapse.Body>
                  <L.Div className="question-panel-content inner-16 txt-large">
                    Ответ
                  </L.Div>
                </L.Collapse.Body>
              </L.Collapse.Panel>
              <L.Collapse.Panel
                panelKey="2"
                wrapperRender={
                  ({ elementProps }) => <L.Div {...elementProps} className={`question-panel margin-bottom-4 ${isQuestionOpen3 && "border"}`} />
                }
              >
                <L.Collapse.Heading
                  wrapperRender={
                    ({ elementProps }) => <L.Div {...elementProps} className={`collapse-heading-wrapper quick-view ${isQuestionOpen3 && "quick-view-selected"}`} />
                  }
                  iconRender={() => null}
                  onClick={() => setIsQuestionOpen3(!isQuestionOpen3)}
                >
                  <L.H6 className="txt-normal">
                    <L.Span className="question-num block-inline">
                      3.
                    </L.Span>
                    Что делать, если отображаются не все заключенные договора?
                  </L.H6>
                </L.Collapse.Heading>
                <L.Collapse.Body>
                  <L.Div className="question-panel-content inner-16 txt-large">
                    Ответ
                  </L.Div>
                </L.Collapse.Body>
              </L.Collapse.Panel>
            </L.Collapse>
            <L.Div className="margin-y-16 txt-center">
              <L.Button className="blank" onClick={() => setIsMoreQuestion(!isMoreQuestion)}>
                <L.I className="novicon-expand margin-right-8 txt-gray" />
                <L.Span className="txt-gray">
                  Смотреть дальше
                </L.Span>
              </L.Button>
            </L.Div>
            <L.Collapsible isOpen={isMoreQuestion}>
              <L.Collapse
                isAccordion
                activePanelKey={activeKey}
                onSelect={(ev) => setActiveKey(ev.component.value)}
              >
                <L.Collapse.Panel
                  panelKey="3"
                  wrapperRender={
                    ({ elementProps }) => <L.Div {...elementProps} className={`question-panel margin-bottom-4 ${isQuestionOpen4 && "border"}`} />
                  }
                >
                  <L.Collapse.Heading
                    wrapperRender={
                      ({ elementProps }) => <L.Div {...elementProps} className={`collapse-heading-wrapper quick-view ${isQuestionOpen4 && "quick-view-selected"}`} />
                    }
                    iconRender={() => null}
                    onClick={() => setIsQuestionOpen4(!isQuestionOpen4)}
                  >
                    <L.H6 className="txt-normal">
                      <L.Span className="question-num block-inline">
                        4.
                      </L.Span>
                      Вопрос номер четыре?
                    </L.H6>
                  </L.Collapse.Heading>
                  <L.Collapse.Body>
                    <L.Div className="question-panel-content inner-16 txt-large">
                      Ответ
                    </L.Div>
                  </L.Collapse.Body>
                </L.Collapse.Panel>
              </L.Collapse>
            </L.Collapsible>
          </L.Div>
          <L.H6 className="margin-y-24">
            В Личном кабинете у каждого Арендатора есть возможность:
          </L.H6>
          <L.Ul className="list">
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
                Узнать сводную информацию по заключенным договорам и объектам аренды
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Получить информацию по графику предстоящих платежей по договорам в сервисе Календарь
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Произвести оплату начислений, пени и задолженностей онлайн или сформировать квитанции для оплаты
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Произвести выгрузку платежных поручений в формат xml для последующей загрузки в 1С
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Оформить заявление на распоряжение переплатой по договорам аренды
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Запросить акт сверки взаимных расчетов по договорам
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Оформить заявление на внесение изменений в реквизиты своего юридического лица по договору
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Запросить внесение изменений в характеристики арендованных объектов в электронной форме
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Оформить нетипизированный запрос в территориальный орган Росимущества в электронной форме
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Оформить заявление на получение юридически значимых документов
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Оформить жалобу на акты или действия должностных лиц или территориальных органов Росимущества
            </L.Li>
            <L.Li className="margin-bottom-24">
              <L.I className="novicon-success margin-right-12 txt-gray" />
              Оценить качество предоставления услуг
            </L.Li>
          </L.Ul>
        </L.Div>
        <L.Aside className="aside-main">
          <L.Div className="aside-main-item inner-24 margin-bottom-32">
            <L.Img
              className="margin-bottom-12"
              src="https://cdn.esphere.ru/images/ri/gear.svg"
              alt="Технические проблемы"
            />
            <L.H5 className="margin-bottom-12">
              Возникли технические проблемы?
            </L.H5>
            <L.P className="padding-bottom-24">
              Заполните обращение в случае неработоспособности сервиса
            </L.P>
            <Link to="/help/support" className="button default">
              Служба поддержки
            </Link>
          </L.Div>
        </L.Aside>
      </L.Div>

    </MainLayout>
  );
};