import { PopoverProps } from "@mui/material/Popover";
import { DateRangeProps, ModalCustomProps } from "./utils";

export type PickerProps = DateRangeProps & {
  modalProps?: PopoverProps;
  customProps?: ModalCustomProps;
};

export type ModalPickerProps = DateRangeProps & {
  modalProps: PopoverProps;
  customProps: ModalCustomProps;
};

export type BasicPickerProps = DateRangeProps;
