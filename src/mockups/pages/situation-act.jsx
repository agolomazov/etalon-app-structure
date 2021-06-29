import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС получение акта сверки
 * @example
 * <SituationAct />
 */
export const SituationAct = () => {
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
            1. Направить или запросить акт сверки?
          </L.H6>
          <L.DropDownSelect
            className="width-55 padding-right-8 margin-bottom-16"
            data={[
              'Направить акт сверки и подписать ЭЦП',
              'Направить скан-копию подписанного акта сверки',
              'Запросить акт сверки',
            ]}
            placeholder="Выберите"
          />
          <L.H6 className="margin-bottom-12">
            2. Выберите договор/договоры
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-32 border-bottom">
            <L.Dt>
              <L.Label>
                Договор
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
                Период формирования акта сверки
              </L.Label>
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
                Договор
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
                <L.Button className="blank more novicon-trash margin-left-auto txt-gray" />
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
              <L.Label>
                Период формирования акта сверки
              </L.Label>
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
                Документ будет подписан Квалифицированной Электронной подписью
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
            </L.Dd>
          </L.Dl>

          <L.P className="txt-gray">
            В отношении каждого договора будет сформировано отдельное обращение
          </L.P>

          <L.Button className="blank padding-none margin-bottom-16">
            + Добавить договор
          </L.Button>
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
