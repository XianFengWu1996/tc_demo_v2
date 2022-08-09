import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

// Define a type for the slice state
interface ICartSlicer {
  
}

// Define the initial state using that type
const initialState: ICartSlicer = {

}

export const cartSlicer = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
 
  },
})

export default cartSlicer.reducer