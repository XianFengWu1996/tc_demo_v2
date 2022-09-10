import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import equals from 'validator/lib/equals';
import isEmail from 'validator/lib/isEmail';
import { auth } from '../config/firebaseConfig';
import snackbar from './utilities/snackbar';

export const emailLoginWithFirebase = async (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    // check if the user has input email and password
    if (isEmpty(email) || !isEmail(email)) {
      throw new Error('Please enter a valid email to proceed');
    }

    if (isEmpty(password)) {
      throw new Error('Password is required');
    }

    setLoading(true); // start the loading, but only end the loading if there is an error

    // attemp sign in with the email and password provided by the user
    await signInWithEmailAndPassword(auth, email, password);

    // send the user to the menu route
    Router.push('/menu');
    // maybe place the destination into the query of the url, and redirect base on it
  } catch (error) {
    snackbar.error(
      (error as Error).message ?? 'Unknown error occur while signing in'
    );
    setLoading(false);
  }
};

export const emailSignupWithFirebase = async (
  email: string,
  password: string,
  confirm: string
) => {
  try {
    // check if the email format is correct
    if (isEmpty(email) || !isEmail(email)) {
      throw new Error('Please enter a valid email to proceed');
    }

    // check if the password or the confirm is filled out
    if (isEmpty(password) || isEmpty(confirm)) {
      throw new Error(
        'Please make sure both password and confirm password is filled out'
      );
    }

    // check if the password and confirm password matches
    if (!equals(password, confirm)) {
      throw new Error('The password does not match');
    }

    await createUserWithEmailAndPassword(auth, email, password);

    Router.push('/auth/signin?from=signup&status=success');
  } catch (error) {
    snackbar.error((error as Error).message ?? 'Failed to sign up');
  }
};
