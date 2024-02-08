import { SvgIconProps } from '@mui/material';
import { Locale } from 'date-fns';
import { Dispatch, ElementType, SetStateAction } from 'react';

export type Marker = symbol;

export type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

export type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

export type Setter<T> = Dispatch<SetStateAction<T>> | ((value: T) => void);

export enum NavigationAction {
  Previous = -1,
  Next = 1,
}

export type RangeSeparatorIconsProps = {
  xs?: ElementType<SvgIconProps>;
  md?: ElementType<SvgIconProps>;
};

export type DateRangeProps = {
  defaultValue?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  value?: DateRange;
  onChangeValue: (dateRange: DateRange) => void;
  hideDefaultRanges?: boolean;
  hideOutsideMonthDays?: boolean;
} & DateRangePickerTheme;

export type ModalCustomProps = {
  onCloseCallback?: () => void;
  buttonSize?: 'medium' | 'large';
  RangeSeparatorIcons?: RangeSeparatorIconsProps;
  hideClearButton?: boolean;
};

export interface DateRangePickerTheme {
  locale: DateRangePickerThemeLocale;
}

export interface DateRangePickerThemeLocale {
  dateFns?: Locale;
  texts: DateRangePickerThemeLocaleTexts;
}

export interface DateRangePickerThemeLocaleTexts {
  actions: {
    close: string;
    clear: string;
  }
  dates: {
    rangeNotSelected: string;
    startDate: string;
    endDate: string;
  }
  selectors: {
    quickSelect: string;
    today: string;
    yesterday: string;
    thisWeek: string;
    lastWeek: string;
    last7Days: string;
    thisMonth: string;
    lastMonth: string;
    thisYear: string;
    lastYear: string;
  };
}
