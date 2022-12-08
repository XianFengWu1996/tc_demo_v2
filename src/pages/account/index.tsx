import { onAuthStateChanged } from '@firebase/auth';
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineExclamationCircle, AiOutlineUser } from 'react-icons/ai';
import { IoReceiptOutline, IoWalletOutline } from 'react-icons/io5';
import { v4 } from 'uuid';
import { AccOrder } from '../../component/account/order';
import { AccPersonal } from '../../component/account/personalnfo';
import { AccWallet } from '../../component/account/wallet';
import { AppBarNav } from '../../component/appbar/appbar';
import { auth } from '../../config/firebaseConfig';
import { getUserData } from '../../functions/checkout';
import { handleCatchError } from '../../functions/error';

const navigationList: NavigationItem[] = [
  {
    id: v4(),
    redirect_url: '?redirect_to=account',
    text: 'Account',
    value: 'account',
    icon: AiOutlineUser,
  },
  {
    id: v4(),
    redirect_url: '?redirect_to=wallet',
    text: 'Wallet',
    value: 'wallet',
    icon: IoWalletOutline,
  },
  {
    id: v4(),
    redirect_url: '?redirect_to=order',
    text: 'Order History',
    value: 'order',
    icon: IoReceiptOutline,
  },
  {
    id: v4(),
    redirect_url: '?redirect_to=legal',
    text: 'Legal',
    value: 'legal',
    icon: AiOutlineExclamationCircle,
  },
];

export default function AccountPage() {
  const [redirect, setRedirect] = useState<AccountRedirects>('account');
  const router = useRouter();
  const isMediumScreen = useMediaQuery('(max-width:899px)');
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User.User>({
    name: '',
    phone: '',
    address: {
      formattedAddress: null,
      details: null,
    },
    reward: {
      points: 0,
      transactions: [],
    },
  });

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setLoading(true);
          const token = await user?.getIdToken();
          const result = await getUserData(token);

          setUser(result.data.user);
        } else {
          router.push(`/auth/signin?redirect=/account?redirect_to=account`);
        }
      } catch (error) {
        handleCatchError(error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      subscribe();
    };
  }, [router]);

  const generateContents = () => {
    switch (redirect) {
      case 'account':
        return <AccPersonal user={user} setUser={setUser} loading={loading} />;
      case 'wallet':
        return <AccWallet />;
      case 'order':
        return <AccOrder />;
      case 'legal':
        return <AccLegal />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.redirect_to) {
        setRedirect(router.query.redirect_to as AccountRedirects);
      }
    }
  }, [router]);

  return (
    <>
      <AppBarNav />

      <Grid container>
        {!isMediumScreen ? (
          <Grid item md={3} lg={3}>
            <Box
              sx={{
                minHeight: 'calc(100vh - 63px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                py: 5,
                pl: 3,
              }}
            >
              {navigationList.map((item) => {
                return (
                  <Button
                    key={item.id}
                    onClick={() => {
                      router.push(item.redirect_url);
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      textTransform: 'capitalize',
                      marginTop: '8px',
                      marginBottom: '8px',
                      padding: '8px',
                      cursor: 'pointer',

                      backgroundColor:
                        redirect === item.value ? '#f59c9e' : 'transparent',
                      width: '90%',
                      marginLeft: redirect === item.value ? '15px' : '0px',
                      color: redirect === item.value ? '#fff' : '#000',
                      position: 'relative',
                      borderRadius: '5px',
                      ':hover': {
                        backgroundColor: '#f59c9e7a',
                      },
                    }}
                  >
                    <item.icon size={20} />
                    <Typography sx={{ ml: 2, textTransform: 'capitalize' }}>
                      {item.text}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth sx={{ mt: 2, px: 3 }}>
              <Select
                id="demo-simple-select"
                value={redirect}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={(e) => {
                  setRedirect(e.target.value as AccountRedirects);
                  router.push(`?redirect_to=${e.target.value}`);
                }}
              >
                {navigationList.map((item) => {
                  return (
                    <MenuItem value={item.value} key={item.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <item.icon size={18} />
                        <Typography sx={{ ml: 2 }}>{item.text}</Typography>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={9}
          sx={{ borderLeft: '1px solid #D1CFCF', px: 3, mt: 2 }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 63px)' }}>
            {generateContents()}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export const AccLegal = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 16,
        fontWeight: 600,
        color: 'blue',
        textDecoration: 'underline',
      }}
    >
      <Box mb={2}>
        <Link href="/legal/privacy_policy">Privacy Policy</Link>
      </Box>

      <Box>
        <Link href="/legal/terms_and_conditions">Terms and Conditions</Link>
      </Box>
    </Box>
  );
};
