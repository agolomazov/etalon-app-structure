import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС получение акта сверки
 * @example
 * <SituationAct />
 */
export const SituationPayment = () => {
  const [value, setValue] = React.useState(25);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/situations-list"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Отсутствует платеж по договору аренды</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.H6 className="margin-bottom-12">
            1. Выберите договор, по которому проводилась оплата
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <L.Dt>
              <L.Label>
                Номер договора
              </L.Label>
            </L.Dt>
            <L.Dd>
            <L.AutoComplete
              className="width-55 padding-right-8"
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
          </L.Dl>
          <L.H6 className="margin-bottom-12">
            2. Укажите сведения о платежном поручении
          </L.H6>
          <L.Dl className="list form w-30 padding-bottom-4 margin-bottom-16">
            <L.Dt>
              <L.Label>
                Плательщик
              </L.Label>
              <L.Div className="txt-gray">
                ФИО или наименование ЮЛ
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-100"
                placeholder="Введите ФИО или наименование ЮЛ"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Номер платёжного поручения
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-55"
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
                Дата платежного поручения
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
                Сумма платежа
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-55"
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
                Период
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                className="width-55"
                placeholder="Введите период"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Подтверждающий документ
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.FileDrop
                infoRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    <L.Div className="txt-center">
                      <L.Img
                        className="block margin-x-auto margin-bottom-8"
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
              Отправить
            </L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
