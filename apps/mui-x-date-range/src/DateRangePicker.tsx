import Sections from './components/Sections';
import { useDateRangePicker } from './hooks/useDateRangePicker';
import { PickerProps } from './types';
import { DateRangePickerContext } from './context';
import { useMemo } from 'react';
import { createDefaultThemeLocale } from './defaults';

type BasicPickerPropsWithFooter = PickerProps & {
  footerRequired?: boolean;
};

export const DateRangePicker = (props: BasicPickerPropsWithFooter) => {
  const { customProps, ...dateRangePickerProps } = props;
  const contextValue = useMemo(
    () => ({
      locale: props.locale || createDefaultThemeLocale(),
    }),
    [props.locale]
  );

  const { ...computedProps } = useDateRangePicker({
    ...dateRangePickerProps,
  });

  return (
    <DateRangePickerContext.Provider value={contextValue}>
      <Sections {...dateRangePickerProps} {...computedProps} {...customProps} />
    </DateRangePickerContext.Provider>
  );
};
