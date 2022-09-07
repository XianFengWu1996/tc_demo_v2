import { signInWithEmailAndPassword } from '@firebase/auth';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
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

export const emailSignupWithFirebase = async (
  email: string,
  password: string,
  confirm: string
) => {
  try {
    // check if the email format is correct
    if (!isEmail(email)) {
      throw new Error('Please enter a valid email to proceed');
    }

    // check if the password and confirm password matches
    if (!equals(password, confirm)) {
      throw new Error('The password does not match');
    }

    // await createUserWithEmailAndPassword(auth, email, password);

    Router.push('/auth/signin?from=signup&status=success');
  } catch (error) {
    console.log(error);
  }
};
