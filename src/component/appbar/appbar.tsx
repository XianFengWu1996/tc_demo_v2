import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import BlackLogo from '../../../public/assets/images/blacklogo.png';
import { useAppSelector } from '../../store/hook';
import { CartDrawer } from './checkoutDrawer';
import { MenuDrawer } from './menuDrawer/menuDrawer';

export const AppBarNav = () => {
  const StyleAppbar = styled(AppBar)(({ theme }) => ({
    position: 'static',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primary.main : '#fff',
    color: theme.palette.primary.main,
    width: '100%',
    boxShadow: '1px 1px 1px 0px rgba(0,0,0,0.35)',
    backgroundImage: 'none',
    padding: '0 40px',
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 10px',
    },
  }));

  const CartButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
    fontSize: 21,
    padding: '10px 40px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      padding: '10px 30px',
    },
  }));

  const CartCount = styled('span')(({ theme }) => ({
    position: 'absolute',
    fontSize: '10px',
    height: '18px',
    width: '18px',
    top: '3px',
    right: '29px',
    border: '1px solid #fff',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      height: '14px',
      width: '14px',
      fontSize: '7px',
      top: '2px',
      right: '22px',
    },
  }));

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartSummary } = useAppSelector((state) => state.cart);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <>
      <Box>
        <StyleAppbar>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="secondary"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Image
                src={BlackLogo.src}
                alt="taipei cuisine logo"
                width={60}
                height={50}
              />
            </div>

            <CartButton onClick={handleCartOpen}>
              <AiOutlineShoppingCart color={'#fff'} />
              <CartCount>{cartSummary.quantity}</CartCount>
            </CartButton>
          </Toolbar>
        </StyleAppbar>
      </Box>

      <MenuDrawer
        open={menuOpen}
        handleOpen={handleMenuOpen}
        handleClose={handleMenuClose}
      />
      <CartDrawer
        open={cartOpen}
        handleOpen={handleCartOpen}
        handleClose={handleCartClose}
      />
    </>
  );
};
