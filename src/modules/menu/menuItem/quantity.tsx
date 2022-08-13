import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Dispatch, SetStateAction } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface IQuantity {
    quantity: number,
    setQuantity: Dispatch<SetStateAction<number>>
}

export const Quantity = (props: IQuantity) => {
    const { quantity, setQuantity } = props

    const handleIncreaseQty = () => {
        setQuantity(quantity + 1)
    }

    const handleDecreaseQty = () => {
        setQuantity(quantity - 1) 
    }

    return <>
         <IconButton disabled={quantity <= 1} onClick={handleDecreaseQty}>
            <IoRemoveCircleOutline />
        </IconButton>

        <Box sx={{ padding: '5px 30px', backgroundColor: '#D1CFCF'}}>
            <Typography>{quantity}</Typography>
        </Box>
        
        <IconButton sx={{ marginLeft: '0 !important'}} onClick={handleIncreaseQty}>
            <IoAddCircleOutline />
        </IconButton>
    </>
}

interface IDrawQuantity {
    quantity: number,
}

export const DrawerQuantity = (props: IDrawQuantity) => {
    const { quantity } = props;
    return <div style={{ display: 'flex', alignItems: 'center'}}>
         <IconButton disabled={quantity <= 1} onClick={() => {}}>
            <IoRemoveCircleOutline />
        </IconButton>

        <Box sx={{ padding: '2px 10px', backgroundColor: '#D1CFCF'}}>
            <Typography sx={{ fontSize: 13}}>{quantity}</Typography>
        </Box>
        
        <IconButton sx={{ marginLeft: '0 !important'}} onClick={() => {}}>
            <IoAddCircleOutline />
        </IconButton>
    </div>
}