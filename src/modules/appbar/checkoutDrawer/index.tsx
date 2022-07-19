import { IconButton, SwipeableDrawer, Typography,styled, Box } from "@mui/material"
import { CartDrawerActions } from "./checkoutDrawerActions"
import { CartDrawerList } from "./checkoutDrawerList"
import { AiOutlineClose } from "react-icons/ai"

interface ICartDrawerProps {
    open:boolean, 
    handleOpen: () => void,
    handleClose: () => void,
}

export const CartDrawer = (props: ICartDrawerProps) => {
    // const cartState = useAppSelector(state => state.cart)

    const CartDrawerContainer = styled(Box)(({ theme }) => ({
        width: '450px', 
        // height: cartState.cart.length < 4 ? '100%':'auto',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        zIndex: 9999,
        [theme.breakpoints.down('sm')] : {
            width: '100vw',
        }
    }))

    return <SwipeableDrawer
              anchor='right'
              open={props.open}
              onClose={props.handleClose}
              onOpen={props.handleOpen}
        >
            <CartDrawerContainer>
                <IconButton sx={{ position: 'absolute', top: 30, left: 10, color: '#000' }} onClick={props.handleClose}>
                    <AiOutlineClose  />
                </IconButton>
                  
                <Typography 
                    sx={{
                        textAlign: 'center',
                        margin: '30px 0',
                        fontSize: '25px',
                        fontWeight: 600
                    }}
                >Cart</Typography>

                {/* <CartDrawerList />

                <CartDrawerActions /> */}
            </CartDrawerContainer>
        </SwipeableDrawer>
}

