import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { ReactNode } from 'react';

interface ICheckoutNavigationButtonProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  borderBottom?: string;
}
export const CheckoutNavigationButton = (
  props: ICheckoutNavigationButtonProps
) => {
  return (
    <Button
      fullWidth
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 2,
        borderBottom: props.borderBottom ?? '1px solid rgba(0,0,0,0.2)',
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

      <Box>
        <KeyboardArrowRightIcon />
      </Box>
    </Button>
  );
};
