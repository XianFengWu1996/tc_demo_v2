import { Checkbox, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface ICheckboxGroup {
    choice: IChoice, 
    selectedChoices: ISelectedChoice[],
    handleChoice: (choice: IChoice, option: IOption[]) => void
}

export const CheckboxGroup = (props: ICheckboxGroup) => {
    const { choice, selectedChoices, handleChoice} = props;

    const [counter, setCounter] = useState<number>(0); // state for how much checkbox is checked

    const [selectedOption, setSelectedOption] = useState<IOption[]>([]);

    useEffect(() => {
        // find the selected choice and assign to the state
        let found_selected_choice = selectedChoices.find((ch) => {
            return ch.id === choice.id
        })

        if(found_selected_choice){
            setSelectedOption(found_selected_choice.selectedOption)
        }
    }, [])

    const handleCheckboxOnChange = (checked: boolean, option: IOption) => {
        setCounter(checked ? counter + 1 :  counter - 1) // change the counter
        // remove or add to the select option
        if(checked){
            // adding 
            let temp = selectedOption;

            temp.push(option)
        } else {
            // removing
            let found_index = selectedOption.findIndex((opt) => {
                return opt.id === option.id
            })

            if(found_index !== -1){
                selectedOption.splice(found_index, 1);
            }
        }

        // set the choice state in the dialog page
        handleChoice(choice, selectedOption);
    }
    

    return <FormGroup>
         <FormLabel id="checkbox-group-label" sx={{ fontSize: 13}}>
            <Typography>{choice.en_choice} {choice.ch_choice}</Typography>
            <Typography sx={{ fontSize: 10}}>(Choose up to {choice.max})</Typography>
        </FormLabel>

        {
            choice.options.map((option) => {
                return <CheckboxItem
                    key={option.id} 
                    option={option}
                    counter={counter}
                    onChange={(checked) => handleCheckboxOnChange(checked, option)}
                />
            })
        }
    </FormGroup>
}

interface ICheckboxItem {
    option: IOption,
    counter: number,
    onChange: (checked: boolean) => void
}

export const CheckboxItem = (props: ICheckboxItem) => {
    const {option, counter, onChange} = props;
    const [checked, setChecked] = useState<boolean>(false); // control the local state to toggle check status

    return <>
        <FormControlLabel
            control={
            <Checkbox
                disabled={!checked && counter >= 2}
                checked={checked}
                onChange={(e, checked) => {
                    onChange(checked);
                    setChecked(checked);
                }} 
            />
        }
        label={`${option.en_option} ${option.ch_option} +$${option.price.toFixed(2)}`} 
        />
    </> 
}