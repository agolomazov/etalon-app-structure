import { getConfig, config } from './config';

describe('getConfig - метод возвращает настройку или значение по умолчанию', () => {
  test('Получение значения настройки', () => {
    expect(getConfig('maxFileSize')).toEqual(config.maxFileSize);
  });

  test('Получение значени по умолчанию', () => {
    expect(getConfig('noneConfig', null)).toBeNull();
  });

  test('Получение значения по длинному пути', () => {
    expect(getConfig('modules.errors', '')).toEqual(config.modules.errors);
  });

  test('Получение значения по умолчанию, если не найдено значение по длинному пути', () => {
    const defaultValue = 'DEFAULT_VALUE';
    expect(getConfig('none.config.value', defaultValue)).toEqual(defaultValue);
  });
});

describe('getConfig - получение текущих настроек', () => {
  describe('Получение названий модулей', () => {
    it('ERRORS', () => {
      expect(getConfig('modules.errors', '')).toEqual('errors');
    });

    it('LOADING', () => {
      expect(getConfig('modules.loading', '')).toEqual('loading');
    });

    it('NOTICES', () => {
      expect(getConfig('modules.notices', '')).toEqual('notices');
    });

    it('ROUTER', () => {
      expect(getConfig('modules.router', '')).toEqual('router');
    });
  });
});
