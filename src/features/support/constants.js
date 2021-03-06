import { createNumericGenerator } from '@common/utils';

import { Answers, Capability } from './components/renders';

/* eslint-disable max-len */

// Генерируем уникальный ID для каждого элемента списка вопросов
const genQuestionId = createNumericGenerator();

// Генерируем уникальный ID для каждого элемента списка вопросов
const genCapabilityId = createNumericGenerator();

/**
 * Типы сообщения
 * @const
 */
export const TECH_SUPPORT_MESSAGE_TYPES = {
  SUPPORT: 'SUPPORT',
  FEEDBACK: 'FEEDBACK',
};

/**
 * Маппер для типов сообщений
 * @const
 * @type {Object}
 */
export const TECH_SUPPORT_MESSAGE_TYPE_MAP = {
  [TECH_SUPPORT_MESSAGE_TYPES.SUPPORT]: {
    notificationText: 'Обращение в Службу поддержки успешно отправлено',
  },
  [TECH_SUPPORT_MESSAGE_TYPES.FEEDBACK]: {
    notificationText:
      'Отзыв о работе Личного кабинета Арендатора успешно отправлен. ' +
      'Благодарим за оставленный отзыв - Вы помогаете нам становиться лучше.',
  },
};

/**
 * ## Темы сообщения для выпадающего списка в разделе "Оставить отзыв"
 * @const
 * @type {Array}
 */
export const FEEDBACK_SUBJECT_DROPDOWN_ITEMS = [
  { text: 'Благодарность', value: 'GRATITUDE' },
  {
    text: 'Предложения по улучшению работы Личного кабинета',
    value: 'SUGGESTION',
  },
  { text: 'Жалоба на работу Личного кабинета', value: 'COMPLAINT' },
];

/**
 * Количество вопросов в разделе "Помощь" которые всегда на экране
 */
export const QUESTIONS_SHOWN_FIRST = 3;

/**
 * Список пар вопрос-ответ для отображения в разделе "Помощь"
 */
