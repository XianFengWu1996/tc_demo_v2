import React, { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMenuData, handleCategoryIdChange, handleMenuItemChange, toggleMenuItemDialog } from "../../store/slicer/menuSlicer";
import { isEmpty } from 'lodash'

import { Box, Dialog, DialogContent } from "@mui/material"
import { AppBarNav } from "../../modules/appbar/appbar";
import { MenuNavigation } from "../../modules/menu/menuNav/menuNavigation";
import { MenuContents } from "../../modules/menu/content/mainContent";



function MenuPage() {

    const retrieveMenu = async () => {
        try {
            let result = await axios({
                method: 'GET',
                url: 'http://localhost:5001/foodorder-43af7/us-east4/v2/store/menus'
            })
            dispatch(getMenuData(result.data))            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
       retrieveMenu();
    }, [])

    const { fullday, lunch } = useAppSelector((state) => state.menu)
    const dispatch = useAppDispatch();

    // handle the changing of the tabs, which essentially change of the menu
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      dispatch(handleCategoryIdChange({ id: ''})) // reset the category id when the menu changes        
    };

    return <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper'}}>
       <AppBarNav />
       <MenuNavigation value={value} handleChange={handleChange}/>

        { !isEmpty(fullday) &&  <MenuContents value={value} index={0} menu={fullday} />}

        { !isEmpty(lunch) && <MenuContents value={value} index={1} menu={lunch} />}     

        <MenuItemDialog />
    </Box>
}
  
  export default MenuPage


  export const MenuItemDialog = () => {
    const { menuItemDialog, selectedMenuItem } = useAppSelector(state => state.menu);
    const dispatch = useAppDispatch();

    return <Dialog 
            PaperProps={{
                sx: {
                    minHeight: '80vh',
                    minWidth: '40vw',
                    maxHeight: '100vh',
                    maxWidth: '80vw',
                }
            }}
            open={menuItemDialog}
            onClose={() => {
                dispatch(toggleMenuItemDialog(false))
                dispatch(handleMenuItemChange({} as IDish))
            }}
        >
        <DialogContent>
            {selectedMenuItem.en_name}
        
        </DialogContent>
    </Dialog>
  }



