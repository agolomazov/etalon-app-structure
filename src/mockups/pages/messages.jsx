import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

import {
  PlugInToken,
  InstallPlugin,
  Error,
  ChooseToken,
  Reject,
} from '@mockups-components/dialogs';

const messages = [
  {
    active: true,
    read: true,
    answered: false,
    date: '15.06.2020 в 11:43',
    title: 'Отсутствует платеж по договору аренды',
    statusTag: 'warning',
    statusName: 'Требует проверки',
    attachmentName: 'Длинное название в личном кабинете арендатора',
    attachmentFormat: '.pdf',
    signed: true,
  },
  {
    active: false,
    read: false,
    answered: false,
    date: '16.06.2020 в 14:34',
    title: 'Отсутствует платеж по договору аренды',
    statusTag: 'success',
    statusName: 'Запрошены документы',
    attachmentName: 'Короткое название',
    attachmentFormat: '.pdf',
    signed: false,
  },
  {
    active: false,
    read: true,
    answered: true,
    date: '21.06.2020 в 09:11',
    title: 'Отсутствует платеж по договору аренды',
    statusTag: 'warning',
    statusName: 'Запрошены документы',
    attachmentName: '1',
    attachmentFormat: '.txt',
    signed: true,
  },
  {
    active: false,
    read: true,
    answered: true,
    date: '30.06.2020 в 21:12',
    title: 'Отсутствует платеж по договору аренды',
    statusTag: 'info',
    statusName: 'Отправлено',
    attachmentName: 'Среднее название вложения',
    attachmentFormat: '.pdf',
    signed: false,
  },
];

/**
 * ## Mockup страницы Сообщения
 * @example
 * <Messages />
 */
