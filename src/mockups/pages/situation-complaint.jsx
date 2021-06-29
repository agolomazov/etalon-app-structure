import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС отсутствует информация по договору
 * @example
 * <SituationContract />
 */
export const SituationComplaint = () => {
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loaded, setLoaded] = React.useState(0);

  const [value, setValue] = React.useState(25);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/situations-list"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Жалобы на акты, действия или бездействия должностных лиц</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.H6 className="margin-bottom-12">
            1. Выберите из списка территориальный орган Росимущества, действия которого обжалуются
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <L.Dt>
              <L.Label>
                Территориальный орган
              </L.Label>
              <L.Div className="txt-gray">
                Росимущества
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.DropDownSelect
                data={[
                  'Территориальный орган Росимущества 1',
                  'Территориальный орган Росимущества 2',
                ]}
                placeholder="Выберите территориальный орган Росимущества"
              />
            </L.Dd>
          </L.Dl>
          <L.H6 className="margin-bottom-12">
            2. Содержание обращения
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <L.Dt>
              <L.Label>
                Оформить жалобу
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.DropDownSelect
                data={[
                  'На акт (документ)',
                  'На действие или бездействие должностных лиц',
                ]}
                placeholder="Выберите предмет обжалования"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Номер документа
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
                Дата документа
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
            3. Содержание обращения
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <L.Dt>
              <L.Label>
                Основание для подачи жалобы
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Textarea placeholder="Текст обращения" />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Требования лица, подающего жалобу
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Textarea placeholder="Текст обращения" />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Документ
              </L.Label>
              <L.Div className="txt-gray margin-top-8">
                Загрузите файлы по обращению
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
