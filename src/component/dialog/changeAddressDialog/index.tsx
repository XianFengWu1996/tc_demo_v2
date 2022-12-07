import { Box, Button, useMediaQuery } from '@mui/material';
import { LoadScriptProps, useJsApiLoader } from '@react-google-maps/api';
import { ChangeEvent, useEffect, useState } from 'react';
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
  dropoffOption: 'leave_at_door',
  deliveryNotes: '',
};

interface ChangeAddressDialogProps extends Dialog {
  type: 'checkout' | 'account';
}

export const ChangeAddressDialog = (props: ChangeAddressDialogProps) => {
  const [libraries] = useState<LoadScriptProps['libraries']>(['places']);
  useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
    libraries: libraries,
  });

  const isMobileScreen = useMediaQuery('(max-width: 600px)');

  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(true);

  const [localAdditional, setLocalAdditional] =
    useState<Additional>(defaultAdditional);
  const [state, setState] = useState<Address.Details>();

  const dispatch = useAppDispatch();

  const { address, additional } = useAppSelector((state) => state.checkout);

  useEffect(() => {
    setState({
      ...state,
      formattedAddress: address.formattedAddress,
      details: address.details,
    });
    setLocalAdditional({
      deliveryNotes: additional.deliveryNotes,
      dropoffOption: additional.dropoffOption,
    });

    setEdit(!address.details || !address.formattedAddress ? true : false);
  }, [props.open]);

  const onCancel = () => {
    props.handleClose();
  };

  const onConfirm = async () => {
    try {
      setBtnLoading(true);
      if (!state || !state.details || !state.formattedAddress) {
        return snackbar.error('Missing address');
      }

      if (state.details.deliveryFee < 1) {
        return snackbar.error('Missing delivery fee');
      }

      if (state.details && state.formattedAddress) {
        await updateAddress(state);

        if (props.onComplete) {
          props.onComplete(state);
        }

        dispatch(
          setAdditionalDeliveryOption({
            deliveryNotes: localAdditional.deliveryNotes,
            dropoffOption: localAdditional.dropoffOption,
          })
        );
        dispatch(
          setAddress({
            details: state.details,
            formattedAddress: state.formattedAddress,
          })
        );

        dispatch(updateDeliveryFee(state.details.deliveryFee));

        snackbar.info('Address has been updated');

        props.handleClose();
      }
    } catch (error) {
      handleCatchError(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleApartmentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!state) return;

    if (!state.details) return;

    setState({
      ...state,
      details: {
        ...state.details,
        apartmentNumber: e.target.value,
      },
    });
  };

  const handleDeliveryNoteChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalAdditional({
      ...localAdditional,
      deliveryNotes: e.target.value,
    });
  };

  const handleDropoffOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalAdditional({
      ...localAdditional,
      dropoffOption: e.target.value as DropoffOptionType,
    });
  };

  return (
    <CustomDialog
      fullScreen={isMobileScreen}
      open={props.open}
      onClose={props.handleClose}
    >
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
            state.formattedAddress && (
              <>
                <DisplayMap lat={state.details.lat} lng={state.details.lng} />

                <AddressDisplay
                  streetName={state.formattedAddress.streetName}
                  apartmentNumber={state.details.apartmentNumber}
                  cityStateZip={state.formattedAddress.cityStateZip}
                  onClick={() => {
                    setEdit(!edit);
                  }}
                />
                <hr />
                <DeliveryAdditionalInfo
                  label="delivery fee"
                  value={`$${state.details.deliveryFee}`}
                />
                <hr />
                <DeliveryAdditionalInfo
                  label="estimate delivery time"
                  value={state.details.estimateTime}
                />
                <hr />

                <CustomeDialogSubTitle>
                  Apartment Number or Suite
                </CustomeDialogSubTitle>
                <CustomInput
                  value={state.details.apartmentNumber}
                  fullWidth
                  placeholder="Apartment Number or Suite"
                  inputProps={{
                    maxLength: 8,
                  }}
                  onChange={handleApartmentChange}
                />

                {props.type === 'checkout' && (
                  <DropoffOption
                    value={localAdditional.dropoffOption}
                    onChange={handleDropoffOptionChange}
                  />
                )}

                {props.type === 'checkout' && (
                  <>
                    <CustomeDialogSubTitle>
                      Delivery Notes
                    </CustomeDialogSubTitle>
                    <CustomInput
                      fullWidth
                      multiline
                      minRows={3}
                      value={localAdditional.deliveryNotes}
                      onChange={handleDeliveryNoteChange}
                    />
                  </>
                )}
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
