import { isEmpty } from 'lodash';
import { useState } from 'react';
import { MdOutlineHouse } from 'react-icons/md';
import { useAppSelector } from '../../../store/hook';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { EditNameDialog } from '../../dialog/editNameDialog';

export const EditName = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { deliveryOption } = useAppSelector((state) => state.cart);
  const { contact } = useAppSelector((state) => state.checkout);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CheckoutNavigationButton
        onClick={handleOpen}
        title={
          deliveryOption === 'delivery' ? 'Customer Name' : 'Name for Pickup'
        }
        subtitle={
          !isEmpty(contact.name) ? contact.name : 'Please provide your name'
        }
        icon={<MdOutlineHouse size={22} />}
      />

      <EditNameDialog open={open} handleClose={handleClose} />
    </>
  );
};
