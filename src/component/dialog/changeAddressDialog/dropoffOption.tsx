import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { CustomeDialogSubTitle } from '../styles';

interface DropoffOptionProps {
  value: DropoffOptionType;
  onChange:
    | ((event: ChangeEvent<HTMLInputElement>, value: string) => void)
    | undefined;
}

export const DropoffOption = (props: DropoffOptionProps) => {
  return (
    <>
      <CustomeDialogSubTitle>Drop-off Option</CustomeDialogSubTitle>
      <Box>
        <RadioGroup
          aria-labelledby="drop_off_option_label"
          value={props.value}
          name="dropoffOption_radio_group"
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
