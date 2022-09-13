import { Button, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { BeatLoader } from 'react-spinners';

interface ILoadingButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  loading: boolean;
  text: string;
  height?: string | number;
}

export const LoadingButton = (props: ILoadingButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{ my: 2, height: props.height ?? '40px' }}
      onClick={props.onClick}
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
