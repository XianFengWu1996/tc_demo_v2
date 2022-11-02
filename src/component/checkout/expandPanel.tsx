import { Box, Button, Paper, useMediaQuery } from '@mui/material';
import { ReactNode, useEffect, useRef } from 'react';

interface CheckoutExpandPanelProps {
  show: boolean;
  onClick?: () => void;
  text: string;
  children: ReactNode;
}

export const CheckoutExpandPanel = (props: CheckoutExpandPanelProps) => {
  const ref = useRef<HTMLDivElement>();

  const isMediumScreen = useMediaQuery('(max-width:899px)');

  useEffect(() => {
    if (props.show && ref.current) {
      if (!isMediumScreen) {
        window.scrollTo(0, 0);
      }
    }
  }, [props.show, isMediumScreen]);

  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '15px',
        margin: '20px 0 30px 0',
      }}
    >
      <Button
        fullWidth
        disableRipple
        disableElevation
        onClick={props.onClick}
        sx={{
          padding: '20px',
          borderRadius: '15px',
          justifyContent: 'start',
          fontWeight: 600,
          fontSize: 18,
          textTransform: 'capitalize',

          ':hover': {
            background: 'transparent',
          },
        }}
      >
        {props.text}
      </Button>
      <Box
        ref={ref}
        sx={{
          padding: '0 20px',
          height: props.show ? ref.current?.scrollHeight : 0,
          overflow: 'hidden',
          transition: 'height ease 1s',
        }}
      >
        {props.children}
      </Box>
    </Paper>
  );
};
