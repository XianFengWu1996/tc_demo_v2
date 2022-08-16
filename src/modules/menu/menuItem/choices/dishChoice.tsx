import { isEmpty } from "lodash"
import { CheckboxGroup } from "./checkboxGroup"
import { RadioChoiceGroup } from "./radioGroup"

interface IDishChoice {
    dish: IDish,
    selectedChoices: ISelectedChoice[],
    handleChoice: (choice: IChoice, option: IOption[]) => void 
}

export const DishChoice = (props: IDishChoice) => {
    const { dish, selectedChoices, handleChoice } = props

    return <>
         {
            !isEmpty(dish.choices) && dish.choices.map((choice) => {
                return choice.required 
                    ? <RadioChoiceGroup key={choice.id} choice={choice} handleChoice={handleChoice}/> 
                    : <CheckboxGroup key={choice.id} choice={choice} selectedChoices={selectedChoices} handleChoice={handleChoice}/>
            })
        }        
    </>
}

