import { User } from '@firebase/auth';
import axios from 'axios';
import { auth } from '../config/firebaseConfig';
import { getCurrentTime, timeToStringFormat } from './time';

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

export const checkStoreHours = (today: RegularHour | undefined) => {
  if (!today) return;

  const { isOpenForBusiness, hours } = today;
  const { operating } = hours;

  if (!isOpenForBusiness) {
    throw new Error('The store is not open for business today');
  }

  const time = getCurrentTime();

  if (!(operating.open < time && operating.close > time)) {
    throw new Error(
      `The kitchen is close, the store hour is ${timeToStringFormat(
        operating.open
      )}-${timeToStringFormat(operating.close)}`
    );
  }
};
