import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { auth } from '../../config/firebaseConfig';
import snackbar from '../../functions/utilities/snackbar';
import {
  SocialLoginIconContainer,
  SocialLoginIconGroup,
  SocialLoginTitle,
} from './styles';

export const SocialLogin = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        router.push(redirect as string);
      })
      .catch((error) => {
        snackbar.error(error.message ?? 'Failed to sign in with Google');
      });
    router.push(redirect as string);
  };

  const handleAppleSignIn = () => {
    const provider = new OAuthProvider('apple.com');

    signInWithPopup(auth, provider)
      .then(() => {
        router.push(redirect as string);
      })
      .catch((error) => {
        snackbar.error(error.message ?? 'Failed to sign in with Apple');
      });
  };

  const hanldeFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        router.push(redirect as string);
      })
      .catch((error) => {
        snackbar.error(error.message ?? 'Failed to sign in with Facebook');
      });
  };
  return (
    <>
      <SocialLoginTitle>Sign in to Taipei Cuisine</SocialLoginTitle>

      <SocialLoginIconGroup>
        <SocialLoginIconContainer onClick={handleGoogleSignIn}>
          <Image
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            height={25}
            width={25}
            alt="google icons from icons 8"
          />
        </SocialLoginIconContainer>

        <SocialLoginIconContainer onClick={handleAppleSignIn}>
          <FaApple size={25} />
        </SocialLoginIconContainer>

        <SocialLoginIconContainer onClick={hanldeFacebookSignIn}>
          <FaFacebook size={25} color="#4267B2" />
        </SocialLoginIconContainer>
      </SocialLoginIconGroup>
    </>
  );
};
