import { Typography } from "@mui/material"
import { isEmpty } from "lodash"
import { GoFlame } from "react-icons/go"

export const DishDetails = ({dish}:{dish: IDish}) => {
    return <>
        <Typography sx={{ fontSize: 18, fontWeight: 500}}>{dish.label_id}.{dish.en_name} {dish.ch_name} {isEmpty(dish.variant) && dish.is_spicy && <GoFlame size={15} color={'red'}/>}</Typography>
        <Typography>${dish.price.toFixed(2)}</Typography>

        {
            !isEmpty(dish.description) && <Typography>Description: {dish.description}</Typography>
        }
    </>
}