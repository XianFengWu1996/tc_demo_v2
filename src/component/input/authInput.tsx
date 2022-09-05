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
}

export const EmailInput = (props: IEmailInput) => {
  return (
    <>
      <AuthInputLabel>Email</AuthInputLabel>
      <AuthInputContainer
        placeholder="example@email.com"
        inputProps={inputProps}
        type="email"
        autoComplete={props.autoComplete ?? ''}
        required
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

interface IPasswordInput {
  placeholder: string;
  autoComplete?: 'on' | 'off' | 'new-password';
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const PasswordInput = (props: IPasswordInput) => {
  return (
    <>
      <AuthInputLabel>{props.placeholder}</AuthInputLabel>
      <AuthInputContainer
        placeholder={props.placeholder}
        inputProps={inputProps}
        autoComplete={props.autoComplete ?? ''}
        type="password"
        required
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};
