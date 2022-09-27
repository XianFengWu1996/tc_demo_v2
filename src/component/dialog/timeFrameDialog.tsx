import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { generateScheduleTime, getCurrentTime } from '../../functions/time';
import { ScheduleTimeButton } from '../button/scheduleTimeButton';

interface ITimeFrameDialogProps {
  open: boolean;
  deliveryOption: DeliveryOptionType;
  increment: number;
  handleClose: () => void;
  updateTimeFrame: (arg: TimeFrameType, arg2?: ScheduleTime) => void;
}

export const TimeFrameDialog = (props: ITimeFrameDialogProps) => {
  const [scheduleTime, setScheduleTime] = useState<ScheduleTime[]>([]);
  const [selectTime, setSelectTime] = useState<ScheduleTime>({
    displayTime: '',
    numeric: -1,
  });

  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    setScheduleTime(
      generateScheduleTime(
        process.env.NEXT_PUBLIC_STORE_OPEN_HOUR + props.increment,
        process.env.NEXT_PUBLIC_STORE_CLOSE_HOUR - props.increment,
        props.increment
      )
    );
  }, [props]);

  useEffect(() => {
    setCurrentTime(getCurrentTime() + props.increment);
  }, [props]);

  useEffect(() => {
    return () => {
      setScheduleTime([]);
      setSelectTime({
        displayTime: '',
        numeric: 0,
      });
      setCurrentTime(0);
    };
  }, []);

  const handleOnConfirm = () => {
    const tempCurrentTime = getCurrentTime() + props.increment;
    setCurrentTime(tempCurrentTime);
    if (selectTime.numeric <= tempCurrentTime) {
      props.updateTimeFrame('asap');
    } else {
      props.updateTimeFrame('later', selectTime);
    }

    // reset the state after close
    setSelectTime({
      displayTime: '',
      numeric: -1,
    });
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      keepMounted={false}
      onClose={props.handleClose}
      PaperProps={{
        sx: {
          borderRadius: '20px',
        },
      }}
    >
      <DialogContent
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
            Desire {props.deliveryOption === 'pickup' ? 'pickup' : 'delivery'}{' '}
            time
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
                increment={props.increment}
                setSelectTime={setSelectTime}
                currentTime={currentTime}
                setUpdateCurrentTime={setCurrentTime}
              />
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <Button
          variant="contained"
          disabled={isEmpty(selectTime.displayTime)}
          onClick={handleOnConfirm}
        >
          Confirm{' '}
          {!isEmpty(selectTime.displayTime) && `| ${selectTime.displayTime}`}
        </Button>
        <Button>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
