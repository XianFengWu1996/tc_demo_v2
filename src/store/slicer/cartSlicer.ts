import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface ICartSlicer {
    cart: ICartItem[],
    cartSummary: {
        original_subtotal: number,
        subtotal: number,
        tax: number,
        tip: number,
        total: number,
        quantity: number,
        delivery_fee: number,
        discount: {
            redemption: number,
            lunch: number,
        }
    },
}

const calculateTotal = (state: ICartSlicer) => {

    // handle lunch count and discount
    // let lunchCount = 0;
    // let lunchDiscount = 0;
    // let point_redemption_discount = 0;
    
    let original_subtotal = 0;
    let cart_quantity = 0;
  
    state.cart.forEach((item) => {
    //   if(item.dish.is_lunch){
    //     lunchCount += item.quantity;
    //   }
      original_subtotal += item.total
      cart_quantity += item.quantity
    })
  
    // if(isEmpty(state.cart)){
    //   point_redemption_discount = 0;
    //   state.point_redemption = 0;
    // } else {
    //   point_redemption_discount = Number((state.point_redemption / 100).toFixed(2));
    // }
    
    // lunchDiscount = Math.floor(lunchCount / 3) * 2.9;
    original_subtotal = Number((original_subtotal).toFixed(2));

    // const subtotal = Number((original_subtotal - point_redemption_discount - (isLunchTime ? lunchDiscount : 0)).toFixed(2))
    const subtotal = Number((original_subtotal).toFixed(2))
    
  
    state.cartSummary.quantity = cart_quantity;
    state.cartSummary.original_subtotal = original_subtotal;
    state.cartSummary.subtotal = subtotal;
    state.cartSummary.tax = Number((subtotal * 0.07).toFixed(2))
    state.cartSummary.total = Number((subtotal + state.cartSummary.tax + state.cartSummary.tip + state.cartSummary.delivery_fee).toFixed(2))
    // state.lunch_discount = (isLunchTime ? lunchDiscount : 0)
    // state.payment_type = '' // reset the payment type
  
  }

// Define the initial state using that type
const initialState: ICartSlicer = {
    cart: [],
    cartSummary: {
        original_subtotal: 0,
        subtotal: 0,
        tax: 0,
        tip: 0,
        total: 0,
        quantity: 0,
        delivery_fee: 0,
        discount: {
            redemption: 0,
            lunch: 0,
        }
    }
}

export const cartSlicer = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, { payload } : PayloadAction<{ item: ICartItem }>) => {
        state.cart = [
            ...state.cart,
            payload.item
        ], 
        calculateTotal(state);
    },
    increaseQtyById: (state, { payload } : PayloadAction<{ item: ICartItem }>) => {
        const index = state.cart.findIndex((cartItem) => {
            return cartItem.itemDetails.id === payload.item.itemDetails.id
        })

        if(index !== -1){
            let temp = state.cart[index] 
            temp.quantity += 1
            temp.total += temp.itemDetails.price

            state.cart.splice(index, 1, temp);
        }

        calculateTotal(state);
    },
    decreaseQtyById: (state, { payload } : PayloadAction<{ item: ICartItem }>) => {
        const index = state.cart.findIndex((cartItem) => {
            return cartItem.itemDetails.id === payload.item.itemDetails.id
        })

        if(index !== -1){
            let temp = state.cart[index] 
            temp.quantity -= 1
            temp.total -= temp.itemDetails.price

            state.cart.splice(index, 1, temp);
        }

        calculateTotal(state);
    },
    removeById: (state, { payload } : PayloadAction<{ item: ICartItem }>) => {
        const index = state.cart.findIndex((cartItem) => {
            return cartItem.itemDetails.id === payload.item.itemDetails.id
        })
        state.cart.splice(index, 1);
        calculateTotal(state);
    },
  },
})

export const { addToCart, increaseQtyById, decreaseQtyById, removeById } = cartSlicer.actions


export default cartSlicer.reducer