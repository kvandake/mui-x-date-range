import { format } from 'date-fns';
import { Divider, styled, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Actions } from './Actions';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ModalCustomProps } from '../types/utils';
import { useContext } from 'react';
import { DateRangePickerContext } from '../context';

const PreviewDateTypoStyled = styled(Typography)(({ theme }) => ({
  position: 'relative',
  minWidth: '100px',
  fontSize: 14,
  color: theme.palette.grey[800],
}));
const MessageTypoStyled = styled(Typography)(({ theme }) => ({
  position: 'relative',
  minWidth: '100px',
  fontSize: 14,
  color: theme.palette.grey[500],
}));
const PreviewDateMessageTypoStyled = styled(Typography)(({ theme }) => ({
  position: 'relative',
  minWidth: '100px',
  fontSize: 14,
  color: theme.palette.grey[500],
}));

type FooterProps = {
  startDate?: Date;
  endDate?: Date;
  onClear?: () => void;
} & ModalCustomProps;

export const Footer = ({
  startDate,
  endDate,
  onCloseCallback,
  RangeSeparatorIcons,
  hideClearButton,
  onClear,
}: FooterProps) => {
  const dateContext = useContext(DateRangePickerContext);
  const theme = useTheme();
  const previewDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy', {
      locale: dateContext?.locale.dateFns,
    });
  };

  const IconXs = RangeSeparatorIcons?.xs || KeyboardDoubleArrowDownIcon;
  const IconMd = RangeSeparatorIcons?.md || KeyboardDoubleArrowRightIcon;

  return (
    <>
      <Grid2
        xs
        container
        gap={'10px'}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        justifyContent={{
          xs: 'space-between',
          md: 'flex-start',
        }}
        alignItems={'center'}
        minHeight={{
          xs: 'auto',
          md: hideClearButton ? '12px' : '40px',
        }}
      >
        {startDate || endDate ? (
          <>
            <PreviewDateTypoStyled
              variant="body1"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              {startDate
                ? previewDate(startDate)
                : dateContext.locale.texts.dates?.startDate}
            </PreviewDateTypoStyled>

            <IconXs
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              fontSize="small"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              sx={{
                fill: theme.palette.grey[400],
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            />

            <IconMd
              fontSize="small"
              sx={{
                fill: theme.palette.grey[400],
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            />

            {endDate ? (
              <PreviewDateTypoStyled
                variant="body1"
                textAlign={{
                  xs: 'center',
                  md: 'left',
                }}
              >
                {previewDate(endDate)}
              </PreviewDateTypoStyled>
            ) : (
              <PreviewDateMessageTypoStyled
                variant="body1"
                textAlign={{
                  xs: 'center',
                  md: 'left',
                }}
              >
                {dateContext.locale.texts.dates?.endDate}
              </PreviewDateMessageTypoStyled>
            )}
          </>
        ) : (
          <Grid2
            xs={12}
            container
            justifyContent={{
              xs: 'center',
              md: 'flex-start',
            }}
          >
            <MessageTypoStyled variant="body1">
              {dateContext.locale.texts.dates?.rangeNotSelected}
            </MessageTypoStyled>
          </Grid2>
        )}
      </Grid2>

      <Grid2
        display={{
          xs: 'block',
          md: 'none',
        }}
      >
        <Divider orientation="horizontal" />
      </Grid2>

      {!hideClearButton && (
        <Grid2 xs="auto" container justifyContent={'flex-end'}>
          <Actions onCloseCallback={onCloseCallback} onClear={onClear} />
        </Grid2>
      )}
    </>
  );
};
