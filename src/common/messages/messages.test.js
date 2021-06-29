import { getUiMessages, uiMessages } from './messages';

describe('getUIMessages - метод возвращает текстовки для UI', () => {
  test('Получение простой строки', () => {
    expect(getUiMessages('btnSubmit')).toEqual(uiMessages.btnSubmit);
  });

  test('Получение значения по умолчанию', () => {
    expect(getUiMessages('warnBtn')).toEqual('');
  });

  test('Получение объекта', () => {
    expect(getUiMessages('requestAccessError')).toEqual(
      uiMessages.requestAccessError,
    );
  });

  test('Получение функции', () => {
    const modalText = getUiMessages('modalText');
    const txt = 'some text';

    expect(modalText(txt)).toEqual(
      expect.stringContaining(uiMessages.modalText(txt)),
    );
  });
});
