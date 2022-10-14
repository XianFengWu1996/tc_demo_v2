import { Dispatch, SetStateAction } from 'react';
import { MdStorefront } from 'react-icons/md';

import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { ChangeAddress } from './changeAddress';
import { DeliveryOption } from './deliveryOption';
import { DisplayMap } from './displayMap';
import { EditName } from './editName';
import { KitchenOption } from './kitchenOption';
import { AddressContainer, Title } from './styles';
import { TimeFrame } from './timeFrame';

import { EditPhone } from './editPhone';

export interface DefaultCheckoutProps {
  state: CheckoutState;
  setState: Dispatch<SetStateAction<CheckoutState>>;
}

export const Address = (props: DefaultCheckoutProps) => {
  return (
    <AddressContainer>
      <Title>Address</Title>

      {props.state.deliveryOption === 'delivery' &&
        props.state.address?.details.lat &&
        props.state.address?.details.lng && (
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
        estimateTime={props.state.address?.details.estimate_time}
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

      <EditPhone state={props.state} setState={props.setState} />

      <KitchenOption state={props.state} setState={props.setState} />
    </AddressContainer>
  );
};
