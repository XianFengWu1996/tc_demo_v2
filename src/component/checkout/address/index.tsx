import { AiOutlineUser } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import {
  MdOutlineEventNote,
  MdOutlineHouse,
  MdOutlinePhone,
} from 'react-icons/md';

import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { DeliveryOption } from './deliveryOption';
import { AddressContainer, Title } from './styles';
import { TimeFrame } from './timeFrame';

export const Address = (props: IDeliveryOptionProps) => {
  return (
    <AddressContainer>
      <Title>Address</Title>

      <DeliveryOption
        deliveryOption={props.deliveryOption}
        setDeliveryOption={props.setDeliveryOption}
      />

      <TimeFrame />

      <CheckoutNavigationButton
        title="Name for pickup"
        subtitle={'"Shawn"'}
        icon={<AiOutlineUser size={22} />}
      />

      <CheckoutNavigationButton
        title="69 Harvard St"
        subtitle="Quincy,MA,USA 02171"
        icon={<MdOutlineHouse size={22} />}
      />
      <CheckoutNavigationButton
        title="Leave at door"
        subtitle="Add delivery note"
        icon={<MdOutlineEventNote size={22} />}
      />
      <CheckoutNavigationButton
        title="(917)-578-7352"
        icon={<MdOutlinePhone size={22} />}
      />
      <CheckoutNavigationButton
        title="Don't include utensils"
        icon={<GiForkKnifeSpoon size={22} />}
        borderBottom="none"
      />
    </AddressContainer>
  );
};
