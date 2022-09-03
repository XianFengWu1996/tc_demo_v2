import Image from 'next/image';
import { FaApple, FaFacebook } from 'react-icons/fa';
import {
  SocialLoginIconContainer,
  SocialLoginIconGroup,
  SocialLoginTitle,
} from './styles';

export const SocialLogin = () => {
  return (
    <>
      <SocialLoginTitle>Sign in to Taipei Cuisine</SocialLoginTitle>

      <SocialLoginIconGroup>
        <SocialLoginIconContainer>
          <Image
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            height={25}
            width={25}
            alt="google icons from icons 8"
          />
        </SocialLoginIconContainer>

        <SocialLoginIconContainer>
          <FaApple size={25} />
        </SocialLoginIconContainer>

        <SocialLoginIconContainer>
          <FaFacebook size={25} color="#4267B2" />
        </SocialLoginIconContainer>
      </SocialLoginIconGroup>
    </>
  );
};
