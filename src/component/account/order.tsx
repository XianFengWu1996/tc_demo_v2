import { onAuthStateChanged } from '@firebase/auth';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { auth } from '../../config/firebaseConfig';
import { handleCatchError } from '../../functions/error';
import { getOrderHistory } from '../../functions/order';
import { AccOrderItem } from '../order/AccOrderItem';
import { AccLoading } from './accountLoading';

export const AccOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [displayOrder, setDisplayOrder] = useState<Order[]>([]);
  const [numberPerPage, setNumberPerPage] = useState<number>(1);
  const numberOfPage = Math.round(orders.length / numberPerPage);

  const [page, setPage] = useState<number>(1);

  // update the pagination
  useEffect(() => {
    if (page === 1) {
      // for page 1, display the order from 0 to the number per page
      setDisplayOrder(orders.slice(0, numberPerPage));
    } else {
      // if page 2, we want to start at 2, and end at 4
      setDisplayOrder(
        orders.slice(page * numberPerPage - numberPerPage, numberPerPage * page)
      );
    }
  }, [page, numberOfPage, orders, numberPerPage]);

  const handlePageChange = (
    event: ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  // retrive the user order data
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) return;

        setLoading(true);

        const result = await getOrderHistory(user);

        setOrders(result.data.orders);
      } catch (error) {
        handleCatchError(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);
  return (
    <Box>
      {loading ? (
        <AccLoading />
      ) : (
        <Box mb={3}>
          {displayOrder.map((order) => {
            return <AccOrderItem key={order.id} order={order} />;
          })}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Pagination
              count={numberOfPage}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              sx={{ mt: 2 }}
            />

            <FormControl sx={{ mt: 2 }}>
              <InputLabel id="numberPerPage" size="small" variant="outlined">
                Per Page
              </InputLabel>
              <Select
                labelId="numberPerPage"
                variant="outlined"
                size="small"
                sx={{ width: '200px' }}
                value={numberPerPage}
                label="Per Page"
                onChange={(e) => {
                  setNumberPerPage(Number(e.target.value));
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={orders.length}>All</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};
