import { AxiosError } from 'axios';
import snackbar from '../utilities/snackbar';

interface AxiosResponseData {
  error: string;
}

export const handleAxiosError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    const data = error.response.data as AxiosResponseData;
    if (data.error) {
      return snackbar.error(data.error);
    }
  }
};
