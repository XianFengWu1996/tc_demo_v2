import { Box, Typography } from '@mui/material';
import { formatPhoneNumber } from '../../functions/phone';
import {
  AccOrderItemProps,
  SmallBoldFont,
  SmallLightFont,
} from './AccOrderItem';

export const OrderCommonInfo = (props: AccOrderItemProps) => {
  const { contact, deliveryOption, delivery, timeFrame, cart } = props.order;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          padding: '10px',
        }}
      >
        <SmallBoldFont>Contact</SmallBoldFont>
        <SmallLightFont>{contact.name}</SmallLightFont>
        <SmallLightFont>{formatPhoneNumber(contact.phone)}</SmallLightFont>
      </Box>

      <Box
        sx={{
          padding: '10px',
        }}
      >
        <SmallBoldFont>{deliveryOption}</SmallBoldFont>
        {delivery ? (
          <>
            <SmallLightFont>
              {delivery.address.formattedAddress?.streetName}
            </SmallLightFont>
            <SmallLightFont>
              {delivery.address.formattedAddress?.cityStateZip}
            </SmallLightFont>
            <SmallLightFont>
              Apt: {delivery.address.details?.apartmentNumber}
            </SmallLightFont>
          </>
        ) : (
          <>
            <SmallLightFont>68 Billings Road,</SmallLightFont>
            <SmallLightFont>Quincy, MA, US, 02171</SmallLightFont>
          </>
        )}
      </Box>

      <Box
        sx={{
          mx: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SmallBoldFont>{deliveryOption} Time</SmallBoldFont>

        <SmallLightFont>
          Schedule: {timeFrame.type.toUpperCase()}
        </SmallLightFont>
        {timeFrame.type === 'later' && timeFrame.selected && (
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {timeFrame.selected.displayTime}
          </Typography>
        )}

        <SmallLightFont>
          Estimate:
          {deliveryOption === 'delivery'
            ? delivery?.address.details?.estimateTime
            : '15-20mins'}
        </SmallLightFont>
      </Box>

      <Box
        sx={{
          mx: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SmallBoldFont>Number of Items</SmallBoldFont>
        <SmallLightFont>{cart.length}</SmallLightFont>
      </Box>
    </Box>
  );
};
