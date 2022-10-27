import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FaCheck } from 'react-icons/fa';
import { GoFlame } from 'react-icons/go';
import { CustomeDialogSubTitle } from '../styles';

interface ChoiceRadioGroupProps {
  choice: Choice;
  choices: SelectChoice[];
  setChoices: Dispatch<SetStateAction<SelectChoice[]>>;
  hidePrice?: boolean;
  calculateTotal: (arg1?: SelectChoice[]) => void;
}

export const ChoiceRadioGroup = (props: ChoiceRadioGroupProps) => {
  const [defaultOption, setDefaultOption] = useState<Option>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // find and create a new option array
    const foundOption = props.choice.options.find((option) => {
      return option.id === e.target.value;
    });

    if (!foundOption) return;

    const tempOption: Option[] = [];
    tempOption.push(foundOption);

    // set the choice
    const choiceIndex = props.choices.findIndex((choice) => {
      return choice.id === props.choice.id;
    });

    const tempChoices = props.choices;
    tempChoices[choiceIndex].selectOptions = tempOption;

    props.setChoices(tempChoices);
    props.calculateTotal();
  };

  useEffect(() => {
    const defOption = props.choice.options.find((option) => {
      return option.default === true;
    });
    if (defOption) {
      setDefaultOption(defOption);
    }
  }, [props.choice.options]);

  return defaultOption ? (
    <>
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <CustomeDialogSubTitle>
            {props.choice.en_name} {props.choice.ch_name}
          </CustomeDialogSubTitle>

          <Box
            sx={{
              marginLeft: 3,
              color: 'green',
              height: '25px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaCheck color="green" fontSize={11} />
            <Typography mx={1} fontSize={11} fontWeight={600}>
              Required*
            </Typography>
          </Box>
        </Box>

        <RadioGroup
          aria-labelledby="choices-radio-buttons-group"
          name="choices-radio-buttons-group"
          defaultValue={defaultOption.id}
          onChange={handleOnChange}
        >
          {props.choice.options.map((option) => {
            return (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {option.en_name} {option.ch_name}{' '}
                    {option.is_spicy && <GoFlame color="red" />}
                    {props.hidePrice ? '' : `$${option.price.toFixed(2)}`}
                  </Typography>
                }
              />
            );
          })}
        </RadioGroup>
      </Box>
    </>
  ) : (
    <></>
  );
};
