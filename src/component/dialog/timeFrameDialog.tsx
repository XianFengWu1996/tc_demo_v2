import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { generateScheduleTime, getCurrentTime } from '../../functions/time';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  setTimeFrameSelect,
  setTimeFrameType,
} from '../../store/slicer/checkoutSlicer';
import { ScheduleTimeButton } from '../button/scheduleTimeButton';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
} from './styles';

export const TimeFrameDialog = (props: Dialog) => {
  const isMobileScreen = useMediaQuery('(max-width: 600px)');

  const [scheduleTime, setScheduleTime] = useState<ScheduleTime[]>([]);
  const [selectTime, setSelectTime] = useState<ScheduleTime>({
    displayTime: '',
    numeric: -1,
  });

  const [currentTime, setCurrentTime] = useState<number>(0);

  const { today } = useAppSelector((state) => state.store);
  const { delivery_option } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const increment = delivery_option === 'delivery' ? 30 : 20;

  useEffect(() => {
    if (today) {
      setScheduleTime(
        generateScheduleTime(
          Number(today.hours.operating.open),
          Number(today.hours.operating.close),
          increment
        )
      );
    }
  }, [today, increment]);

  useEffect(() => {
    setCurrentTime(getCurrentTime() + increment);
  }, [props, increment]);

  useEffect(() => {
    return () => {
      setScheduleTime([]);
      setSelectTime({
        displayTime: '',
        numeric: -1,
      });
      setCurrentTime(0);
    };
  }, []);

  const handleOnConfirm = () => {
    const tempCurrentTime = getCurrentTime() + increment;
    setCurrentTime(tempCurrentTime);
    if (selectTime.numeric <= tempCurrentTime) {
      dispatch(setTimeFrameType('asap'));
    } else {
      dispatch(setTimeFrameType('later'));
      dispatch(setTimeFrameSelect(selectTime));
    }

    // reset the state after close
    setSelectTime({
      displayTime: '',
      numeric: -1,
    });
    props.handleClose();
  };

  return (
    <CustomDialog
      open={props.open}
      fullScreen={isMobileScreen}
      keepMounted={false}
      onClose={props.handleClose}
    >
      <CustomDialogContent
        sx={{
          maxWidth: '700px',
          minHeight: '500px',
          overflowY: 'auto',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
          Schedule a time
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 600, my: 1 }}>
            Desire {delivery_option === 'pickup' ? 'pickup' : 'delivery'} time
          </Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 600 }}>
            (All times in US/Eastern)
          </Typography>
        </Box>

        <Grid container spacing={1}>
          {scheduleTime.map((time) => {
            return (
              <ScheduleTimeButton
                key={time.displayTime}
                time={time}
                selected={selectTime}
                increment={increment}
                setSelectTime={setSelectTime}
                currentTime={currentTime}
                setUpdateCurrentTime={setCurrentTime}
              />
            );
          })}
        </Grid>
      </CustomDialogContent>
      <CustomDialogActions>
        <Button
          variant="contained"
          disabled={isEmpty(selectTime.displayTime)}
          onClick={handleOnConfirm}
        >
          Confirm{' '}
          {!isEmpty(selectTime.displayTime) && `| ${selectTime.displayTime}`}
        </Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </CustomDialogActions>
    </CustomDialog>
  );
};
