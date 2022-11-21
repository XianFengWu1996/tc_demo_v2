import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNumber } from 'lodash';
import { v4 } from 'uuid';

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

  state.cart.forEach((state) => {
    quantityCounter += state.quantity;
    subtotalCounter += state.total;
  });

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
      state.cart = [...state.cart, payload];
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

    completeCartCheckout: (state) => {
      (state.cart = []),
        (state.deliveryOption = 'delivery'),
        (state.summary.discount.redemption = 0);
      state.summary.discount.lunch = 0;
      state.summary.tip = 0;
      state.summary.tipType = '';
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
} = cartSlicer.actions;

export default cartSlicer.reducer;

// const calculateTotal = (state: ICartSlicer) => {
//   // handle lunch count and discount
//   // let lunchCount = 0;
//   // let lunchDiscount = 0;
//   // let point_redemption_discount = 0;

//   let original_subtotal = 0;
//   let cart_quantity = 0;

//   state.cart.forEach((item) => {
//     //   if(item.dish.is_lunch){
//     //     lunchCount += item.quantity;
//     //   }
//     original_subtotal += item.total;
//     cart_quantity += item.quantity;
//   });

//   // if(isEmpty(state.cart)){
//   //   point_redemption_discount = 0;
//   //   state.point_redemption = 0;
//   // } else {
//   //   point_redemption_discount = Number((state.point_redemption / 100).toFixed(2));
//   // }

//   // lunchDiscount = Math.floor(lunchCount / 3) * 2.9;
//   original_subtotal = Number(original_subtotal.toFixed(2));

//   // const subtotal = Number((original_subtotal - point_redemption_discount - (isLunchTime ? lunchDiscount : 0)).toFixed(2))
//   const subtotal = Number(original_subtotal.toFixed(2));

//   state.cartSummary.quantity = cart_quantity;
//   state.cartSummary.original_subtotal = original_subtotal;
//   state.cartSummary.subtotal = subtotal;
//   state.cartSummary.tax = Number((subtotal * 0.07).toFixed(2));
//   state.cartSummary.total = Number(
//     (
//       subtotal +
//       state.cartSummary.tax +
//       state.cartSummary.tip +
//       state.cartSummary.deliveryFee
//     ).toFixed(2)
//   );
//   // state.lunch_discount = (isLunchTime ? lunchDiscount : 0)
//   // state.payment_type = '' // reset the payment type
// };
