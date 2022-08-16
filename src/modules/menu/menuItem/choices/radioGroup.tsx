import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled, Typography } from "@mui/material";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GoFlame } from "react-icons/go";

interface IRadioChoiceGroup {
    choice: IChoice,
    handleChoice: (choice: IChoice, option: IOption[]) => void,
}

export const ChoiceTitle = styled('div')(() => ({
    fontSize: 13
}))

export const RadioChoiceGroup = ({ choice, handleChoice } : IRadioChoiceGroup) => {


    const [selected, setSelected] = useState<boolean>(false)
    return <FormControl sx={{ my: 1}}>
        <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex'}}>
            <ChoiceTitle>{choice.en_choice} {choice.ch_choice}</ChoiceTitle>
            {
                selected ? 
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20}}>
                    <FaCheck style={{ color: 'green', marginRight: 5, fontSize: 13}}/>
                    <Typography sx={{color: 'green', fontSize: 13 }}>Selected</Typography>
                </div>
                :<Box sx={{ marginLeft: 3, color: '#fff', px: 1, borderRadius: '5px', height: '25px', backgroundColor: 'red', fontSize: 10 }}>Required*</Box>
            }
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

                setSelected(true);
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