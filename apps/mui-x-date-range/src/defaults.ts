import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfYear,
  endOfYear,
  addYears,
} from "date-fns";
import {DateRangePickerThemeLocale, DefinedRange} from "./types/utils";

/**
 * ? An array of default ranges to populate the presets list with
 * @param date date to get month
 * @param locale locale to use
 * @returns array of default ranges
 */
export const getDefaultRanges = (
  date: Date,
  locale: DateRangePickerThemeLocale
): DefinedRange[] => [
  {
    label: locale.texts.selectors.today,
    startDate: date,
    endDate: date,
  },
  {
    label: locale.texts.selectors.yesterday,
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
  },
  {
    label: locale.texts.selectors.thisWeek,
    startDate: startOfWeek(date, { locale: locale.dateFns }),
    endDate: endOfWeek(date, { locale: locale.dateFns }),
  },
  {
    label: locale.texts.selectors.lastWeek,
    startDate: startOfWeek(addWeeks(date, -1), { locale: locale.dateFns }),
    endDate: endOfWeek(addWeeks(date, -1), { locale: locale.dateFns }),
  },
  {
    label: locale.texts.selectors.last7Days,
    startDate: addWeeks(date, -1),
    endDate: date,
  },
  {
    label: locale.texts.selectors.thisMonth,
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  },
  {
    label: locale.texts.selectors.lastMonth,
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
  {
    label: locale.texts.selectors.thisYear,
    startDate: startOfYear(date),
    endDate: endOfYear(date),
  },
  {
    label: locale.texts.selectors.lastYear,
    startDate: startOfYear(addYears(date, -1)),
    endDate: endOfYear(addYears(date, -1)),
  },
];

export const createDefaultThemeLocale = ()=> {
  return {
    texts: {
      selectors: {
        quickSelect: "Quick Select",
        today: "Today",
        yesterday: "Yesterday",
        thisWeek: "This Week",
        lastWeek: "Last Week",
        last7Days: "Last 7 Days",
        thisMonth: "This Month",
        lastMonth: "Last Month",
        thisYear: "This Year",
        lastYear: "Last Year",
      },
      actions: {
        close: "Cancel",
        clear: "Clear",
      },
      dates: {
        rangeNotSelected: "Range not selected",
        startDate: "Start Date",
        endDate: "End Date",
      }
    }
  } as DateRangePickerThemeLocale
}
