import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { cloneDeep, isEmpty } from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { addToCart } from '../../../store/slicer/cartSlicer';
import {
  handleMenuItemChange,
  toggleMenuItemDialog,
} from '../../../store/slicer/menuSlicer';
import { DishChoice } from './choices/dishChoice';
import { DialogImage } from './dialogImage';
import { DishComment } from './dishComment';
import { DishDetails } from './dishDetails';
import { Quantity } from './quantity';

export const MenuItemDialog = () => {
  const { menuItemDialog, selectedMenuItem: dish } = useAppSelector(
    (state) => state.menu
  );
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState<string>('');
  const [choices, setChoices] = useState<ISelectedChoice[]>([]); // this will be the choices that was selected
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let option_total = 0;
    if (dish) {
      choices.forEach((selected) => {
        selected.selectedOption.forEach((opt) => {
          option_total += opt.price;
        });
      });

      const temp_total = Number(
        ((dish.price + option_total) * quantity).toFixed(2)
      );
      setTotal(temp_total);
    }
  }, [dish, choices, quantity]);

  const [reqError, setReqError] = useState<boolean>(false);

  const handleCommentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const handleChoice = (choice: IChoice, option: IOption[]) => {
    // check if the choice already exist
    const choice_index = choices.findIndex((val) => {
      return val.id === choice.id;
    });

    if (choice_index !== -1) {
      const choices_copy = cloneDeep(choices);

      if (isEmpty(option)) {
        choices_copy.splice(choice_index, 1);
        setChoices(choices_copy);
      } else {
        choices_copy[choice_index].selectedOption = option;
        setChoices(choices_copy);
      }
    } else {
      // if the choice does not exist in the selected choice array
      // add a new choices into the array
      setChoices([
        ...choices,
        {
          id: choice.id,
          en_choice: choice.en_choice,
          ch_choice: choice.ch_choice,
          selectedOption: option,
          required: choice.required,
        },
      ]);
    }
  };

  const handleOnDialogClose = () => {
    setComment('');
    setQuantity(1);
    setReqError(false);
    setChoices([]);
    dispatch(toggleMenuItemDialog(false));
    dispatch(handleMenuItemChange(null));
  };

  const handleAddToCart = () => {
    setReqError(false);
    if (dish) {
      // check for missing radio choices
      // check if the required choice is selected
      const all_required_radio: string[] = [];
      const selected_required_radio: string[] = [];

      if (dish.choices) {
        dish.choices.forEach((choice) => {
          if (choice.required) {
            all_required_radio.push(choice.id);
          }
        });
        choices.forEach((selected) => {
          if (selected.required) {
            selected_required_radio.push(selected.id);
          }
        });

        if (all_required_radio.length !== selected_required_radio.length) {
          return setReqError(true);
        }
      }

      // create a cart item object
      dispatch(
        addToCart({
          item: {
            itemDetails: dish,
            comments: comment,
            quantity: quantity,
            price: Number((total / quantity).toFixed(0)),
            total: total,
            selectedChoices: choices ?? null,
          },
        })
      );

      // close the dialog
      handleOnDialogClose();
    }
  };

  return (
    dish && (
      <Dialog
        keepMounted={false}
        PaperProps={{
          sx: {
            height: '95vh',
            minWidth: '800px',
            borderRadius: 5,
          },
        }}
        open={menuItemDialog}
        fullWidth
        onClose={handleOnDialogClose}
      >
        <DialogContent sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleOnDialogClose}
            sx={{
              color: '#000',
              backgroundColor: 'background.default',
              position: 'absolute',
              top: 25,
              left: 25,
            }}
          >
            <AiOutlineClose size={30} />
          </IconButton>

          <div style={{ marginTop: 50 }}>
            <DialogImage dish={dish} />

            <DishDetails dish={dish} />

            {reqError && (
              <Typography sx={{ color: 'red', fontSize: 13 }}>
                Please select all required choices
              </Typography>
            )}

            <DishChoice
              dish={dish}
              selectedChoices={choices}
              handleChoice={handleChoice}
            />

            <DishComment
              comment={comment}
              handleCommentChange={handleCommentChange}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: 'background.default',
            padding: '10px 30px',
            position: 'sticky',
          }}
        >
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <Button variant="contained" onClick={handleAddToCart}>
            Add To Cart | ${total.toFixed(2)}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};
