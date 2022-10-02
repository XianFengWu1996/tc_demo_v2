import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { DialogTitle } from '.';

interface DropoffOptionProps {
  value: DropoffOptionType;
  onChange:
    | ((event: ChangeEvent<HTMLInputElement>, value: string) => void)
    | undefined;
}

export const DropoffOption = (props: DropoffOptionProps) => {
  return (
    <>
      <DialogTitle>Drop-off Option</DialogTitle>
      <Box>
        <RadioGroup
          aria-labelledby="drop_off_option_label"
          value={props.value}
          name="dropoff_option_radio_group"
          onChange={props.onChange}
        >
          <FormControlLabel
            value={'leave_at_door' as DropoffOptionType}
            control={<Radio size="small" />}
            label={
              <Typography fontSize={13} fontWeight={600}>
                Leave at my door
              </Typography>
            }
          />
          <FormControlLabel
            value={'hand_off' as DropoffOptionType}
            control={<Radio size="small" />}
            label={
              <Typography fontSize={13} fontWeight={600}>
                Hand it to me
              </Typography>
            }
          />
        </RadioGroup>
      </Box>
    </>
  );
};
