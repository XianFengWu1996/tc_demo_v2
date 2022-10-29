type TimeFrameType = 'asap' | 'later';
type DropoffOptionType = 'hand_off' | 'leave_at_door';
type UtensilOptionType = 'include' | 'do not include';
type RewardType = 'reward' | 'redemption' | 'refund' | 'cancel';

interface Checkout {
  timeFrame: TimeFrame;
  contact: Contact;
  additional: AdditionalOrderDetails;
  reward: Reward;
  address: Address;
}

interface TimeFrame {
  type: TimeFrameType;
  selected: ScheduleTime | null;
}

interface ScheduleTime {
  displayTime: string;
  numeric: number;
}

interface Contact {
  name: string;
  phone: string;
}

interface AdditionalOrderDetails {
  dropoff_option: DropoffOptionType;
  delivery_notes: string;
  kitchen_notes: string;
  utensil_option: UtensilOptionType;
}

interface Reward {
  points: number;
  transactions: RewardTransaction[];
}

interface RewardTransaction {
  type: RewardType;
  amount: number;
  created_at: number;
  updated_at: number;
  order_id: string;
}

interface Additional {
  dropoff_option: DropoffOptionType;
  delivery_notes: string;
}

interface KitchenOption {
  kitchen_notes: string;
  utensil_option: UtensilOptionType;
}

// =========================
// ADDRESS
// =========================
interface Address {
  formatted_address: FormattedAddress | null;
  details: AddressDetails | null;
}

interface FormattedAddress {
  complete: string;
  street_name: string;
  city_state_zip: string;
}

interface AddressDetails {
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

interface UserResult {
  address: Address;
  name: string;
  phone: string;
  reward: Reward;
}
