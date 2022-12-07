import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Checkout = {
  timeFrame: {
    type: 'asap',
    selected: null,
  },
  contact: {
    name: '',
    phone: '',
  },
  reward: {
    points: 0,
    transactions: [],
  },
  additional: {
    deliveryNotes: '',
    kitchenNotes: '',
    dropoffOption: 'leave_at_door',
    utensilOption: 'do not include',
  },
  address: {
    formattedAddress: null,
    details: null,
  },
  clientSecret: null,
  cards: [],
};

export const checkoutSlicer = createSlice({
  name: 'checkout',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setContactName: (state, { payload }: PayloadAction<string>) => {
      state.contact.name = payload;
    },

    setPhoneNumber: (state, { payload }: PayloadAction<string>) => {
      state.contact.phone = payload;
    },

    setAdditionalDeliveryOption: (
      state,
      { payload }: PayloadAction<Additional>
    ) => {
      state.additional.dropoffOption = payload.dropoffOption;
      state.additional.deliveryNotes = payload.deliveryNotes;
    },

    setKitchenOption: (state, { payload }: PayloadAction<KitchenOption>) => {
      state.additional.kitchenNotes = payload.kitchenNotes;
      state.additional.utensilOption = payload.utensilOption;
    },

    setTimeFrameType: (state, { payload }: PayloadAction<TimeFrame.Type>) => {
      state.timeFrame.type = payload;
    },

    resetTimeFrame: (state) => {
      state.timeFrame.type = 'asap';
      state.timeFrame.selected = null;
    },

    setTimeFrameSelect: (
      state,
      { payload }: PayloadAction<TimeFrame.SelectedTime>
    ) => {
      state.timeFrame.selected = payload;
    },

    setAddress: (state, { payload }: PayloadAction<Address.Details>) => {
      state.address.details = payload.details;
      state.address.formattedAddress = payload.formattedAddress;
    },

    setCheckout: (state, { payload }: PayloadAction<CheckoutResult>) => {
      (state.address = payload.user.address ?? {}),
        (state.contact.name = payload.user.name),
        (state.contact.phone = payload.user.phone),
        (state.reward = payload.user.reward);
      state.clientSecret = payload.clientSecret;
      state.cards = payload.cards;
    },

    setClientSecret: (state, { payload }: PayloadAction<string>) => {
      state.clientSecret = payload;
    },

    completeCheckout: (state) => {
      state.clientSecret = null;
      (state.timeFrame = {
        type: 'asap',
        selected: null,
      }),
        (state.additional = {
          deliveryNotes: '',
          kitchenNotes: '',
          dropoffOption: 'leave_at_door',
          utensilOption: 'do not include',
        });
    },
  },
});

export const {
  setContactName,
  setAdditionalDeliveryOption,
  setKitchenOption,
  setPhoneNumber,
  setTimeFrameType,
  setTimeFrameSelect,
  setAddress,
  setCheckout,
  resetTimeFrame,
  setClientSecret,
  completeCheckout,
} = checkoutSlicer.actions;

export default checkoutSlicer.reducer;
