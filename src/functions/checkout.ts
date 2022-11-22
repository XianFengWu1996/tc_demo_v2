import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { auth } from '../config/firebaseConfig';
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

export const getUserData = async (token: string | undefined) => {
  return await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/customer`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const generatePaymentRequestData = (
  cartState: Cart,
  checkoutState: Checkout
) => {
  const { deliveryOption, cart, summary, cartId } = cartState;
  const { clientSecret, contact, address, additional, timeFrame } =
    checkoutState;

  return {
    clientSecret,
    contact,
    deliveryOption: deliveryOption,
    delivery:
      deliveryOption === 'delivery'
        ? {
            address: address,
            deliveryNotes: additional.deliveryNotes,
            dropoffOption: additional.dropoffOption,
          }
        : null,
    kitchen: {
      kitchenNotes: additional.kitchenNotes,
      utensilOption: additional.utensilOption,
    },
    cartId: cartId,
    timeFrame,
    cart,
    summary,
  };
};

export const updateIntent = async (
  amount: number,
  clientSecret: string,
  save: boolean
) => {
  return await axios({
    method: 'put',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/checkout/payment/intent`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()} `,
    },
    data: { amount, clientSecret, save },
  });
};

export const InPersonPayment = async (
  cartState: Cart,
  checkoutState: Checkout
) => {
  return await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/checkout/payment/in_person`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: generatePaymentRequestData(cartState, checkoutState),
  });
};

export const newCardPayment = async (
  cartState: Cart,
  checkoutState: Checkout
) => {
  return await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/checkout/payment/new_card`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: generatePaymentRequestData(cartState, checkoutState),
  });
};

export const saveCardPayment = async (
  cartState: Cart,
  checkoutState: Checkout,
  card: Card
) => {
  return await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/checkout/payment/saved_card`,
    headers: {
      authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
    },
    data: {
      ...generatePaymentRequestData(cartState, checkoutState),
      card,
    },
  });
};
