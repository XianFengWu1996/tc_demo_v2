type DeliveryOptionType = 'delivery' | 'pickup';
type TimeFrameType = 'asap' | 'later';
type DropoffOptionType = 'hand_off' | 'leave_at_door';
type UtensilOptionType = 'include' | 'do not include';

interface CheckoutState {
  deliveryOption: DeliveryOptionType;
  timeFrame: ITimeFrame;
  address: ICheckoutAddress;
  deliveryNotes: IDeliveryNotes | null;
  name: string | null;
  phone: string;
  kitchenNotes: IKitchenNotes | null;
}

interface ITimeFrame {
  type: TimeFrameType;
  selected: ScheduleTime | null;
}

interface ScheduleTime {
  displayTime: string;
  numeric: number;
}

interface ICheckoutAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

interface IDeliveryNotes {
  apt: string;
  dropOffOption: DropoffOptionType;
  driveNotes: string;
}

interface IKitchenNotes {
  utensilOption: UtensilOptionType;
}

interface IDeliveryOptionProps {
  deliveryOption: IDeliveryOption;
  updateDeliveryOption: (arg: DeliveryOptionType) => void;
}

interface IDeliveryOptionButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  type: IDeliveryOption;
}

interface ITimeFrameTitleProps {
  isDelivery: boolean;
}

interface ITimeFrameSelectionBoxProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}
