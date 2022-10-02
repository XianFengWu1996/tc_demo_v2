import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

interface DisplayMapProps {
  lat: number;
  lng: number;
}
export const DisplayMap = (props: DisplayMapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    // const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(15);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '150px',
        margin: '10px 0',
      }}
      center={{
        lat: props.lat,
        lng: props.lng,
      }}
      zoom={14.8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerF
        position={{
          lat: props.lat,
          lng: props.lng,
        }}
      />
    </GoogleMap>
  );
};
