import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localTime } from '../../functions/time';

// Define a type for the slice state
interface StoreSlicerState extends StoreAxiosResult {
  today: RegularHour | undefined;
}

// Define the initial state using that type
const initialState: StoreSlicerState = {
  menus: [],
  dishes: [],
  today: undefined,
  hours: {
    regular_hour: [],
    special_hour: [],
  },
  messages: {
    payment: [],
    updates: [],
    promotions: [],
    maintenance: [],
  },
  status: {
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
    },
    phone: {
      primary: '',
      sub: '',
    },
    serverOn: false,
  },
};

export const storeSlicer = createSlice({
  name: 'store',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    retrieveStoreRelatedData: (
      state,
      { payload }: PayloadAction<StoreAxiosResult>
    ) => {
      const foundHour = payload.hours.regular_hour.find((hr) => {
        return hr.dayOfWeek === localTime().weekdayLong;
      });

      state.today = foundHour;
      state.menus = payload.menus;
      state.hours = payload.hours;
      state.messages = payload.messages;
      state.status = payload.status;
      state.dishes = payload.dishes;
    },
  },
});

export const { retrieveStoreRelatedData } = storeSlicer.actions;

export default storeSlicer.reducer;
