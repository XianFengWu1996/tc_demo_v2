type TimeFrameType = 'asap' | 'later';
type DropoffOptionType = 'hand_off' | 'leave_at_door';
type UtensilOptionType = 'include' | 'do not include';
type RewardType = 'reward' | 'redemption' | 'refund' | 'cancel';
type StatusType =
  | 'in_progress'
  | 'complete'
  | 'partial_refund'
  | 'fully_refund'
  | 'cancelled';
type VerificationStatus = 'pre' | 'verifying' | 'complete';

type TipType = '' | '10%' | '15%' | '18%' | '20%' | 'cash' | 'custom';

interface Checkout {
  timeFrame: TimeFrame;
  contact: Contact;
  additional: AdditionalOrderDetails;
  reward: Reward;
  address: Address;
  clientSecret: string | null;
  cards: Card[];
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
  dropoffOption: DropoffOptionType;
  deliveryNotes: string;
  kitchenNotes: string;
  utensilOption: UtensilOptionType;
}

interface Reward {
  points: number;
  transactions: RewardTransaction[];
}

interface RewardTransaction {
  type: RewardType;
  amount: number;
  createdAt: number;
  updatedAt: number;
  orderId: string;
}

interface Additional {
  dropoffOption: DropoffOptionType;
  deliveryNotes: string;
}

interface KitchenOption {
  kitchenNotes: string;
  utensilOption: UtensilOptionType;
}

// =========================
// ADDRESS
// =========================
interface Address {
  formattedAddress: FormattedAddress | null;
  details: AddressDetails | null;
}

interface FormattedAddress {
  complete: string;
  streetName: string;
  cityStateZip: string;
}

interface AddressDetails {
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  placeId: string;
  deliveryFee: number;
  estimateTime: string;
  apartmentNumber: string;
}

interface CheckoutResult {
  user: User;
  clientSecret: string;
  cards: Card[];
}

interface User {
  address: Address;
  name: string;
  phone: string;
  reward: Reward;
}

interface Card {
  id: string;
  customer: string;
  card: {
    brand: string;
    expMonth: number;
    expYear: number;
    last4: string;
  };
}

interface CheckoutClient {
  id: string;
  createdAt: number;
  contact: Contact;
  deliveryOption: DeliveryOptionType;
  timeFrame: TimeFrame;
  delivery: {
    address: Address;
    deliveryNotes: string;
    dropoffOption: DropoffOptionType;
  } | null;
  kitchen: KitchenOption;
  cart: CartItem[];
  summary: CartSummary;
  reward: number;
  orderStatus: {
    status: StatusType;
    refund: RefundCancel | null;
    cancel: RefundCancel | null;
  };
}

interface RefundCancel {
  amount: number;
  reason: string;
  date: number;
}

declare namespace PhoneVerification {
  interface Before {
    phone: string;
    loading: boolean;
    onChange:
      | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
      | undefined;
    onClick: () => void;
  }
  interface During extends Before {
    otp: string;
    onResend: () => Promise<void>;
  }
  interface Complete {
    onClick: () => void;
  }
}

interface EditPhoneContent {
  title?: string;
  subTitle?: string | ReactNode;
  content?: ReactNode;
  buttonDisabled?: boolean;
  buttonText: string;
  onClick?: () => void;
  loading?: boolean;
}
