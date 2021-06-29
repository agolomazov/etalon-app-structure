const path = require('path');

const appPaths = {
  // папка с исходниками приложения
  appDir: path.resolve(__dirname, '../../src'),
  // папка с общими элементами приложения (утилиты, компоненты и т.п.)
  appCommon: path.resolve(__dirname, '../../src/common'),
  // папка с модулями приложения
  appFeatures: path.resolve(__dirname, '../../src/features'),
  // папка с процессами приложения
  appProcesses: path.resolve(__dirname, '../../src/processes'),
  // папка с конфигурацией redux-store приложения
  appStore: path.resolve(__dirname, '../../src/store'),
  // папка с контейнерами страниц приложения
  appPages: path.resolve(__dirname, '../../src/pages'),
  // папка с билдом приложения
  appDist: path.resolve(__dirname, '../../dist'),
  // папка с ресурсами приложения (картинками шрифтами и пр.)
  appAssets: path.resolve(__dirname, '../../puplic'),
  // папка со стилями
  appStyles: path.resolve(__dirname, '../../src/common/styles'),
  // точка входа в приложение
  appIndex: path.resolve(__dirname, '../../src/index.jsx'),
  // HTML шаблон приложения
  appHTMLTemplate: path.resolve(__dirname, '../../dist/index.html'),
  // Favicon приложения
  appFavicon: path.resolve(__dirname, '../../dist/logo.svg'),
  // путь к папке package.json
  appPackageJson: path.resolve(__dirname, '../../package.json'),
  // папка с мокапами
  appMockups: path.resolve(__dirname, '../../src/mockups'),
  // папка с mockup-страницами
  appMockupsPages: path.resolve(__dirname, '../../src/mockups/pages'),
  // папка с mockup-компонентами
  appMockupsComponents: path.resolve(__dirname, '../../src/mockups/components'),
  // папка с mockup-layouts
  appMockupsLayouts: path.resolve(__dirname, '../../src/mockups/layouts'),
  // точка входа в мокап-приложении
  appMockupsIndex: path.resolve(__dirname, '../../src/mockups/index.jsx'),
};

module.exports = appPaths;
