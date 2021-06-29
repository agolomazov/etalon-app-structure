import React from 'react';
import * as L from 'korus-ui';

/**
 * Компонент для кастомизация FileDrop
 * @param {object} props - параметры компонента
 * @param {boolean} props.isSuccess - состояния успешной загрузки
 * @param {Function} props.onDeleteClick - обработчик для кнопки "Удалить"
 *
 * @returns {React.FC} Компонент для кастомизация FileDrop
 */
export const FileDropVariantRender = ({
  isSuccess = false,
  onDeleteClick,
  children,
}) => (
  <>
    <L.I
      _margin-bottom-8
      _title-main
      _novicon-success-fill={isSuccess}
      _txt-success={isSuccess}
      _novicon-error-circle-fill={!isSuccess}
      _txt-danger={!isSuccess}
    />

    {children}

    <L.Div className="flex-row align-items-center">
      <L.Button className="margin-top-8">
        <L.I className="novicon-revert margin-right-8 txt-gray" />
        Заменить файл
      </L.Button>
      <L.Button
        shouldRender={!!onDeleteClick}
        className="margin-top-8 margin-left-8"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(e);
        }}
      >
        <L.I className="novicon-trash margin-right-8 txt-gray" />
        Удалить
      </L.Button>
    </L.Div>
  </>
);
