type ChoiceType = 'required' | 'optional';
type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

interface StoreAxiosResult {
  menus: Menu[];
  hours: Hours;
  messages: Message;
  status: Status;
  dishes: Dish[];
}

interface Menu {
  id: string;
  en_name: string;
  ch_name: string;
  category: Category[];
  hours: MenuHour;
}

interface Category {
  id: string;
  menuId: string;
  en_name: string;
  ch_name: string;
  order: number;
}
interface Dish {
  id: string;
  menuId: string;
  categoryId: string;
  en_name: string;
  ch_name: string;
  is_spicy: boolean;
  is_popular: boolean;
  is_lunch: boolean;
  in_stock: boolean;
  price: number;
  choices: Choice[];
  description: string;
  label_id: string;
  pic_url: string;
}

interface Choice {
  id: string;
  en_name: string;
  ch_name: string;
  minimum: number;
  maxiumum: number;
  options: Option[];
  type: ChoiceType;
}

interface SelectChoice extends Choice {
  selectOptions: Option[];
}

interface Option {
  id: string;
  en_name: string;
  ch_name: string;
  price: number;
  is_spicy: boolean;
  default: boolean;
}

interface Hours {
  regular_hour: RegularHour[];
  special_hour: SpecialHour[];
}

interface RegularHour {
  dayOfWeek: DayOfWeek;
  isOpenForBusiness: boolean;
  hours: {
    lunch: OperatingHour;
    operating: OperatingHour;
  };
}

interface SpecialHour extends RegularHour {
  date: {
    day: number;
    month: number;
    year: number;
  };
}

interface OperatingHour {
  open: number;
  close: number;
}

interface MenuHour {
  start: number;
  end: number;
}

interface Message {
  maintenance: string[];
  payment: string[];
  updates: string[];
  promotions: string[];
}

interface Status {
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
  };
  phone: {
    primary: string;
    sub: string;
  };
  serverOn: boolean;
}

declare namespace Simulate {
  type ContactUsMessageStatus = 'requested' | 'required_followup' | 'complete';

  interface ContactUsMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
    id: string;
    createdAt: number;
    status: ContactUsMessageStatus;
  }
}
