import { Box, Typography } from "@mui/material"
import { useAppSelector } from "../../../store/hook"
import { CartItem } from "./cartItem"
import { CartSummary } from "./summary"

export const CartDisplay = () => {
    const { cart } = useAppSelector(state => state.cart)

    return <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: 'calc(100vh - 64px)', borderLeft: '1.5px solid #000'}}>
    <div style={{ overflow: 'scroll', height: 'inherit', padding: '10px'}}>
        <Typography sx={{ fontSize: 21, fontWeight: 700}}>Cart</Typography>
        
        {
            cart.map((item) => {
                return <CartItem key={item.itemDetails.id} item={item} />
            })
        }
    </div>

    <CartSummary />
</Box>
}