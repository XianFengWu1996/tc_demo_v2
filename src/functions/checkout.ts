import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { auth } from '../config/firebaseConfig';
import { generatePublicToken } from './auth';
import snackbar from './utilities/snackbar';

export const requestOTPCode = async (
  phone: string,
  setToken: Dispatch<SetStateAction<string>>
) => {
  const result = await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/phone/otp/send`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: { phone },
  });

  if (result.data.token) {
    setToken(result.data.token as string);
  }

  snackbar.success('The code has been sent');

  return result;
};

export const verifyOTPCode = async (
  phone: string,
  code: string,
  token: string
) => {
  return await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/phone/otp/verify`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: {
      phone,
      code,
      token,
    },
  });
};

export const updateCustomerName = async (name: string) => {
  return await axios({
    method: 'put',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/name`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: { name },
  });
};

export const updateAddress = async (address: Address) => {
  return await axios({
    method: 'put',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer/address`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: { address },
  });
};

export const getStripeClientSecret = async () => {
  return await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/payment/initiate_intent`,
    headers: {
      authorization: `Bearer ${generatePublicToken()}`,
    },
  });
};

export const getUserData = async (token: string | undefined) => {
  return await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
