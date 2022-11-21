import { MdStorefront } from 'react-icons/md';

import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddress } from './changeAddress';
import { DeliveryOption } from './deliveryOption';
import { DisplayMap } from './displayMap';
import { EditName } from './editName';
import { KitchenOption } from './kitchenOption';
import { TimeFrame } from './timeFrame';

import { Box, Button } from '@mui/material';
import { useAppSelector } from '../../../store/hook';
import { CheckoutExpandPanel } from '../expandPanel';
import { EditPhone } from './editPhone';

interface AddressProps {
  showAddress: boolean;
  handleProceed: () => void;
  backToAddress: () => void;
}

export const Address = (props: AddressProps) => {
  const { deliveryOption } = useAppSelector((state) => state.cart);
  const { address } = useAppSelector((state) => state.checkout);

  return (
    <CheckoutExpandPanel
      text="Address"
      onClick={props.backToAddress}
      show={props.showAddress}
    >
      {deliveryOption === 'delivery' && (
        <DisplayMap lat={address?.details?.lat} lng={address?.details?.lng} />
      )}
      {deliveryOption === 'pickup' && (
        <DisplayMap
          lat={Number(process.env.NEXT_PUBLIC_STORE_LAT)}
          lng={Number(process.env.NEXT_PUBLIC_STORE_LNG)}
        />
      )}

      <DeliveryOption />

      <TimeFrame />

      <EditName />

      {deliveryOption === 'delivery' ? (
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

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          sx={{ mt: 1, mb: 3 }}
          onClick={props.handleProceed}
        >
          Continue to Payment
        </Button>
      </Box>
    </CheckoutExpandPanel>
  );
};
