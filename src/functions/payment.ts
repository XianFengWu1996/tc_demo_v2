import { User } from '@firebase/auth';
import axios from 'axios';
import { auth } from '../config/firebaseConfig';

export const getAllPaymentMethods = async (user: User) => {
  return await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/wallet`,
    headers: {
      authorization: `Bearer ${await user.getIdToken()}`,
    },
  });
};

export const removePaymentMethod = async (card: Card) => {
  return await axios({
    method: 'DELETE',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/wallet`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: { card },
  });
};
