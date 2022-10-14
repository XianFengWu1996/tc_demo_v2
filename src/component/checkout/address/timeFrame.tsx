import { Box, Typography } from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { MdOutlineRadioButtonUnchecked, MdTimer } from 'react-icons/md';
import { TimeFrameDialog } from '../../dialog/timeFrameDialog';
import {
  TimeFrameCard,
  TimeFrameCardSubtitle,
  TimeFrameCardTitle,
  TimeFrameContainer,
} from './styles';

interface ITimeFrameProps {
  timeFrame: ITimeFrame;
  estimateTime?: string;
  deliveryOption: DeliveryOptionType;
  updateTimeFrame: (arg: TimeFrameType, arg2?: ScheduleTime) => void;
}
export const TimeFrame = (props: ITimeFrameProps) => {
  const [open, setOpen] = useState<boolean>(false); // handle dialog state

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason) {
      props.updateTimeFrame('asap');
    }
    setOpen(false);
  };

  return (
    <Box mt={2.5} mb={1}>
      <TimeFrameTitle isDelivery={props.deliveryOption === 'delivery'} />

      <Box display={'flex'} alignItems={'center'}>
        <TimeFrameSelectionBox
          onClick={() => {
            props.updateTimeFrame('asap');
          }}
          title="ASAP"
          subtitle={
            props.deliveryOption === 'delivery'
              ? `${props.estimateTime ?? '30-50min'}`
              : '10-20min'
          }
          isSelected={props.timeFrame.type === 'asap'}
        />
        <TimeFrameSelectionBox
          onClick={() => {
            props.updateTimeFrame('later');
            handleDialogOpen();
          }}
          title="Schedule for later"
          subtitle={
            props.timeFrame.selected
              ? props.timeFrame.selected.displayTime
              : 'Choose a time'
          }
          isSelected={props.timeFrame.type === 'later'}
        />

        <TimeFrameDialog
          open={open}
          handleClose={handleDialogClose}
          increment={props.deliveryOption === 'delivery' ? 30 : 20}
          deliveryOption={props.deliveryOption}
          updateTimeFrame={props.updateTimeFrame}
        />
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
