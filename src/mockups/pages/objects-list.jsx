import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы список объектов
 * @example
 * <ObjectsList />
 */
export const ObjectsList = () => {
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
          <L.H1>Мои объекты</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top">
        <L.Div className="page-wrapper">
          <L.Div className="flex-row padding-bottom-16">
            <L.DropDownSelect
              className="input-sm margin-right-16"
              data={[
                'По площади',
                'По адресу',
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
              name="objectSort"
              defaultValue="По площади"
            />
            <L.Input
              className="width-30 margin-right-16"
              form="contracts"
              name="objectAddr"
              placeholder="Адрес"
            />
            <L.Input
              className="width-30 margin-right-16"
              form="contracts"
              name="objectNum"
              placeholder="Кадастровый номер"
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
                    Тип договора аренды: Договор аренды имущества
                    <L.I className="tags-icon icon-default" />
                  </Element>
                )}
              >
              </L.Tag>
            </L.Tags>
          </L.Div>

          <L.Collapsible
            isOpen={isSearchOpen}
            className="margin-x-32-negative border-top"
          >
            <L.Div className="padding-y-16 padding-x-32">
              <L.Dl className="list form w-30 width-50 left">
                <L.Dt>
                  <L.Label>Дата договора</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.DateRange
                    name="contractValidity"
                    placeholder={['дд.мм.гггг', 'дд.мм.гггг']}
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>Номер договора</L.Label>
                </L.Dt>
                <L.Dd>
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

          <L.Div className="card card-default padding-x-32 padding-y-16 margin-bottom-8">
            <Link to="/contracts-list/contract-item" className="link-overlay"/>
            <L.Div className="row">
              <L.Div className="col-6">
                <L.H6 className="padding-bottom-32">
                  г. Москва, площадь Васильевский спуск от&nbsp;Красной площади до&nbsp;Кремлевской
                </L.H6>
                <L.Div className="margin-top-auto txt-gray">
                  Договор №321376 от 12.02.2011
                </L.Div>
              </L.Div>
              <L.Div className="col-2 txt-right">
                Земельный участок
              </L.Div>
              <L.Div className="col-2 txt-right">
                66:45:0287023:67
              </L.Div>
              <L.Div className="col-2 txt-right">
                54 679 м<sup>2</sup>
              </L.Div>
            </L.Div>
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
