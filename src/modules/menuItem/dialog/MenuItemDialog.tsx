import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { handleMenuItemChange, toggleMenuItemDialog } from "../../../store/slicer/menuSlicer";
import { DishChoice } from "../choices/dishChoice";
import { DishComment } from "./dishComment";
import { DishDetails } from "./dishDetails";

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