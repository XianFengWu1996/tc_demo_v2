import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ChoiceTitle } from "./radioGroup";

interface ICheckboxGroup {
    choice: IChoice, 
    selectedChoices: ISelectedChoice[],
    handleChoice: (choice: IChoice, option: IOption[]) => void
}

export const CheckboxGroup = (props: ICheckboxGroup) => {
    const { choice, selectedChoices, handleChoice} = props;

    const [counter, setCounter] = useState<number>(0); // state for how much checkbox is checked

    const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);

    useEffect(() => {
        // find the selected choice and assign to the state
        let found_selected_choice = selectedChoices.find((ch) => {
            return ch.id === choice.id
        })

        if(found_selected_choice){
            setSelectedOptions(found_selected_choice.selectedOption)
        }
    }, [])

    const handleCheckboxOnChange = (checked: boolean, option: IOption) => {
        setCounter(checked ? counter + 1 :  counter - 1) // change the counter
        // remove or add to the select option
        if(checked){
            // adding 
            let temp = selectedOptions;

            temp.push(option)
        } else {
            // removing
            let found_index = selectedOptions.findIndex((opt) => {
                return opt.id === option.id
            })

            if(found_index !== -1){
                selectedOptions.splice(found_index, 1);
            }
        }

        // set the choice state in the dialog page
        handleChoice(choice, selectedOptions);
    }
    

    return <FormGroup>
         <FormLabel id="checkbox-group-label">
            <div style={{ display: 'flex'}}>
                <ChoiceTitle>{choice.en_choice} {choice.ch_choice}</ChoiceTitle>
                <Box sx={{ marginLeft: 3, color: '#fff', px: 1, borderRadius: '5px', height: '25px', backgroundColor: 'primary.light', fontSize: 10 }}>Optional</Box>
            </div>

            <Typography sx={{ fontSize: 10}}>(Choose up to {choice.max})</Typography>
        </FormLabel>

        {
            choice.options.map((option) => {
                return <CheckboxItem
                    key={option.id} 
                    option={option}
                    counter={counter}
                    max={choice.max}
                    onChange={(checked) => handleCheckboxOnChange(checked, option)}
                />
            })
        }
    </FormGroup>
}

interface ICheckboxItem {
    option: IOption,
    counter: number,
    max: number,
    onChange: (checked: boolean) => void
}

export const CheckboxItem = (props: ICheckboxItem) => {
    const {option, counter, max, onChange} = props;
    const [checked, setChecked] = useState<boolean>(false); // control the local state to toggle check status

    return <FormControlLabel
            key={option.id}
            control={
            <Checkbox
                disabled={!checked && counter >= max}
                checked={checked}
                onChange={(e, checked) => {
                    onChange(checked);
                    setChecked(checked);
                }} 
            />
        }
        label={`${option.en_option} ${option.ch_option} ${option.price > 0 ? `+$${option.price.toFixed(2)}` : '' }`} 
    />
}