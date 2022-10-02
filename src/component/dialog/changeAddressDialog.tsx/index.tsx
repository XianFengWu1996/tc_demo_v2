import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  Typography,
} from '@mui/material';
import { LoadScriptProps, useJsApiLoader } from '@react-google-maps/api';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import snackbar from '../../../functions/utilities/snackbar';
import { DisplayMap } from '../../checkout/address/displayMap';
import { CustomInput } from '../../input/checkoutInput';
import { AddressDisplay } from './addressDisplay';
import { AddressSearch } from './addressSearch';
import { DeliveryAdditionalInfo } from './deliveryAddtionalInfo';
import { DropoffOption } from './dropoffOption';

export interface AddressState {
  formatted_address?: IFormattedAddress;
  details?: IAddressDetails;
}

interface Additional {
  dropoff_option: DropoffOptionType;
  delivery_notes: string;
}

interface IChangeAddressDialogProps {
  open: boolean;
  handleClose: () => void;
  state: CheckoutState;
  setState: Dispatch<SetStateAction<CheckoutState>>;
}

const defaultAdditional: Additional = {
  dropoff_option: 'leave_at_door',
  delivery_notes: '',
};

export const ChangeAddressDialog = (props: IChangeAddressDialogProps) => {
  const [libraries] = useState<LoadScriptProps['libraries']>(['places']);

  useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
    libraries: libraries,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(true);

  const [additional, setAdditional] = useState<Additional>(defaultAdditional);
  const [state, setState] = useState<AddressState>();

  useEffect(() => {
    if (props.state.address) {
      setState({
        ...state,
        formatted_address: props.state.address.formatted_address ?? undefined,
        details: props.state.address.details ?? undefined,
      });

      setAdditional({
        ...props.state.additional,
      });

      setEdit(!props.state.address ? true : false);
    }
  }, [props.open]);

  const resetState = () => {
    setState({
      ...state,
      formatted_address: undefined,
      details: undefined,
    });

    setEdit(true);
    setAdditional(defaultAdditional);
  };

  const onCancel = () => {
    resetState();
    props.handleClose();
  };

  const onConfirm = () => {
    if (!state || !state.details || !state.formatted_address) {
      return snackbar.error('Missing address');
    }

    if (state.details.delivery_fee < 1) {
      return snackbar.error('Missing delivery fee');
    }

    props.setState({
      ...props.state,
      additional: {
        ...props.state.additional,
        delivery_notes: additional.delivery_notes,
        dropoff_option: additional.dropoff_option,
      },
      address: {
        formatted_address: state.formatted_address,
        details: state.details,
      },
    });

    resetState();

    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        sx: {
          borderRadius: '20px',
        },
      }}
    >
      <DialogContent
        sx={{
          maxWidth: '700px',
          minWidth: '400px',
          width: '500px',
          overflowY: 'auto',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
          Change Address
        </Typography>

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

                <DialogTitle>Apartment Number or Suite</DialogTitle>
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
                  value={additional.dropoff_option}
                  onChange={(e) => {
                    setAdditional({
                      ...additional,
                      dropoff_option: e.target.value as DropoffOptionType,
                    });
                  }}
                />

                <DialogTitle>Delivery Notes</DialogTitle>
                <CustomInput
                  fullWidth
                  multiline
                  minRows={3}
                  value={additional.delivery_notes}
                  onChange={(e) => {
                    setAdditional({
                      ...additional,
                      delivery_notes: e.target.value,
                    });
                  }}
                />
              </>
            )
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export const DialogTitle = styled(Typography)(() => ({
  fontSize: 13,
  fontWeight: 600,
  marginTop: '8px',
}));
