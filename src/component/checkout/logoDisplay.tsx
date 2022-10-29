import Image from 'next/image';
import blackLogo from '../../../public/assets/images/blacklogo.png';

export const CheckoutLogoDisplay = () => {
  return (
    <div
      style={{
        padding: '15px 30px',
        position: 'absolute',
        top: '5px',
        left: '10px',
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
