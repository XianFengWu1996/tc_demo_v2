import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

// Define a type for the slice state
interface IMenuSlicer {
  fullday: IMenu,
  lunch: IMenu,
  listOfDishes: IDish[],
}

// Define the initial state using that type
const initialState: IMenuSlicer = {
  fullday: {} as IMenu,
  lunch: {} as IMenu,
  listOfDishes: [],
}

export const menuSlicer = createSlice({
  name: 'menu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getMenuData: (state, { payload } : PayloadAction<{ fullday: IMenu, lunch: IMenu, dishes: []}>) => {
        // assign the menus
        if(payload){
          state.fullday = payload.fullday;
          state.lunch = payload.lunch;
          state.listOfDishes = payload.dishes;
        }
      }, 
  },
})

export const { getMenuData } = menuSlicer.actions

// Other code such as selectors can use the imported `RootState` type
export const fullday = (state: RootState) => state.menu.fullday
export const lunch = (state: RootState) => state.menu.lunch

export default menuSlicer.reducer