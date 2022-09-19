import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
import { auth } from '../config/firebaseConfig';
import { CheckFirebaseAuthError } from './error/firebase';
import snackbar from './utilities/snackbar';

export const emailLoginWithFirebase = async (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEmailError: Dispatch<SetStateAction<string>>,
  setPasswordError: Dispatch<SetStateAction<string>>
) => {
  setEmailError('');
  setPasswordError('');
  try {
    // check if the user has input email and password
    if (isEmpty(email) || !isEmail(email)) {
      return setEmailError('Please enter a valid email to proceed');
    }

    if (isEmpty(password)) {
      return setPasswordError('Password is required');
    }

    setLoading(true); // start the loading, but only end the loading if there is an error

    // attemp sign in with the email and password provided by the user
    await signInWithEmailAndPassword(auth, email, password);

    // send the user to the menu route
    Router.push('/menu');
    // maybe place the destination into the query of the url, and redirect base on it
  } catch (error) {
    setLoading(false);
    if ((error as Error).name === 'FirebaseError') {
      const err = error as FirebaseError;
      // if the error code is wrong password or user not found
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setEmailError('The email or the password is incorrect');
        setPasswordError('The email or the password is incorrect');
        return;
      }

      // check for other type of firebase error
      CheckFirebaseAuthError(err);
    } else {
      // if it's not firebase related error, show the message
      snackbar.error(
        (error as Error).message ?? 'Unknown error occur while signing in'
      );
    }
  }
};

export const emailSignupWithFirebase = async (
  email: string,
  password: string,
  confirm: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setEmailError: Dispatch<SetStateAction<string>>,
  setPasswordError: Dispatch<SetStateAction<string>>,
  setConfirmPasswordError: Dispatch<SetStateAction<string>>
) => {
  // reset the email and password error when the user submit again
  setEmailError('');
  setPasswordError('');
  setConfirmPasswordError('');

  try {
    // check if the email format is correct
    if (isEmpty(email) || !isEmail(email)) {
      return setEmailError('Please enter a valid email address');
    }

    // check if the password or the confirm is filled out
    if (isEmpty(password)) {
      return setPasswordError('Please enter a valid password');
    }

    if (isEmpty(confirm)) {
      return setConfirmPasswordError('Please enter password again to confirm');
    }

    // check if the password and confirm password matches
    if (!equals(password, confirm)) {
      return setConfirmPasswordError('The password does not match');
    }

    // start loading
    setLoading(true);
    // creates user with firebase
    const user = await createUserWithEmailAndPassword(auth, email, password);

    // send verification email
    await sendEmailVerification(user.user);

    Router.push('/auth/signin?from=signup&status=success');
  } catch (error) {
    // end loading and display error message
    setLoading(false);

    if ((error as Error).name === 'FirebaseError') {
      CheckFirebaseAuthError(error as FirebaseError);
    } else {
      snackbar.error((error as Error).message ?? 'Failed to sign up');
    }
  }
};

export const sendResetPasswordLink = async (email: string) => {
  return await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/auth/forgot_password`,
    data: {
      email,
    },
  });
};

export const backToLogin = () => {
  Router.push('/auth/signin');
};

export const backToForgotPassword = () => {
  Router.replace('/auth/forgot_password');
};
