import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС отсутствует информация по договору
 * @example
 * <SituationContract />
 */
export const Support = () => {
  const [value, setValue] = React.useState(25);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/help"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Служба поддержки</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.P className="padding-bottom-24">
            В данном разделе Вы можете оставить свои предложения и&nbsp;замечания,
            связанные с&nbsp;работой Личного кабинета арендатора.
          </L.P>

          <L.Dl className="list form w-30 margin-bottom-32">
            <L.Dt>
              <L.Label>
                Тема
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input placeholder="Введите тему" />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Сообщение
              </L.Label>
              <L.Div className="txt-gray">
                Опишите проблему или задайте вопрос
              </L.Div>
            </L.Dt>
            <L.Dd>
              <L.Textarea placeholder="Введите текст" />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Электронная почта
                <L.Tooltip
                  title={
                    <>
                      Укажите адрес электронной почты,
                      <br />
                      на которую Вам будет отправлен ответ
                    </>
                  }
                  position="top"
                >
                  <L.I className="novicon-question txt-gray margin-left-8" />
                </L.Tooltip>
              </L.Label>
            </L.Dt>
            <L.Dd>
              <L.Input
                type="email"
                placeholder="Введите электронную почту"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>
                Документ
              </L.Label>
              <L.Div className="txt-gray margin-top-8">
                Предоставление скриншота может ускорить решение
                Вашей проблемы
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
                    <L.Div className="subtitle margin-top-12">
                      Размер файла не более 10 Мб
                    </L.Div>
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
