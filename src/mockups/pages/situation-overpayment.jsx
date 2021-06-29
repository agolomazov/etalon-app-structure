import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС получение акта сверки
 * @example
 * <SituationAct />
 */
export const SituationOverpayment = () => {
  const [overpayment, setOverpayment] = React.useState();
  const overpaymentChange = (ev) => setOverpayment(ev.component.value);

  const [recipient, setRecipient] = React.useState();
  const recipientChange = (ev) => setRecipient(ev.component.value);

  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loaded, setLoaded] = React.useState(0);

  const [value, setValue] = React.useState(25);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Распорядиться переплатой</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.H6 className="margin-bottom-12">
            1. Направить или запросить акт сверки?
          </L.H6>
          <L.Dl className="list form w-30 margin-bottom-32">
            <L.Dt>
              <L.Label>
                Номер договора
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Div className="flex-row">
                <L.AutoComplete
                  className="width-35"
                  data={[
                    '12/34',
                    '56/78',
                    '90/12',
                  ]}
                  inputRender={({ Element, elementProps }) => (
                    <>
                      <L.Span className="input-addon margin-left-8 margin-right-4 txt-gray">
                        №
                      </L.Span>
                      <Element {...elementProps} className="autocomplete-input padding-left-none" />
                    </>
                  )}
                />
              </L.Div>
            </L.Dd>
            <L.Dt>
              <L.Label>
                Дата договора
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
              />
            </L.Dd>
            <L.Dt>
              Сумма переплаты
            </L.Dt>
            <L.Dd>
              <L.RUB>
                50 000
              </L.RUB>
              <L.Tooltip
                title="На текущий момент"
                position="right"
              >
                <L.I className="novicon-question txt-gray margin-left-8" />
              </L.Tooltip>
            </L.Dd>
          </L.Dl>
          <L.H6 className="margin-bottom-12">
            2. Выберите способ распоряжения переплатой
          </L.H6>
          <L.DropDownSelect
            className="width-55 padding-right-8 margin-bottom-16"
            data={[
              'Зачет денежных средств на другой договор',
              'Возврат денежных средств',
            ]}
            placeholder="Выберите"
            value={overpayment}
            onChange={overpaymentChange}
          />
          <L.Dl className="list form w-30 margin-bottom-32">
            <L.Dt>
              Сумма переплаты
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-35"
                inputRender={({ Element, elementProps }) => (
                  <>
                    <Element {...elementProps} className="autocomplete-input padding-right-none txt-right" />
                    <L.Span className="input-addon margin-left-4 margin-right-8 txt-gray">
                      ₽
                    </L.Span>
                  </>
                )}
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Причина переплаты
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.DropDownSelect
                className="width-35"
                data={[
                  'Ошибочное перечисление',
                  'Излишнее перечисление',
                ]}
                placeholder="Выберите"
              />
            </L.Dd>
          </L.Dl>
          <L.H6 className="margin-bottom-12">
            3. Укажите данные платежных поручений
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32 border-bottom">
            <L.Dt>
              <L.Label>
                Номер платежного поручения
              </L.Label>
              <L.Div className="txt-gray">
                Приведшего к переплате
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Div className="flex-row">
                <L.AutoComplete
                  className="width-35"
                  data={[
                    '12/34',
                    '56/78',
                    '90/12',
                  ]}
                  inputRender={({ Element, elementProps }) => (
                    <>
                      <L.Span className="input-addon margin-left-8 margin-right-4 txt-gray">
                        №
                      </L.Span>
                      <Element {...elementProps} className="autocomplete-input padding-left-none" />
                    </>
                  )}
                />
                <L.Button className="blank more novicon-trash margin-left-auto txt-gray" />
              </L.Div>
            </L.Dd>
            <L.Dt>
              <L.Label>
                Дата договора
              </L.Label>
              <L.Div className="txt-gray">
                Приведшего к переплате
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Документ
              </L.Label>
              <L.Div className="txt-gray margin-top-8">
                Документ будет подписан Квалифицированной Электронной подписью
              </L.Div>
            </L.Dt>
            <L.Dd>
            <L.FileDrop
                value={file}
                error={error}
                onChange={ev => {
                  setFile(ev.component.value);
                  if (!ev.component.value) {
                    setXmlLoaded(0);
                  }
                }}
                infoRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.Img
                      className="margin-bottom-8"
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
                    <L.Div className="subtitle margin-top-12">
                      Размер файла не более 10 Мб
                    </L.Div>
                  </Element>
                )}
                successViewRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.I className="novicon-success-fill margin-bottom-8 title-main txt-success" />
                    <L.Div>
                      Файл
                      {' '}
                      <L.A href="file.pdf">
                        название_файла.pdf
                      </L.A>
                      {' '}
                      успешно загружен
                    </L.Div>
                    <L.Button className="margin-top-8">
                      <L.I className="novicon-revert margin-right-8 txt-gray" />
                      Заменить файл
                    </L.Button>
                  </Element>
                )}
                errorViewRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.I className="novicon-error-circle-fill margin-bottom-8 title-main txt-danger" />
                    <L.Div>
                      Размер файла превышает 10 мб
                    </L.Div>
                    <L.Button className="margin-top-8">
                      <L.I className="novicon-revert margin-right-8 txt-gray" />
                      Заменить файл
                    </L.Button>
                  </Element>
                )}
              />
            </L.Dd>
          </L.Dl>

          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32 border-bottom">
            <L.Dt>
              <L.Label>
                Номер платежного поручения
              </L.Label>
              <L.Div className="txt-gray">
                Приведшего к переплате
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Div className="flex-row">
                <L.AutoComplete
                  className="width-35"
                  data={[
                    '12/34',
                    '56/78',
                    '90/12',
                  ]}
                  inputRender={({ Element, elementProps }) => (
                    <>
                      <L.Span className="input-addon margin-left-8 margin-right-4 txt-gray">
                        №
                      </L.Span>
                      <Element {...elementProps} className="autocomplete-input padding-left-none" />
                    </>
                  )}
                />
                <L.Button className="blank more novicon-trash margin-left-auto txt-gray" />
              </L.Div>
            </L.Dd>
            <L.Dt>
              <L.Label>
                Дата договора
              </L.Label>
              <L.Div className="txt-gray">
                Приведшего к переплате
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.DatePicker
                className="input-xs"
                placeholder="дд.мм.гггг"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Документ
              </L.Label>
              <L.Div className="txt-gray margin-top-8">
                Документ будет подписан Квалифицированной Электронной подписью
              </L.Div>
            </L.Dt>
            <L.Dd>
            <L.FileDrop
                value={file}
                error={error}
                onChange={ev => {
                  setFile(ev.component.value);
                  if (!ev.component.value) {
                    setXmlLoaded(0);
                  }
                }}
                infoRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.Img
                      className="margin-bottom-8"
                      src="https://cdn.esphere.ru/images/nova/download.svg"
                    />
                    Перетащите сюда файл pdf, jpg или png
                    <L.Div className="margin-top-8">
                      или
                      <L.Button className="margin-x-8">
                        выберите файл
                      </L.Button>
                      на вашем компьютере
                    </L.Div>
                    <L.Div className="subtitle margin-top-12">
                      Размер файла не более 10 Мб
                    </L.Div>
                  </Element>
                )}
                successViewRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.I className="novicon-success-fill margin-bottom-8 title-main txt-success" />
                    <L.Div>
                      Файл
                      {' '}
                      <L.A href="file.pdf">
                        название_файла.pdf
                      </L.A>
                      {' '}
                      успешно загружен
                    </L.Div>
                    <L.Button className="margin-top-8">
                      <L.I className="novicon-revert margin-right-8 txt-gray" />
                      Заменить файл
                    </L.Button>
                  </Element>
                )}
                errorViewRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.I className="novicon-error-circle-fill margin-bottom-8 title-main txt-danger" />
                    <L.Div>
                      Размер файла превышает 10 мб
                    </L.Div>
                    <L.Button className="margin-top-8">
                      <L.I className="novicon-revert margin-right-8 txt-gray" />
                      Заменить файл
                    </L.Button>
                  </Element>
                )}
              />
            </L.Dd>
          </L.Dl>

          <L.Button className="blank padding-none margin-bottom-32">
            + Добавить договор
          </L.Button>
          {overpayment !== 'Возврат денежных средств' && (
            <>
              <L.H6 className="margin-bottom-12">
                4. Укажите договор, в счет которого будет произведен перезачет
              </L.H6>
              <L.Dl className="list form w-30 margin-bottom-32">
                <L.Dt>
                  <L.Label>
                    Номер договора
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.AutoComplete
                    className="width-35"
                    data={[
                      '12/34',
                      '56/78',
                      '90/12',
                    ]}
                    inputRender={({ Element, elementProps }) => (
                      <>
                        <L.Span className="input-addon margin-left-8 margin-right-4 txt-gray">
                          №
                        </L.Span>
                        <Element {...elementProps} className="autocomplete-input padding-left-none" />
                      </>
                    )}
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    Дата договора
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DatePicker
                    className="input-xs"
                    placeholder="дд.мм.гггг"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    Тип обязательства
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DropDownSelect
                    className="width-35"
                    data={[
                      'Основное обязательство',
                      'Пени',
                    ]}
                    placeholder="Выберите"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    Период погашения обязательства
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    placeholder="Введите"
                  />
                </L.Dd>
              </L.Dl>
            </>
          )}
          {overpayment === 'Возврат денежных средств' && (
            <>
              <L.H6 className="margin-bottom-12">
                4. Введите данные получателя
              </L.H6>
              <L.DropDownSelect
                className="width-55 padding-right-8 margin-bottom-16"
                data={[
                  'Физическое лицо',
                  'Юридическое лицо',
                  'Бюджетная организация',
                ]}
                placeholder="Выберите"
                value={recipient}
                onChange={recipientChange}
              />
              {recipient === 'Физическое лицо' && (
                <L.Div className="margin-bottom-32">
                  <L.Dl className="list form w-30 margin-bottom-16">
                    <L.Dt>
                      <L.Label>
                        Фамилия Имя Отчество получателя
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input placeholder="Введите" />
                    </L.Dd>
                    <L.Dt>
                      <L.Label>
                        ИНН
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        placeholder="Введите"
                      />
                    </L.Dd>
                  </L.Dl>
                  <L.H6 className="margin-bottom-16">
                    Паспортные данные
                  </L.H6>
                  <L.Dl className="list form w-30">
                    <L.Dt>
                      <L.Label>
                        Серия
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        placeholder="Введите"
                      />
                    </L.Dd>
                    <L.Dt>
                      <L.Label>
                        Номер
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        placeholder="Введите"
                      />
                    </L.Dd>
                    <L.Dt>
                      <L.Label>
                        Кем выдан
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input placeholder="Введите" />
                    </L.Dd>
                    <L.Dt>
                      <L.Label>
                        Дата выдачи
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.DatePicker
                        className="input-xs"
                        placeholder="дд.мм.гггг"
                      />
                    </L.Dd>
                  </L.Dl>
                </L.Div>
              )}
              {recipient !== 'Физическое лицо' && (
                <L.Dl className="list form w-30 margin-bottom-32">
                  <L.Dt>
                    <L.Label>
                      Наименование банка
                    </L.Label>
                  </L.Dt>
                  <L.Dd>
                    <L.Input placeholder="Введите" />
                  </L.Dd>
                  <L.Dt>
                    <L.Label>
                      ИНН
                    </L.Label>
                  </L.Dt>
                  <L.Dd>
                    <L.Input
                      className="width-35"
                      placeholder="Введите"
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
                      placeholder="Введите"
                    />
                  </L.Dd>
                </L.Dl>
              )}
              <L.H6 className="margin-bottom-16">
                5. Укажите банковские реквизиты
              </L.H6>
              <L.Dl className="list form w-30 margin-bottom-16">
                <L.Dt>
                  <L.Label>
                    Наименование банка
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input placeholder="Введите" />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    БИК
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    placeholder="Введите"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>
                    Банковский счет
                  </L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    placeholder="Введите"
                  />
                </L.Dd>
                {recipient !== 'Бюджетная организация' && (
                  <>
                    <L.Dt>
                      <L.Label>
                        Корреспондентский счет
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Div className="flex-row align-items-center">
                        <L.Input
                          className="width-35"
                          placeholder="Введите"
                        />
                        {recipient === 'Физическое лицо' && (
                          <L.Tooltip
                            title="При наличии"
                            position="right"
                          >
                            <L.I className="novicon-question txt-gray margin-left-8" />
                          </L.Tooltip>
                        )}
                      </L.Div>
                    </L.Dd>
                  </>
                )}
                {recipient === 'Бюджетная организация' && (
                  <>
                    <L.Dt>
                      <L.Label>
                        Лицевой счет
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        placeholder="Введите"
                      />
                    </L.Dd>
                    <L.Dt>
                      <L.Label>
                        КБК
                      </L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        placeholder="Введите"
                      />
                    </L.Dd>
                  </>
                )}
              </L.Dl>
            </>
          )}
          <L.H6 className="margin-bottom-12">
            {overpayment === 'Возврат денежных средств' ? '6. ' : '5. '}
            Скачайте, подпишите и загрузите заявление
          </L.H6>
          <L.Dl className="list form w-30 margin-bottom-32">
            <L.Dt>
              <L.Label>
                Заявление
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Button className="warning margin-bottom-12">
                Скачать
              </L.Button>
              <L.Div className="txt-gray">
                Распечатайте заявление на бланке организации (при его наличии), поставьте подпись и печать.
              </L.Div>
            </L.Dd>
            <L.Dt>
              <L.Label>
                Загрузите скан-образ подписанного заявления
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.FileDrop
                value={file}
                error={error}
                onChange={ev => {
                  setFile(ev.component.value);
                  if (!ev.component.value) {
                    setXmlLoaded(0);
                  }
                }}
                infoRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.Img
                      className="margin-bottom-8"
                      src="https://cdn.esphere.ru/images/nova/download.svg"
                    />
                    Перетащите сюда файл pdf, jpg или png
                    <L.Div className="margin-top-8">
                      или
                      <L.Button className="margin-x-8">
                        выберите файл
                      </L.Button>
                      на вашем компьютере
                    </L.Div>
                    <L.Div className="subtitle margin-top-12">
                      Размер файла не более 10 Мб
                    </L.Div>
                  </Element>
                )}
                successViewRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.I className="novicon-success-fill margin-bottom-8 title-main txt-success" />
                    <L.Div>
                      Файл
                      {' '}
                      <L.A href="file.pdf">
                        название_файла.pdf
                      </L.A>
                      {' '}
                      успешно загружен
                    </L.Div>
                    <L.Button className="margin-top-8">
                      <L.I className="novicon-revert margin-right-8 txt-gray" />
                      Заменить файл
                    </L.Button>
                  </Element>
                )}
                errorViewRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.I className="novicon-error-circle-fill margin-bottom-8 title-main txt-danger" />
                    <L.Div>
                      Размер файла превышает 10 мб
                    </L.Div>
                    <L.Button className="margin-top-8">
                      <L.I className="novicon-revert margin-right-8 txt-gray" />
                      Заменить файл
                    </L.Button>
                  </Element>
                )}
              />
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
              Подписать и отправить
            </L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
