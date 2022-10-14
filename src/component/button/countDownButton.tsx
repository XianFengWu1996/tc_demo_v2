import { Button, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { LengthType } from 'react-spinners/helpers/props';
import { setTimeout } from 'timers';

interface ICountDownButtonProps {
  onClick: () => Promise<void>;
  text: string;
  sx?: SxProps<Theme> | undefined;
  loaderColor?: string;
  loaderSize?: LengthType;
}

export const CountDownButton = (props: ICountDownButtonProps) => {
  const defaultTimer = 30;
  const [timer, setTimer] = useState<number>(defaultTimer);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (timerStarted) {
      if (timer > 0) {
        setTimeout(() => {
          setTimer((t) => t - 1);
        }, 1000);
      } else {
        // if the timer has reach 0, reset the state
        setTimerStarted(false);
        setTimer(defaultTimer);
      }
    }
  }, [timer, timerStarted]);

  useEffect(() => {
    return () => {
      setTimer(defaultTimer);
      setTimerStarted(false);
      setLoading(false);
    };
  }, []);

  const displayButtonText = () => {
    // during the loading process, display the loader
    if (loading) {
      return (
        <MoonLoader
          size={props.loaderSize ?? 14}
          color={props.loaderColor ?? '#f38486'}
        />
      );
    }

    if (timerStarted) {
      return `${timer}`;
    }

    return props.text;
  };

  return (
    <Button
      onClick={() => {
        setLoading(true);

        props
          .onClick()
          .then(() => {
            setLoading(false);
            setTimerStarted(true);
          })
          .catch(() => {
            setLoading(false);
          });
      }}
      sx={props.sx}
      disabled={loading || timerStarted}
    >
      {displayButtonText()}
    </Button>
  );
};
