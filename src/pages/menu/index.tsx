import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMenuData, handleCategoryIdChange, handleMenuItemChange, toggleMenuItemDialog } from "../../store/slicer/menuSlicer";
import { isEmpty } from 'lodash'

import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Paper, Typography } from "@mui/material"
import { AppBarNav } from "../../modules/appbar/appbar";
import { MenuNavigation } from "../../modules/menu/menuNav/menuNavigation";
import { MenuContents } from "../../modules/menu/content/mainContent";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { DishDetails } from "../../modules/menuItem/dishDetails";
import { DishComment } from "../../modules/menuItem/dishComment";
import { DishVariant } from "../../modules/menuItem/dishVariant";



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
    const { menuItemDialog, selectedMenuItem: dish } = useAppSelector(state => state.menu);
    const dispatch = useAppDispatch();

    const [comment, setComment] = useState<string>('');

    // option related
    const [optionId, setOptionId] = useState<string>('')
    const [option, setOption] = useState<IVariantOption | null>(null)


    const handleCommentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    const handleOptionIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOptionId(e.target.value);

        if(dish){
            let found_variant = dish.variant.map((variant) => {
                return variant.options.find((option) => {
                    return option.id === e.target.value
                })
            })
            
            if(found_variant[0]){
                setOption(found_variant[0]);
            }

        }
    }

    return dish && <Dialog 
    keepMounted={false}
    PaperProps={{
        sx: {
            height: '95vh',
            minWidth: '800px',
            borderRadius: 5
        }
    }}
    open={menuItemDialog}
    fullWidth
    onClose={() => {
        dispatch(toggleMenuItemDialog(false))
        dispatch(handleMenuItemChange(null))
    }}
>
<DialogContent sx={{ position: 'relative'}}>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            {!isEmpty(dish.pic_url) && <Image 
                src={dish.pic_url}
                alt={`Picture of ${dish.en_name}`}
                height={300}
                width={350}
            />}
        </div>

        <IconButton sx={{ color: '#000', backgroundColor: 'background.default', position: 'absolute', top: 25, left: 25}}>
            <AiOutlineClose size={30}/>
        </IconButton> 

        <DishDetails dish={dish} />

        <DishVariant dish={dish} optionId={optionId} handleOptionIdChange={handleOptionIdChange} />
        <DishComment comment={comment} handleCommentChange={handleCommentChange}/>

    </DialogContent>
    <DialogActions sx={{ backgroundColor: 'background.default', padding: '10px 30px', position: 'sticky'}}>
 
        <IconButton>
            <IoRemoveCircleOutline />
        </IconButton>

        <Box sx={{ padding: '5px 30px', backgroundColor: '#D1CFCF'}}>
            <Typography>5</Typography>
        </Box>
        
        <IconButton sx={{ marginLeft: '0 !important'}}>
            <IoAddCircleOutline />
        </IconButton>
        <Button variant="contained">Add To Cart | $32.50</Button>
    </DialogActions>
    </Dialog>
  }



