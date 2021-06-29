import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС отсутствует информация по договору
 * @example
 * <SituationContract />
 */
export const SituationContract = () => {
  const [value, setValue] = React.useState(25);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/situations-list"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>В личном кабинете отсутствует информация о моем договоре аренды</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.Dl className="list form w-30 margin-bottom-32">
            <L.Dt>
              <L.Label>
                Арендодатель по договору
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.DropDownSelect
                data={[
                  'Договор аренды земли',
                  'Договор аренды имущества',
                ]}
                placeholder="Выберите"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Договор
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
                Период формирования акта сверки
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
                Адрес объекта
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                form="situationContract"
                name="address"
                placeholder="Введите адрес объекта"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Кадастровый номер объекта
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-35"
                form="situationContract"
                name="address"
                placeholder="Введите кадастровый номер объекта"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Документ
              </L.Label>
              <L.Div className="txt-gray margin-top-8">
                Загрузите скан-копию бумажного договора
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
