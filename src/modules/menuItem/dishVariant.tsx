import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { ChangeEvent } from "react"
import { GoFlame } from "react-icons/go"

interface IDishVariant {
    dish: IDish,
    optionId: string,
    handleOptionIdChange: (e: ChangeEvent<HTMLInputElement>) => {}
}

export const DishVariant = ({ dish, optionId, handleOptionIdChange } : IDishVariant) => {
    return <>
         {
            dish.variant.map((variant) => {
            return  <FormControl sx={{ my: 1}} key={variant.id}>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: 13}}>
                        {variant.en_name} {variant.ch_name}*
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={optionId}
                        onChange={handleOptionIdChange}
                    >
                         {
                            variant.options.map((option) => {
                                return <FormControlLabel
                                    key={option.id} 
                                    value={option.id} 
                                    control={<Radio required size="small"/>} 
                                    label={<Typography sx={{ fontSize: 14}}>{option.en_name} {option.ch_name} {option.spicy && <GoFlame size={15} color={'red'}/> } +${option.price.toFixed(2)}</Typography>} 
                                />
                            })
                        }
                    </RadioGroup>
                </FormControl>
               
            })
        }
    </>
}