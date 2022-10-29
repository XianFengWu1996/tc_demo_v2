import { Box, Button } from '@mui/material';
import { LoadScriptProps, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { updateAddress } from '../../../functions/checkout';
import { handleCatchError } from '../../../functions/error';
import snackbar from '../../../functions/utilities/snackbar';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { updateDeliveryFee } from '../../../store/slicer/cartSlicer';
import {
  setAdditionalDeliveryOption,
  setAddress,
} from '../../../store/slicer/checkoutSlicer';
import { LoadingButton } from '../../button/loadingButton';
import { DisplayMap } from '../../checkout/address/displayMap';
import { CustomInput } from '../../input/checkoutInput';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from '../styles';
import { AddressDisplay } from './addressDisplay';
import { AddressSearch } from './addressSearch';
import { DeliveryAdditionalInfo } from './deliveryAddtionalInfo';
import { DropoffOption } from './dropoffOption';

const defaultAdditional: Additional = {
  dropoff_option: 'leave_at_door',
  delivery_notes: '',
};

export const ChangeAddressDialog = (props: Dialog) => {
  const [libraries] = useState<LoadScriptProps['libraries']>(['places']);

  useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
    libraries: libraries,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(true);

  const [localAdditional, setLocalAdditional] =
    useState<Additional>(defaultAdditional);
  const [state, setState] = useState<Address>();

  const dispatch = useAppDispatch();
  const { address, additional } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    setState({
      ...state,
      formatted_address: address.formatted_address,
      details: address.details,
    });
    console.log(additional);
    setLocalAdditional({
      delivery_notes: additional.delivery_notes,
      dropoff_option: additional.dropoff_option,
    });

    setEdit(!address.details || !address.formatted_address ? true : false);
  }, [props.open]);

  const onCancel = () => {
    props.handleClose();
  };

  const onConfirm = async () => {
    try {
      setBtnLoading(true);
      if (!state || !state.details || !state.formatted_address) {
        return snackbar.error('Missing address');
      }

      if (state.details.delivery_fee < 1) {
        return snackbar.error('Missing delivery fee');
      }

      if (state.details && state.formatted_address) {
        await updateAddress(state);

        dispatch(
          setAdditionalDeliveryOption({
            delivery_notes: localAdditional.delivery_notes,
            dropoff_option: localAdditional.dropoff_option,
          })
        );

        dispatch(
          setAddress({
            details: state.details,
            formatted_address: state.formatted_address,
          })
        );

        dispatch(updateDeliveryFee(state.details.delivery_fee));

        snackbar.info('Address has been updated');

        props.handleClose();
      }
    } catch (error) {
      handleCatchError(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent>
        <CustomeDialogTitle>Change Address</CustomeDialogTitle>
        <Box>
          {edit && (
            <AddressSearch
              state={state}
              setState={setState}
              setLoading={setLoading}
            />
          )}

          {loading ? (
            <Box display={'flex'} justifyContent={'center'} mt={3}>
              <MoonLoader size={30} />
            </Box>
          ) : (
            state &&
            state.details &&
            state.formatted_address && (
              <>
                <DisplayMap lat={state.details.lat} lng={state.details.lng} />

                <AddressDisplay
                  street_name={state.formatted_address.street_name}
                  apartment_number={state.details.apartment_number}
                  city_state_zip={state.formatted_address.city_state_zip}
                  onClick={() => {
                    setEdit(!edit);
                  }}
                />
                <hr />
                <DeliveryAdditionalInfo
                  label="delivery fee"
                  value={`$${state.details.delivery_fee}`}
                />
                <hr />
                <DeliveryAdditionalInfo
                  label="estimate delivery time"
                  value={state.details.estimate_time}
                />
                <hr />

                <CustomeDialogSubTitle>
                  Apartment Number or Suite
                </CustomeDialogSubTitle>
                <CustomInput
                  value={state.details.apartment_number}
                  fullWidth
                  placeholder="Apartment Number or Suite"
                  inputProps={{
                    maxLength: 8,
                  }}
                  onChange={(e) => {
                    if (state.details) {
                      setState({
                        ...state,
                        details: {
                          ...state.details,
                          apartment_number: e.target.value,
                        },
                      });
                    }
                  }}
                />

                <DropoffOption
                  value={localAdditional.dropoff_option}
                  onChange={(e) => {
                    setLocalAdditional({
                      ...localAdditional,
                      dropoff_option: e.target.value as DropoffOptionType,
                    });
                  }}
                />

                <CustomeDialogSubTitle>Delivery Notes</CustomeDialogSubTitle>
                <CustomInput
                  fullWidth
                  multiline
                  minRows={3}
                  value={localAdditional.delivery_notes}
                  onChange={(e) => {
                    setLocalAdditional({
                      ...localAdditional,
                      delivery_notes: e.target.value,
                    });
                  }}
                />
              </>
            )
          )}
        </Box>
      </CustomDialogContent>
      <CustomDialogActions>
        <LoadingButton
          text={'Confirm'}
          onClick={onConfirm}
          loading={btnLoading}
        />
        <Button onClick={onCancel}>Cancel</Button>
      </CustomDialogActions>
    </CustomDialog>
  );
};
