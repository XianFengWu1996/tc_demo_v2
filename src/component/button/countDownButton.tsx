import { Button, SxProps, Theme } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { setTimeout } from 'timers';

interface ICountDownButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  sx: SxProps<Theme> | undefined;
  loading: boolean;
  startTimer: boolean;
  setStartTimer: Dispatch<SetStateAction<boolean>>;
}

export const CountDownButton = (props: ICountDownButtonProps) => {
  const defaultTimer = 30;
  const [timer, setTimer] = useState<number>(defaultTimer);

  useEffect(() => {
    if (props.startTimer) {
      if (timer > 0) {
        setTimeout(() => {
          setTimer((t) => t - 1);
        }, 1000);
      } else {
        props.setStartTimer(false);
        setTimer(defaultTimer);
      }
    }
  }, [timer, props]);

  const displayButtonText = () => {
    // during the loading process, display the loader
    if (props.loading) {
      return <MoonLoader size={14} color={'#f38486'} />;
    }

    if (props.startTimer) {
      return `${timer}`;
    }

    return props.text;
  };

  return (
    <Button
      onClick={props.onClick}
      sx={props.sx}
      disabled={props.loading || props.startTimer}
    >
      {displayButtonText()}
    </Button>
  );
};
