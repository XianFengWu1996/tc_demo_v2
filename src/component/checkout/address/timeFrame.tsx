import { Box, Typography } from '@mui/material';
import { HiCheckCircle } from 'react-icons/hi';
import { MdOutlineRadioButtonUnchecked, MdTimer } from 'react-icons/md';
import {
  TimeFrameCard,
  TimeFrameCardSubtitle,
  TimeFrameCardTitle,
  TimeFrameContainer,
} from './styles';

export const TimeFrame = () => {
  return (
    <Box mt={2.5}>
      <TimeFrameTitle isDelivery={true} />

      <Box display={'flex'} alignItems={'center'}>
        <TimeFrameSelectionBox
          title="ASAP"
          subtitle="30-50min"
          isSelected={true}
        />
        <TimeFrameSelectionBox
          title="Schedule for later"
          subtitle="Choose a time"
          isSelected={false}
        />
      </Box>
    </Box>
  );
};

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

const TimeFrameSelectionBox = (props: ITimeFrameSelectionBoxProps) => {
  return (
    <TimeFrameContainer isSelected={props.isSelected}>
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
