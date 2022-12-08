import Image from 'next/image';
import { useRouter } from 'next/router';
import blackLogo from '../../../public/assets/images/blacklogo.png';

export const CheckoutLogoDisplay = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/menu');
  };
  return (
    <div
      onClick={handleOnClick}
      style={{
        padding: '15px 30px',
        position: 'absolute',
        top: '70px',
        left: '10px',
        cursor: 'pointer',
      }}
    >
      <Image
        src={blackLogo.src}
        alt="taipei cuisine logo"
        width={50}
        height={45}
      />
    </div>
  );
};
