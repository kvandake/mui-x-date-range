import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ModalCustomProps } from '../types/utils';
import { useContext } from 'react';
import { DateRangePickerContext } from '../context';

const CloseButtonStyled = styled(Button)({
  fontSize: 13,
  fontWeight: 400,
  borderRadius: '8px',
  textTransform: 'none',
});

const ClearButtonStyled = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 13,
  fontWeight: 400,
  borderRadius: '8px',
  marginRight: '8px',
  color: theme.palette.grey[600],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

type ActionsProps = ModalCustomProps & {
  onClear?: () => void;
};

export const Actions = ({
  buttonSize = 'medium',
  onCloseCallback,
  onClear,
}: ActionsProps) => {
  const dateContext = useContext(DateRangePickerContext);
  return (
    <>
      <Grid2>
        <ClearButtonStyled
          disableRipple
          disableElevation
          variant="text"
          size={buttonSize}
          onClick={onClear}
        >
          {dateContext.locale.texts.actions.clear}
        </ClearButtonStyled>
      </Grid2>

      {onCloseCallback && (
        <Grid2>
          <CloseButtonStyled
            disableRipple
            disableElevation
            type="submit"
            variant="outlined"
            color="inherit"
            size={buttonSize}
            onClick={onCloseCallback}
          >
            {dateContext.locale.texts.actions.close}
          </CloseButtonStyled>
        </Grid2>
      )}
    </>
  );
};
