import { User } from '@firebase/auth';
import axios from 'axios';

export const getOrderHistory = async (user: User) => {
  return await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/order`,
    headers: {
      authorization: `Bearer ${await user.getIdToken()}`,
    },
  });
};
