import { Box, Button, InputBase, Typography } from '@mui/material';
import { ChangeEventHandler } from 'react';

const inputProps = {
  sx: {
    '&::placeholder': {
      fontSize: 12,
    },
  },
};

interface ICheckoutInput {
  autoComplete?: 'on' | 'off' | 'new-password';
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error: string;
  placeholder: string;
  title: string;
  buttonText: string;
}

export const CheckoutInput = (props: ICheckoutInput) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Typography
        sx={{ textTransform: 'capitalize', fontSize: 13, fontWeight: 700 }}
      >
        {props.title}
      </Typography>
      <Box display={'flex'} alignItems={'center'}>
        <InputBase
          fullWidth
          placeholder={props.placeholder}
          inputProps={inputProps}
          type="text"
          autoComplete={props.autoComplete ?? 'off'}
          required
          value={props.value}
          onChange={props.onChange}
          sx={{
            border: '1px solid rgba(0,0,0,0.2)',
            padding: '5px 10px',
            borderRadius: '10px',
          }}
        />

        <Button
          variant="contained"
          sx={{
            py: 1,
            ml: 5,
            width: '200px',
            bgcolor: 'primary.main',
            borderRadius: '50px',
          }}
        >
          {props.buttonText}
        </Button>
      </Box>

      {props.error && (
        <Typography sx={{ fontSize: 11, color: 'red' }}>
          {props.error}
        </Typography>
      )}
    </div>
  );
};
