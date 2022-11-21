import {
  GoogleMap,
  LoadScriptProps,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useState } from 'react';

interface DisplayMapProps {
  lat?: number | null;
  lng?: number | null;
}
export const DisplayMap = (props: DisplayMapProps) => {
  const [libraries] = useState<LoadScriptProps['libraries']>(['places']);

  useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
    libraries: libraries,
  });
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
    window.google &&
    (props.lat && props.lng ? (
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
    ) : (
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '150px',
          margin: '10px 0',
        }}
        center={{
          lat: Number(process.env.NEXT_PUBLIC_STORE_LAT),
          lng: Number(process.env.NEXT_PUBLIC_STORE_LNG),
        }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    ))
  );
};
