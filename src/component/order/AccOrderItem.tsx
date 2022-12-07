import { Box, Button, styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import { useRef, useState } from 'react';
import { BsCoin } from 'react-icons/bs';
import { GoFlame } from 'react-icons/go';
import {
  CartSummaryDiscountItem,
  CartSummaryItem,
} from '../checkout/summary/cartSummary';
import { CustomeDialogSubTitle } from '../dialog/styles';
import { OrderCommonInfo } from './CommonInfo';

export interface AccOrderItemProps {
  order: Order;
}

export const SmallLightFont = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'capitalize',
}));

export const SmallBoldFont = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'capitalize',
}));

export const Label = styled(Box)(() => ({
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'capitalize',
  flex: 1,
}));

export const AccOrderItem = (props: AccOrderItemProps) => {
  const order = props.order;
  const contentRef = useRef<HTMLDivElement>();
  const [expand, setExpand] = useState<boolean>(false);
  const dt = DateTime.fromMillis(order.createdAt);
  const date = dt.toFormat('LLL dd, y');

  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <Box>
      <Box
        component={'div'}
        onClick={handleExpand}
        sx={{
          height: '50px',
          border: '1px solid rgba(0,0,0,0.3)',
          borderBottom: 'none',
          mt: 1.5,
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f59c9e',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', color: '#fff' }}>
          <Typography sx={{ fontSize: 11, mx: 1, fontWeight: 500 }}>
            {date}
          </Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 500 }}>
            Order #: {order.id}
          </Typography>
          <Typography sx={{ fontSize: 11, mx: 1, fontWeight: 500 }}>
            Total: ${order.summary.total.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: 9,
            color: '#fff',
            borderColor: '#fff',
            fontWeight: 600,
            mr: 1.5,
            borderRadius: '20px',
            padding: '5px 10px 0px 10px',
          }}
          onClick={handleExpand}
        >
          View Details
        </Button>
      </Box>

      <Box
        sx={{
          minHeight: '100px',
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,0.3)',
          borderTop: 'none',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
        }}
      >
        <OrderCommonInfo order={order} />

        <Box
          ref={contentRef}
          sx={{
            height: expand ? contentRef.current?.scrollHeight : 0,
            overflow: 'hidden',
            transition: 'height ease 0.8s',
            mt: 1,
            mx: 1,
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Label sx={{ flex: 3 }}>Item Name</Label>
            <Label>Quantity</Label>

            <Label>Unit Price</Label>

            <Label>Total</Label>
          </Box>

          {order.cart.map((item) => {
            return (
              <Box key={item.id} sx={{ display: 'flex' }}>
                <Box sx={{ flex: 3 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    {item.details.label_id}. {item.details.en_name}{' '}
                    {item.details.ch_name}
                  </Typography>
                  <Typography>
                    {item.choices.map((choice) => {
                      return (
                        <Box key={choice.id} sx={{ ml: 2 }}>
                          <Typography
                            sx={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: 'rgba(0,0,0,0.7)',
                              textTransform: 'capitalize',
                            }}
                          >
                            {choice.en_name} {choice.ch_name}
                          </Typography>

                          {choice.selectOptions.map((option) => {
                            return (
                              <Typography
                                key={option.id}
                                sx={{
                                  fontSize: 10,
                                  fontWeight: 500,
                                  ml: 2,
                                  color: 'rgba(0,0,0,0.7)',
                                  textTransform: 'capitalize',
                                }}
                              >
                                - {option.en_name} {option.ch_name}{' '}
                                {option.is_spicy && <GoFlame color="red" />}
                                {option.price > 0 &&
                                  `$${option.price.toFixed(2)}`}
                              </Typography>
                            );
                          })}
                        </Box>
                      );
                    })}
                  </Typography>

                  {!isEmpty(item.comments) && (
                    <Typography sx={{ fontSize: 11, color: 'red' }}>
                      Item Comments: {item.comments}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, textAlign: 'start' }}
                  >
                    {item.quantity}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'start',
                  }}
                >
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, textAlign: 'start' }}
                  >
                    ${item.details.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, textAlign: 'start' }}
                  >
                    ${item.total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <Box sx={{ display: 'flex', my: 1 }}>
            <Box sx={{ flex: 1 }}>
              <CustomeDialogSubTitle>Kitchen Option</CustomeDialogSubTitle>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}
              >
                Utensil Option:
                {order.kitchen.utensilOption}
              </Typography>
              {!isEmpty(order.kitchen.kitchenNotes) && (
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'capitalize',
                  }}
                >
                  Notes for kitchen: {order.kitchen.kitchenNotes}
                </Typography>
              )}
            </Box>
            {order.delivery && (
              <Box sx={{ flex: 1 }}>
                <CustomeDialogSubTitle>Delivery Option</CustomeDialogSubTitle>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    textTransform: 'capitalize',
                  }}
                >
                  Dropoff Option:
                  {order.delivery.dropoffOption === 'hand_off'
                    ? 'Hand it to me'
                    : 'leave at door'}
                </Typography>
                {!isEmpty(order.delivery.deliveryNotes) && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  >
                    Notes for driver: {order.delivery.deliveryNotes}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <Box mt={2} mb={3}>
            {order.summary.discount.redemption > 0 && (
              <CartSummaryDiscountItem
                label="Point Redemption"
                amount={order.summary.discount.redemption}
              />
            )}
            {order.summary.discount.lunch > 0 && (
              <CartSummaryDiscountItem
                label="Lunch Discount"
                amount={order.summary.discount.lunch}
              />
            )}

            <CartSummaryItem label="subtotal" amount={order.summary.subtotal} />
            <CartSummaryItem label="tax" amount={order.summary.tax} />
            <CartSummaryItem label="tip" amount={order.summary.tip} />
            {order.deliveryOption === 'delivery' && (
              <CartSummaryItem
                label="delivery fee"
                amount={order.summary.deliveryFee}
              />
            )}
            <CartSummaryItem label="total" amount={order.summary.total} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BsCoin />
            <Typography ml={2} sx={{ fontSize: 14, fontWeight: 600 }}>
              Reward point earned: {order.reward}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
