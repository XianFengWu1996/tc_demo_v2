import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GoFlame } from 'react-icons/go';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../../store/hook';
import { addItemToCart } from '../../../store/slicer/cartSlicer';
import { CustomInput } from '../../input/checkoutInput';
import {
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomeDialogSubTitle,
} from '../styles';
import { ChoiceCheckboxGroup } from './choiceCheckboxGroup';
import { ChoiceRadioGroup } from './choiceRadioGroup';
import { Quantity } from './quantity';

interface MenuItemDialogProps extends Dialog {
  dish: Dish;
}

export const MenuItemDialog = (props: MenuItemDialogProps) => {
  const [choices, setChoices] = useState<SelectChoice[]>([]);
  const [comments, setComments] = useState<string>('');
  const [total, setTotal] = useState<number>(props.dish.price);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useAppDispatch();

  // spicy choices object
  const spicyChoice = useMemo(() => {
    return {
      id: '1798e749-570d-43de-b9db-823943070d2d',
      en_name: 'Choose spicy level',
      ch_name: '选择辣度',
      minimum: 1,
      maxiumum: 1,
      options: [
        {
          id: 'd7ea3391-f5d1-455a-ae40-adcdf88758e7',
          en_name: 'No spicy',
          ch_name: '免辣',
          price: 0,
          is_spicy: false,
          default: false,
        },
        {
          id: 'c2dab4df-71d0-47a4-a6db-39fae05dd9b1',
          en_name: 'Less spicy',
          ch_name: '微辣',
          price: 0,
          is_spicy: true,
          default: false,
        },
        {
          id: 'ecbd1b96-3d79-446e-9e71-20b680713802',
          en_name: 'Normal Spicy',
          ch_name: '正常辣',
          price: 0,
          is_spicy: true,
          default: true,
        },
        {
          id: '6c7d8fd2-7029-4f62-ac59-4d9f756b3f8d',
          en_name: 'Medium spicy',
          ch_name: '中辣',
          price: 0,
          is_spicy: true,
          default: false,
        },
        {
          id: '0f5a2f58-3ecf-42d1-8d60-ab4697d2d4e0',
          en_name: 'Extra spicy',
          ch_name: '大辣',
          price: 0,
          is_spicy: true,
          default: false,
        },
      ],
      type: 'required',
    } as Choice;
  }, []);

  // set the default choices for radio group
  const setDefaultChoice = useCallback((choices: Choice[]) => {
    choices.forEach((choice) => {
      // only for the required type, which will be radio
      if (choice.type === 'required') {
        // find the default option
        const defaultOption = choice.options.find((option) => {
          return option.default === true;
        });

        if (!defaultOption) return;

        // create a new array for the option
        const tempOption: Option[] = [];
        tempOption.push(defaultOption);

        // create a new select choice and push it into choices
        const tempChoice: SelectChoice = {
          ...choice,
          selectOptions: tempOption,
        };

        setChoices((prev) => [...prev, tempChoice]);
      }
    });
  }, []);

  useEffect(() => {
    // set the default choices
    setDefaultChoice(props.dish.choices);

    // check if the dish is spicy
    if (props.dish.is_spicy) {
      // set the default option for spicy choice
      setChoices((prev) => [
        ...prev,
        {
          ...spicyChoice,
          selectOptions: [
            {
              id: 'ecbd1b96-3d79-446e-9e71-20b680713802',
              en_name: 'Normal Spicy',
              ch_name: '正常辣',
              price: 0,
              is_spicy: true,
              default: true,
            },
          ],
        },
      ]);
    }

    return () => {
      setChoices([]);
      setComments('');
      setTotal(0);
      setQuantity(1);
    };
  }, [props.dish, setDefaultChoice, spicyChoice]);

  // set the default dish price when the dish is changed
  useEffect(() => {
    setTotal(props.dish.price);
  }, [props.dish]);

  useEffect(() => {
    calculateTotal();
  }, [quantity]);

  // calculate the total for the item
  const calculateTotal = (newChoices?: SelectChoice[]) => {
    const tempChoices = newChoices ?? choices;

    let tempTotal = 0;
    tempChoices.forEach((choice) => {
      choice.selectOptions.forEach((option) => {
        tempTotal += option.price;
      });
    });

    const newTotal = (tempTotal + props.dish.price) * quantity;
    setTotal(newTotal);
  };

  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent>
        {/* display dish image */}
        {!isEmpty(props.dish.pic_url) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src={props.dish.pic_url}
              alt={`Picture of ${props.dish.en_name}`}
              height={200}
              width={200}
            />
          </Box>
        )}

        {/* display dish name  */}
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          {props.dish.label_id}.{props.dish.en_name} {props.dish.ch_name}
          {props.dish.is_spicy && <GoFlame color="red" />}
        </Typography>

        {/* display dish price */}
        <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
          ${props.dish.price.toFixed(2)}
        </Typography>

        {/* Spicy radio choice group */}
        {props.dish.is_spicy && (
          <ChoiceRadioGroup
            choice={spicyChoice}
            choices={choices}
            setChoices={setChoices}
            calculateTotal={calculateTotal}
            hidePrice
          />
        )}

        {/* display all choices */}
        {props.dish.choices.map((choice) => {
          // for 'required' type, display radio choice group
          if (choice.type === 'required') {
            return (
              <ChoiceRadioGroup
                calculateTotal={calculateTotal}
                key={choice.id}
                choice={choice}
                choices={choices}
                setChoices={setChoices}
              />
            );
          }
          // for 'optional' type, display checkout choice group
          if (choice.type === 'optional') {
            return (
              <ChoiceCheckboxGroup
                calculateTotal={calculateTotal}
                key={choice.id}
                choice={choice}
                choices={choices}
                setChoices={setChoices}
              />
            );
          }
        })}

        {/* comment input with subtitle */}
        <CustomeDialogSubTitle>Comments</CustomeDialogSubTitle>
        <CustomInput
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          fullWidth
          minRows={3}
          multiline
          placeholder="Leave comment specific to the dish, such as spicy level, allergy, etc"
          inputProps={{
            sx: {
              '&::placeholder': {
                fontSize: 12,
              },
            },
          }}
        />
      </CustomDialogContent>

      <CustomDialogActions>
        <Quantity quantity={quantity} setQuantity={setQuantity} />

        <Button
          variant="contained"
          onClick={() => {
            let choiceTotal = 0;
            choices.forEach((choice) => {
              choice.selectOptions.forEach((option) => {
                choiceTotal += option.price;
              });
            });

            const item: CartItem = {
              id:
                choices.length > 0 || !isEmpty(comments) ? v4() : props.dish.id,
              details: props.dish,
              comments: comments,
              quantity: quantity,
              total: Number(
                ((props.dish.price + choiceTotal) * quantity).toFixed(2)
              ),
              price: Number((props.dish.price + choiceTotal).toFixed(2)),
              choices: choices,
            };
            dispatch(addItemToCart(item));

            props.handleClose();
          }}
        >
          Add to cart | ${total.toFixed(2)}
        </Button>
        <Button>cancel</Button>
      </CustomDialogActions>
    </CustomDialog>
  );
};
