import axios from 'axios';
import { generatePublicToken } from './auth';

export const RequestStoreData = async () => {
  return await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/store`,
    headers: {
      authorization: `Bearer ${generatePublicToken()}`,
    },
  });
};
