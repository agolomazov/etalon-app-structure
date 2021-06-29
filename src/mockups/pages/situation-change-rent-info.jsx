import React from 'react';
import * as L from 'korus-ui';
import { Link } from 'react-router-dom';

import { MainLayout } from '@mockups-layouts/main-layout';

/**
 * ## Mockup ЖС Внести изменения в характеристики арендованных объектов
 * @example
 * <SituationContract />
 */
export const SituationChangeRentInfo = () => {
  const [act, setAct] = React.useState();
  const actChange = (ev) => setAct(ev.component.value);

  const [MultiSelectValue, setMultiSelectValue] = React.useState([]);
  const handleChange = (ev) => {
    setMultiSelectValue(ev.component.value);
  };

  console.log(MultiSelectValue);

  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loaded, setLoaded] = React.useState(0);

  return (
    <MainLayout>
      <L.Div className="page-title">
        <L.Div className="flex-row align-items-center">
          <Link
            to="/situations-list"
            className="novicon-arrow-backward backward-link txt-gray margin-right-12"
          />
          <L.H1>Внести изменения в характеристики арендованных объектов</L.H1>
        </L.Div>
      </L.Div>

      <L.Div className="page-content padding-x-32 padding-y-16 border-top no-background">
        <L.Div className="page-wrapper">
          <L.H6 className="margin-bottom-12">
            1. Выберите арендованный объект, характеристики которого требуют
            уточнений
          </L.H6>
          <L.Dl className="list form w-30 margin-bottom-32">
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
                    <Element
                      {...elementProps}
                      className="input-element padding-left-none"
                    />
                  </>
                )}
                className="width-35 margin-right-16"
                form="changeRentInfo"
                name="contractNum"
                placeholder="Договора"
                value="17/3Д-0500"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>Дата договора</L.Label>
            </L.Dt>
            <L.Dd>
              <L.DatePicker
                className="input-xs"
                isDisabled
                placeholder="дд.мм.гггг"
                value="12.06.2020"
              />
            </L.Dd>
            <L.Dt>
              <L.Label>Выберите действие</L.Label>
            </L.Dt>
            <L.Dd>
              <L.DropDownSelect
                className="width-80"
                value={act}
                onChange={actChange}
                placeholder="Выберите"
                data={[
                  'Сообщить об отсутствии данных по объектам',
                  'Внести изменения в характеристики объектов',
                ]}
              />
            </L.Dd>
            {act === 'Сообщить об отсутствии данных по объектам' && (
              <>
                <L.Dt>
                  Отсутствующая информация
                </L.Dt>
                <L.Dd>
                  <L.Dl className="list w-40 padding-x-16 padding-top-16 padding-bottom-8 secondary width-80 margin-bottom-none">
                    <L.Dt>Адрес: </L.Dt>
                    <L.Dd>5 объектов</L.Dd>
                    <L.Dt>Площадь: </L.Dt>
                    <L.Dd>5 объектов</L.Dd>
                    <L.Dt>Кадастровый номер: </L.Dt>
                    <L.Dd>5 объектов</L.Dd>
                  </L.Dl>
                </L.Dd>
                <L.Dt>
                  <L.Label>Комментарий</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Textarea form="changeRentInfo" placeholder="Введите" />
                </L.Dd>
              </>
            )}
            {act === 'Внести изменения в характеристики объектов' && (
              <>
                <L.Dt>
                  <L.Label>Адрес объекта</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    form="changeRentInfo"
                    name="address"
                    placeholder="Введите адрес объекта"
                    value="обл. Архангельская, р-н. Приморский, МО Катунинское, дер. Лахта, ул. Геологов"
                  />
                  <L.Div className="width-80 margin-top-4 txt-gray">
                    Начните вводить адрес. В случае его отсутствия в предложенном списке,
                    введите его собственноручно в соответсвии с договором.
                  </L.Div>
                </L.Dd>
                <L.Dt>
                  <L.Label>Кадастровый номер</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    form="changeRentInfo"
                    name="number"
                    isDisabled
                    placeholder="Введите кадастровый номер объекта"
                    value="47:14:1203001:814"
                  />
                </L.Dd>
                <L.Dt>
                  <L.Label>Тип объекта</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.Input
                    className="width-35"
                    form="changeRentInfo"
                    placeholder="Введите"
                    value="Земельный участок"
                    isDisabled
                  />
                  {/* <L.DropDownSelect
                    className="width-35"
                    form="changeRentInfo"
                    placeholder="Выберите"
                    data={[
                      'Земельный участок',
                      'Здания, сооружения',
                      'Помещения',
                      'Имущественный комплекс',
                      'Комплекс земельных участков',
                      'Воздушные и морские суда',
                      'Движимое имущество',
                      'Доли в праве',
                      'Иное движимое имущество',
                    ]}
                  /> */}
                </L.Dd>
              </>
            )}
          </L.Dl>

          {act === 'Внести изменения в характеристики объектов' && (
            <>
              <L.H6 className="margin-bottom-12">
                2. Укажите характеристики, которые требуют внесения изменений
              </L.H6>
              <L.Dl className="list form w-30 margin-bottom-32">
                <L.Dt>
                  <L.Label>Характеристики объекта</L.Label>
                </L.Dt>
                <L.Dd>
                  <L.MultiSelect
                    className="width-100"
                    maxTags={4}
                    shouldKeepSuggestions
                    shouldSelectedGoFirst
                    canSelectAll
                    placeholder="Выберите характеристики"
                    value={MultiSelectValue}
                    onChange={handleChange}
                    data={[
                      'Адрес объекта',
                      'Кадастровый номер',
                      'Площадь',
                      'Вид разрешенного использования',
                      'Категория',
                      'Назначение объекта',
                      'Комментарий',
                    ]}
                    listRender={({ componentProps, Element, elementProps }) => {
                      const { onClick } = elementProps;
                      return (
                        <>
                          <L.Ul {...elementProps} />
                          <L.Ul className="list-h inner-16 txt-right border-top">
                            <L.Li>
                              <L.Button className="blank more">
                                Очистить список
                              </L.Button>
                            </L.Li>
                            <L.Li>
                              <L.Button className="success">Выбрать</L.Button>
                            </L.Li>
                          </L.Ul>
                        </>
                      );
                    }}
                    hasCheckBoxes
                    tagsUnionRender={({
                      elementProps,
                      componentProps,
                      Element,
                    }) => {
                      const { value } = componentProps;
                      const choose = L.utils.getWordEnding({
                        count: value?.length ?? 0,
                        one: 'Выбрана',
                        two: 'Выбрано',
                        five: 'Выбрано',
                      });
                      const status = L.utils.getWordEnding({
                        count: value?.length ?? 0,
                        one: 'характеристика',
                        two: 'характеристики',
                        five: 'характеристик',
                      });
                      return (
                        <Element {...elementProps}>
                          {`${choose} ${value?.length} ${status}`}
                        </Element>
                      );
                    }}
                  />
                </L.Dd>
                {MultiSelectValue.includes('Адрес объекта') && (
                  <>
                    <L.Dt>
                      <L.Label>Новый адрес объекта</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        form="changeRentInfo"
                        name="address"
                        placeholder="Введите новый адрес"
                      />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.includes('Кадастровый номер') && (
                  <>
                    <L.Dt>
                      <L.Label>Новый кадастровый номер</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        placeholder="Введите новый кадастровый номер"
                      />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.includes('Площадь') && (
                  <>
                    <L.Dt>
                      <L.Label>Площадь</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        className="width-35"
                        inputRender={({ Element, elementProps }) => (
                          <>
                            <Element {...elementProps} className="autocomplete-input padding-right-none txt-right" />
                            <L.Span className="input-addon shrink-0 margin-left-4 margin-right-8 txt-gray">
                              кв. м
                            </L.Span>
                          </>
                        )}
                      />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.includes('Вид разрешенного использования') && (
                  <>
                    <L.Dt>
                      <L.Label>Вид разрешенного использования</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Textarea form="changeRentInfo" placeholder="Введите" />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.includes('Категория') && (
                  <>
                    <L.Dt>
                      <L.Label>Категория</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.DropDownSelect
                        form="changeRentInfo"
                        placeholder="Выберите"
                        data={[
                          'Земли сельскохозяйственного значения',
                          'Земли населенных пунктов',
                          'Земли промышленности и иного специального назначения',
                          'Земли особо охраняемых территорий и объектов',
                          'Земли лесного фонда',
                          'Земли водного фонда',
                          'Земли запаса',
                        ]}
                      />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.includes('Назначение объекта') && (
                  <>
                    <L.Dt>
                      <L.Label>Назначение объекта</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Input
                        form="changeRentInfo"
                        placeholder="Введите назначение объекта"
                      />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.length > 0 && (
                  <>
                    <L.Dt>
                      <L.Label>
                        Документ
                      </L.Label>
                      <L.Div className="txt-gray margin-top-8">
                        Загрузите скан-копии документов, подтверждающих  изменение данных
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
                      />
                    </L.Dd>
                  </>
                )}
                {MultiSelectValue.includes('Комментарий') && (
                  <>
                    <L.Dt>
                      <L.Label>Комментарий</L.Label>
                    </L.Dt>
                    <L.Dd>
                      <L.Textarea form="changeRentInfo" placeholder="Текст сообщения" />
                    </L.Dd>
                  </>
                )}
              </L.Dl>
            </>
          )}
        </L.Div>
        <L.Div className="margin-top-auto">
          <L.Div className="toolbar padding-x-32 margin-top-auto margin-x-32-negative txt-right">
            <L.Button className="success">Отправить</L.Button>
          </L.Div>
        </L.Div>
      </L.Div>
    </MainLayout>
  );
};
