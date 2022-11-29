import { onAuthStateChanged } from '@firebase/auth';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { HashLoader } from 'react-spinners';
import { auth } from '../../config/firebaseConfig';
import { handleCatchError } from '../../functions/error';
import {
  getAllPaymentMethods,
  removePaymentMethod,
} from '../../functions/payment';
import snackbar from '../../functions/utilities/snackbar';
import { CreditCardIcon, PaymentIconType } from '../icon/creditCard';
import { AccLoading } from './accountLoading';

export const AccWallet = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          const result = await getAllPaymentMethods(user);
          setCards(result.data.cards);
        }
      } catch (error) {
        handleCatchError(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <AccLoading />
  ) : cards.length > 0 ? (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {cards.map((card) => {
        return <WalletCard key={card.id} card={card} setCards={setCards} />;
      })}
    </Grid>
  ) : (
    <Typography
      sx={{
        fontSize: 18,
        fontWeight: 600,
      }}
    >
      Try adding saved payment method through checkout
    </Typography>
  );
};

interface WalletCardProps {
  card: Card;
  setCards: Dispatch<SetStateAction<Card[]>>;
}
const WalletCard = (props: WalletCardProps) => {
  const card = props.card.card;
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnRemoveCard = async () => {
    setLoading(true);
    try {
      const result = await removePaymentMethod(props.card);

      props.setCards(result.data.cards);

      snackbar.success(`Card ending in ${card.last4} has been removed`);
    } catch (error) {
      handleCatchError;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Box
        sx={{
          border: '1.5px solid rgba(0,0,0,0.2)',
          borderRadius: '10px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {loading && (
          <span
            style={{
              borderRadius: '8px',
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <HashLoader color="#fff" size={30} />
            </Box>
          </span>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <CreditCardIcon
            type={card.brand as PaymentIconType}
            height={50}
            width={50}
          />

          <Box sx={{ ml: 1.5 }}>
            <Typography sx={{ fontWeight: 500 }}>
              {card.brand === 'amex' ? '•••• •••••• •' : '•••• •••• ••••'}{' '}
              {card.last4}
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>
              {card.expMonth} / {card.expYear}
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={handleOnRemoveCard} sx={{ mr: 2, color: 'red' }}>
          <BsTrash />
        </IconButton>
      </Box>
    </Grid>
  );
};
