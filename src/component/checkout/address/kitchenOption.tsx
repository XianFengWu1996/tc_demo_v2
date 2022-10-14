import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { DefaultCheckoutProps } from '.';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from '../../dialog/styles';
import { CustomInput } from '../../input/checkoutInput';

export const KitchenOption = (props: DefaultCheckoutProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [utensilOption, setUtensilOption] =
    useState<UtensilOptionType>('do not include');
  const [kitchenNotes, setKitchenNotes] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    console.log('confirm');

    props.setState({
      ...props.state,
      additional: {
        ...props.state.additional,
        kitchenNotes,
        utensilOption,
      },
    });

    handleClose();
  };

  const onCancel = () => {
    handleClose();
  };

  useEffect(() => {
    setKitchenNotes(props.state.additional.kitchenNotes);
    setUtensilOption(props.state.additional.utensilOption);

    return () => {
      setKitchenNotes('');
      setUtensilOption('do not include');
    };
  }, [open]);

  return (
    <>
      <CheckoutNavigationButton
        onClick={handleOpen}
        title={`${props.state.additional.utensilOption} Utensil`}
        subtitle={
          props.state.additional.kitchenNotes
            ? `Kitchen Notes: ${props.state.additional.kitchenNotes}`
            : 'Add note for the kitchen'
        }
        icon={<GiForkKnifeSpoon size={22} />}
        borderBottom="none"
      />

      <CustomDialog open={open} onClose={handleClose}>
        <CustomDialogContent>
          <CustomeDialogTitle>For Kitchen</CustomeDialogTitle>

          <>
            <CustomeDialogSubTitle>Utensil Options</CustomeDialogSubTitle>
            <Box>
              <RadioGroup
                aria-labelledby="drop_off_option_label"
                name="dropoff_option_radio_group"
                value={utensilOption}
                onChange={(e, value) => {
                  setUtensilOption(value as UtensilOptionType);
                }}
              >
                <FormControlLabel
                  value={'do not include' as UtensilOptionType}
                  control={<Radio size="small" />}
                  label={
                    <Typography fontSize={13} fontWeight={600}>
                      Do not include utensils
                    </Typography>
                  }
                />
                <FormControlLabel
                  value={'include' as UtensilOptionType}
                  control={<Radio size="small" />}
                  label={
                    <Typography fontSize={13} fontWeight={600}>
                      Include Utensils
                    </Typography>
                  }
                />
              </RadioGroup>

              <CustomeDialogSubTitle>Kitchen Notes</CustomeDialogSubTitle>
              <CustomInput
                value={kitchenNotes}
                minRows={3}
                multiline
                fullWidth
                onChange={(e) => {
                  setKitchenNotes(e.target.value);
                }}
              />
            </Box>
          </>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button variant="contained" onClick={onConfirm}>
            Confirm
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </CustomDialogActions>
      </CustomDialog>
    </>
  );
};
