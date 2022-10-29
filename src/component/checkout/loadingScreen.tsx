import { Box, Button, Typography } from '@mui/material';
import Router from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineExclamationCircle } from 'react-icons/ai';
import { MoonLoader } from 'react-spinners';
import { getCurrentTime, timeToStringFormat } from '../../functions/time';
import { useAppSelector } from '../../store/hook';

interface LoadingScreenProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const LoadingScreen = (props: LoadingScreenProps) => {
  const { today } = useAppSelector((state) => state.store);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');

  // to check if in operating hour
  useEffect(() => {
    if (today) {
      if (!today.isOpenForBusiness) {
        props.setIsOpen(false);
        setErrMsg(`Store is currently not operating on ${today.dayOfWeek}`);
        return;
      }

      const currentTime = getCurrentTime();

      // check if the store is in operating hour
      const operating = today.hours.operating;
      if (currentTime < operating.open || currentTime > operating.close) {
        props.setIsOpen(false);
        setErrMsg(
          `The store operating hours are ${timeToStringFormat(
            operating.open
          )} -${timeToStringFormat(operating.close)}`
        );
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return;
      }

      props.setIsOpen(true);
    }
  }, [today, props]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <MoonLoader loading={loading} speedMultiplier={0.7} color="red" />
      </div>

      {!loading && (
        <Box
          sx={{
            p: 4,
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '15px',
          }}
        >
          <AiOutlineExclamationCircle size={23} color="red" />
          <Typography sx={{ textTransform: 'uppercase', my: 1 }}>
            {errMsg}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: '5px' }}
            onClick={() => Router.push('/menu')}
          >
            <AiOutlineArrowLeft style={{ marginRight: '5px' }} />
            Return to main menu
          </Button>
        </Box>
      )}
    </div>
  );
};
