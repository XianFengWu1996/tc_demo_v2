import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/system"
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import MenuIcon from '@mui/icons-material/Menu';
import BlackLogo from '../../../public/assets/images/blacklogo.png'
import Image from "next/image";



function MenuPage() {
    return <Box sx={{ width: '100%', height: '100vh', bgcolor: 'background.paper'}}>
       <PublicAppBar />
       <Typography>asdasd</Typography>
       <Button variant="contained" color="primary">asd</Button>
    </Box>
}
  
  export default MenuPage


export const PublicAppBar = () => {
    const StyleAppbar = styled(AppBar)(({theme}) => ({
        position: 'static',
        backgroundColor: '#fff',
        color: '#555',
        width: '100%',
        boxShadow: '3px 3px 6px 0px rgba(0,0,0,0.35)',
        padding: '0 40px',
        [theme.breakpoints.down('md')]: {
            padding: '0 20px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '0 10px',
        },
    }))
    
    const CartButton = styled(Button)(({theme}) => ({
        backgroundColor: '#555',
        color: '#fff',
        fontSize: 21,
        padding: '10px 40px',
        '&:hover':{
            backgroundColor: '#bbb'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            padding: '10px 30px',
        }
    }))
    
    const CartCount = styled('span')(({theme}) => ({
        position: "absolute",
        fontSize: '10px',
        height: '18px',
        width: '18px',
        top: '3px', 
        right: '29px',
        border: '1px solid #fff',
        borderRadius: '50%',
        backgroundColor: '#fff',
        color: '#555',
        [theme.breakpoints.down('sm')]: {
            height: '14px', 
            width: '14px',
            fontSize: '7px',
            top: '2px', 
            right: '22px',
        }
    }))

    // const [menuOpen, setMenuOpen] = useState(false);
    // const [cartOpen, setCartOpen] = useState(false);

    // const handleMenuOpen = () => {
    //     setMenuOpen(true)
    // }

    // const handleMenuClose = () => {
    //     setMenuOpen(false)
    // }

    // const handleCartOpen = () => {
    //     setCartOpen(true)
    // }

    // const handleCartClose = () => {
    //     setCartOpen(false)
    // }

    return <>
        <Box>
            <StyleAppbar>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        // onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Image src={BlackLogo.src} alt="taipei cuisine logo" width={60} height={50}/> 
                </div>
               
                <CartButton> 
                    <AiOutlineShoppingCart />
                    <CartCount>5</CartCount>
                </CartButton>
                    
            </Toolbar>
            </StyleAppbar>
        </Box>

        {/* <MenuDrawer open={menuOpen} handleOpen={handleMenuOpen} handleClose={handleMenuClose}/> */}
        {/* <CartDrawer open={cartOpen} handleOpen={handleCartOpen} handleClose={handleCartClose}/> */}
    </>
}