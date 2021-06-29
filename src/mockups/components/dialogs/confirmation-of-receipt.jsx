import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Mockup главной страницы
 * @example
 * <ConfirmationOfReceipt />
 */
export const ConfirmationOfReceipt = (props) => {
  const { isOpen, setIsOpen } = props;

  if (!isOpen) return null;
  return (
    <L.Modal
      isOpen
      onCloseButtonClick={() => {
        setIsOpen(false);
      }}
      onOverlayClick={() => {
        setIsOpen(false);
      }}
      onEscapePress={() => {
        setIsOpen(false);
      }}
      size="md"
    >
      <L.ModalBody className="modal-with-img">
        <L.Img src="https://cdn.esphere.ru/images/ri/new-docs.png" alt="Письмо с уведомлением об изменении арендной платы" className="modal-img" />
        <L.Div className="window-content">
          <L.H2 className="modal-title padding-bottom-24">Новые входящие документы</L.H2>
          <L.Div className="modal-scroll">
            <L.Div className="border-bottom margin-bottom-16 padding-bottom-24">
              <L.Div className="txt-gray padding-bottom-8">20.02.2020 в 20:20</L.Div>
              <L.H6 className="padding-bottom-8">Уведомление об изменении арендной платы</L.H6>
              <L.P>Со второго квартала 2020 года будет изменены условия.</L.P>
              <L.Div className="secondary flex-row justify-content-between align-items-center padding-x-16 padding-y-12">
                <L.Div>
                  <L.I className="novicon-doc-list margin-right-12 txt-gray" />
                  <L.A href="#" download>File.pdf</L.A>
                </L.Div>
                <L.Span className="txt-gray">10 Мб</L.Span>
              </L.Div>
            </L.Div>
            <L.Div>
              <L.Div className="txt-gray padding-bottom-8">20.02.2020 в 20:15</L.Div>
              <L.H6 className="padding-bottom-8">Уведомление об изменении реквизитов для оплаты</L.H6>
              <L.P>Реквизиты для оплаты были изменены. Просьба учесть в работе.</L.P>
              <L.Div className="secondary flex-row justify-content-between align-items-center padding-x-16 padding-y-12">
                <L.Div>
                  <L.I className="novicon-doc-list margin-right-12 txt-gray" />
                  <L.A href="#" download>File.pdf</L.A>
                </L.Div>
                <L.Span className="txt-gray">10 Мб</L.Span>
              </L.Div>
            </L.Div>
          </L.Div>
        </L.Div>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button className="success" onClick={() => setIsOpen(!isOpen)}>
          Я получил документы
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
