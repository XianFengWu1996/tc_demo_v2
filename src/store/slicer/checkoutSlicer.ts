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
    delivery_notes: '',
    kitchen_notes: '',
    dropoff_option: 'leave_at_door',
    utensil_option: 'do not include',
  },
  address: {
    formatted_address: null,
    details: null,
  },
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
      state.additional.dropoff_option = payload.dropoff_option;
      state.additional.delivery_notes = payload.delivery_notes;
    },

    setKitchenOption: (state, { payload }: PayloadAction<KitchenOption>) => {
      state.additional.kitchen_notes = payload.kitchen_notes;
      state.additional.utensil_option = payload.utensil_option;
    },

    setTimeFrameType: (state, { payload }: PayloadAction<TimeFrameType>) => {
      state.timeFrame.type = payload;
    },

    resetTimeFrame: (state) => {
      state.timeFrame.type = 'asap';
      state.timeFrame.selected = null;
    },

    setTimeFrameSelect: (state, { payload }: PayloadAction<ScheduleTime>) => {
      state.timeFrame.selected = payload;
    },

    setAddress: (state, { payload }: PayloadAction<Address>) => {
      (state.address.details = payload.details),
        (state.address.formatted_address = payload.formatted_address);
    },

    setCheckout: (state, { payload }: PayloadAction<UserResult>) => {
      (state.address = payload.address),
        (state.contact.name = payload.name),
        (state.contact.phone = payload.phone),
        (state.reward = payload.reward);
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
} = checkoutSlicer.actions;

export default checkoutSlicer.reducer;
