import { Box, Typography } from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { MdOutlineRadioButtonUnchecked, MdTimer } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setTimeFrameType } from '../../../store/slicer/checkoutSlicer';
import { TimeFrameDialog } from '../../dialog/timeFrameDialog';
import {
  TimeFrameCard,
  TimeFrameCardSubtitle,
  TimeFrameCardTitle,
  TimeFrameContainer,
} from './styles';

export const TimeFrame = () => {
  const [open, setOpen] = useState<boolean>(false); // handle dialog state
  const { delivery_option } = useAppSelector((state) => state.cart);
  const { timeFrame, address } = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason) {
      dispatch(setTimeFrameType('asap'));
    }
    setOpen(false);
  };

  return (
    <Box mt={2.5} mb={1}>
      <TimeFrameTitle isDelivery={delivery_option === 'delivery'} />

      <Box display={'flex'} alignItems={'center'}>
        <TimeFrameSelectionBox
          onClick={() => {
            dispatch(setTimeFrameType('asap'));
          }}
          title="ASAP"
          subtitle={
            delivery_option === 'delivery'
              ? `${address.details?.estimate_time ?? '30-50min'}`
              : '10-20min'
          }
          isSelected={timeFrame.type === 'asap'}
        />
        <TimeFrameSelectionBox
          onClick={() => {
            dispatch(setTimeFrameType('later'));
            handleDialogOpen();
          }}
          title="Schedule for later"
          subtitle={
            timeFrame.selected
              ? timeFrame.selected.displayTime
              : 'Choose a time'
          }
          isSelected={timeFrame.type === 'later'}
        />

        <TimeFrameDialog open={open} handleClose={handleDialogClose} />
      </Box>
    </Box>
  );
};

interface ITimeFrameTitleProps {
  isDelivery: boolean;
}

const TimeFrameTitle = (props: ITimeFrameTitleProps) => {
  return (
    <Box display="flex" alignItems={'center'} mb={1}>
      <MdTimer size={22} />
      <Typography ml={3} fontWeight={600}>
        {props.isDelivery ? 'Delivery' : 'Pick Up'} Time
      </Typography>
    </Box>
  );
};

interface ITimeFrameSelectionBoxProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

const TimeFrameSelectionBox = (props: ITimeFrameSelectionBoxProps) => {
  return (
    <TimeFrameContainer onClick={props.onClick}>
      <TimeFrameCard>
        <TimeFrameCardTitle>{props.title}</TimeFrameCardTitle>

        {props.isSelected ? (
          <HiCheckCircle size={20} />
        ) : (
          <MdOutlineRadioButtonUnchecked size={20} />
        )}
      </TimeFrameCard>

      <TimeFrameCardSubtitle>{props.subtitle}</TimeFrameCardSubtitle>
    </TimeFrameContainer>
  );
};
