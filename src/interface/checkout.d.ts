type DeliveryOptionType = 'delivery' | 'pickup';
type TimeFrameType = 'asap' | 'later';
type DropoffOptionType = 'hand_off' | 'leave_at_door';
type UtensilOptionType = 'include' | 'do not include';
type RewardType = 'reward' | 'redemption' | 'refund' | 'cancel';

interface CheckoutState {
  deliveryOption: DeliveryOptionType;
  timeFrame: ITimeFrame;
  address?: ICheckoutAddress;
  contact: IContact;
  additional: IAdditionalOrderDetails;
  reward: IReward;
}

interface IUserResult {
  address: ICheckoutAddress;
  name: string;
  phone: string;
  reward: IReward;
}

interface IReward {
  points: number;
  transactions: IRewardTransaction[];
}

interface IRewardTransaction {
  type: RewardType;
  amount: number;
  created_at: number;
  updated_at: number;
  order_id: string;
}

interface IContact {
  name: string;
  phone: string;
}

interface IAdditionalOrderDetails {
  dropoff_option: DropoffOptionType;
  delivery_notes: string;
  kitchenNotes: string;
  utensilOption: UtensilOptionType;
}

// =========================
// TIME FRAME
// =========================

interface ITimeFrame {
  type: TimeFrameType;
  selected: ScheduleTime | null;
}

interface ScheduleTime {
  displayTime: string;
  numeric: number;
}

// =========================
// ADDRESS
// =========================
interface ICheckoutAddress {
  formatted_address: IFormattedAddress;
  details: IAddressDetails;
}

interface IFormattedAddress {
  complete: string;
  street_name: string;
  city_state_zip: string;
}

interface IAddressDetails {
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  lat: number;
  lng: number;
  place_id: string;
  delivery_fee: number;
  estimate_time: string;
  apartment_number: string;
}
