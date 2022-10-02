import { InputAdornment } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { Dispatch, SetStateAction, useRef } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import { AddressState } from '.';
import { handleCatchError } from '../../../functions/error';
import { extractDataFromPlaceAutocomplete } from '../../../functions/map';
import { CustomInput } from '../../input/checkoutInput';

interface DistanceFeeResult {
  fee: number;
  preparationTime: {
    lower: number;
    upper: number;
  };
}

export const store_coordinates = { lat: 42.274239, lng: -71.024437 };

const defaultBounds = {
  north: store_coordinates.lat + 0.07,
  south: store_coordinates.lat - 0.07,
  east: store_coordinates.lng + 0.07,
  west: store_coordinates.lng - 0.07,
};

const options = {
  bounds: defaultBounds,
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'geometry', 'place_id', 'name'],
  strictBounds: true,
  types: ['address'],
};

interface AddressSearchProps {
  state?: AddressState;
  setState: Dispatch<SetStateAction<AddressState | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const AddressSearch = (props: AddressSearchProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = async () => {
    try {
      if (autocompleteRef.current) {
        // get the place details
        const { address_components, geometry, place_id } =
          autocompleteRef.current.getPlace();

        // check if the required data are available
        if (address_components && geometry && geometry.location && place_id) {
          // extract the neccessary data from the place details
          const {
            street_name,
            street_number,
            city,
            state_name,
            country,
            postal_code,
          } = extractDataFromPlaceAutocomplete(address_components);
          props.setLoading(true);
          // calcuate the delivery fee and estimate time for delivery
          const result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/checkout/delivery/calculate`,
            data: {
              lat: geometry.location.lat(),
              lng: geometry.location.lng(),
            },
          });

          const distance_and_fee = result.data as DistanceFeeResult;

          // set the state
          props.setState({
            ...props.state,
            formatted_address: {
              complete: `${street_number} ${street_name}, ${city}, ${state_name}, ${country}, ${postal_code}`,
              street_name: `${street_number} ${street_name}`,
              city_state_zip: `${city}, ${state_name}, ${country}, ${postal_code}`,
            },
            details: {
              street_name,
              street_number,
              city,
              state: state_name,
              country,
              postal_code,
              lat: geometry.location.lat(),
              lng: geometry.location.lng(),
              place_id: place_id,
              delivery_fee: distance_and_fee.fee,
              estimate_time: `${distance_and_fee.preparationTime.lower}-${distance_and_fee.preparationTime.upper}min`,
              apartment_number: '',
            },
          });
        }
      }
    } catch (error) {
      handleCatchError(error);
    } finally {
      props.setLoading(false);
    }
  };

  return (
    <Autocomplete
      options={options}
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
    >
      <CustomInput
        placeholder="Enter Address"
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <MdOutlineLocationOn size={20} />
          </InputAdornment>
        }
        styles={{ marginTop: '15px' }}
      />
    </Autocomplete>
  );
};