export const QUESTIONS_LIST = [
  // Вопрос №1
  {
    id: genQuestionId(),
    question: 'Что такое Личный кабинет Арендатора',
    answer:
      '«Личный кабинет Арендатора» – сервис, позволяющий направлять в Росимущество/его территориальные органы круглосуточно и без выходных заявления и обращения, оплачивать арендную плату, задавать вопросы и получать ответы онлайн.',
  },
  // Вопрос №2
  {
    id: genQuestionId(),
    question:
      'Какие функциональные возможности предусматривает сервис Личный кабинет Арендатора',
    answer: Answers(2),
  },
  // Вопрос №3
  {
    id: genQuestionId(),
    question:
      'Какие способы подключения предусмотрены Личным кабинетом Арендатора',
    answer:
      'Пользователи, имеющие учетную запись Единого портала Госуслуг, могут авторизоваться в сервисе «Личный кабинет Арендатора» без посещения Росимущества и его территориальных органов.',
  },
  // Вопрос №4
  {
    id: genQuestionId(),
    question:
      'Какие учетные записи Единого портала Госуслуг могут быть использованы для входа в Личный кабинет Арендатора',
    answer:
      'Для входа в «Личный кабинет Арендатора» могут использоваться только подтвержденные учетные записи Единого портала Госуслуг. Т.е. пользователи ранее для подтверждения учетной записи Единого портала Госуслуг обращались лично для идентификации в один из уполномоченных центров регистрации Единой системы идентификации и аутентификации (ЕСИА): отделение ФГУП «Почта России», МФЦ России, центр обслуживания клиентов ОАО «Ростелеком», и др.',
  },
  // Вопрос №5
  {
    id: genQuestionId(),
    question:
      'У меня есть учетная запись Единого портала Госуслуг, но я не могу с ее помощью создать/зайти в Личный кабинет Арендатора',
    answer:
      'Пользователи Единого портала Госуслуг, не получившие реквизиты доступа (код подтверждения личности) заказным письмом по почте, либо имеющие неподтвержденную учетную запись, не смогут подключиться к сервису «Личный кабинет Арендатора» с помощью учетной записи Единого портала Госуслуг. Подтвердите свою учетную запись на Едином портале Госуслуг любым доступным способом.',
  },
  // Вопрос №6
  {
    id: genQuestionId(),
    question: 'Что мне делать, если я подозреваю, что мой пароль украден?',
    answer: Answers(6),
  },
  // Вопрос №7
  {
    id: genQuestionId(),
    question:
      'Что делать, если в Личном кабинете Арендатора отражены недостоверные или вызывающие вопросы данные, а также если необходимые данные отсутствуют?',
    answer: Answers(7),
  },
  // Вопрос №8
  {
    id: genQuestionId(),
    question:
      'В моем Личном кабинете Арендатора отображаются сведения не по всем арендованным объектам',
    answer: Answers(8),
  },
  // Вопрос №9
  {
    id: genQuestionId(),
    question:
      'В Личном кабинете Арендатора отображается объект, который мной не арендуется',
    answer: Answers(9),
  },
  // Вопрос №10
  {
    id: genQuestionId(),
    question:
      'В Личном кабинете Арендатора отображаются сведения с ошибкой (финансовые показатели, сведения по объекту, мои контактные данные и т.д.)',
    answer: Answers(10),
  },
  // Вопрос №11
  {
    id: genQuestionId(),
    question: 'Размер арендной платы или задолженности указан не корректно',
    answer: Answers(11),
  },
  // Вопрос №12
  {
    id: genQuestionId(),
    question:
      'Я не понимаю, за что мне начислены пени, как уточнить основания и порядок их расчета?',
    answer: Answers(12),
  },
  // Вопрос №13
  {
    id: genQuestionId(),
    question: 'Какие способы оплаты предусмотрены Личным кабинетом Арендатора',
    answer: Answers(13),
  },
  // Вопрос №14
  {
    id: genQuestionId(),
    question:
      'Оплатил начисления (задолженность) через Личный кабинет Арендатора в режиме онлайн. Когда ждать отображения оплаты в Личном кабинете Арендатора?',
    answer:
      'Сведения об оплате отразятся в «Личном кабинете Арендатора» в течение 10 рабочих дней. Актуализация данных в сервисе осуществляется ежедневно, однако требуется несколько рабочих дней для передачи сведений от кредитной организации в органы Федерального казначейства, затем органами казначейства в Росимущество/территориальный орган Росимущества. При этом датой оплаты является дата списания денежных средств со счета в банке – пени за период прохождения платежа не начисляются.',
  },
  // Вопрос №15
  {
    id: genQuestionId(),
    question: 'Как можно подписать документы в Личном кабинете Арендатора',
    answer:
      'В сервисе «Личный кабинет Арендатора» возможно подписание юридически значимых документов с помощью квалифицированной электронной подписи. В случае ее отсутствия подписанные документы следует отправить почтовым отправлением в соответствующий территориальный орган Росимущества.',
  },
  // Вопрос №16
  {
    id: genQuestionId(),
    question: 'Каким образом обеспечивается защита моих персональных данных?',
    answer:
      'Сервис «Личный кабинет Арендатора» функционирует на базе протокола https, обеспечивающего аутентификацию и защищенное соединение благодаря использованию технологии шифрования данных.',
  },
  // Вопрос №17
  {
    id: genQuestionId(),
    question:
      'В течение какого времени я могу получить доступ к направленным мне входящим юридически значимым документам из Росимущества?',
    answer:
      'Доступ к направленным входящим юридически значимым документам из Росимущества может быть получен в любое время. Сделать это можно в разделе "Сообщения", перейдя к записи с соответствующей темой обращения.',
  },
  // Вопрос №18
  {
    id: genQuestionId(),
    question:
      'Где можно уточнить актуальные контактные данные территориальных органов Росимущества?',
    answer: Answers(18),
  },
  // Вопрос №19
  {
    id: genQuestionId(),
    question:
      'Мое обращение через сервис «Жизненные ситуации» осталось без ответа в течение 30 дней, что мне делать?',
    answer: Answers(19),
  },
  // Вопрос №20
  {
    id: genQuestionId(),
    question:
      'В какие сроки я получу ответ на обращение через сервис «Жизненные ситуации»?',
    answer: Answers(20),
  },
  // Вопрос №21
  {
    id: genQuestionId(),
    question:
      'В какие сроки я получу обратную связь при обращении в техническую поддержку через раздел «Помощь»?',
    answer:
      'Ответ на сообщение в техническую поддержку, отправленное через раздел «Помощь», поступит в течение 10 дней.',
  },
  // Вопрос №22
  {
    id: genQuestionId(),
    question:
      'Почему в карточке договора во вкладке «Начисления» и на странице выбора начислений для оплаты не заполнен период?',
    answer: Answers(22),
  },
];

/**
 * Список "возможностей" отображаемый в разделе Помощь
 */
export const CAPABILITIES = [
  {
    id: genCapabilityId(),
    text:
      'Узнать сводную информацию по заключенным договорам и объектам аренды',
  },
  {
    id: genCapabilityId(),
    text:
      'Получить информацию по графику предстоящих платежей по договорам в сервисе Календарь',
  },
  {
    id: genCapabilityId(),
    text:
      'Произвести оплату начислений, пени и задолженностей онлайн или сформировать квитанции для оплаты',
  },
  {
    id: genCapabilityId(),
    text: Capability(),
  },
  {
    id: genCapabilityId(),
    text: 'Оформить заявление на распоряжение переплатой по договорам аренды',
  },
  {
    id: genCapabilityId(),
    text: 'Запросить акт сверки взаимных расчетов по договорам',
  },
  {
    id: genCapabilityId(),
    text:
      'Оформить заявление на внесение изменений в реквизиты своего юридического лица по договору',
  },
  {
    id: genCapabilityId(),
    text:
      'Запросить внесение изменений в характеристики арендованных объектов в электронной форме',
  },
  {
    id: genCapabilityId(),
    text:
      'Оформить нетипизированный запрос в территориальный орган Росимущества в электронной форме',
  },
  {
    id: genCapabilityId(),
    text: 'Оформить заявление на получение юридически значимых документов',
  },
  {
    id: genCapabilityId(),
    text:
      'Оформить жалобу на акты или действия должностных лиц или территориальных органов Росимущества',
  },
  {
    id: genCapabilityId(),
    text: 'Оценить качество предоставления услуг',
  },
];
