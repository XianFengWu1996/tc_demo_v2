export const extractDataFromPlaceAutocomplete = (
  result: google.maps.GeocoderAddressComponent[]
) => {
  const data = {
    street_number: '',
    street_name: '',
    city: '',
    state_name: '',
    country: '',
    postal_code: '',
  };
  result.forEach((item) => {
    switch (item.types[0]) {
      case 'street_number':
        return (data.street_number = item.short_name);
      case 'route':
        return (data.street_name = item.short_name);
      case 'locality':
        return (data.city = item.short_name);
      case 'administrative_area_level_1':
        return (data.state_name = item.short_name);
      case 'country':
        return (data.country = item.short_name);
      case 'postal_code':
        return (data.postal_code = item.short_name);
      default:
        break;
    }
  });
  return data;
};
