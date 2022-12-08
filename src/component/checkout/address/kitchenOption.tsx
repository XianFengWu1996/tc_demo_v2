import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setKitchenOption } from '../../../store/slicer/checkoutSlicer';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from '../../dialog/styles';
import { CustomInput } from '../../input/checkoutInput';

export const KitchenOption = () => {
  const { additional } = useAppSelector((state) => state.checkout);
  const isMobileScreen = useMediaQuery('(max-width: 600px)');
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const [utensilOption, setUtensilOption] = useState<UtensilOptionType>(
    additional.utensilOption ?? 'do not include'
  );
  const [kitchenNotes, setKitchenNotes] = useState<string>(
    additional.kitchenNotes ?? ''
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    dispatch(
      setKitchenOption({
        kitchenNotes: kitchenNotes,
        utensilOption: utensilOption,
      })
    );

    handleClose();
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <>
      <CheckoutNavigationButton
        onClick={handleOpen}
        title={`${additional.utensilOption} Utensil`}
        subtitle={
          additional.kitchenNotes
            ? `Kitchen Notes: ${additional.kitchenNotes}`
            : 'Add note for the kitchen'
        }
        icon={<GiForkKnifeSpoon size={22} />}
        borderBottom="none"
      />

      <CustomDialog
        fullScreen={isMobileScreen}
        open={open}
        onClose={handleClose}
      >
        <CustomDialogContent>
          <CustomeDialogTitle>For Kitchen</CustomeDialogTitle>

          <>
            <CustomeDialogSubTitle>Utensil Options</CustomeDialogSubTitle>
            <Box>
              <RadioGroup
                aria-labelledby="drop_off_option_label"
                name="dropoffOption_radio_group"
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
