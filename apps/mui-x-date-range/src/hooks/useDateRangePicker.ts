import {
  addMonths,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  lastDayOfMonth,
  max,
  min,
} from 'date-fns';
import { getValidatedMonths, parseOptionalDate } from '../utils';
import { getDefaultRanges } from '../defaults';
import { useState } from 'react';
import { MARKERS } from '../constants/markers';
import { AVAILABLE_MAX_DATE, AVAILABLE_MIN_DATE } from '../constants';
import {
  DateRange,
  DateRangeProps,
  Marker,
  NavigationAction,
} from '../types/utils';

type useDateRangePickerProps = DateRangeProps;
export const useDateRangePicker = (props: useDateRangePickerProps) => {
  const today = new Date();

  const {
    onChangeValue: onChangeCallback,
    defaultValue,
    value,
    minDate,
    maxDate,
    definedRanges = getDefaultRanges(new Date(), props.locale),
    locale,
  } = props;

  // !Assign starting states
  const minValidDate = parseOptionalDate(minDate, AVAILABLE_MIN_DATE);
  const maxValidDate = parseOptionalDate(maxDate, AVAILABLE_MAX_DATE);

  const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(
    defaultValue || {},
    minValidDate,
    maxValidDate
  );
  // const [dateRange, setDateRange] = useState<DateRange>({
  //   ...defaultValue,
  // });
  const [hoverDay, setHoverDay] = useState<Date>();
  const [firstMonth, setFirstMonth] = useState<Date>(
    initialFirstMonth || today
  );
  const [secondMonth, setSecondMonth] = useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

  const { startDate, endDate } = value || defaultValue || {};

  // handlers
  const handleSetFirstMonth = (date: Date) => {
    if (isBefore(date, secondMonth)) {
      if (isAfter(date, minValidDate)) {
        setFirstMonth(date); //desired output
        return;
      } else {
        setFirstMonth(lastDayOfMonth(minValidDate));
        return;
      }
    } else {
      if (isBefore(addMonths(date, +1), maxValidDate)) {
        setFirstMonth(date);
        setSecondMonth(addMonths(date, 1));
        return;
      } else {
        setSecondMonth(maxValidDate);
        setFirstMonth(addMonths(maxValidDate, -1));
      }
    }
  };

  const handleSetSecondMonth = (date: Date) => {
    if (isAfter(date, firstMonth)) {
      if (isBefore(date, maxValidDate)) {
        setSecondMonth(date); //desired output
        return;
      } else {
        setSecondMonth(lastDayOfMonth(maxValidDate));
        return;
      }
    } else {
      if (isAfter(addMonths(date, -1), minValidDate)) {
        setSecondMonth(date);
        setFirstMonth(addMonths(date, -1));
        return;
      } else {
        setFirstMonth(minValidDate);
        setSecondMonth(addMonths(minValidDate, +1));
      }
    }
  };

  const handleSetSingleMonth = (date: Date) => {
    if (isAfter(date, minValidDate) && isBefore(date, maxValidDate)) {
      setFirstMonth(date); //desired output
      return;
    } else if (isBefore(date, minValidDate) || isSameDay(date, minValidDate)) {
      setFirstMonth(minValidDate);
      return;
    } else if (isAfter(date, maxValidDate) || isSameDay(date, maxValidDate)) {
      setFirstMonth(maxValidDate);
      return;
    }
  };

  const handleClickDefinedRange = (range: DateRange) => {
    let { startDate: newStart, endDate: newEnd } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = max([newStart, minValidDate]);
      range.endDate = newEnd = min([newEnd, maxValidDate]);

      onChangeCallback && onChangeCallback(range); //OUTPUT to the user (SUCCESSFUL SELECTION)

      setFirstMonth(newStart);
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
      );
    } else {
      onChangeCallback && onChangeCallback({}); //OUTPUT to the user (UNSUCCESSFUL SELECTION)

      setFirstMonth(today);
      setSecondMonth(addMonths(firstMonth, 1));
    }
  };

  const handleClickDateNumber = (day: Date) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      // * check for a valid End Date
      const newRange = { startDate, endDate: day };
      onChangeCallback && onChangeCallback(newRange);
    } else {
      // * check for a valid Start Date
      onChangeCallback &&
        onChangeCallback({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const handleClear = () => {
    onChangeCallback({ startDate: undefined, endDate: undefined });
  };

  const handleClickNavIcon = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.SINGLE_MONTH) {
      setFirstMonth(addMonths(firstMonth, action));
      setSecondMonth(addMonths(secondMonth, action));
      return;
    }
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const handleHoverDateNumber = (date: Date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const isInHoverRange = (day: Date) =>
    (startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, { start: startDate, end: hoverDay })) as boolean;

  const helpers = {
    isInHoverRange,
  };

  const handlers = {
    handleClickDateNumber,
    handleClear,
    handleClickNavIcon,
    handleHoverDateNumber,
  };

  return {
    dateRange: value || defaultValue || {},
    ranges: definedRanges,
    minDate: minValidDate,
    maxDate: maxValidDate,
    firstMonth,
    secondMonth,
    handleSetFirstMonth,
    handleSetSecondMonth,
    handleSetSingleMonth,
    handleClickDefinedRange,
    helpers,
    handlers,
    locale,
  };
};
