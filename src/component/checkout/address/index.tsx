import { Dialog, DialogContent } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import {
  MdOutlineEventNote,
  MdOutlineHouse,
  MdOutlinePhone,
  MdStorefront,
} from 'react-icons/md';

import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { DeliveryOption } from './deliveryOption';
import { AddressContainer, Title } from './styles';
import { TimeFrame } from './timeFrame';

interface IAddressProps {
  state: CheckoutState;
  setState: Dispatch<SetStateAction<CheckoutState>>;
}
export const Address = (props: IAddressProps) => {
  return (
    <AddressContainer>
      <Title>Address</Title>

      <DeliveryOption
        deliveryOption={props.state.deliveryOption}
        updateDeliveryOption={(option) => {
          props.setState({
            ...props.state,
            deliveryOption: option,
          });
        }}
      />

      <TimeFrame
        timeFrame={props.state.timeFrame}
        deliveryOption={props.state.deliveryOption}
        updateTimeFrame={(type, selected) => {
          props.setState({
            ...props.state,
            timeFrame: {
              type,
              selected: selected ?? null,
            },
          });
        }}
      />

      {props.state.deliveryOption === 'pickup' && (
        <CheckoutNavigationButton
          title="Name for Pickup"
          subtitle={`"Shawn"`}
          icon={<MdOutlineHouse size={22} />}
        />
      )}

      {props.state.deliveryOption === 'delivery' ? (
        <ChangeAddress />
      ) : (
        <CheckoutNavigationButton
          disabled
          title="68 Billings Rd"
          subtitle="Quincy,MA,USA 02171"
          icon={<MdStorefront size={22} />}
        />
      )}

      {props.state.deliveryOption === 'delivery' && (
        <CheckoutNavigationButton
          title="Leave at door"
          subtitle="Add note for driver"
          icon={<MdOutlineEventNote size={22} />}
        />
      )}
      <CheckoutNavigationButton
        title="(917)-578-7352"
        icon={<MdOutlinePhone size={22} />}
      />
      <CheckoutNavigationButton
        title="Don't include utensils"
        subtitle="Add notes for kitchen"
        icon={<GiForkKnifeSpoon size={22} />}
        borderBottom="none"
      />
    </AddressContainer>
  );
};

export const ChangeAddress = () => {
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
        title="69 Harvard St"
        subtitle="Quincy,MA,02171,USA"
        icon={<AiOutlineUser size={22} />}
        onClick={handleOpen}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};
