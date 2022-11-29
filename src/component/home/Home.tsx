import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../../../public/assets/images/whitelogo.png';
import {
  HomeButtonGroup,
  HomeContainedButton,
  HomeOutlinedButton,
  HomeSection,
  HomeTitle,
} from './styles/styles';

export const HomePage = () => {
  const router = useRouter();

  const handleContainedButtonOnClick = () => {
    router.push('/menu');
  };

  const handleOutlinedButtonOnClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_MENU_PDF_URL}`);
  };

  return (
    <HomeSection>
      <Image src={Logo.src} alt="taipei logo" height={120} width={140} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '70vh',
        }}
      >
        <HomeTitle>
          Providing some of the most authenic Taiwanese and Chinese style food
        </HomeTitle>
        <HomeButtonGroup>
          <HomeContainedButton
            variant="contained"
            size="large"
            onClick={handleContainedButtonOnClick}
          >
            Order
          </HomeContainedButton>
          <HomeOutlinedButton
            variant="outlined"
            size="large"
            onClick={handleOutlinedButtonOnClick}
          >
            Explore Menu
          </HomeOutlinedButton>
        </HomeButtonGroup>
      </div>
    </HomeSection>
  );
};
