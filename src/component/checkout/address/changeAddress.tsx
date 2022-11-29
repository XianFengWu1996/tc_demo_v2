import { isEmpty } from 'lodash';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineEventNote } from 'react-icons/md';
import { useAppSelector } from '../../../store/hook';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddressDialog } from '../../dialog/changeAddressDialog';

export const ChangeAddress = () => {
  const { address, additional } = useAppSelector((state) => state.checkout);

  const details = address.details;
  const format = address.formattedAddress;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayDropoffOption = () => {
    if (additional.dropoffOption === 'hand_off') {
      return 'Hand it to me';
    }

    return 'Leave at your door';
  };

  return (
    <>
      <CheckoutNavigationButton
        title={
          format && details && !isEmpty(format.streetName)
            ? `${format.streetName} ${
                details.apartmentNumber && `#${details.apartmentNumber}`
              }`
            : 'Add your address'
        }
        subtitle={format && format.cityStateZip}
        icon={<AiOutlineUser size={22} />}
        onClick={handleOpen}
      />

      <CheckoutNavigationButton
        title={displayDropoffOption() as string}
        subtitle={
          !isEmpty(additional.deliveryNotes)
            ? `Delivery Note: "${additional.deliveryNotes}"`
            : 'Add note for driver'
        }
        icon={<MdOutlineEventNote size={22} />}
        onClick={handleOpen}
      />

      <ChangeAddressDialog
        open={open}
        handleClose={handleClose}
        type="checkout"
        onComplete={() => console.log('first')}
      />
    </>
  );
};
