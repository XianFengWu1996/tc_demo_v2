import { MdStorefront } from 'react-icons/md';

import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddress } from './changeAddress';
import { DeliveryOption } from './deliveryOption';
import { DisplayMap } from './displayMap';
import { EditName } from './editName';
import { KitchenOption } from './kitchenOption';
import { AddressContainer, Title } from './styles';
import { TimeFrame } from './timeFrame';

import { useAppSelector } from '../../../store/hook';
import { EditPhone } from './editPhone';

export const Address = () => {
  const { delivery_option } = useAppSelector((state) => state.cart);
  const { address } = useAppSelector((state) => state.checkout);
  return (
    <AddressContainer>
      <Title>Address</Title>

      {delivery_option === 'delivery' &&
        address.details?.lat &&
        address.details?.lng && (
          <DisplayMap lat={address.details.lat} lng={address.details.lng} />
        )}

      {delivery_option === 'pickup' && (
        <DisplayMap
          lat={Number(process.env.NEXT_PUBLIC_STORE_LAT)}
          lng={Number(process.env.NEXT_PUBLIC_STORE_LNG)}
        />
      )}

      <DeliveryOption />

      <TimeFrame />

      <EditName />

      {delivery_option === 'delivery' ? (
        <ChangeAddress />
      ) : (
        <CheckoutNavigationButton
          disabled
          title="68 Billings Rd"
          subtitle="Quincy,MA,USA 02171"
          icon={<MdStorefront size={22} />}
        />
      )}

      <EditPhone />

      <KitchenOption />
    </AddressContainer>
  );
};
