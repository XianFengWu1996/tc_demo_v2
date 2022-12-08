import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNumber } from 'lodash';
import { v4 } from 'uuid';
import { getCurrentTime } from '../../functions/time';

const initialState: Cart = {
  cartId: v4(),
  cart: [],
  summary: {
    originalSubtotal: 0,
    subtotal: 0,
    tax: 0,
    tip: 0,
    tipType: '',
    total: 0,
    cartQuantity: 0,
    deliveryFee: 0,
    discount: {
      redemption: 0,
      lunch: 0,
    },
  },
  deliveryOption: 'delivery',
};

const calculateTotal = (state: Cart) => {
  let quantityCounter = 0;
  let subtotalCounter = 0;
  let lunchCounter = 0;

  state.cart.forEach((state) => {
    quantityCounter += state.quantity;
    subtotalCounter += state.total;

    if (state.details.is_lunch) {
      lunchCounter += state.quantity;
    }
  });

  state.summary.discount.lunch =
    process.env.NEXT_PUBLIC_LUNCH_END < getCurrentTime()
      ? 0
      : Number((Math.floor(lunchCounter / 3) * 2.95).toFixed(2));

  state.summary.originalSubtotal = Number(subtotalCounter.toFixed(2));
  state.summary.cartQuantity = quantityCounter;
  state.summary.subtotal = Number(
    (
      state.summary.originalSubtotal -
      state.summary.discount.lunch -
      state.summary.discount.redemption
    ).toFixed(2)
  );
  state.summary.tax = Number((state.summary.subtotal * 0.07).toFixed(2));
  state.summary.total = Number(
    (
      state.summary.subtotal +
      (state.deliveryOption === 'delivery' ? state.summary.deliveryFee : 0) +
      state.summary.tax +
      state.summary.tip
    ).toFixed(2)
  );
};

export const cartSlicer = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addItemToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const index = state.cart.findIndex((item) => {
        return item.id === payload.id;
      });

      // if not found
      if (index === -1) {
        state.cart = [...state.cart, payload];
      } else {
        // if found, update the quantity and total
        state.cart[index].quantity += payload.quantity;
        state.cart[index].total += payload.total;
      }
      calculateTotal(state);
    },
    clearCart: (state) => {
      state.cart = [];
      calculateTotal(state);
    },
    increaseQtyByOneById: (state, { payload }: PayloadAction<string>) => {
      const cartItemIndex = state.cart.findIndex((item) => {
        return item.id === payload;
      });

      if (cartItemIndex !== -1) {
        const item = state.cart[cartItemIndex];
        item.quantity += 1;
        item.total = Number((item.price * item.quantity).toFixed(2));
        calculateTotal(state);
      }
    },

    decreaseQtyByOneById: (state, { payload }: PayloadAction<string>) => {
      const cartItemIndex = state.cart.findIndex((item) => {
        return item.id === payload;
      });

      if (cartItemIndex !== -1) {
        if (state.cart[cartItemIndex].quantity > 0) {
          const item = state.cart[cartItemIndex];
          item.quantity -= 1;
          item.total = Number((item.price * item.quantity).toFixed(2));

          calculateTotal(state);
        }
      }
    },

    removeCartItemById: (state, { payload }: PayloadAction<string>) => {
      const cartItemIndex = state.cart.findIndex((item) => {
        return item.id === payload;
      });

      if (cartItemIndex !== -1) {
        state.cart.splice(cartItemIndex, 1);
        calculateTotal(state);
      }
    },
    updateDeliveryFee: (
      state,
      { payload }: PayloadAction<number | undefined | null>
    ) => {
      if (payload) {
        state.summary.deliveryFee = payload;
        calculateTotal(state);
      }
    },

    addDiscount: (state, { payload }: PayloadAction<number>) => {
      state.summary.discount.redemption = payload / 100;
      calculateTotal(state);
    },

    setDeliveryOption: (
      state,
      { payload }: PayloadAction<DeliveryOptionType>
    ) => {
      state.deliveryOption = payload;
      calculateTotal(state);
    },

    updateTip: (state, { payload }: PayloadAction<TipType>) => {
      switch (payload) {
        case '10%':
          state.summary.tip = Number(
            (state.summary.originalSubtotal * 0.1).toFixed(2)
          );
          break;
        case '15%':
          state.summary.tip = Number(
            (state.summary.originalSubtotal * 0.15).toFixed(2)
          );
          break;
        case '18%':
          state.summary.tip = Number(
            (state.summary.originalSubtotal * 0.18).toFixed(2)
          );
          break;
        case '20%':
          state.summary.tip = Number(
            (state.summary.originalSubtotal * 0.2).toFixed(2)
          );
          break;
        default:
          state.summary.tip = 0;
          state.summary.tipType = '';
          break;
      }
      state.summary.tipType = payload;
      calculateTotal(state);
    },
    updateCustomTip: (state, { payload }: PayloadAction<string>) => {
      if (isNumber(Number(payload))) {
        state.summary.tip = Number(payload);
      }
      calculateTotal(state);
    },
    removeLunchDiscount: (state) => {
      state.summary.discount.lunch = 0;
      calculateTotal(state);
    },
    completeCartCheckout: (state) => {
      (state.cart = []),
        (state.deliveryOption = 'delivery'),
        (state.summary.discount.redemption = 0);
      state.summary.discount.lunch = 0;
      state.summary.tip = 0;
      state.summary.tipType = '';
      state.cartId = v4();
      calculateTotal(state);
    },
  },
});

export const {
  addItemToCart,
  clearCart,
  increaseQtyByOneById,
  decreaseQtyByOneById,
  removeCartItemById,
  updateDeliveryFee,
  addDiscount,
  setDeliveryOption,
  completeCartCheckout,
  updateTip,
  updateCustomTip,
  removeLunchDiscount,
} = cartSlicer.actions;

export default cartSlicer.reducer;
