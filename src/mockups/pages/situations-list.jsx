import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup страницы выбора ЖС
 * @example
 * <SituationsList />
 */
export const SituationsList = () => (
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
          <L.Input
            className="width-45 margin-right-16"
            form="situations"
            name="searchSituation"
            placeholder="Поиск"
          />
        </L.Div>

        <L.Div className="situations-list flex-row flex-wrap">
          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-contract" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              В личном кабинете нет информации о&nbsp;моем договоре аренды
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-change-rent-info" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Внести изменения в&nbsp;характеристики арендованных объектов
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-act" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Получить акт-сверки взаиморасчетов
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-change-details" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Изменить реквизиты арендатора
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-overpayment" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Распорядиться переплатой
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-payment" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Отсутствует платеж по договору аренды
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-sublease" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Уведомление о субаренде
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-paper-carrier" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Заявка на получение / на отказ от получения документов на бумажном носителе
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-complaint" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Жалобы на акты, действия / бездействия должностных лиц
            </L.Div>
          </L.Div>

          <L.Div className="situation-item inner-24 flex-column border">
            <Link to="/situations-list/situation-no-suitable" className="link-overlay" />
            <L.I className="novicon-doc-add title-main-secondary margin-bottom-auto" />
            <L.Div className="situation-description margin-bottom-auto margin-top-16">
              Нет подходящей жизненной ситуации
            </L.Div>
          </L.Div>

        </L.Div>
      </L.Div>
    </L.Div>
  </MainLayout>
);
