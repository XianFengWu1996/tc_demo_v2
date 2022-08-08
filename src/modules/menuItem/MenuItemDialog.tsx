import { Button, Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { handleMenuItemChange, toggleMenuItemDialog } from "../../store/slicer/menuSlicer";
import { DishChoice } from "./choices/dishChoice";
import { DialogImage } from "./dialogImage";
import { DishComment } from "./dishComment";
import { DishDetails } from "./dishDetails";
import { Quantity } from "./quantity";

export const MenuItemDialog = () => {
    const { menuItemDialog, selectedMenuItem: dish } = useAppSelector(state => state.menu);
    const dispatch = useAppDispatch();

    const [comment, setComment] = useState<string>('');
    const [choices, setChoices] = useState<ISelectedChoice[]>([]); // this will be the choices that was selected
    const [quantity, setQuantity] = useState<number>(1);


    const handleCommentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

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

    const handleOnDialogClose = () => {
        dispatch(toggleMenuItemDialog(false))
        dispatch(handleMenuItemChange(null))
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
        onClose={handleOnDialogClose}
    >
        <DialogContent sx={{ position: 'relative'}}>

            <IconButton sx={{ color: '#000', backgroundColor: 'background.default', position: 'absolute', top: 25, left: 25}}>
                <AiOutlineClose size={30}/>
            </IconButton> 

            <div style={{ marginTop: 50}}>
                <DialogImage dish={dish} />      

                <DishDetails dish={dish} />

                {
                    !isEmpty(dish.choices) && <DishChoice dish={dish} selectedChoices={choices} handleChoice={handleChoice} />
                }

                <DishComment comment={comment} handleCommentChange={handleCommentChange}/>

            </div>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.default', padding: '10px 30px', position: 'sticky'}}>
    
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <Button variant="contained">Add To Cart | ${(dish.price * quantity).toFixed(2)}</Button>
        </DialogActions>
    </Dialog>
  }