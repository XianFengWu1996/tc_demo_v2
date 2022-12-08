import { onAuthStateChanged, signOut, User } from '@firebase/auth';
import {
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import { styled } from '@mui/system';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineSetting,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { HiOutlineReceiptTax } from 'react-icons/hi';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { auth } from '../../../config/firebaseConfig';
import snackbar from '../../../functions/utilities/snackbar';

interface IMenuDrawerProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const DrawerItem = styled('div')(() => ({
  width: '250px',
  color: 'secondary',
}));

const SignInLogoutButton = styled(Button)(() => ({
  width: '80%',
  alignSelf: 'center',
}));

export const MenuDrawer = (props: IMenuDrawerProps) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
    });

    return () => {
      subscribe();
    };
  }, []);

  const navigation_list = [
    {
      id: '4c5a3c95-74dc-44f8-804f-b4a8bfb4141d',
      text: 'Home',
      icon: <AiOutlineHome />,
      path: '/',
    },
    {
      id: '4a6db2eb-f038-4c78-8079-82ef5b958273',
      text: 'Menu',
      icon: <MdOutlineRestaurantMenu />,
      path: '/menu',
    },
    user && {
      id: '8a7d5046-0247-43a3-b6d8-f4a295cfa05d',
      text: 'Checkout',
      icon: <AiOutlineShoppingCart />,
      path: '/checkout',
    },

    user && {
      id: 'beb85444-bccf-4f34-90ca-ac274b086950',
      text: 'Order',
      icon: <HiOutlineReceiptTax />,
      path: `/account?redirect_to=order`,
    },

    user && {
      id: 'beb8jkjwqelk-34f34-90ca-ac274b086950',
      text: 'Wallet',
      icon: <IoWalletOutline />,
      path: `/account?redirect_to=wallet`,
    },

    user && {
      id: '38d4df12-3c06-4c9b-90de-c1d79152fe3d',
      text: 'Account',
      icon: <AiOutlineSetting />,
      path: `/account?redirect_to=account`,
    },
    {
      id: '38dasd-123c9b-90de-c1d79152fe3d',
      text: 'Contact Us',
      icon: <AiOutlinePhone />,
      path: `/contact`,
    },
  ];

  const handleSigninLogout = () => {
    if (user) {
      props.handleClose(); // to close the drawer
      signOut(auth); // sign out of the firebase
      snackbar.warning("You've successfully logged out");
    } else {
      Router.push(`/auth/signin?redirect=/menu`);
    }
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={props.open}
      onClose={props.handleClose}
      onOpen={props.handleOpen}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
        },
      }}
    >
      <div>
        <IconButton
          sx={{ padding: '20px', color: '#000' }}
          onClick={props.handleClose}
        >
          <AiOutlineClose />
        </IconButton>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '80%',
        }}
      >
        <div>
          {navigation_list.map((item) => {
            if (item) {
              return (
                <DrawerItem key={item.id}>
                  <ListItem
                    button
                    onClick={() => {
                      Router.push(item.path);
                      props.handleClose();
                    }}
                  >
                    <ListItemIcon sx={{ color: '#000' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </DrawerItem>
              );
            }
            return null;
          })}
        </div>

        <SignInLogoutButton
          variant="contained"
          color="secondary"
          onClick={handleSigninLogout}
        >
          {user ? 'Logout' : 'Login'}
        </SignInLogoutButton>
      </div>
    </SwipeableDrawer>
  );
};
