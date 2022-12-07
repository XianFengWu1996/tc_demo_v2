type DropoffOptionType = 'hand_off' | 'leave_at_door';
type UtensilOptionType = 'include' | 'do not include';

type VerificationStatus = 'pre' | 'verifying' | 'complete';

type TipType = '' | '10%' | '15%' | '18%' | '20%' | 'cash' | 'custom';

interface Checkout {
  timeFrame: TimeFrame.Scheduling;
  contact: Contact;
  additional: AdditionalOrderDetails;
  reward: Reward;
  address: Address;
  clientSecret: string | null;
  cards: Card[];
}

declare namespace TimeFrame {
  type Type = 'asap' | 'later';

  interface Scheduling {
    type: Type;
    selected: SelectedTime | null;
  }

  interface SelectedTime {
    displayTime: string;
    numeric: number;
  }
}

declare namespace User {
  interface User {
    address: Address;
    name: string;
    phone: string;
    reward: Reward;
  }

  interface Contact {
    name: string;
    phone: string;
  }

  interface Reward {
    points: number;
    transactions: RewardTransaction[];
  }

  type RewardType = 'reward' | 'redemption' | 'refund' | 'cancel';

  interface RewardTransaction {
    type: RewardType;
    amount: number;
    createdAt: number;
    updatedAt: number;
    orderId: string;
  }
}

declare namespace Address {
  interface Details {
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
}

interface AdditionalOrderDetails {
  dropoffOption: DropoffOptionType;
  deliveryNotes: string;
  kitchenNotes: string;
  utensilOption: UtensilOptionType;
}

interface Additional {
  dropoffOption: DropoffOptionType;
  deliveryNotes: string;
}

interface KitchenOption {
  kitchenNotes: string;
  utensilOption: UtensilOptionType;
}

interface CheckoutResult {
  user: User;
  clientSecret: string;
  cards: Card[];
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

interface Order {
  id: string;
  createdAt: number;
  contact: User.Contact;
  deliveryOption: DeliveryOptionType;
  timeFrame: TimeFrame.Scheduling;
  delivery: {
    address: Address.Details;
    deliveryNotes: string;
    dropoffOption: DropoffOptionType;
  } | null;
  kitchen: KitchenOption;
  cart: CartItem[];
  summary: CartSummary;
  reward: number;
  orderStatus: {
    status: OrderStatus.StatusType;
    refund: OrderStatus.Details | null;
    cancel: OrderStatus.Details | null;
  };
}

declare namespace OrderStatus {
  type StatusType =
    | 'in_progress'
    | 'complete'
    | 'partial_refund'
    | 'fully_refund'
    | 'cancelled';

  interface Details {
    amount: number;
    reason: string;
    date: number;
  }
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
