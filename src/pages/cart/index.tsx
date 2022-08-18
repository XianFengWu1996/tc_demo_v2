import React, { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMenuData, handleCategoryIdChange } from "../../store/slicer/menuSlicer";
import { isEmpty } from 'lodash'

import { Box, Typography } from "@mui/material"
import { AppBarNav } from "../../modules/appbar/appbar";
import { MainMenuSelect } from "../../modules/menu/mainMenu";
import { MenuContents } from "../../modules/menu";
import { MenuItemDialog } from "../../modules/menu/menuItem/MenuItemDialog";
import { CartDrawerItem } from "../../modules/appbar/checkoutDrawer/checkoutDrawerList";



function CartPage() {

    return <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper'}}>
       <AppBarNav />

       <Typography>Cart</Typography>




      
    </Box>
}
  
export default CartPage


const CartList = () => {
    const cart = useAppSelector(state => state.cart);

    return <>
        {
            cart.cart.map((item) => {
                return <CartDrawerItem key={item.itemDetails.id} item={item}/>
            })
        }
    </>
}




