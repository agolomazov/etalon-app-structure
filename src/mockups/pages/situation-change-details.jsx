import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС отсутствует информация по договору
 * @example
 * <SituationContract />
 */
export const SituationChangeDetails = () => {
  const [reason, setReason] = React.useState();
  const reasonChange = (ev) => setReason(ev.component.value);

  const [value, setValue] = React.useState(25);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/situations-list"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Изменить реквизиты арендатора</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.H6 className="margin-bottom-12">
            1. Выберите причину внесения изменений
          </L.H6>
          <L.DropDownSelect
            className="width-55 padding-right-8 margin-bottom-16"
            data={[
              'Смена юридического адреса/КПП',
              'Смена организационно-правовой формы/ИНН',
              'Смена наименования ЮЛ',
              'Смена контактных данных',
              'Смена руководителя',
            ]}
            placeholder="Выберите"
            form="changeDetails"
            name="reason"
            value={reason}
            onChange={reasonChange}
          />
          <L.H6 className="margin-bottom-12">
          {reason !== 'Смена контактных данных' && reason !== 'Смена руководителя' ?
            '2. Загрузите дополнительно' :
            '2. Заполните необходимые поля'
          }
          </L.H6>
          <L.Dl className="list form w-30 margin-bottom-32">
            {reason === 'Смена юридического адреса/КПП' && (
              <>
                <L.Dt>
                  <L.Label>
                    Юридический адрес
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    placeholder="Введите юридический адрес"
                    form="changeDetails"
                    name="address"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    КПП
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    placeholder="Введите КПП"
                    form="changeDetails"
                    name="kpp"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    Новое наименование организации
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    placeholder="Введите новое наименование организации"
                    form="changeDetails"
                    name="kpp"
                  />
                </L.Dd>
              </>
            )}
            {reason === 'Смена контактных данных' && (
              <>
                <L.Dt>
                  <L.Label>
                    Телефон
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.MaskedInput
                    className="width-35"
                    mask="+7 ### ### ## ##"
                    placeholder="+7"
                    form="changeDetails"
                    name="tel"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    Почта
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    placeholder="Введите почту для связи"
                    form="changeDetails"
                    name="email"
                  />
                </L.Dd>
              </>
            )}
            {reason === 'Смена руководителя' && (
              <>
                <L.Dt>
                  <L.Label>
                    Фамилия Имя Отчество
                  </L.Label>
                  <L.Div className="txt-gray">
                    Нового руководителя
                  </L.Div>
                </L.Dt>
                <L.Dd>
                  <L.Div className="table-layout">
                    <L.Div>
                      <L.Div className="width-35">
                        <L.Input
                          className="width-100"
                          placeholder="Фамилия"
                          form="changeDetails"
                          name="surname"
                        />
                      </L.Div>
                      <L.Div className="padding-x-8">
                        <L.Input
                          placeholder="Имя"
                          form="changeDetails"
                          name="name"
                        />
                      </L.Div>
                      <L.Div>
                        <L.Input
                          placeholder="Отчество"
                          form="changeDetails"
                          name="patronymic"
                        />
                      </L.Div>
                    </L.Div>
                  </L.Div>
                </L.Dd>
              </>
            )}
            {reason !== 'Смена контактных данных' && (
              <>
                <L.Dt>
                  <L.Label>
                    Подтверждающий документ
                  </L.Label>
                  <L.Div className="txt-gray margin-top-8">
                    Загрузите скан-копии документов, подтверждающих  изменение данных
                  </L.Div>
                </L.Dt>
                <L.Dd>
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
                  <L.Div className="flex-row align-items-center secondary padding-x-16 padding-y-12 margin-y-8">
                    <L.A  className="flex-row width-95" href="file.pdf" download>
                      <L.I className="novicon-doc-list margin-right-12 txt-light-gray" />
                      <L.Span className="txt-nowrap">
                        file.pdf
                      </L.Span>
                      <L.Span className="margin-left-auto txt-gray">
                        16&nbsp;мб
                      </L.Span>
                    </L.A>
                    <L.Button className="blank more novicon-del padding-none margin-left-auto txt-gray" />
                  </L.Div>
                </L.Dd>
              </>
            )}
            <L.Dt>
              <L.Label>
                Комментарий
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Textarea placeholder="Текст сообщения" />
            </L.Dd>
          </L.Dl>
        </L.Div>
        <L.Div className="margin-top-auto">
          <L.Div className="toolbar padding-x-32 margin-top-auto margin-x-32-negative txt-right">
            <L.ProgressBar
              value={value}
              valueRender={() => null}
            />
            <L.Button className="success">
              Отправить
            </L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
