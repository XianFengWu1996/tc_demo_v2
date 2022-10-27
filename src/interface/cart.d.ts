type DeliveryOption = 'delivery' | 'pickup';

interface ICartItem {
  itemDetails: IDish;
  comments: string;
  quantity: number;
  price: number;
  total: number;
  selectedChoices: ISelectedChoice[];
}

interface CartItem {
  id: string;
  details: Dish;
  comments: string;
  quantity: number;
  price: number;
  total: number;
  choices: SelectChoice[];
}

interface Cart {
  cart: CartItem[];
  summary: CartSummary;
  delivery_option: DeliveryOption;
}

interface CartSummary {
  original_subtotal: number;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  cart_quantity: number;
  delivery_fee: number;
  discount: {
    redemption: number;
    lunch: number;
  };
}
