import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import snackbar from '../utilities/snackbar';
import { handleAxiosError } from './axiosError';
import { CheckFirebaseAuthError } from './firebase';

export const handleCatchError = (error: unknown) => {
  const err = error as Error;

  if (axios.isAxiosError(err)) {
    return handleAxiosError(err);
  }

  if (err.name === 'FirebaseError') {
    return CheckFirebaseAuthError(err as FirebaseError);
  }

  snackbar.error(
    (error as Error).message ?? 'Unexpected error has occur, try again later'
  );
};
