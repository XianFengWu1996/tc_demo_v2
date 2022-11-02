import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import { GoFlame } from 'react-icons/go';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { useAppSelector } from '../../../store/hook';

export const CartDisplay = () => {
  const cartRef = useRef<HTMLDivElement>();
  const [showCart, setShowCart] = useState<boolean>(false);

  const { cart, summary } = useAppSelector((state) => state.cart);

  return (
    <>
      <Button
        disableRipple
        fullWidth
        onClick={() => {
          setShowCart(!showCart);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 0,
          mt: 1,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Typography sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
          Cart ({summary.cart_quantity} items)
        </Typography>

        {showCart ? (
          <HiOutlineChevronUp size={20} />
        ) : (
          <HiOutlineChevronDown size={20} />
        )}
      </Button>

      <Box
        ref={cartRef}
        sx={{
          height: showCart ? cartRef.current?.scrollHeight : 0,
          overflow: 'hidden',
          transition: 'height ease 0.9s',
        }}
      >
        {cart.map((item) => {
          return (
            <Box key={item.id}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mr: 1 }}>
                  x {item.quantity}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {item.details.label_id}.{item.details.en_name}{' '}
                  {item.details.ch_name}{' '}
                  {item.details.is_spicy && <GoFlame color="red" />}
                </Typography>
              </Box>

              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                ${item.total.toFixed(2)}
              </Typography>

              {item.choices.map((choice) => {
                return (
                  <div key={choice.id}>
                    <Typography
                      key={choice.id}
                      sx={{
                        textTransform: 'capitalize',
                        fontSize: 10,
                        fontWeight: 600,
                        paddingLeft: '10px',
                      }}
                    >
                      {choice.en_name} {choice.ch_name}
                    </Typography>

                    {choice.selectOptions.map((option) => {
                      return (
                        <Typography
                          key={option.id}
                          sx={{
                            textTransform: 'capitalize',
                            fontSize: 10,
                            fontWeight: 600,
                            paddingLeft: '20px',
                          }}
                        >
                          - {option.en_name} {option.ch_name}
                          {option.is_spicy && <GoFlame color="red" />}
                          {option.price > 0 && `$${option.price.toFixed(2)}`}
                        </Typography>
                      );
                    })}
                  </div>
                );
              })}

              <hr />
            </Box>
          );
        })}
      </Box>
    </>
  );
};
