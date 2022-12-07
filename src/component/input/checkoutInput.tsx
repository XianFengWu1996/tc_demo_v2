import { InputBase, InputBaseComponentProps } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import { merge } from 'lodash';
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react';

interface CustomInputProps {
  name?: string;
  multiline?: boolean;
  fullWidth?: boolean;
  minRows?: number;
  placeholder?: string;
  focusedStyle?: CSSProperties;
  styles?: CSSProperties;
  value?: unknown;
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputProps?: InputBaseComponentProps | undefined;
  type?: HTMLInputTypeAttribute;
}
export const CustomInput = (props: CustomInputProps) => {
  return (
    <InputBase
      name={props.name ?? ''}
      type={props.type ?? ('text' as HTMLInputTypeAttribute)}
      value={props.value}
      placeholder={props.placeholder ?? ''}
      multiline={props.multiline ?? false}
      fullWidth={props.fullWidth ?? false}
      minRows={props.minRows ?? 1}
      onChange={props.onChange}
      sx={merge(
        {
          backgroundColor: 'rgba(0,0,0,0.1)',
          border: '1.5px solid transparent',
          borderRadius: '5px',
          padding: '2px 10px',
          fontSize: '15px',
          '&.Mui-focused': props.focusedStyle ?? {
            border: '1.5px solid #000',
          },
        },
        {
          ...props.styles,
        }
      )}
      startAdornment={props.startAdornment}
      endAdornment={props.endAdornment}
      inputProps={props.inputProps}
    />
  );
};
