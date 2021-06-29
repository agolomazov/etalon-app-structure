# **Данный проект является демонстрацией того, как реализуются Frontend-регламенты в коде.**

# UI ЛК Арендатора Росимущества

Репозиторий проекта: [Bitbucket Sbercloud](https://atlas.swec.sbercloud.ru/bitbucket/projects/ARLK/repos/arlk-tenant-ui/browse)  
Репозиторий с версткой: [Gitlab](http://git.esphere.local/rilk/rilk-ui)  
Вспомогательное приложение имитирующее главную страницу сайта РосИмущества: [Bitbucket Sbercloud](https://atlas.swec.sbercloud.ru/bitbucket/projects/ARLK/repos/arlk-rosim-ui-mock/browse)

- [Описание](https://atlas.swec.sbercloud.ru/wiki/pages/viewpage.action?pageId=14100085)
- [Технологии проекта](#Технологии-проекта)
- [Кодстайл](#Кодстайл)
- [Разработка](#Разработка)
- [Структура проекта](https://atlas.swec.sbercloud.ru/wiki/pages/viewpage.action?pageId=14100363)
- [Версионирование](#Версионирование)
- [Работа с гитом](#Работа-с-гитом)
- [Контакты](#Контакты)

## Технологии проекта

- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/introduction/getting-started)
- [Redux-saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- [Reselect](https://github.com/reduxjs/reselect)
- [React-router-dom](https://reactrouter.com/web/guides/quick-start)
- [connected-react-router](https://github.com/supasate/connected-react-router/)
- [history](https://github.com/ReactTraining/history)
- [axios](https://github.com/axios/axios)
- [Ramda](https://ramdajs.com/)
- [Moment](https://momentjs.com/)
- [Jest](https://jestjs.io/)
- [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan)
- CSS ([styles-esphere](https://ui-dev.esphere.ru/#/uikit/guide/programmer))
- [korus-ui](https://github.com/kksng/korus-ui)
- [React-Calendar](https://github.com/wojtekmaj/react-calendar)
- [dompurify](https://github.com/cure53/DOMPurify)
- [currency.js](https://github.com/scurker/currency.js)

## Кодстайл

За основу взят [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-).

Дополнения и уточнения смотрите в [confluence](https://confluence.esphere.ru/display/Frontend/Home).

## Разработка

- [API и mock server](#API-и-mock-server)
- [Запуск проекта](#Запуск-проекта)
- [Стенды](#Стенды)
- [NPM скрипты](#npm-скрипты)
- [Swagger](#swagger)

### API и mock server

Проектирование АПИ ведется с использованием сервиса [https://stoplight.io](https://stoplight.io). Результат - yaml-файл в формате OpenAPI 3.

Репозиторий со спецификация API всех сервисов ЛК:

Для тестирования АПИ можно использовать локальный mock-server на базе [https://github.com/stoplightio/prism/tags](https://github.com/stoplightio/prism/tags).

Запуск mock-server

- склонировать репозиторий
- перейти в директорию `arlk-api-design/openapi-src/reference/`
- запустить команду

```
prism-cli.exe mock TPA_TenantContract.v1.yaml -p 4020

```

### Запуск проекта

1. Установка зависимостей

```javascript
npm i
```

2. Запуск проекта

   1. Запуск в локальном режиме ( с использованием mock сервера )

   ```javascript
   npm run start
   ```

   2. Запуск в dev режиме ( с использованием dev-стенда )

   ```javascript
   npm run start:dev-stand
   ```

   Необходимо авторизироваться на dev стенде и скопировать следующие cookie:

   - PLATFORM_SESSION
   - PLATFORM_SESSION_2
   - UFS-SESSION

После запуска данной последовательности команд откроется браузер по адресу [http://localhost:3000](http://localhost:3000)

### Стенды

Проект доступен на стендах:

**Develop:**

**Предпромышленный:**

**Промышленный:**

## NPM скрипты

```
// Основные команды
start                 : запуск проекта на localhost, с настройками proxy для локального mock-сервера
start:dev-stand       : запуск проекта на localhost, с настройками proxy для работы через dev-стенд
start:mockups         : запуск проекта на localhost для верстальщика
build                 : сборка проекта с настройками для прода, не будет выполнено, если не пройдёт проверка `npm run check`

// Служебные команды
lint                  : проверка кода проекта на ошибки lint
flow                  : проверка кода проекта на ошибки flow
test                  : запуск тестов
check                 : проверка кода проекта на ошибки lint и flow
clean                 : очистка папки dist
addStyles             : скопировать стили из модуля styles-esphere в папку assets
esdoc                 : сборка документации

// Cypress
cypress:open          : запустить cypress для DEV стенда
cypress:open:ift      : запустить cypress для IFT стенда
```


### Структура проекта

```
.
├── cypress                                             : E2E тесты
│   ├── fixtures                                          : ФИКСТУРЫ
│   ├── integration                                       : ТЕСТЫ
│   │   ├── auth                                            : тесты на авторизацию
│   │   │   ├── auth-entrepreneur.spec.js                     : тесты на авторизацию под ИП
│   │   │   ├── auth-juridical.spec.js                        : тесты на авторизацию под ЮЛ
│   │   │   └── auth-natural.spec.js                          : тесты на авторизацию под ФЛ
│   │   └── situations                                      : тесты по жизненным ситуациям
│   │       ├── change-details-juridical                      : тесты на ЖС "Изменить реквизиты Арендатора"
│   │       ├── change-object-info                            : тесты на ЖС "Уточнить информацию об объекте аренды"
│   │       ├── complaint                                     : тесты на ЖС "Жалобы на акты, действия / бездействия должностных лиц"
│   │       ├── contract-missed                               : тесты на ЖС "Отсутствует информация о договоре аренды"
│   │       ├── no-suitable                                   : тесты на ЖС "Нет подходящей ЖС"
│   │       ├── overpayment                                   : тесты на ЖС "Распорядиться переплатой"
│   │       ├── paper-carrier                                 : тесты на ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
│   │       ├── payment-missed                                : тесты на ЖС "Отсутствует платеж по договору аренды"
│   │       ├── reconciliation-act                            : тесты на ЖС "Получить акт сверки взаимных расчетов"
│   │       └── sublease-notice                               : тесты на ЖС "Уведомление о субаренде"
│   ├── plugins                                           : ПЛАГИНЫ
│   │   ├── auth.js                                         : плагин авторизации через ЕСИА
│   │   ├── extends-config.js                               : плагин для расширения конфигурации cypress
│   │   └── index.js                                        : подключение всех плагинов
│   ├── support                                           : SUPPORT
│   │   ├── common                                          : общие элементы
│   │   ├── modules                                         : модули
│   │   │   ├── appeals                                       : модуль для обращений
│   │   │   ├── fields                                        : модуль для полей ввода
│   │   │   └── notices                                       : модуль для навигации
│   │   ├── test-cases                                      : тест-кейсы
│   │   │   └── appeals                                       : тест-кейсы для обращений
│   │   ├── commands.js                                     : кастомные команды cypress
│   │   ├── index.d.ts                                      : файл с типами
│   │   └── index.js                                        : подключение всех команд
│   └── webpack.config.js                                 : webpack конфиг для cypress
├── src                                                 : source code
│   ├── common                                            : ОБЩИЕ ЭЛЕМЕНТЫ ПРИЛОЖЕНИЯ
│   │   ├── components                                      : общие компоненты
│   │   ├── config                                          : общие настройки
│   │   ├── errors                                          : обработчики ошибок
│   │   ├── hooks                                           : общие хуки
│   │   ├── layouts                                         : общие макеты
│   │   ├── messages                                        : папка с ui-текстовками
│   │   ├── modules                                         : общие модули проекта
│   │   │   └── user                                          : модуль пользователя
│   │   ├── styles                                          : папка со стилями приложения
│   │   └── utils                                           : общие утилиты приложения
│   ├── features                                          : МОДУЛИ Проекта
│   │   ├── accruals                                        : модуль "Начисления по договору"
│   │   ├── app-settings                                    : модуль "Параметры приложения"
│   │   ├── calendar                                        : модуль "Календарь оплат арендатора"
│   │   ├── contract-details                                : модуль "Информация по договору"
│   │   ├── contracts                                       : модуль "Мои договоры"
│   │   ├── dictionaries                                    : модуль "Справочники"
│   │   ├── incoming-documents                              : модуль "Входящие документы"
│   │   ├── errors                                          : модуль обработки ошибок
│   │   ├── landlords                                       : модуль "Список арендодателей"
│   │   ├── loading                                         : модуль лоадера
│   │   ├── messages                                        : модуль "Сообщения"
│   │   ├── navigation                                      : модуль навигации
│   │   ├── notices                                         : модуль всплывающих сообщений
│   │   ├── payment                                         : модуль "Онлайн оплата"
│   │   │   └── modules                                       : внутренние модули
│   │   │       ├── accruals                                    : модуль "Начисления для оплаты по договору"
│   │   │       └── ups                                         : модуль "Интеграция с ЕПС"
│   │   ├── payment-history                                 : модуль "История платежей по договору"
│   │   ├── profile                                         : модуль профиля пользователя
│   │   ├── rental-objects                                  : модуль "Объекты аренды"
│   │   ├── signature                                       : модуль "Электронная подпись"
│   │   ├── situations                                      : модуль "Жизниные ситуации"(ЖС)
│   │   │   ├── components                                    : общие компоненты для всех ЖС
│   │   │   └── modules                                       : модули для каждой реализованной ЖС
│   │   │       ├── attachments                                 : модуль для работы с прикреплением/удалением файлов по всем ЖС
│   │   │       ├── change-details-juridical                    : модуль ЖС "Изменить реквизиты Арендатора"
│   │   │       ├── change-object-info                          : модуль ЖС "Уточнить информацию об объекте аренды"
│   │   │       ├── complaint                                   : модуль ЖС "Жалобы на акты, действия / бездействия должностных лиц"
│   │   │       ├── contract-missed                             : модуль ЖС "Отсутствует информация о договоре аренды"
│   │   │       ├── overpayment                                 : модуль ЖС "Распорядиться переплатой"
│   │   │       ├── paper-carrier                               : модуль ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
│   │   │       ├── no-suitable                                 : модуль ЖС "Нет подходящей ЖС"
│   │   │       ├── payment-missed                              : модуль ЖС "Отсутствует платеж по договору аренды"
│   │   │       ├── reconciliation-act                          : модуль ЖС "Получить акт сверки взаимных расчетов"
│   │   │       └── sublease-notice                             : модуль ЖС "Уведомление о субаренде"
│   │   ├── support                                         : модуль "Служба поддержки"
│   │   ├── tenant                                          : модуль арендатора
│   │   └── widgets                                         : модуль виджетов главной страницы
│   ├── mockups                                           : МОКАПЫ ВЕРСТКИ ПРОЕКТА
│   │   ├── components                                      : компоненты
│   │   ├── layouts                                         : макеты
│   │   └── pages                                           : страницы
│   ├── pages                                             : КОМПОНЕНТЫ СТРАНИЦ
│   │   ├── AccessDeniedPage.jsx                             : Страница ошибки прав доступа пользователя
│   │   ├── ConsentToEdmPage.jsx                             : Страница согласия на ЭДО
│   │   ├── ContractDetailsPage.jsx                          : Страница "Подробнее о договоре"
│   │   ├── ContractPaymentPage.jsx                          : Страница "Онлайн оплата по договору"
│   │   ├── ContractPaymentUpsPage.jsx                       : Страница "Онлайн оплата по договору через ЕПС"
│   │   ├── ContractsListPage.jsx                            : Страница "Мои договоры"
│   │   ├── FeedbackPage.jsx                                 : Страница "Оставить отзыв о Личном кабинете арендатора"
│   │   ├── HelpPage.jsx                                     : Страница раздела "Помощь"
│   │   ├── MainPage.jsx                                     : Главная страница
│   │   ├── MessagesPage.jsx                                 : Страница раздела "Сообщения"
│   │   ├── NotATenantPage.jsx                               : Страница для пользователя, который не является арендатором
│   │   ├── ProfilePage.jsx                                  : Страница профиля
│   │   ├── RentalObjectsPage.jsx                            : Страница "Мои объекты"
│   │   ├── SituationChangeDetailsJuridicalPage.jsx          : Страница ЖС "Изменить реквизиты ЮЛ"
│   │   ├── SituationChangeObjectInfoPage.jsx                : Страница ЖС "Внести изменения в характеристики арендованных объектов"
│   │   ├── SituationComplaintPage.jsx                       : Страница ЖС "Жалоба"
│   │   ├── SituationContractMissedPage.jsx                  : Страница ЖС "Отсутствует договор аренды"
│   │   ├── SituationNoSuitablePage.jsx                      : Страница ЖС "Нет подходящей ЖС"
│   │   ├── SituationOverpaymentPage.jsx                     : Страница ЖС "Распорядиться переплатой"
│   │   ├── SituationPaperCarrierPage.jsx                    : Страница ЖС "Заявление на получение / на отказ от получения документов на бумажном носителе"
│   │   ├── SituationPaymentMissedPage.jsx                   : Страница ЖС "Отсутствует платеж по договору аренды"
│   │   ├── SituationReconciliationActPage.jsx               : Страница ЖС "Получить акт сверки взаимных расчетов"
│   │   ├── SituationsPage.jsx                               : Страница жизненных ситуаций
│   │   ├── SituationSubleaseNoticePage.jsx                  : Страница ЖС "Уведомление о субаренде"
│   │   ├── SupportPage.jsx                                  : Страница раздела "Поддержка"
│   │   ├── UnconfirmedUserPage.jsx                          : Страница с ошибкой неподтвержденной УЗ ЕСИА
│   │   └── index.js                                         : экспорт страниц
│   ├── processes                                         : БИЗНЕС-ПРОЦЕССЫ ПРИЛОЖЕНИЯ
│   │   ├── exception-provider                              : поставщик обработки исключений
│   │   │   ├── handlers                                      : обработчики исключений
│   │   │   │   ├── access-denied.js                            : обработчик ошибки AccessDeniedError
│   │   │   │   ├── auth.js                                     : обработчик ошибки AuthError | NoActiveCompanyError
│   │   │   │   ├── no-consent-to-edm.js                        : обработчик ошибки NoConsentToEdmError
│   │   │   │   ├── not-a-tenant.js                             : обработчик ошибки для пользователя, не являющегося арендатором
│   │   │   │   ├── server.js                                   : обработчик HTTP ошибок
│   │   │   │   └── unconfirmed-user.js                         : обработчик ошибки UnconfirmedUserError
│   │   │   ├── exception-provider.js                         : API поставщика обработки исключений
│   │   │   └── register.js                                   : регистрация обработчиков исключений
│   │   ├── situations                                      : процессы по каждой ЖС
│   │   ├── sagas.accruals.js                               : процессы модуля "Начисления по договору"
│   │   ├── sagas.calendar.js                               : процессы модуля "Календарь оплат арендатора"
│   │   ├── sagas.contract-details.js                       : процессы модуля "Информация по договору"
│   │   ├── sagas.contracts.js                              : процессы модуля "Мои договоры"
│   │   ├── sagas.errors.js                                 : процесс обработки исключений приложения
│   │   ├── sagas.incoming-documents.js                     : процессы модуля "Входящие документы"
│   │   ├── sagas.messages.js                               : процессы модуля "Сообщения"
│   │   ├── sagas.payment-history.js                        : процессы модуля "История платежей по договору"
│   │   ├── sagas.payment.js                                : процессы модуля "Онлайн оплата по договору"
│   │   ├── sagas.rentals.js                                : процессы модуля "Объекты аренды"
│   │   ├── sagas.support.js                                : процессы модуля "Служба поддержки"
│   │   ├── sagas.tenant.js                                 : процессы модуля арендатора
│   │   ├── sagas.user.js                                   : процессы модуля пользователя
│   │   └── sagas.widgets.js                                 : процесс загрузки информации по виджетам
│   ├── store                                             : НАСТРОЙКИ REDUX
│   │   ├── index.js                                        : инициализация redux, подключение middlewares
│   │   ├── root-reducer.js                                 : здесь все редюсеры комбинируются в один
│   │   └── root-saga.js                                    : самая первая сага, которая запускает все остальные
│   ├── App.jsx                                           : главный компонент приложения
│   ├── constants.js                                      : общие константы
│   ├── index.jsx                                         : точка входа в приложение
│   └── routes.jsx                                        : настройка роутов приложения
├── webpack                                             : настройка webpack приложения
│   ├── app                                               : папка с настройками webpack для приложения
│   │   ├── develop.js                                      : файл с настройками webpack для dev-окружения
│   │   └── production.js                                   : файл с настройками webpack для production-окружения
│   ├── config                                            : папка с настройками webpack-приложения
│   │   ├── dev-server                                      : папка с настройками webpack-dev-server
│   │   │   ├── index.js                                    : общие настройки webpack-dev-server
│   │   │   └── proxy.js                                    : настройки proxy для webpack-dev-server
│   │   ├── index.js                                        : файл с методом получения общих настроек по ключу
│   │   ├── paths.js		                                    : файл с настройками путей webpack-приложения
│   │   └── settings.js                                     : файл с общими настройками приложения (title, названия приложения в шапке и пр.)
│   └── common.js                                         : общие настройки webpack
├── .editorconfig                                       : файл с настройками плагина EditorConfig
├── .esdoc.json                                         : файл с настройками ESDoc
├── .eslintignore                                       : файл с настройками игнорирования файлов eslint
├── .eslintrc                                           : файл с настройками eslint
├── .gitattributes                                      : файл с настройками git
├── .gitignore                                          : файл с настройками игнорирования файлов git
├── .huskyrc                                            : файл с настройками husky
├── .lintstagedrc                                       : файл с настройками lint-staged
├── .prettierignore                                     : файл с настройками игнорирования файлов prettier
├── .prettierrc                                         : файл с настройками prettier
├── babel.config.js                                     : файл с настройками Babel
├── CHANGELOG.md                                        : файл с описанием изменений внесенных по спринтам
├── cypress.dev.json                                    : файс с настройками cypress для DEV стенда
├── cypress.ift.json                                    : файс с настройками cypress для ИФТ стенда
├── cypress.json                                        : файс с общими настройками cypress
├── Jenkinsfile                                         : файл с настройками Jenkins
├── jest.config.js                                      : файл с настройками Jest
├── jsconfig.json                                       : файл с настройками JS для VSCode
├── package.json                                        : файл с описанием зависимостей проекта и скриптами запуска
└── README.md                                           : файл с описанием проекта
```

## Версионирование

Версии проекта следуют за нумерацией спринтов и релизами.

Например: `0.1.2`.

0 - номер основной версии

1 - номер спринта

2 - номер патча

## Работа с гитом

В проекте используется [Gitflow](https://ru.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

Ветка для выкладки на тестовый стенд: `develop`

Ветка для выкладки на предпромышленный стенд: `master`

Ветка для выкладки на промышленный стенд: `master`

### Названия веток

**Названия feature-веток** формируются из названия `feature/bugfix` и кода задачи в жире.

Например: `feature/ARLK-500`

**Названия релизных веток** формируются из слова `release` и номера версии, которая готовится к релизу.

Например: `release/0.3.0` - релизная ветка третьего спринта.

### Формирование сообщений в коммитах

Сообщение в коммите начинается с кода задачи, например: `[ARLK-500] Добавлена новая функциональность`.

## Cypress

Подробная инструкция доступна на странице: [E2E Тестирование](https://atlas.swec.sbercloud.ru/wiki/pages/viewpage.action?pageId=30167227)

Для работы с cypress необходимо:

1. Создать файл `cypress.env.json`. И Описать в нем следующие сущности:

- `users` - учетные записи с полями

  - `type` - тип организации
    - `natural` - физическое лицо
    - `juridical` - юридичесоке лицо
    - `entrepreneur` - индивидуальный предприниматель
  - `permissions` - массив привилегий пользователя, возможные варианты:
    - `Arlk.generic.read` - привилегия базового доступа на чтение
    - `Arlk.generic.write` - привилегия базового доступа на запись
    - `Arlk.edo.edoConsent` - привилегия подтверждения согласия на ЭДО
    - `Arlk.incomingDocument.sign` - привилегия подписания входящих документов
    - `Arlk.incomingDocument.confirmReceipt` - привилегия подтверждения получения входящих документов
  - `snils` - СНИЛС
  - `password` - пароль
  - `organizationName` - название организации

  Пример файла:

  ```json
  {
    "users": [
      {
        "type": "juridical",
        "permissions": ["Arlk.generic.read", "Arlk.generic.write"],
        "snils": "00000030011",
        "password": "password",
        "organizationName": "ОРГАНИЗАЦИЯ 2107516123"
      },
      {
        "type": "entrepreneur",
        "permissions": [
          "Arlk.generic.read",
          "Arlk.generic.write",
          "Arlk.incomingDocument.sign"
        ],
        "snils": "00060600022",
        "password": "password",
        "organizationName": "Индивидуальный предприниматель Петров Петр Петрович"
      },
      {
        "type": "natural",
        "permissions": [
          "Arlk.generic.read",
          "Arlk.generic.write",
          "Arlk.edo.edoConsent",
          "Arlk.incomingDocument.confirmReceipt",
          "Arlk.incomingDocument.sign"
        ],
        "snils": "00033333333",
        "password": "password",
        "organizationName": "Физическое лицо"
      }
    ]
  }
  ```

2. Запустить команду

```
npm run cypress:open
```

## Контакты

- Антон Голомазов (Golomazov.AV@esphere.ru)
- Алексей Смирнов (Smirnov.AA@esphere.ru)
- Анатолий Шлом (Shlom.AM@esphere.ru)
