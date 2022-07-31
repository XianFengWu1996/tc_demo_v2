import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { GoFlame } from "react-icons/go"

interface IDishChoice {
    dish: IDish,
    handleChoice: (choice: IChoice, option: IOption[]) => void 
}

export const DishChoice = ({ dish, handleChoice } : IDishChoice) => {
    return <>
         {
            dish.choices.map((choice) => {
                return <RadioChoice key={choice.id} choice={choice} handleChoice={handleChoice}/>
            })
        }
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