import { Button, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { BeatLoader } from 'react-spinners';

interface ILoadingButtonProps {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  loading: boolean;
  text: string;
  height?: string | number;
  fullWidth?: boolean;
}

export const LoadingButton = (props: ILoadingButtonProps) => {
  return (
    <Button
      variant="contained"
      fullWidth={props.fullWidth ?? false}
      sx={{ my: 1, height: props.height ?? '40px' }}
      onClick={props.onClick}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? (
        <BeatLoader
          loading={props.loading}
          size={8}
          color="#fff"
          speedMultiplier={0.8}
        />
      ) : (
        <Typography>{props.text.toUpperCase()}</Typography>
      )}
    </Button>
  );
};
