import { Button } from "@mui/material";

import { useAppSelector } from "../../../store/hook";
// import { PulseLoader } from "react-spinners";
// import { clearCart } from "../../../store/slice/cartSlice";
// import { useAppDispatch, useAppSelector } from "../../../store/store";

export const CartDrawerActions = () => {
    // const [loading, setLoading] = useState<boolean>(false);

    const cartState = useAppSelector(state => state.cart);
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     return () => {
    //         setLoading(false);
    //     }
    // }, [])

    return  <div style={{
        width: 'inherit',
        backgroundColor: '#fcfcfc',
        borderTop: '1px solid #00000015',
        height: '80px',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',                    
    }}> 
        <Button variant="contained" sx={{ minWidth: '170px'}} onClick={() => {
     
        }}>
           View Cart | ${cartState.cartSummary.subtotal.toFixed(2)}
        </Button>
    </div>
}