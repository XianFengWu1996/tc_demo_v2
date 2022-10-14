import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { MouseEventHandler, ReactNode } from 'react';

interface ICheckoutNavigationButtonProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  borderBottom?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
export const CheckoutNavigationButton = (
  props: ICheckoutNavigationButtonProps
) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      fullWidth
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 2,
        borderBottom: props.borderBottom ?? '1px solid rgba(0,0,0,0.2)',
        '&:disabled': {
          color: '#000',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>{props.icon}</Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              textAlign: 'start',
              letterSpacing: 0.5,
            }}
          >
            {props.title}
          </Typography>

          {!isEmpty(props.subtitle) && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(0,0,0,0.6)',
                textAlign: 'start',
              }}
            >
              {props.subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {!props.disabled && (
        <Box>
          <KeyboardArrowRightIcon />
        </Box>
      )}
    </Button>
  );
};

interface IDeliveryOptionButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  type: DeliveryOptionType;
}

export const DeliveryButton = (props: IDeliveryOptionButtonProps) => {
  return (
    <Button
      sx={{
        flex: 1,
        bgcolor: props.type === 'delivery' ? '#000' : '#fff',
        color: props.type === 'delivery' ? '#fff' : '#000',
        marginRight: props.type === 'delivery' ? '-30px' : 0,
        zIndex: props.type === 'delivery' ? 999 : 0,
        borderRadius: '30px',
        '&:hover': {
          bgcolor: props.type === 'delivery' ? 'rgba(0,0,0,0.7)' : '',
        },
      }}
      onClick={props.onClick}
    >
      Delivery
    </Button>
  );
};

export const PickupButton = (props: IDeliveryOptionButtonProps) => {
  return (
    <Button
      sx={{
        flex: 1,
        bgcolor: props.type === 'pickup' ? '#000' : '#fff',
        color: props.type === 'pickup' ? '#fff' : '#000',
        marginLeft: props.type === 'pickup' ? '-30px' : 0,
        zIndex: props.type === 'pickup' ? 999 : 0,
        borderRadius: '30px',
        '&:hover': {
          bgcolor: props.type === 'pickup' ? 'rgba(0,0,0,0.7)' : '',
        },
      }}
      onClick={props.onClick}
    >
      Pickup
    </Button>
  );
};
