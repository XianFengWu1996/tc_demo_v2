import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { AppBarNav } from '../../component/appbar/appbar';
import { AccOrderItem } from '../../component/order/AccOrderItem';
import { generatePublicToken } from '../../functions/auth';

interface Props {
  orders?: Order[];
}

const SimulateOrders: NextPage = (props: Props) => {
  const newOrders = props.orders?.filter(
    (order) => order.orderStatus.status === 'in_progress'
  );
  const preparingOrders = props.orders?.filter(
    (order) => order.orderStatus.status === 'preparing'
  );
  const completeOrders = props.orders?.filter(
    (order) => order.orderStatus.status === 'complete'
  );
  return (
    <Box sx={{ minHeight: '80vh', mb: 10 }}>
      <AppBarNav />

      <Typography>Just simulation for viewing the order data</Typography>
      <Typography>
        For production, we will use Flutter Streams to allow the tablet to
        retrieve data
      </Typography>

      {props.orders ? (
        <Box
          sx={{
            margin: '0 50px',
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            New Orders
          </Typography>
          {newOrders?.map((order) => {
            return <AccOrderItem key={order.id} order={order} />;
          })}

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Preparing
          </Typography>
          {preparingOrders?.map((order) => {
            return <AccOrderItem key={order.id} order={order} />;
          })}
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Complete
          </Typography>
          {completeOrders?.map((order) => {
            return <AccOrderItem key={order.id} order={order} />;
          })}
        </Box>
      ) : (
        <Typography>No Orders</Typography>
      )}
    </Box>
  );
};

SimulateOrders.getInitialProps = async () => {
  const result = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/store/simulate/orders`,
    headers: {
      authorization: `Bearer ${generatePublicToken()}`,
    },
  });

  const temp = result.data.orders as Order[];
  temp.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  });

  return {
    orders: result.data.orders,
  };
};

export default SimulateOrders;
