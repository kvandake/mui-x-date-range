import {FC, useMemo, useState} from 'react';
import {Box, Button, Paper, Stack, Typography} from '@mui/material';
import {
  DateRange,
  DateRangePicker,
  DateRangePickerModal,
  DateRangePickerThemeLocale,
} from '@mui-x-date-range/mui-x-date-range';
import { ru } from 'date-fns/locale/ru';

const ExamplePage: FC = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const dateLocale = useMemo(()=> {
    return {
      dateFns: ru,
      texts: {
        actions: {
          close: 'Закрыть',
          clear: 'Очистить',
        },
        selectors: {
          quickSelect: 'Выбрать дату',
          today: 'Сегодня',
          yesterday: 'Вчера',
          tomorrow: 'Завтра',
          thisWeek: 'Текущая неделя',
          lastWeek: 'Предыдущая неделя',
          last7Days: 'Последние 7 дней',
          thisMonth: 'Этот месяц',
          lastMonth: 'Предыдущий месяц',
          thisYear: 'Этот год',
          lastYear: 'Предыдущий год',
        },
        dates: {
          rangeNotSelected: 'Выберите диапазон дат',
          startDate: 'Дата начала',
          endDate: 'Дата окончания',
        }
      }
    } as DateRangePickerThemeLocale
  }, [])

  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState<DateRange>();
  const [dateRangeOnApply, setDateRangeOnApply] = useState<DateRange>();
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
  };
  const handleSetDateRangeOnApply = (dateRange: DateRange) => {
    setDateRangeOnApply(dateRange);
    handleClose();
  };


  return (
    <Box>
      <DateRangePickerModal
        locale={dateLocale}
        value={dateRangeOnChange}
        onChangeValue={(range: DateRange) => handleSetDateRangeOnChange(range)}
        customProps={{
          onCloseCallback: handleClose,
        }}
        modalProps={{
          open,
          anchorEl,
          onClose: handleClose,
          slotProps: {
            paper: {
              sx: {
                // borderRadius: '16px',
                // boxShadow: 'rgba(0, 0, 0, 0.21) 0px 0px 4px',
              },
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
      />
      <Button sx={{ mb: 4 }} onClick={(e) => setAnchorEl(e.target as any)}>
        Open
      </Button>
      <Stack spacing={1}>
        <Typography>{`Start date: ${dateRangeOnChange?.startDate}`}</Typography>
        <Typography>{`End date: ${dateRangeOnChange?.endDate}`}</Typography>
      </Stack>
      <Paper>
        <DateRangePicker
          footerRequired
          locale={dateLocale}
          value={dateRangeOnChange}
          onChangeValue={(range: DateRange) => handleSetDateRangeOnChange(range)}
        />
      </Paper>
    </Box>
  );
};
export default ExamplePage;
