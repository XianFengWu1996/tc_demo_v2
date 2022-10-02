import { Dispatch, SetStateAction } from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { MdOutlinePhone, MdStorefront } from 'react-icons/md';

import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddress } from './changeAddress';
import { DeliveryOption } from './deliveryOption';
import { DisplayMap } from './displayMap';
import { EditName } from './editName';
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

      {props.state.address?.details.lat && props.state.address?.details.lng && (
        <DisplayMap
          lat={props.state.address?.details.lat}
          lng={props.state.address?.details.lng}
        />
      )}

      {props.state.deliveryOption === 'pickup' && (
        <DisplayMap
          lat={Number(process.env.NEXT_PUBLIC_STORE_LAT)}
          lng={Number(process.env.NEXT_PUBLIC_STORE_LNG)}
        />
      )}

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

      <EditName state={props.state} setState={props.setState} />

      {props.state.deliveryOption === 'delivery' ? (
        <ChangeAddress state={props.state} setState={props.setState} />
      ) : (
        <CheckoutNavigationButton
          disabled
          title="68 Billings Rd"
          subtitle="Quincy,MA,USA 02171"
          icon={<MdStorefront size={22} />}
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
