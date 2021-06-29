import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы Список договоров
 * @example
 * <ContractItem />
 */
export const ContractsList = () => {
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
              className="input-sm margin-right-16"
              data={[
                'По сумме к оплате',
                'По дате договора',
                'Сначала дороже',
                'Сначала дешевле',
              ]}
              itemRender={({ componentProps, Element, elementProps }) => (
                <Element {...elementProps}>
                  {componentProps.item}
                  {/*
                    novicon-sort-asc — сначала меньше
                    novicon-sort-desc — сначала больше
                  */}
                  <L.I className="novicon-sort-asc margin-left-4 margin-right-12 txt-gray right" />
                </Element>
              )}
              inputRender={({ componentProps, Element, elementProps }) => (
                <>
                  <Element
                    {...elementProps}
                    value={elementProps.value}
                  />
                  {componentProps.suggestion && (
                    <L.I className="novicon-sort-desc align-middle margin-left-4 txt-gray right" />
                  )}
                </>
              )}
              defaultValue="По сумме к оплате"
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
              <L.I className="novicon-search margin-left-8" />
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
              <L.Dl className="list form w-35 width-55 left">
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
              <L.Dl className="list form w-40 width-40 right">
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

          {/* Задолженность, пени, за текущий месяц */}
          <L.Div className="card card-danger padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.Div className="flex-row">
              <L.H6 className="padding-bottom-16">
                г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
              </L.H6>
              <L.Span className="margin-left-auto txt-large txt-gray">
                Общая сумма:
                {' '}
                <L.RUB>10 600 000.00</L.RUB>
              </L.Span>
            </L.Div>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8 txt-danger border-bottom-dashed">
                Задолженность
                <L.H6 className="margin-left-auto">
                  <L.RUB>5 000 000.00</L.RUB>
                </L.H6>
              </L.Div>
              <L.Div className="flex-row align-items-center padding-y-8 txt-danger border-bottom-dashed">
                Пени
                <L.H6 className="margin-left-auto">
                  <L.RUB>600 000.00</L.RUB>
                </L.H6>
              </L.Div>
              <L.Div className="flex-row align-items-center padding-y-8">
                Начислено за текущий месяц
                <L.Span className="margin-left-16 txt-gray">оплатить до 05.03.2020</L.Span>
                <L.H6 className="margin-left-auto">
                  <L.RUB>5 000 000.00</L.RUB>
                </L.H6>
              </L.Div>
            </L.Div>
          </L.Div>

          {/* Пени */}
          <L.Div className="card card-danger padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.Div className="flex-row">
              <L.H6 className="padding-bottom-16">
                г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
              </L.H6>
              <L.Span className="margin-left-auto txt-large txt-gray">
                Общая сумма:
                {' '}
                <L.RUB>600 000.00</L.RUB>
              </L.Span>
            </L.Div>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8 txt-danger">
                Пени
                <L.H6 className="margin-left-auto">
                  <L.RUB>600 000.00</L.RUB>
                </L.H6>
              </L.Div>
            </L.Div>
          </L.Div>

          {/* Переплата, пени */}
          <L.Div className="card card-danger padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="message warning block-inline inner-12 margin-bottom-16">
              <L.I className="novicon-exclamation-in-circle-fill txt-warning padding-right-8" />
              Переплата
              {' '}
              <L.RUB>1 000 000.00</L.RUB>
            </L.Div>
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.Div className="flex-row">
              <L.H6 className="padding-bottom-16">
                г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
              </L.H6>
              <L.Span className="margin-left-auto txt-large txt-gray">
                Общая сумма:
                {' '}
                <L.RUB>600 000.00</L.RUB>
              </L.Span>
            </L.Div>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8 txt-danger">
                Пени
                <L.H6 className="margin-left-auto">
                  <L.RUB>600 000.00</L.RUB>
                </L.H6>
              </L.Div>
            </L.Div>
          </L.Div>

          {/* За текущий месяц */}
          <L.Div className="card card-default padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.Div className="flex-row">
              <L.H6 className="padding-bottom-16">
                г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
              </L.H6>
              <L.Span className="margin-left-auto txt-large txt-gray">
                Общая сумма:
                {' '}
                <L.RUB>5 000 000.00</L.RUB>
              </L.Span>
            </L.Div>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8">
                Начислено за текущий месяц
                <L.Span className="margin-left-16 txt-gray">оплатить до 05.03.2020</L.Span>
                <L.H6 className="margin-left-auto">
                  <L.RUB>5 000 000.00</L.RUB>
                </L.H6>
              </L.Div>
            </L.Div>
          </L.Div>

          {/* За текущий месяц (пока неясно, это закрытый договор или какой-то другой) */}
          <L.Div className="card card-default padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.Div className="flex-row">
              <L.H6 className="padding-bottom-16">
                г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
              </L.H6>
              <L.Span className="margin-left-auto txt-large txt-gray">
                Общая сумма:
                {' '}
                <L.RUB>0.00</L.RUB>
              </L.Span>
            </L.Div>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8">
                Начислено на текущий период (с учетом погашения авансовым платежом)
                <L.H6 className="margin-left-auto">
                  <L.RUB>0.00</L.RUB>
                </L.H6>
              </L.Div>
            </L.Div>
          </L.Div>

          {/* Переплата, за текущий месяц (пока неясно, это закрытый договор или какой-то другой) */}
          <L.Div className="card card-default padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="message warning block-inline inner-12 margin-bottom-16">
              <L.I className="novicon-exclamation-in-circle-fill txt-warning padding-right-8" />
              Переплата
              {' '}
              <L.RUB>1 000 000.00</L.RUB>
            </L.Div>
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.Div className="flex-row">
              <L.H6 className="padding-bottom-16">
                г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
              </L.H6>
              <L.Span className="margin-left-auto txt-large txt-gray">
                Общая сумма:
                {' '}
                <L.RUB>0.00</L.RUB>
              </L.Span>
            </L.Div>
            <L.Div className="border-top">
              <L.Div className="flex-row align-items-center padding-y-8">
                Начислено на текущий период (с учетом погашения авансовым платежом)
                <L.H6 className="margin-left-auto">
                  <L.RUB>0.00</L.RUB>
                </L.H6>
              </L.Div>
            </L.Div>
          </L.Div>

          {/* Пусто (пока неясно, это закрытый договор или какой-то другой) */}
          <L.Div className="card card-default padding-x-32 padding-top-16 padding-bottom-8 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay" />
            <L.Div className="txt-gray">Договор №321376 от 12.02.2011</L.Div>
            <L.H6 className="padding-bottom-16">
              г. Москва, площадь Васильевский спуск от Красной площади до Кремлевской
            </L.H6>
          </L.Div>

          <L.Pagination
            className="margin-top-32 border-top"
            totalItems={50}
            itemsRangeInfoRender={() => null}
          />
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
