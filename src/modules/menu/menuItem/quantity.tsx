import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Dispatch, SetStateAction } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import { useAppDispatch } from "../../../store/hook"
import { decreaseQtyById, increaseQtyById } from "../../../store/slicer/cartSlicer"

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
    item: ICartItem,
}

export const DrawerQuantity = (props: IDrawQuantity) => {
    const { item } = props;
    const dispatch = useAppDispatch();
    return <>
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <IconButton 
                sx={{ color: 'text.primary', ":disabled": '#000'}}
                disabled={item.quantity <= 1} 
                onClick={() => { dispatch(decreaseQtyById({item}))}}>
                <IoRemoveCircleOutline />
            </IconButton>

            <Box sx={{ padding: '2px 15px', backgroundColor: '#D1CFCF'}}>
                <Typography sx={{ fontSize: 13}}>{item.quantity}</Typography>
            </Box> 
            
            <IconButton sx={{ marginLeft: '0 !important', color: 'text.primary'}} 
                onClick={() => { dispatch(increaseQtyById({item}))}}
            >
                <IoAddCircleOutline />
            </IconButton>

            <Typography sx={{ fontSize: 13, ml: 2, fontWeight:600}}>Total: ${item.total.toFixed(2)}</Typography>

        </div>


    </>
}