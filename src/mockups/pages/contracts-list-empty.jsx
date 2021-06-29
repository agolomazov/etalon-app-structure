import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы с пустым списком договоров
 * @example
 * <ContractsListEmpty />
 */
export const ContractsListEmpty = () => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isSearchFilled, setIsSearchFilled] = React.useState(false);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Мои договоры</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <L.Div className="page-wrapper">
          <L.Div className="flex-row padding-bottom-16">
            <L.DropDownSelect
              className="margin-right-16"
              data={[
                'Номер договора',
                'Дата договора',
                'Сначала дороже',
                'Сначала дешевле',
              ]}
              defaultValue="Номер договора"
            />
            <L.Input
              inputRender={({ Element, elementProps }) => (
                <>
                  <L.Span className="input-addon margin-left-8 margin-right-4 txt-gray">
                    №
                  </L.Span>
                  <Element {...elementProps} className="input-element padding-left-none" />
                </>
              )}
              className="input-xs margin-right-16"
              form="contracts"
              name="contractNum"
              placeholder="Договора"
            />
            <L.Input
              className="width-30 margin-right-16"
              form="contracts"
              name="contractAddr"
              placeholder="Адрес"
            />
            <L.Button
              className="blank margin-left-auto padding-x-none"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {!isSearchOpen ? 'Расширенный поиск' : 'Закрыть расширенный поиск'}
              <L.I  className="novicon-search margin-left-8" />
            </L.Button>
          </L.Div>

          <L.Div
            className="margin-bottom-12"
            shouldRender={isSearchFilled}
            onClick={() => setIsSearchFilled(!isSearchFilled)}
          >
            <L.Tags>
              <L.Tag
                className="pointer"
                wrapperRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                    Срок действия договора: с 20.02.2015 по 20.02.2020
                    <L.I className="tags-icon icon-default" />
                  </Element>
                )}
              >
              </L.Tag>
              <L.Tag
                className="pointer"
                wrapperRender={({ Element, elementProps }) => (
                  <Element {...elementProps}>
                      Тип договора аренды: Договор аренды имущества
                    <L.I className="tags-icon icon-default" />
                  </Element>
                )}
              />
            </L.Tags>
          </L.Div>

          <L.Collapsible
            isOpen={isSearchOpen}
            className="margin-x-32-negative border-top"
          >
            <L.Div className="padding-y-16 padding-x-32">
              <L.Dl className="list form w-40 padding-right-32 margin-right-32 left">
                <L.Dt>
                  <L.Label>Дата договора</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DateRange
                    name="contractDate"
                    placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>Срок действия договора</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DateRange
                    name="contractValidity"
                    placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
                  />
                </L.Dd>
              </L.Dl>
              <L.Dl className="list form w-40 width-40 left">
                <L.Dt>
                  <L.Label>Тип договора аренды</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DropDownSelect
                    data={[
                      'Договор аренды земли',
                      'Договор аренды имущества',
                    ]}
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>Статус договора</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DropDownSelect
                    data={[
                      'Действующий',
                      'Архивный',
                    ]}
                  />
                </L.Dd>
              </L.Dl>
              <L.Div _clear />
              <L.Div className="txt-right">
                <L.Button className="blank margin-right-16">Сбросить</L.Button>
                <L.Button
                  className="success"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen)
                    setIsSearchFilled(!isSearchFilled)
                  }}
                >
                  Применить
                </L.Button>
              </L.Div>
            </L.Div>
          </L.Collapsible>

          <L.Div className="txt-center margin-top-120">
            <L.Img
              src="https://cdn.esphere.ru/images/ri/empty.svg"
              className="margin-bottom-32"
              alt="Ничего не найдено"
            />
            <L.P>Ничего не найдено</L.P>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
