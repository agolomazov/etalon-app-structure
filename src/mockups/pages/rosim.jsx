
import React from 'react';


/**
 * ## Mockup главной страницы Росимущества 
 * @example
 * <Rosim />
 */
export const Rosim = () => (
  <>
    <div>
      <header>
        <div className="container-fluid">
          <div id="atten" style={{display: 'none', marginLeft: '-249.5px'}}><b>ВНИМАНИЕ!</b> Вы перешли на сайт центрального аппарата Росимущества</div>
          <div className="row mainrow">
            <div id="search_form" style={{display: 'none'}}>
              <div className="searchform__wrapper">
                <div className="col-xs-10 col-sm-10 col-md-11">
                  <form action="/search">
                    <div className="input-group">
                      <input type="text" placeholder="Введите название услуги или документа" className="form-control" aria-describedby="ico_s" id="serchContext" name="context" defaultValue />
                      <span className="input-group-addon" id="ico_s">
                        <button id="serchButton" title="Поиск по сайту">
                          <svg className="search-button-icon" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                            <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-1 text-right bcl">
                  <button className="sclose" type="button">
                    <svg width={29} height={29} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                      <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 logo">
              <span className="logo__link"><img src="https://cdn.esphere.ru/images/ri/temp/logo-rosim.png" className="logo-image" id="logo_contacts" alt="Росимущество" title="Росимущество" /></span>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-8 header-column-wrapper">
              <div className="row icons">
                <div className="col-xs-12 col-sm-7 col-md-offset-1 col-md-4">
                  <div id="geo-reg">
                    <a className="geo" data-href="/geo_region.aspx?reg_no=411">
                      <svg className="geo-icon" xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                        <path d="M12 2c3.196 0 6 2.618 6 5.602 0 3.093-2.493 7.132-6 12.661-3.507-5.529-6-9.568-6-12.661 0-2.984 2.804-5.602 6-5.602m0-2c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                      </svg>
                      регион: <span className="gs">77 г. Москва</span></a>{/*reg from cookie 411 */}
                  </div>
                </div>
                <div id="ico_search" className="col-xs-12 col-sm-5 col-md-2 header-search">
                  <img src="https://cdn.esphere.ru/images/ri/temp/icon-search.png" className="bvi-show-always header-search-image" alt="Поиск по сайту" />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-5 nowrap header-meta">
                  <div className="lang_trig"><span>RU</span> | <a href="/en">EN</a></div>
                  <span className="blind-version-opener bvi-open" id="blind-link" title="Версия для слабовидящих">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={41} height={23} viewBox="1869.065 1511.66 756.271 452.324" xmlSpace="preserve">
                      <path d="M2622.386,1728.001c-38.681-65.422-93.774-120.056-159.334-158.006	c-65.927-38.163-140.567-58.335-215.852-58.335c-75.303,0-149.962,20.172-215.908,58.334 c-65.608,37.967-120.681,92.601-159.278,158.008c-3.932,5.889-3.932,13.751,0,19.64c38.682,65.422,93.775,120.057,159.334,158.007 c65.927,38.163,140.567,58.334,215.851,58.334c75.303,0,149.962-20.172,215.908-58.334c65.607-37.967,120.681-92.6,159.278-158.008  C2626.32,1741.753,2626.32,1733.89,2622.386,1728.001z M2581.985,1737.822c-71.146,115.623-199.223,187.353-334.784,187.353 c-135.561,0-263.636-71.73-334.784-187.353c71.148-115.623,199.224-187.353,334.784-187.353 C2382.762,1550.469,2510.838,1622.199,2581.985,1737.822z" />
                      <path d="M2351.066,1633.957c-27.583-27.583-64.47-42.774-103.865-42.774s-76.282,15.191-103.865,42.774 c-27.583,27.583-42.774,64.47-42.774,103.865s15.191,76.283,42.774,103.866c27.583,27.583,64.47,42.774,103.865,42.774 s76.282-15.191,103.865-42.774c27.584-27.583,42.774-64.47,42.774-103.866S2378.65,1661.54,2351.066,1633.957z M2355.032,1737.822		c0,60.466-47.365,107.831-107.831,107.831s-107.831-47.365-107.831-107.831s47.365-107.831,107.831-107.831 S2355.032,1677.356,2355.032,1737.822z" />
                      <path d="M2345.492,1736.783c-3.389-48.641-28.158-70.859-48.341-80.933c-17.718-8.844-34.769-9.799-41.276-9.799 c-1.204,0-1.929,0.035-2.079,0.042l-2.505,0.125l1.449,27.371l0.14,2.463l2.465-0.098c0.048-0.002,0.278-0.009,0.669-0.009  		c3.389,0,15.407,0.48,27.783,6.658c19.212,9.59,29.935,28.519,31.867,56.259l0.174,2.494l29.828-2.078L2345.492,1736.783z" />
                    </svg>
                  </span>
                  <a href="https://www.facebook.com/Rosim.ru/" target="_blank" title="Facebook" className="social__item">
                    <svg className="icon-social" width={23} height={23} version="1.1" viewBox="0 0 10.54 20.88">
                      <path d="M10.32,0a.29.29,0,0,1,.21.31c0,1.05,0,2.11,0,3.16,0,.24-.14.35-.43.35H8.41a2.91,2.91,0,0,0-.57,0,.73.73,0,0,0-.65.71c0,.79,0,1.59,0,2.4h2.87c.37,0,.5.13.46.5q-.18,1.64-.37,3.28c0,.27-.16.37-.44.38H7.18v.25q0,4.46,0,8.93c0,.45-.09.54-.54.54H3.12c-.39,0-.5-.1-.5-.49q0-4.49,0-9v-.27H.5c-.4,0-.5-.1-.5-.49Q0,9.07,0,7.5C0,7.12.11,7,.49,7H2.72c0-.06,0-.11,0-.16q0-1.14,0-2.28a8.54,8.54,0,0,1,0-1A3.69,3.69,0,0,1,4.53.83a5.06,5.06,0,0,1,2-.76A1.17,1.17,0,0,0,6.78,0h.65A.78.78,0,0,0,7.6,0H10a.78.78,0,0,0,.17,0h.08Z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/rosim.ru/?igshid=4pp45xp2grv6 " target="_blank" title="Instagram" className="social__item">
                    <svg className="icon-social" width={23} height={23} version="1.1" viewBox="0 0 20.99 20.97">
                      <path d="M15.18.07H5.81A5.77,5.77,0,0,0,0,5.84V15.2A5.77,5.77,0,0,0,5.81,21h9.36a5.77,5.77,0,0,0,5.77-5.77V5.84A5.77,5.77,0,0,0,15.18.07ZM19.09,15.2a3.92,3.92,0,0,1-3.91,3.91H5.81A3.92,3.92,0,0,1,1.9,15.2V5.84A3.92,3.92,0,0,1,5.81,1.92h9.36a3.92,3.92,0,0,1,3.91,3.91Zm0,0" />
                      <path d="M10.49,5.13a5.38,5.38,0,1,0,5.39,5.38,5.39,5.39,0,0,0-5.39-5.38Zm0,8.91A3.53,3.53,0,1,1,14,10.52,3.53,3.53,0,0,1,10.49,14Zm0,0" />
                      <path d="M16.11,3.56a1.36,1.36,0,1,0,1,.4,1.36,1.36,0,0,0-1-.4Zm0,0" />
                    </svg>
                  </a>
                  <a href="#/auth" title="Личный кабинет" className="header-lk">
                    <svg className="header-lk-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={27} height={27} viewBox="12.925 15.26 101.816 94.157" enableBackground="new 12.925 15.26 101.816 94.157" xmlSpace="preserve">
                      <g>
                        <path d="M63.787,15.26c-15.447,0-28.015,11.533-28.015,25.709v12.194c0,14.175,12.567,25.708,28.015,25.708
  c15.448,0,28.017-11.532,28.017-25.708V40.969C91.804,26.793,79.235,15.26,63.787,15.26z M85.97,40.969v12.194
  c0,11.139-9.951,20.201-22.183,20.201c-12.23,0-22.181-9.062-22.181-20.201V40.969c0-11.14,9.95-20.202,22.181-20.202
  C76.019,20.767,85.97,29.83,85.97,40.969z" />
                        <path d="M102.767,75.264L91.9,72.226c-1.557-0.443-3.257,0.519-3.692,2.074c-0.216,0.771-0.118,1.579,0.274,2.276
  c0.393,0.696,1.033,1.198,1.803,1.413l10.85,3.033c5.057,1.454,7.62,3.778,7.62,6.909v8.705c0,3.746-3.047,6.794-6.793,6.794
  H25.704c-3.746,0-6.793-3.048-6.793-6.794v-8.705c0-1.16,0-4.689,7.592-6.901l11.38-3.149c1.59-0.44,2.526-2.093,2.087-3.683
  c-0.428-1.55-2.096-2.518-3.684-2.089l-11.418,3.162c-9.871,2.875-11.943,8.472-11.943,12.659v8.705
  c0,7.048,5.733,12.781,12.78,12.781h76.258c3.409,0,6.617-1.331,9.033-3.748c2.416-2.416,3.746-5.624,3.745-9.032v-8.705
  C114.741,83.724,112.665,78.11,102.767,75.264z" />
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="row menu">
                <div className="col-sm-12 col-md-offset-1 col-md-11">
                  <ul className="mmenu">
                    <li><a href="/about/structure/central">
                        Об агентстве</a></li>
                    <li><a href="/activities/sales">
                        Приватизация</a></li>
                    <li><a href="/activities/realization">
                        Продажа</a></li>
                    <li><a href="/activities/rent">
                        Аренда</a></li>
                    <li><a href="/activities/reestr/rfi">
                        Реестры</a></li>
                    <li><a href="/contacts">
                        Контакты</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="first_page" className="container-fluid">
        <div className="row" style={{margin: '0 0 4px 0', padding: 0}}>
          <div className="col-sm-12 text-center" style={{backgroundColor: '#1a1f6c'}}>
            <a href="/activities/rent/support">
              <img src="https://cdn.esphere.ru/images/ri/temp/support.png" style={{width: '100%'}} /></a>
          </div>
        </div>
        <div className="msp-counter">
          <div className="msp-counter__item">
            <span className="msp-counter__number">1 981</span>
            <div className="msp-counter__title">
              получено обращений<br />от субъектов МСП
            </div>
          </div>
          <div className="msp-counter__item">
            <span className="msp-counter__number">1 025</span>
            <div className="msp-counter__title">
              заключено<br />соглашений
            </div>
          </div>
          <div className="msp-counter__item">
            <span className="msp-counter__number">674</span>
            <div className="msp-counter__title">
              направлено субъектам МСП<br />соглашений на подписание
            </div>
          </div>
          <div className="msp-counter__item">
            <span className="msp-counter__number">49 893 730 ₽</span>
            <div className="msp-counter__title">
              освобождение<br />от уплаты
            </div>
          </div>
          <div className="msp-counter__item">
            <span className="msp-counter__number">231 988 390 ₽</span>
            <div className="msp-counter__title">
              отсрочка<br />уплаты
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <img src="https://cdn.esphere.ru/images/ri/temp/map.png" style={{width: '100%'}} />
          </div>
        </div>
        <div id="news_sale" className="row">
          <div id="fp_news" className="col-lg-6">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-7 col-lg-6">
                    <h2><a href="/press/news">Новости</a></h2>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-5 col-lg-6 text-right"><a className="alln" href="/press/news?doc_type=724">сми о нас</a> <a className="alln" href="/press/news">все новости</a></div>
                </div>
              </div>
            </div>
            <div className="row fp_news">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h3>
                  <a href="/press/news/373139" className="list_title">Прямая связь по вопросам отсрочки и освобождения от арендных платежей субъектов малого и среднего предпринимательства +7 (925) 054-72-12</a>
                </h3>
                <p className="ndate text-right" style={{margin: 0}}>01.05.2020</p>
              </div>
            </div>
            <div className="row fp_news">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h3>
                  <a href="/press/news/370535" className="list_title">О правилах профилактики коронавирусной инфекции</a>
                </h3>
                <p className="ndate text-right" style={{margin: 0}}>17.03.2020</p>
              </div>
            </div>
            <div className="row fp_news">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h3>
                  <a href="/press/news/375463" className="list_title">Арендаторы федерального имущества получат дополнительную помощь от государства</a>
                </h3>
                <p className="ndate text-right" style={{margin: 0}}>20.05.2020</p>
              </div>
            </div>
          </div>
          {/*продажа акций и недвижимости*/}
          <div id="fp_sale" className="col-lg-6">
            <div className="row">
              <div className="col-sm-12"><h2><a href="/activities/sales/privatization/stock">Продажа акций</a></h2></div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="table_t">
                  <div className="column w15" />
                  <div className="column w55" />
                  <div className="column w10" />
                  <div className="column w20" />
                  <div />
                  <div className="table_row_fp_h">
                    <div className="table_cell">Подведение итогов</div>
                    <div className="table_cell">Наименование имущества</div>
                    <div className="table_cell">%% в УК</div>
                    <div className="table_cell">Начальная цена, руб.</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell t_date">04.06.2020</div>
                    <div className="table_cell">
                      <a href="http://esugi.rosim.ru/Section/Privatization/Viewer/Index/9ea41fd8-aa8e-4a76-9532-5842f59f2494?idProcess=62B453F6-1880-4474-B6B1-7DF28E23D5E6">МОСХОЛОД, г. Москва</a>
                    </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>99,97 </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>220&nbsp;263&nbsp;000</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell t_date">30.06.2020</div>
                    <div className="table_cell">
                      <a href="http://esugi.rosim.ru/Section/Privatization/Viewer/Index/9ea41fd8-aa8e-4a76-9532-5842f59f2494?idProcess=AE8EA685-7736-4889-A4BF-81593291FEFC">Научно-исследовательский центр "Зарубежсхема", г. Москва</a>
                    </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>100 </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>375&nbsp;782&nbsp;000</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell t_date">30.06.2020</div>
                    <div className="table_cell">
                      <a href="http://esugi.rosim.ru/Section/Privatization/Viewer/Index/9ea41fd8-aa8e-4a76-9532-5842f59f2494?idProcess=08C920A5-EC76-46DB-A7EE-435344EC5EA5">Тюменская противофонтанная часть, г. Тюмень</a>
                    </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>100 </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>27&nbsp;800&nbsp;000</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell t_date">30.06.2020</div>
                    <div className="table_cell">
                      <a href="http://esugi.rosim.ru/Section/Privatization/Viewer/Index/9ea41fd8-aa8e-4a76-9532-5842f59f2494?idProcess=889806BA-1E7C-40A9-8887-6DE227E17982">Инструмент-СВ, г. Санкт-Петербург</a>
                    </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>36,53 </div>
                    <div className="table_cell" style={{textAlign: 'right'}}>16&nbsp;655&nbsp;000</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12"><h2><a href="/activities/realization/confiscat" title="Продажа арестованного, конфискованного и иного имущества">Продажа имущества</a></h2></div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="table_t">
                  <div className="column w15" />
                  <div className="column w70" />
                  <div className="column w15" />
                  <div className="table_row_fp_h">
                    <div className="table_cell">Дата торгов</div>
                    <div className="table_cell">Наименование имущества</div>
                    <div className="table_cell">Стоимость, руб.</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell">29.05.2020</div>
                    <div className="table_cell"><a href="http://esugi.rosim.ru/Section/PIBI/Viewer/Index/3aaca2b1-c31d-464e-b087-63583d1517d8?IdPropertys=cbfbd005-aa4b-42c0-adac-00dc2cebe006" target="_blank">
                        Квартира, Воронеж, ул. Космонавта Комарова, д.6, кв.103</a></div>
                    <div className="table_cell" style={{textAlign: 'right', whiteSpace: 'nowrap'}}>1&nbsp;951&nbsp;000</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell">29.05.2020</div>
                    <div className="table_cell"><a href="http://esugi.rosim.ru/Section/PIBI/Viewer/Index/3aaca2b1-c31d-464e-b087-63583d1517d8?IdPropertys=424f34f7-5ee8-4c9c-b77f-06256b01118d" target="_blank">
                        Земельный участок сельскохозяйственного назначения-для садоводства, площадью 1500 кв. м., расположенный по адресу: Курганская обл., Кетовский район, микр. Березки-1, 25, кадастровый №45:08:011201:1374</a></div>
                    <div className="table_cell" style={{textAlign: 'right', whiteSpace: 'nowrap'}}>96&nbsp;050</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell">29.05.2020</div>
                    <div className="table_cell"><a href="http://esugi.rosim.ru/Section/PIBI/Viewer/Index/3aaca2b1-c31d-464e-b087-63583d1517d8?IdPropertys=b9269e1a-3664-4377-abbc-08608697035e" target="_blank">
                        Земельный участок площадью 166999 кв. м., расположенный по адресу: Курганская область, Кетовский район, АО им. Ленина, кадастровый номер 45:08:020402:122, назначение объекта: для сельскохозяйственного использования.</a></div>
                    <div className="table_cell" style={{textAlign: 'right', whiteSpace: 'nowrap'}}>1&nbsp;201&nbsp;050</div>
                  </div>
                  <div className="table_row_fp">
                    <div className="table_cell">29.05.2020</div>
                    <div className="table_cell"><a href="http://esugi.rosim.ru/Section/PIBI/Viewer/Index/3aaca2b1-c31d-464e-b087-63583d1517d8?IdPropertys=39e37ad7-9507-4e84-bcd2-08863769a5ff" target="_blank">
                        Земельный участок сельскохозяйственного назначения-для садоводства, площадью 1500 кв. м., расположенный по адресу: Курганская обл., Кетовский район, микр. Березки-1, 68, кадастровый №45:08:011201:1417</a></div>
                    <div className="table_cell" style={{textAlign: 'right', whiteSpace: 'nowrap'}}>96&nbsp;050</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
        <div className="row">
          <div className="col-sm-12">
            <div id="links" className="table_t">
              <div className="column w50 col1" />
              <div className="column w50 col2" />
              <div className="table_row_f">
                <div className="table_cell">
                  <h3>Электронные торговые площадки</h3>
                  <div className="col-sm-12">
                    <ul>
                      <li><a href="http://sale.zakazrf.ru/" target="_blank">АО "Агентство по государственному заказу Республики Татарстан"</a></li>
                      <li><a href="https://www.roseltorg.ru/" target="_blank">АО "Единая электронная торговая площадка"</a></li>
                      <li><a href="https://auction-house.ru/catalog/list/federalnaya-privatizaciya/" target="_blank">АО "Российский аукционный дом"</a></li>
                      <li><a href="https://www.tektorg.ru/" target="_blank">АО "ТЭК-Торг"</a></li>
                      <li><a href="https://www.etp-torgi.ru/" target="_blank">АО "Электронные торговые системы"</a></li>
                      <li><a href="http://www.sberbank-ast.ru/" target="_blank">ЗАО "Сбербанк - Автоматизированная система торгов"</a></li>
                      <li><a href="https://www.rts-tender.ru/" target="_blank">ООО "РТС-тендер"</a></li>
                      <li><a href="https://etpgpb.ru/" target="_blank">ООО "Электронная торговая площадка ГПБ"</a></li>
                    </ul>
                  </div>
                </div>
                <div className="table_cell">
                  <h3>Межведомственный портал</h3>
                  <div className="col-sm-12">
                    <ul>
                      <li><a href="https://mvpt.rosim.ru/LK_Redirect/">Вход в личный кабинет</a></li>
                      <li><a href="https://mvpt.rosim.ru/SitePages/%D0%90%D0%BD%D0%BE%D0%BD%D0%B8%D0%BC%D1%83%D1%81/%D0%92%D1%8B%D0%B1%D0%BE%D1%80%D0%A2%D0%B8%D0%BF%D0%B0%D0%A0%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8.aspx">Регистрация на межведомственном портале</a></li>
                      <li><a href="http://esugi.rosim.ru/Users/Recovery">Восстановить пароль</a></li>
                      <li><a href="https://mvpt.rosim.ru/">Вход без регистрации</a></li>
                      <li><a href="https://mvpt.rosim.ru/instruction/">Инструкции</a></li>
                      <li><a href="https://mvpt.rosim.ru/instructions/Commission/Pages/default.aspx">Комиссия по отбору профессиональных директоров</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="ind_form" className="row">
          <div className="col-sm-12">
            <a className="moex-link cboxElement" href="/addons/moex">
              <div className="exch_ind">
                <div className="col-sm-12">
                  <h2>Динамика индекса московской биржи<br /> компаний с государственным участием</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: "\n#carousel-banners h3 {\n    margin-bottom:10px;\n    color:#fff;\n}\n#carousel-banners h3::before {\n    color: #fff;\n}\n" }} />
        <div id="pools" className="row">
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 text-center legend_errm">
            Нашли ошибку в тексте? Выделите ее и нажмите <span>CTRL</span> + <span>ENTER</span>
          </div>
        </div>
      </div>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-0 col-md-2">
              <a href="/" className="footer-logo-link">
                <img src="https://cdn.esphere.ru/images/ri/temp/logo-sm.png" className="footer-logo" alt="Росимущество" />
              </a>
              <br /><br />
              <a href="http://government.ru" target="_blank">
                <img src="https://cdn.esphere.ru/images/ri/temp/logo-gov-dark.svg" className="footer-logo" alt="Правительства РФ" />
              </a>
            </div>
            <div className="col-sm-4 col-md-3 bmenu">
              <ul>
                <li>
                  <a href="/covid19">Коронавирус: что необходимо знать</a>
                  <ul>
                    <li><a href="/covid19/news">
                        Новости</a></li>
                  </ul></li>
                <li><a href="/hero">Наши герои</a></li>
                <li><a href="/victory75">Конкурс детского рисунка</a></li>
                <li>
                  <a href="/about">Об агентстве</a>
                  <ul>
                    <li><a href="/about/common">
                        Общие сведения</a></li>
                    <li><a href="/about/structure">
                        Структура и руководство</a></li>
                    <li><a href="/about/job">
                        Госслужба</a></li>
                    <li><a href="/about/reports">
                        Планы и отчеты</a></li>
                    <li><a href="/about/systems">
                        Информационные системы</a></li>
                  </ul></li>
                <li><a href="/documents">Документы</a></li>
                <li>
                  <a href="/press">Пресс-служба</a>
                  <ul>
                    <li><a href="/press/news">
                        Новости</a></li>
                  </ul></li>
                <li>
                  <a href="/contacts">Контакты</a>
                  <ul>
                    <li><a href="/contacts/info">
                        Контактная информация</a></li>
                    <li><a href="/contacts/dep_contacts">
                        Контакты структурных подразделений</a></li>
                    <li><a href="/contacts/requests">
                        Обращения граждан</a></li>
                    <li><a href="/contacts/exemption">
                        Отправить заявление на получение льготы</a></li>
                  </ul></li>
                <li><a href="/opendata">Открытые данные</a></li>
                <li><a href="/activities/increase_transparency/public/sostav">Общественный совет</a></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 bmenu">
              <ul>
                <li>
                  <a href="/activities">Деятельность</a>
                  <ul>
                    <li><a href="/activities/services">
                        Государственные услуги</a></li>
                    <li><a href="/activities/realization">
                        Реализация и распоряжение имуществом</a></li>
                    <li><a href="/activities/sales">
                        Приватизация</a></li>
                    <li><a href="/activities/land">
                        Федеральные земельные участки</a></li>
                    <li><a href="/activities/rent">
                        Аренда федерального имущества</a></li>
                    <li><a href="/activities/purchases">
                        Государственные закупки</a></li>
                    <li><a href="/activities/interaction">
                        Межведомственное взаимодействие</a></li>
                    <li><a href="/activities/programs">
                        Федеральные целевые и государственные программы</a></li>
                    <li><a href="/activities/international">
                        Международное сотрудничество</a></li>
                    <li><a href="/activities/court">
                        Обзор судебных дел</a></li>
                    <li><a href="/activities/anticorruption">
                        Противодействие коррупции</a></li>
                    <li><a href="/activities/corp">
                        Корпоративное управление</a></li>
                    <li><a href="/activities/increase_transparency">
                        Открытое Агентство</a></li>
                    <li><a href="/activities/reestr">
                        Учет федерального имущества и ведение его реестра</a></li>
                    <li><a href="/activities/bankrotstvo">
                        Информация о ходе и результатах рассмотрения обращений, поступивших в рамках статьи 130 Федерального закона от 26 октября 2002 г. № 127-ФЗ «О несостоятельности (банкротстве)» </a></li>
                    <li><a href="/activities/protect">
                        Деятельность в области защиты населения и территорий от чрезвычайных ситуаций природного и техногенного характера</a></li>
                  </ul></li>
              </ul>
            </div>
            <div className="col-sm-offset-1 col-sm-3 col-md-offset-1 col-md-3 bmenu bpages">
              <ul>
                <li><a href="/search">
                    Поиск по сайту</a></li>
                <li><a href="/map">
                    Карта сайта</a></li>
                <li><a href="/reg/subs">
                    Подписка</a></li>
                <li><a href="/rss">
                    RSS</a></li>
                <li><a href="/tag/theme">
                    Теги</a></li>
                <li><a href="/tag/geo">
                    География</a></li>
                <li><a href="/terms">
                    Условия пользования сайтом</a></li>
                <li><a href="/activities/increase_transparency/polls/current">
                    Опросы</a></li>
                <li><a href="http://old.rosim.ru">
                    Старая версия сайта</a></li>
                <li><a href="https://metrika.yandex.ru/dashboard?id=42190024" target="_blank">Статистика посещаемости</a></li>
              </ul>
              <span id="sputnik-informer"><a href="https://cnt.sputnik.ru/public/rosim.ru" target="_blank"><img width={88} height={31} src="https://cnt.sputnik.ru/informer?domain=rosim.ru&tz=180" title="Просмотры, визиты, посетители за текущие сутки" alt="Счетчик Спутника" /></a></span>
              <div className="copy">
                <h1>© 2019 Федеральное агентство по управлению государственным имуществом.</h1>
                <p>Свидетельство о регистрации средства массовой информации Эл № ФС77-65713 от 13 мая 2016 года. <br /> <a href="/images/SVIDETELSTVO_o_postanovke_na_uchet.pdf" target="_blank">Свидетельство о постановке на налоговый учет</a>. <a href="/images/SVIDETELSTVO_o_registracii.pdf" target="_blank">Свидетельство о регистрации</a>.</p>
                {/* Yandex.Metrika counter */}
                <noscript>&lt;div&gt;&lt;img src="https://mc.yandex.ru/watch/42190024" style="position:absolute; left:-9999px;" alt="" /&gt;&lt;/div&gt;</noscript>
                {/* /Yandex.Metrika counter */}
              </div>
              <div className="svreg">
                <p><a href="http://maps.yandex.ru/?text=109012%2C+%D0%B3.+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C+%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%B5%D1%80.%2C+%D0%B4.9" target="_blank">109012, г. Москва, Никольский пер.,9</a>, тел. <span>+7 495 539-58-62; +7 495 647-71-77</span>, факс +7 495 647-72-39, <a href="mailto:rosim0@rosim.ru">rosim0@rosim.ru</a></p>
                <p>Служба технической поддержки сайта: <a href="mailto:support_site@rosim.ru">support_site@rosim.ru</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </>
);