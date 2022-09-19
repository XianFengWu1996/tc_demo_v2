import { FirebaseError } from 'firebase/app';
import snackbar from '../utilities/snackbar';

export const CheckFirebaseAuthError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/admin-restricted-operation':
      snackbar.error('This operation is restricted to administrators only.');
      return;
    case 'auth/code-expired':
      snackbar.error(
        'he SMS code has expired. Please re-send the verification code to try again.'
      );
      return;
    case 'auth/credential-already-in-use':
      snackbar.error(
        'This credential is already associated with a different user account.'
      );
      return;
    case 'auth/requires-recent-login':
      snackbar.error('');

      return;
    case 'auth/email-already-in-use':
      snackbar.error('The email address is already in use by another account.');

      return;
    case 'auth/cancelled-popup-request':
      snackbar.error('Popup request has been cancelled');

      return;

    case 'auth/invalid-app-credential':
      snackbar.error(
        'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.'
      );

      return;
    case 'auth/invalid-user-token':
      snackbar.error(
        "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key."
      );

      return;
    case 'auth/invalid-verification-code"':
      snackbar.error(
        'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.'
      );

      return;
    case 'auth/invalid-email':
      snackbar.error('The email address is badly formatted.');

      return;
    case 'auth/unauthorized-domain':
      snackbar.error(
        'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.'
      );

      return;
    case 'auth/wrong-password':
      snackbar.error(
        'The password is invalid or the user does not have a password.'
      );
      return;
    case 'auth/invalid-phone-number':
      snackbar.error('The format of the phone number provided is incorrect.');

      return;
    case 'auth/invalid-recipient-email':
      snackbar.error(
        'he email corresponding to this action failed to send as the provided recipient email address is invalid.'
      );

      return;
    case 'auth/popup-blocked':
      snackbar.error(
        'Unable to establish a connection with the popup. It may have been blocked by the browser.'
      );

      return;
    case 'auth/popup-closed-by-user':
      snackbar.error(
        'The popup has been closed by the user before finalizing the operation.'
      );

      return;
    case 'auth/redirect-cancelled-by-user':
      snackbar.error(
        'The redirect operation has been cancelled by the user before finalizing.'
      );

      return;
    case 'auth/redirect-operation-pending':
      snackbar.error('A redirect sign-in operation is already pending.');

      return;
    case 'auth/timeout':
      snackbar.error('The operation has timed out.');

      return;
    case 'auth/user-token-expired':
      snackbar.error(
        "he user's credential is no longer valid. The user must sign in again."
      );

      return;
    case 'auth/too-many-requests':
      snackbar.error(
        'We have blocked all requests from this device due to unusual activity. Try again later.'
      );

      return;
    case 'auth/unverified-email':
      snackbar.error('The operation requires a verified email.');

      return;
    case 'auth/user-cancelled':
      snackbar.error(
        'The user did not grant your application the permissions it requested.'
      );

      return;
    case 'auth/user-not-found':
      snackbar.error(
        'There is no user record corresponding to this identifier. The user may have been deleted.'
      );

      return;
    case 'auth/user-disabled':
      snackbar.error(
        'There is no user record corresponding to this identifier. The user may have been deleted.'
      );

      return;
    case 'auth/user-mismatch':
      snackbar.error(
        'The supplied credentials do not correspond to the previously signed in user.'
      );

      return;
    case 'auth/weak-password"':
      snackbar.error('The password must be 6 characters long or more.');

      return;
    default:
      snackbar.error('Unexpected error occur, try again later');
      return;
  }
};
