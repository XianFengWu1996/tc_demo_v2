import { signInWithEmailAndPassword } from '@firebase/auth';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { auth } from '../config/firebaseConfig';
import snackbar from './utilities/snackbar';

export const emailLoginWithFirebase = async (
  email: string,
  password: string
) => {
  try {
    // attemp sign in with the email and password provided by the user
    const user = await signInWithEmailAndPassword(auth, email, password);
    // if the user did not have display name
    if (!user.user.displayName || isEmpty(user.user.displayName)) {
      return snackbar.success('Welcome, you have successfully logged in.');
    }
    // if the user have the display name
    snackbar.success(`Welcome, ${user.user.displayName}`);

    Router.push('/menu');
  } catch (error) {
    console.log(error);
  }
};
