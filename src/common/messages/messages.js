import { getByKey } from '@common/utils';

export const uiMessages = {
  btnSubmit: 'Отправить',
  btnDownload: 'Скачать',
  btnSign: 'Подписать',
  btnSignAndSubmit: 'Подписать и отправить',
  btnReject: 'Отклонить',
  btnAppendContract: '+ Добавить договор',
  btnDeleteContract: 'Удалить договор',
  btnPay: 'Оплатить',
  btnSubmitFilter: 'Применить',
  btnClearFilter: 'Сбросить',
  btnCancel: 'Отменить',
  btnSelect: 'Выбрать',
  btnClearList: 'Очистить список',
  btnReady: 'Готово',
  btnClose: 'Закрыть',
  btnConfirmReceipt: 'Я получил документы',
  btnLogout: 'Выход',
  msgNoAddress: 'Адрес отсутствует',
  ratingSentMessage: 'Спасибо за оценку - мы трудимся для вас!',
  requestAccessError: {
    title: 'Ошибка доступа',
    message: 'У вас нет прав на просмотр данного ресурса',
  },
  requiredMessage: 'Заполните',
  requiredFileMessage: 'Необходимо добавить файл',
  fileIsTooBigMessage: 'Размер файла превышает 10 мб',
  wrongFileFormatMessage: 'Недопустимый формат файла',
  wrongEmailMessage: 'Введите адрес электронной почты',
  wrongSubleaseTaxNumber: 'Введите ИНН субарендатора',
  modalText: (txt) => `Получение текста сообщения ${txt}`,
  notifyAppealSentSuccess: (title) => `Обращение ${title} успешно отправлено`,
};

/**
 * Метод возвращает сообщение для вывода на UI
 *
 * @returns {string|object|function|any}
 */
export const getUiMessages = getByKey(uiMessages, '');
