import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { cloneDeep } from 'lodash';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { GoFlame } from 'react-icons/go';
import { CustomeDialogSubTitle } from '../styles';

interface ChoiceCheckboxGroupProps {
  choice: Choice;
  choices: SelectChoice[];
  setChoices: Dispatch<SetStateAction<SelectChoice[]>>;
  calculateTotal: (arg1: SelectChoice[]) => void;
}

export const ChoiceCheckboxGroup = (props: ChoiceCheckboxGroupProps) => {
  const [counter, setCounter] = useState<number>(0);

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: Option
  ) => {
    const choices = cloneDeep(props.choices);

    const choiceIndex = choices.findIndex((choice) => {
      return choice.id === props.choice.id;
    });

    if (e.target.checked) {
      setCounter((prev) => prev + 1);

      // no choice was found
      if (choiceIndex === -1) {
        const tempOptions: Option[] = [];
        tempOptions.push(option);

        const tempChoice: SelectChoice = {
          ...props.choice,
          selectOptions: tempOptions,
        };

        choices.push(tempChoice);

        props.setChoices(choices);

        props.calculateTotal(choices);
      } else {
        const tempOptions: Option[] = choices[choiceIndex].selectOptions;

        tempOptions.push(option);

        choices[choiceIndex].selectOptions = tempOptions;

        props.setChoices(choices);
        props.calculateTotal(choices);
      }
    } else {
      setCounter((prev) => prev - 1);

      const newArr = choices[choiceIndex].selectOptions.filter((opt) => {
        return option.id !== opt.id;
      });

      if (newArr.length > 0) {
        choices[choiceIndex].selectOptions = newArr;
      } else {
        choices.splice(choiceIndex, 1);
      }

      props.setChoices(choices);
      props.calculateTotal(choices);
    }
  };

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <CustomeDialogSubTitle>
            {props.choice.en_name} {props.choice.ch_name}
          </CustomeDialogSubTitle>

          <Box
            sx={{
              marginLeft: 3,
              color: '#fff',
              px: 1,
              borderRadius: '5px',
              height: '25px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Optional
          </Box>
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
          (Choose up to {props.choice.maxiumum})
        </Typography>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            {props.choice.options.map((option) => {
              return (
                <ChoiceCheckbox
                  key={option.id}
                  option={option}
                  counter={counter}
                  maximum={props.choice.maxiumum}
                  onChange={handleCheckboxChange}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Box>
    </>
  );
};

interface ChoiceCheckboxProps {
  option: Option;
  counter: number;
  maximum: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, option: Option) => void;
}

export const ChoiceCheckbox = (props: ChoiceCheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={checked}
            disabled={!checked && props.counter >= props.maximum}
            onChange={(e) => {
              setChecked(e.target.checked);
              props.onChange(e, props.option);
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {props.option.en_name} {props.option.ch_name}
            {props.option.is_spicy && <GoFlame color="red" />} $
            {props.option.price.toFixed(2)}
          </Typography>
        }
      />
    </>
  );
};
