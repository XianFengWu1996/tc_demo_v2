import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { PasswordStrength } from '../auth/passwordStrength';
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
  strengthCheck?: boolean;
}

export const PasswordInput = (props: IPasswordInput) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div style={{ marginBottom: '10px' }}>
      <AuthInputLabel>{props.placeholder}</AuthInputLabel>
      <AuthInputContainer
        fullWidth
        placeholder={props.placeholder}
        inputProps={inputProps}
        autoComplete={props.autoComplete ?? ''}
        type={showPassword ? 'text' : 'password'}
        required
        value={props.value}
        onChange={props.onChange}
        errormsg={props.error}
        sx={{ position: 'relative ' }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      {props.strengthCheck && <PasswordStrength password={props.value} />}

      {props.error && (
        <Typography sx={{ fontSize: 11, color: 'red' }}>
          {props.error}
        </Typography>
      )}
    </div>
  );
};
