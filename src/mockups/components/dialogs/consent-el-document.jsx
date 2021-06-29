import React from 'react';
import * as L from 'korus-ui';

/**
 * ## Mockup главной страницы
 * @example
 * <ConsentElDocument />
 */
export const ConsentElDocument = (props) => {
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
        <L.Img src="https://cdn.esphere.ru/images/ri/el-doc.png" alt="Письмо с уведомлением об изменении арендной платы" className="modal-img" />
        <L.Div className="window-content">
          <L.H2 className="modal-title padding-bottom-24">Согласие на электронный документооборот</L.H2>
          <L.Div className="modal-scroll">
            <L.Div className="modal-scroll-content">
              <L.H5 className="padding-bottom-16">
                Согласие на получение юридически значимых сообщений/документов в электронном виде
                в Личном кабинете Арендатора
              </L.H5>
              <L.P>
                Настоящим проставлением отметки («галочки») в специальном поле
                «Я принимаю условия Согласия на получение юридически значимых сообщений электронным способом доставки в Личный
                кабинет Арендатора», Я, <strong>Кохан Александр Иванович</strong>, действующий от имени <strong>ООО «Мир
                ФМ»</strong>, <strong>ИНН 3328420555</strong>, (далее по тексту – Арендатор) даю согласие на изменение
                способа доставки всех юридически значимых сообщений (документов), связанных с исполнением договоров аренды,
                заключенных между Росимуществом (территориальными органами Росимущества) и Арендатором в отношении
                федерального имущества, в том числе земельных участков, на электронный способ доставки в Личный кабинет Арендатора.
              </L.P>
            </L.Div>
            <L.Div className="modal-fixed padding-bottom-24">
              <L.CheckBox>
                Я даю согласие на получение юридически значимых сообщений/документов в электронном виде в Личном кабинете Арендатора
              </L.CheckBox>
            </L.Div>
          </L.Div>
        </L.Div>
      </L.ModalBody>
      <L.ModalFooter>
        <L.Button className="margin-right-16" onClick={() => setIsOpen(!isOpen)}>
          Выход
        </L.Button>
        <L.Button className="success" onClick={() => setIsOpen(!isOpen)}>
          Согласен
        </L.Button>
      </L.ModalFooter>
    </L.Modal>
  );
};
