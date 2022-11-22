import { Button, Grid, styled, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { getCurrentTime } from '../../functions/time';

interface IScheduleTimeButtonProps {
  time: ScheduleTime;
  selected: ScheduleTime;
  setSelectTime: Dispatch<SetStateAction<ScheduleTime>>;
  currentTime: number;
  increment: number;
  setUpdateCurrentTime: Dispatch<SetStateAction<number>>;
}

interface ExtraProps {
  isselected: number;
}
const ScheduleTimeButtonStyle = styled(Button)<ExtraProps>(
  ({ isselected }) => ({
    backgroundColor: isselected === 1 ? '#329932' : 'rgba(0,0,0,0.1)',
    color: isselected === 1 ? '#fff' : '#000',
    borderRadius: '30px',
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    ':hover': {
      backgroundColor: isselected === 1 ? '#7fbf7f' : 'rgba(175,175,175,0.9)',
    },
  })
);

export const ScheduleTimeButton = (props: IScheduleTimeButtonProps) => {
  const handleOnClick = () => {
    let tempCurrentTime = getCurrentTime(); // get the up to date current time
    tempCurrentTime += props.increment;
    props.setUpdateCurrentTime(tempCurrentTime); // update the current time for all the button

    // remove the select time, if not qualify
    if (props.time.numeric <= tempCurrentTime) {
      return props.setSelectTime({
        displayTime: '',
        numeric: -1,
      });
    }

    props.setSelectTime(props.time);
  };
  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <ScheduleTimeButtonStyle
        isselected={props.time.numeric === props.selected.numeric ? 1 : 0}
        onClick={handleOnClick}
        fullWidth
        disabled={props.currentTime >= props.time.numeric}
      >
        <Typography fontSize={14} fontWeight={600}>
          {props.time.displayTime}
        </Typography>
      </ScheduleTimeButtonStyle>
    </Grid>
  );
};
