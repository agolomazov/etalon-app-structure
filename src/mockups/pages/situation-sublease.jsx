import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС получение акта сверки
 * @example
 * <SituationAct />
 */
export const SituationSublease = () => {
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
          <L.H1>Получить акт сверки взаимных расчетов</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.H6 className="margin-bottom-12">
            1. Выберите договор
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
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
          </L.Dl>

          <L.H6 className="margin-bottom-12">
            2. Информация о договоре субаренды
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32">
            <L.Dt>
              <L.Label>
                Субарендатор
              </L.Label>
              <L.Div className="txt-gray">
                ФИО или наименование ЮЛ
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Input placeholder="Введите ФИО или наименование ЮЛ" />
            </L.Dd>
            <L.Dt>
              <L.Label>
                ИНН
              </L.Label>
              <L.Div className="txt-gray">
                Субарендатора
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-35"
                placeholder="Введите ИНН субарендатора"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Номер договора
              </L.Label>
              <L.Div className="txt-gray">
                Субаренды
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-35"
                placeholder="Введите номер договора субаренды"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Дата договора
              </L.Label>
              <L.Div className="txt-gray">
                Субаренды
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
                Период действия договора
              </L.Label>
              <L.Div className="txt-gray">
                Субаренды
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.DateRange
                name="contractValidity"
                placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Документ
              </L.Label>
              <L.Div className="txt-gray margin-top-8">
                Загрузите скан-копию договора субаренды
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
              Подписать и отправить
            </L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
