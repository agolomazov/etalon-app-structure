import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import * as L from 'korus-ui';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';

import {
  setDateToServerDateFormat,
  getMonthStartDay,
  setCalendarMonthYearFormat,
  setCalendarShortWeekdayFormat,
} from '@common/utils';
import { useActions } from '@common/hooks';

import { actions } from '../ducks';
import { selectors } from '../selectors';
import { CalendarPopup } from './CalendarPopup';

const formatMonthYear = (_, date) => setCalendarMonthYearFormat(date);
const formatShortWeekday = (_, date) => setCalendarShortWeekdayFormat(date);

/**
 * ## Виджет с календарем
 *
 * @example
 * <CalendarWidget />
 *
 * @returns {React.FC} Виджет с календарем
 */
export const CalendarWidget = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const abbrs = wrapperRef.current.wrapper.querySelectorAll(
      '.react-calendar__month-view__weekdays__weekday abbr',
    );
    if (abbrs) {
      Array.from(abbrs).forEach((abbr) => abbr.removeAttribute('title'));
    }
  }, []);

  const { loadPaymentCalendarFlow } = useActions(actions);
  const [activeStartDate, setActiveStartDate] = useState(getMonthStartDay());

  useEffect(() => {
    loadPaymentCalendarFlow(activeStartDate);
  }, [activeStartDate]);

  const calendarPayments = useSelector(selectors.calendarPayments) || {};

  const tileClassName = useCallback(
    ({ date }) => {
      const paymentDate = setDateToServerDateFormat(date);
      if (!calendarPayments[paymentDate]) {
        return null;
      }
      const { isDebt } = calendarPayments[paymentDate];
      return `calendar-date-cell ${isDebt ? 'danger' : 'warning'}`;
    },
    [calendarPayments, activeStartDate],
  );

  const tileDisabled = useCallback(
    ({ date }) => date.getMonth() !== activeStartDate.getMonth(),
    [activeStartDate],
  );

  const CalendarPopupTile = useMemo(
    () => ({ date }) => {
      const paymentDate = setDateToServerDateFormat(date);
      return calendarPayments[paymentDate] ? (
        <CalendarPopup date={date} />
      ) : null;
    },
    [calendarPayments],
  );

  return (
    <L.Div
      ref={wrapperRef}
      className="aside-main-item calendar-main calendar-wrapper
                 inner-24 margin-bottom-32"
    >
      <Calendar
        locale="ru-RU"
        navigationAriaLabel=""
        nextAriaLabel=""
        next2AriaLabel=""
        prevAriaLabel=""
        prev2AriaLabel=""
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks
        minDetail="month"
        prevLabel={<L.I className="novicon-prev txt-gray" />}
        nextLabel={<L.I className="novicon-next txt-gray" />}
        formatMonthYear={formatMonthYear}
        formatShortWeekday={formatShortWeekday}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={(e) => setActiveStartDate(e.activeStartDate)}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        tileContent={CalendarPopupTile}
      />
    </L.Div>
  );
};
