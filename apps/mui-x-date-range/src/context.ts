import { DateRangePickerTheme } from './types/utils';
import React from 'react';

export const DateRangePickerContext = React.createContext<DateRangePickerTheme>(
  { locale: null! }
);
