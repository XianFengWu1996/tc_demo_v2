import { isEmpty } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineEventNote } from 'react-icons/md';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddressDialog } from '../../dialog/changeAddressDialog.tsx';

interface ChangeAddressProps {
  state: CheckoutState;
  setState: Dispatch<SetStateAction<CheckoutState>>;
}

export const ChangeAddress = (props: ChangeAddressProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const displayDropoffOption = () => {
    if (props.state.additional.dropoff_option === 'hand_off') {
      return 'Hand it to me';
    }

    return 'Leave at your door';
  };

  return (
    <>
      <CheckoutNavigationButton
        title={
          props.state.address &&
          !isEmpty(props.state.address.formatted_address.street_name)
            ? props.state.address.formatted_address.street_name
            : 'Add your address'
        }
        subtitle={
          props.state.address &&
          props.state.address.formatted_address.city_state_zip
        }
        icon={<AiOutlineUser size={22} />}
        onClick={handleOpen}
      />

      <CheckoutNavigationButton
        title={displayDropoffOption() as string}
        subtitle={
          !isEmpty(props.state.additional.delivery_notes)
            ? `Delivery Note: "${props.state.additional.delivery_notes}"`
            : 'Add note for driver'
        }
        icon={<MdOutlineEventNote size={22} />}
        onClick={handleOpen}
      />

      <ChangeAddressDialog
        open={open}
        handleClose={handleClose}
        state={props.state}
        setState={props.setState}
      />
    </>
  );
};
