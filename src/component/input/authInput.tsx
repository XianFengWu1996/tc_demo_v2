import { Typography } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { AuthInputContainer, AuthInputLabel } from './styles';

const inputProps = {
  sx: {
    '&::placeholder': {
      fontSize: 12,
    },
  },
};

interface IEmailInput {
  autoComplete?: 'on' | 'off' | 'new-password';
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error: string;
}

export const EmailInput = (props: IEmailInput) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <AuthInputLabel>Email</AuthInputLabel>
      <AuthInputContainer
        fullWidth
        placeholder="example@email.com"
        inputProps={inputProps}
        type="email"
        autoComplete={props.autoComplete ?? ''}
        required
        value={props.value}
        onChange={props.onChange}
        errormsg={props.error}
      />

      {props.error && (
        <Typography sx={{ fontSize: 11, color: 'red' }}>
          {props.error}
        </Typography>
      )}
    </div>
  );
};

interface IPasswordInput {
  placeholder: string;
  autoComplete?: 'on' | 'off' | 'new-password';
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error: string;
}

export const PasswordInput = (props: IPasswordInput) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <AuthInputLabel>{props.placeholder}</AuthInputLabel>
      <AuthInputContainer
        fullWidth
        placeholder={props.placeholder}
        inputProps={inputProps}
        autoComplete={props.autoComplete ?? ''}
        type="password"
        required
        value={props.value}
        onChange={props.onChange}
        errormsg={props.error}
      />
      {props.error && (
        <Typography sx={{ fontSize: 11, color: 'red' }}>
          {props.error}
        </Typography>
      )}
    </div>
  );
};