export const Messages = () => {
  const [isRequestOpen, setIsRequestOpen] = React.useState(true);
  const [value, setValue] = React.useState(1);
  const [props, setProps] = React.useState();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Сообщения</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-left-32 padding-top-16 border-top no-background">

        <L.Div className="flex-row width-100 height-100">
          <L.Div className="message-list">
            <L.Input
              className="width-100 padding-right-32 margin-bottom-12"
              form="message"
              name="message-search"
              placeholder="Поиск"
            />
            <L.Div className="message-list-scroll-area padding-right-16">
              {messages.map(message => (
                <L.Div className={`
                  message-item
                  width-100
                  pointer
                  ${message.active ? 'active' : ''}
                `}>
                  <L.Div className="message-preview inner-12 margin-x-auto">
                    <L.Div className="margin-bottom-8 txt-gray-2">
                      <L.I className={`
                        message-preview-arrow
                        ${message.answered ? 'novicon-double-arrow-left' : 'novicon-double-arrow-right'}
                        margin-right-8
                        ${message.read ? 'txt-light-gray' : ''}
                      `} />
                      {message.date}
                    </L.Div>
                    <L.Div className="margin-bottom-8">
                      {message.title}
                    </L.Div>
                    <L.Div className={`tag ${message.statusTag} margin-bottom-12 txt-gray-2`}>
                      {message.statusName}
                    </L.Div>
                    <L.Div className="flex-inline align-items-center width-100 txt-gray">
                      <L.I className="novicon-doc-list margin-right-8 txt-gray" />
                      <L.Span className="txt-nowrap">
                        {message.attachmentName}
                      </L.Span>
                      {message.attachmentFormat}
                      &nbsp;
                      <L.Span className="shrink-0">и ещё 125 файлов</L.Span>
                      <L.I className={`
                        novicon-signed
                        padding-left-24
                        margin-left-auto
                        margin-right-4
                        ${message.signed ? 'txt-gray-2' : 'txt-light-gray'}
                      `} />
                    </L.Div>
                  </L.Div>
                </L.Div>
              ))}
            </L.Div>
          </L.Div>

          {/* Тело письма без подписания */}
          <L.Div className="message-body-scroll-area flex-column width-100 none">
            <L.Div className="padding-y-16 padding-x-32">
              <L.Div className="flex-row margin-bottom-8 txt-gray-2">
                09.06.2020 в 14:45
                <L.Div className="margin-left-auto">
                  <L.Span className="tag warning">
                    Требует ответа
                  </L.Span>
                </L.Div>
              </L.Div>
              <L.H5 className="line-height-1">
                <L.Span className="txt-normal txt-gray">
                  №23
                </L.Span>
                {' '}
                Отсутствует платеж по договору аренды
              </L.H5>

              <hr className="margin-y-24" />

              <L.Div className="flex-row align-items-center margin-bottom-4 txt-uppercase txt-small txt-gray">
                Информация по запросу
                <L.Button
                  className="blank padding-x-none margin-left-auto txt-right"
                  onClick={() => setIsRequestOpen(!isRequestOpen)}
                >
                  {isRequestOpen ? 'Свернуть' : 'Развернуть'}
                </L.Button>
              </L.Div>
              <L.Collapsible
                isOpen={isRequestOpen}
              >
                <L.Dl className="list w-30 padding-bottom-24 margin-bottom-none border-bottom">
                  <L.Dt>
                    Договор
                  </L.Dt>
                  <L.Dd>
                    <L.A>
                      №121133
                    </L.A>
                  </L.Dd>
                  <L.Dt>
                    Дата договора
                  </L.Dt>
                  <L.Dd>
                    <L.I className="novicon-datepicker margin-right-12 txt-gray" />
                    15.01.2022
                  </L.Dd>
                  <L.Dt>
                    ФИО плательщика
                  </L.Dt>
                  <L.Dd>
                    Цветкова Иванка Константиновна
                  </L.Dd>
                  <L.Dt>
                    Дата платежа
                  </L.Dt>
                  <L.Dd>
                    <L.I className="novicon-datepicker margin-right-12 txt-gray" />
                    15.01.2022
                  </L.Dd>
                  <L.Dt>
                    Сумма платежа
                  </L.Dt>
                  <L.Dd>
                    <L.RUB>20 231.00</L.RUB>
                  </L.Dd>
                  <L.Dt>
                    Период оплаты
                  </L.Dt>
                  <L.Dd>
                    Месяц
                  </L.Dd>
                  <L.Dt>
                    Подтверждающий документ
                  </L.Dt>
                  <L.Dd>
                    <L.A className="flex-row secondary padding-x-16 padding-y-12 margin-right-8 margin-bottom-8" href="file.pdf" download>
                      <L.I className="novicon-doc-list margin-right-12 txt-gray" />
                      <L.Span className="txt-nowrap">
                        file
                      </L.Span>
                      .pdf
                      <L.Span className="shrink-0 padding-left-24 margin-left-auto txt-gray">
                        12 мб
                      </L.Span>
                    </L.A>
                  </L.Dd>
                  <L.Dt>
                    Комментарий
                  </L.Dt>
                  <L.Dd>
                    В ЛК не видим оплаты за прошлый месяц, прикладываем файл с выпиской по карте.
                  </L.Dd>
                </L.Dl>
              </L.Collapsible>

              <L.Div className="padding-top-24 padding-bottom-16 border-bottom">
                <L.P className="block-inline margin-right-12 txt-bold">
                  Росимущество
                </L.P>
                <L.Span className="txt-gray">
                  10.06.2020 в 20:20
                </L.Span>
                <L.Div className="margin-bottom-16">
                  На основании Вашего запроса была проведена проверка, результаты в приложенном файле.
                </L.Div>
                <L.A className="flex-row secondary padding-x-16 padding-y-12 margin-right-8 margin-bottom-8" href="file.pdf" download>
                  <L.I className="novicon-doc-list margin-right-12 txt-gray" />
                  <L.Span className="txt-nowrap">
                    file
                  </L.Span>
                  .pdf
                  <L.Span className="shrink-0 padding-left-24 margin-left-auto txt-gray">
                    12 мб
                  </L.Span>
                </L.A>
              </L.Div>

              <L.Div className="padding-top-24 padding-bottom-16 border-bottom">
                <L.P className="block-inline margin-right-12 txt-bold">
                  Цветкова Иванка Константиновна
                </L.P>
                <L.Span className="txt-gray">
                  12.06.2020 в 16:52
                </L.Span>
                <L.Div className="margin-bottom-16">
                  Прошу рассмотреть дополнительные документы по моему запросу, файл во вложении
                </L.Div>
                <L.A className="message-body-file flex-inline secondary padding-x-16 padding-y-12 margin-right-8 margin-bottom-8" href="file.pdf" download>
                  <L.I className="novicon-doc-list margin-right-12 txt-gray" />
                  <L.Span className="block-inline txt-nowrap">
                    file
                  </L.Span>
                  .pdf
                  <L.Span className="margin-left-12 txt-gray">
                    12&nbsp;мб
                  </L.Span>
                </L.A>
              </L.Div>

              {/* Рейтинг */}
              <L.Div className="padding-top-32 padding-bottom-16 txt-center">
                <L.H6 className="margin-bottom-16 txt-normal">
                  Специалист помог решить вашу задачу?
                </L.H6>

                <L.Rating
                  max={5}
                  value={value}
                  {...props}
                  onChange={ev => setValue(ev.component.value)}
                />
              </L.Div>

              {/* Комментарий */}
              {/* <L.Input
                className="width-100 margin-bottom-12"
                form="message"
                name="message-reply"
                placeholder="Комментарий"
              /> */}

              {/* Ответ */}
              <L.Div className="padding-top-24 padding-bottom-16">
                <L.Label className="txt-bold">
                  Ответ
                </L.Label>
                <L.Textarea
                  className="margin-y-12"
                  placeholder="Текст сообщения"
                />
                <L.FileDrop
                  infoRender={({ Element, elementProps }) => (
                    <Element {...elementProps}>
                      <L.Div className="txt-center">
                        <L.Img
                          className="block margin-x-auto margin-bottom-8"
                          src="https://cdn.esphere.ru/images/nova/download.svg"
                          alt="Загрузка"
                        />
                        Перетащите сюда файл pdf, jpg или png
                        <L.Div className="margin-top-8">
                          или
                          <L.Button className="margin-x-8">
                            выберите файл
                          </L.Button>
                          на вашем компьютере
                        </L.Div>
                      </L.Div>
                    </Element>
                  )}
                />
              </L.Div>
            </L.Div>

            <L.Div className="toolbar padding-x-32 margin-top-auto txt-right">
              <L.Button className="success">
                Отправить
              </L.Button>
            </L.Div>

          </L.Div>

          {/* Тело письма при подписании */}
          <L.Div className="message-body-scroll-area flex-column width-100">
            <L.Div className="padding-y-16 padding-x-32">
              <L.Div className="flex-row margin-bottom-8 txt-gray-2">
                09.06.2020 в 14:45
                <L.Div className="margin-left-auto">
                  <L.Span className="tag warning">
                    Требует ответа
                  </L.Span>
                </L.Div>
              </L.Div>
              <L.H5 className="line-height-1">
                Отсутствует платеж по договору аренды
              </L.H5>

              <hr className="margin-y-24" />

              <L.Dl className="list w-30 padding-bottom-24 margin-bottom-none">
                <L.Dt>
                  Договор
                </L.Dt>
                <L.Dd>
                  <L.A>
                    №121133
                  </L.A>
                </L.Dd>
                <L.Dt>
                  Дата договора
                </L.Dt>
                <L.Dd>
                  <L.I className="novicon-datepicker margin-right-12 txt-gray" />
                  15.01.2022
                </L.Dd>
                <L.Dt>
                  Документ
                </L.Dt>
                <L.Dd>
                  <L.Div className="flex-row">
                    <L.A className="flex-row secondary width-100 padding-x-16 padding-y-12" href="file.pdf" download>
                      <L.I className="novicon-doc-list margin-right-12 txt-gray" />
                      <L.Span className="txt-nowrap">
                        file
                      </L.Span>
                      .pdf
                      <L.Span className="shrink-0 padding-left-24 margin-left-auto txt-gray">
                        12 мб
                      </L.Span>
                    </L.A>
                    <L.Tooltip title="Документ с отметкой о подписании">
                      <L.A className="padding-x-16 padding-y-12">
                        <L.I className="novicon-print txt-gray" />
                      </L.A>
                    </L.Tooltip>
                  </L.Div>
                </L.Dd>
                <L.Dt>
                  Подписи
                </L.Dt>
                <L.Dd>
                  <L.Div className="flex-row margin-bottom-8">
                    <L.Div className="flex-row width-100 padding-x-16 padding-y-12 border">
                      <L.I className="novicon-signed margin-right-8 txt-gray-2" />
                      <L.Div>
                        <L.A>
                          Иванов Иван Иванович
                        </L.A>
                        <L.Span className="margin-left-4 txt-gray">
                          10.06.2020
                        </L.Span>
                        <L.Div className="margin-top-8 txt-gray">
                          ТУ Росимуществом по Ленинградской области талант
                          Капниста по-настоящему раскрылся в комедии «Ябеда»
                        </L.Div>
                      </L.Div>
                    </L.Div>
                    <L.I className="novicon-success-fill padding-x-16 padding-y-12 txt-success" />
                  </L.Div>
                  <L.Div className="flex-row margin-bottom-8">
                    <L.Div className="flex-row width-100 padding-x-16 padding-y-12 border">
                      <L.I className="novicon-signed margin-right-8 txt-gray-2" />
                      <L.Div>
                        <L.A>
                          Цветкова Иванка Константиновна
                        </L.A>
                        <L.Span className="margin-left-4 txt-gray">
                          10.06.2020
                        </L.Span>
                      </L.Div>
                    </L.Div>
                    <L.I className="novicon-success-fill padding-x-16 padding-y-12 txt-success" />
                  </L.Div>
                </L.Dd>
              </L.Dl>
            </L.Div>

            <L.Div className="toolbar padding-x-32 margin-top-auto txt-right">
              <L.Button className="left">
                Отклонить
              </L.Button>
              <L.Button className="success">
                Подписать и отправить
              </L.Button>
              <L.Div className="clear" />
            </L.Div>

          </L.Div>
        </L.Div>

      </L.Div>

      {/* <PlugInToken
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      {/* <InstallPlugin
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      {/* <Error
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      {/* <ChooseToken
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      {/* <Reject
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

    </MainLayout>
  );
};
