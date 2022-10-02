import { isEmpty } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineHouse } from 'react-icons/md';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { EditNameDialog } from '../../dialog/editNameDialog';

interface IEditNameProps {
  state: CheckoutState;
  setState: Dispatch<SetStateAction<CheckoutState>>;
}

export const EditName = (props: IEditNameProps) => {
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
