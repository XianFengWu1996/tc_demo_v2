import { Button, ButtonGroup, Typography } from "@mui/material"
import { AiOutlineShopping } from "react-icons/ai"
import { MdOutlineDeliveryDining } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { changeDeliveryOption } from "../../store/slicer/cartSlicer"

export const DeliveryOption = () => {
    const dispatch = useAppDispatch();
    const { delivery_option } = useAppSelector(state => state.cart)
    return <ButtonGroup fullWidth size="large">
        <Button 
            onClick={() =>  dispatch(changeDeliveryOption('pickup'))}
            variant={delivery_option === 'pickup' ? 'contained' : 'outlined'}
        >
            <AiOutlineShopping size={22} />
            <Typography sx={{ ml: 0.7}}>Pick up</Typography>
        </Button>    
        <Button 
            onClick={() =>  dispatch(changeDeliveryOption('delivery'))}
            variant={delivery_option === 'delivery' ? 'contained' : 'outlined'}
        >
            <MdOutlineDeliveryDining size={22} />
            <Typography sx={{ ml: 0.7}}>Delivery</Typography>
        </Button>
    </ButtonGroup>
}