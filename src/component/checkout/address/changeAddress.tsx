import { isEmpty } from 'lodash';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineEventNote } from 'react-icons/md';
import { useAppSelector } from '../../../store/hook';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddressDialog } from '../../dialog/changeAddressDialog.tsx';

export const ChangeAddress = () => {
  const { address, additional } = useAppSelector((state) => state.checkout);

  const details = address.details;
  const format = address.formatted_address;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayDropoffOption = () => {
    if (additional.dropoff_option === 'hand_off') {
      return 'Hand it to me';
    }

    return 'Leave at your door';
  };

  return (
    <>
      <CheckoutNavigationButton
        title={
          format && details && !isEmpty(format.street_name)
            ? `${format.street_name} ${
                details.apartment_number && `#${details.apartment_number}`
              }`
            : 'Add your address'
        }
        subtitle={format && format.city_state_zip}
        icon={<AiOutlineUser size={22} />}
        onClick={handleOpen}
      />

      <CheckoutNavigationButton
        title={displayDropoffOption() as string}
        subtitle={
          !isEmpty(additional.delivery_notes)
            ? `Delivery Note: "${additional.delivery_notes}"`
            : 'Add note for driver'
        }
        icon={<MdOutlineEventNote size={22} />}
        onClick={handleOpen}
      />

      <ChangeAddressDialog open={open} handleClose={handleClose} />
    </>
  );
};
