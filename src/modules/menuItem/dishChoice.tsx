import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { ChangeEvent } from "react"
import { GoFlame } from "react-icons/go"

interface IDishChoice {
    dish: IDish,
    optionId: string,
    handleOptionIdChange: (e: ChangeEvent<HTMLInputElement>, choice: IChoice) => void
}

export const DishChoice = ({ dish, optionId, handleOptionIdChange } : IDishChoice) => {
    return <>
         {
            dish.choices.map((choice) => {
            return  <FormControl sx={{ my: 1}} key={choice.id}>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 13}}>
                        {choice.en_choice} {choice.ch_choice}* 
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={optionId}
                        onChange={(e) => handleOptionIdChange(e, choice)}
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
               
            })
        }
    </>
}