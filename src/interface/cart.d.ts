type DeliveryOptionType = 'delivery' | 'pickup';

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
  cartId: string;
  cart: CartItem[];
  summary: CartSummary;
  deliveryOption: DeliveryOptionType;
}

interface CartSummary {
  originalSubtotal: number;
  subtotal: number;
  tax: number;
  tip: number;
  tipType: TipType;
  total: number;
  cartQuantity: number;
  deliveryFee: number;
  discount: {
    redemption: number;
    lunch: number;
  };
}
