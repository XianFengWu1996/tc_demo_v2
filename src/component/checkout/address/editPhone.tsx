import { isEmpty } from 'lodash';
import { useState } from 'react';
import { MdOutlinePhone } from 'react-icons/md';
import { formatPhoneNumber } from '../../../functions/phone';
import { useAppSelector } from '../../../store/hook';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { EditPhoneDialog } from '../../dialog/editPhoneDialog';

export const EditPhone = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { contact } = useAppSelector((state) => state.checkout);

  return (
    <>
      <CheckoutNavigationButton
        onClick={handleOpen}
        title={
          !isEmpty(contact.phone)
            ? formatPhoneNumber(contact.phone)
            : 'Add a phone number'
        }
        icon={<MdOutlinePhone size={22} />}
      />

      <EditPhoneDialog open={open} handleClose={handleClose} />
    </>
  );
};
