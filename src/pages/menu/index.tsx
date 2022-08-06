import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getMenuData, handleCategoryIdChange, handleMenuItemChange, toggleMenuItemDialog } from "../../store/slicer/menuSlicer";
import { cloneDeep, isEmpty } from 'lodash'

import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Paper, Typography } from "@mui/material"
import { AppBarNav } from "../../modules/appbar/appbar";
import { MenuNavigation } from "../../modules/menu/menuNav/menuNavigation";
import { MenuContents } from "../../modules/menu/content/mainContent";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { DishDetails } from "../../modules/menuItem/dishDetails";
import { DishComment } from "../../modules/menuItem/dishComment";
import { DishChoice } from "../../modules/menuItem/dishChoice";



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

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    const [choices, setChoices] = useState<ISelectedChoice[]>([]); // this will be the choices that was selected

    const handleChoice = (choice: IChoice, option: IOption[]) => {
        // check if the choice already exist
        let choice_index = choices.findIndex((val) => {
            return val.id === choice.id
        })
    
        if(choice_index !== -1){
            let choices_copy = cloneDeep(choices);

            if(isEmpty(option)){
                choices_copy.splice(choice_index, 1);
                setChoices(choices_copy)
            } else {
                choices_copy[choice_index].selectedOption = option;
                setChoices(choices_copy);
            }
        } else {
            // if the choice does not exist in the selected choice array
            // add a new choices into the array
            setChoices([...choices, {
                id: choice.id,
                en_choice: choice.en_choice, 
                ch_choice: choice.ch_choice,
                selectedOption: option,
            }])
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

        <IconButton sx={{ color: '#000', backgroundColor: 'background.default', position: 'absolute', top: 25, left: 25}}>
            <AiOutlineClose size={30}/>
        </IconButton> 

        <div style={{ marginTop: 50}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                {!isEmpty(dish.pic_url) && <Image 
                    src={dish.pic_url}
                    alt={`Picture of ${dish.en_name}`}
                    height={300}
                    width={350}
                />}
            </div>        

            {
                choices.map((choice) => {
                    return <div key={choice.id}>
                        <Typography>{choice.ch_choice}</Typography>
                        {
                            choice.selectedOption.map((option) => {
                                return <div key={option.id}>
                                    <Typography>{option.en_option}</Typography>
                                </div>
                            })
                        }
                    </div>
                })
            }

            <DishDetails dish={dish} />

            {
                !isEmpty(dish.choices) && <DishChoice dish={dish} selectedChoices={choices} handleChoice={handleChoice} />
            }

            <DishComment comment={comment} handleCommentChange={handleCommentChange}/>

        </div>
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



