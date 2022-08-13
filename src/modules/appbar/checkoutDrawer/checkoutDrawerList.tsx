import { List } from "@mui/material";
import { useAppSelector } from "../../../store/hook";
// import { useAppSelector } from "../../../store/store";
import { CartDrawerItem } from "./checkoutDrawerItem";

export const CartDrawerList = () => {
    const cartState = useAppSelector(state => state.cart);
    return <List sx={{ pb: 10,backgroundColor: 'background.default'}}>
        {
            cartState.cart.map((item) => {
                return <CartDrawerItem key={item.itemDetails.id} item={item} />
            })
        }
    </List>
}