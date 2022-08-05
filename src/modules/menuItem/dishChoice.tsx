import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { GoFlame } from "react-icons/go"

interface IDishChoice {
    dish: IDish,
    selectedChoices: ISelectedChoice[],
    handleChoice: (choice: IChoice, option: IOption[]) => void 
}

export const DishChoice = (props: IDishChoice) => {
    const { dish, selectedChoices, handleChoice } = props
    return <>
         {
            dish.choices.map((choice) => {
                return choice.required 
                    ? <RadioChoice key={choice.id} choice={choice} handleChoice={handleChoice}/> 
                    : <CheckboxGroup key={choice.id} choice={choice} selectedChoices={selectedChoices} handleChoice={handleChoice}/>
            })
        }
    </>
}

interface ICheckboxGroup {
    choice: IChoice, 
    selectedChoices: ISelectedChoice[],
    handleChoice: (choice: IChoice, option: IOption[]) => void
}

export const CheckboxGroup = (props: ICheckboxGroup) => {
    const { choice, selectedChoices, handleChoice} = props;
    const [counter, setCounter] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<IOption[]>();

    useEffect(() => {
        let found_selected_choice = props.selectedChoices.find((ch) => {
            return ch.id === choice.id
        })

        if(found_selected_choice){
            setSelectedOption(found_selected_choice.selectedOption)
        }
    }, [props, choice])
    

    return <FormGroup>
         <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 13}}>
            <Typography>{choice.en_choice} {choice.ch_choice}</Typography>
            <Typography sx={{ fontSize: 10}}>(Choose up to {choice.max})</Typography>
        </FormLabel>

        <Typography>{counter}</Typography>

        {
            choice.options.map((option) => {
                return <CheckboxItem 
                    key={option.id} 
                    option={option}
                    counter={counter}
                    onChange={(checked) => {
                        setCounter(checked ? counter + 1 :  counter - 1)
                    }}
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

export const RadioChoice = ({ choice, handleChoice } : {choice:IChoice, handleChoice: (choice: IChoice, option: IOption[]) => void }) => {
    return <FormControl sx={{ my: 1}} key={choice.id}>
        <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 13}}>
            {choice.en_choice} {choice.ch_choice}* 
        </FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => { 
                const selectedOption = choice.options.find((option) => {
                    return option.id === e.target.value
                })

               

                if(selectedOption){
                    let temp:IOption[] = [];
                    temp.push(selectedOption)
                    handleChoice(choice, temp)
                }
            }}
        >
            {
                choice.options.map((option) => {
                    return <FormControlLabel
                        key={option.id} 
                        value={option.id} 
                        control={<Radio required size="small"/>} 
                        label={<Typography sx={{ fontSize: 14}}>{option.en_option} {option.ch_option} {option.spicy && <GoFlame size={15} color={'red'}/> } +${option.price.toFixed(2)}</Typography>} 
                    />
                })
            }
    </RadioGroup>
</FormControl>
}