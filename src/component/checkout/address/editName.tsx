import { isEmpty } from 'lodash';
import { useState } from 'react';
import { MdOutlineHouse } from 'react-icons/md';
import { DefaultCheckoutProps } from '.';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { EditNameDialog } from '../../dialog/editNameDialog';

export const EditName = (props: DefaultCheckoutProps) => {
  const [open, setOpen] = useState<boolean>(false);

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
          props.state.deliveryOption === 'delivery'
            ? 'Customer Name'
            : 'Name for Pickup'
        }
        subtitle={
          !isEmpty(props.state.contact.name)
            ? props.state.contact.name
            : 'Please provide your name'
        }
        icon={<MdOutlineHouse size={22} />}
      />

      <EditNameDialog
        open={open}
        onClose={handleClose}
        name={props.state.contact.name}
        setState={props.setState}
      />
    </>
  );
};
