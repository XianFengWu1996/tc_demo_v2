import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface IMenuSlicer {
  fullday: IMenu,
  lunch: IMenu,
  listOfDishes: IDish[],
  
  selectedCategory: string,
  selectedMenuItem: IDish | null,
  menuItemDialog: boolean,
}

// Define the initial state using that type
const initialState: IMenuSlicer = {
  fullday: {} as IMenu,
  lunch: {} as IMenu,
  listOfDishes: [],
  selectedMenuItem: null,
  menuItemDialog: false,

  selectedCategory: '',
}

export const menuSlicer = createSlice({
  name: 'menu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getMenuData: (state, { payload } : PayloadAction<{ fullday: IMenu, lunch: IMenu, dishes: []}>) => {
      if(payload){
        state.fullday = payload.fullday;
        state.lunch = payload.lunch;
        state.listOfDishes = payload.dishes;
      }
    }, 
    handleCategoryIdChange: (state, { payload } : PayloadAction<{ id: string }>) => {
      state.selectedCategory = payload.id;
    },
    handleMenuItemChange: (state, { payload } : PayloadAction<IDish | null>) => {
      state.selectedMenuItem = payload;
    },
    toggleMenuItemDialog: (state, { payload } : PayloadAction<boolean>) => {
      state.menuItemDialog = payload;
    }
  },
})

export const { getMenuData, handleCategoryIdChange, handleMenuItemChange, toggleMenuItemDialog} = menuSlicer.actions

export default menuSlicer.reducer